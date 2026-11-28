"""Geofy Abgleich v3: wortgenaue Zeitstempel aus Skript + Stimme mit faster-whisper (lokal, ohne Cloud).

usage:  .venv/bin/python pipeline/align_whisper.py script.txt timing.json stimme1.mp3 [stimme2.mp3 ...]

- Mehrere MP3s (ein Kapitel pro Datei) werden in der angegebenen Reihenfolge mit kurzer Pause
  aneinandergehängt; die Zeiten gelten dann für die zusammengesetzte Datei (<timing>.voice.mp3).
- Ausgabeformat wie pipeline/align.py: {audio, onset, offset, scenes:[{words:[{w,t0,t1}], speechStart, speechEnd}]}
  Absätze im Skript (Leerzeile) = Szenen, Wörter = durch Leerzeichen getrennt (wie die Engine).
- Whisper hört die Wörter; jedes Skriptwort wird dem gehörten Wort zugeordnet. Wörter, die Whisper anders
  schreibt (Zahlen, Namen), bekommen ihre Zeit aus den sicheren Nachbarn.
- Prüft am Ende: Länge (> 75 s Warnung), Wortanzahl (> 185), Trefferquote, leise Wörter am Schluss.
"""
import json, os, re, subprocess, sys, difflib, warnings
import numpy as np
warnings.filterwarnings('ignore', category=RuntimeWarning)  # harmlose numpy-Meldungen aus der Whisper-Vorverarbeitung

MODEL = os.environ.get('WHISPER_MODEL', 'large-v3-turbo')
GAP = 0.45  # Pause zwischen Kapiteln in Sekunden


def norm(w):
    return re.sub(r'[^0-9a-zäöüß]', '', w.lower())


def duration(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))


def concat(mp3s, out):
    if len(mp3s) == 1:
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', mp3s[0], '-c', 'copy', out], check=True)
        return
    inputs, parts = [], []
    for i, m in enumerate(mp3s):
        inputs += ['-i', m]
        parts.append(f'[{i}:a]aresample=44100,aformat=channel_layouts=mono,apad=pad_dur={GAP}[a{i}]')
    fc = ';'.join(parts) + ';' + ''.join(f'[a{i}]' for i in range(len(mp3s))) + f'concat=n={len(mp3s)}:v=0:a=1[o]'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', fc, '-map', '[o]', '-c:a', 'libmp3lame', '-q:a', '2', out], check=True)


def pcm(p, sr=16000):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', str(sr), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(float) / 32768, sr


def main():
    if len(sys.argv) < 4:
        print(__doc__); sys.exit(2)
    script, out, mp3s = sys.argv[1], sys.argv[2], sys.argv[3:]
    text = open(script, encoding='utf-8').read().strip()
    scenes = [re.sub(r'\s+', ' ', p).strip() for p in re.split(r'\n\s*\n', text) if p.strip()]
    toks = [(si, w) for si, sc in enumerate(scenes) for w in sc.split(' ')]

    voice = out[:-5] + '.voice.mp3' if out.endswith('.json') else out + '.voice.mp3'
    concat(mp3s, voice)

    from faster_whisper import WhisperModel
    model = WhisperModel(MODEL, device='cpu', compute_type='int8')
    segs, info = model.transcribe(voice, language='de', word_timestamps=True, initial_prompt=' '.join(scenes)[:800],
                                  vad_filter=False, condition_on_previous_text=True, beam_size=5)
    heard = [(w.word.strip(), w.start, w.end, w.probability) for s in segs for w in s.words]
    if not heard:
        sys.exit('Whisper hat keine Wörter gehört. Ist die MP3 leer?')

    # Skriptwörter den gehörten Wörtern zuordnen
    A, B = [norm(w) for _, w in toks], [norm(h[0]) for h in heard]
    times = [None] * len(toks)
    sm = difflib.SequenceMatcher(None, A, B, autojunk=False)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            for k in range(i2 - i1):
                times[i1 + k] = [heard[j1 + k][1], heard[j1 + k][2]]
        elif tag == 'replace' and j2 > j1:
            # Abschnitt anders geschrieben (z. B. "14-mal" vs. "vierzehnmal"): Zeitspanne nach Buchstaben aufteilen
            t0, t1 = heard[j1][1], heard[j2 - 1][2]
            L = [max(1, len(A[i])) for i in range(i1, i2)]; tot = sum(L); acc = 0
            for k, i in enumerate(range(i1, i2)):
                a = t0 + (t1 - t0) * acc / tot; acc += L[k]
                times[i] = [a, t0 + (t1 - t0) * acc / tot]
    matched = sum(1 for t in times if t is not None)

    # Lücken (Wörter, die Whisper gar nicht gehört hat) zwischen sicheren Nachbarn verteilen
    total_audio = duration(voice)
    k = 0
    while k < len(times):
        if times[k] is not None:
            k += 1; continue
        j = k
        while j < len(times) and times[j] is None:
            j += 1
        lo = times[k - 1][1] if k > 0 else heard[0][1]
        hi = times[j][0] if j < len(times) else heard[-1][2]
        n = j - k
        for m in range(n):
            times[k + m] = [lo + (hi - lo) * m / n, lo + (hi - lo) * (m + 1) / n]
        k = j

    # monoton und mindestens 50 ms lang
    last = 0.0
    for t in times:
        t[0] = max(t[0], last); t[1] = max(t[1], t[0] + 0.05); last = t[0]

    res = []
    for si in range(len(scenes)):
        ws = [dict(w=w, t0=round(times[i][0], 3), t1=round(times[i][1], 3)) for i, (s, w) in enumerate(toks) if s == si]
        res.append(dict(words=ws, speechStart=ws[0]['t0'], speechEnd=ws[-1]['t1']))
    onset, offset = res[0]['words'][0]['t0'], res[-1]['words'][-1]['t1']
    json.dump(dict(audio=round(total_audio, 2), onset=onset, offset=offset, scenes=res, aligner='whisper:' + MODEL,
                   voice=os.path.basename(voice)), open(out, 'w'), indent=1, ensure_ascii=False)

    # ---------- Prüfungen ----------
    warn = []
    nwords = len(toks)
    rate = matched / len(toks)
    if total_audio > 75: warn.append(f'Stimme ist {total_audio:.1f} s lang (über 75 s). Notlösung: atempo=1.04 oder Skript kürzen.')
    if total_audio < 60: warn.append(f'Stimme ist nur {total_audio:.1f} s lang (unter 60 s, zählt nicht für Creator Rewards).')
    if nwords > 185: warn.append(f'Skript hat {nwords} Wörter (über 185).')
    if rate < 0.85: warn.append(f'Nur {rate:.0%} der Skriptwörter wurden sicher gehört. Passt die MP3 zum Skript?')
    # Wörter mit ungewöhnlich großem Abstand zum gehörten Text (falsche oder fehlende Sätze)
    extra = len(B) - sum(b.size for b in sm.get_matching_blocks())
    if extra > max(8, 0.1 * len(B)): warn.append(f'Whisper hat {extra} Wörter gehört, die nicht im Skript stehen. Weicht die Vertonung vom Skript ab?')
    # Lautstärke der letzten Wörter (Einbrüche im Outro)
    x, sr = pcm(voice)
    def db(a, b):
        seg = x[int(a * sr):int(b * sr)]
        return 20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-9) if len(seg) else -99
    lv = [db(t[0], t[1]) for t in times]
    med = float(np.median(lv))
    quiet = [(toks[i][1], lv[i]) for i in range(max(0, len(toks) - 10), len(toks)) if lv[i] < med - 12]
    if quiet: warn.append('Leise Wörter am Ende (Lautstärke-Einbruch): ' + ', '.join(f'„{w}“ ({v - med:+.0f} dB)' for w, v in quiet))
    tail_heard = heard[-1][2]
    if offset < tail_heard - 1.0: warn.append(f'Nach dem letzten Skriptwort ({offset:.1f} s) spricht die Stimme noch bis {tail_heard:.1f} s.')

    print(f'Abgleich mit Whisper ({MODEL}): {nwords} Skriptwörter, {matched} direkt gehört ({rate:.0%}), '
          f'Stimme {total_audio:.1f} s, Sprache {onset:.2f}–{offset:.2f} s')
    for si, sc in enumerate(res):
        print(f'  Szene {si + 1}: {sc["speechStart"]:6.2f}–{sc["speechEnd"]:6.2f} s  „{" ".join(w["w"] for w in sc["words"][:5])} …“')
    print('WARNUNGEN:' if warn else 'Keine Auffälligkeiten.')
    for w in warn: print('  ! ' + w)


if __name__ == '__main__':
    main()
