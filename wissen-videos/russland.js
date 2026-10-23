// Story: Karten lügen #6 – Wie groß ist Russland wirklich?
// Russland 17,08 Mio. km², Kanada 9,97 (Britannica) · Afrika 30,37 · Mercator: Fläche × 1/cos² φ (60° → × 4) · 11 Zeitzonen
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', RUC='#FF3B7F', AFC='#FFB74D', SAC='#7CE0C3';
const W=window.WW; const RUS=W.features.find(f=>f.id==='RUS'); const AFR=W.features.filter(f=>f.properties.cont==='Africa'); const SAM=W.features.filter(f=>f.properties.cont==='South America');
const rC=d3.geoCentroid(RUS);
function moved(f,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:f.geometry.type,coordinates:mp(f.geometry.coordinates)}};}
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function fillF(e,fs,col,a,dash=false){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); (Array.isArray(fs)?fs:[fs]).forEach(f=>path(f)); ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.4); ctx.strokeStyle=dash?'#fff':col; ctx.lineWidth=3; if(dash) ctx.setLineDash([14,10]); ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function tissot(e,a,list){const {ctx}=e; const sc=e.proj.scale(); const d=800/6371; ctx.save(); list.forEach(([lon,lat],i)=>{const ka=clamp(a*list.length-i); if(ka<=0) return; const q=P(e,[lon,lat]); const r=sc*d/Math.cos(lat*Math.PI/180); ctx.globalAlpha=ka*0.9; ctx.beginPath(); ctx.arc(q[0],q[1],r,0,7); ctx.fillStyle='rgba(255,224,102,0.35)'; ctx.fill(); ctx.strokeStyle=GOLD; ctx.lineWidth=4; ctx.stroke(); ctx.font=`800 28px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=7; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.strokeText(lat+'°',q[0],q[1]+10); ctx.fillStyle='#fff'; ctx.fillText(lat+'°',q[0],q[1]+10);}); ctx.restore();}
function lat60(e,a){if(a<=0) return; const {ctx}=e; ctx.save(); ctx.globalAlpha=a; ctx.setLineDash([18,12]); ctx.strokeStyle='#fff'; ctx.lineWidth=5; ctx.beginPath(); e.path({type:'LineString',coordinates:d3.range(-179,180,2).map(x=>[x,60])}); ctx.stroke(); ctx.restore();}
function bars(ctx,a,k){if(a<=0||window.NO_CHIPS) return; const y0=1180; ctx.save(); ctx.globalAlpha=a; [['Russland',17.08,RUC],['Kanada',9.97,'#B79CFF']].forEach(([n,v,c],i)=>{const y=y0+i*80; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,y,820,62,14); ctx.fill(); const w=(820-20)*v/17.08*eout(clamp(k*2-i*0.6)); ctx.fillStyle=c; rr(ctx,L+10,y+8,Math.max(10,w),46,10); ctx.fill(); ctx.font=`800 32px ${FD}`; ctx.fillStyle='#fff'; ctx.lineWidth=7; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.textAlign='left'; const tx=`${n}: ${v.toLocaleString('de-DE')} Mio. km²`; ctx.strokeText(tx,L+26,y+43); ctx.fillText(tx,L+26,y+43);}); ctx.restore();}
const vWorld=viewBox([-170,-50,190,78]), vRA=viewBox([-25,-38,180,78]), vEq=viewBox([-15,-50,135,42]), vRus=viewBox([25,40,178,78]);
const TI=[[100,0],[100,30],[100,50],[100,65]];
const scenes=[
 {head:'Russland so groß wie Afrika?', headInstant:true, say:S_say[0], cams:[{at:0,view:vWorld},{at:0.3,view:vRA,fly:3.0}],
  under:[e=>{const {u,sc}=e; fillF(e,RUS,RUC,clamp((u-wt(sc,'Russland'))/0.5)); fillF(e,AFR,AFC,clamp((u-wt(sc,'Afrika'))/0.5));}],
  over:[e=>{const {u,sc,ctx}=e; tag(e,[95,63],'Russland',clamp((u-wt(sc,'Russland'))/0.4),-80,0,'#fff',36); tag(e,[20,5],'Afrika',clamp((u-wt(sc,'Afrika'))/0.4),-60,0,'#fff',36); chip(ctx,'In echt: Afrika fast doppelt so groß',1180,clamp((u-wt(sc,'In Wirklichkeit'))/0.4),'#fff','rgba(255,59,127,0.95)',34);}]},
 {head:'Mercator bläht den Norden auf', say:S_say[1], cams:[{at:0,view:vRA,fly:1.0},{at:0.5,view:viewBox([40,-15,170,78]),fly:6}],
  under:[e=>{fillF(e,RUS,RUC,0.8); fillF(e,AFR,AFC,0.5);}],
  over:[e=>{const {u,sc,ctx}=e; tissot(e,clamp((u-wt(sc,'Je weiter'))/2.2),TI); chip(ctx,'alle Kreise: gleich groß (800 km Radius)',1180,clamp((u-wt(sc,'Je weiter'))/0.5),'#0B1C2A','rgba(255,224,102,0.96)',32); chip(ctx,'gemacht für Seefahrer (1569)',1250,clamp((u-wt(sc,'Seefahrer'))/0.4)*(1-clamp((u-wt(sc,'Je weiter'))/0.4)),'#fff','rgba(11,28,42,0.93)',34);}]},
 {head:'60° Nord: viermal so groß', say:S_say[2], cams:[{at:0,view:viewBox([40,-15,170,78]),fly:1.0},{at:0.5,view:vRus,fly:5}],
  under:[e=>{fillF(e,RUS,RUC,0.8);}],
  over:[e=>{const {u,sc,ctx}=e; lat60(e,clamp((u-wt(sc,'60'))/0.5)); tag(e,[30,60],'60° N',clamp((u-wt(sc,'60'))/0.4),-20,-24,'#fff',30); const a=clamp((u-wt(sc,'viermal'))/0.4); if(a>0) big(ctx,'Fläche × 4',a,660,GOLD,110); tag(e,[100,62],'Sibirien',clamp((u-wt(sc,'Sibirien'))/0.4),-70,40,'#fff',34);}]},
 {head:'Russland am Äquator', say:S_say[3], cams:[{at:0,view:vRus,fly:1.0},{at:0.4,view:vEq,fly:3.5}],
  under:[e=>{const {u,sc}=e; const k=ease(clamp((u-wt(sc,'Schieben'))/2.0)); fillF(e,AFR,AFC,0.6); const to=[lerp(rC[0],88,k),lerp(rC[1],-12,k)]; fillF(e,moved(RUS,rC,to),RUC,0.9,k>0.01);}],
  over:[e=>{const {u,sc,ctx}=e; tag(e,[88,-12],'Russland (echte Größe)',clamp((u-wt(sc,'echter'))/0.4),-150,0,'#fff',30); chip(ctx,'≈ so groß wie Südamerika',1180,clamp((u-wt(sc,'Südamerika'))/0.4)); tag(e,[20,5],'Afrika',clamp((u-wt(sc,'Riese'))/0.4),-50,0,'#fff',34);}]},
 {head:'Trotzdem die Nummer 1', say:S_say[4], cams:[{at:0,view:vEq,fly:1.0},{at:0.4,view:vRus,fly:3.0},{at:sc=>wt(sc,'elf Zeitzonen')-0.4,view:viewBox([15,35,179,78]),fly:3.0}],
  under:[e=>{fillF(e,RUS,RUC,0.8);}],
  over:[e=>{const {u,sc,ctx}=e; bars(ctx,clamp((u-wt(sc,'17'))/0.4)*(1-clamp((u-wt(sc,'elf Zeitzonen'))/0.4)),clamp((u-wt(sc,'17'))/1.6)); const a=clamp((u-wt(sc,'elf Zeitzonen'))/0.4); if(a>0) big(ctx,'11 Zeitzonen',a,660,'#fff',110); tag(e,[20.5,54.7],'Kaliningrad',clamp((u-wt(sc,'Kaliningrad'))/0.4),-60,-40,'#fff',28); tag(e,[-170,66],'Beringstraße',clamp((u-wt(sc,'Beringstraße'))/0.4),-200,-30,'#fff',28);}]},
 {head:'Rangliste stimmt, Größe nicht', say:S_say[5], cams:[{at:0,view:viewBox([15,35,179,78]),fly:1.0},{at:0.4,view:vRA,fly:4}],
  under:[e=>{fillF(e,RUS,RUC,0.8); fillF(e,AFR,AFC,0.6);}],
  over:[e=>{const {u,sc,ctx}=e; chip(ctx,'Rangliste: stimmt ✓',1180,clamp((u-wt(sc,'Rangliste'))/0.4),'#0B1C2A','rgba(120,230,170,0.96)'); chip(ctx,'Größenverhältnisse: verzerrt ✕',1250,clamp((u-wt(sc,'Größenverhältnisse'))/0.4),'#fff','rgba(229,72,77,0.95)');}]},
 {say:S_say[6], cams:[{at:0,view:vWorld,fly:1.2},{at:1.4,view:vWorld,fly:4.5}],
  under:[],
  over:[],
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
return {tag:'KARTEN LÜGEN #6', scenes, wt};
}
