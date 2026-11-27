#!/usr/bin/env python3
"""Untertitel (.srt) und YouTube-Kapitelmarken aus timing.json erzeugen.
usage: python3 pipeline/srt.py <slug>   -> out/<slug>/<slug>.srt und out/<slug>/kapitel.txt
Kapitel kommen aus job.json "chapters" [{title,start}] (start = Absatz-Index, 0-basiert)."""
import json, sys, os

slug = sys.argv[1]
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
J, O = f"{root}/jobs/{slug}", f"{root}/out/{slug}"
os.makedirs(O, exist_ok=True)
timing = json.load(open(f"{J}/timing.json"))
job = json.load(open(f"{J}/job.json"))
T = timing["scenes"]


def ts(t, sep=","):
    t = max(0, t); h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f"{h:02d}:{m:02d}:{int(s):02d}{sep}{int(round((s - int(s)) * 1000)) % 1000:03d}"


# Untertitel: max. 42 Zeichen / 8 Wörter, Umbruch bevorzugt an Satzzeichen
cues, cur = [], []
for sc in T:
    for w in sc["words"]:
        cur.append(w)
        txt = " ".join(x["w"] for x in cur)
        end_punct = w["w"][-1:] in ".!?:;" and not w["w"][:-1].isdigit()
        if end_punct or (w["w"][-1:] == "," and len(txt) > 24) or len(txt) > 42 or len(cur) >= 8:
            cues.append(cur); cur = []
    if cur: cues.append(cur); cur = []
lines = []
for i, c in enumerate(cues):
    t0 = c[0]["t0"]; t1 = c[-1]["t1"] + 0.25
    if i + 1 < len(cues): t1 = min(t1, cues[i + 1][0]["t0"] - 0.02)
    lines.append(f"{i+1}\n{ts(t0)} --> {ts(t1)}\n{' '.join(x['w'] for x in c)}\n")
open(f"{O}/{slug}.srt", "w").write("\n".join(lines))

# Kapitelmarken (gleiche Szenenstarts wie die Engine)
starts = [0] + [max(T[i - 1]["speechEnd"] + 0.05, T[i]["speechStart"] - 0.35) for i in range(1, len(T))]
out = []
for ch in job.get("chapters", []):
    t = 0 if ch["start"] == 0 else starts[ch["start"]]
    m, s = divmod(int(t), 60)
    title = ch["title"].split(" – ", 1)[-1] if ch["title"].startswith("Kapitel") else ch["title"]
    out.append(f"{m}:{s:02d} {title}")
open(f"{O}/kapitel.txt", "w").write("\n".join(out) + "\n")
print(f"{len(cues)} Untertitel, {len(out)} Kapitel"); print("\n".join(out))
