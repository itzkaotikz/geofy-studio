#!/usr/bin/env bash
# Produktion aus dem Eingangsordner: eingang/<Thema>/*.mp3 -> out/<Thema>/ (Video, Cover, Caption, Vorschau).
# usage: pipeline/render_thema.sh <Thema> [align|render|all]
#   align  : nur Abgleich + Prüfung (schnell, zeigt Warnungen)
#   render : Video, Effekte, Mix, Cover, Caption (nutzt den vorhandenen Abgleich)
#   all    : beides; hält nach dem Abgleich an, wenn es Warnungen gibt (FORCE=1 rendert trotzdem)
# Optional: ATEMPO=1.04 beschleunigt die Stimme (Notlösung bei Überlänge).
set -euo pipefail
THEMA="${1:?Thema fehlt, z. B. pipeline/render_thema.sh Antarktis}"; STEP="${2:-all}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
PY="$ROOT/.venv/bin/python"
[ -x "$PY" ] || { echo "Python-Umgebung .venv fehlt (faster-whisper)."; exit 1; }

# Job zum Thema finden (job.json "thema", sonst Ordnername)
SLUG=$("$PY" - "$THEMA" <<'PY'
import json, glob, os, sys
t = sys.argv[1].lower()
hits = [os.path.basename(os.path.dirname(f)) for f in sorted(glob.glob('jobs/*/job.json'))
        if (json.load(open(f)).get('thema') or '').lower() == t]
print(hits[-1] if hits else '')
PY
)
[ -n "$SLUG" ] || { echo "Kein Job mit \"thema\": \"$THEMA\" in jobs/*/job.json gefunden."; exit 1; }
J="$ROOT/jobs/$SLUG"; IN="$ROOT/eingang/$THEMA"; OUT="$ROOT/out/$THEMA"; mkdir -p "$OUT"
echo "Thema: $THEMA  ->  Job: $SLUG"

if [ "$STEP" = "align" ] || [ "$STEP" = "all" ]; then
  # MP3s in natürlicher Reihenfolge (kapitel_2 vor kapitel_10)
  MP3S=()
  while IFS= read -r f; do MP3S+=("$f"); done < <("$PY" - "$IN" <<'PY'
import glob, os, re, sys
fs = glob.glob(os.path.join(sys.argv[1], '*.mp3')) + glob.glob(os.path.join(sys.argv[1], '*.MP3'))
key = lambda p: [int(x) if x.isdigit() else x.lower() for x in re.split(r'(\d+)', os.path.basename(p))]
print('\n'.join(sorted(set(fs), key=key)))
PY
)
  [ ${#MP3S[@]} -gt 0 ] && [ -n "${MP3S[0]}" ] || { echo "Keine MP3 in eingang/$THEMA/ gefunden."; exit 1; }
  echo "Stimme: ${#MP3S[@]} Datei(en): $(for f in "${MP3S[@]}"; do printf '%s ' "$(basename "$f")"; done)"
  if [ -n "${ATEMPO:-}" ]; then
    TMP="$OUT/_atempo"; mkdir -p "$TMP"; NEW=()
    for f in "${MP3S[@]}"; do o="$TMP/$(basename "$f")"; ffmpeg -y -v error -i "$f" -af "atempo=$ATEMPO" -c:a libmp3lame -q:a 2 "$o"; NEW+=("$o"); done
    MP3S=("${NEW[@]}"); echo "Stimme beschleunigt: atempo=$ATEMPO"
  fi
  "$PY" pipeline/align_whisper.py "$J/script.txt" "$J/timing.json" "${MP3S[@]}" | tee "$OUT/abgleich.txt"
  mv "$J/timing.voice.mp3" "$J/voice.mp3"; rm -rf "$OUT/_atempo"
  if [ "$STEP" = "all" ] && grep -q "WARNUNGEN" "$OUT/abgleich.txt" && [ "${FORCE:-}" != "1" ]; then
    echo "STOPP: Warnungen beim Abgleich (siehe oben). Mit FORCE=1 trotzdem rendern."; exit 3
  fi
fi

if [ "$STEP" = "render" ] || [ "$STEP" = "all" ]; then
  [ -f "$J/voice.mp3" ] && [ -f "$J/timing.json" ] || { echo "Erst den Abgleich laufen lassen (Schritt align)."; exit 1; }
  SKIP_ALIGN=1 pipeline/run_job.sh "$SLUG" >/dev/null
  NAME=$("$PY" - "$SLUG" "$THEMA" <<'PY'
import json, re, sys
j = json.load(open(f'jobs/{sys.argv[1]}/job.json'))
s = lambda x: re.sub(r'[^a-z0-9]+', '_', x.lower().replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')).strip('_')
print(f"geofy_{s(j.get('series', 'wissen'))}_{int(j.get('nr') or 0):02d}_{s(sys.argv[2])}")
PY
)
  R="$ROOT/out/$SLUG"
  cp "$R/$SLUG.mp4" "$OUT/$NAME.mp4"; cp "$R/cover_$SLUG.png" "$OUT/${NAME}_cover.png"
  cp "$R/captions.txt" "$OUT/caption.txt"; mkdir -p "$OUT/vorschau"; cp "$R"/preview_t*.jpg "$OUT/vorschau/" 2>/dev/null || true
  D=$(cat "$R/duration.txt")
  "$PY" - "$SLUG" "$D" <<'PY'
import json, sys
p = f'jobs/{sys.argv[1]}/job.json'; j = json.load(open(p)); j.update(status='fertig', duration=float(sys.argv[2]))
json.dump(j, open(p, 'w'), ensure_ascii=False, indent=1)
PY
  python3 pipeline/index.py >/dev/null
  echo "FERTIG: out/$THEMA/$NAME.mp4 ($D s), Cover, caption.txt, vorschau/"
fi
