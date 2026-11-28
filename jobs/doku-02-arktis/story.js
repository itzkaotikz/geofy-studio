// Geofy Doku 2 – Wem gehört die Arktis? (16:9, Polar-Ansicht) – Länder, die es nicht mehr gibt
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
function card(ctx,u,n,title){const a=clamp(u/0.25)*(1-clamp((u-2.1)/0.4)); if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(6,16,26,0.78)'; ctx.fillRect(0,0,W,H); ctx.textAlign='center'; ctx.fillStyle=PK; ctx.font=`700 34px ${KV.FM}`; ctx.fillText('KAPITEL '+n,W/2,H/2-70); const k=1+0.08*(1-eout(clamp(u/0.6))); ctx.translate(W/2,H/2+30); ctx.scale(k,k); ctx.fillStyle='#fff'; ctx.font=`800 104px ${FD}`; ctx.fillText(title,0,0); ctx.restore();}
function sides(ctx,a,u,tl,tr,l,r){if(a<=0) return; const y=360,w=760,h=110+Math.max(l.length,r.length)*72; [[110+0,l,tl,GO],[W-110-w,r,tr,PK]].forEach(([x,txt,t0,col])=>{const k=clamp((u-t0)/0.4); if(k<=0) return; ctx.save(); ctx.globalAlpha=a*k; rr(ctx,x,y+(1-eout(k))*30,w,h,32); ctx.fillStyle='rgba(6,20,40,0.86)'; ctx.fill(); ctx.strokeStyle=col; ctx.lineWidth=3; ctx.stroke(); ctx.fillStyle=col; ctx.font=`700 30px ${KV.FM}`; ctx.fillText(txt[0],x+40,y+70); ctx.fillStyle='#fff'; ctx.font=`800 54px ${FD}`; txt.slice(1).forEach((l,i)=>ctx.fillText(l,x+40,y+160+i*72)); ctx.restore();});}
function subscribe(ctx,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(6,16,26,0.7)'; ctx.fillRect(0,0,W,H); ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.font=`800 140px ${FD}`; ctx.fillText('geofy',W/2-14,H/2-20); ctx.fillStyle=PK; ctx.fillText('.',W/2+188,H/2-20); rr(ctx,W/2-200,H/2+50,400,96,48); ctx.fillStyle=PK; ctx.fill(); ctx.fillStyle='#fff'; ctx.font=`800 44px ${FB}`; ctx.fillText('Abonnieren',W/2,H/2+113); ctx.restore();}
const {pop,counter,flash,badge,stamp,xmark,bars,gauge}=fx;
const W=KV.W, H=KV.H, Y=330, CY_=930;
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
const S=(o)=>Object.assign({noSubs:true,swish:[],pops:[],cams:[{at:0,view:{lon:0,lat:70,scale:900}}]},o,{over:[e=>{e.v=viewAt(e.sc,e.u); e.Q=mkProj(e.v); polar(e,typeof o.map==='function'?o.map(e):(o.map||{ice:1}));}, ...(o.over||[])]});
const scenes=[
 // ---------- Kapitel 1 ----------
 S({head:'Wem gehört die Arktis?', headInstant:true, say:S_say[0], pv:[{at:0,v:PV(0,90,6000)},{at:0.1,v:vPOLE,fly:4}], pops:[0.3,sc=>wt(sc,'4.000'),sc=>wt(sc,'Titan'),sc=>wt(sc,'Kanada')],
  map:e=>({ice:0.6}),
  over:[e=>{const {u,sc,ctx,t}=e; const t4=wt(sc,'4.000'), tt=wt(sc,'Titan'), tb=wt(sc,'Bilder'), tk=wt(sc,'Kanada');
   ppulse(e,POLE,t,A(u,0.3,0.3)*(1-A(u,tk,0.4)),PK,9); flag(e,POLE,A(u,tt-0.3,0.2),clamp((u-tt+0.3)/1.0)); ptag(e,POLE,'Nordpol',A(u,0.8,0.3)*(1-A(u,tk,0.4)),0,60,'#fff',30);
   pop(ctx,'August 2007',win(u,0.3,t4,0.15),u,0.3,Y,'#fff',120); pop(ctx,'mehr als 4.000 m tief',win(u,t4,tt,0.15),u,t4,Y,'#fff',100); pop(ctx,'Flagge aus Titan',win(u,tt,tk,0.15),u,tt,Y,'#fff',110);
   chip(ctx,'Russische Expedition „Arktika 2007“',CY_,win(u,0.8,tb,0.25));
   const qa=A(u,tk,0.3); if(qa>0){ctx.save(); ctx.globalAlpha=qa; rr(ctx,W/2-660,560,1320,250,30); ctx.fillStyle='rgba(6,20,40,0.9)'; ctx.fill(); ctx.strokeStyle=CC.CAN; ctx.lineWidth=3; ctx.stroke(); ctx.fillStyle=CC.CAN; ctx.font=`700 30px ${KV.FM}`; ctx.textAlign='center'; ctx.fillText('KANADAS AUSSENMINISTER, 2007',W/2,620); ctx.fillStyle='#fff'; ctx.font=`800 56px ${FD}`; ctx.fillText('„Wir leben nicht mehr im 15. Jahrhundert.“',W/2,710); ctx.font=`700 30px ${FB}`; ctx.fillStyle='rgba(255,255,255,0.75)'; ctx.fillText('sinngemäß, Peter MacKay',W/2,770); ctx.restore();}}]}),
 S({head:'Wem gehört die Arktis?', say:S_say[1], pv:[{at:0,v:vNEAR,fly:2}], pops:[sc=>wt(sc,'keine'),sc=>wt(sc,'Wem')],
  map:e=>({ice:0.6}),
  over:[e=>{const {u,sc,ctx}=e; flag(e,POLE,1,1); stamp(ctx,'RECHTLICH BEDEUTUNGSLOS',win(u,wt(sc,'keine'),wt(sc,'Aber'),0.2),u,wt(sc,'keine'),Y+40); pop(ctx,'Wem gehört die Arktis?',A(u,wt(sc,'Wem'),0.15),u,wt(sc,'Wem'),Y,'#fff',110);}]}),
 S({head:'Wem gehört die Arktis?', say:S_say[2], pv:[{at:0,v:vARC,fly:2.4}], pops:[sc=>wt(sc,'zieht'),sc=>wt(sc,'mehrere')],
  map:e=>{const {u,sc}=e; const k=A(u,wt(sc,'zieht')-0.3,2.6); const a=A(u,wt(sc,'mehrere'),0.6); return {ice:0.2+0.8*k, fills:Object.fromEntries(Object.entries(FIVE).map(([c,col],i)=>[c,[col,clamp(a*5-i)]]))};},
  over:[e=>{const {u,sc,ctx}=e; pop(ctx,'Das Eis zieht sich zurück',win(u,wt(sc,'zieht')-0.2,wt(sc,'mehrere'),0.15),u,wt(sc,'zieht')-0.2,Y,'#fff',96); pop(ctx,'… und mehrere Staaten streiten',A(u,wt(sc,'mehrere'),0.15),u,wt(sc,'mehrere'),Y,'#fff',90);}]}),
 // ---------- Kapitel 2 ----------
 S({head:'Ein Meer, kein Kontinent', say:S_say[3], pv:[{at:0,v:vARC,fly:0.5}], pops:[sc=>wt(sc,'kein Land'),sc=>wt(sc,'1959'),sc=>wt(sc,'so etwas nicht')],
  map:e=>({ice:0.7}),
  over:[e=>{const {u,sc,ctx}=e; const tl=wt(sc,'kein Land'), t9=wt(sc,'1959');
   pop(ctx,'kein Kontinent',win(u,0.6,tl,0.15),u,0.6,Y,'#fff',110); pop(ctx,'nur Ozean und Eis',win(u,tl,t9-0.8,0.15),u,tl,Y,'#fff',110);
   sides(ctx,A(u,t9-0.8,0.3),u,t9-0.8,wt(sc,'Für die Arktis'),['ANTARKTIS','Kontinent','Vertrag seit 1959','Ansprüche eingefroren'],['ARKTIS','Ozean','kein eigener','Vertrag']);
   if(u>wt(sc,'so etwas nicht')) xmark(ctx,W-110-380,760,A(u,wt(sc,'so etwas nicht'),0.25),1.2);}],
  top:[e=>card(e.ctx,e.u,2,'Ein Meer, kein Kontinent')]}),
 S({head:'Ein Meer, kein Kontinent', say:S_say[4], pv:[{at:0,v:vARC,fly:0.5}], pops:[sc=>wt(sc,'fünf'),sc=>wt(sc,'Russland'),sc=>wt(sc,'Kanada'),sc=>wt(sc,'USA'),sc=>wt(sc,'Norwegen'),sc=>wt(sc,'Dänemark'),sc=>wt(sc,'acht')],
  map:e=>{const {u,sc}=e; const f={}; [['RUS','Russland'],['CAN','Kanada'],['USA','USA'],['NOR','Norwegen'],['GRL','Dänemark'],['DNK','Dänemark']].forEach(([k,w])=>f[k]=[CC[k],A(u,wt(sc,w),0.3)]); ['FIN','SWE','ISL'].forEach(k=>f[k]=['#C9D6E2',A(u,wt(sc,'Finnland'),0.4)]); return {ice:0.7,fills:f};},
  over:[e=>{const {u,sc,ctx}=e; const ta=wt(sc,'acht');
   [['Russland',[100,66]],['Kanada',[-100,62]],['USA (Alaska)',[-152,64]],['Norwegen',[14,66]],['Grönland (Dänemark)',[-41,73]]].forEach(([n,ll],i)=>ptag(e,ll,n,A(u,wt(sc,['Russland','Kanada','USA','Norwegen','Dänemark'][i]),0.3),0,0,'#fff',30));
   pop(ctx,'5 Anrainerstaaten',win(u,wt(sc,'fünf'),ta,0.15),u,wt(sc,'fünf'),Y,'#fff',110); pop(ctx,'8 Arktis-Staaten',A(u,ta,0.15),u,ta,Y,'#fff',110); chip(ctx,'+ Finnland · Schweden · Island',CY_,A(u,wt(sc,'Finnland'),0.25),'#0B1C2A','rgba(201,214,226,0.96)');}]}),
 S({head:'Ein Meer, kein Kontinent', say:S_say[5], pv:[{at:0,v:PV(0,86,1500),fly:1.6}], pops:[sc=>wt(sc,'Seerecht'),sc=>wt(sc,'200'),sc=>wt(sc,'370'),sc=>wt(sc,'niemandem')],
  map:e=>{const {u,sc}=e; return {ice:0.7,iceA:0.6,eez:FIVE,eezKm:370*eout(A(u,wt(sc,'200')-0.2,1.6)),eezA:0.5};},
  over:[e=>{const {u,sc,ctx}=e; const t2=wt(sc,'200'), tn=wt(sc,'niemandem');
   pop(ctx,'UN-Seerecht',win(u,wt(sc,'Seerecht'),t2,0.15),u,wt(sc,'Seerecht'),Y,'#fff',110); counter(ctx,0,200,win(u,t2,wt(sc,'370'),0.2),u,t2,Y,140,' Seemeilen'); pop(ctx,'≈ 370 km',win(u,wt(sc,'370'),wt(sc,'Dort'),0.15),u,wt(sc,'370'),Y,'#fff',140);
   chip(ctx,'Wirtschaftszone: fischen · bohren · Rohstoffe',CY_,win(u,wt(sc,'Dort'),tn,0.25));
   const a=A(u,tn-0.6,0.5); if(a>0){poly(e,ring(l=>87.2+0.6*Math.sin(l*rad*3),6),'rgba(255,255,255,0.12)',a,'#fff'); ptag(e,POLE,'Hohe See',a,0,0,'#fff',34);} pop(ctx,'gehört niemandem',A(u,tn,0.15),u,tn,Y,'#fff',110);}]}),
 // ---------- Kapitel 3 ----------
 S({head:'Das Eis schmilzt', say:S_say[6], pv:[{at:0,v:vARC,fly:1.4}], pops:[sc=>wt(sc,'1979'),sc=>wt(sc,'viermal')],
  map:e=>{const {u,sc}=e; return {ice:0.75};},
  over:[e=>{const {u,sc,ctx}=e; const tv=wt(sc,'viermal'); const hot=A(u,tv,1); if(hot>0){ctx.save(); ctx.globalAlpha=0.2*hot; const g=ctx.createRadialGradient(W/2,H/2+60,50,W/2,H/2+60,700); g.addColorStop(0,'#FF7A3D'); g.addColorStop(1,'rgba(255,122,61,0)'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H); ctx.restore();}
   pop(ctx,'seit 1979',win(u,wt(sc,'1979'),tv,0.15),u,wt(sc,'1979'),Y,'#fff',130); pop(ctx,'fast 4 × so schnell',A(u,tv,0.15),u,tv,Y,'#FF9A6B',120);
   bars(ctx,A(u,tv+0.4,0.3),u,tv+0.4,[['Arktis: ≈ 0,75 °C pro Jahrzehnt',1,'#FF7A3D'],['Welt: ≈ 0,2 °C pro Jahrzehnt',0.27,CY2]],'Erwärmung 1979–2021',560);}],
  top:[e=>card(e.ctx,e.u,3,'Das Eis schmilzt')]}),
 S({head:'Das Eis schmilzt', say:S_say[7], pv:[{at:0,v:vARC,fly:0.6}], pops:[sc=>wt(sc,'September'),sc=>wt(sc,'19'),sc=>wt(sc,'März 2025')],
  map:e=>{const {u,sc}=e; const tm=wt(sc,'März 2025'); const k=A(u,wt(sc,'September'),3.5); const w=A(u,tm-0.2,0.8); return {ice:k,win:w};},
  over:[e=>{const {u,sc,ctx}=e; const ts=wt(sc,'September'), t19=wt(sc,'19'), tm=wt(sc,'März 2025');
   const yr=Math.round(1980+45*A(u,ts,3.5)); if(u>ts&&u<tm) badge(ctx,'September-Minimum · '+yr,A(u,ts,0.3),'rgba(6,20,40,0.85)');
   pop(ctx,'Tiefpunkt im September',win(u,ts,t19,0.15),u,ts,Y,'#fff',100); pop(ctx,'19 Jahre = 19 Tiefstwerte',win(u,t19,tm,0.15),u,t19,Y,'#fff',96);
   badge(ctx,'Wintermaximum März 2025',A(u,tm,0.3),'rgba(229,72,77,0.95)'); pop(ctx,'so klein wie nie',A(u,tm,0.15),u,tm,Y,'#fff',110); chip(ctx,'Quelle: NSIDC, Satellitendaten seit 1979',CY_,A(u,t19,0.25),'#fff','rgba(6,20,40,0.85)',30);}]}),
 S({head:'Das Eis schmilzt', say:S_say[8], pv:[{at:0,v:PV(60,85,1700),fly:2.5}], pops:[sc=>wt(sc,'zugänglich'),sc=>wt(sc,'unter')],
  map:e=>{const {u,sc}=e; return {ice:1,iceA:1-0.65*A(u,wt(sc,'zugänglich'),1.5)};},
  over:[e=>{const {u,sc,ctx}=e; pop(ctx,'plötzlich zugänglich',win(u,wt(sc,'zugänglich')-0.3,wt(sc,'unter'),0.15),u,wt(sc,'zugänglich')-0.3,Y,'#fff',110); pop(ctx,'Was liegt darunter?',A(u,wt(sc,'unter'),0.15),u,wt(sc,'unter'),Y,'#fff',110);}]}),
 // ---------- Kapitel 4 ----------
 S({head:'Was unter dem Eis liegt', say:S_say[9], pv:[{at:0,v:PV(0,82,1150),fly:1.4}], pops:[sc=>wt(sc,'13'),sc=>wt(sc,'30'),sc=>wt(sc,'500')],
  map:e=>({ice:1,iceA:0.45}),
  over:[e=>{const {u,sc,ctx}=e; const t13=wt(sc,'13'), t30=wt(sc,'30'), t5=wt(sc,'500'); drops(e,BASINS,A(u,t13-0.6,1.2),GO); drops(e,BASINS.map(p=>[p[0]+6,p[1]-1.5]),A(u,t30-0.3,1.2),CY2);
   counter(ctx,0,13,win(u,t13-0.3,t30,0.2),u,t13-0.3,Y,150,' % Erdöl'); counter(ctx,0,30,win(u,t30-0.3,t5,0.2),u,t30-0.3,Y,150,' % Erdgas');
   chip(ctx,'des weltweit unentdeckten Vorkommens (USGS 2008, Schätzung)',CY_,A(u,t13,0.25),'#0B1C2A','rgba(255,224,102,0.96)',32); pop(ctx,'meist < 500 m Wassertiefe',A(u,t5,0.15),u,t5,Y,'#fff',96);}],
  top:[e=>card(e.ctx,e.u,4,'Was unter dem Eis liegt')]}),
 S({head:'Was unter dem Eis liegt', say:S_say[10], pv:[{at:0,v:vAL,fly:1.6}], pops:[sc=>wt(sc,'Fischgründe'),sc=>wt(sc,'Metalle'),sc=>wt(sc,'Seltene'),sc=>wt(sc,'Abkürzung')],
  map:e=>{const {u,sc}=e; return {ice:1,iceA:0.45,fills:{GRL:[CC.GRL,A(u,wt(sc,'Seltene'),0.4)]}};},
  over:[e=>{const {u,sc,ctx}=e; [['Fischgründe',GR],['Metalle','#C9D6E2'],['Seltene Erden',CC.GRL]].forEach(([w,col],i)=>{const a=A(u,wt(sc,w.split(' ')[0]),0.25); if(a>0) chip(ctx,w,560+i*100,a,'#0B1C2A',col);}); ptag(e,[-41,73],'Grönland',A(u,wt(sc,'Seltene'),0.3),0,0,'#fff',36);
   pop(ctx,'eine Abkürzung …',A(u,wt(sc,'Abkürzung'),0.15),u,wt(sc,'Abkürzung'),Y,'#fff',110);}]}),
 S({head:'Was unter dem Eis liegt', say:S_say[11], pv:[{at:0,v:vWIDE,fly:2}], pops:[sc=>wt(sc,'Nordostpassage'),sc=>wt(sc,'zwei Wochen'),sc=>wt(sc,'103'),sc=>wt(sc,'anderthalb')],
  map:e=>({ice:1,iceA:0.6}),
  over:[e=>{const {u,sc,ctx,t}=e; const tn=wt(sc,'Nordostpassage'), ts=wt(sc,'Suezkanal'), t1=wt(sc,'103'), tk=wt(sc,'Kap');
   pline(e,dense(SUEZ,4),'rgba(255,255,255,0.75)',A(u,ts-1.2,2.0),5,[14,10],false); pline(e,dense(NSR,4),CY2,A(u,tn,2.4),7);
   ptag(e,[4.5,51.9],'Rotterdam',A(u,tn,0.3),0,40,'#fff',28); ptag(e,[121.5,31.2],'Shanghai',A(u,tn,0.3),0,40,'#fff',28); ptag(e,[32.5,29.9],'Suezkanal',A(u,ts,0.3),0,40,'#fff',28); ptag(e,[100,79],'Nordostpassage',A(u,tn+0.6,0.3),0,-40,CY2,30);
   pop(ctx,'≈ 2 Wochen kürzer',win(u,wt(sc,'zwei Wochen'),t1,0.15),u,wt(sc,'zwei Wochen'),Y,'#fff',110); counter(ctx,0,103,win(u,t1-0.3,tk,0.2),u,t1-0.3,Y,150,' Schiffe'); chip(ctx,'komplette Durchfahrten 2025 – Rekord (CHNL)',CY_,win(u,t1,tk,0.25));
   pop(ctx,'= 1,5 Tage am Kap der Guten Hoffnung',A(u,tk,0.15),u,tk,Y,'#fff',76);}]}),
 // ---------- Kapitel 5 ----------
 S({head:'Der Streit um den Meeresboden', say:S_say[12], pv:[{at:0,v:PV(0,86,1500),fly:2}], pops:[sc=>wt(sc,'Trick'),sc=>wt(sc,'Verlängerung'),sc=>wt(sc,'Kommission')],
  map:e=>{const {u,sc}=e; const k=A(u,wt(sc,'über die 200'),1.4); return {ice:1,iceA:0.3,eez:FIVE,eezKm:370+380*eout(k),eezA:0.35+0.1*k};},
  over:[e=>{const {u,sc,ctx}=e; pop(ctx,'der eigentliche Trick',win(u,wt(sc,'Trick'),wt(sc,'über die 200'),0.15),u,wt(sc,'Trick'),Y,'#fff',110); pop(ctx,'mehr als 200 Seemeilen',win(u,wt(sc,'über die 200'),wt(sc,'Verlängerung'),0.15),u,wt(sc,'über die 200'),Y,'#fff',100);
   pop(ctx,'wenn der Boden zum Festland gehört',win(u,wt(sc,'Verlängerung'),wt(sc,'Kommission'),0.15),u,wt(sc,'Verlängerung'),Y,'#fff',80); chip(ctx,'Prüfung: UN-Festlandsockelkommission (CLCS)',CY_,A(u,wt(sc,'Kommission'),0.25),'#fff','rgba(6,20,40,0.88)');}],
  top:[e=>card(e.ctx,e.u,5,'Der Streit um den Meeresboden')]}),
 S({head:'Der Lomonossow-Rücken', say:S_say[13], pv:[{at:0,v:vRIDGE,fly:1.6}], pops:[sc=>wt(sc,'Lomonossow'),sc=>wt(sc,'1.800'),sc=>wt(sc,'Nordpol')],
  map:e=>({ice:1,iceA:0.25}),
  over:[e=>{const {u,sc,ctx,t}=e; const tl=wt(sc,'Lomonossow'); pline(e,RIDGE,'#FFE066',A(u,tl-0.4,2.4),10); ptag(e,[155,86],'Lomonossow-Rücken',A(u,tl+0.6,0.3),0,-40,'#FFE066',30); ppulse(e,POLE,t,A(u,wt(sc,'Nordpol'),0.3),PK,9);
   pop(ctx,'Gebirge unter Wasser',win(u,0.3,wt(sc,'1.800'),0.15),u,0.3,Y,'#fff',110); counter(ctx,0,1800,win(u,wt(sc,'1.800')-0.3,wt(sc,'Er reicht'),0.2),u,wt(sc,'1.800')-0.3,Y,140,' km');
   ptag(e,[140,75],'Sibirien',A(u,wt(sc,'Sibirien'),0.3),0,20,'#fff',30); ptag(e,[-80,80],'Kanada',A(u,wt(sc,'Kanada'),0.3),0,0,'#fff',30); ptag(e,[-40,80],'Grönland',A(u,wt(sc,'Grönland'),0.3),0,0,'#fff',30);
   pop(ctx,'direkt unter dem Nordpol',A(u,wt(sc,'Nordpol'),0.15),u,wt(sc,'Nordpol'),Y,'#fff',100);}]}),
 S({head:'Drei Länder, ein Rücken', say:S_say[14], pv:[{at:0,v:PV(0,89,2000),fly:1.4}], pops:[sc=>wt(sc,'Russland'),sc=>wt(sc,'Dänemark'),sc=>wt(sc,'Kanada sagt'),sc=>wt(sc,'alle drei')],
  map:e=>({ice:1,iceA:0.2}),
  over:[e=>{const {u,sc,ctx,t}=e; pline(e,RIDGE,'#FFE066',1,6,null,false);
   [['RUS','Russland'],['GRL','Dänemark'],['CAN','Kanada sagt']].forEach(([k,w])=>poly(e,dense(CL[k],5),CC[k],0.3*A(u,wt(sc,w),0.4),CC[k]));
   [['Russland','Russland: Teil Sibiriens',CC.RUS],['Dänemark','Dänemark: Teil Grönlands',CC.GRL],['Kanada sagt','Kanada: Teil Kanadas',CC.CAN]].forEach(([w,txt,col],i)=>{const a=A(u,wt(sc,w),0.25); if(a>0) chip(ctx,txt,560+i*100,a,'#0B1C2A',col);});
   ppulse(e,POLE,t,A(u,wt(sc,'alle drei'),0.3),'#fff',10); pop(ctx,'alle 3 wollen den Nordpol',A(u,wt(sc,'alle drei'),0.15),u,wt(sc,'alle drei'),Y,'#fff',100); badge(ctx,'Ansprüche vereinfacht dargestellt',A(u,0.5,0.3),'rgba(6,20,40,0.85)');}]}),
 S({head:'Drei Länder, ein Rücken', say:S_say[15], pv:[{at:0,v:PV(0,88,1700),fly:1}], pops:[sc=>wt(sc,'2023'),sc=>wt(sc,'aus'),sc=>wt(sc,'verhandeln')],
  map:e=>({ice:1,iceA:0.2}),
  over:[e=>{const {u,sc,ctx}=e; const t23=wt(sc,'2023'), ta=wt(sc,'Über die Anträge'), tv=wt(sc,'verhandeln');
   poly(e,dense(CL.RUS,5),CC.RUS,0.3+0.2*A(u,t23,0.4),CC.RUS); poly(e,dense(CL.GRL,5),CC.GRL,0.3*(1-0.5*A(u,t23,0.4)),CC.GRL); poly(e,dense(CL.CAN,5),CC.CAN,0.3*(1-0.5*A(u,t23,0.4)),CC.CAN);
   stamp(ctx,'2023: UN-Empfehlung für Russland',win(u,t23,ta,0.2),u,t23,Y+40,CC.RUS); chip(ctx,'Dänemark & Kanada: Entscheidung steht aus',CY_,win(u,ta,tv,0.25),'#0B1C2A','rgba(201,214,226,0.96)');
   pop(ctx,'Überschneidung → Verhandlungen',A(u,tv-0.3,0.15),u,tv-0.3,Y,'#fff',90);}]}),
 // ---------- Kapitel 6 ----------
 S({head:'Seewege und Grönland', say:S_say[16], pv:[{at:0,v:vNWP,fly:1.6}], pops:[sc=>wt(sc,'Nordwestpassage'),sc=>wt(sc,'innere'),sc=>wt(sc,'internationale')],
  map:e=>({ice:1,iceA:0.5,fills:{CAN:[CC.CAN,0.35],USA:[CC.USA,0.25]}}),
  over:[e=>{const {u,sc,ctx}=e; pline(e,dense(NWP,4),CY2,A(u,wt(sc,'Nordwestpassage')-0.2,2.4),7); ptag(e,[-100,75.5],'Nordwestpassage',A(u,wt(sc,'Nordwestpassage')+0.8,0.3),0,-40,CY2,30);
   sides(ctx,A(u,wt(sc,'innere')-0.4,0.3),u,wt(sc,'innere')-0.4,wt(sc,'Die USA'),['KANADA','„Unsere inneren','Gewässer“'],['USA & ANDERE','„Internationale','Meerenge –','frei für alle“']);}],
  top:[e=>card(e.ctx,e.u,6,'Seewege und Grönland')]}),
 S({head:'Seewege und Grönland', say:S_say[17], pv:[{at:0,v:vNSR,fly:1.8}], pops:[sc=>wt(sc,'Genehmigung'),sc=>wt(sc,'Eisbrecher')],
  map:e=>({ice:1,iceA:0.55,fills:{RUS:[CC.RUS,0.3]}}),
  over:[e=>{const {u,sc,ctx}=e; pline(e,dense(NSR.slice(5,20),4),CY2,A(u,0.2,2.2),7); ptag(e,[100,79.5],'Nordostpassage',A(u,1,0.3),0,-40,CY2,30);
   chip(ctx,'russische Genehmigung nötig',560,A(u,wt(sc,'Genehmigung'),0.25),'#fff','rgba(229,72,77,0.95)'); chip(ctx,'oft mit russischem Eisbrecher',660,A(u,wt(sc,'Eisbrecher'),0.25),'#0B1C2A','rgba(234,246,255,0.96)');}]}),
 S({head:'Grönland', say:S_say[18], pv:[{at:0,v:vGRL,fly:1.8}], pops:[sc=>wt(sc,'größte'),sc=>wt(sc,'Trump'),sc=>wt(sc,'September 2026'),sc=>wt(sc,'bleibt')],
  map:e=>{const {u,sc}=e; return {ice:1,iceA:0.5,fills:{GRL:[CC.GRL,0.5],USA:[CC.USA,0.3*A(u,wt(sc,'Trump'),0.4)],CAN:[CC.CAN,0.15]}};},
  over:[e=>{const {u,sc,ctx,t}=e; const tg=wt(sc,'größte'), tr=wt(sc,'regiert'), tt=wt(sc,'Trump'), ts=wt(sc,'September 2026'), tm=wt(sc,'Militär'), tb=wt(sc,'bleibt');
   pop(ctx,'größte Insel der Welt',win(u,tg,tr,0.15),u,tg,Y,'#fff',110); chip(ctx,'Teil des Königreichs Dänemark · weitgehend selbstverwaltet',CY_,win(u,tr,tt,0.25),'#0B1C2A','rgba(185,140,255,0.96)',34);
   ppulse(e,NUUK,t,A(u,tr,0.3),'#fff',8); ptag(e,NUUK,'Nuuk',A(u,tr,0.3),70,0,'#fff',28);
   pop(ctx,'Forderung aus den USA',win(u,tt,ts,0.15),u,tt,Y,'#fff',100); pop(ctx,'September 2026: Abkommen',win(u,ts,tb,0.15),u,ts,Y,'#fff',96);
   ppulse(e,PIT,t,A(u,tm,0.3),CC.USA,9); ptag(e,PIT,'US-Basis Pituffik',A(u,tm,0.3),0,-50,'#fff',28); chip(ctx,'USA · Dänemark · Grönland: mehr US-Militär',CY_,win(u,ts,tb,0.25));
   stamp(ctx,'BLEIBT TEIL DÄNEMARKS',A(u,tb,0.2),u,tb,Y+40,CC.GRL);}]}),
 // ---------- Kapitel 7 ----------
 S({head:'Es geht auch friedlich', say:S_say[19], pv:[{at:0,v:PV(-50,70,2600),fly:1.6}], pops:[sc=>wt(sc,'2008'),sc=>wt(sc,'Recht')],
  map:e=>({ice:1,iceA:0.5,fills:{GRL:[CC.GRL,0.3]}}),
  over:[e=>{const {u,sc,ctx,t}=e; ppulse(e,ILU,t,A(u,wt(sc,'2008'),0.3),GO,10); ptag(e,ILU,'Ilulissat',A(u,wt(sc,'2008'),0.3),-120,0,'#fff',30);
   pop(ctx,'kein Kriegsgebiet',win(u,0.3,wt(sc,'2008'),0.15),u,0.3,Y,'#fff',110); badge(ctx,'Erklärung von Ilulissat · 2008',A(u,wt(sc,'2008'),0.3),'rgba(6,20,40,0.85)'); pop(ctx,'Streit nach geltendem Recht lösen',A(u,wt(sc,'Recht')-0.4,0.15),u,wt(sc,'Recht')-0.4,Y,'#fff',84);}],
  top:[e=>card(e.ctx,e.u,7,'Es geht auch friedlich')]}),
 S({head:'Die Hans-Insel', say:S_say[20], pv:[{at:0,v:PV(-62,79,4200),fly:1.8},{at:sc=>wt(sc,'Hans')-0.2,v:vHANS,fly:2}], pops:[sc=>wt(sc,'50'),sc=>wt(sc,'Whisky'),sc=>wt(sc,'Schnaps'),sc=>wt(sc,'2022'),sc=>wt(sc,'Landgrenze')],
  map:e=>({ice:1,iceA:0.3,fills:{CAN:[CC.CAN,0.35],GRL:[CC.GRL,0.35]}}),
  over:[e=>{const {u,sc,ctx}=e; const th=wt(sc,'Hans'), tw=wt(sc,'Whisky'), t22=wt(sc,'2022'), tl=wt(sc,'Landgrenze'); const q=Q(e,HANS);
   if(q){const a=A(u,th,0.4); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='#7B6E5E'; ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(q[0],q[1],46,34,0.3,0,7); ctx.fill(); ctx.stroke();
    const s=A(u,t22,0.6); if(s>0){ctx.globalAlpha=a*s; ctx.setLineDash([8,6]); ctx.strokeStyle='#fff'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(q[0]-8,q[1]-40); ctx.lineTo(q[0]+8,q[1]+40); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha=a*s*0.55; ctx.fillStyle=CC.CAN; ctx.beginPath(); ctx.ellipse(q[0]-24,q[1],22,30,0.3,0,7); ctx.fill(); ctx.fillStyle=CC.GRL; ctx.beginPath(); ctx.ellipse(q[0]+24,q[1],22,30,0.3,0,7); ctx.fill();}
    ctx.restore(); ptag(e,HANS,'Hans-Insel',a,0,-70,'#fff',32);}
   ptag(e,[-75,80.2],'Kanada',A(u,0.4,0.3),0,0,'#fff',32); ptag(e,[-58,81.5],'Grönland',A(u,0.4,0.3),0,0,'#fff',32);
   counter(ctx,0,49,win(u,wt(sc,'50')-0.3,tw-0.8,0.2),u,wt(sc,'50')-0.3,Y,140,' Jahre Streit'); bottle(ctx,W/2-260,700,win(u,tw,t22,0.25),'#C8862B','WHISKY'); bottle(ctx,W/2+260,700,win(u,wt(sc,'Schnaps'),t22,0.25),'#2F6B3A','SCHNAPS');
   chip(ctx,'1973–2022: abwechselnd Flagge + Flasche',CY_,win(u,tw-0.8,t22,0.25)); pop(ctx,'2022: einfach geteilt',win(u,t22,tl,0.15),u,t22,Y,'#fff',110); pop(ctx,'Kanada ↔ Europa: Landgrenze',A(u,tl,0.15),u,tl,Y,'#fff',90);}]}),
 // ---------- Kapitel 8 ----------
 S({head:'Wem gehört die Arktis?', say:S_say[21], pv:[{at:0,v:vARC,fly:2}], pops:[sc=>wt(sc,'verteilt'),sc=>wt(sc,'aufgeteilt')],
  map:e=>{const {u,sc}=e; return {ice:1,iceA:0.4,fills:Object.fromEntries(Object.entries(FIVE).map(([c,col])=>[c,[col,0.6*A(u,wt(sc,'verteilt'),0.5)]])),eez:FIVE,eezKm:370*A(u,wt(sc,'aufgeteilt'),1.2),eezA:0.4};},
  over:[e=>{const {u,sc,ctx}=e; const ta=wt(sc,'aufgeteilt'); ['RUS','GRL','CAN'].forEach((k,i)=>poly(e,dense(CL[k],5),CC[k],0.22*A(u,ta+0.6+i*0.4,0.4),CC[k]));
   pop(ctx,'Land: längst verteilt',win(u,wt(sc,'verteilt'),ta,0.15),u,wt(sc,'verteilt'),Y,'#fff',100); pop(ctx,'Meer: wird gerade aufgeteilt',A(u,ta,0.15),u,ta,Y,'#fff',100); chip(ctx,'Messungen · Anträge · Verhandlungen',CY_,A(u,wt(sc,'Messungen'),0.25));}],
  top:[e=>card(e.ctx,e.u,8,'Wem gehört die Arktis?')]}),
 S({head:'Wem gehört die Arktis?', say:S_say[22], pv:[{at:0,v:PV(0,90,1500),fly:2}], pops:[sc=>wt(sc,'Zusammenarbeit'),sc=>wt(sc,'Machtkämpfe')],
  map:e=>{const {u}=e; return {ice:1,iceA:1-0.6*A(u,0.3,4)};},
  over:[e=>{const {u,sc,ctx}=e; pop(ctx,'Zusammenarbeit',win(u,wt(sc,'Zusammenarbeit'),wt(sc,'Machtkämpfe'),0.15),u,wt(sc,'Zusammenarbeit'),Y,TE,120); pop(ctx,'oder Machtkampf?',win(u,wt(sc,'Machtkämpfe'),wt(sc,'entscheidet'),0.15),u,wt(sc,'Machtkämpfe'),Y,'#FF9A6B',120); pop(ctx,'die nächsten Jahrzehnte',A(u,wt(sc,'entscheidet'),0.15),u,wt(sc,'entscheidet'),Y,'#fff',100);}]}),
 S({head:'Was denkst du?', say:S_say[23], pv:[{at:0,v:vARC,fly:1.4}], pops:[sc=>wt(sc,'aufgeteilt'),sc=>wt(sc,'allen'),sc=>wt(sc,'abonnier')],
  map:e=>({ice:1,iceA:0.5}),
  over:[e=>{const {u,sc,ctx}=e; sides(ctx,1-A(u,wt(sc,'abonnier')-0.5,0.4),u,wt(sc,'aufgeteilt')-0.6,wt(sc,'Oder'),['OPTION 1','Unter den','Anrainern','aufteilen'],['OPTION 2','Wie die Antarktis:','gehört allen']);
   chip(ctx,'Schreib es in die Kommentare',CY_,win(u,wt(sc,'Kommentare'),wt(sc,'abonnier'),0.25),'#fff','rgba(229,72,77,0.95)'); subscribe(ctx,A(u,wt(sc,'abonnier')-0.3,0.4));}]}),
];
return {tag:'GEOFY · DOKU #2', scenes, wt};
}
