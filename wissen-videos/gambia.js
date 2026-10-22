// Story: Warum ist …? #3 – Warum ist Gambia nur ein Fluss?
// < 50 km breit, ≈ 325 km lang (eigene Messung) · kleinstes Land auf dem afrikanischen Festland · Vertrag GB–FR 10.08.1889 · Senegambia 1982–1989 · Brücke Jan. 2019
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,mainPart,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*55,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=680){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 140px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle='#fff'; ctx.fillText(txt,540,y); ctx.restore();}
function river(e,k,a=1){if(k<=0||a<=0) return; const R=window.RIVER; if(!R) return; const {ctx,path}=e; ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle='#7FD3FF'; ctx.shadowColor='#7FD3FF'; ctx.shadowBlur=12; ctx.lineWidth=6; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath(); path(R); ctx.stroke(); ctx.restore();}
// outline drawn progressively (screen space)
function outline(e,id,k,col='#fff',w=6){if(k<=0) return; const {ctx,proj}=e; const g=mainPart(id).geometry; const ring=(g.type==='Polygon'?g.coordinates:g.coordinates[0])[0]; const pts=ring.map(c=>proj(c));
 let tot=0; const seg=[]; for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]); seg.push(d); tot+=d;} let rem=tot*clamp(k);
 ctx.save(); ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineJoin='round'; ctx.lineCap='round'; ctx.shadowColor=col; ctx.shadowBlur=10; ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]);
 for(let i=1;i<pts.length&&rem>0;i++){const f=Math.min(1,rem/seg[i-1]); ctx.lineTo(lerp(pts[i-1][0],pts[i][0],f),lerp(pts[i-1][1],pts[i][1],f)); rem-=seg[i-1];} ctx.stroke(); ctx.restore();}
function route(e,pts,k,col,w=7){if(k<=0) return; const {ctx,t}=e; const Q=[]; for(let i=1;i<pts.length;i++){const f=d3.geoInterpolate(pts[i-1],pts[i]); for(let s=0;s<20;s++) Q.push(P(e,f(s/20)));} Q.push(P(e,pts[pts.length-1]));
 let tot=0; const seg=[]; for(let i=1;i<Q.length;i++){const d=Math.hypot(Q[i][0]-Q[i-1][0],Q[i][1]-Q[i-1][1]); seg.push(d); tot+=d;} let rem=tot*clamp(k); let end=Q[0];
 ctx.save(); ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.setLineDash([18,12]); ctx.lineDashOffset=-t*50; ctx.beginPath(); ctx.moveTo(Q[0][0],Q[0][1]);
 for(let i=1;i<Q.length&&rem>0;i++){const f=Math.min(1,rem/seg[i-1]); end=[lerp(Q[i-1][0],Q[i][0],f),lerp(Q[i-1][1],Q[i][1],f)]; ctx.lineTo(end[0],end[1]); rem-=seg[i-1];} ctx.stroke(); ctx.setLineDash([]);
 ctx.beginPath(); ctx.arc(end[0],end[1],12,0,7); ctx.fillStyle=col; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function ferry(ctx,x,y,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.beginPath(); ctx.arc(0,0,34,0,7); ctx.fillStyle='rgba(11,28,42,0.92)'; ctx.fill(); ctx.strokeStyle='#FFE066'; ctx.lineWidth=4; ctx.stroke();
 ctx.fillStyle='#FFE066'; ctx.beginPath(); ctx.moveTo(-20,2); ctx.lineTo(20,2); ctx.lineTo(14,14); ctx.lineTo(-14,14); ctx.closePath(); ctx.fill(); ctx.fillRect(-8,-12,16,12); ctx.restore();}
const FR='#9FD8F5', GB=C.target;
const FRENCH=['SEN','MLI','GIN','CIV','MRT','BFA','NER','BEN'], BRIT=['GMB','SLE','GHA','NGA'];
const BAN=[-16.58,13.45], FAR=[-15.6,13.57], DAK=[-17.45,14.69], ZIG=[-16.27,12.58], EAST=[-13.8,13.6], WEST=[-16.8,13.45];
const vAfr=viewBox([-20,-36,54,38]), vWA=viewBox([-19,4,4,20]), vSen=viewBox([-18.2,11.2,-11.2,17.2]), vGmb=viewBox([-17.6,12.0,-12.9,15.0]), vGmbW=viewBox([-17.2,12.6,-14.2,14.4]);

const scenes=[
 {head:'Warum ist Gambia nur ein Fluss?', headInstant:true, say:S_say[0], cams:[{at:0,view:vWA},{at:0.3,view:vSen,fly:2.4},{at:sc=>wt(sc,'breitesten')-0.4,view:vGmbW,fly:2.0},{at:sc=>wt(sc,'reicht')-0.3,view:vGmb,fly:1.8}],
  under:[e=>{const {u}=e; hl(e,'GMB',GB,0.9*clamp((u-0.5)/0.5));}],
  over:[e=>{const {u,sc,ctx}=e; river(e,1,clamp((u-0.8)/0.6)*0.8);
   const ab=clamp((u-wt(sc,'breit'))/0.4); if(ab>0){const p1=P(e,[-15.35,13.83]), p2=P(e,[-15.35,13.36]); ctx.save(); ctx.globalAlpha=ab; ctx.strokeStyle='#fff'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(p1[0],p1[1]); ctx.lineTo(p2[0],p2[1]); ctx.moveTo(p1[0]-14,p1[1]); ctx.lineTo(p1[0]+14,p1[1]); ctx.moveTo(p2[0]-14,p2[1]); ctx.lineTo(p2[0]+14,p2[1]); ctx.stroke(); ctx.restore(); label(ctx,'< 50 km',p1[0]+20,p1[1]-30,{alpha:ab,font:`800 32px ${FD}`});}
   const al=clamp((u-wt(sc,'300'))/0.4); if(al>0){route(e,[WEST,EAST],(u-wt(sc,'300'))/1.2,'#FFE066',5); label(ctx,'≈ 320 km ins Landesinnere',L+20,1250,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:al,font:`800 40px ${FD}`});}}]},
 {head:'Mitten im Senegal', say:S_say[1], cams:[{at:0,view:vGmb,fly:1.0},{at:0.3,view:vAfr,fly:2.2},{at:sc=>wt(sc,'Bis auf')-0.4,view:vSen,fly:2.4}],
  under:[e=>{const {u,sc}=e; hl(e,'GMB',GB,0.9); hl(e,'SEN',C.ok,0.55*clamp((u-wt(sc,'Senegal'))/0.4));}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,[-15.3,13.45],t,clamp((u-0.4)/0.4)*(1-clamp((u-wt(sc,'Bis auf'))/0.5)),GB,10);
   const ak=clamp((u-wt(sc,'kleinste'))/0.4); if(ak>0) label(ctx,'kleinstes Land auf dem afrikanischen Festland',L+10,1180,{alpha:ak,font:`800 32px ${FD}`});
   tag(e,[-14.6,15.2],'Senegal',clamp((u-wt(sc,'Senegal'))/0.4),-40,0,C.ok,36); tag(e,[-17.6,13.4],'Atlantik',clamp((u-wt(sc,'Atlantikküste'))/0.4),-60,0,FR,30);
   const ac=clamp((u-wt(sc,'Atlantikküste'))/0.4); if(ac>0){const a=P(e,[-16.8,13.82]), b=P(e,[-16.75,13.06]); ctx.save(); ctx.globalAlpha=ac; ctx.strokeStyle='#FFE066'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.shadowColor='#FFE066'; ctx.shadowBlur=12; ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke(); ctx.restore();}}]},
 {head:'Westafrika im 19. Jahrhundert', say:S_say[2], cams:[{at:0,view:vSen,fly:1.0},{at:0.3,view:vWA,fly:2.4},{at:sc=>wt(sc,'Fluss Gambia')-0.4,view:vGmb,fly:2.2}],
  under:[e=>{const {u,sc}=e; const k=clamp((u-wt(sc,'Großbritannien'))/0.6), f=clamp((u-wt(sc,'Frankreich'))/0.6), fade=1-clamp((u-wt(sc,'Fluss Gambia'))/0.8)*0.6;
   BRIT.forEach(id=>hl(e,id,GB,0.75*k*fade,{outline:false})); FRENCH.forEach(id=>hl(e,id,FR,0.6*f*fade,{outline:false}));}],
  over:[e=>{const {u,sc,ctx,t}=e; const k=clamp((u-wt(sc,'Großbritannien'))/0.4), f=clamp((u-wt(sc,'Frankreich'))/0.4), fade=1-clamp((u-wt(sc,'Fluss Gambia'))/0.6);
   if(k>0||f>0){ctx.save(); ctx.globalAlpha=Math.max(k,f)*fade; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,1110,780,150,22); ctx.fill(); ctx.font=`700 24px ${FB}`; ctx.fillStyle=C.mute; ctx.fillText('Westafrika um 1890 (vereinfacht)',L+26,1146);
    ctx.globalAlpha=k*fade; ctx.fillStyle=GB; rr(ctx,L+26,1170,26,22,6); ctx.fill(); ctx.font=`800 30px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText('Großbritannien',L+64,1190);
    ctx.globalAlpha=f*fade; ctx.fillStyle=FR; rr(ctx,L+380,1170,26,22,6); ctx.fill(); ctx.fillStyle=C.ink; ctx.fillText('Frankreich',L+418,1190); ctx.restore();}
   const ar=clamp((u-wt(sc,'Fluss Gambia')+0.2)/0.6); river(e,1,ar); tag(e,[-15.0,13.62],'Fluss Gambia',ar,-90,-40,'#7FD3FF',32);
   if(ar>0){const pts=window.RIVER.geometries[0].coordinates; const line=pts.reduce((a,b)=>b.length>a.length?b:a,pts[0]); for(let i=0;i<4;i++){const f=((t*0.05)+i/4)%1; const q=P(e,line[Math.floor(f*(line.length-1))]); if(!q) continue; ctx.save(); ctx.globalAlpha=ar; ctx.fillStyle='#fff'; ctx.beginPath(); ctx.ellipse(q[0],q[1],12,6,0,0,7); ctx.fill(); ctx.restore();}}
   const ah=clamp((u-wt(sc,'Handelsroute'))/0.4); if(ah>0) label(ctx,'Handelsroute ins Landesinnere',L+20,1250,{color:'#0B1C2A',bg:'rgba(127,211,255,0.95)',alpha:ah,font:`800 38px ${FD}`});}]},
 {head:'Der Vertrag von 1889', say:S_say[3], cams:[{at:0,view:vGmb,fly:1.0},{at:sc=>wt(sc,'schmalen')-0.4,view:vGmbW,fly:2.0},{at:sc=>wt(sc,'Alles drumherum')-0.3,view:vSen,fly:2.2}],
  under:[e=>{const {u,sc}=e; hl(e,'SEN',FR,0.6*clamp((u-wt(sc,'Alles drumherum'))/0.6)); hl(e,'GMB',GB,0.85*clamp((u-wt(sc,'Großbritannien'))/0.5));}],
  over:[e=>{const {u,sc,ctx}=e; big(ctx,'1889',clamp((u-0.1)/0.4)*(1-clamp((u-wt(sc,'Großbritannien'))/0.5)));
   river(e,1,0.9); outline(e,'GMB',(u-wt(sc,'schmalen')+0.2)/2.4,'#fff',5);
   const ag=clamp((u-wt(sc,'Großbritannien'))/0.4)*(1-clamp((u-wt(sc,'Alles drumherum'))/0.4)); if(ag>0) label(ctx,'Großbritannien: Fluss + schmaler Streifen',L+10,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ag,font:`800 34px ${FD}`});
   const af=clamp((u-wt(sc,'Alles drumherum'))/0.4); if(af>0) label(ctx,'Frankreich → heute Senegal',L+20,1250,{color:'#0B1C2A',bg:'rgba(159,216,245,0.95)',alpha:af,font:`800 38px ${FD}`});}]},
 {head:'Ein Land, das Senegal teilt', say:S_say[4], cams:[{at:0,view:vSen,fly:1.0},{at:sc=>wt(sc,'Lastwagen')-0.4,view:viewBox([-17.8,12.0,-12.6,15.2]),fly:2.0},{at:sc=>wt(sc,'2019')-0.4,view:vGmbW,fly:2.0}],
  under:[e=>{const {u,sc}=e; hl(e,'GMB',GB,0.8); hl(e,'SEN',C.ok,0.45*clamp((u-wt(sc,'teilt'))/0.4));}],
  over:[e=>{const {u,sc,ctx,t}=e; river(e,1,0.9); const at=clamp((u-wt(sc,'teilt'))/0.4);
   tag(e,[-15.0,14.9],'Nord-Senegal',at,-80,0,C.ok,32); tag(e,[-14.6,12.55],'Süd-Senegal',at,-40,30,C.ok,30);
   const tl=wt(sc,'Lastwagen'); pulse(e,DAK,t,clamp((u-tl)/0.4),'#fff',9); pulse(e,ZIG,t,clamp((u-tl)/0.4),'#fff',9); tag(e,DAK,'Dakar',clamp((u-tl)/0.4),20,-30,'#fff',28); tag(e,ZIG,'Ziguinchor',clamp((u-tl)/0.4),-170,40,'#fff',28);
   const af=clamp((u-wt(sc,'Fähre'))/0.4); const fq=P(e,FAR); ferry(ctx,fq[0],fq[1]-60,af*(1-clamp((u-wt(sc,'2019'))/0.4)));
   route(e,[DAK,[-15.0,14.4],[-13.4,13.9],[-13.6,12.7],[-15.5,12.6],ZIG],(u-wt(sc,'Umweg'))/2.0,'#FFE066',6);
   const ab=clamp((u-wt(sc,'2019'))/0.4); if(ab>0){pulse(e,FAR,t,ab,'#FFE066',12); tag(e,FAR,'Senegambia-Brücke',ab,24,-40,'#FFE066',30); label(ctx,'Brücke erst seit 2019',L+20,1250,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:ab,font:`800 40px ${FD}`});}}]},
 {head:'Senegambia', say:S_say[5], cams:[{at:0,view:vGmbW,fly:1.0},{at:0.3,view:vSen,fly:2.6},{at:sc=>wt(sc,'sieben')-0.4,view:viewBox([-18.4,11.0,-11.0,17.4]),fly:2.0}],
  under:[e=>{const {u,sc}=e; const k=clamp((u-wt(sc,'1982'))/0.5), sp=clamp((u-wt(sc,'sieben'))/0.6); hl(e,'GMB',GB,0.85*(1-k*0.3)+0.25*sp); hl(e,'SEN',C.ok,0.45+0.0*k); }],
  over:[e=>{const {u,sc,ctx}=e; const k=clamp((u-wt(sc,'1982'))/0.5), sp=clamp((u-wt(sc,'sieben'))/0.6);
   if(k>0){ctx.save(); ctx.globalAlpha=k*(1-sp); ctx.strokeStyle='#FFE066'; ctx.lineWidth=7; ctx.shadowColor='#FFE066'; ctx.shadowBlur=16; ctx.lineJoin='round'; ctx.beginPath(); e.path({type:'FeatureCollection',features:[mainPart('SEN'),mainPart('GMB')].map(f=>({type:'Feature',geometry:f.geometry}))}); ctx.stroke(); ctx.restore();}
   big(ctx,'1982',clamp((u-wt(sc,'1982'))/0.4)*(1-clamp((u-wt(sc,'Staatenbund'))/0.5)));
   const as=clamp((u-wt(sc,'Senegambia'))/0.4); if(as>0) label(ctx,'Senegambia · 1982–1989',L+20,1180,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:as,font:`800 40px ${FD}`});
   if(sp>0) label(ctx,'nur 7 Jahre',L+20,1255,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:sp,font:`800 40px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:vSen,fly:1.2},{at:1.4,view:vWA,fly:4.5}],
  under:[e=>{hl(e,'GMB',GB,0.8);}],
  over:[e=>{river(e,1,0.9);}],
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
return {tag:'WARUM IST …? #3', scenes, wt};
}
