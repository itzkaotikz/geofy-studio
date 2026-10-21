// Story: Karten lügen #1 – Wie groß ist Afrika wirklich?
// Flächen (Mio km²): Afrika 30,37 · Grönland 2,17 · Algerien 2,38 · DR Kongo 2,34 · USA 9,83 · China 9,6 · Indien 3,29 · Japan 0,38 · Russland 17,1
function makeStory(){
const {C,FD,FB,FM,L,KB,clamp,ease,eout,lerp,viewBox,mainPart,label,rr,fit,wrapLines,hl}=KV;
const BY=KV.byId(); const feats=[...BY.values()];
const AFR=feats.filter(f=>f.properties.cont==='Africa').map(f=>f.id);
const EUR=feats.filter(f=>f.properties.cont==='Europe'&&!['RUS','ISL'].includes(f.id)&&/^(Sovereign country|Country)$/.test(f.properties.type)).map(f=>f.id);
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
// move a geometry so that point `from` lands on `to` (true size kept)
function moved(geom,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:geom.type,coordinates:mp(geom.coordinates)}};}
function drawShape(e,g,col,a,{fillA=0.82,stroke='#fff'}={}){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); path(g); ctx.globalAlpha=a*fillA; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle=stroke; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
const group=(e,ids,col,a)=>ids.forEach(id=>hl(e,id,col,a,{outline:false}));
const mp=id=>mainPart(id).geometry, cen=id=>d3.geoCentroid(mainPart(id));
const vAtl=viewBox([-62,-37,62,83]), vAfr=viewBox([-22,-37,56,38]), vAfrW=viewBox([-32,-37,55,40]), vRusN=viewBox([25,38,179,80]), vRusA=viewBox([-55,-38,55,42]);
const GRL=mp('GRL'), gFrom=cen('GRL');

const scenes=[
 {head:'Wie groß ist Afrika wirklich?', headInstant:true, view:vAtl, say:S_say[0],
  under:[e=>{hl(e,'GRL',C.ok,1); group(e,AFR,C.target,0.9);}],
  over:[e=>{const {u,sc}=e; const g=P(e,[-42,72]), a=P(e,[18,4]); label(e.ctx,'Grönland',g[0]-20,g[1],{color:C.ok,font:`800 34px ${FD}`}); label(e.ctx,'Afrika',a[0]-60,a[1],{color:C.target,font:`800 34px ${FD}`});
   const k=clamp((u-wt(sc,'In Wahrheit'))/0.4); if(k>0) label(e.ctx,'Afrika = 14 × Grönland',L+40,1180,{color:'#fff',bg:'rgba(255,59,127,0.95)',font:`800 46px ${FD}`,alpha:k});}]},
 {head:'Die Mercator-Karte', view:vAtl, say:S_say[1],
  under:[e=>{hl(e,'GRL',C.ok,0.8); group(e,AFR,C.target,0.6);}],
  over:[e=>{const {ctx,u,sc,path}=e;
   // straight course line = constant compass bearing
   const k=clamp((u-wt(sc,'Kurse'))/1.6); if(k>0){const a=[-9.1,38.7], b=[-64,18.4]; const pa=P(e,a), pb=P(e,b); const x=lerp(pa[0],pb[0],eout(k)), y=lerp(pa[1],pb[1],eout(k));
    ctx.save(); ctx.setLineDash([14,10]); ctx.strokeStyle=C.ice; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(pa[0],pa[1]); ctx.lineTo(x,y); ctx.stroke(); ctx.restore();
    ctx.beginPath(); ctx.arc(x,y,10,0,Math.PI*2); ctx.fillStyle=C.ice; ctx.fill(); label(ctx,'gerader Kurs',pb[0]+20,pb[1]+50,{color:C.ice,alpha:k,font:`700 28px ${FB}`});}
   label(ctx,'1569 · Gerardus Mercator',L+10,560,{alpha:clamp((u-0.3)/0.5),font:`700 30px ${FB}`});
   // equal-size circles grow towards the poles (Tissot)
   const t0=wt(sc,'Der Preis'); [0,25,45,60,72].forEach((la,i)=>{const a=clamp((u-t0-i*0.35)/0.5); if(a<=0) return;
    const c=d3.geoCircle().center([-30,la]).radius(4.5)(); ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); path(c); ctx.fillStyle='rgba(242,182,109,0.55)'; ctx.fill(); ctx.strokeStyle=C.sand; ctx.lineWidth=3; ctx.stroke(); ctx.restore();});
   const a2=clamp((u-t0-1.2)/0.5); const q=P(e,[-30,72]); label(ctx,'gleich groß – in echt',q[0]+70,q[1]+10,{color:C.sand,alpha:a2,font:`700 28px ${FB}`});}]},
 {head:'Grönland in echt', cams:[{at:0,view:vAtl},{at:0.6,view:vAfrW,fly:2.4}], say:S_say[2],
  under:[e=>{group(e,AFR,C.target,0.35); const {u,sc}=e; hl(e,'DZA',C.sand,clamp((u-wt(sc,'Algerien')+0.2)/0.4)); hl(e,'COD',C.ice,clamp((u-wt(sc,'Kongo')+0.2)/0.4));}],
  over:[e=>{const {u,sc,ctx}=e; const k=ease(clamp((u-0.5)/2.4)); const to=d3.geoInterpolate(gFrom,[-14,8])(k);
   hl(e,'GRL',C.ok,0.35*(1-k),{outline:false}); const g=moved(GRL,gFrom,to); drawShape(e,g,C.ok,1);
   const q=P(e,to); if(k>0.95) label(ctx,'Grönland · 2,17 Mio km²',q[0]-120,q[1]+150,{color:C.ok,font:`800 30px ${FD}`});
   const a1=clamp((u-wt(sc,'Algerien'))/0.4), qa=P(e,[3,36.5]); label(ctx,'Algerien · 2,38 Mio km²',qa[0]-60,qa[1]-40,{color:C.sand,alpha:a1,font:`800 30px ${FD}`});
   const a2=clamp((u-wt(sc,'Kongo'))/0.4), qc=P(e,[23,-3]); label(ctx,'DR Kongo · 2,34 Mio km²',qc[0]-60,qc[1]+60,{color:C.ice,alpha:a2,font:`800 30px ${FD}`});}]},
 {head:'Was alles in Afrika passt', view:vAfr, say:S_say[3],
  under:[e=>group(e,AFR,C.target,0.3)],
  over:[e=>{const {u,sc,ctx}=e; const items=[['USA','USA',[3,23],C.ok],['China','CHN',[22,1],C.ice],['Indien','IND',[24,-22],C.sand],['Japan','JPN',[42,7],C.green]];
   items.forEach(([frag,id,to,col],i)=>{const t=wt(sc,frag); const k=ease(clamp((u-t)/1.2)); if(k<=0) return; const from=cen(id); const cur=d3.geoInterpolate([to[0]+40,to[1]+25],to)(k);
    drawShape(e,moved(mp(id),from,cur),col,clamp((u-t)/0.3)); if(k>0.9){const q=P(e,to); label(ctx,frag,q[0]-40,q[1]+10,{color:col,font:`800 28px ${FD}`});}});
   const tz=wt(sc,'Zusammen'); const az=clamp((u-tz)/0.4); if(az>0) label(ctx,'4 Länder = 23,1 Mio km²',L+20,1240,{alpha:az,font:`800 40px ${FD}`});
   const te=wt(sc,'fast ganz Europa'); const ke=ease(clamp((u-te)/1.4)); if(ke>0){const from=[12,50], to=d3.geoInterpolate([40,55],[-1,-9])(ke);
    EUR.forEach(id=>drawShape(e,moved(mp(id),from,to),'#F6F1E7',clamp((u-te)/0.3),{fillA:0.7,stroke:'rgba(11,28,42,0.6)'})); if(ke>0.9){const q=P(e,[-1,-9]); label(ctx,'Europa',q[0]-60,q[1]+90,{color:'#F6F1E7',font:`800 28px ${FD}`});}}
   const ta=wt(sc,'Platz'); const aa=clamp((u-ta)/0.4); if(aa>0) label(ctx,'Afrika · 30,4 Mio km²',L+20,1240+(az>0?-70:0),{color:C.target,alpha:aa,font:`800 40px ${FD}`});}]},
 {head:'Und Russland?', cams:[{at:0,view:vRusN},{at:sc=>wt(sc,'Am Äquator')-0.6,view:vRusA,fly:2.0}], say:S_say[4],
  under:[e=>{group(e,AFR,C.target,0.85);}],
  over:[e=>{const {u,sc,ctx}=e; const t=wt(sc,'Am Äquator'); const k=ease(clamp((u-t+0.6)/2.2)); const from=cen('RUS'); const to=d3.geoInterpolate(from,[-26,-6])(k);
   hl(e,'RUS',C.ice,0.5*(1-k*0.6),{outline:false}); if(k>0) drawShape(e,moved(mp('RUS'),from,to),C.ice,1,{fillA:0.6});
   const a1=clamp((u-0.4)/0.5), qr=P(e,[100,64]); label(ctx,'Russland · 17,1 Mio km²',qr[0]-200,qr[1]-60,{color:C.ice,alpha:a1*(1-k),font:`800 30px ${FD}`});
   if(k>0.95){label(ctx,'Russland · 17,1',L+20,1170,{color:C.ice,font:`800 38px ${FD}`}); label(ctx,'Afrika · 30,4 Mio km²',L+20,1240,{color:C.target,font:`800 38px ${FD}`});}}]},
 {head:'Die Welt in echter Größe', view:vAtl, say:S_say[5],
  under:[e=>{hl(e,'GRL',C.ok,0.8); group(e,AFR,C.target,0.8);}],
  over:[e=>{const {u,sc,ctx}=e; const t=wt(sc,'Equal-Earth'); const a=clamp((u-t+0.3)/1.0); if(a<=0) return;
   // flat equal-area world drawn over the satellite map
   const pj=d3.geoEqualEarth().fitExtent([[30,560],[1050,1250]],{type:'Sphere'}), pth=d3.geoPath(pj,ctx);
   ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='#0B1C2A'; ctx.fillRect(0,0,1080,1920); ctx.beginPath(); pth({type:'Sphere'}); ctx.fillStyle='#14324A'; ctx.fill();
   ctx.beginPath(); feats.forEach(f=>pth(f.loF||f)); ctx.fillStyle='#E9DFC7'; ctx.fill(); ctx.strokeStyle='rgba(11,28,42,0.5)'; ctx.lineWidth=1; ctx.stroke();
   ctx.beginPath(); AFR.forEach(id=>pth(BY.get(id))); ctx.fillStyle=C.target; ctx.fill(); ctx.beginPath(); pth(BY.get('GRL')); ctx.fillStyle=C.ok; ctx.fill();
   ctx.beginPath(); pth({type:'Sphere'}); ctx.strokeStyle='rgba(246,241,231,0.5)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();
   label(ctx,'Equal Earth · flächentreu',L+10,500,{color:C.ok,alpha:a,font:`800 32px ${FD}`});}]},
 {view:vAtl, say:S_say[6],
  under:[e=>group(e,AFR,C.target,0.9)],
  top:[e=>{const {ctx,u}=e; const a=eout(clamp((u-0.2)/0.6)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,600,780,470,32); ctx.fill();
   const q='Welches Land als Nächstes in echter Größe?'; const z=fit(ctx,q,800,76,52,700,FD); ctx.fillStyle=C.ink; wrapLines(ctx,q,700).forEach((l,i)=>ctx.fillText(l,L+40,710+i*(z+8)));
   ctx.font=`800 44px ${FD}`; ctx.fillStyle=C.target; ctx.fillText('Schreib es in die Kommentare',L+40,1010,700); ctx.restore();}]}
];
return {tag:'KARTEN LÜGEN #1', scenes, wt};
}
