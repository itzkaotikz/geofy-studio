#!/usr/bin/env python3
"""SFX-Spur für Geofy-Wissensvideos: Whoosh bei Szenenstarts, Pop bei Schlüsselwörtern.
Usage: python3 sfx.py out/<name>.json out/sfx_<x>.wav"""
import sys, json, wave, numpy as np
SR = 48000
meta = json.load(open(sys.argv[1]))
total = meta['total'] + 1.0
buf = np.zeros(int(total * SR))
rng = np.random.default_rng(7)

def whoosh(d=0.55):
    n = int(d * SR); x = rng.standard_normal(n)
    # band-sweep: simple one-pole lowpass with rising cutoff
    y = np.zeros(n); a = 0.0
    for i in range(n):
        c = 0.02 + 0.25 * (i / n); a += c * (x[i] - a); y[i] = a
    env = np.sin(np.pi * np.linspace(0, 1, n)) ** 2
    return y * env / (np.abs(y).max() + 1e-9) * 0.6

def pop(d=0.09):
    n = int(d * SR); t = np.arange(n) / SR
    f = 900 * np.exp(-t * 25) + 380
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 45) * 0.55

W, Pp = whoosh(), pop()
def add(sig, t):
    i = int(max(0, t) * SR); j = min(len(buf), i + len(sig)); buf[i:j] += sig[:j - i]
for k, sc in enumerate(meta['scenes']):
    if k > 0: add(W, sc['start'] - 0.25)
for ev in meta['events']:
    if ev.get('kind') == 'pop': add(Pp, ev['t'])
buf = np.clip(buf, -1, 1)
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((buf * 32767).astype(np.int16).tobytes())
print('ok', len(meta['scenes']), 'scenes', len(meta['events']), 'events')
