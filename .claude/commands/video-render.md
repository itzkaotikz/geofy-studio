---
description: Geofy-Wissensvideo fertigstellen – MP3 aus eingang/<Thema>/ abgleichen, rendern, Cover und Caption nach out/<Thema>/.
argument-hint: <Thema>
---

Thema: **$ARGUMENTS**

Du machst aus der Stimme im Eingangsordner einen fertigen Entwurf. Regeln: `CLAUDE.md`. Kurz und auf Deutsch berichten.

## 1. Voraussetzungen
- `eingang/$ARGUMENTS/` enthält mindestens eine MP3 (mehrere = Kapitel, natürliche Reihenfolge nach Dateiname).
- Es gibt einen Job mit `"thema": "$ARGUMENTS"` in `jobs/*/job.json`. Falls nicht: Nutzer fragen, ob zuerst `/video $ARGUMENTS` laufen soll.
- Prüfen, ob das Skript im Job noch dem freigegebenen Stand entspricht (Vault-Notiz in `02 Skripte`).

## 2. Abgleich und Prüfung
`pipeline/render_thema.sh "$ARGUMENTS" align`
(faster-whisper, lokal; die zusammengesetzte Stimme landet in `jobs/<slug>/voice.mp3`, das ist nicht im Repo.)
Ausgabe lesen und Warnungen dem Nutzer melden:
- **Länge über 75 s** → anbieten: `ATEMPO=1.04 pipeline/render_thema.sh "$ARGUMENTS" align` (4 % schneller) oder Skript kürzen und neu vertonen.
- **Lautstärke-Einbruch bei den letzten Wörtern** → Outro anhören lassen bzw. neu vertonen anbieten.
- **Niedrige Trefferquote / Wörter, die nicht im Skript stehen** → Vertonung weicht vom Skript ab: Skript an die Vertonung angleichen
  (script.txt) oder neu vertonen. Nicht stillschweigend rendern.
Bei Warnungen erst nach Rückmeldung des Nutzers weitermachen.

## 3. Rendern
`pipeline/render_thema.sh "$ARGUMENTS" render` (im Hintergrund starten, dauert ca. 3–5 Minuten).
Ergebnis in `out/$ARGUMENTS/`: `geofy_<serie>_<nr>_<thema>.mp4`, `_cover.png`, `caption.txt`, `vorschau/`, `abgleich.txt`.

## 4. Selbst prüfen, bevor der Nutzer es sieht
- Vorschaubilder ansehen (Layout, Überlappungen, richtige Länder, Untertitel im Sicherheitsbereich).
- Synchronität stichprobenartig prüfen: an 3–4 Stellen Bild extrahieren (`ffmpeg -ss <t> -i video.mp4 -frames:v 1 x.jpg`) und das pinke
  Wort mit den Wortzeiten in `jobs/<slug>/timing.json` vergleichen.
- Cover ansehen: keine Chips, Überschrift verdeckt keine Karteninhalte.
- Caption: endet mit „Wusstest du das schon?“, genau 5 Hashtags.
- Fehler selbst beheben und neu rendern.

## 5. Entwurf zeigen
Video und Cover mit SendUserFile schicken, Caption-Text zeigen, Länge nennen, offene „Vor dem Posten prüfen“-Punkte aus `check` auflisten.
Der Nutzer gibt frei und postet von Hand. Erst nach Freigabe (auf Nachfrage): Folge nach `wissen-videos/` übernehmen, `EXAMPLES`
in `js/wissen.js` ergänzen, Vault-Notiz mit `## Update <Datum>` ergänzen. Nicht ohne Rückfrage committen oder pushen.
