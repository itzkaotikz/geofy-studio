// Story: Karten lügen #5 – Die Antarktis in echter Größe
// ≈ 14,2 Mio. km² (NASA; UBA 13,5 ohne Schelfeis) · Mercator: unendlich am Pol · 98 % Eis, Ø 2,3 km · 70 % des Süßwassers · Antarktis-Vertrag · größte Wüste
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const ICE='#EAF6FF', GOLD='#FFE066', SAND='#E8B86A', AUSC='#FF8A5B', EURC='#B79CFF';
const WORLD=window.WW; const ATA={type:'Feature',geometry:window.ATAG}, AUSF={type:'Feature',geometry:window.AUSG};
function ataFill(e,a,col='#EAF6FF'){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(ATA); ctx.globalAlpha=a; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.6); ctx.strokeStyle='#fff'; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const vWorld=viewBox([-180,-62,180,75]), vS=viewBox([-180,-85,180,-42]), vT=viewBox([-175,-86,-20,-8]), vT2=viewBox([-165,-86,0,-5]);
// Tissot circles: every circle has the same real radius (600 km); Mercator stretches it by 1/cos(lat)
function tissot(e,a,list){const {ctx}=e; const sc=e.proj.scale(); const d=600/6371; ctx.save(); list.forEach(([lon,lat,k],i)=>{const q=P(e,[lon,lat]); const ka=clamp(a*list.length-i); if(ka<=0) return; const r=sc*d/Math.cos(lat*Math.PI/180); ctx.globalAlpha=ka*0.85; ctx.beginPath(); ctx.arc(q[0],q[1],r,0,7); ctx.fillStyle='rgba(255,224,102,0.35)'; ctx.fill(); ctx.strokeStyle=GOLD; ctx.lineWidth=4; ctx.stroke(); ctx.globalAlpha=ka; ctx.font=`800 30px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=7; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.strokeText(Math.abs(lat)+'°',q[0],q[1]+10); ctx.fillStyle='#fff'; ctx.fillText(Math.abs(lat)+'°',q[0],q[1]+10);}); ctx.restore();}
const TISSOT=[[-150,-20],[-122,-45],[-92,-62],[-58,-72],[-150,-78]];
// equal-area panel: same scale S for all shapes -> areas are comparable
const S_AREA=560, PX=100, PW=880, PH=760; const PY0=500;
const eaProj=(f,cx,cy,tx,ty)=>d3.geoAzimuthalEqualArea().rotate([-cx,-cy]).scale(S_AREA).translate([tx,ty]);
const discR=km2=>S_AREA*Math.sqrt(km2/(4*Math.PI*6371*6371)*4/Math.PI)*0+S_AREA*Math.sqrt(km2/(Math.PI*6371*6371))/1; // equal-area radius in px for the azimuthal equal-area (area scale = S^2)
function panel(e,a,{aus=0,eur=0,sah=0,ice=0}={}){if(a<=0) return; const PY=window.PANEL_Y||PY0; const {ctx}=e; const s=0.96+0.04*eout(a); ctx.save(); ctx.globalAlpha=a; ctx.translate(PX+PW/2,PY+PH/2); ctx.scale(s,s); ctx.translate(-(PX+PW/2),-(PY+PH/2));
 ctx.fillStyle='rgba(11,28,42,0.93)'; rr(ctx,PX,PY,PW,PH,30); ctx.fill(); ctx.save(); rr(ctx,PX,PY,PW,PH,30); ctx.clip();
 // Antarctica (real shape, equal-area, centred on the pole)
 const pa=d3.geoAzimuthalEqualArea().rotate([0,90]).scale(S_AREA).translate([PX+300,PY+PH/2+20]); const pth=d3.geoPath(pa,ctx);
 ctx.beginPath(); pth(ATA); ctx.fillStyle=ice>0?`rgba(160,215,255,${0.55+0.4*ice})`:ICE; ctx.globalAlpha=a; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke();
 ctx.font=`800 36px ${FD}`; ctx.textAlign='center'; ctx.fillStyle='#0B1C2A'; ctx.fillText('Antarktis',PX+300,PY+PH/2+28); ctx.font=`700 22px ${FB}`; ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.fillText('gezeichnet ohne Schelfeis',PX+300,PY+PH-26);
 // Australia (real shape)
 if(aus>0){const ca=d3.geoCentroid(AUSF); const p2=d3.geoAzimuthalEqualArea().rotate([-ca[0],-ca[1]]).scale(S_AREA).translate([PX+700,PY+210]); ctx.globalAlpha=aus; ctx.beginPath(); d3.geoPath(p2,ctx)(AUSF); ctx.fillStyle='rgba(255,138,91,0.75)'; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.font=`800 32px ${FD}`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.lineWidth=7; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.strokeText('Australien',PX+700,PY+160); ctx.fillText('Australien',PX+700,PY+160);}
 // Europe and Sahara as equal-area discs (area only)
 const disc=(km2,cx,cy,col,name,al)=>{if(al<=0) return; const r=S_AREA*Math.sqrt(km2/(Math.PI*6371*6371)); ctx.globalAlpha=al; ctx.beginPath(); ctx.arc(cx,cy,r,0,7); ctx.fillStyle=col; ctx.globalAlpha=al*0.45; ctx.fill(); ctx.globalAlpha=al; ctx.setLineDash([14,10]); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.setLineDash([]); ctx.font=`800 30px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=7; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.strokeText(name,cx,cy+10); ctx.fillStyle='#fff'; ctx.fillText(name,cx,cy+10);};
 disc(10180000,PX+700,PY+560,'#B79CFF','Europa (Fläche)',eur); disc(9200000,PX+700,PY+560,SAND,'Sahara (Fläche)',sah);
 ctx.restore(); rr(ctx,PX,PY,PW,PH,30); ctx.globalAlpha=a; ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}

function panelMerc(e,a,{tissot=0,labelA=0,inf=0}={}){if(a<=0) return; const PY=window.PANEL_Y||PY0; const {ctx}=e; const s=0.96+0.04*eout(a); ctx.save(); ctx.globalAlpha=a; ctx.translate(PX+PW/2,PY+PH/2); ctx.scale(s,s); ctx.translate(-(PX+PW/2),-(PY+PH/2));
 ctx.fillStyle='rgba(11,28,42,0.95)'; rr(ctx,PX,PY,PW,PH,30); ctx.fill(); ctx.save(); rr(ctx,PX,PY,PW,PH,30); ctx.clip();
 const sc=(PW-40)/(2*Math.PI), my=la=>Math.log(Math.tan(Math.PI/4+la*Math.PI/360)); const cy=PY+PH-30+my(-84)*sc+ (-0); // lat -84 near the bottom edge
 const pm=d3.geoMercator().scale(sc).translate([PX+PW/2,PY+PH-34+my(-84)*sc*(-1)*(-1)*0+ (my(-84)*sc)*(-1)*(-1)]).clipExtent([[PX,PY],[PX+PW,PY+PH]]);
 const Y0=PY+PH-34; pm.translate([PX+PW/2,Y0-(-my(-84)*sc)*(-1)*0+my(-84)*sc*(-1)*(-1)]);
 pm.translate([PX+PW/2, Y0+my(-84)*sc]);
 const pth=d3.geoPath(pm,ctx);
 // graticule
 ctx.strokeStyle='rgba(255,255,255,0.12)'; ctx.lineWidth=1.5; [-80,-60,-40,-20,0,20,40,60].forEach(la=>{const y=pm([0,la])[1]; ctx.beginPath(); ctx.moveTo(PX,y); ctx.lineTo(PX+PW,y); ctx.stroke();});
 ctx.beginPath(); WORLD.features.forEach(f=>{if(f.id!=='ATA') pth(f);}); ctx.fillStyle='rgba(120,150,175,0.55)'; ctx.fill();
 ctx.beginPath(); pth(ATA); ctx.fillStyle='#EAF6FF'; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke();
 if(labelA>0){ctx.globalAlpha=a*labelA; ctx.font=`800 40px ${FD}`; ctx.textAlign='center'; ctx.fillStyle='#0B1C2A'; ctx.fillText('Antarktis',pm([95,-76])[0],pm([95,-76])[1]); ctx.globalAlpha=a;}
 if(tissot>0){const d=800/6371; [[-150,10],[-95,-35],[-40,-55],[15,-68],[75,-76],[135,-80]].forEach(([lon,lat],i)=>{const k=clamp(tissot*6-i); if(k<=0) return; const q=pm([lon,lat]); const r=sc*d/Math.cos(lat*Math.PI/180); ctx.globalAlpha=a*k; ctx.beginPath(); ctx.arc(q[0],q[1],r,0,7); ctx.fillStyle='rgba(255,224,102,0.4)'; ctx.fill(); ctx.strokeStyle=GOLD; ctx.lineWidth=3.5; ctx.stroke(); ctx.font=`800 24px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=6; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.strokeText(Math.abs(lat)+'°',q[0],q[1]+8); ctx.fillStyle='#fff'; ctx.fillText(Math.abs(lat)+'°',q[0],q[1]+8);}); ctx.globalAlpha=a;}
 ctx.restore(); rr(ctx,PX,PY,PW,PH,30); ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
const scenes=[
 {head:'Wie groß ist die Antarktis?', headInstant:true, say:S_say[0], cams:[{at:0,view:vWorld},{at:0.4,view:viewBox([-60,-40,60,60]),fly:5}],
  over:[e=>{const {u,sc,ctx}=e; panelMerc(e,clamp((u-0.2)/0.5),{labelA:clamp((u-wt(sc,'Antarktis'))/0.5)}); chip(ctx,'Wie groß ist sie wirklich?',1330,clamp((u-wt(sc,'wirklich'))/0.4),'#fff','rgba(11,28,42,0.93)');}]},
 {head:'Mercator zieht Pole in die Breite', say:S_say[1], cams:[{at:0,view:viewBox([-60,-40,60,60]),fly:1.0},{at:3,view:vWorld,fly:9}],
  over:[e=>{const {u,sc,ctx}=e; panelMerc(e,1,{tissot:clamp((u-wt(sc,'Je näher'))/2.4),labelA:1-clamp((u-wt(sc,'Je näher'))/0.4)}); chip(ctx,'alle Kreise: gleich groß (800 km Radius)',1330,clamp((u-wt(sc,'Je näher'))/0.5)*(1-clamp((u-wt(sc,'Am Pol'))/0.4)),'#0B1C2A'); const au=clamp((u-wt(sc,'unendlich'))/0.4); if(au>0) chip(ctx,'am Pol: unendlich verzerrt',1330,au*(1-clamp((u-wt(sc,'Deshalb schneiden'))/0.4)),'#fff','rgba(229,72,77,0.95)'); chip(ctx,'Karten schneiden bei ≈ 85° ab',1400,clamp((u-wt(sc,'Deshalb schneiden'))/0.4),'#fff','rgba(229,72,77,0.95)');}]},
 {head:'Echte Größe', say:S_say[2], cams:[{at:0,view:vS,fly:1.0},{at:3,view:vWorld,fly:6}],
  over:[e=>{const {u,sc,ctx}=e; panel(e,clamp((u-0.2)/0.5),{aus:clamp((u-wt(sc,'Australien'))/0.5),eur:clamp((u-wt(sc,'Europa'))/0.5)}); const a=clamp((u-wt(sc,'14 Millionen'))/0.4); if(a>0){const v=(14*ease(clamp((u-wt(sc,'14 Millionen'))/0.9))).toFixed(0); chip(ctx,`≈ ${v} Mio. km²`,1330,a);} chip(ctx,'fast doppelt so groß wie Australien',1400,clamp((u-wt(sc,'Australien'))/0.4),'#fff','rgba(255,59,127,0.95)',34);}]},
 {head:'Fast alles ist Eis', say:S_say[3], cams:[{at:0,view:vWorld,fly:1.0},{at:0.5,view:vS,fly:7}],
  over:[e=>{const {u,sc,ctx}=e; const k=clamp((u-wt(sc,'98'))/0.8); panel(e,1,{ice:k}); const a1=clamp((u-wt(sc,'98'))/0.4); if(a1>0){const v=Math.round(98*ease(clamp((u-wt(sc,'98'))/0.9))); chip(ctx,`${v} % Eis`,1330,a1);} chip(ctx,'im Schnitt > 2 km dick',1400,clamp((u-wt(sc,'zwei Kilometern'))/0.4),'#fff','rgba(11,28,42,0.93)',36); chip(ctx,'≈ 70 % des Süßwassers der Erde',1470,clamp((u-wt(sc,'70 Prozent'))/0.4),'#0B1C2A','rgba(160,215,255,0.97)',36);}]},
 {head:'Niemandem gehört sie', say:S_say[4], cams:[{at:0,view:vS,fly:1.0},{at:0.5,view:vWorld,fly:5}],
  over:[e=>{const {u,sc,ctx}=e; panel(e,1,{ice:1}); chip(ctx,'Antarktis-Vertrag',1330,clamp((u-wt(sc,'Antarktis-Vertrag'))/0.4)); chip(ctx,'nur für Frieden und Forschung',1400,clamp((u-wt(sc,'Frieden'))/0.4),'#fff','rgba(11,28,42,0.93)',36);}]},
 {head:'Größte Wüste der Erde', say:S_say[5], cams:[{at:0,view:vWorld,fly:1.0},{at:0.4,view:vS,fly:5}],
  over:[e=>{const {u,sc,ctx}=e; panel(e,1,{ice:1,sah:clamp((u-wt(sc,'Sahara'))/0.5)}); chip(ctx,'Wüste = kaum Niederschlag',1330,clamp((u-wt(sc,'Wüste'))/0.4)); chip(ctx,'Antarktis > Sahara',1400,clamp((u-wt(sc,'Sahara'))/0.4),'#fff','rgba(255,59,127,0.95)',38);}]},
 {say:S_say[6], cams:[{at:0,view:vS,fly:1.2},{at:1.4,view:vS,fly:4.5}],
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
return {tag:'KARTEN LÜGEN #5', scenes, wt};
}
