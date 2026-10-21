// Story: Wo leben eigentlich alle? #1 – Der Kreis mit mehr als der halben Menschheit
// Yuxi-Kreis (A. Rae 2022): Zentrum Yuxi [102.54,24.35], Radius 4000 km, ≈ 4,32 Mrd = 55 %, ≈ 9,5 % der Erdoberfläche
// China+Indien ≈ 2,84 Mrd · Bangladesch 148.460 km² / ≈ 171 Mio · Deutschland 357.588 km² / ≈ 84 Mio
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,mainPart,label,rr,fit,wrapLines,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
function moved(geom,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:geom.type,coordinates:mp(geom.coordinates)}};}
function drawShape(e,g,col,a,{fillA=0.8,stroke='#fff'}={}){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(g); ctx.globalAlpha=a*fillA; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle=stroke; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function pulse(e,ll,t,a,col=C.target){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],12+ph*60,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],11,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
const group=(e,ids,col,a)=>ids.forEach(id=>hl(e,id,col,a,{outline:false}));
const mp=id=>mainPart(id).geometry, cen=id=>d3.geoCentroid(mainPart(id));

const YUXI=[102.54,24.35], R=4000/6371*180/Math.PI; // ≈ 35,97°
const circ=r=>d3.geoCircle().center(YUXI).radius(Math.max(0.01,r)).precision(1)();
const rot=d3.geoRotation([-YUXI[0],-YUXI[1]]);
const dest=(deg,dist)=>{const b=deg*Math.PI/180; return rot.invert([Math.sin(b)*dist, Math.cos(b)*dist]);}; // approx destination for line
// circle: k = 0..1 growth, a = alpha, dim = darken outside
function circle(e,k,a,{dim=0,fillA=0.10}={}){if(a<=0) return; const {ctx,path,t}=e; const c=circ(R*ease(clamp(k)));
 ctx.save(); if(dim>0){ctx.beginPath(); ctx.rect(-50,-50,1180,2020); path(c); ctx.fillStyle=`rgba(5,14,24,${0.55*dim*a})`; ctx.fill('evenodd');}
 ctx.beginPath(); path(c); ctx.globalAlpha=a*fillA; ctx.fillStyle=C.target; ctx.fill();
 ctx.globalAlpha=a; ctx.shadowColor='rgba(255,59,127,0.9)'; ctx.shadowBlur=18+8*Math.sin(t*3); ctx.strokeStyle=C.target; ctx.lineWidth=6; ctx.stroke(); ctx.restore();}
function line(e,a,b,k,col,w=5,dash=[16,10]){if(k<=0) return; const {ctx}=e; const pa=P(e,a), pb=P(e,d3.geoInterpolate(a,b)(eout(clamp(k)))); ctx.save(); ctx.setLineDash(dash); ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(pa[0],pa[1]); ctx.lineTo(pb[0],pb[1]); ctx.stroke(); ctx.restore();}
function arrow(e,pts,k,col,a=1){if(k<=0||a<=0) return; const {ctx,t}=e; const P2=pts.map(p=>P(e,p)); // curved arrow along quadratic
 const [p0,p1,p2]=P2, q=s=>[(1-s)*(1-s)*p0[0]+2*(1-s)*s*p1[0]+s*s*p2[0],(1-s)*(1-s)*p0[1]+2*(1-s)*s*p1[1]+s*s*p2[1]]; const end=eout(clamp(k));
 ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=12; ctx.lineCap='round'; ctx.setLineDash([22,16]); ctx.lineDashOffset=-t*60; ctx.beginPath(); ctx.moveTo(p0[0],p0[1]); for(let s=0.02;s<=end;s+=0.02){const p=q(s); ctx.lineTo(p[0],p[1]);} ctx.stroke(); ctx.setLineDash([]);
 const a1=q(Math.max(0,end-0.04)), a2=q(end), an=Math.atan2(a2[1]-a1[1],a2[0]-a1[0]); ctx.translate(a2[0],a2[1]); ctx.rotate(an); ctx.fillStyle=col; ctx.beginPath(); ctx.moveTo(26,0); ctx.lineTo(-14,-20); ctx.lineTo(-14,20); ctx.closePath(); ctx.fill(); ctx.restore();}
function river(e,name,k,col=C.ice){if(k<=0) return; const R2=window.RIVERS||{}; const {ctx,path}=e; ctx.save(); ctx.strokeStyle=col; ctx.lineCap='round'; ctx.lineJoin='round';
 ctx.shadowColor=col; ctx.shadowBlur=14; ctx.globalAlpha=clamp(k*1.5); ctx.lineWidth=7; (Array.isArray(name)?name:[name]).forEach(n=>{const g=R2[n]; if(!g) return; ctx.beginPath(); path(g); ctx.stroke();}); ctx.restore();}
function counter(ctx,txt,x,y,a,col=C.ink,size=96){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=10; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,x,y); ctx.fillStyle=col; ctx.fillText(txt,x,y); ctx.restore();}

const INSIDE=['CHN','IND','PAK','BGD','NPL','BTN','LKA','MMR','THA','VNM','LAO','KHM','MYS','PHL','IDN','KOR','PRK','JPN','TWN','SGP','BRN','TLS'];
const SEA=['MMR','THA','VNM','LAO','KHM','MYS','PHL','SGP','BRN','TLS'];
const has=id=>KV.byId().has(id);
const vAsia=viewBox([84,6,125,40]), vCircle=viewBox([58,-15,147,62]), vWorld={lon:45,lat:18,scale:142}, vYunnan=viewBox([96,19,110,30]), vRad=viewBox([60,8,108,40]);
const vInd=viewBox([60,4,95,36]), vSEA=viewBox([92,-10,128,24]), vEast=viewBox([110,20,142,44]), vCI=viewBox([66,4,135,52]);
const vMonsun=viewBox([62,-2,102,32]), vGanges=viewBox([76,20,92,31]), vYang=viewBox([100,24,123,36]), vRice=viewBox([72,10,124,38]);
const vBD=viewBox([82,16,96,28]), vBD2=viewBox([76,15,98,30]);
const DEU=mp('DEU'), dFrom=cen('DEU');

const scenes=[
 {head:'Der Kreis der Menschheit', headInstant:true, say:S_say[0], cams:[{at:0,view:vAsia},{at:0.4,view:vCircle,fly:2.2},{at:sc=>wt(sc,'Rest der Erde')-0.4,view:vWorld,fly:1.8},{at:sc=>wt(sc,'Zehntel')-0.3,view:{lon:95,lat:22,scale:230},fly:1.6}],
  under:[e=>{const {u,sc}=e; circle(e,(u-0.3)/1.8,1,{dim:clamp((u-wt(sc,'Rest der Erde'))/0.6)});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,YUXI,t,clamp((u-0.2)/0.4));
   const tr=wt(sc,'mehr Menschen'), ar=clamp((u-tr)/0.4); const ti=P(e,[102,18]); counter(ctx,'55 %',ti[0],ti[1]+40,ar,'#fff',ar>0?92:0);
   const to=wt(sc,'Rest der Erde'), ao=clamp((u-to-0.3)/0.4); tag(e,[22,47],'Rest der Welt · 45 %',ao,-120,0,C.ice,32);
   const tz=wt(sc,'Zehntel'), az=clamp((u-tz)/0.4); if(az>0) label(ctx,'nur ≈ 1/10 der Erdoberfläche',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:az,font:`800 42px ${FD}`});}]},
 {head:'4.000 km um Yuxi', say:S_say[1], cams:[{at:0,view:vCircle,fly:1.4},{at:sc=>wt(sc,'Später')-0.5,view:vRad,fly:1.6},{at:sc=>wt(sc,'Yuxi')-0.6,view:vYunnan,fly:1.5},{at:sc=>wt(sc,'leben rund')-0.2,view:vCircle,fly:1.8}],
  under:[e=>{circle(e,1,1,{dim:0.6});}],
  over:[e=>{const {u,sc,ctx,t}=e; const tk=wt(sc,'Ken Myers'), ak=clamp((u-tk)/0.4); if(ak>0) label(ctx,'Idee: Lehrer Ken Myers',L+10,1210,{alpha:ak*(1-clamp((u-wt(sc,'Später'))/0.4)),font:`800 36px ${FD}`});
   const tr=wt(sc,'Radius'), kr=clamp((u-tr+0.2)/1.2); const W0=dest(-90,R*Math.PI/180*180/Math.PI); line(e,YUXI,W0,kr,'#fff',6);
   if(kr>0.6){const m=P(e,d3.geoInterpolate(YUXI,W0)(0.5)); label(ctx,'4.000 km',m[0]-80,m[1]-30,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:clamp((kr-0.6)/0.3),font:`800 36px ${FD}`});}
   const ty=wt(sc,'Yuxi'), ay=clamp((u-ty+0.3)/0.4); pulse(e,YUXI,t,Math.max(ay,0.6)); tag(e,YUXI,'Yuxi · Provinz Yunnan',ay,30,-40,C.sand,32);
   const tp=wt(sc,'55 Prozent'), ap=clamp((u-tp)/0.4); const k=ease(clamp((u-tp)/1.0)); const q=P(e,[100,12]); counter(ctx,`${Math.round(55*k)} %`,q[0],q[1],ap,'#fff',104);
   if(ap>0) label(ctx,'≈ 4,3 Mrd. Menschen',L+20,1250,{alpha:ap,font:`800 40px ${FD}`});}]},
 {head:'Was liegt im Kreis?', say:S_say[2], cams:[{at:0,view:vCircle,fly:1.2},{at:sc=>wt(sc,'China')-0.2,view:vCI,fly:1.3},{at:sc=>wt(sc,'Pakistan')-0.4,view:vInd,fly:1.3},{at:sc=>wt(sc,'Südostasien')-0.4,view:vSEA,fly:1.4},{at:sc=>wt(sc,'Südkorea')-0.4,view:vEast,fly:1.3},{at:sc=>wt(sc,'liegen noch')+0.2,view:vCircle,fly:1.6}],
  under:[e=>{const {u,sc}=e; circle(e,1,1,{dim:0.45,fillA:0.05});
   const step=[['China',['CHN','TWN'],C.target],['Indien',['IND'],C.sand],['Pakistan',['PAK'],C.ok],['Bangladesch',['BGD','NPL','BTN','LKA'],C.green],['Südostasien',SEA,C.ice],['Indonesien',['IDN'],C.ice],['Südkorea',['KOR','JPN'],C.ok]];
   step.forEach(([f,ids,col])=>{const a=clamp((u-wt(sc,f)+0.1)/0.4); group(e,ids.filter(has),col,0.75*a);});}],
  over:[e=>{const {u,sc,t}=e; const T=[['China',[103,34],'China',C.target],['Indien',[78,21],'Indien',C.sand],['Pakistan',[69,29],'Pakistan',C.ok],['Bangladesch',[90,23.7],'Bangladesch',C.green],['Südostasien',[101,15],'Südostasien',C.ice],['Indonesien',[110,-3],'Indonesien',C.ice],['Südkorea',[127.8,36.5],'Südkorea',C.ok]];
   T.forEach(([f,ll,n,col])=>tag(e,ll,n,clamp((u-wt(sc,f))/0.4),-60,0,col));
   const tt=wt(sc,'Tokio'), at=clamp((u-tt)/0.4); pulse(e,[139.7,35.7],t,at,C.sand); tag(e,[139.7,35.7],'Tokio · 3.770 km',at,-120,-50,C.sand);}]},
 {head:'China + Indien', say:S_say[3], cams:[{at:0,view:vCI,fly:1.4},{at:sc=>wt(sc,'drei Milliarden')-0.3,view:viewBox([70,6,128,48]),fly:1.6},{at:sc=>wt(sc,'Drittel')-0.4,view:vWorld,fly:2.0}],
  under:[e=>{const {u,sc}=e; circle(e,1,0.8,{dim:0.35,fillA:0.04}); hl(e,'CHN',C.target,0.85); hl(e,'IND',C.sand,0.85);}],
  over:[e=>{const {u,sc,ctx}=e; const tm=wt(sc,'drei Milliarden'), k=ease(clamp((u-tm+0.6)/1.4)), am=clamp((u-tm+0.6)/0.4);
   counter(ctx,`≈ ${(2.8*k).toFixed(1).replace('.',',')} Mrd.`,540,640,am,'#fff',96);
   // bar: world population 8,1 Mrd with China+India segment
   const td=wt(sc,'Drittel'), ad=clamp((u-td+0.2)/0.4); if(ad>0){const x=L+10, y=1150, w=760, h=46, f=2.84/8.1*ease(clamp((u-td+0.2)/1.0)); ctx.save(); ctx.globalAlpha=ad;
    ctx.fillStyle='rgba(11,28,42,0.88)'; rr(ctx,x-20,y-80,w+40,h+120,22); ctx.fill(); ctx.fillStyle='rgba(246,241,231,0.25)'; rr(ctx,x,y,w,h,12); ctx.fill();
    ctx.fillStyle=C.target; rr(ctx,x,y,Math.max(24,w*f*0.56),h,12); ctx.fill(); ctx.fillStyle=C.sand; ctx.fillRect(x+w*f*0.56,y,w*f*0.44,h);
    ctx.font=`800 34px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText('Menschheit · 8,1 Mrd.',x,y-24); ctx.fillStyle=C.sand; ctx.textAlign='right'; ctx.fillText('> 1/3',x+w,y-24); ctx.restore();}}]},
 {head:'Warum genau hier?', say:S_say[4], cams:[{at:0,view:vCI,fly:1.3},{at:sc=>wt(sc,'Monsun')-0.4,view:vMonsun,fly:1.5},{at:sc=>wt(sc,'Ganges')-0.5,view:vGanges,fly:1.4},{at:sc=>wt(sc,'Jangtse')-0.5,view:vYang,fly:1.6},{at:sc=>wt(sc,'Reis angebaut')-0.4,view:vRice,fly:1.8}],
  under:[e=>{circle(e,1,0.6,{dim:0.25,fillA:0});}],
  over:[e=>{const {u,sc,ctx}=e; const tm=wt(sc,'Monsun'), km=(u-tm+0.2)/1.4, fade=(1-clamp((u-wt(sc,'Ganges'))/0.8)*0.6)*(1-clamp((u-wt(sc,'Jangtse'))/0.6));
   arrow(e,[[66,4],[72,14],[77,22]],km,C.ice,fade); arrow(e,[[86,2],[87,12],[87,22]],km-0.15,C.ice,fade); arrow(e,[[112,8],[114,16],[113,25]],km-0.3,C.ice,fade);
   if(km>0.3){const q=P(e,[74,6]); label(ctx,'Monsun-Regen',q[0]-40,q[1]+10,{color:C.ice,alpha:clamp((km-0.3)/0.3)*fade,font:`800 34px ${FD}`});}
   const tg=wt(sc,'Ganges'), ag=clamp((u-tg+0.2)/0.6); river(e,'Ganges',ag); tag(e,[81.5,25.6],'Ganges-Ebene',ag,-100,60,C.ice,32);
   const tj=wt(sc,'Jangtse'), aj=clamp((u-tj+0.2)/0.6); river(e,['Chang Jiang','Yangtze'],aj); tag(e,[112,30.5],'Jangtse',aj,-60,-50,C.ice,32);
   const tr=wt(sc,'Reis angebaut'), ar=clamp((u-tr)/0.4); if(ar>0) label(ctx,'Reisanbau seit Jahrtausenden',L+20,1180,{color:'#fff',bg:'rgba(127,203,143,0.95)',alpha:ar,font:`800 40px ${FD}`});
   const te=wt(sc,'ernährt'), ae=clamp((u-te)/0.4); if(ae>0) label(ctx,'viele Menschen auf wenig Fläche',L+20,1255,{alpha:ae,font:`800 36px ${FD}`});}]},
 {head:'Bangladesch vs. Deutschland', say:S_say[5], cams:[{at:0,view:vBD2,fly:1.5},{at:sc=>wt(sc,'Bangladesch')-0.3,view:vBD,fly:1.4},{at:sc=>wt(sc,'Deutschland')-0.6,view:vBD2,fly:1.6}],
  under:[e=>{const {u,sc}=e; hl(e,'BGD',C.green,clamp((u-wt(sc,'Bangladesch')+0.2)/0.4));}],
  over:[e=>{const {u,sc,ctx}=e; const td=wt(sc,'Deutschland'), k=ease(clamp((u-td+0.3)/1.4)); const to=[83.3,22.6];
   if(k>0){const cur=d3.geoInterpolate([to[0]-14,to[1]+12],to)(k); drawShape(e,moved(DEU,dFrom,cur),C.sand,clamp((u-td+0.3)/0.3));}
   const ab=clamp((u-wt(sc,'Bangladesch'))/0.4); tag(e,[90.3,23.8],'Bangladesch',ab,10,10,C.green,32);
   if(k>0.9) tag(e,to,'Deutschland',1,-90,10,C.sand,32);
   const tf=wt(sc,'halb so groß'), af=clamp((u-tf)/0.4), tp=wt(sc,'doppelt'), ap=clamp((u-tp)/0.4);
   if(af>0){ctx.save(); ctx.globalAlpha=af; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,1075,780,250,26); ctx.fill();
    ctx.font=`700 28px ${FB}`; ctx.fillStyle=C.mute; ctx.fillText('Fläche',L+300,1120); ctx.globalAlpha=af*ap; ctx.fillText('Einwohner',L+560,1120); ctx.globalAlpha=af;
    ctx.font=`800 38px ${FD}`; ctx.fillStyle=C.green; ctx.fillText('Bangladesch',L+30,1185); ctx.fillStyle=C.sand; ctx.fillText('Deutschland',L+30,1270);
    ctx.fillStyle=C.ink; ctx.fillText('148.000 km²',L+300,1185); ctx.fillText('358.000 km²',L+300,1270);
    ctx.globalAlpha=af*ap; ctx.fillStyle=C.green; ctx.fillText('171 Mio.',L+560,1185); ctx.fillStyle=C.ink; ctx.fillText('84 Mio.',L+560,1270); ctx.restore();}}]},
 {say:S_say[6], cams:[{at:0,view:vCircle,fly:1.2},{at:1.4,view:vWorld,fly:4.5}],
  under:[e=>circle(e,1,1,{dim:0.5})],
  top:[e=>{const {ctx,u,sc}=e; const a=eout(clamp((u-0.2)/0.6)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.92)'; rr(ctx,L,560,780,560,32); ctx.fill();
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
return {tag:'WO LEBEN ALLE? #1', scenes, wt};
}
