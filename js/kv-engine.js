// Geofy knowledge-video engine: a story is a list of scenes; draw(t) paints one frame at time t (seconds).
// Text stays inside the TikTok safe area x 100–880, y 300–1440.
(function(){
const W=1080,H=1920, L=100, MW=780;
const C={bg:'#0B1C2A',ocean:'#10283B',land:'#E9DFC7',landDim:'#B9B09B',target:'#FF3B7F',ok:'#33D1B0',ink:'#F6F1E7',mute:'#8CA3B6',sand:'#F2B66D',ice:'#9FD8F5',green:'#7FCB8F'};
const FD='"Bricolage Grotesque", sans-serif', FB='"Hanken Grotesk", sans-serif', FM='"JetBrains Mono", monospace';
const KB=[80,430,920,940]; // where the subject sits
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)), lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2, eout=t=>1-Math.pow(1-t,3);
let features=[], byId=new Map();
const grat=()=>d3.geoGraticule().step([10,10])();
let G=null;

function setWorld(w){features=w.features.filter(f=>f.id!=='ATA'&&f.geometry); byId=new Map(features.map(f=>[f.id,f]));
 features.forEach(f=>{f.bb=d3.geoBounds(f); f.loF=f.properties.lo?{type:'Feature',geometry:f.properties.lo}:null;}); G=grat();}
function mainPart(id){const f=byId.get(id), g=f.geometry; if(g.type!=='MultiPolygon') return {type:'Feature',geometry:g};
 let best=null,ba=-1; for(const c of g.coordinates){const p={type:'Polygon',coordinates:c}; let a=d3.geoArea(p); if(a>2*Math.PI) a=4*Math.PI-a; if(a>ba){ba=a;best=p;}} return {type:'Feature',geometry:best};}
function viewBox(b,box=KB,pad=0.04){const [x,y,w,h]=box; const p=d3.geoMercator().fitExtent([[x+w*pad,y+h*pad],[x+w*(1-pad),y+h*(1-pad)]],{type:'MultiPoint',coordinates:[[b[0],b[1]],[b[2],b[3]]]});
 const c=p.invert([x+w/2,y+h/2]); return {lon:c[0],lat:c[1],scale:p.scale()};}
function viewObj(obj,box=KB,pad=0.1){const [x,y,w,h]=box; const p=d3.geoMercator().fitExtent([[x+w*pad,y+h*pad],[x+w*(1-pad),y+h*(1-pad)]],obj); const c=p.invert([x+w/2,y+h/2]); return {lon:c[0],lat:c[1],scale:p.scale()};}
function projAt(v,box=KB){const lon=((v.lon+540)%360)-180; const p=d3.geoMercator().rotate([-lon,0]).scale(v.scale).translate([0,0]); const q=p([lon,v.lat]); return p.translate([box[0]+box[2]/2-q[0],box[1]+box[3]/2-q[1]]);}
const lerpView=(a,b,t)=>({lon:a.lon+((((b.lon-a.lon)%360)+540)%360-180)*t,lat:lerp(a.lat,b.lat,t),scale:Math.exp(lerp(Math.log(a.scale),Math.log(b.scale),t))});
function landPath(proj,scale){const pts=[[0,0],[W,0],[0,H],[W,H],[W/2,0],[W/2,H],[0,H/2],[W,H/2]].map(p=>proj.invert(p)).filter(p=>p&&isFinite(p[0]));
 let lo0=-180,lo1=180,la0=-90,la1=90; if(pts.length===8){lo0=Math.min(...pts.map(p=>p[0]))-1;lo1=Math.max(...pts.map(p=>p[0]))+1;la0=Math.min(...pts.map(p=>p[1]))-1;la1=Math.max(...pts.map(p=>p[1]))+1; if(lo1-lo0>300){lo0=-180;lo1=180;}}
 const p2=new Path2D(), path=d3.geoPath(proj,p2), lo=scale<1600;
 for(const f of features){const b=f.bb; if(b[1][1]<la0||b[0][1]>la1) continue; if(b[0][0]<=b[1][0]&&(b[1][0]<lo0||b[0][0]>lo1)) continue; const g=lo?(f.loF||f):f; path(g);}
 return p2;}
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function fit(ctx,text,weight,max,min,maxW,fam){let z=max; ctx.font=`${weight} ${z}px ${fam}`; while(z>min&&ctx.measureText(text).width>maxW){z-=2; ctx.font=`${weight} ${z}px ${fam}`;} return z;}
function wrapLines(ctx,text,maxW){const out=[]; let l=''; for(const w of text.split(' ')){const t=l?l+' '+w:w; if(ctx.measureText(t).width>maxW&&l){out.push(l);l=w;} else l=t;} out.push(l); return out;}
function label(ctx,text,x,y,{color=C.ink,bg='rgba(11,28,42,0.88)',font=`700 32px ${FB}`,alpha=1,align='left'}={}){
 if(alpha<=0) return; ctx.save(); ctx.globalAlpha=alpha; ctx.font=font; const w=ctx.measureText(text).width; let bx=align==='right'?x-w-28:align==='center'?x-w/2-14:x;
 bx=clamp(bx,L,880-w-28); ctx.fillStyle=bg; rr(ctx,bx,y-30,w+28,48,14); ctx.fill(); ctx.fillStyle=color; ctx.fillText(text,bx+14,y+6); ctx.restore();}
// ---- icons ----
function icon(ctx,kind,x,y,s=1,a=1){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.scale(s,s); ctx.lineJoin='round'; ctx.lineCap='round';
 if(kind==='mountain'){ctx.beginPath(); ctx.moveTo(-26,16); ctx.lineTo(0,-24); ctx.lineTo(26,16); ctx.closePath(); ctx.fillStyle='#6B7C8F'; ctx.fill(); ctx.strokeStyle=C.bg; ctx.lineWidth=3; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-9,-10); ctx.lineTo(0,-24); ctx.lineTo(9,-10); ctx.lineTo(3,-6); ctx.lineTo(-2,-11); ctx.closePath(); ctx.fillStyle='#fff'; ctx.fill();}
 else {ctx.beginPath(); ctx.arc(0,0,40,0,Math.PI*2); ctx.fillStyle='rgba(11,28,42,0.92)'; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle=kind==='sun'?C.sand:kind==='snow'?C.ice:C.ok; ctx.stroke();
  ctx.strokeStyle=ctx.fillStyle=kind==='sun'?C.sand:kind==='snow'?C.ice:C.ok; ctx.lineWidth=4;
  if(kind==='sun'){ctx.beginPath(); ctx.arc(0,0,11,0,Math.PI*2); ctx.fill(); for(let i=0;i<8;i++){const an=i*Math.PI/4; ctx.beginPath(); ctx.moveTo(Math.cos(an)*17,Math.sin(an)*17); ctx.lineTo(Math.cos(an)*25,Math.sin(an)*25); ctx.stroke();}}
  if(kind==='snow'){for(let i=0;i<3;i++){const an=i*Math.PI/3; ctx.beginPath(); ctx.moveTo(Math.cos(an)*24,Math.sin(an)*24); ctx.lineTo(-Math.cos(an)*24,-Math.sin(an)*24); ctx.stroke();}}
  if(kind==='city'){ctx.fillRect(-20,-6,10,22); ctx.fillRect(-7,-20,12,36); ctx.fillRect(8,-12,11,28);}}
 ctx.restore();}
// ---- subtitles from spoken text ----
function chunks(text){const words=text.split(/\s+/).filter(Boolean); const out=[]; let cur=[];
 for(const w of words){cur.push(w); if(cur.length>=5||/[.!?,:]$/.test(w)&&cur.length>=3){out.push(cur);cur=[];}} if(cur.length) out.push(cur); return out;}

// ---- story ----
let S=null; // {scenes, total}
function build(story,wpm,timing){let t=0; let scenes;
 if(timing){ // real voice: scene starts shortly before its first spoken word, words carry exact times
  const T=timing.scenes; const starts=T.map((x,i)=>i===0?0:Math.max(T[i-1].speechEnd+0.05,x.speechStart-0.35));
  scenes=story.scenes.map((sc,i)=>{const start=starts[i], end=i<T.length-1?starts[i+1]:timing.offset+(sc.tail??1.8);
   const words=T[i].words.map(w=>({w:w.w,t0:w.t0-start,t1:w.t1-start})); return {...sc,start,dur:end-start,speak:T[i].speechEnd-start,wordsT:words};});
  t=scenes[scenes.length-1].start+scenes[scenes.length-1].dur;
 } else scenes=story.scenes.map(sc=>{const words=sc.say.split(/\s+/).filter(Boolean).length; const speak=words*60/wpm;
  const dur=Math.max(sc.min||0,speak+(sc.pad??0.9)); const o={...sc,start:t,dur,speak}; t+=dur; return o;});
 scenes.forEach((sc,i)=>{sc.cams=(sc.cams||[{at:0,view:sc.view}]).map(c=>({at:typeof c.at==='function'?c.at(sc):c.at,view:c.view,fly:c.fly})); sc.prevView=i? scenes[i-1].cams[scenes[i-1].cams.length-1].view : sc.cams[0].view;
  const ch=chunks(sc.say);
  if(sc.wordsT){let k=0; sc.subs=ch.map(c=>{const ws=sc.wordsT.slice(k,k+c.length); k+=c.length; return {words:c,from:ws[0].t0,to:ws[ws.length-1].t1,times:ws.map(w=>w.t0)};});}
  else {const total=ch.reduce((a,c)=>a+c.join(' ').length,0); let acc=0; sc.subs=ch.map(c=>{const len=c.join(' ').length; const o={words:c,from:0.25+acc/total*sc.speak,to:0.25+(acc+len)/total*sc.speak}; acc+=len; return o;});}
  sc.subs.forEach((x,i)=>{x.until=i<sc.subs.length-1?sc.subs[i+1].from:x.to+0.6;});});
 S={scenes,total:t,events:[]}; scenes.forEach(sc=>{S.events.push({t:sc.start,kind:'whoosh'}); (sc.pops||[]).forEach(p=>S.events.push({t:sc.start+p,kind:'pop'}));}); S.events.push({t:S.total-0.2,kind:'end'});
 return S;}
function camAt(sc,u){let v=sc.prevView, from=0; for(const c of sc.cams){const fly=c.fly??1.2; if(u<c.at) break; const k=ease(clamp((u-c.at)/fly)); v=lerpView(v,c.view,k); from=c.at;}
 // gentle continuous camera breathing so the map never stands still
 const t=sc.start+u; return keepInside({lon:v.lon+Math.sin(t*0.37)*0.6*(400/v.scale), lat:v.lat+Math.sin(t*0.29+1)*0.4*(400/v.scale), scale:v.scale*(1+0.035*Math.sin(t*0.45))});}
// never show the empty area beyond the map texture (above ~83°N / below ~78°S)
function keepInside(v){if(STYLE==='studio') return v; const cy=KB[1]+KB[3]/2, up=cy, down=H-cy, top=MY(83), bot=MY(-78);
 let s=v.scale; const need=(up+down)/(top-bot); if(s<need) s=need; let ym=MY(v.lat); ym=Math.min(ym,top-up/s); ym=Math.max(ym,bot+down/s);
 const lat=(2*Math.atan(Math.exp(ym))-Math.PI/2)*180/Math.PI; return {lon:v.lon,lat,scale:s};}

let STYLE='studio', TEX=null;
function setStyle(name,img){STYLE=name; TEX=img||null;}
const tintK=()=>STYLE==='studio'?1:0.6;
const MY=la=>Math.log(Math.tan(Math.PI/4+la*Math.PI/360)), TOP=MY(84), BOT=MY(-80);
function drawTexture(ctx,proj){const s=proj.scale(), [tx,ty]=proj.translate(), lonC=-proj.rotate()[0]; const w=2*Math.PI*s, y0=ty-s*TOP, h=s*(TOP-BOT);
 const iw=TEX.width, ih=TEX.height; ctx.imageSmoothingQuality='high';
 const base=tx+s*(-180-lonC)*Math.PI/180; // x of longitude -180, repeated so the map wraps around
 for(const x0 of [base-w,base,base+w]){const sx=clamp((0-x0)/w*iw,0,iw), ex=clamp((W-x0)/w*iw,0,iw), sy=clamp((0-y0)/h*ih,0,ih), ey=clamp((H-y0)/h*ih,0,ih);
  if(ex-sx<1||ey-sy<1) continue; ctx.drawImage(TEX,sx,sy,ex-sx,ey-sy,x0+sx/iw*w,y0+sy/ih*h,(ex-sx)/iw*w,(ey-sy)/ih*h);}}
function hl(env,id,col,a,{outline=true}={}){if(a<=0) return; const {ctx,path}=env; const f=byId.get(id); ctx.save(); ctx.beginPath(); path(f);
 if(STYLE==='studio'){ctx.globalAlpha=a; ctx.fillStyle=col; ctx.fill();}
 else {ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); if(outline){ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=5; ctx.lineJoin='round'; ctx.stroke();}}
 ctx.restore();}
function draw(ctx,t){
 const sc=S.scenes.find(s=>t<s.start+s.dur)||S.scenes[S.scenes.length-1]; const u=clamp(t-sc.start,0,sc.dur);
 const v=camAt(sc,u); const proj=projAt(v), path=d3.geoPath(proj,ctx);
 const env={ctx,proj,path,u,sc,v,t};
 let land=null;
 if(STYLE==='studio'||!TEX){
  const g=ctx.createRadialGradient(W/2,820,80,W/2,820,1250); g.addColorStop(0,'#17405C'); g.addColorStop(1,'#081521'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  land=landPath(proj,v.scale); ctx.save(); ctx.translate(5,9); ctx.fillStyle='rgba(0,0,0,0.28)'; ctx.fill(land); ctx.restore();
  ctx.fillStyle=C.land; ctx.fill(land);
  (sc.under||[]).forEach(fn=>fn(env));
  ctx.strokeStyle='rgba(11,28,42,0.55)'; ctx.lineWidth=1.8; ctx.lineJoin='round'; ctx.stroke(land);
 } else {
  ctx.fillStyle='#0a1830'; ctx.fillRect(0,0,W,H); drawTexture(ctx,proj);
  (sc.under||[]).forEach(fn=>fn(env));
  land=landPath(proj,v.scale); ctx.strokeStyle='rgba(255,255,255,0.42)'; ctx.lineWidth=1.6; ctx.lineJoin='round'; ctx.stroke(land);
  const vg=ctx.createRadialGradient(W/2,880,420,W/2,880,1300); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.55)'); ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
 }
 (sc.over||[]).forEach(fn=>fn(env));
 // soft gradients behind headline and subtitles only
 const gt=ctx.createLinearGradient(0,0,0,500); gt.addColorStop(0,'rgba(6,16,26,0.75)'); gt.addColorStop(0.45,'rgba(6,16,26,0.55)'); gt.addColorStop(1,'rgba(6,16,26,0)'); ctx.fillStyle=gt; ctx.fillRect(0,0,W,500);
 const gb=ctx.createLinearGradient(0,1360,0,1700); gb.addColorStop(0,'rgba(6,16,26,0)'); gb.addColorStop(1,'rgba(6,16,26,0.75)'); ctx.fillStyle=gb; ctx.fillRect(0,1360,W,560);
 ctx.textAlign='left'; ctx.textBaseline='alphabetic';
 // subtle watermark
 ctx.save(); ctx.globalAlpha=0.55; ctx.font=`800 30px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText('geofy',L,292); const bw=ctx.measureText('geofy').width; ctx.fillStyle=C.target; ctx.fillText('.',L+2+bw,292); ctx.restore();
 if(sc.head){const prev=S.scenes[S.scenes.indexOf(sc)-1]; const ha=(prev&&prev.head===sc.head)||sc.headInstant?1:eout(clamp(u/0.45)); ctx.save(); ctx.globalAlpha=ha; ctx.translate(0,(1-ha)*16);
  ctx.shadowColor='rgba(0,0,0,0.55)'; ctx.shadowBlur=18; const z=fit(ctx,sc.head,800,66,46,MW,FD); ctx.fillStyle=C.ink; wrapLines(ctx,sc.head,MW).forEach((l,i)=>ctx.fillText(l,L,368+i*(z+6))); ctx.restore();}
 (sc.top||[]).forEach(fn=>fn(env));
 // subtitles: low, centred, no box; active word pink
 const sub=sc.subs.find(s=>u>=s.from-0.05&&u<Math.min(s.until,s.to+0.6));
 if(sub&&!sc.noSubs){ctx.font=`800 58px ${FD}`; const ls=wrapLines(ctx,sub.words.join(' '),660); const cx=555, base=1560-(ls.length-1)*70;
  let nAct; if(sub.times){nAct=0; sub.times.forEach((tt,i)=>{if(u>=tt-0.03) nAct=i;});} else {const prog=clamp((u-sub.from)/(sub.to-sub.from)); nAct=Math.floor(prog*sub.words.length+0.0001);} let wi=0;
  ctx.lineJoin='round'; ctx.lineWidth=12; ctx.strokeStyle='rgba(6,16,26,0.92)';
  ls.forEach((l,li)=>{const lw=ctx.measureText(l).width; let x=cx-lw/2; const y=base+li*70; for(const w of l.split(' ')){ctx.strokeText(w,x,y); ctx.fillStyle=wi===nAct?C.target:wi<nAct?C.ink:'rgba(246,241,231,0.62)'; ctx.fillText(w,x,y); x+=ctx.measureText(w+' ').width; wi++;}});}
}
window.KV={W,H,C,FD,FB,FM,L,MW,KB,clamp,lerp,ease,eout,setWorld,setStyle,hl,tintK,mainPart,viewBox,viewObj,projAt,rr,fit,wrapLines,label,icon,build,draw,get S(){return S;},byId:()=>byId};
})();
