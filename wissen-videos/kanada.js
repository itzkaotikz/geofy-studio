// Story: Karten lügen #3 – Kanada oder USA, wer ist größer?
// CAN 9.984.670 km² (Land 9.093.507, Wasser 8,9 %) · USA 9.525.067 km² (Land 9.147.593) · Mercator-Fläche CAN/USA ≈ 2,3 · 72 % der Kanadier < 150 km zur US-Grenze
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,mainPart,label,rr,fit,hl}=KV;
const BY=KV.byId();
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function moved(geom,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:geom.type,coordinates:mp(geom.coordinates)}};}
function drawShape(e,g,col,a,{fillA=0.75,stroke='#fff'}={}){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(g); ctx.globalAlpha=a*fillA; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle=stroke; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
const CA='#FF5A5F', US='#4F8DFF';
const CANg=BY.get('CAN').geometry, USAg=BY.get('USA').geometry; const cC=d3.geoCentroid(mainPart('CAN')), cU=d3.geoCentroid(mainPart('USA'));
function bars(ctx,a,rows,title,y0=1060){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,y0,780,280,24); ctx.fill(); ctx.font=`700 26px ${FB}`; ctx.fillStyle=C.mute; ctx.fillText(title,L+28,y0+42);
 const mx=Math.max(...rows.map(r=>r[1])); rows.forEach(([n,v,txt,col,k],i)=>{const y=y0+100+i*95; ctx.font=`800 34px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(n,L+28,y); ctx.textAlign='right'; ctx.fillStyle=col; ctx.fillText(txt,L+752,y); ctx.textAlign='left';
  ctx.fillStyle='rgba(246,241,231,0.15)'; rr(ctx,L+28,y+16,724,26,13); ctx.fill(); ctx.fillStyle=col; rr(ctx,L+28,y+16,Math.max(26,724*(v/mx)*k),26,13); ctx.fill();}); ctx.restore();}
function parallels(e,a){if(a<=0) return; const {ctx}=e; [30,40,50,60,70].forEach(la=>{const p1=P(e,[-170,la]), p2=P(e,[-40,la]); ctx.save(); ctx.globalAlpha=a*0.8; ctx.setLineDash([10,10]); ctx.strokeStyle=C.ice; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(-20,p1[1]); ctx.lineTo(1100,p2[1]); ctx.stroke(); ctx.restore(); label(ctx,`${la}° N`,60,p1[1]-6,{color:C.ice,alpha:a,font:`700 24px ${FB}`});});}
function lakes(e,a){if(a<=0) return; const {ctx,path}=e; const LK=window.LAKES; if(!LK) return; ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); LK.features.forEach(f=>path(f)); ctx.fillStyle='#7FD3FF'; ctx.shadowColor='#7FD3FF'; ctx.shadowBlur=14; ctx.fill(); ctx.restore();}
function band(e,a){if(a<=0) return; const {ctx,path,proj}=e; const km=150; const p0=proj([-100,49]), p1=proj([-100,49+km/111.2]); const px=Math.abs(p1[1]-p0[1]);
 ctx.save(); ctx.beginPath(); path(mainPart('CAN')); ctx.clip(); ctx.globalAlpha=a*0.75; ctx.strokeStyle='#FFE066'; ctx.lineJoin='round'; ctx.lineWidth=px*2; ctx.beginPath(); path(mainPart('USA')); ctx.stroke(); ctx.restore();}

const vNA=viewBox([-168,22,-50,78]), vNAz=viewBox([-140,24,-55,72]), vEq=viewBox([-75,-30,40,38]), vCanL=viewBox([-125,42,-62,70]), vBorder=viewBox([-128,38,-60,58]);

const scenes=[
 {head:'Kanada oder USA?', headInstant:true, say:S_say[0], cams:[{at:0,view:vNAz},{at:0.4,view:vNA,fly:3.0},{at:sc=>wt(sc,'stimmt')-0.3,view:vNAz,fly:2.0}],
  under:[e=>{const {u,sc}=e; hl(e,'CAN',CA,0.7*clamp((u-wt(sc,'Kanada'))/0.4)); hl(e,'USA',US,0.7*clamp((u-wt(sc,'USA'))/0.4));}],
  over:[e=>{const {u,sc,ctx}=e; tag(e,[-105,62],'Kanada',clamp((u-wt(sc,'Kanada'))/0.4),-80,0,CA,40); tag(e,[-100,39],'USA',clamp((u-wt(sc,'USA'))/0.4),-40,0,US,40);
   const a=clamp((u-wt(sc,'stimmt'))/0.4); if(a>0) label(ctx,'Wer ist wirklich größer?',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:a,font:`800 44px ${FD}`});}]},
 {head:'Der Mercator-Effekt', say:S_say[1], cams:[{at:0,view:vNAz,fly:1.0},{at:sc=>wt(sc,'Norden')-0.4,view:vNA,fly:2.0},{at:sc=>wt(sc,'doppelt')-0.5,view:vNAz,fly:2.2}],
  under:[e=>{const {u,sc}=e; const pul=0.6+0.25*Math.sin(u*4)*clamp((u-wt(sc,'aufgebläht'))/0.3); hl(e,'CAN',CA,pul); hl(e,'USA',US,0.6);}],
  over:[e=>{const {u,sc,ctx}=e; parallels(e,clamp((u-wt(sc,'Norden')+0.2)/0.5));
   const a=clamp((u-wt(sc,'doppelt'))/0.4); if(a>0) label(ctx,'auf der Karte: Kanada × 2,3',L+20,1250,{color:'#fff',bg:'rgba(255,90,95,0.95)',alpha:a,font:`800 42px ${FD}`});}]},
 {head:'In echter Größe', say:S_say[2], cams:[{at:0,view:vNA,fly:1.0},{at:0.4,view:vEq,fly:2.6}],
  under:[e=>{const {u}=e; const k=clamp((u-0.3)/0.5); hl(e,'CAN',CA,0.4*(1-k),{outline:false}); hl(e,'USA',US,0.4*(1-k),{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; const k=ease(clamp((u-0.3)/2.6)); const toC=d3.geoInterpolate(cC,[-40,6])(k), toU=d3.geoInterpolate(cU,[8,6])(k);
   drawShape(e,moved(CANg,cC,toC),CA,1); drawShape(e,moved(USAg,cU,toU),US,1);
   if(k>0.95){tag(e,[-40,6],'Kanada',1,-70,0,'#fff',34); tag(e,[8,6],'USA',1,-30,0,'#fff',34);}
   const tb=wt(sc,'zehn Millionen'), ab=clamp((u-tb+0.2)/0.4), kb=ease(clamp((u-tb)/1.4));
   bars(ctx,ab,[['Kanada',9.98,'9,98 Mio km²',CA,kb],['USA',9.53,'9,53 Mio km²',US,clamp((u-wt(sc,'neuneinhalb'))/1.2)]],'Gesamtfläche');
   const ap=clamp((u-wt(sc,'ein paar Prozent'))/0.4); if(ap>0) label(ctx,'nur ein paar Prozent Unterschied',L+20,990,{alpha:ap,font:`800 34px ${FD}`});}]},
 {head:'Der Twist: Wasser', say:S_say[3], cams:[{at:0,view:vEq,fly:1.0},{at:0.4,view:vCanL,fly:2.6},{at:sc=>wt(sc,'Landfläche')-0.4,view:vNAz,fly:2.4}],
  under:[e=>{const {u,sc}=e; hl(e,'CAN',CA,0.35); hl(e,'USA',US,0.35*clamp((u-wt(sc,'Landfläche'))/0.4));}],
  over:[e=>{const {u,sc,ctx}=e; lakes(e,clamp((u-wt(sc,'Wasser')+0.3)/0.6));
   const aw=clamp((u-wt(sc,'neun Prozent'))/0.4)*(1-clamp((u-wt(sc,'Landfläche')+0.2)/0.4)); if(aw>0) label(ctx,'8,9 % von Kanada = Wasser',L+20,1180,{color:'#0B1C2A',bg:'rgba(127,211,255,0.95)',alpha:aw,font:`800 40px ${FD}`});
   const as=clamp((u-wt(sc,'Seen'))/0.4)*(1-clamp((u-wt(sc,'Landfläche')+0.2)/0.4)); if(as>0) label(ctx,'über 2 Millionen Seen',L+20,1255,{alpha:as,font:`800 38px ${FD}`});
   const tl=wt(sc,'Landfläche'), al=clamp((u-tl)/0.4); bars(ctx,al,[['USA',9.15,'9,15 Mio km²',US,ease(clamp((u-tl)/1.2))],['Kanada',9.09,'9,09 Mio km²',CA,ease(clamp((u-tl-0.3)/1.2))]],'Nur Landfläche');}]},
 {head:'Und die Menschen?', say:S_say[4], cams:[{at:0,view:vNAz,fly:1.2},{at:sc=>wt(sc,'sieben von zehn')-0.5,view:vBorder,fly:2.4}],
  under:[e=>{const {u,sc}=e; hl(e,'CAN',CA,0.3); hl(e,'USA',US,0.3);}],
  over:[e=>{const {u,sc,ctx}=e; const tp=wt(sc,'340'), ap=clamp((u-tp+0.3)/0.4)*(1-clamp((u-wt(sc,'sieben von zehn')+0.2)/0.4));
   bars(ctx,ap,[['USA',340,'> 340 Mio',US,ease(clamp((u-tp)/1.2))],['Kanada',41,'≈ 41 Mio',CA,ease(clamp((u-wt(sc,'41'))/1.0))]],'Einwohner');
   const ts=wt(sc,'sieben von zehn'); band(e,clamp((u-ts)/0.6)); const a7=clamp((u-ts)/0.4); if(a7>0) label(ctx,'72 % der Kanadier',L+20,1180,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:a7,font:`800 44px ${FD}`});
   const a15=clamp((u-wt(sc,'150'))/0.4); if(a15>0) label(ctx,'< 150 km von der US-Grenze',L+20,1255,{alpha:a15,font:`800 38px ${FD}`});}]},
 {say:S_say[5], cams:[{at:0,view:vBorder,fly:1.2},{at:1.4,view:vNA,fly:4.5}],
  under:[e=>{hl(e,'CAN',CA,0.5); hl(e,'USA',US,0.5);}],
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
return {tag:'KARTEN LÜGEN #3', scenes, wt};
}
