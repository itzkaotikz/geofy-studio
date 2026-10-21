import json, re, numpy as np, sys
import sys, re as _re
SCRIPT=sys.argv[1] if len(sys.argv)>1 else None; DB=sys.argv[2] if len(sys.argv)>2 else 'db.npy'; OUT=sys.argv[3] if len(sys.argv)>3 else 'timing_chile.json'
scenes=[_re.sub(r'\s+',' ',p).strip() for p in open(SCRIPT).read().strip().split('\n\n')] if SCRIPT else [s['say'] for s in json.load(open('out/chile.json'))['scenes']]
SPOKEN={'4.270':'viertausendzweihundertsiebzig','177':'hundertsiebenundsiebzig','6.000':'sechstausend','1960':'neunzehnhundertsechzig','9,5':'neun komma fünf','1881':'achtzehnhunderteinundachtzig','14-mal':'vierzehnmal','1569':'fünfzehnhundertneunundsechzig','23':'dreiundzwanzig','1945':'neunzehnhundertfünfundvierzig','1946':'neunzehnhundertsechsundvierzig','1991':'neunzehnhunderteinundneunzig','90':'neunzig','Guadeloupe':'gwadelup','Réunion':'reünjon','Mayotte':'majot'}
def syl(w):
    core=re.sub(r'[^\wäöüÄÖÜß.,]','',w); core=core.strip('.,:?!')
    s=SPOKEN.get(core,core).lower()
    return max(1,len(re.findall(r'[aeiouyäöü]+',s)))
db=np.load(DB); hop=0.01
# speech onset / offset
thr=db.max()-38; act=np.where(db>thr)[0]; t_on=act[0]*hop; t_off=act[-1]*hop+0.02
# pauses (start,end)
sil=db<thr; P=[]; i=0
while i<len(sil):
    if sil[i]:
        j=i
        while j<len(sil) and sil[j]: j+=1
        if (j-i)*hop>=0.07 and i*hop>t_on and j*hop<t_off: P.append((i*hop,j*hop))
        i=j
    else: i+=1
# tokens with boundary type after each word: 3 scene end, 2 sentence end, 1 comma, 0 none
toks=[]
for si,s in enumerate(scenes):
    ws=s.split()
    for wi,w in enumerate(ws):
        b=0
        if wi==len(ws)-1: b=3
        elif re.search(r'[.?!:]$',w): b=2
        elif w.endswith(','): b=1
        toks.append(dict(w=w,scene=si,syl=syl(w),b=b))
# expected time of each boundary: syllable share of the speaking time (minus pauses)
tot=sum(t['syl'] for t in toks); speak=(t_off-t_on)-sum(e-s for s,e in P)
acc=0; B=[]
for k,t in enumerate(toks):
    acc+=t['syl']
    if t['b']>0 and k<len(toks)-1: B.append((k,t['b'],acc/tot))
# DP: match boundaries to pauses monotonically
nB,nP=len(B),len(P); INF=1e9
pc=[(s+e)/2 for s,e in P]; dur=[e-s for s,e in P]
def exp_time(frac,j_prev_end=None): return t_on+frac*(t_off-t_on)
cost=np.full((nB+1,nP+1),INF); back={}
cost[0][0]=0
# state: processed b boundaries, last used pause index (j means pauses < j are consumed)
import functools
best=[[INF]*(nP+1) for _ in range(nB+1)]; best[0][0]=0; arg={}
for b in range(nB):
    k,typ,frac=B[b]; e=exp_time(frac)
    for j in range(nP+1):
        c0=best[b][j]
        if c0>=INF: continue
        # option skip (no pause) – only allowed for commas
        if typ==1:
            c=c0+1.2
            if c<best[b+1][j]: best[b+1][j]=c; arg[(b+1,j)]=(j,None)
        for jj in range(j,nP):
            d=abs(pc[jj]-e)
            if d>4.0: 
                if pc[jj]>e: break
                continue
            c=c0+d*1.0-dur[jj]*(3 if typ==3 else 1.5) + (3.0 if typ==3 and dur[jj]<0.3 else 0) + (1.0 if typ==2 and dur[jj]<0.12 else 0)
            # skipping pauses between j and jj costs a little (unexplained pauses)
            c+= sum(0.4+dur[x]*2 for x in range(j,jj))
            if c<best[b+1][jj+1]: best[b+1][jj+1]=c; arg[(b+1,jj+1)]=(j,jj)
# finish: remaining pauses unexplained
endc=[best[nB][j]+sum(0.4+dur[x]*2 for x in range(j,nP)) for j in range(nP+1)]
j=int(np.argmin(endc)); match=[None]*nB; b=nB
while b>0:
    pj,used=arg[(b,j)]; match[b-1]=used; j=pj; b-=1
# anchors: word index -> (end time of word, start time of next word)
anch={}
for (k,typ,frac),m in zip(B,match):
    if m is not None: anch[k]=P[m]
# assign word times segment by segment
times=[None]*len(toks); seg_start=t_on; seg=[]
for k,t in enumerate(toks):
    seg.append(k)
    if k in anch or k==len(toks)-1:
        seg_end=anch[k][0] if k in anch else t_off
        s_tot=sum(toks[x]['syl'] for x in seg); a=seg_start
        for x in seg:
            d=(seg_end-seg_start)*toks[x]['syl']/s_tot; times[x]=(round(a,3),round(a+d,3)); a+=d
        seg_start=anch[k][1] if k in anch else t_off; seg=[]
out=[]
for si in range(len(scenes)):
    ws=[dict(w=toks[k]['w'],t0=times[k][0],t1=times[k][1]) for k in range(len(toks)) if toks[k]['scene']==si]
    out.append(dict(words=ws,speechStart=ws[0]['t0'],speechEnd=ws[-1]['t1']))
json.dump(dict(audio=float(len(db)*hop),onset=t_on,offset=t_off,scenes=out),open(OUT,'w'),indent=1)
for si,o in enumerate(out): print(si+1, o['speechStart'], o['speechEnd'], ' '.join(w['w'] for w in o['words'][:4]))
print('unmatched boundaries:',[ (toks[k]['w'],typ) for (k,typ,f),m in zip(B,match) if m is None])
print('pauses used',sum(m is not None for m in match),'of',nP)
for (k,typ,frac),m in zip(B,match):
    print(f"{toks[k]['w']:<14} t{typ} exp {exp_time(frac):6.2f} -> {('%.2f-%.2f'%P[m]) if m is not None else '—'}")
