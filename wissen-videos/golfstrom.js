// Story: Was wäre, wenn …? #4 – Der Golfstrom / AMOC stoppt
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', OR='#FF7A3D', WA='#7FD0FF', BL='#4D9BFF', RED='#E5484D';
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));
// Catmull-Rom smoothing of a lon/lat route
function smooth(pts,n=12){const o=[]; for(let i=0;i<pts.length-1;i++){const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)]; for(let k=0;k<n;k++){const t=k/n,t2=t*t,t3=t2*t; o.push([0,1].map(d=>0.5*((2*p1[d])+(-p0[d]+p2[d])*t+(2*p0[d]-5*p1[d]+4*p2[d]-p3[d])*t2+(-p0[d]+3*p1[d]-3*p2[d]+p3[d])*t3)));}} o.push(pts[pts.length-1]); return o;}
function route(e,pts,col,prog,w=14,alpha=1,t=0,flow=true){if(prog<=0) return; const {ctx}=e; const q=pts.map(p=>P(e,p)); const n=Math.max(2,Math.floor(q.length*Math.min(1,prog))); ctx.save(); ctx.globalAlpha=alpha; ctx.lineCap='round'; ctx.lineJoin='round';
 ctx.strokeStyle='rgba(5,14,24,0.7)'; ctx.lineWidth=w+8; ctx.beginPath(); q.slice(0,n).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke();
 ctx.strokeStyle=col; ctx.lineWidth=w; ctx.stroke();
 if(flow){ctx.strokeStyle='rgba(255,255,255,0.75)'; ctx.lineWidth=w*0.32; ctx.setLineDash([2,w*2.6]); ctx.lineDashOffset=-t*60; ctx.stroke();}
 if(prog>=1){const a=q[q.length-1],b=q[q.length-3]||q[0]; const an=Math.atan2(a[1]-b[1],a[0]-b[0]); ctx.setLineDash([]); ctx.fillStyle=col; ctx.strokeStyle='rgba(5,14,24,0.7)'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(a[0]+Math.cos(an)*w*1.5,a[1]+Math.sin(an)*w*1.5); ctx.lineTo(a[0]+Math.cos(an+2.4)*w*1.6,a[1]+Math.sin(an+2.4)*w*1.6); ctx.lineTo(a[0]+Math.cos(an-2.4)*w*1.6,a[1]+Math.sin(an-2.4)*w*1.6); ctx.closePath(); ctx.stroke(); ctx.fill();}
 ctx.restore();}
// Schematische Strömungen (Lon/Lat, vereinfacht)
const GULF=smooth([[-88,24],[-84,24.5],[-80,26.5],[-77,31],[-74,35.5],[-68,39.5]]);
const NAC=smooth([[-68,39.5],[-58,42.5],[-48,46],[-38,50],[-28,54],[-18,58],[-8,62],[2,66],[10,70]]);
const WARM=GULF.concat(NAC.slice(1));
const COLD=smooth([[-12,72],[-18,66],[-26,60],[-34,52],[-42,42],[-46,30],[-40,16],[-36,2],[-30,-12],[-22,-26]]);
const TROP=smooth([[-20,8],[-35,12],[-52,14],[-70,16],[-82,20],[-88,24]]);
const vAtl=viewBox([-95,-8,30,76]), vNAt=viewBox([-90,18,25,74]), vEu=viewBox([-30,34,35,72]), vNorth=viewBox([-35,40,30,72]);
const EU=['GBR','IRL','NOR','ISL','FRA','DEU','ESP','PRT','DNK','NLD','BEL','SWE','FIN','POL'];
const scenes=[
 {head:'Europas Heizung', headInstant:true, say:S_say[0], cams:[{at:0,view:vAtl},{at:0.3,view:vNAt,fly:3.5}],
  under:[e=>{const {u,sc}=e; cs(e,EU,GOLD,0.35*clamp((u-wt(sc,'Europas'))/0.6));}],
  over:[e=>{const {u,sc,ctx,t}=e; chip(ctx,'Was wäre, wenn die Heizung ausfällt?',1180,clamp((u-wt(sc,'Was wäre'))/0.4)*(1-clamp((u-wt(sc,'Gemeint'))/0.4)));
   const a=clamp((u-wt(sc,'AMOC'))/0.4); if(a>0) big(ctx,'AMOC',a*(1-clamp((u-wt(sc,'Sie bringt'))/0.4)),680,'#fff',150);
   const r=clamp((u-wt(sc,'warmes Wasser'))/2.6); route(e,WARM,OR,r,16,1,t); chip(ctx,'warmes Wasser: Tropen → Norden',1180,clamp((u-wt(sc,'warmes Wasser'))/0.4));
   tag(e,[-70,18],'Tropen',clamp((u-wt(sc,'Tropen'))/0.4),-20,0,'#fff',34); tag(e,[8,57],'Europa',clamp((u-wt(sc,'Norden'))/0.4),0,0,'#0B1C2A',34);}]},
 {head:'Golfstrom ≠ AMOC', say:S_say[1], cams:[{at:0,view:vNAt,fly:1.0},{at:0.5,view:vAtl,fly:3.5}],
  under:[e=>{const {u,sc}=e; cs(e,EU,GOLD,0.25);}],
  over:[e=>{const {u,sc,ctx,t}=e; route(e,WARM,OR,1,16,0.9,t);
   chip(ctx,'Golfstrom: vom Wind angetrieben',1180,clamp((u-wt(sc,'Genau'))/0.4)*(1-clamp((u-wt(sc,'Die AMOC'))/0.4)));
   const c=clamp((u-wt(sc,'kaltes'))/2.4); route(e,COLD,BL,c,16,1,t); chip(ctx,'AMOC = Förderband: warm nach Norden, kalt nach Süden',1180,clamp((u-wt(sc,'Die AMOC'))/0.4));
   tag(e,[-38,55],'sinkt ab',clamp((u-wt(sc,'kaltes'))/0.4),-60,0,'#fff',30);}]},
 {head:'Schwächste seit 1.600 Jahren', say:S_say[2], cams:[{at:0,view:vAtl,fly:1.0},{at:0.5,view:vNAt,fly:3.0}],
  under:[e=>{}],
  over:[e=>{const {u,sc,ctx,t}=e; const w=clamp((u-wt(sc,'1950'))/2.5); route(e,WARM,OR,1,16-6*w,1-0.5*w,t); route(e,COLD,BL,1,16-6*w,1-0.5*w,t);
   const a=clamp((u-wt(sc,'1.600'))/0.4); if(a>0) big(ctx,u<wt(sc,'Seit 1950')?'seit ≥ 1.600 Jahren':'−15 % seit 1950',a,680,'#fff',u<wt(sc,'Seit 1950')?84:120);
   chip(ctx,'so schwach wie seit mindestens 1.600 Jahren nicht',1180,clamp((u-wt(sc,'1.600'))/0.4)*(1-clamp((u-wt(sc,'Seit 1950'))/0.4))); chip(ctx,'Messwerte und Rekonstruktionen, Details zu prüfen',1180,clamp((u-wt(sc,'Seit 1950'))/0.4),'#fff','rgba(229,72,77,0.92)');}]},
 {head:'Wann könnte sie kippen?', say:S_say[3], cams:[{at:0,view:vNAt,fly:1.0},{at:0.5,view:vAtl,fly:3.0}],
  under:[e=>{}],
  over:[e=>{const {u,sc,ctx,t}=e; route(e,WARM,OR,1,10,0.5,t,false); route(e,COLD,BL,1,10,0.5,t,false);
   const a=eout(clamp((u-wt(sc,'2023'))/0.5)); if(a>0){const x0=140,x1=940,y=730; const X=v=>x0+(v-2025)/(2095-2025)*(x1-x0);
    ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,70,530,940,340,28); ctx.fill();
    ctx.strokeStyle='#fff'; ctx.lineWidth=14; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x1,y); ctx.stroke();
    const k=clamp((u-wt(sc,'2025'))/0.8); ctx.strokeStyle=RED; ctx.lineWidth=14; ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x0+(x1-x0)*k,y); ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font=`800 38px ${FD}`; ctx.textAlign='center'; ctx.fillText('2025',x0,y+60); ctx.fillText('2095',x1,y+60);
    const m=clamp((u-wt(sc,'2057'))/0.4); if(m>0){ctx.globalAlpha=a*m; ctx.fillStyle=GOLD; ctx.beginPath(); ctx.arc(X(2057),y,22,0,7); ctx.fill(); ctx.font=`800 64px ${FD}`; ctx.fillText('≈ 2057',X(2057),y-45);}
    ctx.globalAlpha=a; ctx.font=`700 34px ${FB}`; ctx.fillStyle='#cfe3f5'; ctx.fillText('Studie 2023: Kollaps zwischen 2025 und 2095 möglich',540,585); ctx.restore();}
   chip(ctx,'Andere Forscher: eher im nächsten Jahrhundert',1180,clamp((u-wt(sc,'Andere'))/0.4));}]},
 {head:'Und dann?', say:S_say[4], cams:[{at:0,view:vAtl,fly:1.0},{at:0.5,view:vEu,fly:3.0}],
  under:[e=>{const {u,sc}=e; cs(e,EU,BL,0.55*clamp((u-wt(sc,'kälter'))/1.0)); cs(e,['BRA','VEN','COL','NGA','GHA','CIV'],OR,0.45*clamp((u-wt(sc,'Tropen'))/1.0));}],
  over:[e=>{const {u,sc,ctx,t}=e; route(e,WARM,OR,1,8,0.25,t,false);
   big(ctx,'Was dann?',clamp((u-wt(sc,'Was dann'))/0.4)*(1-clamp((u-wt(sc,'Europa würde'))/0.4)),680,'#fff',130);
   chip(ctx,'Europa kälter',1180,clamp((u-wt(sc,'kälter'))/0.4)*(1-clamp((u-wt(sc,'Eine plötzliche'))/0.4)),'#fff','rgba(77,155,255,0.95)'); chip(ctx,'Tropen heizen sich weiter auf',1250,clamp((u-wt(sc,'Tropen'))/0.4),'#0B1C2A','rgba(255,159,67,0.96)');
   chip(ctx,'keine plötzliche Eiszeit wie im Film',1180,clamp((u-wt(sc,'Eine plötzliche'))/0.4)*(1-clamp((u-wt(sc,'Wie stark'))/0.4))); chip(ctx,'Ausmaß unsicher: bis zu 5–10 °C kälter (Schätzungen)',1180,clamp((u-wt(sc,'Wie stark'))/0.4),'#fff','rgba(229,72,77,0.92)');}]},
 {head:'Was sicher ist', say:S_say[5], cams:[{at:0,view:vEu,fly:1.0},{at:0.5,view:vAtl,fly:3.5}],
  under:[e=>{cs(e,EU,GOLD,0.2);}],
  over:[e=>{const {u,sc,ctx,t}=e; route(e,WARM,OR,1,12,0.7,t); route(e,COLD,BL,1,12,0.7,t);
   chip(ctx,'Messreihen noch kurz',1180,clamp((u-wt(sc,'Messreihen'))/0.4)*(1-clamp((u-wt(sc,'Zeitpunkt'))/0.4))); chip(ctx,'Zeitpunkt offen',1180,clamp((u-wt(sc,'Zeitpunkt'))/0.4)*(1-clamp((u-wt(sc,'Forscher'))/0.4)));
   chip(ctx,'weniger Emissionen senken das Risiko',1180,clamp((u-wt(sc,'Forscher'))/0.4),'#0B1C2A','rgba(120,230,170,0.96)');}]},
 {say:S_say[6], cams:[{at:0,view:vAtl,fly:1.2},{at:1.4,view:vAtl,fly:4.5}],
  under:[],
  over:[],
  top:[e=>{const {ctx,u,sc}=e; const a=eout(clamp((u-0.2)/0.6)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.92)'; rr(ctx,L,560,780,470,32); ctx.fill();
   const q='Wusstest du das schon?'; const z=fit(ctx,q,800,76,52,700,FD); ctx.font=`800 ${z}px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(q,L+40,670);
   const rows=[['heart','Like da lassen','Like'],['follow','Folgen für mehr','folg'],['share','Teilen mit jemandem','schick']];
   rows.forEach(([ic,txt,f],i)=>{const ai=clamp((u-wt(sc,f)+0.2)/0.35); if(ai<=0) return; const y=790+i*105, x=L+70; ctx.save(); ctx.globalAlpha=a*ai; ctx.translate(x,y-14); const s=1+0.25*Math.max(0,1-(u-wt(sc,f))/0.4);
    ctx.scale(s,s); ctx.fillStyle=C.target; ctx.strokeStyle=C.target; ctx.lineWidth=5; ctx.lineJoin='round'; ctx.lineCap='round';
    if(ic==='heart'){ctx.beginPath(); ctx.moveTo(0,16); ctx.bezierCurveTo(-30,-4,-18,-28,0,-12); ctx.bezierCurveTo(18,-28,30,-4,0,16); ctx.fill();}
    if(ic==='follow'){ctx.beginPath(); ctx.arc(0,-4,22,0,7); ctx.fill(); ctx.globalCompositeOperation='destination-out'; ctx.fillRect(-3,-16,6,26); ctx.fillRect(-13,-6,26,6); ctx.globalCompositeOperation='source-over';}
    if(ic==='bubble'){rr(ctx,-24,-20,48,34,10); ctx.fill(); ctx.beginPath(); ctx.moveTo(-10,12); ctx.lineTo(-16,26); ctx.lineTo(4,13); ctx.fill();}
    if(ic==='share'){ctx.beginPath(); ctx.moveTo(-20,18); ctx.quadraticCurveTo(-18,-8,14,-8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10,-22); ctx.lineTo(26,-8); ctx.lineTo(10,6); ctx.closePath(); ctx.fill();}
    ctx.restore(); ctx.save(); ctx.globalAlpha=a*ai; ctx.font=`800 42px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(txt,x+60,y,620); ctx.restore();});
   ctx.restore();}]}
];
return {tag:'WAS WÄRE, WENN …? #4', scenes, wt};
}
