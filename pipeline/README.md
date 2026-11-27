# Geofy Content-Pipeline

So entsteht ein Wissensvideo:

1. **Job anlegen** (auf Zuruf: „neue Skripte“ an Claude, kein automatischer Nachschub): Ordner `jobs/<slug>/` mit `job.json`, `script.txt`, `story.js`, `geo.json`. Status `wartet-auf-stimme`.
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
- **Hook-Regel (seit 2026-11-19, Priorität):** Die ersten 5 bis 15 Sekunden (etwa 15 bis 40 Wörter) wecken sofort Neugier und halten die Leute im Video: konkretes Szenario oder überraschende Behauptung, offene Frage („Was passiert dann?“), Eskalation („Und das ist erst Tag eins.“). Keine Begrüßung, kein „Heute geht es um …“, kein Definitionssatz am Anfang. Die Erklärung kommt danach.
- **Längen-Regel (seit 2026-11-27):** Ziel etwa 65 Sekunden, mindestens knapp über 60 s (≤ 75 s). Lennart spricht etwa 2,4–2,6 Wörter pro Sekunde, also rund 160–175 Wörter inklusive Outro.
- **Titel-Regel:** Titel, Cover-Text und erste Caption-Zeile sind Klick-Hooks in Frageform oder Szenario („Der Bosporus wird gesperrt: Was passiert dann?“, „Was, wenn …? Dann …“), nicht Themenbezeichnungen. Immer faktentreu, keine falschen Versprechen.
- Offene Schleifen: Mitten im Skript mindestens 1–2 Spannungspunkte („Doch hier kommt der Haken“, „Und dann wird es seltsam“), die den nächsten Absatz ankündigen.
- Zeitleiste/Eskalation bevorzugt (Tag 1 → Woche 1 → Monat 1), bei Was-wäre-wenn und Warum-Videos.
- Outro wörtlich: „Wusstest du das schon? Gib dem Video ein Like, folg uns für mehr, und schick es jemandem, den das auch interessiert.“
- Politisch neutral, keine Wertung. Bei Konflikten werden nur Fakten erzählt. International anerkannte Grenzen gelten (z. B. die Krim als Teil der Ukraine einfärben).
- Zahlen gerundet („rund“, „etwa“). Alles Unsichere kommt in `check`.
- Caption: 1–2 Sätze mit Hook, endet mit „Wusstest du das schon?“. Genau 5 Hashtags: Thema, Serie, #geografie, Nische, #lernenmittiktok.
- Themenwahl: `jobs/themen.json` (Warteschlange, Quoten Deutschland/Türkei, nächste Folgennummern).

## Tempo und Bildsprache (seit 2026-11-19, Priorität)
Kurzvideo-Publikum braucht ständig Bewegung, der Wissenscharakter bleibt.
- **Alle 2 bis 3 Sekunden ändert sich etwas** (neue Einblendung, Kamerafahrt, Schnitt auf neue Karte, Zähler). Keine Einstellung länger als etwa 3 s ohne neues Element.
- Pro Video etwa **15 bis 22 Bildmomente** statt 7 bis 8. Absätze dürfen in mehrere Bildmomente zerlegt werden.
- Mehr Grafiken: animierte Zähler, Icons (Schiffe, Menschen), Pfeile und Routen, Vorher/Nachher, Vergleichsbalken, Zeitleisten-Chips (Tag 1, Woche 1).
- Harte Wechsel zwischen Weltkarte und Detailkarte (schneller Zoom), kurze Punch-Zooms auf Schlüsselzahlen, Wörter in Popwords hervorheben, Whoosh-SFX bei Wechseln.
- Die ersten 3 Sekunden sind bereits visuell stark (große Zahl oder Frage im Bild, Bewegung ab Frame 1).
- Untertitel immer Wort für Wort, gut lesbar, im Sicherheitsbereich.
- Nach dem Rendern prüfen: Zählt man im Preview mehr als 6 Wechsel in 15 s?

## Look v3 (seit 2026-11-27, Standard für neue Videos)
In `job.json` `"look": "v3"` setzen (oder `?look=v3` an der Seite). Gewählt: Entwurf H „Satellit Nachtblau“ (`design/v3c.html?s=H`).
- Satellit abgedunkelt und nachtblau eingefärbt, scharfe hellblaue Küstenlinien darüber.
- Untertitel: Hanken Grotesk 800, weiß ohne Kontur mit weichem Schatten, max. 4 Wörter, Umbruch an Satzzeichen; aktives Wort dunkelblau auf weißer Box. Kein pinker Text mehr.
- `label()` (Chips, Tags) als Glas-Pille; rote/pinke Chips werden zu kräftigen pinken Pillen, farbige Chips bekommen einen Farbpunkt.
- `KV.bigText()` für große Zahlen/Wörter: ohne Kontur, weicher Schatten; Gelb/Cyan werden weiß, Rot wird Pink. Im story.js `big()` darauf umleiten: `if(KV.LOOK==='v3') return KV.bigText(ctx,txt,a,y,col,size);`

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
