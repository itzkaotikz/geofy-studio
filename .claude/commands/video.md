---
description: Geofy-Wissensvideo vorbereiten – Recherche, Skript, Storyboard, Job, Vault-Notiz. Hält vor der Vertonung an.
argument-hint: <Thema>
---

Thema: **$ARGUMENTS**

Du bereitest ein Geofy-Wissensvideo bis zur Vertonung vor. Halte dich an alle Regeln in `CLAUDE.md` und `pipeline/README.md`.
Antworte dem Nutzer kurz und auf Deutsch (er ist kein Entwickler).

## 1. Vorab prüfen
- Gibt es das Thema schon? Vault-Notiz `01 Projekte/Geofy/Geofy – Videoübersicht Wissensvideos.md`, Ordner `02 Skripte`
  (Präfix „Skript Geofy“), `jobs/*/job.json` und `wissen-videos/` durchsuchen. Wenn ja: neuen Blickwinkel wählen und das sagen.
- Serie wählen (Karten lügen, Warum ist …?, Was wäre wenn, Grenz-Kuriositäten, Wow, Rekorde, Wo leben alle?, Nadelöhre,
  Hauptstädte, Krieg auf der Karte …) und die nächste freie Folgennummer der Serie bestimmen.

## 2. Recherche mit Quellen und Zahlenprüfung
- Per Websuche mindestens 2 unabhängige, seriöse Quellen pro Kernzahl (Behörden, Forschung, Lexika, Vertragstexte).
- Jede Zahl im Skript mit Quelle belegen. Weichen Quellen ab: gerundet und vorsichtig formulieren, Abweichung notieren.
- Alles, was nicht sicher belegt ist, kommt in `check` (job.json) und in der Notiz unter „Zu prüfen“.

## 3. Skript im Geofy-Format
- **Höchstens 185 Wörter** (Ziel 150–175), Absätze mit Leerzeile = Szenen (meist 6–7 plus Outro). Wörter zählen und nennen.
- **Hook in den ersten 2 Sekunden** (überraschende Behauptung, Szenario oder Frage), keine Begrüßung.
- 1–2 offene Schleifen („Doch hier kommt der Haken“). Zahlen gerundet, politisch neutral.
- Outro wörtlich: „Wusstest du das schon? Gib dem Video ein Like, folg uns für mehr, und schick es jemandem, den das auch interessiert.“
- Für ElevenLabs gut sprechbar: Jahreszahlen und schwierige Namen in `spoken` (job.json) als Aussprache hinterlegen.

## 4. Storyboard
Szenenliste mit Kamera (viewBox, Zoomspanne ≥ 1,5°), Markierungen, Einblendungen, Animationen und Schlüsselwort, auf das sie
starten. 15–22 Bildmomente, alle 2–3 s ein neues Element. Polarregionen nur in eigenen Panels (flächentreue Azimutalprojektion).

## 5. Job anlegen: `jobs/<serie>-<nr>-<kurzname>/`
- `job.json` wie in `pipeline/README.md`, zusätzlich `"thema": "$ARGUMENTS"` (verbindet Job und `eingang/$ARGUMENTS/`),
  `"status": "wartet-auf-stimme"`, `"outro": "neu"`, Caption mit Hook + „Wusstest du das schon?“, genau 5 Hashtags, `cover`, `popwords`, `check`.
- `script.txt` (nur Sprechtext), `story.js` (Kopf und Outro-Szene aus einem bestehenden Job übernehmen), `geo.json` (nur benötigte Geometrien, Natural Earth 1:10m).
- `python3 pipeline/index.py` ausführen.
- **Vorschau ohne Stimme rendern** (`python3 -m http.server 8766` im Hintergrund, dann `node pipeline/render.js <slug> preview`),
  die Bilder ansehen und Fehler beheben: Karte sichtbar? Texte überlappen nicht? Richtige Länder? Untertitel im Sicherheitsbereich?

## 6. Skript-Notiz im Vault
`~/Library/Mobile Documents/com~apple~CloudDocs/Claude/Memory_Claude/02 Skripte/Skript Geofy <Serie> <Nr> <Titel>.md`
mit Frontmatter (typ: skript, erstellt: heute, status: entwurf, tags, quelle: claude) und Aufbau wie die bestehenden Skript-Notizen:
Kurz-Zusammenfassung (Wortzahl, erwartete Länge), `## Sprechtext (für ElevenLabs, Absätze = Szenen)`, `## Storyboard`,
`## Fakten und Quellen` (mit Links, „Zu prüfen“), `## Caption`, `## Verwandt` ([[Geofy]], [[Geofy – Videoübersicht Wissensvideos]], passende Skripte).
Keine bestehende Notiz überschreiben.

## 7. Anhalten
Zeige dem Nutzer: Titel, Sprechtext (zum Kopieren), Wortanzahl und erwartete Länge, die wichtigsten Quellen, „Zu prüfen“-Punkte,
2–3 Vorschaubilder. Dann sagen:
> Bitte gib das Skript frei. Danach in ElevenLabs vertonen („Lennart – Energetic“) und die MP3 in `eingang/$ARGUMENTS/` legen
> (bei mehreren Kapiteln: `1.mp3`, `2.mp3` …). Dann `/video-render $ARGUMENTS`.

Nicht weiterarbeiten, nicht committen, nicht pushen.
