# Geofy Studio – Projektanweisung für Claude Code

## Projekt
Geofy ist ein faceless Geografie-Kanal (TikTok, Reels, Shorts). Geofy Studio ist die Web-App plus Render-Pipeline dazu.
Hauptlinie hier: **Wissensvideos** (60–75 s, 9:16, 1080 × 1920, 30 fps, MP4) mit ElevenLabs-Stimme.

Der Nutzer ist **kein Entwickler**: kurz und auf Deutsch erklären, vor allem Unumkehrbaren fragen
(Push, Löschen, Installationen, Änderungen an Vault-Notizen). Gepostet wird immer von Hand nach Freigabe.

**Das Repo ist ÖFFENTLICH** (github.com/itzkaotikz/geofy-studio). Niemals committen: `.env`, API-Keys, Tokens,
MP3s, fertige MP4s, `out/`, `eingang/`, `_backup/`. Es gibt bewusst **keinen ElevenLabs-API-Key**.

## Zwei Wege
- **Handy (Standard für Shorts):** Efkan gibt die MP3 aus der ElevenLabs-App in den Claude-Chat, der Chat rendert und legt alles auf GitHub und im Vault ab. Vor Arbeit hier deshalb immer `git pull` (der Stand ändert sich laufend).
- **Mac (Claude Code):** für lange YouTube-Dokus (16:9, `KV.setFormat('16:9')`, `pipeline/srt.py`), genaue Wortzeiten mit Whisper und Vorrat/Recherche.

## Ablauf pro Video (Mac)
1. `/video <Thema>` → Recherche mit Quellen und Zahlenprüfung → Skript → Storyboard → Job in `jobs/<slug>/`
   → Skript-Notiz im Vault (`02 Skripte`, Präfix „Skript Geofy“). **Stopp:** Nutzer gibt frei und vertont selbst.
2. Nutzer legt die MP3(s) aus ElevenLabs in `eingang/<Thema>/` (eine Datei oder eine pro Kapitel).
3. `/video-render <Thema>` → Abgleich (Wortzeiten) → Render → Effekte und Mix → Cover → Caption → `out/<Thema>/`.
4. Nutzer prüft und postet von Hand. Danach Folge nach `wissen-videos/` übernehmen und in `EXAMPLES` (`js/wissen.js`) eintragen.

## Struktur
| Pfad | Inhalt |
|---|---|
| `index.html`, `js/app.js` | Web-App (Quiz, Wissen, Export), läuft auf GitHub Pages |
| `js/kv-engine.js` | **Karten-Engine** für alle Wissensvideos: Kamera, Länder, Labels, Untertitel, Satellitenstil |
| `js/wissen.js` | Wissens-Modus der App, `EXAMPLES` = Liste der fertigen Folgen |
| `js/align.js`, `js/board.js` | Abgleich im Browser, Pipeline-Board der App |
| `pipeline/` | Render-Pipeline: `page.html` (Render-Seite), `render.js` (Playwright → Bilder → ffmpeg), `align.py` (Wortzeiten), `sfx.py` (Whoosh/Pop), `captions.py`, `run_job.sh` (alles in einem) |
| `pipeline/tex/satellite.jpg` | Satellitentextur (NASA Blue Marble) |
| `jobs/<slug>/` | Ein Video = ein Job: `job.json`, `script.txt` (Absätze = Szenen), `story.js` (Szenen/Animationen), `geo.json` (Zusatz-Geodaten), `timing.json` (aus dem Abgleich) |
| `jobs/themen.json` | Themen-Warteschlange |
| `wissen-videos/` | Archiv der älteren Folgen (je Folge `<name>.js`, `.html`, `_script.txt`, `timing_*.json`, Geodaten), eigene Engine-Kopie |
| `data/world.json` | Ländergrenzen (Natural Earth 1:50m) |
| `eingang/<Thema>/` | MP3s vom Nutzer (nicht im Repo) |
| `out/<Thema>/` | Ergebnisse: Video, Cover, Caption, Vorschaubilder (nicht im Repo) |

## Befehle
```bash
# Lokaler Server (Repo-Root), wird von render.js gebraucht
python3 -m http.server 8766
# Vorschau-Standbilder ohne Stimme
node pipeline/render.js <slug> preview            # out/<slug>/preview_t*.jpg
# Komplette Produktion eines Jobs (Stimme in jobs/<slug>/voice.mp3)
pipeline/run_job.sh <slug>
# Produktion aus dem Eingangsordner (job.json "thema" = Ordnername in eingang/)
pipeline/render_thema.sh <Thema> align     # Abgleich + Prüfung (Warnungen)
pipeline/render_thema.sh <Thema> render    # Video, Cover, Caption -> out/<Thema>/
ATEMPO=1.04 pipeline/render_thema.sh <Thema> align   # Notlösung bei Überlänge
```
Claude-Code-Befehle: `/video <Thema>` (bis zur Freigabe des Skripts) und `/video-render <Thema>` (ab MP3), siehe `.claude/commands/`.
Details: `pipeline/README.md` (job.json-Felder, Skript- und Tempo-Regeln). Vault-Pfad:
`~/Library/Mobile Documents/com~apple~CloudDocs/Claude/Memory_Claude/` (Regeln dort in `Claude Anleitung.md`).

## Regeln und Lernpunkte (aus 38+ Folgen)

### Skript
- **Ziel ≈ 65 s, also rund 160–175 Wörter inkl. Outro** (Längen-Regel seit 2026-11-27), höchstens 185 (ElevenLabs „Lennart – Energetic“ ≈ 2,4–2,6 Wörter/s; 194 Wörter ergaben 81 s).
  Notlösung bei Überlänge: Stimme mit ffmpeg `atempo=1.04` um 4 % beschleunigen.
- Mindestens knapp über 60 s, höchstens 75 s. Über 60 s zählt für Creator Rewards. **Über 75 s warnen.**
- **Hook in den ersten 2 Sekunden**: überraschende Behauptung, Szenario oder offene Frage. Keine Begrüßung, kein „Heute geht es um …“.
- Absatz = Szene, Leerzeile dazwischen (saubere Pausen für den Abgleich). 1–2 offene Schleifen („Doch hier kommt der Haken“).
- **Outro wörtlich (neu, seit „Sahara“):** „Wusstest du das schon? Gib dem Video ein Like, folg uns für mehr, und schick es jemandem, den das auch interessiert.“
  Dazu die Outro-Karte **Like · Folgen · Teilen** (Symbole blenden auf das jeweilige Wort ein).
- Zahlen gerundet („rund“, „etwa“), Unsicheres in `check` und in der Skript-Notiz unter „Zu prüfen“. Politisch neutral, international anerkannte Grenzen.
- Caption: 1–2 Sätze Hook, endet mit „Wusstest du das schon?“, **genau 5 Hashtags**: Thema, Serie, `#geografie`, Nische, `#lernenmittiktok`.

### Bild
- **Look v3 „Satellit Nachtblau“ ist Standard** für neue Videos: in `job.json` `"look": "v3"`, in story.js `big()` auf `KV.bigText` umleiten, Animationen aus `js/fx.js` (Vorlage `pipeline/story_template_v3.js`, Details in `pipeline/README.md`). Quiz bleibt Stil A · Studio.
- Ständig Bewegung: alle 2–3 s ein neues Element, 15–22 Bildmomente pro Video, jede Szene 2–4 Kamerafahrten auf Schlüsselwörter.
- **Zoomspanne pro Szene mindestens ca. 1,5°** (besser ≥ 6° Breite in `viewBox`), sonst wird das Satellitenbild unscharf.
- **Polarregionen:** Engine-Kamera nur bis **84° N / −80° S**. Antarktis und Pole in **eigenen Panels mit flächentreuer Azimutalprojektion** zeichnen (`d3.geoAzimuthalEqualArea`), nicht über die Hauptkamera.
- Gleich große Länder vergleichen: `moved()` (True-Size-Rotation), bei FRA/ESP nur Festland.
- Flächen in `geo.json`: Ringe gegen den Uhrzeigersinn, sonst füllt d3 die ganze Welt. Geodaten: Natural Earth 1:10m (gemeinfrei).
- Chips bei y = 1180, große Zahlen mit `big(ctx,txt,a,480)`, pro Moment nur eine Einblendung.

### Layout (am echten TikTok-Screenshot gemessen, Video 1080 × 1920)
- Oben verdeckt bis y ≈ 250 → „geofy.“ klein, halbtransparent bei **y ≈ 292**, Titel bei **y ≈ 368**.
- Unten links Profilbild ab y ≈ 1477 (x 81–210), Name/Caption ab y ≈ 1626, rechte Leiste ab x ≈ 900.
- **Untertitel:** zentriert bei **x ≈ 555**, max. **660 px** breit, **unterste Zeile bei y ≈ 1560**, Wort für Wort. Look v3: Hanken Grotesk 800, weiß mit weichem Schatten, max. 4 Wörter,
  **aktives Wort dunkelblau auf weißer Box** (kein Pink mehr; alter Stil: 58 px mit Kontur, aktives Wort pink).
- Kein Raster, kein Fortschrittsbalken, kein Kopfbalken.

### Ton
- **Abgleich mit faster-whisper** (lokal, Modell `large-v3-turbo`, Python-Umgebung `.venv/`):
  `.venv/bin/python pipeline/align_whisper.py script.txt timing.json stimme1.mp3 [stimme2.mp3 …]` (mehrere MP3s = Kapitel).
  Prüft Länge (> 75 s), Wortanzahl, Trefferquote und **Lautstärke-Einbrüche bei den letzten Wörtern**.
- Der alte Silben-Abgleich `pipeline/align.py` ist nur noch Fallback: Er lag bei Afrika bis zu 6 s daneben (Test 2026-11-27).
  Whisper trifft das freigegebene Original auf ≈ 0,1 s.
- Mix: Stimme voll, Effekte ≈ 30–50 %, Lautheit −14 LUFS (TikTok-Standard).

### Cover
- **Ohne Chips** rendern (kein Geisterlabel), Überschrift darf keine Karteninhalte verdecken, Frame passend wählen (`cover.time` in job.json).

### Ablage
- Neue Folge nach Freigabe: Ordner/Dateien in `wissen-videos/` (js, html, Skript, Timing, Geodaten) und Eintrag in `EXAMPLES` in `js/wissen.js`.
- Dateinamen der Ergebnisse: `geofy_<serie>_<nr>_<thema>.mp4` und `_cover.png`.
- Vault: neue Notizen mit Frontmatter (`typ`, `erstellt`, `status`, `tags`, `quelle: claude`), Ergänzungen als `## Update JJJJ-MM-TT`. Nichts im Vault löschen oder überschreiben.

## Nach jedem Render prüfen
Vorschaubilder ansehen: Karte sichtbar? Texte überlappen nicht? Richtige Länder? Untertitel im Sicherheitsbereich? Mehr als 6 Wechsel in 15 s?
