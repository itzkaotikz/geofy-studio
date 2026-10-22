// Story: Karten lügen #4 – Wie groß ist Indonesien wirklich?
// 5.120 km W–O · 13.466 bis > 17.500 Inseln, ≈ 922 bewohnt · ≈ 288 Mio. (Rang 4) · Java ≈ 56 % · Nusantara (Ziel 2028)
// Overlay: Westspitze bei Irland → Ostspitze ≈ 59,6° O / 38,7° N (eigene Berechnung)
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,mainPart,label,rr,fit,hl}=KV;
const BY=KV.byId();
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function counter(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function moved(geom,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:geom.type,coordinates:mp(geom.coordinates)}};}
function shape(e,g,col,a,fillA=0.75){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(g); ctx.globalAlpha=a*fillA; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function line(e,a,b,k,col,w=6){if(k<=0) return; const {ctx}=e; const pa=P(e,a), pb=P(e,b); const x=lerp(pa[0],pb[0],eout(clamp(k))), y=lerp(pa[1],pb[1],eout(clamp(k))); ctx.save(); ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.setLineDash([16,10]); ctx.beginPath(); ctx.moveTo(pa[0],pa[1]); ctx.lineTo(x,y); ctx.stroke(); ctx.setLineDash([]); [pa,[x,y]].forEach(p=>{ctx.beginPath(); ctx.arc(p[0],p[1],9,0,7); ctx.fillStyle=col; ctx.fill();}); ctx.restore();}
const IDN=BY.get('IDN').geometry, iC=[118,-2.5], TO=[30,50], W_END=[95.3,5.6], E_END=[141,-9.1];
const polys=(IDN.type==='MultiPolygon'?IDN.coordinates:[IDN.coordinates]).map(c=>({type:'Polygon',coordinates:c}));
const ISL=polys.map(p=>d3.geoCentroid(p));
// Java = largest polygon with centroid 105–115 °E, 9–5 °S
const JAVA=polys.filter(p=>{const c=d3.geoCentroid(p); return c[0]>105&&c[0]<115&&c[1]>-9&&c[1]<-5.5;}).sort((a,b)=>d3.geoArea(b)-d3.geoArea(a))[0];
const USA=mainPart('USA').geometry, uC=d3.geoCentroid(mainPart('USA'));
const JKT=[106.85,-6.2], NUS=[116.7,-0.97];
const vWorld=viewBox([-25,-40,150,70]), vEur=viewBox([-16,30,66,62]), vIdn=viewBox([92,-14,144,10]), vIdnW=viewBox([80,-42,148,14]), vJava=viewBox([103,-10,118,-3]), vBor=viewBox([104,-8,121,3]);
const ROSE='#FF3B7F', ICE='#9FD8F5', GOLD='#FFE066';

const scenes=[
 {head:'Wie groß ist Indonesien wirklich?', headInstant:true, say:S_say[0], cams:[{at:0,view:vWorld},{at:sc=>wt(sc,'Europa')-0.5,view:vEur,fly:2.2}],
  under:[e=>{const {u,sc}=e; const k=ease(clamp((u-wt(sc,'legt'))/2.0)); hl(e,'IDN',ROSE,0.85*(1-k*0.6));}],
  over:[e=>{const {u,sc,ctx}=e; tag(e,iC,'Indonesien',clamp((u-wt(sc,'Indonesien'))/0.4)*(1-clamp((u-wt(sc,'legt'))/0.4)),-80,40,ROSE,32);
   const k=ease(clamp((u-wt(sc,'legt'))/2.0)); if(k>0){const cur=d3.geoInterpolate(iC,TO)(k); shape(e,moved(IDN,iC,cur),ROSE,clamp(k*3));}
   const ai=clamp((u-wt(sc,'Irland'))/0.4); if(ai>0){tag(e,[-8,53.3],'Irland',ai,-110,-30,'#fff',30);} const ak=clamp((u-wt(sc,'Kaspische'))/0.4); if(ak>0) tag(e,[51,42],'Kaspisches Meer',ak,-40,-50,ICE,28);}]},
 {head:'Der Mercator-Trick', say:S_say[1], cams:[{at:0,view:vEur,fly:1.0},{at:0.3,view:vWorld,fly:2.4}],
  under:[e=>{hl(e,'IDN',ROSE,0.8);}],
  over:[e=>{const {u,sc,ctx,path}=e; const ae=clamp((u-wt(sc,'Äquator'))/0.4); if(ae>0){const a=P(e,[-25,0]), b=P(e,[150,0]); ctx.save(); ctx.globalAlpha=ae; ctx.setLineDash([12,10]); ctx.strokeStyle=GOLD; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(-20,a[1]); ctx.lineTo(1100,b[1]); ctx.stroke(); ctx.restore(); tag(e,[-10,0],'Äquator',ae,0,-24,GOLD,28);}
   // equal-size circles grow towards the north
   const tg=wt(sc,'echter Größe'), tb=wt(sc,'aufgebläht'); [[118,0],[20,50],[20,30]].forEach(([x,y],i)=>{const a=clamp((u-(i===0?tg:tb)-i*0.2)/0.5); if(a<=0) return; const c=d3.geoCircle().center([x,y]).radius(6)(); ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); path(c); ctx.fillStyle='rgba(255,224,102,0.35)'; ctx.fill(); ctx.strokeStyle=GOLD; ctx.lineWidth=3; ctx.stroke(); ctx.restore();});
   const a1=clamp((u-tg)/0.4); if(a1>0) label(ctx,'am Äquator: fast echte Größe',L+10,1180,{alpha:a1,font:`800 36px ${FD}`});
   const a2=clamp((u-tb)/0.4); if(a2>0) label(ctx,'im Norden: aufgebläht',L+10,1250,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:a2,font:`800 38px ${FD}`});}]},
 {head:'Über 5.000 Kilometer', say:S_say[2], cams:[{at:0,view:vWorld,fly:1.0},{at:0.3,view:vIdn,fly:2.0},{at:sc=>wt(sc,'USA')-0.5,view:vIdnW,fly:2.0}],
  under:[e=>{hl(e,'IDN',ROSE,0.8);}],
  over:[e=>{const {u,sc,ctx}=e; line(e,W_END,E_END,(u-wt(sc,'misst'))/1.4,GOLD,6); const a5=clamp((u-wt(sc,'5.000'))/0.4); if(a5>0) label(ctx,'Indonesien: > 5.000 km',L+10,1180,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:a5,font:`800 38px ${FD}`});
   const k=ease(clamp((u-wt(sc,'USA')+0.2)/1.4)); if(k>0){const cur=d3.geoInterpolate([uC[0]+0,uC[1]],[110,-27])(k); shape(e,moved(USA,uC,cur),ICE,clamp(k*3),0.6); if(k>0.9) label(ctx,'USA: ≈ 4.500 km',L+10,1250,{color:'#0B1C2A',bg:'rgba(159,216,245,0.95)',font:`800 38px ${FD}`});}}]},
 {head:'Tausende Inseln', say:S_say[3], cams:[{at:0,view:vIdnW,fly:1.0},{at:0.4,view:vIdn,fly:2.6},{at:sc=>wt(sc,'Bewohnt')-0.3,view:viewBox([96,-11,128,6]),fly:2.6}],
  under:[e=>{hl(e,'IDN',ROSE,0.35,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; const ti=wt(sc,'Inseln'); ISL.forEach((c,i)=>{const a=clamp((u-ti-(i%60)*0.03)/0.3); if(a<=0) return; const q=P(e,c); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(q[0],q[1],4,0,7); ctx.fill(); ctx.restore();});
   const tz=wt(sc,'13.000'), kz=ease(clamp((u-tz)/1.4)); if(kz>0) counter(ctx,`${Math.round(lerp(13,17,kz))}.000+ Inseln`,clamp((u-tz)/0.3)*(1-clamp((u-wt(sc,'Bewohnt'))/0.4)),700,'#fff',96);
   const ab=clamp((u-wt(sc,'900'))/0.4); if(ab>0) label(ctx,'bewohnt: nur ≈ 900',L+10,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ab,font:`800 40px ${FD}`});}]},
 {head:'Nicht nur groß, sondern auch voll', say:S_say[4], cams:[{at:0,view:viewBox([96,-11,128,6]),fly:1.0},{at:0.4,view:vIdn,fly:2.4},{at:sc=>wt(sc,'Java')-0.6,view:vJava,fly:2.0}],
  under:[e=>{const {u,sc}=e; hl(e,'IDN',ROSE,0.5*(1-clamp((u-wt(sc,'einzigen'))/0.6)*0.6),{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; const tm=wt(sc,'288'), km=ease(clamp((u-tm+0.4)/1.4)); counter(ctx,`${Math.round(288*km)} Mio.`,clamp((u-tm+0.4)/0.3)*(1-clamp((u-wt(sc,'Mehr als'))/0.4)),700,'#fff',120);
   const ar=clamp((u-wt(sc,'viertmeisten'))/0.4)*(1-clamp((u-wt(sc,'Mehr als'))/0.4)); if(ar>0) label(ctx,'Platz 4 der Welt',L+10,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ar,font:`800 40px ${FD}`});
   const aj=clamp((u-wt(sc,'einzigen'))/0.5); if(aj>0&&JAVA){ctx.save(); ctx.beginPath(); e.path(JAVA); ctx.globalAlpha=0.85*aj; ctx.fillStyle=GOLD; ctx.fill(); ctx.globalAlpha=aj; ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); tag(e,[110,-7.4],'Java',clamp((u-wt(sc,'Java'))/0.4),-30,-60,GOLD,40);}
   const ah=clamp((u-wt(sc,'Mehr als'))/0.4); if(ah>0) label(ctx,'> 50 % leben auf Java',L+10,1250,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:ah,font:`800 40px ${FD}`});}]},
 {head:'Eine neue Hauptstadt', say:S_say[5], cams:[{at:0,view:vJava,fly:1.0},{at:sc=>wt(sc,'Borneo')-0.4,view:vBor,fly:2.2}],
  under:[e=>{hl(e,'IDN',ROSE,0.35,{outline:false});}],
  over:[e=>{const {u,sc,ctx,t}=e; const tj=wt(sc,'Jakarta'), tn=wt(sc,'Nusantara'); pulse(e,JKT,t,clamp((u-0.3)/0.4),'#fff',10); tag(e,JKT,'Jakarta',clamp((u-0.3)/0.4),20,40,'#fff',30);
   const as=clamp((u-wt(sc,'absinkende'))/0.4); if(as>0){const q=P(e,JKT); ctx.save(); ctx.globalAlpha=as; ctx.fillStyle=ICE; for(let i=0;i<3;i++){const y=q[1]+30+((t*40+i*20)%60); ctx.beginPath(); ctx.moveTo(q[0]-60-i*4,y); ctx.lineTo(q[0]-48-i*4,y+14); ctx.lineTo(q[0]-36-i*4,y); ctx.closePath(); ctx.fill();} ctx.restore();}
   const ab=clamp((u-wt(sc,'Borneo'))/0.4); pulse(e,NUS,t,ab,GOLD,12); tag(e,NUS,'Nusantara',clamp((u-tn)/0.4),20,-36,GOLD,34);
   const k=clamp((u-tn)/1.2); if(k>0){const a=P(e,JKT), b=P(e,d3.geoInterpolate(JKT,NUS)(eout(k)*0.92)); ctx.save(); ctx.strokeStyle=GOLD; ctx.lineWidth=7; ctx.setLineDash([16,10]); ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke(); ctx.restore();}
   const al=clamp((u-tn)/0.4); if(al>0) label(ctx,'Nusantara · Ziel: 2028 einsatzbereit',L+10,1250,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:al,font:`800 34px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:vBor,fly:1.2},{at:1.4,view:vWorld,fly:4.5}],
  under:[e=>{hl(e,'IDN',ROSE,0.7);}],
  top:[e=>{const {ctx,u,sc}=e; const a=eout(clamp((u-0.2)/0.6)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.92)'; rr(ctx,L,560,780,470,32); ctx.fill();
   const q='Wusstest du das schon?'; const z=fit(ctx,q,800,76,52,700,FD); ctx.font=`800 ${z}px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(q,L+40,670);
   const rows=[['heart','Like da lassen','Like'],['bubble','Kommentar: Wusstest du es?','Kommentare'],['share','Teilen mit jemandem','schick']];
   rows.forEach(([ic,txt,f],i)=>{const ai=clamp((u-wt(sc,f)+0.2)/0.35); if(ai<=0) return; const y=790+i*105, x=L+70; ctx.save(); ctx.globalAlpha=a*ai; ctx.translate(x,y-14); const s=1+0.25*Math.max(0,1-(u-wt(sc,f))/0.4);
    ctx.scale(s,s); ctx.fillStyle=C.target; ctx.strokeStyle=C.target; ctx.lineWidth=5; ctx.lineJoin='round'; ctx.lineCap='round';
    if(ic==='heart'){ctx.beginPath(); ctx.moveTo(0,16); ctx.bezierCurveTo(-30,-4,-18,-28,0,-12); ctx.bezierCurveTo(18,-28,30,-4,0,16); ctx.fill();}
    if(ic==='bubble'){rr(ctx,-24,-20,48,34,10); ctx.fill(); ctx.beginPath(); ctx.moveTo(-10,12); ctx.lineTo(-16,26); ctx.lineTo(4,13); ctx.fill();}
    if(ic==='share'){ctx.beginPath(); ctx.moveTo(-20,18); ctx.quadraticCurveTo(-18,-8,14,-8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10,-22); ctx.lineTo(26,-8); ctx.lineTo(10,6); ctx.closePath(); ctx.fill();}
    ctx.restore(); ctx.save(); ctx.globalAlpha=a*ai; ctx.font=`800 42px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(txt,x+60,y,620); ctx.restore();});
   ctx.restore();}]}
];
return {tag:'KARTEN LÜGEN #4', scenes, wt};
}
