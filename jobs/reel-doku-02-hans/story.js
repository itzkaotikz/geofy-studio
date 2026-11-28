// Doku-Teaser 2 – Hans-Insel (9:16, Polar) – Länder, die es nicht mehr gibt
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', OR='#FF7A3D', WA='#7FD0FF', BL='#4D9BFF', RED='#E5484D';
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; if(KV.LOOK==='v3') return KV.bigText(ctx,txt,a,y,col,size); ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function line(e,pts,col,prog,w=10,dash=null){if(prog<=0) return; const {ctx}=e; const q=pts.map(p=>P(e,p)); const n=Math.max(2,Math.floor(q.length*Math.min(1,prog))+(prog>=1?0:1)); ctx.save(); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='rgba(5,14,24,0.7)'; ctx.lineWidth=w+7; ctx.beginPath(); q.slice(0,n).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.strokeStyle=col; ctx.lineWidth=w; if(dash) ctx.setLineDash(dash); ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}


const G10=window.G10; const F=k=>G10[k]?{type:'Feature',geometry:G10[k]}:KV.byId().get(k);
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.4; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}



const fx=FX.make({big,chip,fill,P}); const {A,win,VW}=fx; const {PK,GO,CY,TE,RD}=fx.COL;
const {pop,counter,flash,badge,stamp,xmark}=fx;
const W=KV.W, H=KV.H, Y=700, CYc=1395;
const WAT='#3FA9FF', CY2='#7FD0FF', ICE='#EAF6FF', GR='#7FCB6A';
const CC={RUS:'#FF6B6B',CAN:'#FFB547',USA:'#7FD0FF',NOR:'#33D1B0',GRL:'#B98CFF',DNK:'#B98CFF',FIN:'#9FB4C7',SWE:'#9FB4C7',ISL:'#9FB4C7'};
const rad=Math.PI/180;
// ---------- Polar-Kamera ----------
const PV=(lon,lat,s)=>({f:[lon,lat],s});
const vARC=PV(0,90,1250), vPOLE=PV(0,90,3000), vNEAR=PV(0,88,1900), vWIDE=PV(68,36,320), vNSR=PV(95,74,1500), vNWP=PV(-100,72,2300), vGRL=PV(-42,73,1900), vHANS=PV(-66.5,80.8,14000), vRIDGE=PV(0,89,2300), vAL=PV(-30,80,1500);
const FEATS=()=>Array.from(KV.byId().values());
function mixV(a,b,k){let dl=b.f[0]-a.f[0]; if(dl>180) dl-=360; if(dl<-180) dl+=360; return {f:[a.f[0]+dl*k,lerp(a.f[1],b.f[1],k)],s:Math.exp(lerp(Math.log(a.s),Math.log(b.s),k))};}
function endV(sc){const p=sc.pv; return p[p.length-1].v;}
function viewAt(sc,u){const sc_=KV.S.scenes; const i=sc_.indexOf(sc); let cur=i>0?endV(sc_[i-1]):sc.pv[0].v; for(const kf of sc.pv){const at=typeof kf.at==='function'?kf.at(sc):kf.at; if(u<at) break; const k=ease(clamp((u-at)/(kf.fly||0.001))); cur=mixV(cur,kf.v,k);} return cur;}
function mkProj(v){const p=d3.geoAzimuthalEqualArea().rotate([0,-90]).scale(v.s).translate([0,0]).clipAngle(105); const q=p(v.f); p.translate([W/2-q[0],H/2+60-q[1]]); return p;}
const Q=(e,ll)=>e.Q(ll);
function poly(e,pts,fillc,a,stroke){if(a<=0) return; const {ctx}=e; ctx.save(); ctx.beginPath(); pts.forEach((p,i)=>{const q=Q(e,p); if(!q) return; i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);}); ctx.closePath(); ctx.globalAlpha=a; ctx.fillStyle=fillc; ctx.fill(); if(stroke){ctx.globalAlpha=Math.min(1,a*1.6); ctx.strokeStyle=stroke; ctx.lineWidth=3; ctx.setLineDash([12,8]); ctx.stroke();} ctx.restore();}
function pline(e,pts,col,prog,w=6,dash=null,glow=true){if(prog<=0) return; const {ctx}=e; const q=pts.map(p=>Q(e,p)); const tot=q.length-1, upto=tot*Math.min(1,prog); ctx.save(); if(glow){ctx.shadowColor=col; ctx.shadowBlur=14;} ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round'; if(dash) ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(q[0][0],q[0][1]); for(let i=1;i<=Math.ceil(upto);i++){const f=Math.min(1,upto-(i-1)); const x=q[i-1][0]+(q[i][0]-q[i-1][0])*f, y=q[i-1][1]+(q[i][1]-q[i-1][1])*f; ctx.lineTo(x,y);} ctx.stroke(); ctx.restore();}
function dense(pts,n=6){const o=[]; for(let i=0;i<pts.length-1;i++){const [a,b]=[pts[i],pts[i+1]]; let dl=b[0]-a[0]; if(dl>180) dl-=360; if(dl<-180) dl+=360; for(let k=0;k<n;k++) o.push([a[0]+dl*k/n,a[1]+(b[1]-a[1])*k/n]);} o.push(pts[pts.length-1]); return o;}
const ring=(fn,step=3)=>{const o=[]; for(let l=-180;l<180;l+=step) o.push([l,fn(l)]); return o;};
const noise=l=>0.9*Math.sin(l*0.13*rad*57.3/7)+0.5*Math.sin(l*0.31+1.3)+0.35*Math.sin(l*0.77+0.4);
const E80=l=>74-3.2*Math.cos((l+80)*rad)+noise(l)*0.6, E25=l=>80.2-4.2*Math.cos((l+80)*rad)+noise(l), EWIN=l=>63-4*Math.cos((l+60)*rad)+noise(l)*0.8;
function ice(e,k,a=1,win=0){if(a<=0) return; const fn=l=>{const s=lerp(E80(l),E25(l),k); return lerp(s,EWIN(l),win);}; const {ctx}=e; poly(e,ring(fn,2),ICE,0.6*a);}
function polar(e,o={}){const {ctx}=e; const p=e.Q, path=d3.geoPath(p,ctx);
 const g=ctx.createRadialGradient(W/2,H/2,100,W/2,H/2,1200); g.addColorStop(0,'#0F3354'); g.addColorStop(1,'#061423'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
 ctx.save(); ctx.strokeStyle='rgba(127,208,255,0.14)'; ctx.lineWidth=1.2; ctx.beginPath(); path(d3.geoGraticule().step([30,10])()); ctx.stroke(); ctx.restore();
 ctx.save(); ctx.setLineDash([10,10]); ctx.strokeStyle='rgba(127,208,255,0.35)'; ctx.lineWidth=2; ctx.beginPath(); path({type:'LineString',coordinates:dense([[-180,66.56],[-90,66.56],[0,66.56],[90,66.56],[180,66.56]],20)}); ctx.stroke(); ctx.restore();
 if(o.ice!=null) ice(e,o.ice,o.iceA==null?1:o.iceA,o.win||0);
 if(o.eez){const km=o.eezKm||370; ctx.save(); ctx.lineJoin='round'; for(const [k,col] of Object.entries(o.eez)){const f=KV.byId().get(k); if(!f) continue; ctx.beginPath(); path(f); ctx.globalAlpha=o.eezA==null?0.42:o.eezA; ctx.strokeStyle=col; ctx.lineWidth=2*km/6371*e.v.s; ctx.stroke();} ctx.restore();}
 (o.pre||[]).forEach(fn=>fn(e));
 const feats=FEATS(); const LP=new Path2D(); const lpath=d3.geoPath(p,LP); feats.forEach(f=>lpath(f)); ctx.fillStyle='#2C3C48'; ctx.fill(LP);
 if(o.fills) for(const [k,[col,a]] of Object.entries(o.fills)){if(a<=0) continue; const f=KV.byId().get(k); if(!f) continue; ctx.save(); ctx.beginPath(); path(f); ctx.globalAlpha=a*0.55; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.4); ctx.strokeStyle=col; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore();}
 ctx.strokeStyle='rgba(150,210,255,0.35)'; ctx.lineWidth=1.2; ctx.stroke(LP);
 const vg=ctx.createRadialGradient(W/2,H/2,500,W/2,H/2,1150); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.5)'); ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);}
function ptag(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30){const q=Q(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});}
function ppulse(e,ll,t,a,col=PK,r0=10){if(a<=0) return; const {ctx}=e; const q=Q(e,ll); if(!q) return; ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*46,0,7); ctx.globalAlpha=a*(1-ph)*0.8; ctx.strokeStyle=col; ctx.lineWidth=3; ctx.stroke();} ctx.globalAlpha=a; ctx.fillStyle=col; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function flag(e,ll,a,k){if(a<=0) return; const q=Q(e,ll); if(!q) return; const {ctx}=e; const h=110*eout(k); ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle='#ddd'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(q[0],q[1]); ctx.lineTo(q[0],q[1]-h); ctx.stroke(); if(k>0.5){const fw=80*eout(clamp((k-0.5)*2)); [['#fff',0],['#1C57D6',1],['#D52B1E',2]].forEach(([c,i])=>{ctx.fillStyle=c; ctx.fillRect(q[0],q[1]-h+i*18,fw,18);});} ctx.restore();}
function drops(e,pts,a,col=GO){pts.forEach((ll,i)=>{const ai=clamp((a*pts.length)-i); if(ai<=0) return; const q=Q(e,ll); if(!q) return; const {ctx}=e; ctx.save(); ctx.globalAlpha=ai; ctx.fillStyle=col; ctx.shadowColor=col; ctx.shadowBlur=16; ctx.beginPath(); ctx.arc(q[0],q[1]+6,16*eout(ai),0,Math.PI); ctx.lineTo(q[0],q[1]-24*eout(ai)); ctx.closePath(); ctx.fill(); ctx.restore();});}
function bottle(ctx,x,y,a,col,txt){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle=col; rr(ctx,x-34,y-70,68,140,16); ctx.fill(); ctx.fillRect(x-12,y-110,24,44); ctx.fillStyle='rgba(255,255,255,0.85)'; ctx.fillRect(x-28,y-20,56,40); ctx.fillStyle='#0B1C2A'; ctx.font=`800 20px ${FB}`; ctx.textAlign='center'; ctx.fillText(txt,x,y+7); ctx.restore();}
// Daten
const RIDGE=dense([[140,77],[143,81],[148,84],[160,87],[-150,89.6],[-80,87.6],[-70,85.5],[-66,83.5]],4);
const SUEZ=[[4.5,51.9],[-5,48.5],[-9.5,43],[-9.5,37],[-5.6,35.9],[10,37.6],[20,34.5],[32.3,31.3],[32.5,29.9],[34.5,27.5],[39,20],[43.3,12.6],[51,12],[60,13],[73,7],[80.5,5.5],[92,6],[98,5.5],[103.8,1.3],[106,5],[110,12],[114,20],[121.5,31.2]];
const NSR=[[4.5,51.9],[5,58],[10,63],[16,69.5],[25,71.5],[40,70.5],[52,71.5],[58,70.5],[66,72.5],[76,75],[90,76.5],[104,77.8],[118,76.5],[130,74.5],[145,74.5],[160,70.8],[175,70],[-172,67],[-169.5,65.8],[-172,61],[175,55],[160,48],[145,42],[135,36],[125,33],[121.5,31.2]];
const NWP=[[-169.5,65.8],[-167,68.5],[-156.8,71.4],[-140,70],[-128,70.5],[-115,68.8],[-105,68.5],[-98,70],[-95,74],[-88,74.5],[-80,74.2],[-72,73],[-63,70],[-58,66],[-55,60]];
const CL={RUS:[[40,84],[70,82.5],[100,81.5],[130,80.5],[160,79],[178,79],[-170,80],[-150,84],[-120,87.5],[-80,87],[-50,86],[-20,86.5],[10,86],[30,85]],
 GRL:[[-60,84],[-30,84.5],[0,85],[30,86.5],[60,87],[100,87.5],[140,87],[170,88],[-140,88.5],[-90,86.5]],
 CAN:[[-140,79],[-120,81],[-100,83],[-80,84],[-60,84.5],[-30,87],[20,88.5],[80,89],[140,88.5],[180,87.5],[-160,85]]};
const BASINS=[[75,67],[45,74],[-152,70.3],[-22,74]];
const POLE=[0,90], HANS=[-66.46,80.83], PIT=[-68.7,76.53], ILU=[-51.1,69.22], NUUK=[-51.7,64.18];
const FIVE={RUS:CC.RUS,CAN:CC.CAN,USA:CC.USA,NOR:CC.NOR,GRL:CC.GRL};
function ytcard(ctx,a,u,t0){if(a<=0) return; const y=560,x=140,w=800,h=450,k=eout(clamp((u-t0)/0.5)); ctx.save(); ctx.globalAlpha=a; ctx.translate(540,y+h/2); ctx.scale(0.85+0.15*k,0.85+0.15*k); ctx.translate(-540,-(y+h/2)); rr(ctx,x,y,w,h,30); ctx.fillStyle='rgba(6,20,40,0.92)'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=2; ctx.stroke();
 ctx.fillStyle='#E5484D'; rr(ctx,x+w/2-70,y+70,140,96,26); ctx.fill(); ctx.fillStyle='#fff'; ctx.beginPath(); ctx.moveTo(x+w/2-20,y+92); ctx.lineTo(x+w/2+30,y+118); ctx.lineTo(x+w/2-20,y+144); ctx.fill();
 ctx.textAlign='center'; ctx.fillStyle='#7FD0FF'; ctx.font=`700 30px ${KV.FM}`; ctx.fillText('NEUE DOKU · YOUTUBE',540,y+230); ctx.fillStyle='#fff'; ctx.font=`800 58px ${FD}`; ctx.fillText('Wem gehört die Arktis?',540,y+310); ctx.font=`700 36px ${FB}`; ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.fillText('Nordpol · Grönland · Hans-Insel · 6 Min.',540,y+372); ctx.fillStyle='#FF3B7F'; ctx.fillText('Link im Profil ↑',540,y+425); ctx.restore();}

const S=(o)=>Object.assign({noSubs:true,swish:[],pops:[],cams:[{at:0,view:{lon:0,lat:70,scale:900}}]},o,{over:[e=>{e.v=viewAt(e.sc,e.u); e.Q=mkProj(e.v); polar(e,typeof o.map==='function'?o.map(e):(o.map||{ice:1}));}, ...(o.over||[])]});
const NARES=[[-76,77.5],[-73.5,78.3],[-70.5,79.5],[-68,80.3],[-66.46,80.83],[-63.5,81.6],[-60,82.3],[-56,82.6]];
const vISL=PV(-66.46,80.83,26000), vNAR=PV(-66,80,7000);
function dkflag(ctx,x,y,s,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='#C8102E'; ctx.fillRect(x,y,74*s,56*s); ctx.fillStyle='#fff'; ctx.fillRect(x+22*s,y,10*s,56*s); ctx.fillRect(x,y+23*s,74*s,10*s); ctx.restore();}
function caflag(ctx,x,y,s,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='#fff'; ctx.fillRect(x,y,74*s,56*s); ctx.fillStyle='#D52B1E'; ctx.fillRect(x,y,18*s,56*s); ctx.fillRect(x+56*s,y,18*s,56*s); ctx.beginPath(); ctx.moveTo(x+37*s,y+12*s); ctx.lineTo(x+46*s,y+30*s); ctx.lineTo(x+37*s,y+42*s); ctx.lineTo(x+28*s,y+30*s); ctx.closePath(); ctx.fill(); ctx.restore();}
function pole(ctx,q,a,which){if(a<=0||!q) return; ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle='#eee'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(q[0],q[1]); ctx.lineTo(q[0],q[1]-120); ctx.stroke(); ctx.restore(); (which==='dk'?dkflag:caflag)(ctx,q[0],q[1]-120,1,a);}
function island(e,a,split){const q=Q(e,HANS); if(!q||a<=0) return; const {ctx}=e; const r=e.v.s/26000; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='#8A7B68'; ctx.strokeStyle='#fff'; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(q[0],q[1],Math.max(14,110*r),Math.max(10,80*r),0.4,0,7); ctx.fill(); ctx.stroke();
 if(split>0){ctx.save(); ctx.beginPath(); ctx.ellipse(q[0],q[1],Math.max(14,110*r),Math.max(10,80*r),0.4,0,7); ctx.clip(); ctx.globalAlpha=a*0.6*split; ctx.fillStyle=CC.CAN; ctx.fillRect(q[0]-300,q[1]-300,300-10*r,600); ctx.fillStyle=CC.GRL; ctx.fillRect(q[0]-10*r,q[1]-300,300,600); ctx.restore(); ctx.globalAlpha=a*split; ctx.setLineDash([10,8]); ctx.strokeStyle='#fff'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(q[0]-30*r,q[1]-90*r); ctx.lineTo(q[0]-5*r,q[1]); ctx.lineTo(q[0]+20*r,q[1]+90*r); ctx.stroke();}
 ctx.restore();}
const scenes=[
 S({head:'Der Whisky-Krieg', headInstant:true, say:S_say[0], pv:[{at:0,v:PV(-30,82,1300)},{at:0.3,v:vNAR,fly:5}], swish:[sc=>wt(sc,'Whisky')], pops:[0.2,sc=>wt(sc,'Whisky'),sc=>wt(sc,'Schnaps'),sc=>wt(sc,'Kein')],
  map:e=>({ice:1,iceA:0.35,fills:{CAN:[CC.CAN,0.3],GRL:[CC.GRL,0.3]}}),
  over:[e=>{const {u,sc,ctx,t}=e; const tw=wt(sc,'Whisky'), ts=wt(sc,'Schnaps'), tk=wt(sc,'Kein'); ppulse(e,HANS,t,A(u,0.5,0.3),PK,9);
   pop(ctx,'50 Jahre „Krieg“',win(u,0.2,tw,0.15),u,0.2,Y,'#fff',120); bottle(ctx,330,1080,A(u,tw,0.25),'#C8862B','WHISKY'); bottle(ctx,750,1080,A(u,ts,0.25),'#2F6B3A','SCHNAPS');
   pop(ctx,'um eine Insel',win(u,tw,tk,0.15),u,tw,Y,'#fff',120); pop(ctx,'Kein Witz.',A(u,tk,0.15),u,tk,Y,GO,140);}]}),
 S({head:'Die Hans-Insel', say:S_say[1], pv:[{at:0,v:vNAR,fly:0.5},{at:sc=>wt(sc,'kahler')-0.2,v:vISL,fly:1.6},{at:sc=>wt(sc,'1973')-0.3,v:vNAR,fly:1.4}], swish:[sc=>wt(sc,'kahler')-0.2,sc=>wt(sc,'1973')-0.3], pops:[sc=>wt(sc,'Hans'),sc=>wt(sc,'Quadratkilometer'),sc=>wt(sc,'Bewohner'),sc=>wt(sc,'1973'),sc=>wt(sc,'nicht einigen')],
  map:e=>({ice:1,iceA:0.3,fills:{CAN:[CC.CAN,0.35],GRL:[CC.GRL,0.35]}}),
  over:[e=>{const {u,sc,ctx}=e; const th=wt(sc,'Hans'), tq=wt(sc,'Quadratkilometer'), tb=wt(sc,'Bewohner'), t7=wt(sc,'1973'), tn=wt(sc,'nicht einigen');
   island(e,A(u,th-0.3,0.4),0); ptag(e,HANS,'Hans-Insel',A(u,th,0.3)*(1-A(u,wt(sc,'kahler')-0.2,0.3))+A(u,t7+1,0.3),0,-80,'#fff',34);
   ptag(e,[-78,79.6],'Kanada',A(u,0.3,0.3),0,0,'#fff',38); ptag(e,[-55,81.6],'Grönland',A(u,0.3,0.3),0,0,'#fff',38);
   pop(ctx,'Hans-Insel',win(u,th,tq-0.3,0.15),u,th,Y,'#fff',120); pop(ctx,'≈ 1 km² Fels',win(u,tq-0.3,tb,0.15),u,tq-0.3,Y,'#fff',130); pop(ctx,'0 Bewohner',win(u,tb,t7,0.15),u,tb,Y,'#fff',130);
   pline(e,dense(NARES,4),'#fff',A(u,t7,1.6),5,[16,12],false); pop(ctx,'1973: Seegrenze',win(u,t7,tn,0.15),u,t7,Y,'#fff',110); const q=Q(e,HANS); if(q) xmark(ctx,q[0],q[1],A(u,tn,0.3),1.1); stamp(ctx,'KEINE EINIGUNG',A(u,tn,0.2),u,tn,Y+30);}]}),
 S({head:'Flagge gegen Flagge', say:S_say[2], pv:[{at:0,v:vISL,fly:1.6}], swish:[0], pops:[sc=>wt(sc,'1980'),sc=>wt(sc,'Dänen'),sc=>wt(sc,'Schnaps'),sc=>wt(sc,'Kanadier'),sc=>wt(sc,'Whisky'),sc=>wt(sc,'hin und her')],
  map:e=>({ice:1,iceA:0.3,fills:{CAN:[CC.CAN,0.35],GRL:[CC.GRL,0.35]}}),
  over:[e=>{const {u,sc,ctx,t}=e; const t8=wt(sc,'1980'), td=wt(sc,'Dänen'), ts=wt(sc,'Schnaps'), tc=wt(sc,'Kanadier'), tw=wt(sc,'Whisky'), th=wt(sc,'Jahrzehntelang'); island(e,1,0); const q=Q(e,HANS);
   pop(ctx,'ab '+String(Math.round(1980+42*0)),win(u,t8-0.3,td,0.15),u,t8-0.3,Y,'#fff',150); if(u>th) badge(ctx,String(Math.round(1980+42*clamp((u-th)/2.2))),1,'rgba(6,20,40,0.85)');
   let which='dk', fa=0; if(u>=td&&u<tc){which='dk'; fa=A(u,td,0.3);} else if(u>=tc&&u<th){which='ca'; fa=A(u,tc,0.3);} else if(u>=th){const ph=Math.floor((u-th)*1.6)%2; which=ph?'ca':'dk'; fa=1;} pole(ctx,q?[q[0]+20,q[1]]:null,fa,which);
   bottle(ctx,330,1150,win(u,ts,th,0.25),'#2F6B3A','SCHNAPS'); bottle(ctx,750,1150,win(u,tw,th,0.25),'#C8862B','WHISKY');
   pop(ctx,'Dänemark: Flagge + Schnaps',win(u,td,tc,0.15),u,td,Y,'#fff',80); pop(ctx,'Kanada: Flagge + Whisky',win(u,tc,th,0.15),u,tc,Y,'#fff',84); pop(ctx,'hin und her …',A(u,th,0.15),u,th,Y,'#fff',120);
   chip(ctx,'Besucher aus beiden Ländern, jahrzehntelang',CYc,A(u,t8,0.25));}]}),
 S({head:'Die Lösung', say:S_say[3], pv:[{at:0,v:vISL,fly:0.5},{at:sc=>wt(sc,'Landgrenze')-0.3,v:vNAR,fly:1.4}], swish:[sc=>wt(sc,'Landgrenze')-0.3], pops:[sc=>wt(sc,'2022'),sc=>wt(sc,'geteilt'),sc=>wt(sc,'Landgrenze'),sc=>wt(sc,'1,3'),sc=>wt(sc,'Feier')],
  map:e=>({ice:1,iceA:0.3,fills:{CAN:[CC.CAN,0.35],GRL:[CC.GRL,0.35]}}),
  over:[e=>{const {u,sc,ctx,t}=e; const t2=wt(sc,'2022'), tg=wt(sc,'geteilt'), tl=wt(sc,'Landgrenze'), t13=wt(sc,'1,3'), tf=wt(sc,'Feier');
   island(e,1,A(u,tg,0.8)); ptag(e,HANS,'Hans-Insel',A(u,tl+1,0.3),0,-70,'#fff',32);
   pop(ctx,'2022',win(u,t2,tg,0.15),u,t2,Y,'#fff',170); pop(ctx,'einfach geteilt',win(u,tg,tl,0.15),u,tg,Y,'#fff',120); chip(ctx,'entlang einer natürlichen Felsspalte',CYc,win(u,wt(sc,'Spalte')-0.5,tl,0.25));
   pop(ctx,'Kanada ↔ Europa',win(u,tl,t13,0.15),u,tl,Y,'#fff',110); chip(ctx,'erste Landgrenze zwischen Kanada und Europa',CYc,win(u,tl,tf,0.25),'#0B1C2A','rgba(185,140,255,0.96)',34); pop(ctx,'≈ 1,3 km Grenze',win(u,t13,tf,0.15),u,t13,Y,'#fff',120);
   const k=A(u,tf,0.5); if(k>0){bottle(ctx,330+(420*eout(clamp((u-tf-0.4)/0.8))),1150,k,'#C8862B','WHISKY'); bottle(ctx,750-(420*eout(clamp((u-tf-0.4)/0.8))),1150,k,'#2F6B3A','SCHNAPS'); pop(ctx,'Prost!',A(u,tf+0.6,0.15),u,tf+0.6,Y,GO,150);}}]}),
 S({head:'Kein Einzelfall', say:S_say[4], pv:[{at:0,v:PV(0,88,1500),fly:2.2}], swish:[0], pops:[sc=>wt(sc,'kleinste'),sc=>wt(sc,'drei'),sc=>wt(sc,'Doku'),sc=>wt(sc,'Wer')],
  map:e=>({ice:1,iceA:0.35}),
  over:[e=>{const {u,sc,ctx,t}=e; const td=wt(sc,'Die ganze'), tw=wt(sc,'Und sag'); ['RUS','GRL','CAN'].forEach((k,i)=>poly(e,dense(CL[k],5),CC[k],0.3*A(u,wt(sc,'drei')+i*0.3,0.4)*(1-A(u,td,0.3)),CC[k])); ppulse(e,POLE,t,A(u,wt(sc,'Nordpol'),0.3)*(1-A(u,td,0.3)),'#fff',10);
   pop(ctx,'der kleinste Streit',win(u,0.2,wt(sc,'drei'),0.15),u,0.2,Y,'#fff',110); pop(ctx,'3 Staaten wollen den Nordpol',win(u,wt(sc,'drei'),td,0.15),u,wt(sc,'drei'),Y,'#fff',84);
   ytcard(ctx,win(u,td,tw,0.3),u,td); pop(ctx,'Wer hätte sie bekommen sollen?',A(u,tw,0.15),u,tw,Y,'#fff',80);
   [['Kanada',CC.CAN],['Dänemark',CC.GRL]].forEach(([n,col],i)=>chip(ctx,n,1100+i*110,A(u,tw+0.5+i*0.3,0.25),'#0B1C2A',col,48)); chip(ctx,'Schreib es in die Kommentare',CYc,A(u,tw+1.2,0.25),'#fff','rgba(229,72,77,0.95)');}]}),
];
return {tag:'GEOFY · DOKU-TEASER', scenes, wt};
}
