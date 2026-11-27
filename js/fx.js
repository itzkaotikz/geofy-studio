// Geofy FX-Baukasten (Look v3): wiederverwendbare Animationen für story.js.
// Einbinden: in story.js  const fx = FX.make({big, chip, fill, P});  danach fx.pop(...), fx.counter(...), ...
// Alle Zeitangaben in Sekunden relativ zur Szene (u). Alle Funktionen zeichnen nichts, wenn a <= 0.
(function(){
const {C,FD,FB,L,clamp,eout,rr}=KV;
const PK='#FF3B7F', GO='#FFE066', CY='#7FD0FF', TE='#33D1B0', RD='#E5484D';
// Einblenden ab t0 über d Sekunden / Fenster zwischen t0 und t1
const A=(u,t0,d=0.35)=>clamp((u-t0)/d);
const win=(u,t0,t1,d=0.3)=>clamp((u-t0)/d)*(1-clamp((u-t1)/d));
// Kamera: Ansicht um (lon,lat) mit wdeg Grad Breite (auch über die Datumsgrenze)
const VW=(lon,lat,wdeg)=>({lon,lat,scale:920/(wdeg*Math.PI/180)});

function make({big,chip,fill,P}){
 // Großes Wort/Zahl mit Pop-in
 function pop(ctx,txt,a,u,t0,y=600,col='#fff',size=130){if(a<=0||window.NO_CHIPS) return; const k=1+0.3*Math.max(0,1-(u-t0)/0.25); ctx.save(); ctx.translate(540,y); ctx.scale(k,k); ctx.translate(-540,-y); big(ctx,txt,a,y,col,size); ctx.restore();}
 // Farbblitz über das ganze Bild (col als 'rgba(r,g,b,' ohne Alpha)
 function flash(ctx,u,t0,col='rgba(255,224,102,',m=0.28){const a=1-clamp((u-t0)/0.45); if(u<t0||a<=0) return; ctx.save(); ctx.fillStyle=col+(a*m)+')'; ctx.fillRect(0,0,1080,1920); ctx.restore();}
 // Pille oben rechts (Zeitleiste, Zähler 1/4, PLAN B …)
 function badge(ctx,txt,a,col=PK){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 38px ${FB}`; const w=ctx.measureText(txt).width+44; const x=1080-L-w, y=250; ctx.fillStyle=col; rr(ctx,x,y,w,60,30); ctx.fill(); ctx.fillStyle='#fff'; ctx.fillText(txt,x+22,y+43); ctx.restore();}
 // Hochzählende Zahl (deutsches Format), optional Nachkommastellen
 function counter(ctx,from,to,a,u,t0,y=600,size=150,suf='',dur=1.0,dec=0){if(a<=0) return; const k=eout(clamp((u-t0)/dur)); const v=from+(to-from)*k; big(ctx,v.toLocaleString('de-DE',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf,a,y,'#fff',size);}
 // Land um (dx,dy) Pixel verschoben füllen
 function fillS(e,k,col,a,dx=0,dy=0,lw=2.5){if(a<=0) return; const {ctx}=e; ctx.save(); ctx.translate(dx,dy); fill(e,k,col,a,lw); ctx.restore();}
 // Länder springen vom gemeinsamen Mittelpunkt auseinander (k 0..1)
 function shatter(e,ids,k,cols,a,amt=40){if(a<=0) return; const {path}=e; const F=id=>(window.G10&&G10[id])?{type:'Feature',geometry:G10[id]}:KV.byId().get(id); const cs=ids.map(i=>path.centroid(F(i))); const cx=cs.reduce((s,c)=>s+c[0],0)/cs.length, cy=cs.reduce((s,c)=>s+c[1],0)/cs.length;
  ids.forEach((i,n)=>{const c=cs[n]; const d=Math.hypot(c[0]-cx,c[1]-cy)||1; const m=eout(k)*amt*Math.min(1.6,0.5+d/250); fillS(e,i,cols?cols[n%cols.length]:RD,a,(c[0]-cx)/d*m,(c[1]-cy)/d*m,2);});}
 // Weißer Kreis mit Fragezeichen auf einer Koordinate
 function qmark(e,ll,a){const q=P(e,ll); if(!q||a<=0) return; const {ctx}=e; ctx.save(); ctx.globalAlpha=a; ctx.translate(q[0],q[1]); const s=1+0.15*Math.sin(e.t*6); ctx.scale(s,s); ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(0,0,42,0,7); ctx.fill(); ctx.fillStyle=C.bg; ctx.font=`800 56px ${FD}`; ctx.textAlign='center'; ctx.fillText('?',0,20); ctx.restore();}
 // Flimmernde Pixelwolke (digital, Daten)
 function pixels(e,ll,a,R=120,cell=18){if(a<=0) return; const q=P(e,ll); if(!q) return; const {ctx,t}=e; ctx.save(); for(let i=-6;i<=6;i++) for(let j=-6;j<=6;j++){const d=Math.hypot(i,j)*cell; if(d>R) continue; const fl=0.5+0.5*Math.sin(t*7+i*1.7+j*2.3); const al=a*fl*(1-d/R); if(al<0.05) continue; ctx.globalAlpha=al; ctx.fillStyle=(i+j)%3?CY:'#FFFFFF'; ctx.fillRect(q[0]+i*cell-cell/2+1,q[1]+j*cell-cell/2+1,cell-3,cell-3);} ctx.restore();}
 // Wellenringe (Wasser, Ausbreitung, Signal)
 function ripple(e,ll,a,col='#3FA9FF'){if(a<=0) return; const q=P(e,ll); if(!q) return; const {ctx,t}=e; ctx.save(); for(let r=0;r<3;r++){const ph=((t*0.6)+r/3)%1; ctx.beginPath(); ctx.arc(q[0],q[1],20+ph*160,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph)*0.9; ctx.lineWidth=4; ctx.stroke();} ctx.restore();}
 // Glas-Panel als Bühne für Grafiken
 function panel(ctx,a,x=150,y=720,w=780,h=620){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; rr(ctx,x,y,w,h,32); ctx.fillStyle='rgba(6,20,40,0.82)'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.16)'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();}
 // Balkenvergleich: rows=[[Beschriftung, Anteil 0..1, Farbe], …], t0 Startzeit (Balken nacheinander)
 function bars(ctx,a,u,t0,rows,title='',y0=800){if(a<=0) return; const x=130,w=820,h=110+rows.length*150; ctx.save(); ctx.globalAlpha=a; rr(ctx,x-40,y0,w+80,h,32); ctx.fillStyle='rgba(6,20,40,0.8)'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.16)'; ctx.lineWidth=2; ctx.stroke();
  if(title){ctx.fillStyle='#fff'; ctx.font=`700 34px ${FB}`; ctx.fillText(title,x,y0+60);}
  rows.forEach(([lab,share,col],i)=>{const y=y0+(title?130:90)+i*150, k=A(u,t0+i*0.4,0.8); ctx.fillStyle='#fff'; ctx.font=`700 32px ${FB}`; ctx.fillText(lab,x,y-14); ctx.fillStyle='rgba(255,255,255,0.12)'; rr(ctx,x,y,w,54,14); ctx.fill(); ctx.fillStyle=col; rr(ctx,x,y,Math.max(12,w*share*eout(k)),54,14); ctx.fill();}); ctx.restore();}
 // Pegel/Messlatte (fill 0..1)
 function gauge(ctx,x,y0,hpx,a,fill01,label){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(6,20,40,0.72)'; rr(ctx,x-60,y0-hpx-40,120,hpx+80,24); ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=2; ctx.stroke(); const h=hpx*eout(fill01); ctx.fillStyle='#3FA9FF'; rr(ctx,x-30,y0-h,60,h,10); ctx.fill(); ctx.fillStyle='#fff'; ctx.font=`700 26px ${FB}`; ctx.textAlign='center'; ctx.fillText(label,x,y0+30); ctx.restore();}
 // Stempel (schräg, knallt rein)
 function stamp(ctx,txt,a,u,t0,y=1080,col=PK){if(a<=0) return; const k=1+1.2*Math.max(0,1-(u-t0)/0.25); ctx.save(); ctx.globalAlpha=a; ctx.translate(540,y); ctx.rotate(-0.12); ctx.scale(k,k); ctx.strokeStyle=col; ctx.lineWidth=8; ctx.font=`800 60px ${FD}`; const w=ctx.measureText(txt).width+60; rr(ctx,-w/2,-50,w,100,14); ctx.stroke(); ctx.fillStyle=col; ctx.textAlign='center'; ctx.fillText(txt,0,20); ctx.restore();}
 // Rotes X (gesperrt, verboten)
 function xmark(ctx,x,y,a,s=1){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.scale(s*(1+0.4*(1-a)),s*(1+0.4*(1-a))); ctx.lineCap='round'; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineWidth=20; ctx.beginPath(); ctx.moveTo(-22,-22); ctx.lineTo(22,22); ctx.moveTo(22,-22); ctx.lineTo(-22,22); ctx.stroke(); ctx.strokeStyle=RD; ctx.lineWidth=11; ctx.stroke(); ctx.restore();}
 // Schiff-Icon und Schiffe entlang einer Route
 function ship(ctx,x,y,ang,s=1,col='#fff',a=1){ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.rotate(ang); ctx.scale(s,s); ctx.beginPath(); ctx.moveTo(16,0); ctx.lineTo(6,-7); ctx.lineTo(-14,-7); ctx.lineTo(-14,7); ctx.lineTo(6,7); ctx.closePath(); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=2.5; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.stroke(); ctx.restore();}
 function flow(e,pts,n,speed,a,cols=['#fff',GO,CY]){if(a<=0) return; const q=pts.map(p=>P(e,p)).filter(Boolean); const L0=[0]; for(let i=1;i<q.length;i++) L0.push(L0[i-1]+Math.hypot(q[i][0]-q[i-1][0],q[i][1]-q[i-1][1])); const tot=L0[L0.length-1];
  for(let k=0;k<n;k++){const f=((k/n)+e.t*speed)%1, d=f*tot; let i=1; while(i<L0.length-1&&L0[i]<d) i++; const r=(d-L0[i-1])/Math.max(1,L0[i]-L0[i-1]); const x=q[i-1][0]+(q[i][0]-q[i-1][0])*r, y=q[i-1][1]+(q[i][1]-q[i-1][1])*r; ship(e.ctx,x,y,Math.atan2(q[i][1]-q[i-1][1],q[i][0]-q[i-1][0]),1.15,cols[k%cols.length],a*Math.min(1,f*8,(1-f)*8));}}
 // Punkte, die von Startpositionen zu Zielpositionen strömen (Menschen, Migration)
 function swarm(e,from,to,a,k,col='#fff'){if(a<=0) return; const {ctx,t}=e; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle=col; from.forEach((s,i)=>{const g=to[i%to.length]; const kk=eout(clamp(k*1.4-(i%17)/17*0.4)); const q=P(e,[s[0]+(g[0]-s[0])*kk,s[1]+(g[1]-s[1])*kk]); if(!q) return; ctx.beginPath(); ctx.arc(q[0],q[1],3.4,0,7); ctx.fill();}); ctx.restore();}
 return {A,win,VW,pop,flash,badge,counter,fillS,shatter,qmark,pixels,ripple,panel,bars,gauge,stamp,xmark,ship,flow,swarm,COL:{PK,GO,CY,TE,RD}};
}
window.FX={make,A,win,VW};
})();
