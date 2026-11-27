// Story: Warum ist #9 – Länder, die es nicht mehr gibt
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



const GO='#FFE066', TE='#33D1B0', PK='#FF3B7F', CY='#7FD0FF';
const A=(u,t0,d=0.35)=>clamp((u-t0)/d);
const win=(u,t0,t1,d=0.3)=>clamp((u-t0)/d)*(1-clamp((u-t1)/d));
const VW=(lon,lat,wdeg)=>({lon,lat,scale:920/(wdeg*Math.PI/180)});
const vSA=VW(-60,-20,62), vAtl=VW(-38,24,100), vPole=VW(-40,5,140), vBR=VW(-55,-13,50), vEU=VW(-20,10,130);
const vG=vSA;
const ES=['ARG','BOL','CHL','COL','ECU','PRY','PER','URY','VEN'];
const TL=-46.6; const LINE=[[TL,78],[TL,40],[TL,0],[TL,-40],[TL,-75]];
const PALOS=[-6.9,37.2], BAH=[-74.5,24.1], CAB=[-39.1,-16.4];
function pop(ctx,txt,a,u,t0,y=600,col='#fff',size=130){if(a<=0||window.NO_CHIPS) return; const k=1+0.3*Math.max(0,1-(u-t0)/0.25); ctx.save(); ctx.translate(540,y); ctx.scale(k,k); ctx.translate(-540,-y); big(ctx,txt,a,y,col,size); ctx.restore();}
function flash(ctx,u,t0,col='rgba(255,224,102,',m=0.28){const a=1-clamp((u-t0)/0.45); if(u<t0||a<=0) return; ctx.save(); ctx.fillStyle=col+(a*m)+')'; ctx.fillRect(0,0,1080,1920); ctx.restore();}
function counter(ctx,from,to,a,u,t0,y,size=150,suf='',dec=0){if(a<=0) return; const k=eout(clamp((u-t0)/1.0)); const v=from+(to-from)*k; big(ctx,v.toLocaleString('de-DE',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf,a,y,'#fff',size);}
const lx=e=>e.proj([TL,0])[0];
// Brazil filled only east of meridian X (growth to the west)
function brClip(e,col,a,X){if(a<=0) return; const {ctx}=e; const x=e.proj([X,0])[0]; ctx.save(); ctx.beginPath(); ctx.rect(x,0,1080-x+2000,1920); ctx.clip(); fill(e,'BRA',col,a,3); ctx.restore();}
function sides(e,a){if(a<=0) return; const {ctx}=e; const x=lx(e); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(255,224,102,0.13)'; ctx.fillRect(0,0,x,1920); ctx.fillStyle='rgba(255,59,127,0.13)'; ctx.fillRect(x,0,1080-x,1920); ctx.restore();}
function tline(e,prog,a=1){if(a<=0||prog<=0) return; const {ctx}=e; ctx.save(); ctx.globalAlpha=a; ctx.shadowColor=GO; ctx.shadowBlur=18; line(e,LINE,GO,prog,7,[18,12]); ctx.restore();}
function shipAt(e,pts,k,a){if(a<=0) return; const q=pts.map(p=>P(e,p)); const i=Math.min(q.length-2,Math.floor(k*(q.length-1))), r=k*(q.length-1)-i; const x=q[i][0]+(q[i+1][0]-q[i][0])*r, y=q[i][1]+(q[i+1][1]-q[i][1])*r; const {ctx}=e; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.rotate(Math.atan2(q[i+1][1]-q[i][1],q[i+1][0]-q[i][0])); ctx.beginPath(); ctx.moveTo(22,0); ctx.lineTo(8,-10); ctx.lineTo(-18,-10); ctx.lineTo(-18,10); ctx.lineTo(8,10); ctx.closePath(); ctx.fillStyle='#fff'; ctx.shadowColor='rgba(0,0,0,0.6)'; ctx.shadowBlur=10; ctx.fill(); ctx.restore();}
function bars2(ctx,a,u,t0){if(a<=0) return; const x=130,w=820; ctx.save(); ctx.globalAlpha=a; rr(ctx,x-40,800,w+80,330,32); ctx.fillStyle='rgba(6,20,40,0.78)'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.16)'; ctx.lineWidth=2; ctx.stroke();
 const row=(y,lab,share,col,k)=>{ctx.fillStyle='#fff'; ctx.font=`700 32px ${FB}`; ctx.fillText(lab,x,y-14); ctx.fillStyle='rgba(255,255,255,0.12)'; rr(ctx,x,y,w,54,14); ctx.fill(); ctx.fillStyle=col; rr(ctx,x,y,Math.max(12,w*share*eout(k)),54,14); ctx.fill();};
 row(900,'Brasilien: über 200 Mio.',1,PK,A(u,t0,0.8)); row(1050,'Portugal: ≈ 10,6 Mio.',0.05,GO,A(u,t0+0.5,0.8)); ctx.restore();}
const ROUTE=[PALOS,[-16,28.3],[-40,27],[-60,25],BAH];
const scenes=[
 {head:'Warum kein Spanisch?', headInstant:true, say:S_say[0], cams:[{at:0,view:vSA},{at:sc=>wt(sc,'Schuld')-0.1,view:vAtl,fly:1.6}],
  pops:[sc=>wt(sc,'größte'),sc=>wt(sc,'Portugiesisch'),sc=>wt(sc,'Linie'),sc=>wt(sc,'500')], swish:[sc=>wt(sc,'Schuld')-0.1],
  under:[e=>{const {u,sc}=e; ES.forEach((k,i)=>fill(e,k,CY,0.75*A(u,0.05+i*0.09,0.25),2)); fill(e,'BRA',PK,0.85*A(u,wt(sc,'Portugiesisch'),0.3),3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tg=wt(sc,'größte'), tp=wt(sc,'Portugiesisch'), ts=wt(sc,'Schuld'), tl=wt(sc,'Linie'), t5=wt(sc,'500');
   pop(ctx,'Spanisch',win(u,0,tg,0.15),u,0,600,'#fff',150);
   const qb=P(e,[-52,-10]); if(qb&&u>tg&&u<tp+0.3){ctx.save(); ctx.globalAlpha=win(u,tg,tp,0.2); ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(qb[0],qb[1],48,0,7); ctx.fill(); ctx.fillStyle=C.bg; ctx.font=`800 64px ${FD}`; ctx.textAlign='center'; ctx.fillText('?',qb[0],qb[1]+22); ctx.restore();}
   pop(ctx,'Portugiesisch',win(u,tp,ts,0.15),u,tp,600,'#fff',130); tag(e,[-52,-10],'Brasilien',win(u,tp,ts,0.25),0,0,'#fff',40);
   tline(e,A(u,tl,1.2)); pop(ctx,'vor 500 Jahren',A(u,t5,0.2),u,t5,600,'#fff',110); chip(ctx,'eine einzige Linie',1180,A(u,tl,0.25),'#0B1C2A','rgba(255,224,102,0.96)');}]},
 {head:'1492: Spanien gegen Portugal', say:S_say[1], cams:[{at:0,view:vAtl,fly:0.8}],
  pops:[sc=>wt(sc,'1492'),sc=>wt(sc,'Portugal'),sc=>wt(sc,'Wem')], swish:[sc=>wt(sc,'Wem')],
  under:[e=>{const {u,sc}=e; fill(e,'ESP',GO,0.85*A(u,wt(sc,'Spanien'),0.3),3); fill(e,'PRT',PK,0.9*A(u,wt(sc,'Portugal'),0.3),3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const t1=wt(sc,'1492'), tw=wt(sc,'Wem'); const k=A(u,t1,2.4);
   line(e,ROUTE,'rgba(255,255,255,0.85)',k,5,[12,10]); shipAt(e,ROUTE,Math.min(0.999,k),A(u,t1,0.2)*(1-A(u,tw,0.3))); tag(e,[-6,40],'Spanien',A(u,wt(sc,'Spanien'),0.3),0,-40,'#fff',32);
   pop(ctx,'1492',win(u,t1,wt(sc,'Portugal'),0.2),u,t1,600,'#fff',160); tag(e,[-8.5,39.5],'Portugal',A(u,wt(sc,'Portugal'),0.3),-120,40,'#fff',32);
   chip(ctx,'Portugal fürchtet, leer auszugehen',1180,win(u,wt(sc,'Portugal'),tw,0.25),'#fff','rgba(229,72,77,0.95)');
   pop(ctx,'Wem gehört die neue Welt?',A(u,tw,0.15),u,tw,600,'#fff',76);}]},
 {head:'1494: Der Vertrag', say:S_say[2], cams:[{at:0,view:vPole,fly:1.4}],
  pops:[sc=>wt(sc,'1494'),sc=>wt(sc,'Westlich'),sc=>wt(sc,'östlich')], swish:[0],
  under:[e=>{const {u,sc}=e; fill(e,'ESP',GO,0.85,3); fill(e,'PRT',PK,0.9,3);}],
  over:[e=>{const {u,sc,ctx}=e; const t4=wt(sc,'1494'), tl=wt(sc,'Linie'), tw=wt(sc,'Westlich'), to=wt(sc,'östlich');
   sides(e,A(u,tw,0.4)); tline(e,A(u,tl,1.4));
   pop(ctx,'1494',win(u,t4,tw,0.2),u,t4,600,'#fff',160); chip(ctx,'Vertrag von Tordesillas',1180,win(u,wt(sc,'Tordesillas'),tw,0.25));
   const x=lx(e); ctx.save(); ctx.font=`800 52px ${FD}`; ctx.textAlign='center'; ctx.shadowColor='rgba(0,0,0,0.8)'; ctx.shadowBlur=20;
   ctx.globalAlpha=A(u,tw,0.25); ctx.fillStyle=GO; ctx.fillText('Spanien',x-190,760); ctx.globalAlpha=A(u,to,0.25); ctx.fillStyle=PK; ctx.fillText('Portugal',x+190,760); ctx.restore();}]},
 {head:'Die Linie trifft Südamerika', say:S_say[3], cams:[{at:0,view:vBR,fly:1.6}],
  pops:[sc=>wt(sc,'schneidet'),sc=>wt(sc,'1500')], swish:[0],
  under:[e=>{const {u,sc}=e; brClip(e,PK,0.9*A(u,wt(sc,'schneidet'),0.4),TL);}],
  over:[e=>{const {u,sc,ctx,t}=e; const ts=wt(sc,'schneidet'), tc=wt(sc,'Cabral'), t15=wt(sc,'1500'); tline(e,1); sides(e,0.8);
   chip(ctx,'die Linie schneidet ein Stück ab',1180,win(u,ts,tc,0.25),'#0B1C2A','rgba(255,224,102,0.96)');
   pulse(e,CAB,t,A(u,tc,0.3),PK,12); tag(e,CAB,'Cabral landet',A(u,tc,0.3),0,-50,'#fff',32);
   pop(ctx,'1500',win(u,t15,t15+2.2,0.2),u,t15,600,'#fff',160); chip(ctx,'die Küste gehört Portugal',1180,A(u,wt(sc,'gehört'),0.25),'#fff','rgba(229,72,77,0.95)');}]},
 {head:'Der Clou', say:S_say[4], cams:[{at:0,view:vSA,fly:1.4}],
  pops:[sc=>wt(sc,'Clou'),sc=>wt(sc,'Westen'),sc=>wt(sc,'1750')], swish:[sc=>wt(sc,'Siedler')],
  under:[e=>{const {u,sc}=e; ES.forEach(k=>fill(e,k,CY,0.45,1.5)); const g=eout(A(u,wt(sc,'Siedler'),Math.max(0.8,wt(sc,'1750')-wt(sc,'Siedler')))); brClip(e,PK,0.9,TL-(74-46.6+2)*g);}],
  over:[e=>{const {u,sc,ctx}=e; const tc=wt(sc,'Clou'), ts=wt(sc,'Siedler'), t17=wt(sc,'1750'); tline(e,1,1-0.5*A(u,t17,0.6));
   pop(ctx,'Der Clou',win(u,tc,ts,0.15),u,tc,600,'#fff',140);
   const q=P(e,[-50,-12]); if(q){const k=A(u,ts,0.3)*(1-A(u,t17,0.3)); if(k>0){ctx.save(); ctx.globalAlpha=k; ctx.strokeStyle='#fff'; ctx.fillStyle='#fff'; ctx.lineWidth=12; ctx.lineCap='round'; const dx=-200*((e.t*0.8)%1); ctx.beginPath(); ctx.moveTo(q[0]+dx+120,q[1]); ctx.lineTo(q[0]+dx-60,q[1]); ctx.stroke(); ctx.beginPath(); ctx.moveTo(q[0]+dx-90,q[1]); ctx.lineTo(q[0]+dx-50,q[1]-30); ctx.lineTo(q[0]+dx-50,q[1]+30); ctx.closePath(); ctx.fill(); ctx.restore();}}
   chip(ctx,'immer weiter nach Westen',1180,win(u,ts,t17,0.25));
   pop(ctx,'1750',A(u,t17,0.2),u,t17,600,'#fff',160); chip(ctx,'Spanien erkennt die Grenzen an',1180,A(u,t17,0.25),'#0B1C2A','rgba(51,209,176,0.96)');}],
  top:[e=>flash(e.ctx,e.u,wt(e.sc,'Clou'))]},
 {head:'Brasilien heute', say:S_say[5], cams:[{at:0,view:vSA,fly:0.6},{at:sc=>wt(sc,'200')-0.2,view:vEU,fly:1.6}],
  pops:[sc=>wt(sc,'doppelt'),sc=>wt(sc,'200'),sc=>wt(sc,'zwanzigmal')], swish:[sc=>wt(sc,'200')-0.2],
  under:[e=>{const {u,sc}=e; fill(e,'BRA',PK,0.9,3); fill(e,'PRT',GO,0.95*A(u,wt(sc,'Portugal'),0.3),4);}],
  over:[e=>{const {u,sc,ctx}=e; const td=wt(sc,'doppelt'), t2=wt(sc,'200'), tz=wt(sc,'zwanzigmal');
   pop(ctx,'2× so groß wie die EU',win(u,td,t2,0.2),u,td,600,'#fff',88); chip(ctx,'≈ 8,5 Mio. km²',1180,win(u,td,t2,0.25));
   counter(ctx,0,200,win(u,t2,tz,0.2),u,t2,600,150,' Mio.'); bars2(ctx,A(u,tz-0.3,0.3),u,tz);
   pop(ctx,'20×',A(u,tz,0.2),u,tz,600,'#fff',170);}]},
 {head:'Eine Linie', say:S_say[6], cams:[{at:0,view:vSA,fly:1.4}],
  pops:[sc=>wt(sc,'Linie'),sc=>wt(sc,'halber')], swish:[0],
  under:[e=>{ES.forEach(k=>fill(e,k,CY,0.7,1.5)); fill(e,'BRA',PK,0.9,3);}],
  over:[e=>{const {u,sc,ctx}=e; tline(e,A(u,0.2,1.2)); pop(ctx,'1 Linie',win(u,wt(sc,'Linie'),wt(sc,'halber'),0.2),u,wt(sc,'Linie'),600,'#fff',150);
   pop(ctx,'½ Kontinent',A(u,wt(sc,'halber'),0.2),u,wt(sc,'halber'),600,'#fff',140);}]},
 {say:S_say[7], cams:[{at:0,view:vG,fly:1.2},{at:1.4,view:vG,fly:4.5}],
  under:[],
  over:[],
  top:[e=>{const {ctx,u,sc}=e; const a=eout(clamp((u-0.2)/0.6)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.92)'; rr(ctx,L,560,780,470,32); ctx.fill();
   const q='Wusstest du das schon?'; const z=fit(ctx,q,800,76,52,700,FD); ctx.font=`800 ${z}px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(q,L+40,670);
   const rows=[['heart','Like da lassen','Like'],['follow','Folgen für mehr','folg'],['share','Teilen mit jemandem','schick']];
   rows.forEach(([ic,txt,f],i)=>{const ai=clamp((u-wt(sc,f)+0.2)/0.35); if(ai<=0) return; const y=790+i*105, x=L+70; ctx.save(); ctx.globalAlpha=a*ai; ctx.translate(x,y-14); const s=1+0.25*Math.max(0,1-(u-wt(sc,f))/0.4);
    ctx.scale(s,s); ctx.fillStyle=C.target; ctx.strokeStyle=C.target; ctx.lineWidth=5; ctx.lineJoin='round'; ctx.lineCap='round';
    if(ic==='heart'){ctx.beginPath(); ctx.moveTo(0,16); ctx.bezierCurveTo(-30,-4,-18,-28,0,-12); ctx.bezierCurveTo(18,-28,30,-4,0,16); ctx.fill();}
    if(ic==='follow'){ctx.beginPath(); ctx.arc(0,-4,22,0,7); ctx.fill(); ctx.globalCompositeOperation='destination-out'; ctx.fillRect(-3,-16,6,26); ctx.fillRect(-13,-6,26,6); ctx.globalCompositeOperation='source-over';}
    if(ic==='bubble'){rr(ctx,-24,-20,48,34,10); ctx.fill(); ctx.beginPath(); ctx.moveTo(-10,12); ctx.lineTo(-16,26); ctx.lineTo(4,13); ctx.fill();}
    if(ic==='share'){ctx.beginPath(); ctx.moveTo(-20,18); ctx.quadraticCurveTo(-18,-8,14,-8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10,-22); ctx.lineTo(26,-8); ctx.lineTo(10,6); ctx.closePath(); ctx.fill();}
    ctx.restore(); ctx.save(); ctx.globalAlpha=a*ai; ctx.font=`800 42px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(txt,x+60,y,620); ctx.restore();});
   ctx.restore();}]}
];
return {tag:'GEOFY · WARUM IST #9', scenes, wt};
}
