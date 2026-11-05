#!/usr/bin/env python3
"""Baut jobs/index.json (Übersicht fürs Board) aus allen jobs/*/job.json."""
import json, os, glob
root = os.path.join(os.path.dirname(__file__), '..')
ORDER = ['idee', 'skript', 'wartet-auf-stimme', 'in-produktion', 'fertig', 'veroeffentlicht']
jobs = []
for f in sorted(glob.glob(os.path.join(root, 'jobs', '*', 'job.json'))):
    j = json.load(open(f)); d = os.path.dirname(f); slug = os.path.basename(d)
    script = open(os.path.join(d, 'script.txt')).read().strip() if os.path.exists(os.path.join(d, 'script.txt')) else ''
    jobs.append({k: j.get(k) for k in ['title', 'series', 'nr', 'status', 'created', 'caption', 'hashtags', 'release', 'duration', 'error', 'check', 'priority']}
                | {'slug': slug, 'words': len(script.split()), 'has_voice': os.path.exists(os.path.join(d, 'voice.mp3'))})
jobs.sort(key=lambda j: (ORDER.index(j['status']) if j['status'] in ORDER else 9, j.get('priority') or 99, j.get('created') or ''))
json.dump({'updated': __import__('datetime').datetime.now(__import__('datetime').timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'), 'jobs': jobs}, open(os.path.join(root, 'jobs', 'index.json'), 'w'), ensure_ascii=False, indent=1)
print(len(jobs), 'jobs')
