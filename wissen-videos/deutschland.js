// Story: Karten lügen #2 – So groß ist Deutschland wirklich
// DEU 357.588 km² · USA ×27,5 · RUS ×47,8 · Texas ×1,95 · Afrika ×85 · COD ×6,6 · JPN ×1,06 · Rang Fläche 63, Einwohner 19
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,mainPart,label,rr,fit,hl}=KV;
const BY=KV.byId(); const feats=[...BY.values()];
const AFR=feats.filter(f=>f.properties.cont==='Africa').map(f=>f.id);
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
function moved(geom,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:geom.type,coordinates:mp(geom.coordinates)}};}
function drawShape(e,g,col,a,{fillA=0.8,stroke='#fff',lw=2.5,dash=null}={}){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(g); if(fillA>0){ctx.globalAlpha=a*fillA; ctx.fillStyle=col; ctx.fill();} ctx.globalAlpha=a; if(dash) ctx.setLineDash(dash); ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
const group=(e,ids,col,a)=>ids.forEach(id=>hl(e,id,col,a,{outline:false}));
const mp=id=>mainPart(id).geometry, cen=id=>d3.geoCentroid(mainPart(id));
function counter(ctx,txt,x,y,a,col=C.ink,size=96){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=10; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,x,y); ctx.fillStyle=col; ctx.fillText(txt,x,y); ctx.restore();}

const DEU=mp('DEU'), dFrom=cen('DEU');
// grid of anchor points inside a country (or list of countries), ~n points, ordered west→east
function gridIn(ids,n){const fs=ids.map(id=>BY.get(id)); let lo=0.5, hi=20, best=[];
 for(let it=0;it<22;it++){const st=(lo+hi)/2, pts=[]; for(let la=-40;la<80;la+=st){const sl=st/Math.max(0.25,Math.cos(la*Math.PI/180)); for(let lo2=-180;lo2<180;lo2+=sl){const p=[lo2,la]; if(fs.some(f=>d3.geoContains(f,p))) pts.push(p);}}
  best=pts; if(pts.length>n) lo=st; else if(pts.length<n) hi=st; else break;}
 return best.slice(0,n).sort((a,b)=>a[0]-b[0]||b[1]-a[1]);}
const GUS=gridIn(['USA'],27), GRU=gridIn(['RUS'],48), GAF=gridIn(AFR,85);
function copies(e,pts,t0,dur,a=1,col=C.sand){const {u}=e; let shown=0; pts.forEach((p,i)=>{const k=clamp((u-t0-i/pts.length*dur)/0.25); if(k<=0) return; shown++;
  drawShape(e,moved(DEU,dFrom,p),col,a*k,{fillA:0.5,lw:1.5});}); return shown;}
const TEX=()=>window.SHAPE_TEX;

const vEur=viewBox([-8,40,28,58]), vEurW=viewBox([-25,30,45,65]), vAtl=viewBox([-62,-20,62,82]), vEurAfr=viewBox([-20,-12,42,60]);
const vTex=viewBox([-110,24,-90,38]), vUS=viewBox([-170,18,-62,72]), vRus=viewBox([25,38,179,80]);
const vAfr=viewBox([-22,-37,56,38]), vCod=viewBox([5,-16,40,10]), vJp=viewBox([118,24,160,48]), vEur2=viewBox([0,44,22,56]);

const scenes=[
 {head:'So groß ist Deutschland wirklich', headInstant:true, say:S_say[0], cams:[{at:0,view:vEur},{at:sc=>wt(sc,'Weltkarten')-0.3,view:vAtl,fly:1.8},{at:sc=>wt(sc,'täuschen')-0.3,view:vEurW,fly:1.4}],
  under:[e=>hl(e,'DEU',C.target,0.9)],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'täuschen'))/0.4); if(a>0) label(ctx,'Die Karte täuscht',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:a,font:`800 44px ${FD}`});}]},
 {head:'Der Mercator-Effekt', say:S_say[1], cams:[{at:0,view:vAtl,fly:1.4},{at:sc=>wt(sc,'Norden')-0.6,view:vEurW,fly:1.4},{at:sc=>wt(sc,'Schieben')-0.2,view:vEurAfr,fly:2.0}],
  under:[e=>{const {u,sc}=e; const ag=clamp((u-wt(sc,'Grönland'))/0.4)*(1-clamp((u-wt(sc,'Und Deutschland'))/0.6)); hl(e,'GRL',C.ok,0.8*ag); group(e,AFR,C.target,0.45*ag);}],
  over:[e=>{const {u,sc,ctx}=e; const tm=wt(sc,'Mercator-Karte'), am=clamp((u-tm)/0.4)*(1-clamp((u-wt(sc,'Schieben'))/0.5)); if(am>0) label(ctx,'je weiter vom Äquator, desto größer',L+10,1250,{alpha:am,font:`800 36px ${FD}`});
   const tn=wt(sc,'Norden'), an=clamp((u-tn+0.3)/0.5); if(an>0){const q=P(e,[-30,51]), q2=P(e,[60,51]); ctx.save(); ctx.globalAlpha=an; ctx.setLineDash([12,10]); ctx.strokeStyle=C.ice; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(q[0],q[1]); ctx.lineTo(q2[0],q2[1]); ctx.stroke(); ctx.restore(); tag(e,[-18,51],'51° Nord',an,0,-24,C.ice,28);
    const q0=P(e,[-30,0]), q3=P(e,[60,0]); ctx.save(); ctx.globalAlpha=an*0.8; ctx.strokeStyle=C.sand; ctx.lineWidth=3; ctx.setLineDash([12,10]); ctx.beginPath(); ctx.moveTo(q0[0],q0[1]); ctx.lineTo(q3[0],q3[1]); ctx.stroke(); ctx.restore(); tag(e,[-18,0],'Äquator',an,0,-24,C.sand,28);}
   const ts=wt(sc,'Schieben'), k=ease(clamp((u-ts+0.1)/2.2)); const to=d3.geoInterpolate(dFrom,[14,1])(k);
   const ag=clamp((u-wt(sc,'Und Deutschland'))/0.4); hl(e,'DEU',C.target,ag*(k>0?0.25:0.9),{outline:false}); if(k>0){drawShape(e,DEU,C.target,0.8,{fillA:0,dash:[8,8],lw:2}); drawShape(e,moved(DEU,dFrom,to),C.target,1);}
   const ah=clamp((u-wt(sc,'Hälfte'))/0.4); if(ah>0) label(ctx,'auf der Karte nur noch ≈ 40 %',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ah,font:`800 40px ${FD}`});}]},
 {head:'Deutschland vs. USA & Russland', say:S_say[2], cams:[{at:0,view:vTex,fly:1.6},{at:sc=>wt(sc,'gesamten USA')-0.4,view:vUS,fly:1.6},{at:sc=>wt(sc,'Russland')-0.6,view:vRus,fly:1.4}],
  under:[e=>{const {u,sc}=e; const ar=clamp((u-wt(sc,'Russland'))/0.4); hl(e,'USA',C.ok,0.35*(1-ar)); hl(e,'RUS',C.ice,0.35*ar);
   const tx=TEX(); const at=clamp((u-wt(sc,'Texas'))/0.4)*(1-clamp((u-wt(sc,'gesamten USA'))/0.5)); if(tx&&at>0) drawShape(e,tx,C.ok,at,{fillA:0.55});}],
  over:[e=>{const {u,sc,ctx}=e; const tt=wt(sc,'Texas'), kt=ease(clamp((u-tt-0.3)/1.2)), endT=1-clamp((u-wt(sc,'gesamten USA'))/0.5);
   if(kt>0&&endT>0){drawShape(e,moved(DEU,dFrom,d3.geoInterpolate([-90,45],[-93.5,31])(kt)),C.sand,endT); tag(e,[-100,31],'Texas',endT,-50,10,C.ok,32); if(kt>0.9) tag(e,[-93.5,31],'Deutschland',endT,-60,140,C.sand,30);}
   const tu=wt(sc,'gesamten USA'), ar=clamp((u-wt(sc,'Russland'))/0.4);
   const nu=copies(e,GUS,tu+0.2,2.6,1-ar); if(nu>0&&ar<1) counter(ctx,`${nu} ×`,540,1260,1-ar,C.sand,110);
   const nr=copies(e,GRU,wt(sc,'Russland')+0.1,1.5,ar); if(ar>0) counter(ctx,`${nr} ×`,540,1260,ar,C.sand,110);}]},
 {head:'Und Afrika?', say:S_say[3], cams:[{at:0,view:vAfr,fly:1.6},{at:sc=>wt(sc,'Demokratische')-0.4,view:vCod,fly:1.6}],
  under:[e=>{const {u,sc}=e; const ak=clamp((u-wt(sc,'Demokratische'))/0.4); group(e,AFR,C.target,0.35*(1-ak)); hl(e,'COD',C.ice,0.75*ak);}],
  over:[e=>{const {u,sc,ctx}=e; const ak=clamp((u-wt(sc,'Demokratische'))/0.4); const n=copies(e,GAF,wt(sc,'85-mal')-0.8,1.8,1-ak);
   if(n>0&&ak<1) counter(ctx,`${n} ×`,540,1260,1-ak,C.sand,110);
   const k=ease(clamp((u-wt(sc,'Demokratische')-0.2)/1.4)); if(k>0){drawShape(e,moved(DEU,dFrom,d3.geoInterpolate([40,8],[33,-11.5])(k)),C.sand,clamp(k*3)); if(k>0.9) tag(e,[33,-11.5],'Deutschland',1,-90,110,C.sand,30);}
   tag(e,[23,-3],'DR Kongo',ak,-70,0,C.ice,32); const as=clamp((u-wt(sc,'sechsmal'))/0.4); if(as>0) label(ctx,'DR Kongo = 6,6 × Deutschland',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:as,font:`800 40px ${FD}`});}]},
 {head:'Gleich groß: Japan', say:S_say[4], cams:[{at:0,view:viewBox([100,20,165,52]),fly:1.6},{at:sc=>wt(sc,'Japan')-0.2,view:vJp,fly:1.5},{at:sc=>wt(sc,'ein bisschen')-0.4,view:viewBox([125,26,160,46]),fly:1.6}],
  under:[e=>{const {u,sc}=e; hl(e,'JPN',C.ok,0.85*clamp((u-wt(sc,'Japan'))/0.4));}],
  over:[e=>{const {u,sc,ctx}=e; const ta=wt(sc,'Japan'), k=ease(clamp((u-ta-0.2)/1.5)); if(k>0){const to=d3.geoInterpolate([170,50],[149,37])(k); drawShape(e,moved(DEU,dFrom,to),C.sand,clamp(k*3));}
   tag(e,[138,36],'Japan',clamp((u-ta)/0.4),-160,-40,C.ok,32); if(k>0.9) tag(e,[149,37],'Deutschland',1,-80,120,C.sand,30);
   const ab=clamp((u-wt(sc,'ein bisschen'))/0.4); if(ab>0){ctx.save(); ctx.globalAlpha=ab; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,1130,780,190,26); ctx.fill(); ctx.font=`800 38px ${FD}`;
    ctx.fillStyle=C.ok; ctx.fillText('Japan',L+30,1200); ctx.fillStyle=C.sand; ctx.fillText('Deutschland',L+30,1280); ctx.fillStyle=C.ink; ctx.textAlign='right'; ctx.fillText('378.000 km²',L+750,1200); ctx.fillText('358.000 km²',L+750,1280); ctx.restore();}}]},
 {head:'Klein, aber voll', say:S_say[5], cams:[{at:0,view:vEurW,fly:1.6},{at:sc=>wt(sc,'Einwohnern')-0.4,view:vEur2,fly:2.2}],
  under:[e=>hl(e,'DEU',C.target,0.85)],
  over:[e=>{const {u,sc,ctx}=e; const rows=[['Fläche',63,'Fläche',C.sand,'nicht in den Top 60'],['Einwohner',19,'Einwohnern',C.ok,'Top 20']];
   const a0=clamp((u-0.2)/0.4); if(a0<=0) return; ctx.save(); ctx.globalAlpha=a0; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,1050,780,290,26); ctx.fill(); ctx.restore();
   rows.forEach(([n,rank,f,col,txt],i)=>{const t0=i===0?wt(sc,'Fläche'):wt(sc,'Einwohnern'), a=clamp((u-t0)/0.4); if(a<=0) return; const k=ease(clamp((u-t0)/1.2)), y=1120+i*125;
    ctx.save(); ctx.globalAlpha=a; ctx.font=`800 34px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(n,L+30,y); ctx.fillStyle=col; ctx.textAlign='right'; ctx.fillText(`Platz ${Math.round(lerp(1,rank,k))}`,L+750,y); ctx.textAlign='left';
    ctx.fillStyle='rgba(246,241,231,0.18)'; rr(ctx,L+30,y+20,720,22,11); ctx.fill(); const x=L+30+720*(rank/195)*k; ctx.beginPath(); ctx.arc(x,y+31,16,0,7); ctx.fillStyle=col; ctx.fill();
    ctx.font=`700 24px ${FB}`; ctx.fillStyle=C.mute; ctx.fillText(txt+' · von 195',L+30,y+75); ctx.restore();});}]},
 {say:S_say[6], cams:[{at:0,view:vEurW,fly:1.2},{at:1.4,view:vAtl,fly:4.5}],
  under:[e=>hl(e,'DEU',C.target,0.9)],
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
return {tag:'KARTEN LÜGEN #2', scenes, wt};
}
