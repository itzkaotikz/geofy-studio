// Story: Wo leben alle? #2 – Australier an der Küste
// >80 % innerhalb 50 km der Küste (ABS 2001) · fast 19 Mio. in den Hauptstädten (ABS 2025) · trockenster bewohnter Kontinent, 70 % arid/semi-arid, ≤250 mm · 1788 Sydney
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', COAST='#4FD1C5', SAND='#E8B86A', RED='#FF5A5F';
const AUS={type:'Feature',geometry:window.AUSG};
const USg=KV.byId().get('USA').geometry; const US48={type:'Feature',geometry:{type:'MultiPolygon',coordinates:USg.coordinates.filter(c=>{const g=d3.geoCentroid({type:'Polygon',coordinates:c}); return g[0]>-130&&g[1]<50&&g[1]>24;})}};
const uC=d3.geoCentroid(US48);
function moved(f,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:f.geometry.type,coordinates:mp(f.geometry.coordinates)}};}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const CITY={Sydney:[151.21,-33.87],Melbourne:[144.96,-37.81],Brisbane:[153.03,-27.47],Perth:[115.86,-31.95],Adelaide:[138.6,-34.93]};
// coastal band: stroke the coastline, clipped to land; 50 km = pxPerKm*50 (stroke is centred, so 2×)
function coastBand(e,a,km=50,col=COAST){if(a<=0) return; const {ctx,path}=e; const p0=P(e,[134,-25]), p1=P(e,[134,-26]); const pxKm=Math.hypot(p1[0]-p0[0],p1[1]-p0[1])/111.2; ctx.save(); ctx.beginPath(); path(AUS); ctx.clip(); ctx.beginPath(); path(AUS); ctx.globalAlpha=a*0.85; ctx.strokeStyle=col; ctx.lineWidth=2*km*pxKm; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function outline(e,a,col='#fff',w=3){const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(AUS); ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function glow(ctx,x,y,r,a,col='255,224,130'){if(a<=0) return; const g=ctx.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,`rgba(${col},${0.95*a})`); g.addColorStop(0.35,`rgba(${col},${0.45*a})`); g.addColorStop(1,`rgba(${col},0)`); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill();}
function ship(ctx,x,y,s,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(11,28,42,0.9)'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-16,0); ctx.lineTo(16,0); ctx.lineTo(10,10); ctx.lineTo(-10,10); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillRect(-2,-18,4,18); ctx.beginPath(); ctx.moveTo(2,-18); ctx.lineTo(16,-4); ctx.lineTo(2,-4); ctx.closePath(); ctx.fill(); ctx.restore();}
const vWide=viewBox([85,-52,185,0]), vAus=viewBox([111,-45,156,-8]), vSE=viewBox([139,-40,156,-25]), vSEW=viewBox([128,-44,158,-22]);
const rnd=(i,k=0)=>{const x=Math.sin(i*127.1+k*311.7)*43758.5453; return x-Math.floor(x);};
// stylised night lights: city glows + faint dots along the coast
const COASTPTS=[]; (function(){const r=[]; AUS.geometry.coordinates.forEach((pl,pi)=>{if(pi>1) return; pl[0].forEach((pt,i)=>{if(i%6===0) r.push(pt);});}); r.forEach((pt,i)=>{if(rnd(i)<0.45) COASTPTS.push([pt,rnd(i,1)]);});})();
const scenes=[
 {head:'Wo leben alle Australier?', headInstant:true, say:S_say[0], cams:[{at:0,view:vWide},{at:0.3,view:vAus,fly:3.2}],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'fast alle'))/0.5); outline(e,0.9); coastBand(e,a*(1-clamp((u-wt(sc,'Mehr als'))/0.01)*0)); const a2=clamp((u-wt(sc,'Mehr als'))/0.4); if(a2>0){const v=Math.round(80*ease(clamp((u-wt(sc,'Mehr als'))/1.0))); big(ctx,`> ${v} %`,a2,700,'#fff',130);}
   const a3=clamp((u-wt(sc,'50 Kilometer'))/0.4); chip(ctx,'höchstens 50 km vom Meer',1180,a3); }]},
 {head:'Groß, aber fast leer', say:S_say[1], cams:[{at:0,view:vAus,fly:1.0},{at:3,view:viewBox([108,-46,160,-6]),fly:6}],
  over:[e=>{const {u,sc,ctx,t}=e; outline(e,0.9); const k=clamp((u-wt(sc,'USA'))/0.6); if(k>0){const g=moved(US48,uC,[134,-26]); ctx.save(); ctx.beginPath(); e.path(g); ctx.globalAlpha=k*0.28; ctx.fillStyle='#fff'; ctx.fill(); ctx.globalAlpha=k; ctx.strokeStyle='#fff'; ctx.lineWidth=3.5; ctx.setLineDash([16,10]); ctx.stroke(); ctx.restore(); chip(ctx,'USA ohne Alaska, Hawaii (gestrichelt)',1180,k,'#fff','rgba(11,28,42,0.93)',32);}
   const a1=clamp((u-wt(sc,'nur rund'))/0.4)*(1-clamp((u-wt(sc,'Fast 19'))/0.4)); if(a1>0){const v=Math.round(27*ease(clamp((u-wt(sc,'nur rund'))/0.9))); big(ctx,`${v} Mio. Menschen`,a1,700,'#fff',96);}
   const a2=clamp((u-wt(sc,'Fast 19'))/0.4); if(a2>0){const v=Math.round(19*ease(clamp((u-wt(sc,'Fast 19'))/0.9))); big(ctx,`${v} Mio. in Hauptstädten`,a2,700,GOLD,84); Object.entries(CITY).forEach(([n,ll],i)=>{const ap=clamp((u-wt(sc,'Fast 19')-i*0.15)/0.3); pulse(e,ll,t,ap,GOLD,9);});}}]},
 {head:'Der Grund: Wasser', say:S_say[2], cams:[{at:0,view:viewBox([108,-46,160,-6]),fly:1.0},{at:0.6,view:vAus,fly:3.0}],
  over:[e=>{const {u,sc,ctx,t}=e; outline(e,0.9); const k=clamp((u-wt(sc,'trockenste'))/0.5); if(k>0){ctx.save(); ctx.beginPath(); e.path(AUS); ctx.globalAlpha=k*0.35; ctx.fillStyle=SAND; ctx.fill(); ctx.restore();}
   chip(ctx,'trockenster bewohnter Kontinent',1180,clamp((u-wt(sc,'trockenste'))/0.4)*(1-clamp((u-wt(sc,'70 Prozent'))/0.4)));
   const a=clamp((u-wt(sc,'70 Prozent'))/0.4); if(a>0){const v=Math.round(70*ease(clamp((u-wt(sc,'70 Prozent'))/0.9))); big(ctx,`${v} % trocken`,a*(1-clamp((u-wt(sc,'Trockenzone'))/0.4)),700,SAND,112);}
   const a2=clamp((u-wt(sc,'Trockenzone'))/0.4); if(a2>0) big(ctx,'≤ 250 mm Regen / Jahr',a2,700,'#fff',76);}]},
 {head:'Auch die Geschichte', say:S_say[3], cams:[{at:0,view:vAus,fly:1.0},{at:0.5,view:vSEW,fly:3.0},{at:sc=>wt(sc,'Das Landesinnere')-0.4,view:vAus,fly:2.5}],
  over:[e=>{const {u,sc,ctx,t}=e; outline(e,0.9); const ts=wt(sc,'1788'); const a=clamp((u-ts)/0.4); const q=P(e,CITY.Sydney); ship(ctx,q[0]+90-90*eout(clamp((u-ts)/1.4)),q[1]+20,1.6,a); pulse(e,CITY.Sydney,t,clamp((u-wt(sc,'Sydney'))/0.3),GOLD,11); tag(e,CITY.Sydney,'Sydney 1788',clamp((u-wt(sc,'Sydney'))/0.3),-250,-20,'#fff',32);
   const ai=clamp((u-wt(sc,'Das Landesinnere'))/0.5); if(ai>0){ctx.save(); ctx.beginPath(); e.path(AUS); ctx.globalAlpha=ai*0.28; ctx.fillStyle='#0B1C2A'; ctx.fill(); ctx.restore(); chip(ctx,'Landesinneres: lange fast leer',1180,ai,'#fff','rgba(11,28,42,0.93)');}}]},
 {head:'Heute noch genauso', say:S_say[4], cams:[{at:0,view:vAus,fly:1.0},{at:0.4,view:vSE,fly:3.0}],
  over:[e=>{const {u,sc,ctx,t}=e; outline(e,0.9); Object.entries(CITY).forEach(([n,ll],i)=>{const ap=clamp((u-wt(sc,'Südosten')-i*0.12)/0.3); pulse(e,ll,t,ap,GOLD,9);}); tag(e,CITY.Sydney,'Sydney',clamp((u-wt(sc,'Sydney'))/0.3),24,-4,'#fff',28); tag(e,CITY.Melbourne,'Melbourne',clamp((u-wt(sc,'Melbourne'))/0.3),24,10,'#fff',28);
   chip(ctx,'genug Regen: Südosten, Ostküste',1290,clamp((u-wt(sc,'Regen fällt'))/0.4));
   chip(ctx,'Sydney, Melbourne: je > 4 Mio.',1360,clamp((u-wt(sc,'jeweils'))/0.4),'#fff','rgba(11,28,42,0.93)',36);}]},
 {head:'Die Nachtkarte', say:S_say[5], cams:[{at:0,view:vSE,fly:1.0},{at:0.4,view:vAus,fly:3.5}],
  over:[e=>{const {u,sc,ctx,t}=e; const k=clamp((u-wt(sc,'Nachtkarte'))/0.8); ctx.save(); ctx.globalAlpha=0.74*k; ctx.fillStyle='#050B14'; ctx.fillRect(0,0,1080,1920); ctx.restore();
   ctx.save(); ctx.globalCompositeOperation='lighter'; COASTPTS.forEach(([pt,r],i)=>{const q=P(e,pt); if(!q) return; const kk=clamp((u-wt(sc,'Lichtband')-rnd(i,2)*0.6)/0.4); glow(ctx,q[0],q[1],10+r*14,kk*0.55);}); Object.values(CITY).forEach((ll,i)=>{const q=P(e,ll); glow(ctx,q[0],q[1],46,clamp((u-wt(sc,'Lichtband'))/0.4)*(0.8+0.2*Math.sin(t*3+i)),'255,214,120');}); ctx.restore();
   chip(ctx,'Nachtkarte (stilisiert)',1180,clamp((u-wt(sc,'Nachtkarte'))/0.4),'#fff','rgba(11,28,42,0.93)',34);
   chip(ctx,'Rand hell, Inneres dunkel',1250,clamp((u-wt(sc,'Dunkelheit'))/0.4));}]},
 {say:S_say[6], cams:[{at:0,view:vAus,fly:1.2},{at:1.4,view:vAus,fly:4.5}],
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
return {tag:'WO LEBEN ALLE? #2', scenes, wt};
}
