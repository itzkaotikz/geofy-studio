// Story: Warum ist Chile so lang?  (facts: Wikipedia "Geography of Chile", "Litoral Department", Boundary Treaty 1881)
function makeChile(){
const {C,FD,FB,FM,L,KB,clamp,ease,eout,lerp,viewBox,viewObj,mainPart,label,icon,rr,fit,wrapLines}=KV;
const chl=KV.byId().get('CHL'), chMain=mainPart('CHL'), ring=chMain.geometry.coordinates[0];
// east/west edge of mainland Chile at a given latitude
function edge(lat,side){let best=null; for(let i=0;i<ring.length-1;i++){const [x1,y1]=ring[i],[x2,y2]=ring[i+1]; if((y1-lat)*(y2-lat)>0||y1===y2) continue; const x=x1+(lat-y1)/(y2-y1)*(x2-x1); if(best===null||(side==='e'?x>best:x<best)) best=x;} return best;}
const lats=[]; for(let la=-18;la>=-52;la-=1.25) lats.push(la);
const east=lats.map(la=>[edge(la,'e'),la]).filter(p=>p[0]!==null), west=lats.map(la=>[edge(la,'w'),la]).filter(p=>p[0]!==null);
const LEFTBOX=[100,470,400,830];
const vSA=viewBox([-90,-56,-34,8]), vEU=viewBox([-12,27,42,72]), vCL=viewObj(chMain,LEFTBOX,0.03), vPl=viewBox([-104,-50,-56,-16]), vNo=viewBox([-77,-26,-61,-14.5]), vWorld=viewBox([-175,-58,180,78],KB,0.0);
let Ssc=null; const wt=(sc,frag)=>{const i=sc.say.indexOf(frag); return 0.25+(i<0?0:i)/sc.say.length*sc.speak;};
const fillCountry=(env,id,col,a)=>{if(a<=0) return; const {ctx,path}=env; ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); path(KV.byId().get(id)); ctx.fillStyle=col; ctx.fill(); ctx.restore();};
const P=(env,ll)=>env.proj(ll);

const scenes=[
 {head:'Warum ist Chile so lang?', headInstant:true, view:vSA, min:7,
  say:'Chile ist 4.270 Kilometer lang, aber im Schnitt nur 177 Kilometer breit. Warum sieht ein Land so aus?',
  under:[e=>fillCountry(e,'CHL',C.target,0.95)],
  over:[e=>{const {ctx,u,sc}=e; const top=P(e,[-69.5,-17.5]), bot=P(e,[-69.5,-55.9]); const x=Math.max(top[0],bot[0])+150, k=eout(clamp((u-0.4)/1.6));
   const y1=top[1], y2=lerp(top[1],bot[1],k); ctx.strokeStyle=C.ink; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(x-16,y1); ctx.lineTo(x+16,y1); ctx.moveTo(x,y1); ctx.lineTo(x,y2); if(k>0.98){ctx.moveTo(x-16,y2); ctx.lineTo(x+16,y2);} ctx.stroke();
   const km=Math.round(4270*k).toLocaleString('de-DE'); label(ctx,`${km} km`,x+28,(y1+y2)/2,{font:`800 44px ${FD}`});
   const a=clamp((u-wt(sc,'aber'))/0.4); if(a>0){const m=P(e,[-71,-30]); label(ctx,'Ø 177 km breit',m[0]+40,m[1]+170,{color:C.target,font:`800 36px ${FD}`,alpha:a});}}]},
 {head:'Chile auf Europa gelegt', view:vEU, min:6,
  say:'Zum Vergleich: Legt man Chile auf Europa, reicht es von Nordnorwegen bis nach Nordafrika.',
  over:[e=>{const {ctx,path,u,sc}=e; const c=d3.geoCentroid(chMain), k=ease(clamp((u-0.9)/2.2)); const to=d3.geoInterpolate([15,14],[15,53])(k);
   const r1=d3.geoRotation([-c[0],-c[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp);
   const g={type:'Feature',geometry:{type:'Polygon',coordinates:mp(ring===null?[]:chMain.geometry.coordinates)}};
   ctx.beginPath(); path(g); ctx.fillStyle='rgba(255,59,127,0.88)'; ctx.fill(); ctx.strokeStyle=C.bg; ctx.lineWidth=3; ctx.stroke();
   const b=d3.geoBounds(g); const pt=P(e,[b[1][0],b[1][1]]), pb=P(e,[b[0][0],b[0][1]]);
   const a1=clamp((u-wt(sc,'Nordnorwegen'))/0.4), a2=clamp((u-wt(sc,'Nordafrika'))/0.4);
   if(k>0.95){label(ctx,'Nordnorwegen',pt[0]+30,pt[1]+20,{alpha:a1}); label(ctx,'Nordafrika',pb[0]+40,pb[1]-10,{alpha:a2});}}]},
 {head:'Grund 1: die Anden', view:vCL, min:9,
  say:'Grund Nummer eins sind die Anden. Im Osten liegt eine Mauer aus Bergen, viele Gipfel sind über 6.000 Meter hoch. Im Westen liegt der Pazifik. Dazwischen bleibt nur ein schmaler Streifen Land.',
  under:[e=>fillCountry(e,'CHL',C.target,0.55)],
  over:[e=>{const {ctx,u,sc}=e; const t0=wt(sc,'Im Osten'); east.filter((_,i)=>i%2===0).forEach((p,i)=>{const a=clamp((u-t0-i*0.1)/0.3); const q=P(e,[p[0]-0.3,p[1]]); icon(ctx,'mountain',q[0],q[1],0.85+0.25*eout(a),a);});
   const ap=clamp((u-wt(sc,'Im Westen'))/0.4); const pq=P(e,[-79,-33]); label(ctx,'Pazifik',pq[0],pq[1],{color:C.ice,alpha:ap});
   // cross-section panel
   const pa=clamp((u-wt(sc,'Dazwischen'))/0.5); if(pa<=0) return; const X=470,Y=560,Wd=410,Hd=430; ctx.save(); ctx.globalAlpha=pa; ctx.translate((1-eout(pa))*40,0);
   ctx.fillStyle='rgba(11,28,42,0.93)'; rr(ctx,X,Y,Wd,Hd,24); ctx.fill(); ctx.font=`700 24px ${FM}`; ctx.fillStyle=C.mute; ctx.fillText('QUERSCHNITT WEST → OST',X+24,Y+44);
   const base=Y+300, prof=[[0,40],[45,40],[80,105],[112,30],[135,0],[170,-12],[210,-50],[245,-140],[272,-190],[298,-150],[322,-175],[345,-100],[375,-35],[410,-25]];
   const rev=clamp((u-wt(sc,'Dazwischen')-0.2)/1.4);
   ctx.save(); ctx.beginPath(); ctx.rect(X,Y,Wd*rev,Hd); ctx.clip();
   ctx.fillStyle='rgba(159,216,245,0.35)'; ctx.fillRect(X,base,135,Hd-(base-Y)-20);
   ctx.beginPath(); ctx.moveTo(X,base+40); prof.forEach(([x,y])=>ctx.lineTo(X+x,base+y)); ctx.lineTo(X+Wd,Y+Hd-20); ctx.lineTo(X,Y+Hd-20); ctx.closePath(); ctx.fillStyle=C.land; ctx.fill();
   ctx.beginPath(); ctx.moveTo(X+137,base-6); ctx.lineTo(X+298,base-6); ctx.strokeStyle=C.target; ctx.lineWidth=7; ctx.stroke();
   ctx.restore();
   ctx.font=`700 28px ${FB}`; ctx.fillStyle=C.ice; ctx.fillText('Pazifik',X+20,base-18); ctx.fillStyle=C.target; ctx.font=`800 30px ${FD}`; ctx.fillText('Chile ≈ 177 km',X+150,base+50);
   ctx.fillStyle=C.ink; ctx.font=`700 28px ${FB}`; ctx.fillText('Anden bis 6.893 m',X+150,Y+92); ctx.restore();}]},
 {head:'Platten unter Druck', view:vPl, min:9,
  say:'Die Anden entstehen, weil sich die Nazca-Platte jedes Jahr um mehrere Zentimeter unter Südamerika schiebt. Deshalb bebt in Chile so oft die Erde, 1960 sogar mit Stärke 9,5, das stärkste je gemessene Beben.',
  under:[e=>fillCountry(e,'CHL',C.target,0.55)],
  over:[e=>{const {ctx,u,sc,path}=e; const t1=wt(sc,'Nazca'); const k=clamp((u-0.6)/1.2);
   const tr={type:'LineString',coordinates:west.filter(p=>p[1]>-47).map(p=>[p[0]-1.3,p[1]])}; ctx.save(); ctx.setLineDash([14,12]); ctx.beginPath(); path(tr); ctx.strokeStyle=`rgba(159,216,245,${0.9*k})`; ctx.lineWidth=5; ctx.stroke(); ctx.restore();
   [-24,-33,-42].forEach((la,i)=>{const a=clamp((u-t1-i*0.25)/0.5); if(a<=0) return; const s=P(e,[-97,la]), d=P(e,[lerp(-97,-78.5,eout(a)),la]);
    ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle=C.ok; ctx.fillStyle=C.ok; ctx.lineWidth=14; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(s[0],s[1]); ctx.lineTo(d[0]-18,d[1]); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(d[0]+14,d[1]); ctx.lineTo(d[0]-24,d[1]-24); ctx.lineTo(d[0]-24,d[1]+24); ctx.closePath(); ctx.fill(); ctx.restore();});
   const ln=P(e,[-99,-28.6]); label(ctx,'Nazca-Platte',ln[0],ln[1],{color:C.ok,alpha:clamp((u-t1)/0.5)});
   const ls=P(e,[-66,-21]); label(ctx,'Südamerikanische Platte',ls[0],ls[1],{alpha:clamp((u-wt(sc,'Südamerika'))/0.5),font:`700 26px ${FB}`});
   const tq=wt(sc,'1960'), qa=clamp((u-tq+0.6)/0.4); if(qa>0){const q=P(e,[-73.2,-39.8]); for(let r=0;r<3;r++){const ph=((u-tq+0.6)*0.9+r/3)%1; ctx.beginPath(); ctx.arc(q[0],q[1],20+ph*110,0,Math.PI*2); ctx.strokeStyle=`rgba(255,59,127,${(1-ph)*qa})`; ctx.lineWidth=6; ctx.stroke();}
    ctx.beginPath(); ctx.arc(q[0],q[1],12,0,Math.PI*2); ctx.fillStyle=C.target; ctx.fill(); label(ctx,'1960 · Stärke 9,5',q[0]+60,q[1]+8,{color:C.target,font:`800 34px ${FD}`,alpha:clamp((u-tq)/0.4)});}}]},
 {head:'Grund 2: Geschichte', min:12,
  say:'Grund Nummer zwei ist Geschichte. 1881 legten Chile und Argentinien fest: Die Grenze verläuft über die höchsten Gipfel der Anden. Und im Salpeterkrieg eroberte Chile den Norden. Peru verlor Tarapacá, Bolivien seinen Zugang zum Meer.',
  cams:[{at:0,view:vCL},{at:sc=>wt(sc,'Und im')+0.2,view:vNo,fly:1.4}],
  under:[e=>fillCountry(e,'CHL',C.target,0.4)],
  over:[e=>{const {ctx,u,sc,path}=e; const t1=wt(sc,'1881'), tw=wt(sc,'Und im');
   if(u<tw+0.8){const a=1-clamp((u-tw)/0.6); const k=clamp((u-t1)/2.2); const pts=east.slice(0,Math.max(2,Math.round(east.length*k)));
    ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); path({type:'LineString',coordinates:pts}); ctx.strokeStyle=C.ok; ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke(); ctx.restore();
    const m=P(e,[-66,-32]); label(ctx,'1881: Grenze',m[0]+10,m[1]-40,{color:C.ok,alpha:a*clamp((u-t1)/0.4),font:`800 32px ${FD}`}); label(ctx,'über die höchsten Gipfel',m[0]+10,m[1]+16,{alpha:a*clamp((u-t1-0.3)/0.4),font:`700 26px ${FB}`});}
   const tp=wt(sc,'Peru'), tb=wt(sc,'Bolivien'); const bands=[[-21.43,-18.35,C.sand,tp,'Peru: Tarapacá'],[-24,-21.43,C.ok,tb,'Bolivien: Küste']];
   bands.forEach(([s,n,col,tt,txt])=>{const a=clamp((u-tt+0.3)/0.5); if(a<=0) return; ctx.save(); ctx.beginPath(); path(chl); ctx.clip(); const y1=P(e,[-70,n])[1], y2=P(e,[-70,s])[1]; ctx.globalAlpha=0.95*a; ctx.fillStyle=col; ctx.fillRect(0,y1,1080,y2-y1); ctx.restore();
    const q=P(e,[-67.5,(s+n)/2]); label(ctx,txt,q[0]+20,q[1]+8,{color:col,alpha:a,font:`800 30px ${FD}`});});
   if(u>tb){fillCountry(e,'BOL','rgba(51,209,176,0.25)',clamp((u-tb)/0.5));}}],
  top:[]},
 {head:'Fast alle Klimazonen', view:vCL, min:11,
  say:'Das Ergebnis: Chile hat fast alle Klimazonen. Im Norden die Atacama, eine der trockensten Wüsten der Welt. In der Mitte mildes Klima rund um Santiago. Und im Süden Gletscher und Fjorde, fast bis zur Antarktis.',
  under:[e=>{const {ctx,u,sc,path}=e; const zones=[[-17.4,-27,C.sand,'Im Norden'],[-27,-38,C.green,'In der Mitte'],[-38,-56,C.ice,'Und im Süden']];
   zones.forEach(([n,s,col,frag])=>{const a=clamp((u-wt(sc,frag)+0.2)/0.5); ctx.save(); ctx.beginPath(); path(chl); ctx.clip(); const y1=e.proj([-70,n])[1], y2=e.proj([-70,s])[1]; ctx.globalAlpha=0.35+0.6*a; ctx.fillStyle=a>0?col:C.target; ctx.fillRect(0,y1,1080,y2-y1); ctx.restore();});}],
  over:[e=>{const {ctx,u,sc}=e; const items=[['sun',[-69.6,-23.8],'Atacama','eine der trockensten Wüsten','Im Norden',C.sand],['city',[-70.67,-33.45],'Santiago','mildes Klima','In der Mitte',C.green],['snow',[-73.3,-49.5],'Patagonien','Gletscher & Fjorde','Und im Süden',C.ice]];
   items.forEach(([k,ll,t1,t2,frag,col])=>{const a=clamp((u-wt(sc,frag))/0.35); if(a<=0) return; const q=P(e,ll); icon(ctx,k,q[0],q[1],0.7+0.3*eout(a),a);
    label(ctx,t1,q[0]+70,q[1]-12,{color:col,alpha:a,font:`800 34px ${FD}`}); label(ctx,t2,q[0]+70,q[1]+44,{alpha:a,font:`700 26px ${FB}`});});}]},
 {view:vWorld, min:6.5, noSubs:true,
  say:'Welches Land soll ich als Nächstes erklären? Schreib es in die Kommentare.',
  under:[e=>fillCountry(e,'CHL',C.target,1)],
  top:[e=>{const {ctx,u}=e; const a=eout(clamp((u-0.3)/0.6)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,640,780,520,32); ctx.fill();
   const z=fit(ctx,'Welches Land soll ich als Nächstes erklären?',800,84,56,700,FD); ctx.fillStyle=C.ink; wrapLines(ctx,'Welches Land soll ich als Nächstes erklären?',700).forEach((l,i)=>ctx.fillText(l,L+40,760+i*(z+8)));
   ctx.font=`800 46px ${FD}`; ctx.fillStyle=C.target; ctx.fillText('Schreib es in die Kommentare',L+40,1060,700); ctx.font=`500 30px ${FB}`; ctx.fillStyle=C.mute; ctx.fillText('Folge @geofy für mehr Karten-Wissen',L+40,1120,700); ctx.restore();}]}
];
return {tag:'GEO-WISSEN', scenes, wt};
}
