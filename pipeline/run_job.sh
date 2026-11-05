#!/usr/bin/env bash
# Komplette Produktion eines Jobs: Timing -> Video -> Soundeffekte -> Mix -> Cover -> Captions.
# usage: pipeline/run_job.sh <slug>      (aus dem Repo-Hauptverzeichnis)
set -euo pipefail
SLUG="$1"; ROOT="$(cd "$(dirname "$0")/.." && pwd)"; J="$ROOT/jobs/$SLUG"; O="$ROOT/out/$SLUG"
PORT="${PORT:-8766}"; mkdir -p "$O"
[ -f "$J/voice.mp3" ] || { echo "Keine Stimme: $J/voice.mp3 fehlt"; exit 1; }
cd "$ROOT"
python3 -m http.server "$PORT" >/dev/null 2>&1 & SRV=$!; trap 'kill $SRV 2>/dev/null || true' EXIT; sleep 2
SP=""; python3 -c "import json,sys;j=json.load(open('$J/job.json'));json.dump(j.get('spoken',{}),open('$O/spoken.json','w'))" && SP="$O/spoken.json"
python3 pipeline/align.py "$J/script.txt" "$J/voice.mp3" "$J/timing.json" $SP | tail -3
node pipeline/render.js "$SLUG" preview
node pipeline/render.js "$SLUG" video 30
python3 pipeline/sfx.py "$O/meta.json" "$O/sfx.wav"
D=$(python3 -c "import subprocess;print(round(float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','$J/voice.mp3']))+1.5,2))")
ffmpeg -y -loglevel error -i "$O/silent.mp4" -i "$J/voice.mp3" -i "$O/sfx.wav" -filter_complex \
 "[1:a]aresample=48000,apad[v];[2:a]volume=0.5[s];[v][s]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 48000 -t "$D" -movflags +faststart "$O/$SLUG.mp4"
node pipeline/render.js "$SLUG" cover && mv "$O/cover.png" "$O/cover_$SLUG.png"
python3 pipeline/captions.py "$SLUG" >/dev/null
echo "$D" > "$O/duration.txt"
echo "FERTIG $SLUG ($D s)"; ls -la "$O"
