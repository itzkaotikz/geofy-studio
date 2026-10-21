// Geofy · Wort-Synchronisation im Browser (Port von wissen-videos/align.py)
// Pausen + Silbenkerne aus der Tonspur, Satz-/Szenengrenzen per DP auf Pausen gelegt,
// Wörter dazwischen folgen dem Silbenrhythmus. Ergebnis: {audio,onset,offset,scenes:[{words:[{w,t0,t1}],speechStart,speechEnd}]}
(function(){
'use strict';
// ---------- deutsche Zahlwörter (nur zum Silbenzählen) ----------
const E=['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'];
const Z=['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];
function u100(n){if(n<20) return n===1?'ein':E[n]; const t=Math.floor(n/10), e=n%10; return (e?(e===1?'ein':E[e])+'und':'')+Z[t];}
function u1000(n){const h=Math.floor(n/100), r=n%100; return (h?(h===1?'ein':E[h])+'hundert':'')+(r?u100(r):'');}
function num(n){if(n===0) return 'null'; let s=''; const mrd=Math.floor(n/1e9), mio=Math.floor(n/1e6)%1000, tsd=Math.floor(n/1000)%1000, r=n%1000;
 if(mrd) s+=u1000(mrd)+' milliarden '; if(mio) s+=u1000(mio)+' millionen '; if(tsd) s+=u1000(tsd)+'tausend'; if(r) s+=u1000(r); return s.trim();}
function year(n){if(n>=1100&&n<2000) return u100(Math.floor(n/100))+'hundert'+(n%100?u100(n%100):''); return num(n);}
function spoken(core){
 let m;
 if((m=core.match(/^(\d{1,3}(?:\.\d{3})+|\d+)(?:-mal)?$/))){const n=parseInt(m[1].replace(/\./g,''),10); const w=(n>=1100&&n<=2099&&!m[1].includes('.'))?year(n):num(n); return w+(core.endsWith('-mal')?'mal':'');}
 if((m=core.match(/^(\d+),(\d+)$/))) return num(+m[1])+' komma '+m[2].split('').map(d=>E[+d]).join(' ');
 if((m=core.match(/^(\d+)\.$/))) return num(+m[1])+'ten';
 const A={USA:'u es a',EU:'e u',UN:'u en',UNO:'uno',NATO:'nato',km:'kilometer'}; if(A[core]) return A[core];
 return core;}
function syl(w){const core=w.replace(/[^\wäöüÄÖÜß.,\-]/g,'').replace(/^[.,:?!]+|[.,:?!]+$/g,'');
 let s=spoken(core).toLowerCase().replace(/-/g,' ');
 s=s.replace(/(ie|ei|ai|au|eu|äu)/g,'a'); const m=s.match(/[aeiouyäöü]+/g); return Math.max(1,m?m.length:0);}

// ---------- FFT (radix-2) ----------
function fftMag2(re,im){const n=re.length; for(let i=1,j=0;i<n;i++){let b=n>>1; for(;j&b;b>>=1) j^=b; j^=b; if(i<j){[re[i],re[j]]=[re[j],re[i]];[im[i],im[j]]=[im[j],im[i]];}}
 for(let len=2;len<=n;len<<=1){const a=-2*Math.PI/len, wr=Math.cos(a), wi=Math.sin(a); for(let i=0;i<n;i+=len){let cr=1,ci=0; for(let k=0;k<len/2;k++){const ur=re[i+k],ui=im[i+k], vr=re[i+k+len/2]*cr-im[i+k+len/2]*ci, vi=re[i+k+len/2]*ci+im[i+k+len/2]*cr; re[i+k]=ur+vr; im[i+k]=ui+vi; re[i+k+len/2]=ur-vr; im[i+k+len/2]=ui-vi; const t=cr*wr-ci*wi; ci=cr*wi+ci*wr; cr=t;}}}}

async function toMono16k(buf){const sr=16000; const len=Math.ceil(buf.duration*sr);
 const oac=new OfflineAudioContext(1,len,sr); const src=oac.createBufferSource(); src.buffer=buf; src.connect(oac.destination); src.start(); const r=await oac.startRendering(); return r.getChannelData(0);}

function splitScenes(text){return text.trim().split(/\n\s*\n/).map(p=>p.replace(/\s+/g,' ').trim()).filter(Boolean);}

async function align(audioBuffer,scriptText){
 const scenes=splitScenes(scriptText); const x=await toMono16k(audioBuffer); const sr=16000, hop=160, win=400, N=512;
 const n=Math.max(0,Math.floor((x.length-win)/hop)); const han=new Float32Array(win).map((_,i)=>0.5-0.5*Math.cos(2*Math.PI*i/(win-1)));
 const b0=Math.ceil(300/(sr/N)), b1=Math.floor(2500/(sr/N)); const db=new Float32Array(n), bandDb=new Float32Array(n); const re=new Float64Array(N), im=new Float64Array(N);
 let mx=-1e9;
 for(let k=0;k<n;k++){re.fill(0); im.fill(0); let full=0; for(let i=0;i<win;i++){const v=x[k*hop+i]*han[i]; re[i]=v; full+=v*v;} fftMag2(re,im);
  let band=0; for(let b=b0;b<=b1;b++) band+=re[b]*re[b]+im[b]*im[b];
  db[k]=10*Math.log10(full*N/2+1e-12); bandDb[k]=10*Math.log10(band+1e-12); if(db[k]>mx) mx=db[k];}
 const thr=mx-40, voiced=Array.from(db,v=>v>thr);
 const env=new Float32Array(n); for(let k=0;k<n;k++){let s=0,c=0; for(let d=-2;d<=2;d++){const q=k+d; if(q>=0&&q<n){s+=bandDb[q];c++;}} env[k]=s/c;}
 let P=[]; for(let i=0;i<n;){if(!voiced[i]){let j=i; while(j<n&&!voiced[j]) j++; if(j-i>=4) P.push([i*0.01,j*0.01]); i=j;} else i++;}
 const t_on=Math.max(0,voiced.indexOf(true))*0.01, t_off=(n-voiced.slice().reverse().indexOf(true))*0.01;
 P=P.filter(p=>p[0]>t_on&&p[1]<t_off);
 const peaks=[]; for(let k=2;k<n-2;k++){if(!voiced[k]) continue; if(env[k]>=env[k-1]&&env[k]>env[k+1]&&env[k]>=env[k-2]&&env[k]>env[k+2]){
   let dip=1e9; for(let q=Math.max(0,k-15);q<Math.min(n,k+15);q++) if(env[q]<dip) dip=env[q];
   if(env[k]-dip>4){ if(peaks.length&&k-peaks[peaks.length-1]<9){ if(env[k]>env[peaks[peaks.length-1]]) peaks[peaks.length-1]=k; } else peaks.push(k);}}}
 const nuc=peaks.map(k=>k*0.01);
 const toks=[]; scenes.forEach((s,si)=>{const ws=s.split(' '); ws.forEach((w,wi)=>{const b=wi===ws.length-1?3:/[.?!:]$/.test(w)?2:w.endsWith(',')?1:0; toks.push({w,scene:si,syl:syl(w),b});});});
 const tot=toks.reduce((a,t)=>a+t.syl,0)||1;
 let acc=0; const B=[]; toks.forEach((t,k)=>{acc+=t.syl; if(t.b>0&&k<toks.length-1) B.push([k,t.b,acc]);});
 const voicedTime=(t_off-t_on)-P.reduce((a,p)=>a+p[1]-p[0],0), rate=voicedTime/tot;
 const nB=B.length, nP=P.length, dur=P.map(p=>p[1]-p[0]);
 const pen=(a,b)=>{let s=0; for(let q=a;q<b;q++) s+=0.25+Math.min(dur[q],0.6)*3; return s;};
 const states=Array.from({length:nB+1},()=>new Map()); states[0].set(0,[0,0,t_on,null]);
 for(let b=0;b<nB;b++){const [k,typ,ac]=B[b];
  for(const [j,[c0,ls,lt]] of states[b]){
   const skip=typ===1?0.8:(typ===2?2.0:6); let cand=[c0+skip,ls,lt,[j,null]]; const cur=states[b+1].get(j); if(!cur||cand[0]<cur[0]) states[b+1].set(j,cand);
   const e=lt+(ac-ls)*rate;
   for(let jj=j;jj<nP;jj++){if(P[jj][0]<lt) continue; const d=Math.abs(P[jj][0]-e); if(P[jj][0]>e+3) break; if(d>3) continue;
    const c=c0+d*2.0-Math.min(dur[jj],0.6)*(typ===3?3:2)+(typ===3&&dur[jj]<0.3?3.0:0)+(dur[jj]<0.07?0.6:0)+pen(j,jj);
    cand=[c,ac,P[jj][1],[j,jj]]; const cc=states[b+1].get(jj+1); if(!cc||c<cc[0]) states[b+1].set(jj+1,cand);}}}
 let fin=null, fc=1e18; for(const [j,v] of states[nB]){const c=v[0]+pen(j,nP); if(c<fc){fc=c; fin=j;}}
 const match=new Array(nB).fill(null); let j=fin; for(let b=nB;b>0;b--){const [pj,used]=states[b].get(j)[3]; match[b-1]=used; j=pj;}
 const anch=new Map(); B.forEach((bb,i)=>{if(match[i]!==null) anch.set(bb[0],P[match[i]]);});
 // sanity: an anchor must leave room for the syllables before and after it (avoids squeezed endings)
 {let segStart=t_on, sylSince=0; const keys=[...anch.keys()].sort((a,b)=>a-b); let ki=0; const rest=k=>toks.slice(k+1).reduce((a,t)=>a+t.syl,0);
  for(let k=0;k<toks.length;k++){sylSince+=toks[k].syl; if(anch.has(k)){const p=anch.get(k); if(p[0]-segStart<sylSince*0.07||t_off-p[1]<rest(k)*0.07){anch.delete(k);} else {segStart=p[1]; sylSince=0;}}}}
 const times=new Array(toks.length); let segStart=t_on, seg=[];
 for(let k=0;k<toks.length;k++){seg.push(k);
  if(anch.has(k)||k===toks.length-1){const segEnd=anch.has(k)?anch.get(k)[0]:t_off;
   const nn=nuc.filter(v=>v>=segStart-0.02&&v<=segEnd+0.02); const S=seg.reduce((a,x)=>a+toks[x].syl,0);
   const at=c=>{if(nn.length<2) return segStart+(segEnd-segStart)*c/S; const pos=c/S*nn.length-0.5;
    if(pos<=0) return pos>-0.5?segStart+(nn[0]-segStart)*Math.max(0,pos+0.5)*2:segStart;
    if(pos>=nn.length-1){const r=(pos-(nn.length-1))*2; return nn[nn.length-1]+(segEnd-nn[nn.length-1])*Math.min(1,r);}
    const i=Math.floor(pos), r=pos-i; return nn[i]*(1-r)+nn[i+1]*r;};
   let c=0; for(const q of seg){const a=c===0?segStart:at(c); c+=toks[q].syl; const e=q===seg[seg.length-1]?segEnd:at(c); times[q]=[+a.toFixed(3),+Math.max(a+0.05,e).toFixed(3)];}
   segStart=anch.has(k)?anch.get(k)[1]:t_off; seg=[];}}
 const out=scenes.map((_,si)=>{const ws=toks.map((t,k)=>({t,k})).filter(o=>o.t.scene===si).map(o=>({w:o.t.w,t0:times[o.k][0],t1:times[o.k][1]})); return {words:ws,speechStart:ws[0].t0,speechEnd:ws[ws.length-1].t1};});
 return {audio:n*0.01,onset:t_on,offset:t_off,scenes:out,stats:{nuclei:nuc.length,syllables:tot,pauses:nP}};}

// timing without audio: words at a steady pace (preview / no voice yet)
function estimate(scriptText,wpm=158){const scenes=splitScenes(scriptText); let t=0.4; const out=scenes.map(s=>{const ws=s.split(' ').map(w=>{const d=syl(w)*60/(wpm*1.65); const o={w,t0:+t.toFixed(3),t1:+(t+d).toFixed(3)}; t+=d+(/[.?!:]$/.test(w)?0.35:/,$/.test(w)?0.15:0); return o;}); t+=0.5; return {words:ws,speechStart:ws[0].t0,speechEnd:ws[ws.length-1].t1};});
 return {audio:t+1,onset:0.4,offset:t,scenes:out,estimated:true};}

window.GeoAlign={align,estimate,syl,splitScenes};
})();
