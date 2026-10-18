# Geofy Studio

Web-App zum Erstellen von Geo-Quiz- und Wissens-Videos für TikTok (1080 × 1920, 30 fps, MP4) und Foto-Carousels.

**App öffnen:** https://itzkaotikz.github.io/geofy-studio/

## Auf dem iPhone installieren
1. Link oben in **Safari** öffnen.
2. Teilen-Symbol → **„Zum Home-Bildschirm“** → Hinzufügen.
3. Geofy erscheint als App-Icon und startet im Vollbild, auch offline.

## Auf dem Mac
Safari: Ablage → **„Zum Dock hinzufügen“**. Chrome: Adressleiste → Installieren-Symbol.

## Updates
Online lädt die App immer die neueste Version. Erscheint unten „Neue Version verfügbar“, einmal antippen.

## Aufbau
| Pfad | Inhalt |
|---|---|
| `index.html` | Oberfläche und Styles |
| `js/app.js` | Studio-Logik: Kanäle, Quiz, Wissen, Export |
| `data/world.json` | Ländergrenzen (Natural Earth 1:50m, gemeinfrei) inkl. leichter Version für Übersichtskarten |
| `vendor/` | d3 (ISC), mp4-muxer (MIT) |
| `fonts/` | Bricolage Grotesque, Hanken Grotesk, JetBrains Mono (SIL OFL) |
| `sw.js` | Offline-Modus und Update-Erkennung |
| `tools/build-world.mjs` | Erzeugt `data/world.json` aus Natural Earth (`npm i d3-geo`) |

## Neue Kanäle
In `js/app.js` einen Eintrag in `CHANNELS` ergänzen (Name, Handle, Farben).
