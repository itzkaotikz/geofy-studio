// Story: Warum ist …? #2 – Warum sind Afrikas Grenzen so gerade?
// Berliner Konferenz 1884/85 (Bismarck, 14 Staaten, keine afrikanischen Vertreter) · ≈ 44 % der Grenzen auf Breiten-/Längengraden
// Ägypten–Sudan 22° N (1899) · Massai: Kenia/Tansania · Somali: Somalia, Äthiopien, Kenia, Dschibuti · OAU Kairo 1964
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,mainPart,label,rr,fit,hl}=KV;
const BY=KV.byId(); const feats=[...BY.values()];
const AFR=feats.filter(f=>f.properties.cont==='Africa').map(f=>f.id);
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
const has=id=>BY.has(id);
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*55,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function dot(e,ll,a,col,r=9){if(a<=0) return; const q=P(e,ll); const {ctx}=e; ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=3; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
// straight line in screen space between projected points (ruler look), drawn progressively
function ruler(e,pts,k,col='#fff',w=7,glow=true){if(k<=0) return; const {ctx}=e; const Q=pts.map(p=>P(e,p)); let L2=0; const seg=[]; for(let i=1;i<Q.length;i++){const d=Math.hypot(Q[i][0]-Q[i-1][0],Q[i][1]-Q[i-1][1]); seg.push(d); L2+=d;}
 let rem=L2*clamp(k); ctx.save(); ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round'; if(glow){ctx.shadowColor=col; ctx.shadowBlur=16;} ctx.beginPath(); ctx.moveTo(Q[0][0],Q[0][1]);
 for(let i=1;i<Q.length&&rem>0;i++){const f=Math.min(1,rem/seg[i-1]); ctx.lineTo(lerp(Q[i-1][0],Q[i][0],f),lerp(Q[i-1][1],Q[i][1],f)); rem-=seg[i-1];} ctx.stroke(); ctx.restore();}
function poly(coords){const g={type:'Feature',geometry:{type:'Polygon',coordinates:[coords]}}; if(d3.geoArea(g)>2*Math.PI) g.geometry.coordinates=[coords.slice().reverse()]; return g;}
function area(e,g,col,a,label2){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(g); ctx.globalAlpha=a*0.45; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=a; ctx.setLineDash([10,8]); ctx.strokeStyle=col; ctx.lineWidth=4; ctx.stroke(); ctx.restore();}

// approximate straight border segments (Natural Earth borders underneath)
const STRAIGHT=[
 [[25,31.6],[25,22]],                       // Ägypten–Libyen 25° O
 [[25,22],[31.4,22]],                       // Ägypten–Sudan 22° N
 [[24,20],[24,19.5],[15.9,23.45]],          // Libyen–Tschad
 [[5.8,19.45],[11.98,23.52]],               // Algerien–Niger
 [[-4.83,25],[1.17,21.1]],                  // Algerien–Mali
 [[-6.5,24.99],[-5.5,16.4]],                // Mali–Mauretanien (vertikal)
 [[-17.05,21.33],[-13,21.33],[-13,23]],     // Mauretanien–Westsahara
 [[-8.67,27.67],[-8.67,26],[-12,26]],       // Westsahara/Mauretanien/Algerien
 [[20,-22],[20,-24.75]],                    // Namibia–Botswana 20° O
 [[21,-18.3],[21,-22],[20,-22]],            // Namibia–Botswana 21° O
 [[20,-24.75],[20,-28.4]],                  // Namibia–Südafrika
 [[22,-13],[24,-13]],                       // Angola–Sambia
 [[41,-1.65],[41,2.8]],                     // Kenia–Somalia
 [[24,8.7],[24,12],[22.9,15.7]]             // Sudan–Tschad/ZAR (vereinfacht)
];
const COL={FR:'#4F8DFF',UK:C.target,DE:C.sand,BE:C.green,PT:C.ok,IT:'#B79CFF',ES:'#FFD166',IND:'#F6F1E7'};
const COLONY={FR:['DZA','TUN','MAR','MRT','SEN','MLI','BFA','NER','GIN','CIV','BEN','TCD','CAF','COG','GAB','MDG','DJI','COM'],UK:['EGY','SDN','SSD','UGA','KEN','NGA','GHA','SLE','GMB','ZAF','BWA','ZMB','ZWE','MWI','LSO','SWZ','SOL'],
 DE:['TGO','CMR','NAM','TZA','RWA','BDI'],BE:['COD'],PT:['AGO','MOZ','GNB'],IT:['LBY','ERI','SOM'],ES:['ESH','GNQ'],IND:['ETH','LBR']};
const NAMES=[['FR','Frankreich'],['UK','Großbritannien'],['DE','Deutsches Reich'],['BE','Belgien'],['PT','Portugal'],['IT','Italien'],['ES','Spanien'],['IND','unabhängig']];
const CAP=[[-0.13,51.5],[2.35,48.86],[-3.7,40.42],[-9.14,38.72],[4.35,50.85],[4.3,52.08],[12.57,55.68],[18.07,59.33],[12.5,41.9],[16.37,48.21],[30.3,59.94],[28.98,41.01],[13.4,52.52]];
const MASSAI=poly(d3.geoCircle().center([36.3,-2.6]).radius(2.3).precision(4)().coordinates[0]);
const SOMALI=poly([[43.2,11.5],[51.3,11.8],[51.0,10.4],[47.8,4.5],[41.9,-1.7],[40.6,-0.5],[39.9,2.6],[41.9,4.0],[42.9,5.3],[43.4,6.9],[42.4,8.4],[42.6,10.0],[43.2,11.5]]);

const vAfr=viewBox([-20,-36,54,38]), vAfrN=viewBox([-18,10,40,36]), vEur=viewBox([-12,36,32,60]), vBer=viewBox([4,46,24,56]), vEA=viewBox([-25,-36,60,62]);
const vEgy=viewBox([20,16,40,30]), vEgy2=viewBox([24,19,36,25]), vEast=viewBox([28,-8,52,14]), vSom=viewBox([36,-4,52,13]), vAfrS=viewBox([10,-36,42,0]);

function legend(ctx,a,u,t0){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,1110,780,220,24); ctx.fill(); ctx.font=`700 26px ${FB}`; ctx.fillStyle=C.mute; ctx.fillText('Afrika um 1914 (vereinfacht)',L+28,1150);
 NAMES.forEach(([k,n],i)=>{const x=L+28+(i%2)*380, y=1198+Math.floor(i/2)*36; const ai=clamp((u-t0-i*0.12)/0.3); ctx.globalAlpha=a*ai; ctx.fillStyle=COL[k]; rr(ctx,x,y-20,26,22,6); ctx.fill(); ctx.fillStyle=C.ink; ctx.font=`700 26px ${FB}`; ctx.fillText(n,x+40,y);}); ctx.restore();}
function colonies(e,u,t0,a=1){if(a<=0) return; NAMES.forEach(([k],i)=>{const ai=clamp((u-t0-i*0.12)/0.4)*a; COLONY[k].filter(has).forEach(id=>hl(e,id,COL[k],0.7*ai,{outline:false}));});}

const scenes=[
 {head:'Grenzen wie mit dem Lineal', headInstant:true, say:S_say[0], cams:[{at:0,view:vEA},{at:0.3,view:vAfr,fly:2.2},{at:sc=>wt(sc,'Fast die Hälfte')-0.3,view:vAfrN,fly:1.8}],
  under:[e=>{}],
  over:[e=>{const {u,sc,ctx}=e; const t0=wt(sc,'Lineal')-0.4; STRAIGHT.forEach((s,i)=>ruler(e,s,(u-t0-i*0.18)/0.6,'#fff',6));
   const ah=clamp((u-wt(sc,'Fast die Hälfte'))/0.4); if(ah>0) label(ctx,'≈ 44 % folgen Breiten- oder Längengraden',L+10,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ah,font:`800 34px ${FD}`});}]},
 {head:'Berlin, 1884', say:S_say[1], cams:[{at:0,view:vAfrN,fly:1.2},{at:sc=>wt(sc,'Berlin')-0.6,view:vBer,fly:1.6},{at:sc=>wt(sc,'Vierzehn')-0.4,view:vEur,fly:1.6},{at:sc=>wt(sc,'Kein einziger')-0.3,view:vEA,fly:2.0}],
  under:[e=>{const {u,sc}=e; group(e,AFR,'#F6F1E7',0.25*clamp((u-wt(sc,'Kein einziger'))/0.5));}],
  over:[e=>{const {u,sc,ctx,t}=e; const ab=clamp((u-wt(sc,'Berlin')+0.2)/0.4); pulse(e,[13.4,52.52],t,ab,C.target,13); tag(e,[13.4,52.52],'Berlin',ab,30,-34,C.target,34);
   const ak=clamp((u-wt(sc,'Kongokonferenz'))/0.4); if(ak>0) label(ctx,'Kongokonferenz · Nov. 1884 – Feb. 1885',L+10,1180,{alpha:ak,font:`800 34px ${FD}`});
   const av=wt(sc,'Vierzehn'); CAP.forEach((c,i)=>dot(e,c,clamp((u-av-i*0.07)/0.25),C.sand,9)); const a14=clamp((u-av)/0.4); if(a14>0) label(ctx,'14 Staaten · 13 aus Europa + USA',L+10,1250,{color:C.sand,alpha:a14,font:`800 34px ${FD}`});
   const ae=clamp((u-wt(sc,'Kein einziger'))/0.4); if(ae>0){tag(e,[20,5],'0 afrikanische Vertreter',ae,-170,0,'#fff',38);}}]},
 {head:'Aufgeteilt auf dem Papier', say:S_say[2], cams:[{at:0,view:vEA,fly:1.2},{at:0.8,view:vAfr,fly:2.0},{at:sc=>wt(sc,'Landkarten')-0.3,view:vAfrN,fly:2.0},{at:sc=>wt(sc,'gerade Linie')-0.5,view:viewBox([-10,12,30,34]),fly:1.6}],
  under:[e=>{const {u,sc}=e; colonies(e,u,0.4,1);}],
  over:[e=>{const {u,sc,ctx}=e; legend(ctx,clamp((u-0.4)/0.4)*(1-clamp((u-wt(sc,'gerade Linie')+0.4)/0.4)),u,0.4);
   const tl=wt(sc,'Landkarten'); STRAIGHT.slice(2,8).forEach((s,i)=>ruler(e,s,(u-tl-i*0.35)/0.8,'#fff',6));
   const ag=clamp((u-wt(sc,'gerade Linie'))/0.4); if(ag>0) label(ctx,'Gerade Linie = schnell gezogen',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ag,font:`800 40px ${FD}`});}]},
 {head:'Ägypten und Sudan', say:S_say[3], cams:[{at:0,view:vAfrN,fly:1.2},{at:sc=>wt(sc,'Ägypten')-0.4,view:vEgy,fly:1.6},{at:sc=>wt(sc,'22.')-0.4,view:vEgy2,fly:2.0}],
  under:[e=>{const {u,sc}=e; hl(e,'EGY',C.target,0.75*clamp((u-wt(sc,'Ägypten'))/0.4)); hl(e,'SDN',C.ok,0.7*clamp((u-wt(sc,'Sudan'))/0.4));}],
  over:[e=>{const {u,sc,ctx}=e; const t2=wt(sc,'22.'), k=(u-t2+0.3)/1.4; if(k>0){ruler(e,[[10,22],[45,22]],k,C.ice,3,false); ruler(e,[[25,22],[31.4,22],[36.9,22]],(k-0.4)/0.6,'#fff',8);}
   tag(e,[29,26.5],'Ägypten',clamp((u-wt(sc,'Ägypten'))/0.4),-60,0,C.target,34); tag(e,[29,18.5],'Sudan',clamp((u-wt(sc,'Sudan'))/0.4),-50,0,C.ok,34);
   const a2=clamp((u-t2)/0.4); if(a2>0) label(ctx,'22° Nord',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:a2,font:`800 44px ${FD}`});}]},
 {head:'Grenzen durch Völker', say:S_say[4], cams:[{at:0,view:vAfr,fly:1.4},{at:sc=>wt(sc,'Massai')-0.5,view:vEast,fly:1.6},{at:sc=>wt(sc,'Somali')-0.5,view:vSom,fly:1.5}],
  under:[e=>{const {u,sc}=e; ['KEN','TZA','SOM','ETH','DJI'].forEach(id=>hl(e,id,'#F6F1E7',0.15,{outline:true}));}],
  over:[e=>{const {u,sc,ctx}=e; const am=clamp((u-wt(sc,'Massai'))/0.5), as=clamp((u-wt(sc,'Somali'))/0.5);
   area(e,MASSAI,C.target,am); tag(e,[36.3,-2.6],'Massai',am,-55,0,'#fff',34); const ak=clamp((u-wt(sc,'Kenia'))/0.4); tag(e,[38,1],'Kenia',ak,-40,0,C.ink,28); tag(e,[35,-6],'Tansania',clamp((u-wt(sc,'Tansania'))/0.4),-60,0,C.ink,28);
   area(e,SOMALI,C.sand,as); tag(e,[46,6],'Somali',as,-55,0,'#fff',34); tag(e,[39,8.5],'Äthiopien',as,-70,0,C.ink,26); tag(e,[47.5,3],'Somalia',as,-10,40,C.ink,26);
   const ap=clamp((u-wt(sc,'keine Rücksicht'))/0.4)*(1-am); if(ap>0) label(ctx,'Linien statt Lebensräume',L+20,1250,{alpha:ap,font:`800 38px ${FD}`});}]},
 {head:'Warum blieben die Grenzen?', say:S_say[5], cams:[{at:0,view:vEast,fly:1.4},{at:sc=>wt(sc,'1964')-0.5,view:vAfrN,fly:1.8},{at:sc=>wt(sc,'Kriege')-0.4,view:vAfr,fly:2.2}],
  under:[e=>{const {u,sc}=e; const a=clamp((u-wt(sc,'beizubehalten'))/0.6); AFR.forEach(id=>hl(e,id,'#F6F1E7',0.12*a,{outline:true}));}],
  over:[e=>{const {u,sc,ctx,t}=e; const ac=clamp((u-wt(sc,'1964'))/0.4); pulse(e,[31.24,30.04],t,ac,C.target,12); tag(e,[31.24,30.04],'Kairo · 1964',ac,30,-34,C.target,34);
   const ab=clamp((u-wt(sc,'beizubehalten'))/0.4); if(ab>0) label(ctx,'Beschluss: Grenzen bleiben',L+20,1180,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ab,font:`800 40px ${FD}`});
   const ak=clamp((u-wt(sc,'Kriege'))/0.4); if(ak>0) label(ctx,'Ziel: keine Kriege um neue Grenzen',L+20,1255,{alpha:ak,font:`800 34px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:vAfr,fly:1.2},{at:1.4,view:vEA,fly:4.5}],
  under:[e=>{}],
  over:[e=>{const {u}=e; STRAIGHT.forEach(s=>ruler(e,s,1,'#fff',5));}],
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
function group(e,ids,col,a){ids.forEach(id=>hl(e,id,col,a,{outline:false}));}
return {tag:'WARUM IST …? #2', scenes, wt};
}
