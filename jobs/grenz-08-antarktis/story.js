// Story: Grenz-Kuriositäten #8 – Wem gehört die Antarktis?
// Ansprüche (Sektoren bis 60° S): NOR 20°W–45°E · AUS 45–136°E und 142–160°E · FRA 136–142°E · NZL 160°E–150°W
// unbeansprucht 150–90°W (Marie-Byrd-Land) · CHL 90–53°W · ARG 74–25°W · GBR 80–20°W (Überlappung 74–53°W)
// Polarregion nur im eigenen Panel (flächentreue Azimutalprojektion), Hauptkamera bleibt nördlich von 80° S.
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const PINK='#FF3D81', GOLD='#FFE066', ICE='#EAF6FF', RED='#E5484D';
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; if(KV.LOOK==='v3') return KV.bigText(ctx,txt,a,y,col,size); ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function pop(ctx,txt,a,u,t0,y=600,col='#fff',size=130){if(a<=0||window.NO_CHIPS) return; const k=1+0.35*Math.max(0,1-(u-t0)/0.25); ctx.save(); ctx.translate(540,y); ctx.scale(k,k); ctx.translate(-540,-y); big(ctx,txt,a,y,col,size); ctx.restore();}
function xmark(ctx,x,y,a,s=1){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.scale(s*(1+0.4*(1-a)),s*(1+0.4*(1-a))); ctx.lineCap='round'; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineWidth=20; ctx.beginPath(); ctx.moveTo(-22,-22); ctx.lineTo(22,22); ctx.moveTo(22,-22); ctx.lineTo(-22,22); ctx.stroke(); ctx.strokeStyle=RED; ctx.lineWidth=11; ctx.stroke(); ctx.restore();}
const A=(u,t0,d=0.35)=>clamp((u-t0)/d);
const win=(u,t0,t1,d=0.3)=>clamp((u-t0)/d)*(1-clamp((u-t1)/d));

// ---------- Polar-Panel ----------
const ATA={type:'Feature',geometry:window.G10.ATA}; const WORLD=window.WW;
const PX=110, PW=860, PH=820, CX=PX+PW/2; let PY=450, CY=PY+PH/2; // Cover (NO_CHIPS): Panel tiefer, damit die Überschrift nichts verdeckt
const R60=395;                                   // Bildradius bis 60° S
const S0=R60/(2*Math.sin(15*Math.PI/180));        // Maßstab der flächentreuen Azimutalprojektion
const SECT=[ // [key, name, farbe, [lon0,lon1] (östlich, 0..360), Beschriftung lon]
 ['NOR','Norwegen','#E5484D',[[340,405]],12],
 ['AUS','Australien','#FF8A3D',[[45,136],[142,160]],92],
 ['FRA','Frankreich','#4D9BFF',[[136,142]],139],
 ['NZL','Neuseeland','#33D1B0',[[160,210]],185],
 ['CHL','Chile','#FFE066',[[270,307]],282],
 ['ARG','Argentinien','#7FD0FF',[[286,335]],318],
 ['GBR','Großbritannien','#B98CFF',[[280,340]],300]];
const FREE=[[210,270]];
const STATIONS=[[166.67,-77.85],[0,-89.99],[106.8,-78.46],[123.35,-75.1],[62.87,-67.6],[77.97,-68.58],[110.53,-66.28],[140.0,-66.66],[2.53,-72.01],[-8.27,-70.67],[-26.2,-75.6],[-68.13,-67.57],[-64.05,-64.77],[-56.99,-63.4],[-56.63,-64.24],[-58.96,-62.2],[-58.47,-62.16],[-64.26,-65.25],[-57.9,-63.32],[-67.1,-68.13],[-34.6,-77.87],[-2.84,-71.67],[11.83,-70.77],[39.58,-69.0],[45.85,-67.67],[76.38,-69.38],[93.0,-66.55],[77.12,-80.42],[39.7,-77.32],[23.35,-71.95],[164.12,-74.69],[-58.39,-62.08],[-60.7,-62.9],[-57.4,-64.1]];
function proj(k=1,c=null){const p=d3.geoAzimuthalEqualArea().rotate([0,90,0]).scale(S0*k).translate([CX,CY]); if(c){const q=p(c); p.translate([CX+(CX-q[0]),CY+(CY-q[1])]);} return p;}
function wedge(ctx,p,l0,l1,lat=-60){ctx.moveTo(...p([0,-90])); for(let l=l0;l<=l1;l+=1) ctx.lineTo(...p([l>180?l-360:l,lat])); ctx.closePath();}
// o: {k, c, sect:{KEY:alpha}, hi:{KEY:alpha}, free, freeHi, overlap, frozen, st, dim}
function panel(e,a,o={}){if(a<=0) return; const {ctx,t}=e; PY=window.NO_CHIPS?730:450; CY=PY+PH/2; const s=0.94+0.06*eout(a);
 ctx.save(); ctx.globalAlpha=a; ctx.translate(CX,CY); ctx.scale(s,s); ctx.translate(-CX,-CY);
 ctx.fillStyle='rgba(8,22,36,0.94)'; rr(ctx,PX,PY,PW,PH,30); ctx.fill(); ctx.save(); rr(ctx,PX,PY,PW,PH,30); ctx.clip();
 const p=proj(o.k||1,o.c||null), path=d3.geoPath(p,ctx);
 // Meer bis 60° S, übrige Länder
 ctx.beginPath(); ctx.arc(...p([0,-90]),R60*(o.k||1),0,7); ctx.fillStyle='rgba(30,70,110,0.55)'; ctx.fill();
 ctx.setLineDash([10,10]); ctx.strokeStyle='rgba(255,255,255,0.28)'; ctx.lineWidth=2; ctx.stroke(); ctx.setLineDash([]);
 ctx.beginPath(); WORLD.features.forEach(f=>{if(f.id!=='ATA') path(f);}); ctx.fillStyle='rgba(150,170,185,0.55)'; ctx.fill();
 // Kontinent
 ctx.beginPath(); path(ATA); ctx.fillStyle=ICE; ctx.fill();
 // Sektoren
 const dim=o.dim||0;
 SECT.forEach(([key,name,col,parts])=>{const sa=(o.sect||{})[key]||0; if(sa<=0) return; const h=(o.hi||{})[key]||0; const da=(1-dim*(1-h));
  ctx.save(); ctx.beginPath(); parts.forEach(([l0,l1])=>wedge(ctx,p,l0,l1)); ctx.globalAlpha=a*sa*da*(0.22+0.25*h); ctx.fillStyle=col; ctx.fill();
  ctx.clip(); ctx.beginPath(); path(ATA); ctx.globalAlpha=a*sa*da*(0.42+0.4*h); ctx.fill(); ctx.restore();
  ctx.save(); ctx.beginPath(); parts.forEach(([l0,l1])=>wedge(ctx,p,l0,l1)); ctx.globalAlpha=a*sa*da; ctx.strokeStyle=col; ctx.lineWidth=2.5+3*h; ctx.stroke(); ctx.restore();});
 // unbeansprucht (Marie-Byrd-Land)
 if(o.free>0){ctx.save(); ctx.beginPath(); FREE.forEach(([l0,l1])=>wedge(ctx,p,l0,l1)); ctx.clip(); const fh=o.freeHi||0; ctx.globalAlpha=a*o.free*(0.5+0.4*fh);
  ctx.strokeStyle='rgba(20,30,40,0.75)'; ctx.lineWidth=5; for(let x=-1200;x<1200;x+=22){ctx.beginPath(); ctx.moveTo(CX+x,CY-900); ctx.lineTo(CX+x+900,CY+900); ctx.stroke();}
  ctx.restore(); if(fh>0){ctx.save(); ctx.beginPath(); FREE.forEach(([l0,l1])=>wedge(ctx,p,l0,l1)); ctx.globalAlpha=a*fh*(0.6+0.4*Math.sin(t*6)); ctx.strokeStyle='#fff'; ctx.lineWidth=5; ctx.stroke(); ctx.restore();}}
 // Überlappung (Halbinsel) pulsiert
 if(o.overlap>0){ctx.save(); ctx.beginPath(); wedge(ctx,p,286,307); ctx.globalAlpha=a*o.overlap*(0.55+0.45*Math.sin(t*7)); ctx.strokeStyle=PINK; ctx.lineWidth=7; ctx.stroke(); ctx.restore();}
 // eingefroren
 if(o.frozen>0){ctx.save(); ctx.beginPath(); ctx.arc(...p([0,-90]),R60*(o.k||1),0,7); ctx.globalAlpha=a*o.frozen*0.45; ctx.fillStyle='rgba(190,230,255,1)'; ctx.fill(); ctx.restore();}
 // Stationen
 if(o.st>0){const n=Math.floor(STATIONS.length*clamp(o.st)); STATIONS.slice(0,n).forEach(([lo,la],i)=>{const q=p([lo,la]); const ag=clamp((o.st*STATIONS.length-i)/3); ctx.save(); ctx.globalAlpha=a*ag; ctx.beginPath(); ctx.arc(q[0],q[1],7+5*(1-ag),0,7); ctx.fillStyle=PINK; ctx.fill(); ctx.lineWidth=2.5; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();});}
 // Beschriftungen
 SECT.forEach(([key,name,col,parts,ll])=>{const la=(o.lab||{})[key]||0; if(la<=0) return; const q=p([ll>180?ll-360:ll,-74]); ctx.save(); ctx.globalAlpha=a*la; ctx.font=`800 ${o.k>1.5?40:34}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=7; ctx.lineJoin='round'; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.strokeText(name,q[0],q[1]); ctx.fillStyle=col; ctx.fillText(name,q[0],q[1]); ctx.restore();});
 if(o.freeLab>0){const q=p([-120,-78]); ctx.save(); ctx.globalAlpha=a*o.freeLab; ctx.font=`800 30px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=7; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.strokeText('Marie-Byrd-Land',q[0],q[1]); ctx.fillStyle='#fff'; ctx.fillText('Marie-Byrd-Land',q[0],q[1]); ctx.restore();}
 if(o.pole>0){const q=p([0,-90]); ctx.save(); ctx.globalAlpha=a*o.pole; for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],10+ph*46,0,7); ctx.strokeStyle=PINK; ctx.globalAlpha=a*o.pole*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a*o.pole; ctx.beginPath(); ctx.arc(q[0],q[1],10,0,7); ctx.fillStyle=PINK; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.font=`800 28px ${FD}`; ctx.fillStyle='#0B1C2A'; ctx.textAlign='center'; ctx.fillText('Südpol',q[0],q[1]+44); ctx.restore();}
 ctx.restore(); rr(ctx,PX,PY,PW,PH,30); ctx.strokeStyle='rgba(246,241,231,0.55)'; ctx.lineWidth=3; ctx.stroke();
 if(o.frozen>0){ctx.save(); ctx.globalAlpha=a*clamp(o.frozen*1.4); ctx.translate(CX,CY+250); ctx.rotate(-0.12); const k=1+0.4*Math.max(0,1-o.frozen*3); ctx.scale(k,k); ctx.font=`800 64px ${FD}`; const w=ctx.measureText('EINGEFROREN').width+60; ctx.strokeStyle='#7FD0FF'; ctx.lineWidth=7; rr(ctx,-w/2,-52,w,92,16); ctx.fillStyle='rgba(8,22,36,0.85)'; ctx.fill(); ctx.stroke(); ctx.fillStyle='#BFE6FF'; ctx.textAlign='center'; ctx.fillText('EINGEFROREN',0,18); ctx.restore();}
 ctx.restore();}
const ALL=v=>Object.fromEntries(SECT.map(s=>[s[0],v]));
const seq=(u,t0,dt=0.18)=>Object.fromEntries(SECT.map((s,i)=>[s[0],A(u,t0+i*dt,0.25)]));
const PEN=[-63,-70];

// ---------- Hintergrund-Kameras (Hauptkarte nur bis 80° S) ----------
const vW=viewBox([-180,-62,180,75]), vS=viewBox([-180,-79,180,-40]), vDrake=viewBox([-90,-72,-30,-38]), vAus=viewBox([90,-72,180,-25]), vInd=viewBox([0,-72,90,-25]), vPac=viewBox([-170,-78,-80,-40]);

const scenes=[
 {head:'Wem gehört die Antarktis?', headInstant:true, say:S_say[0], cams:[{at:0,view:vS},{at:sc=>wt(sc,'Drei')-0.2,view:vDrake,fly:1.2},{at:sc=>wt(sc,'niemandem')-0.2,view:vS,fly:1.2}],
  pops:[sc=>wt(sc,'Sieben'),sc=>wt(sc,'Drei'),sc=>wt(sc,'niemandem')],
  over:[e=>{const {u,sc,ctx}=e; const t7=wt(sc,'Sieben'), t3=wt(sc,'Drei'), tn=wt(sc,'niemandem'), tw=wt(sc,'Wie');
   panel(e,1,{sect:seq(u,t7+0.1,0.12),lab:ALL(0),overlap:win(u,t3,tn,0.25),dim:A(u,tn,0.4)*0.7,hi:{}});
   pop(ctx,'7 Länder',win(u,t7,t3-0.1,0.15),u,t7,620,'#fff',120);
   pop(ctx,'3 wollen dasselbe',win(u,t3,tn-0.05,0.15),u,t3,620,PINK,90);
   pop(ctx,'… und niemandem gehört sie?',A(u,tn,0.2),u,tn,620,'#fff',62);}]},
 {head:'Torte aus Ansprüchen', say:S_say[1], cams:[{at:0,view:vS,fly:1.0},{at:sc=>wt(sc,'Australien')-0.3,view:vAus,fly:1.3},{at:sc=>wt(sc,'Norwegen')-0.3,view:vInd,fly:1.4},{at:sc=>wt(sc,'Neuseeland')-0.3,view:vPac,fly:1.2}],
  pops:[sc=>wt(sc,'Tortenstücke'),sc=>wt(sc,'42'),sc=>wt(sc,'Norwegen'),sc=>wt(sc,'Frankreich'),sc=>wt(sc,'Neuseeland')],
  over:[e=>{const {u,sc,ctx}=e; const ta=wt(sc,'Australien'), t42=wt(sc,'42'), tn=wt(sc,'Norwegen'), tf=wt(sc,'Frankreich'), tz=wt(sc,'Neuseeland');
   const hi={AUS:win(u,ta,tn,0.3),NOR:win(u,tn,tf,0.25),FRA:win(u,tf,tz,0.25),NZL:A(u,tz,0.25)};
   const lab={AUS:A(u,ta,0.3),NOR:A(u,tn,0.3),FRA:A(u,tf,0.3),NZL:A(u,tz,0.3)};
   panel(e,1,{sect:ALL(1),hi,lab,dim:A(u,ta-0.1,0.4)*0.75,pole:win(u,wt(sc,'Südpol'),ta,0.25)});
   if(u>=t42){const v=Math.round(42*ease(clamp((u-t42)/0.9))); chip(ctx,`Australien: ≈ ${v} %`,1330,win(u,t42,tn,0.25),'#0B1C2A','rgba(255,138,61,0.97)',44);}
   chip(ctx,'Norwegen · Frankreich · Neuseeland',1330,A(u,tn+0.1,0.3),'#fff','rgba(11,28,42,0.93)',36);}]},
 {head:'Dasselbe Eis, drei Länder', say:S_say[2], cams:[{at:0,view:vDrake,fly:0.9},{at:sc=>wt(sc,'Argentinien')-0.2,view:viewBox([-80,-70,-50,-50]),fly:2.5}],
  pops:[sc=>wt(sc,'seltsam'),sc=>wt(sc,'Argentinien'),sc=>wt(sc,'Chile'),sc=>wt(sc,'Großbritannien'),sc=>wt(sc,'drei Länder')],
  over:[e=>{const {u,sc,ctx}=e; const ts=wt(sc,'Halbinsel'), ta=wt(sc,'Argentinien'), tc=wt(sc,'Chile'), tg=wt(sc,'Großbritannien'), td=wt(sc,'Dasselbe');
   const z=eout(clamp((u-ts+0.3)/1.4)); const lab={ARG:A(u,ta,0.3),CHL:A(u,tc,0.3),GBR:A(u,tg,0.3)}; const sect={...ALL(1),ARG:1,CHL:1,GBR:1};
   panel(e,1,{k:1+1.2*z,c:[lerp(0,PEN[0],z),lerp(-90,PEN[1],z)],sect,hi:{ARG:lab.ARG,CHL:lab.CHL,GBR:lab.GBR},dim:0.8,lab,overlap:A(u,td,0.3)});
   chip(ctx,'Antarktische Halbinsel',1330,win(u,ts,ta,0.25),'#0B1C2A');
   pop(ctx,'3 Ansprüche, 1 Stück',A(u,td,0.2),u,td,600,PINK,84);}]},
 {head:'Das Land, das keiner will', say:S_say[3], cams:[{at:0,view:vPac,fly:1.0},{at:sc=>wt(sc,'größte')-0.3,view:viewBox([-160,-79,-80,-55]),fly:2.2}],
  pops:[sc=>wt(sc,'keiner'),sc=>wt(sc,'Marie-Byrd-Land'),sc=>wt(sc,'größte')],
  over:[e=>{const {u,sc,ctx}=e; const tk=wt(sc,'keiner'), tm=wt(sc,'Marie-Byrd-Land'), tg=wt(sc,'größte'); const z=1-eout(clamp(u/1.0));
   panel(e,1,{k:1+1.6*z,c:[lerp(0,PEN[0],z),lerp(-90,PEN[1],z)],sect:ALL(1),dim:0.6,free:A(u,tk-0.2,0.4),freeHi:A(u,tm,0.3),freeLab:A(u,tm,0.3)});
   chip(ctx,'von keinem Staat beansprucht',1330,win(u,tk,tg,0.25),'#fff','rgba(11,28,42,0.93)');
   chip(ctx,'größtes unbeanspruchtes Gebiet der Erde',1330,A(u,tg,0.25),'#0B1C2A','rgba(255,224,102,0.96)',34);}]},
 {head:'1959: der Antarktis-Vertrag', say:S_say[4], cams:[{at:0,view:vW,fly:1.0},{at:sc=>wt(sc,'eingefroren')-0.3,view:vS,fly:1.6}],
  pops:[sc=>wt(sc,'1959'),sc=>wt(sc,'Zwölf'),sc=>wt(sc,'eingefroren'),sc=>wt(sc,'anerkannt'),sc=>wt(sc,'aufgegeben'),sc=>wt(sc,'verboten')],
  over:[e=>{const {u,sc,ctx}=e; const t59=wt(sc,'1959'), tz=wt(sc,'Zwölf'), te=wt(sc,'eingefroren'), ta=wt(sc,'anerkannt'), tg=wt(sc,'aufgegeben'), tv=wt(sc,'verboten');
   panel(e,A(u,tz-0.1,0.4),{sect:ALL(1),free:1,frozen:A(u,te,0.6)});
   pop(ctx,'1959',win(u,t59,tz-0.1,0.15),u,t59,820,'#fff',200);
   chip(ctx,'12 Staaten unterschreiben',1330,win(u,tz,te,0.25),'#0B1C2A');
   chip(ctx,'✕ nicht anerkannt',1330,win(u,ta,tg,0.2),'#fff','rgba(229,72,77,0.95)',40);
   chip(ctx,'✕ nicht aufgegeben',1330,win(u,tg,tv-0.3,0.2),'#fff','rgba(229,72,77,0.95)',40);
   chip(ctx,'✕ keine neuen Ansprüche',1330,A(u,tv-0.3,0.2),'#fff','rgba(229,72,77,0.95)',40);}]},
 {head:'Nur Frieden und Forschung', say:S_say[5], cams:[{at:0,view:vS,fly:1.0},{at:sc=>wt(sc,'Forschungsstationen')-0.3,view:vDrake,fly:2.0},{at:sc=>wt(sc,'50')-0.3,view:vW,fly:1.5}],
  pops:[sc=>wt(sc,'Militärbasen'),sc=>wt(sc,'Waffentests'),sc=>wt(sc,'70'),sc=>wt(sc,'50')],
  over:[e=>{const {u,sc,ctx}=e; const tm=wt(sc,'Militärbasen'), tw=wt(sc,'Waffentests'), ts=wt(sc,'Heute'), t70=wt(sc,'70'), t50=wt(sc,'50');
   panel(e,1,{sect:ALL(1),free:1,frozen:1-A(u,0,0.8)*0.6,dim:0.5,st:clamp((u-t70+0.4)/1.6)});
   chip(ctx,'Frieden + Forschung',1330,win(u,0.2,tm,0.25),'#0B1C2A');
   const am=win(u,tm,ts,0.2), aw=win(u,tw,ts,0.2); chip(ctx,'Militärbasen',1330,am,'#fff','rgba(11,28,42,0.93)'); xmark(ctx,L+340,1330,A(u,tm+0.15,0.2)*am,0.8);
   chip(ctx,'Waffentests',1400,aw,'#fff','rgba(11,28,42,0.93)'); xmark(ctx,L+300,1400,A(u,tw+0.15,0.2)*aw,0.8);
   if(u>=t70){const v=Math.round(70*ease(clamp((u-t70)/1.0))); chip(ctx,`> ${v} Forschungsstationen`,1330,win(u,t70,t50,0.25),'#fff','rgba(255,61,129,0.95)',40);}
   chip(ctx,'> 50 Vertragsstaaten',1330,A(u,t50,0.25),'#0B1C2A');}]},
 {head:'Und der Bergbau?', say:S_say[6], cams:[{at:0,view:vW,fly:1.0},{at:sc=>wt(sc,'2048')-0.3,view:vS,fly:2.0}],
  pops:[sc=>wt(sc,'1998'),sc=>wt(sc,'verboten'),sc=>wt(sc,'2048'),sc=>wt(sc,'nicht')],
  over:[e=>{const {u,sc,ctx}=e; const t98=wt(sc,'1998'), tv=wt(sc,'verboten'), t48=wt(sc,'2048'), ta=wt(sc,'Aufgehoben');
   panel(e,1,{sect:ALL(1),free:1,dim:0.5});
   // Zeitleiste 1998 -> 2048
   const al=A(u,t98,0.3); if(al>0){ctx.save(); ctx.globalAlpha=al; const x0=200,x1=880,y=1180; ctx.fillStyle='rgba(8,22,36,0.92)'; rr(ctx,150,1095,780,150,24); ctx.fill();
    const pr=clamp((u-t48+0.2)/0.8); ctx.strokeStyle='rgba(255,255,255,0.35)'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x1,y); ctx.stroke();
    ctx.strokeStyle=GOLD; ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x0+(x1-x0)*pr,y); ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font=`800 40px ${FD}`; ctx.textAlign='left'; ctx.fillText('1998',x0-10,y-30); ctx.font=`700 26px ${FB}`; ctx.fillText('Bergbau verboten',x0-10,y+48);
    if(pr>0){ctx.globalAlpha=al*clamp(pr*2); ctx.textAlign='right'; ctx.font=`800 40px ${FD}`; ctx.fillStyle=GOLD; ctx.fillText('2048',x1+10,y-30); ctx.font=`700 26px ${FB}`; ctx.fillText('Überprüfung möglich',x1+10,y+48);}
    ctx.restore();}
   pop(ctx,'Bergbau verboten',win(u,tv,t48-0.1,0.15),u,tv,820,'#fff',96);
   chip(ctx,'Verbot gilt weiter',1330,A(u,ta,0.25),'#0B1C2A','rgba(127,203,143,0.97)',40);}]},
 {say:S_say[7], cams:[{at:0,view:vS,fly:1.2},{at:1.4,view:vW,fly:4.5}],
  under:[],
  over:[],
  top:[e=>{const {ctx,u,sc}=e; const a=eout(clamp((u-0.2)/0.6)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.92)'; rr(ctx,L,560,780,470,32); ctx.fill();
   const q='Wusstest du das schon?'; const z=fit(ctx,q,800,76,52,700,FD); ctx.font=`800 ${z}px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(q,L+40,670);
   const rows=[['heart','Like da lassen','Like'],['follow','Folgen für mehr','folg'],['share','Teilen mit jemandem','schick']];
   rows.forEach(([ic,txt,f],i)=>{const ai=clamp((u-wt(sc,f)+0.2)/0.35); if(ai<=0) return; const y=790+i*105, x=L+70; ctx.save(); ctx.globalAlpha=a*ai; ctx.translate(x,y-14); const s=1+0.25*Math.max(0,1-(u-wt(sc,f))/0.4);
    ctx.scale(s,s); ctx.fillStyle=C.target; ctx.strokeStyle=C.target; ctx.lineWidth=5; ctx.lineJoin='round'; ctx.lineCap='round';
    if(ic==='heart'){ctx.beginPath(); ctx.moveTo(0,16); ctx.bezierCurveTo(-30,-4,-18,-28,0,-12); ctx.bezierCurveTo(18,-28,30,-4,0,16); ctx.fill();}
    if(ic==='follow'){ctx.beginPath(); ctx.arc(0,-4,22,0,7); ctx.fill(); ctx.globalCompositeOperation='destination-out'; ctx.fillRect(-3,-16,6,26); ctx.fillRect(-13,-6,26,6); ctx.globalCompositeOperation='source-over';}
    if(ic==='share'){ctx.beginPath(); ctx.moveTo(-20,18); ctx.quadraticCurveTo(-18,-8,14,-8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10,-22); ctx.lineTo(26,-8); ctx.lineTo(10,6); ctx.closePath(); ctx.fill();}
    ctx.restore(); ctx.save(); ctx.globalAlpha=a*ai; ctx.font=`800 42px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(txt,x+60,y,620); ctx.restore();});
   ctx.restore();}]}
];
return {tag:'GEOFY · GRENZ-KURIOSITÄTEN #8', scenes, wt};
}
