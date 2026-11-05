# Geofy Pipeline: Wort-Timing aus Skript + Sprachaufnahme (Silbenrhythmus).
# usage: python3 align.py script.txt voice.mp3 timing.json [spoken.json]
# Better alignment: syllable nuclei from the audio give the local speaking rhythm.
import json, re, sys, numpy as np, subprocess
SCRIPT, MP3, OUT = sys.argv[1], sys.argv[2], sys.argv[3]  # optional argv[4]: job spoken.json
scenes=[re.sub(r'\s+',' ',p).strip() for p in open(SCRIPT).read().strip().split('\n\n')]
SPOKEN={'Helgoland':'helgoland','Sansibar':'sansibar','Helgoland-Sansibar-Vertrag':'helgoland sansibar vertrag','Caprivi-Zipfel':'kaprivi zipfel','Kaiser-Wilhelm-Kanal':'kaiser wilhelm kanal','1807':'achtzehnhundertsieben','1890':'achtzehnhundertneunzig','1947':'neunzehnhundertsiebenundvierzig','1952':'neunzehnhundertzweiundfünfzig','1.300':'eintausenddreihundert','50':'fünfzig','Elbe':'elbe','Weser':'weser','Namibia':'namibia','Tansania':'tansania','Nemo':'nemo','Ducie':'duzi','Osterinsel':'osterinsel','2.700':'zweitausendsiebenhundert','1992':'neunzehnhundertzweiundneunzig','2001':'zweitausendeins','Mir':'mir','Jules':'schüll','Vernes':'fernes','ISS':'i es es','400':'vierhundert','2030er':'zweitausenddreißiger','Point':'point','Transnistrien':'transnistrien','Tiraspol':'tiraspol','Dnjestr':'dnjestr','Moldau':'moldau','1990':'neunzehnhundertneunzig','1992':'neunzehnhundertzweiundneunzig','2021':'zweitausendeinundzwanzig','400':'vierhundert','20':'zwanzig','Llívia':'livia','1.500':'eintausendfünfhundert','13':'dreizehn','1659':'sechzehnhundertneunundfünfzig','33':'dreiunddreißig','350':'dreihundertfünfzig','Pyrenäenfrieden':'pyrenäenfrieden','Halaib':'halaib','Hala\'ib':'halaib','2.000':'zweitausend','1899':'achtzehnhundertneunundneunzig','1902':'neunzehnhundertzwei','22':'zweiundzwanzigsten','2014':'zweitausendvierzehn','US-Amerikaner':'us amerikaner','1870':'achtzehnhundertsiebzig','1871':'achtzehnhunderteinundsiebzig','1919':'neunzehnhundertneunzehn','1940':'neunzehnhundertvierzig','1945':'neunzehnhundertfünfundvierzig','74':'vierundsiebzig','Elsässische':'elsässische','Versailles':'versailles','Lothringen':'lothringen','Suwałki-Lücke':'suwalki lücke','Suwałki':'suwalki','65':'fünfundsechzig','2004':'zweitausendvier','Hormus':'hormus','33':'dreiunddreißig','Achtzigerjahren':'achtzigerjahren','Vereinigten':'vereinigten','Ägypten':'ägypten','Assuan-Staudamms':'assuan staudamms','Nilflut':'nilflut','1.500':'eintausendfünfhundert','5.000':'fünftausend','1960er':'neunzehnhundertsechziger','100':'hundert','20':'zwanzig','Ankara':'ankara','Ankara.':'ankara','Mustafa':'mustafa','Kemal':'kemal','1920':'neunzehnhundertzwanzig','13.':'dreizehnten','1923':'neunzehnhundertdreiundzwanzig','Sultanat':'sultanat','Anatolien,':'anatolien','Bahnanschluss.':'bahnanschluss','Naypyidaw':'ne pi dau','Naypyidaw.':'ne pi dau','Myanmar':'mjanmar','Rangun':'rangun','2005':'zweitausendfünf','2002':'zweitausendzwei','320':'dreihundertzwanzig','20.':'zwanzigsten','1914':'neunzehnhundertvierzehn','540.000':'fünfhundertvierzigtausend','1919':'neunzehnhundertneunzehn','13':'dreizehn','1945':'neunzehnhundertfünfundvierzig','1937':'neunzehnhundertsiebenunddreißig','1990':'neunzehnhundertneunzig','358.000':'dreihundertachtundfünfzigtausend','Elsass-Lothringen':'elsass lotringen','Posen':'posen','Westpreußen':'westpreußen','Westpreußens':'westpreußens','Versailles':'wersai','Oder':'oder','Neiße':'neiße','Schlesien,':'schlesien','Pommern':'pommern','Ostpreußen':'ostpreußen','Oder-Neiße-Grenze':'oder neiße grenze','97':'siebenundneunzig','700':'siebenhundert','1354':'dreizehnhundertvierundfünfzig','1453':'vierzehnhundertdreiundfünfzig','1923':'neunzehnhundertdreiundzwanzig','Dardanellen':'dardanellen','Marmarameers':'marmarameers','Ostthrakien':'osttrakien','Konstantinopel':'konstantinopel','Gallipoli':'galipoli','Mariza':'maritsa','Lausanne':'losan','Istanbul':'istanbul','15':'fünfzehn','AMOC':'a mok','1.600':'sechzehnhundert','1950':'neunzehnhundertfünfzig','2025':'zweitausendfünfundzwanzig','2095':'zweitausendfünfundneunzig','2057':'zweitausendsiebenundfünfzig','15':'fünfzehn','Golfstrom':'golfstrom','13.':'dreizehnten','1932':'neunzehnhundertzweiunddreißig','1953':'neunzehnhundertdreiundfünfzig','1.800':'eintausendachthundert','1997':'neunzehnhundertsiebenundneunzig','30':'dreißig','Zuiderzee':'seuderse','IJsselmeer':'eisselmeer','2,3':'zwei komma drei','Mercator-Karte':'merkator karte','1812':'achtzehnhundertzwölf','1941':'neunzehnhunderteinundvierzig','615.000':'sechshundertfünfzehntausend','30':'dreißig','100.000':'hunderttausend','130.000':'hundertdreißigtausend','200':'zweihundert','13.':'dreizehnten','Njemen':'njemen','160':'hundertsechzig','1908':'neunzehnhundertacht','1901':'neunzehnhunderteins','1927':'neunzehnhundertsiebenundzwanzig','1913':'neunzehnhundertdreizehn','Canberra':'kanbera','Burley':'börli','Griffin':'griffin','11.000':'elftausend','21.000':'einundzwanzigtausend','230':'zweihundertdreißig','5.000':'fünftausend','6.000':'sechstausend','Tassili':'tassili','n\'Ajjer':'ana scher','1810':'achtzehnhundertzehn','1871':'achtzehnhunderteinundsiebzig','1918':'neunzehnhundertachtzehn','96':'sechsundneunzig','1.400':'vierzehnhundert','KN':'ka en','BÜS':'bü es','1879':'achtzehnhundertneunundsiebzig','1904':'neunzehnhundertvier','23.':'dreiundzwanzigsten','2018':'zweitausendachtzehn','4.270':'viertausendzweihundertsiebzig','177':'hundertsiebenundsiebzig','6.000':'sechstausend','1960':'neunzehnhundertsechzig','9,5':'neun komma fünf','1881':'achtzehnhunderteinundachtzig','14-mal':'vierzehnmal','1569':'fünfzehnhundertneunundsechzig','23':'dreiundzwanzig','1945':'neunzehnhundertfünfundvierzig','1946':'neunzehnhundertsechsundvierzig','1991':'neunzehnhunderteinundneunzig','90':'neunzig','Guadeloupe':'gwadelup','Réunion':'reünjon','Mayotte':'majot','USA':'u es a','EU':'e u','4.000':'viertausend','55':'fünfundfünfzig','Yuxi':'jüschi','27-mal':'siebenundzwanzigmal','48-mal':'achtundvierzigmal','85-mal':'fünfundachtzigmal','60':'sechzig','20':'zwanzig','1884':'achtzehnhundertvierundachtzig','1964':'neunzehnhundertvierundsechzig','22.':'zweiundzwanzigsten','350':'dreihundertfünfzig','200':'zweihundert','40':'vierzig','1659':'sechzehnhundertneunundfünfzig','Hendaye':'ondai','Hendaye.':'ondai','70':'siebzig','1880':'achtzehnhundertachtzig','Mumbai':'mumbei','450':'vierhundertfünfzig','193':'hundertdreiundneunzig','1869':'achtzehnhundertneunundsechzig','6.000':'sechstausend','400':'vierhundert','2023':'zweitausenddreiundzwanzig','2021':'zweitausendeinundzwanzig','Ever':'ewer','Given':'giwen','340':'dreihundertvierzig','41':'einundvierzig','150':'hundertfünfzig','50':'fünfzig','300':'dreihundert','19.':'neunzehnten','1889':'achtzehnhundertneunundachtzig','2019':'zweitausendneunzehn','1982':'neunzehnhundertzweiundachtzig','1843':'achtzehnhundertdreiundvierzig','1995':'neunzehnhundertfünfundneunzig','Baarle':'barle','22':'zweiundzwanzig','30':'dreißig','1980er-':'neunzehnhundertachtziger','1990er-Jahren.':'neunzehnhundertneunziger jahren','1990er-Jahren':'neunzehnhundertneunziger jahren','Wadis.':'wadis','1960':'neunzehnhundertsechzig','900':'neunhundert','1891':'achtzehnhunderteinundneunzig','1987':'neunzehnhundertsiebenundachtzig','Juscelino':'schuselino','Kubitschek':'kubitschek','5.000':'fünftausend','13.000':'dreizehntausend','17.000.':'siebzehntausend','900':'neunhundert','288':'zweihundertachtundachtzig','7,2':'sieben komma zwei','1867.':'achtzehnhundertsiebenundsechzig','130':'hundertdreißig','Seward.':'siuard','536':'fünfhundertsechsunddreißig','251':'zweihunderteinundfünfzig','173':'hundertdreiundsiebzig','72':'zweiundsiebzig','28':'achtundzwanzig','850':'achthundertfünfzig','70':'siebzig','14':'vierzehn','250':'zweihundertfünfzig','1788':'siebzehnhundertachtundachtzig','98':'achtundneunzig','17':'siebzehn','10':'zehn','26':'sechsundzwanzig','80':'achtzig','36.':'sechsunddreißig','22.000':'zweiundzwanzigtausend','5.600.':'fünftausendsechshundert','1914':'neunzehnhundertvierzehn','1999':'neunzehnhundertneunundneunzig','Gatúnsee,':'gatunsee','30.':'dreißigsten','2011':'zweitausendelf','29.,':'neunundzwanzigsten','31.':'einunddreißigste','1892':'achtzehnhundertzweiundneunzig','21':'einundzwanzig','23':'dreiundzwanzig','1.636':'sechzehnhundertsechsunddreißig','1342':'dreizehnhundertzweiundvierzig','1844':'achtzehnhundertvierundvierzig','1850.':'achtzehnhundertfünfzig','1868':'achtzehnhundertachtundsechzig','D-Mark.':'de mark','350':'dreihundertfünfzig','13':'dreizehn','1895':'achtzehnhundertfünfundneunzig','92':'zweiundneunzig','4.900':'viertausendneunhundert','18.000':'achtzehntausend','Wakhan-Korridor.':'wachan korridor','Wachdschir-Pass':'wachdschir pass','Mercator-Karte.':'merkator karte'}

def _num_de(n):
    E=['','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn']
    Z=['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig']
    def u100(n):
        if n<20: return E[n]
        return (('ein' if n%10==1 else E[n%10])+'und' if n%10 else '')+Z[n//10]
    def u1000(n):
        return ((E[n//100] if n//100!=1 else 'ein')+'hundert' if n>=100 else '')+u100(n%100)
    if 1100<=n<=1999: return u100(n//100)+'hundert'+u100(n%100)
    if n>=1000000: return u1000(n//1000000)+'millionen'+_num_de(n%1000000)
    if n>=1000: return u1000(n//1000)+'tausend'+u1000(n%1000)
    return u1000(n) or 'null'
if len(sys.argv)>4:
    SPOKEN.update(json.load(open(sys.argv[4])))
_orig_get=SPOKEN.get
class _Sp(dict):
    def get(self,k,d=None):
        if k in self: return dict.__getitem__(self,k)
        kk=k.replace('.','')
        if kk.isdigit(): return _num_de(int(kk))
        m=re.match(r'^(\d+)(er|s|%)$',kk)
        if m: return _num_de(int(m.group(1)))+m.group(2)
        return d
SPOKEN=_Sp(SPOKEN)
def syl(w):
    core=re.sub(r'[^\wäöüÄÖÜß.,\-]','',w).strip('.,:?!')
    s=SPOKEN.get(core,core).lower().replace('-',' ')
    s=re.sub(r'(ie|ei|ai|au|eu|äu)','a',s)
    return max(1,len(re.findall(r'[aeiouyäöü]+',s)))
sr=16000
x=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',MP3,'-ac','1','-ar',str(sr),'-f','s16le','-'],capture_output=True).stdout,dtype=np.int16).astype(float)/32768
hop=160; win=400; n=(len(x)-win)//hop
frames=np.lib.stride_tricks.sliding_window_view(x,win)[::hop][:n]*np.hanning(win)
spec=np.abs(np.fft.rfft(frames,axis=1))**2; f=np.fft.rfftfreq(win,1/sr)
band=spec[:,(f>300)&(f<2500)].sum(1); full=spec.sum(1)
db=10*np.log10(full+1e-12); thr=db.max()-40
env=np.convolve(10*np.log10(band+1e-12),np.ones(5)/5,mode='same')
voiced=db>thr
# pauses
P=[]; i=0
while i<n:
    if not voiced[i]:
        j=i
        while j<n and not voiced[j]: j+=1
        if (j-i)>=4: P.append((i*0.01,j*0.01))
        i=j
    else: i+=1
t_on=np.argmax(voiced)*0.01; t_off=(n-np.argmax(voiced[::-1]))*0.01
P=[p for p in P if p[0]>t_on and p[1]<t_off]
# syllable nuclei: peaks of the band envelope, at least 90 ms apart and 4 dB above the surrounding dip
peaks=[]
for k in range(2,n-2):
    if not voiced[k]: continue
    if env[k]>=env[k-1] and env[k]>env[k+1] and env[k]>=env[k-2] and env[k]>env[k+2]:
        lo=max(0,k-15); hi=min(n,k+15); dip=min(env[lo:k].min(),env[k:hi].min())
        if env[k]-dip>4: 
            if peaks and k-peaks[-1]<9:
                if env[k]>env[peaks[-1]]: peaks[-1]=k
            else: peaks.append(k)
nuc=np.array(peaks)*0.01
toks=[]
for si,s in enumerate(scenes):
    ws=s.split()
    for wi,w in enumerate(ws):
        b=3 if wi==len(ws)-1 else 2 if re.search(r'[.?!:]$',w) else 1 if w.endswith(',') else 0
        toks.append(dict(w=w,scene=si,syl=syl(w),b=b))
tot=sum(t['syl'] for t in toks)
def nuc_time(c):  # time where the c-th text syllable (fractional) should be, via audio nuclei
    pos=c/tot*(len(nuc)-1); i=int(np.floor(pos)); r=pos-i
    if i>=len(nuc)-1: return nuc[-1]
    return nuc[i]*(1-r)+nuc[i+1]*r
acc=0; B=[]; cum=[]
for k,t in enumerate(toks):
    acc+=t['syl']
    if t['b']>0 and k<len(toks)-1: B.append((k,t['b'],acc))
voiced_time=(t_off-t_on)-sum(b-a for a,b in P); rate=voiced_time/tot
nB,nP=len(B),len(P); pc=[(a+b)/2 for a,b in P]; dur=[b-a for a,b in P]; INF=1e9
# DP with relative timing: each anchor is expected 'syllables since last anchor x speaking rate' after the previous one
best={(0,0):(0.0,0,t_on,None)}  # (b,j) -> (cost,lastSyl,lastT,back)
states=[{} for _ in range(nB+1)]; states[0][0]=(0.0,0,t_on,None)
for b in range(nB):
    k,typ,acc=B[b]
    for j,(c0,ls,lt,_) in states[b].items():
        skip=0.8 if typ==1 else (2.0 if typ==2 else 6)
        cand=(c0+skip,ls,lt,(j,None))
        if j not in states[b+1] or cand[0]<states[b+1][j][0]: states[b+1][j]=cand
        e=lt+(acc-ls)*rate
        for jj in range(j,nP):
            if P[jj][0]<lt: continue
            d=abs(P[jj][0]-e)
            if P[jj][0]>e+3: break
            if d>3: continue
            c=c0+d*2.0-min(dur[jj],0.6)*(3 if typ==3 else 2)+(3.0 if typ==3 and dur[jj]<0.3 else 0)+(0.6 if dur[jj]<0.07 else 0)+sum(0.25+min(dur[x],0.6)*3 for x in range(j,jj))
            cand=(c,acc,P[jj][1],(j,jj))
            if jj+1 not in states[b+1] or c<states[b+1][jj+1][0]: states[b+1][jj+1]=cand
fin=min(states[nB].items(),key=lambda kv:kv[1][0]+sum(0.25+min(dur[x],0.6)*3 for x in range(kv[0],nP)))
j=fin[0]; match=[None]*nB; b=nB
while b>0:
    pj,used=states[b][j][3]; match[b-1]=used; j=pj; b-=1
B=[(k,typ,0.0) for k,typ,acc in B]
anch={B[i][0]:P[m] for i,m in enumerate(match) if m is not None}
# word times inside each segment: follow the audio nuclei that fall into the segment
times=[None]*len(toks); seg_start=t_on; seg=[]
for k,t in enumerate(toks):
    seg.append(k)
    if k in anch or k==len(toks)-1:
        seg_end=anch[k][0] if k in anch else t_off
        nn=[v for v in nuc if seg_start-0.02<=v<=seg_end+0.02]
        S=sum(toks[x]['syl'] for x in seg)
        def at(c):  # c syllables into the segment -> time
            if len(nn)<2: return seg_start+(seg_end-seg_start)*c/S
            pos=c/S*len(nn)-0.5
            if pos<=0: return seg_start+(nn[0]-seg_start)*max(0,(pos+0.5))*2 if pos>-0.5 else seg_start
            if pos>=len(nn)-1: r=(pos-(len(nn)-1))*2; return nn[-1]+(seg_end-nn[-1])*min(1,r)
            i=int(pos); r=pos-i; return nn[i]*(1-r)+nn[i+1]*r
        c=0
        for x in seg:
            a=seg_start if c==0 else at(c); c+=toks[x]['syl']; e=seg_end if x==seg[-1] else at(c)
            times[x]=(round(a,3),round(max(a+0.05,e),3))
        seg_start=anch[k][1] if k in anch else t_off; seg=[]
out=[]
for si in range(len(scenes)):
    ws=[dict(w=toks[k]['w'],t0=times[k][0],t1=times[k][1]) for k in range(len(toks)) if toks[k]['scene']==si]
    out.append(dict(words=ws,speechStart=ws[0]['t0'],speechEnd=ws[-1]['t1']))
json.dump(dict(audio=n*0.01,onset=t_on,offset=t_off,scenes=out),open(OUT,'w'),indent=1)
print('nuclei',len(nuc),'text syllables',tot,'pauses',nP)
for (k,typ,e),m in zip(B,match): print(f"{toks[k]['w']:<22} t{typ} exp {e:6.2f} -> {('%.2f-%.2f'%P[m]) if m is not None else '—'}")
