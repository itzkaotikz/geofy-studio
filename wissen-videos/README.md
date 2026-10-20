# Wissens-Videos (Render-Pipeline)

Animierte Wissensvideos für Geofy, gerendert Bild für Bild (1080 × 1920, 30 fps).

- `kv-engine.js` – Engine: Kamerafahrten, Länder, Icons, Labels, Untertitel synchron zum Sprechtext
- `chile.js` – Story „Warum ist Chile so lang?“ (Szenen mit Sprechtext und Animationen)
- `chile.html` – Render-Seite (lädt Schriften, Karte, Story)
- `render.js` – Rendert mit Playwright + ffmpeg: `node render.js chile.html out/chile.mp4 30`
- `cover.js` – Erzeugt das Cover

Erwartet einen lokalen Server mit Root über `geofy-studio/` und `kvwork/` (Pfade in `chile.html` ggf. anpassen).
