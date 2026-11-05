#!/usr/bin/env python3
"""Caption-Paket für alle Plattformen aus jobs/<slug>/job.json.
usage: python3 pipeline/captions.py <slug>  -> out/<slug>/captions.txt"""
import json, os, sys
slug = sys.argv[1]
root = os.path.join(os.path.dirname(__file__), '..')
job = json.load(open(os.path.join(root, 'jobs', slug, 'job.json')))
tags = ' '.join(job.get('hashtags', []))
cap = job.get('caption', '').strip()
title = job.get('youtube_title') or job.get('title', slug)
story = job.get('story') or {}
blocks = [
    ('TikTok', f"{cap}\n\n{tags}"),
    ('Instagram Reel', f"{cap}\n\n{tags}"),
    ('YouTube Shorts – Titel', f"{title[:95]} #shorts"),
    ('YouTube Shorts – Beschreibung', f"{cap}\n\n{tags} #shorts"),
]
if story:
    blocks.append(('Instagram Story (Umfrage)', story.get('question', '') + '\n' + ' / '.join(story.get('options', []))))
blocks.append(('Highlight', job.get('highlight') or job.get('series', 'Geofy')))
if job.get('check'):
    blocks.append(('Vor dem Posten prüfen', '\n'.join('- ' + c for c in job['check'])))
os.makedirs(os.path.join(root, 'out', slug), exist_ok=True)
txt = '\n\n'.join(f"=== {h} ===\n{b}" for h, b in blocks) + '\n'
open(os.path.join(root, 'out', slug, 'captions.txt'), 'w').write(txt)
print(txt)
