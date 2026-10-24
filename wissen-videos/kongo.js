// Story: Karten lügen #7 – Wie groß ist der Kongo wirklich?
// Russland 17,08 Mio. km², Kanada 9,97 (Britannica) · Afrika 30,37 · Mercator: Fläche × 1/cos² φ (60° → × 4) · 11 Zeitzonen
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);

function fillF(e,fs,col,a,dash=false){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); (Array.isArray(fs)?fs:[fs]).forEach(f=>path(f)); ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.4); ctx.strokeStyle=dash?'#fff':col; ctx.lineWidth=3; if(dash) ctx.setLineDash([14,10]); ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function tissot(e,a,list){const {ctx}=e; const sc=e.proj.scale(); const d=800/6371; ctx.save(); list.forEach(([lon,lat],i)=>{const ka=clamp(a*list.length-i); if(ka<=0) return; const q=P(e,[lon,lat]); const r=sc*d/Math.cos(lat*Math.PI/180); ctx.globalAlpha=ka*0.9; ctx.beginPath(); ctx.arc(q[0],q[1],r,0,7); ctx.fillStyle='rgba(255,224,102,0.35)'; ctx.fill(); ctx.strokeStyle=GOLD; ctx.lineWidth=4; ctx.stroke(); ctx.font=`800 28px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=7; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.strokeText(lat+'°',q[0],q[1]+10); ctx.fillStyle='#fff'; ctx.fillText(lat+'°',q[0],q[1]+10);}); ctx.restore();}
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function moved(f,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:f.geometry.type,coordinates:mp(f.geometry.coordinates)}};}
const GOLD='#FFE066', CG='#FFB74D', EU='#4F8DFF', FRC='#4F8DFF', ESC='#FF6B6B', ITC='#7CE0C3', GBC='#B79CFF', DEC='#FF3B7F', GRN='#3FB950';
const W=window.WW; const fid=k=>W.features.find(f=>f.id===k);
const COD=fid('COD');
function mainland(f){const g=f.geometry; if(g.type==='Polygon') return f; const polys=g.coordinates.filter(p=>{const c=d3.geoCentroid({type:'Polygon',coordinates:p}); return c[0]>-12&&c[0]<25&&c[1]>35;}); return {type:'Feature',id:f.id,properties:f.properties,geometry:{type:'MultiPolygon',coordinates:polys}};}
const DEU=fid('DEU'), FRA=mainland(fid('FRA')), ESP=mainland(fid('ESP')), ITA=fid('ITA'), GBR=fid('GBR');
const cen=f=>d3.geoCentroid(f);
const WE=[DEU,FRA,ESP,ITA,GBR];
const TARGET={DEU:[19.5,-10.6],FRA:[18.2,-2.2],ESP:[25.6,-4.6],ITA:[28.9,2.2],GBR:[29.2,-10.6]};
const COL={DEU:DEC,FRA:FRC,ESP:ESC,ITA:ITC,GBR:GBC};
const NAME={DEU:'Deutschland',FRA:'Frankreich',ESP:'Spanien',ITA:'Italien',GBR:'Großbritannien'};
const vEC=viewBox([-14,-16,38,60]), vCg=viewBox([8,-16,34,8]), vWorld=viewBox([-170,-50,190,78]);
const scenes=[
 {head:'Kongo kleiner als Westeuropa?', headInstant:true, say:S_say[0], cams:[{at:0,view:vWorld},{at:0.3,view:vEC,fly:3.0}],
  under:[e=>{const {u,sc}=e; fillF(e,COD,CG,clamp((u-wt(sc,'Kongo'))/0.5)); WE.forEach((f,i)=>fillF(e,f,COL[f.id],clamp((u-wt(sc,'Westeuropa'))/0.5)*0.9));}],
  over:[e=>{const {u,sc,ctx}=e; tag(e,[23,-3],'DR Kongo',clamp((u-wt(sc,'Kongo'))/0.4),-70,0,'#fff',36); tag(e,[2,47],'Westeuropa',clamp((u-wt(sc,'Westeuropa'))/0.4),-90,-70,'#fff',34); chip(ctx,'In echt: Westeuropa passt hinein',1180,clamp((u-wt(sc,'In Wirklichkeit'))/0.4),'#fff','rgba(255,59,127,0.95)',34);}]},
 {head:'Zweitgrößtes Land Afrikas', say:S_say[1], cams:[{at:0,view:vEC,fly:1.0},{at:0.5,view:vCg,fly:3.2}],
  under:[e=>{fillF(e,COD,CG,0.7);}],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'2,3'))/0.4); if(a>0) big(ctx,`≈ ${(2.34*ease(clamp((u-wt(sc,'2,3'))/1.0))).toFixed(1).replace('.',',')} Mio. km²`,a*(1-clamp((u-wt(sc,'Deutschland'))/0.5)),660,'#fff',100);
   const k=ease(clamp((u-wt(sc,'Deutschland'))/1.6)); if(k>0){const f=moved(DEU,cen(DEU),[lerp(cen(DEU)[0]-10,TARGET.DEU[0],k)+ (1-k)*0,lerp(cen(DEU)[1]+30,-5,k)]); fillF(e,f,DEC,k*0.95);} chip(ctx,'Deutschland passt ≈ 6,5-mal hinein',1180,clamp((u-wt(sc,'Deutschland'))/0.4));}]},
 {head:'Der Äquator-Effekt', say:S_say[2], cams:[{at:0,view:vCg,fly:1.0},{at:0.4,view:vEC,fly:3.2}],
  under:[e=>{fillF(e,COD,CG,0.7); fillF(e,DEU,DEC,0.5);}],
  over:[e=>{const {u,sc,ctx}=e; tissot(e,clamp((u-wt(sc,'Je weiter'))/1.6),[[22,0],[10,50]]); chip(ctx,'am Äquator: fast echte Größe',1180,clamp((u-wt(sc,'Äquator'))/0.4)*(1-clamp((u-wt(sc,'Je weiter'))/0.4))); chip(ctx,'alle Kreise: gleich groß (800 km Radius)',1180,clamp((u-wt(sc,'Je weiter'))/0.4),'#0B1C2A','rgba(255,224,102,0.96)',32);}]},
 {head:'Europa wird aufgebläht', say:S_say[3], cams:[{at:0,view:vEC,fly:1.0},{at:0.5,view:viewBox([-14,30,38,64]),fly:3.0}],
  under:[e=>{fillF(e,DEU,DEC,0.7); fillF(e,GBR,GBC,0.7);}],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'Deutschland'))/0.4); if(a>0) big(ctx,'Deutschland × 2,5',a*(1-clamp((u-wt(sc,'Großbritannien'))/0.4)),680,'#fff',100); const b=clamp((u-wt(sc,'Großbritannien'))/0.4); if(b>0) big(ctx,'Großbritannien × 2,9',b,680,'#fff',92); tag(e,[10.5,51],'Deutschland',a,-80,0,'#fff',30);}]},
 {head:'Fünf Länder im Kongo', say:S_say[4], cams:[{at:0,view:viewBox([-14,30,38,64]),fly:1.0},{at:0.5,view:vCg,fly:3.4}],
  under:[e=>{const {u,sc}=e; fillF(e,COD,CG,0.7); const order=['DEU','FRA','ESP','ITA','GBR']; const t0=wt(sc,'Schieben'); WE.forEach((f,i)=>{const k=ease(clamp((u-t0-i*0.55)/1.6)); if(k<=0) return; const c=cen(f); const tg=TARGET[f.id]; const to=[lerp(c[0],tg[0],k),lerp(c[1],tg[1],k)]; fillF(e,moved(f,c,to),COL[f.id],0.9);});}],
  over:[e=>{const {u,sc,ctx}=e; chip(ctx,'in echter Größe',1180,clamp((u-wt(sc,'echter'))/0.4)*(1-clamp((u-wt(sc,'Von der Fläche'))/0.4))); chip(ctx,'Fläche reicht für alle fünf (Formen nicht exakt)',1180,clamp((u-wt(sc,'Von der Fläche'))/0.4)*(1-clamp((u-wt(sc,'weiteres'))/0.4))); chip(ctx,'+ Platz für ein weiteres Deutschland',1180,clamp((u-wt(sc,'weiteres'))/0.4));}]},
 {head:'Zweitgrößter Regenwald', say:S_say[5], cams:[{at:0,view:vCg,fly:1.0},{at:0.5,view:viewBox([5,-18,38,12]),fly:4}],
  under:[e=>{const {u,sc}=e; fillF(e,COD,GRN,0.45*clamp((u-wt(sc,'Regenwald'))/0.8)); fillF(e,COD,CG,0.35*(1-clamp((u-wt(sc,'Regenwald'))/0.8)));}],
  over:[e=>{const {u,sc,ctx}=e; chip(ctx,'zweitgrößter tropischer Regenwald',1180,clamp((u-wt(sc,'Regenwald'))/0.4)); tag(e,[24,-1],'Kongobecken',clamp((u-wt(sc,'Amazonas'))/0.4),-90,0,'#fff',32);}]},
 {say:S_say[6], cams:[{at:0,view:vWorld,fly:1.2},{at:1.4,view:vWorld,fly:4.5}],
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
return {tag:'KARTEN LÜGEN #7', scenes, wt};
}
