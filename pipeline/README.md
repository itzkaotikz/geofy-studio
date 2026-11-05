# Geofy Content-Pipeline

So entsteht ein Wissensvideo:

1. **Job anlegen** (Mensch oder Skript-Nachschub): Ordner `jobs/<slug>/` mit `job.json`, `script.txt`, `story.js`, `geo.json`. Status `wartet-auf-stimme`.
2. **Stimme**: Skript in ElevenLabs einsprechen (Stimme *Lennart – Energetic*, Modell eleven v4). Die MP3 im Studio unter **Pipeline** hochladen. Sie landet als `jobs/<slug>/voice.mp3` im Repo.
3. **Produktion** (GitHub Action `produce.yml`, startet automatisch): Timing → Video (Satellitenstil, 30 fps) → Soundeffekte → Mix (−14 LUFS) → Cover → Captions. Das Ergebnis kommt als Release `video-<slug>`, und `job.json` springt auf `fertig`.
4. **Posten**: Im Board Video und Cover laden, Captions kopieren und danach „Als veröffentlicht markieren“ antippen.

Lokal produzieren: `pipeline/run_job.sh <slug>` (braucht ffmpeg, numpy und playwright).
Vorschau ohne Stimme: `python3 -m http.server 8766 &` und dann `node pipeline/render.js <slug> preview`, das schreibt `out/<slug>/preview_t*.jpg`.

## job.json

```json
{
 "title": "Was wäre wenn der Bosporus gesperrt wird",
 "series": "Was wäre wenn", "nr": 5, "status": "wartet-auf-stimme",
 "created": "2026-11-05", "priority": 1, "outro": "neu",
 "caption": "Hook-Satz mit Emoji. Wusstest du das schon?",
 "hashtags": ["#thema", "#serie", "#geografie", "#nische", "#lernenmittiktok"],
 "youtube_title": "…", "highlight": "Was wäre wenn",
 "story": {"question": "Umfragefrage für die Instagram-Story", "options": ["Ja", "Nein"]},
 "cover": {"time": 3.5, "kicker": "WAS WÄRE WENN", "lines": "Zeile 1|Zeile 2|Zeile 3 (pink)"},
 "popwords": ["Wörter mit Pop-Sound"],
 "spoken": {"Montreux": "mongtrö"},
 "check": ["Fakten, die vor dem Posten zu prüfen sind"],
 "release": null, "duration": null
}
```
Status: `idee` → `skript` → `wartet-auf-stimme` → `in-produktion` → `fertig` → `veroeffentlicht`.

## Regeln für Skripte
- Länge 62–75 s gesprochen: **höchstens 185 Wörter**, besser 150–175. Ein Absatz entspricht einer Szene, 7 Szenen plus Outro.
- Szene 1 ist ein starker Hook in einem Satz und nennt das Thema sofort.
- Outro wörtlich: „Wusstest du das schon? Gib dem Video ein Like, folg uns für mehr, und schick es jemandem, den das auch interessiert.“
- Politisch neutral, keine Wertung. Bei Konflikten werden nur Fakten erzählt. International anerkannte Grenzen gelten (z. B. die Krim als Teil der Ukraine einfärben).
- Zahlen gerundet („rund“, „etwa“). Alles Unsichere kommt in `check`.
- Caption: 1–2 Sätze mit Hook, endet mit „Wusstest du das schon?“. Genau 5 Hashtags: Thema, Serie, #geografie, Nische, #lernenmittiktok.
- Themenwahl: `jobs/themen.json` (Warteschlange, Quoten Deutschland/Türkei, nächste Folgennummern).

## story.js
- Am einfachsten ein bestehendes `jobs/*/story.js` kopieren: Kopf mit den Helfern (`wt`, `chip`, `tag`, `big`, `pulse`, `line`, `arrow`, `fill`) und die Outro-Szene am Ende übernehmen, nur die Szenen dazwischen neu schreiben.
- `S_say[i]` ist Absatz i aus `script.txt`. Mit `wt(sc,'Wort')` bekommt man den Zeitpunkt, an dem das Wort gesprochen wird. Damit Einblendungen starten: `clamp((u-wt(sc,'Wort'))/0.4)`.
- Kameras: `cams:[{at:0,view:vA},{at:0.3,view:vB,fly:2.5}]`, mit `viewBox([lon0,lat0,lon1,lat1])`. **Breite mindestens etwa 6°**, sonst wird das Satellitenbild unscharf.
- Flächen: `fill(e,'KEY',farbe,alpha)` zeichnet `geo.json[KEY]` (GeoJSON-Geometrie). Ringe gegen den Uhrzeigersinn, sonst füllt d3 die ganze Welt.
- Chips bei y=1180, große Zahlen mit `big(ctx,txt,a,480)`. Pro Moment nur eine Einblendung, die alte jeweils ausblenden.
- Geodaten: Natural Earth 1:10m, gemeinfrei (`https://github.com/nvkelso/natural-earth-vector`, Ordner `geojson/`). Nur die benötigten Länder oder Regionen in `geo.json` speichern.
- **Immer eine Vorschau rendern und die Bilder ansehen**, bevor der Job auf `wartet-auf-stimme` geht. Zu prüfen: Ist die Karte sichtbar? Überlappen Texte? Stimmen die Länder?

## Sicherheit
- Keine API-Schlüssel im Repo. Das Board speichert den GitHub-Token nur auf dem Gerät.
- Das Repo ist öffentlich. Hier kommt nichts Privates hinein.
