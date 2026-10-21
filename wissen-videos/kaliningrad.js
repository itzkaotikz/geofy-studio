// Story: Grenz-Kuriositäten #1 – Kaliningrad
// Fakten: Fläche 15.125 km², ≈ 1,03 Mio. Einwohner (2021), grenzt an Polen und Litauen; Königsberg bis 1945/46; Potsdamer Abkommen 1945; Umbenennung 1946;
// Litauen unabhängig 1990/91; Baltijsk: Ostseeflotte; ≈ 90 % der weltweiten Bernsteinvorkommen. Schleswig-Holstein 15.804 km².
function makeStory(){
const {C,FD,FB,FM,L,KB,clamp,ease,eout,lerp,viewBox,mainPart,label,rr,fit,wrapLines,hl}=KV;
const BY=KV.byId();
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
// Kaliningrad = the part of Russia's multipolygon between 19° and 23° E
const rus=BY.get('RUS').geometry; const kalCoords=rus.coordinates.filter(p=>{const xs=p[0].map(c=>c[0]), ys=p[0].map(c=>c[1]); return Math.min(...xs)>19&&Math.max(...xs)<23.5&&Math.min(...ys)>54&&Math.max(...ys)<56;});
const KAL=window.SHAPE_KAL||{type:'Feature',geometry:{type:'MultiPolygon',coordinates:kalCoords}};
const SH=window.SHAPE_SH;
const EU='AUT BEL BGR HRV CYP CZE DNK EST FIN FRA DEU GRC HUN IRL ITA LVA LTU LUX MLT NLD POL PRT ROU SVK SVN ESP SWE'.split(' ');
const USSR='RUS BLR UKR LTU LVA EST MDA GEO ARM AZE KAZ'.split(' ');
function moved(geom,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:geom.type,coordinates:mp(geom.coordinates)}};}
function shape(e,g,col,a,fillA=0.75){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(g); ctx.globalAlpha=a*fillA; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=4; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
const kal=(e,a,col=C.target)=>shape(e,KAL,col,a,0.7);
function pin(e,ll,txt,col,a,{dx=36,dy=10,font=`800 32px ${FD}`}={}){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],11,0,Math.PI*2); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore(); if(txt) label(ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font});}
function route(e,pts,col,k,{dash=[16,12],width=6}={}){if(k<=0) return null; const {ctx}=e; const proj=pts.map(p=>P(e,p)); let L=0; const seg=[0]; for(let i=1;i<proj.length;i++){L+=Math.hypot(proj[i][0]-proj[i-1][0],proj[i][1]-proj[i-1][1]); seg.push(L);}
 const lim=L*k; ctx.save(); ctx.setLineDash(dash); ctx.strokeStyle=col; ctx.lineWidth=width; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(proj[0][0],proj[0][1]); let end=proj[0];
 for(let i=1;i<proj.length;i++){ if(seg[i]<=lim){ctx.lineTo(proj[i][0],proj[i][1]); end=proj[i];} else {const r=(lim-seg[i-1])/(seg[i]-seg[i-1]); end=[lerp(proj[i-1][0],proj[i][0],r),lerp(proj[i-1][1],proj[i][1],r)]; ctx.lineTo(end[0],end[1]); break;}}
 ctx.stroke(); ctx.restore(); return end;}
function plane(ctx,x,y,ang){ctx.save(); ctx.translate(x,y); ctx.rotate(ang); ctx.fillStyle='#fff'; ctx.strokeStyle=C.bg; ctx.lineWidth=3; ctx.beginPath();
 ctx.moveTo(26,0); ctx.lineTo(-8,-6); ctx.lineTo(-14,-24); ctx.lineTo(-20,-24); ctx.lineTo(-16,-5); ctx.lineTo(-26,-4); ctx.lineTo(-30,-12); ctx.lineTo(-34,-12); ctx.lineTo(-32,0); ctx.lineTo(-34,12); ctx.lineTo(-30,12); ctx.lineTo(-26,4); ctx.lineTo(-16,5); ctx.lineTo(-20,24); ctx.lineTo(-14,24); ctx.lineTo(-8,6); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();}
function car(ctx,x,y){ctx.save(); ctx.translate(x,y); ctx.fillStyle=C.ok; rr(ctx,-22,-10,44,20,8); ctx.fill(); ctx.fillStyle='#fff'; ctx.fillRect(-10,-8,20,6); ctx.fillStyle=C.bg; ctx.beginPath(); ctx.arc(-12,11,5,0,7); ctx.arc(12,11,5,0,7); ctx.fill(); ctx.restore();}

const vEU=viewBox([-12,36,42,68]), vBal=viewBox([8,48,34,61]), vKal=viewBox([17.4,53.6,23.6,56.0]), vRoute=viewBox([16,51,40,61]), vEP=viewBox([17.6,53.3,23.6,56.1]), vSU=viewBox([12,45,48,64]), vGap=viewBox([16,51.5,34,59]), vBaltijsk=viewBox([18.2,53.8,22.8,55.8]), vEU2=viewBox([-8,38,40,66]);
const KC=[20.51,54.71], MOS=[37.62,55.75];

const scenes=[
 {head:'Ein Stück Russland in der EU', headInstant:true, say:S_say[0], cams:[{at:0,view:vEU},{at:0.4,view:vBal,fly:2.2},{at:sc=>wt(sc,'Das ist')-0.4,view:vKal,fly:1.4}],
  under:[e=>{const {u,sc}=e; const a=clamp((u-0.2)/0.6); EU.forEach(id=>hl(e,id,C.ok,0.45*a,{outline:false})); hl(e,'RUS',C.target,0.35,{outline:false});
   const ap=clamp((u-wt(sc,'Polen')+0.1)/0.4); hl(e,'POL',C.ok,0.5*ap); const al=clamp((u-wt(sc,'Litauen')+0.1)/0.4); hl(e,'LTU',C.ok,0.5*al);}],
  over:[e=>{const {u,sc,ctx}=e; kal(e,1); const a=clamp((u-0.3)/0.5); const q=P(e,[18,51.5]); if(u<wt(sc,'Polen')) label(ctx,'EU',q[0],q[1],{color:C.ok,alpha:a,font:`800 36px ${FD}`});
   const qp=P(e,[19.5,52.3]); label(ctx,'Polen',qp[0],qp[1],{color:C.ok,alpha:clamp((u-wt(sc,'Polen'))/0.4),font:`800 32px ${FD}`});
   const ql=P(e,[24,55.6]); label(ctx,'Litauen',ql[0],ql[1],{color:C.ok,alpha:clamp((u-wt(sc,'Litauen'))/0.4),font:`800 32px ${FD}`});
   const qk=P(e,[20.3,54.95]); label(ctx,'Kaliningrad',qk[0]-120,qk[1]-60,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:clamp((u-wt(sc,'Kaliningrad'))/0.4),font:`800 40px ${FD}`});}]},
 {head:'Klein, aber abgeschnitten', say:S_say[1], cams:[{at:0,view:vKal,fly:1.0},{at:sc=>wt(sc,'mit dem Auto')-0.3,view:vRoute,fly:1.6}],
  under:[e=>{hl(e,'RUS',C.target,0.35,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; kal(e,1);
   const ts=wt(sc,'Schleswig'), ks=ease(clamp((u-ts)/1.4)); const shs=d3.geoCentroid(SH);
   if(ks>0&&u<wt(sc,'mit dem Auto')){const to=d3.geoInterpolate([shs[0]+3,shs[1]],[17.4,55.6])(ks); shape(e,moved(SH.geometry,shs,to),C.ok,clamp((u-ts)/0.3)); const q=P(e,to); if(ks>0.9) label(ctx,'Schleswig-Holstein',q[0]-130,q[1]-90,{color:C.ok,font:`800 30px ${FD}`});}
   const tm=wt(sc,'eine Million'), am=clamp((u-tm)/0.4)*(1-clamp((u-wt(sc,'mit dem Auto')+0.3)/0.4)); if(am>0){label(ctx,'15.125 km²',L+20,1170,{alpha:am,font:`800 40px ${FD}`}); label(ctx,'≈ 1 Mio. Einwohner',L+20,1240,{color:C.target,alpha:am,font:`800 40px ${FD}`});}
   const tc=wt(sc,'mit dem Auto'); const kc=clamp((u-tc)/2.4); const end=route(e,[KC,[23.3,55.1],[25.3,54.7],[26.6,55.4],[28.2,56.1],[31.3,56.3],MOS],C.ok,kc); if(end) car(ctx,end[0],end[1]);
   if(kc>0.3) label(ctx,'Litauen · Lettland',P(e,[24.5,56.4])[0],P(e,[24.5,56.4])[1],{color:C.ok,alpha:clamp((kc-0.3)/0.2),font:`700 26px ${FB}`});
   const tf=wt(sc,'Flugzeuge'), kf=clamp((u-tf)/2.6); const pts=[KC,[19.6,56.6],[22.0,59.2],[26.5,59.9],[30.3,59.9],[33.5,57.6],MOS]; const pe=route(e,pts,'#fff',kf,{dash:[4,12],width:5});
   if(pe){const i=Math.min(pts.length-2,Math.floor(kf*(pts.length-1))); const a=P(e,pts[i]), b=P(e,pts[i+1]); plane(ctx,pe[0],pe[1],Math.atan2(b[1]-a[1],b[0]-a[0]));}
   if(kf>0.2) label(ctx,'Umweg über die Ostsee',P(e,[17.6,58.2])[0],P(e,[17.6,58.2])[1],{alpha:clamp((kf-0.2)/0.2),font:`700 26px ${FB}`});
   pin(e,MOS,'Moskau','#fff',clamp((u-tc)/0.4),{dx:-140,dy:60});}]},
 {head:'Früher: Königsberg', say:S_say[2], cams:[{at:0,view:vEP,fly:1.6},{at:sc=>wt(sc,'Kant')-0.5,view:vBaltijsk,fly:1.6}],
  under:[e=>{const a=1-clamp(e.u/1.0)*0.6; hl(e,'RUS',C.target,0.3*a,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; kal(e,0.55,C.sand); const q=P(e,[21.3,54.3]); label(ctx,'Ostpreußen',q[0],q[1]+60,{color:C.sand,alpha:clamp((u-wt(sc,'Ostpreußen'))/0.5),font:`800 36px ${FD}`});
   pin(e,KC,'Königsberg',C.sand,clamp((u-wt(sc,'Königsberg'))/0.4),{dx:36,dy:-20,font:`800 38px ${FD}`});
   const ak=clamp((u-wt(sc,'Immanuel'))/0.4); if(ak>0){const p=P(e,KC); label(ctx,'Immanuel Kant · 1724–1804',p[0]+36,p[1]+46,{alpha:ak,font:`700 28px ${FB}`});}}]},
 {head:'1945: an die Sowjetunion', say:S_say[3], cams:[{at:0,view:vKal,fly:1.5},{at:sc=>wt(sc,'1946')-0.4,view:viewBox([18.4,53.9,22.8,55.7]),fly:1.4}],
  over:[e=>{const {u,sc,ctx}=e; const t45=wt(sc,'1945'); const k=clamp((u-t45)/0.8); kal(e,1,k<0.5?C.sand:C.target); if(k>0&&k<1) kal(e,k,C.target);
   label(ctx,'1945 · Potsdamer Abkommen',L+20,560,{alpha:clamp((u-t45)/0.4),font:`800 32px ${FD}`});
   const tr=wt(sc,'umbenannt'), t46=wt(sc,'1946'); const p=P(e,KC); const old=1-clamp((u-tr+0.2)/0.6);
   if(u>t46-0.5){ctx.save(); ctx.globalAlpha=old; label(ctx,'Königsberg',p[0]+30,p[1]-20,{color:C.sand,font:`800 40px ${FD}`}); ctx.restore();
    if(old<1) label(ctx,'Kaliningrad · 1946',p[0]+30,p[1]-20,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:1-old,font:`800 40px ${FD}`});
    pin(e,KC,'',C.target,1);}}]},
 {head:'1991: abgeschnitten', say:S_say[4], cams:[{at:0,view:vSU,fly:1.8},{at:sc=>wt(sc,'abgeschnitten')-0.8,view:vGap,fly:1.6}],
  under:[e=>{const {u,sc}=e; const t91=wt(sc,'1991'); const k=clamp((u-t91)/0.6);
   USSR.forEach(id=>{if(id==='RUS') return; const col=k>0&&id!=='BLR'?C.ok:C.target; hl(e,id,id==='LTU'?(k>0?C.ok:C.target):col,(id==='LTU'?1:0.45)*(k>0?1:0.6),{outline:id==='LTU'});});
   hl(e,'RUS',C.target,0.6,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; kal(e,1); const t91=wt(sc,'1991'); const q=P(e,[30,62.5]);
   label(ctx,'Sowjetunion',q[0]-100,q[1],{color:C.target,alpha:clamp((u-0.4)/0.5)*(1-clamp((u-t91)/0.5)),font:`800 36px ${FD}`});
   const ql=P(e,[24,55.5]); label(ctx,'Litauen · unabhängig',ql[0]-40,ql[1]-30,{color:C.ok,alpha:clamp((u-t91)/0.4),font:`800 30px ${FD}`});
   const ta=wt(sc,'abgeschnitten'); const aa=clamp((u-ta)/0.4); if(aa>0){const a=P(e,[22.8,54.9]), b=P(e,[28.2,56.1]); ctx.save(); ctx.globalAlpha=aa; ctx.setLineDash([12,10]); ctx.strokeStyle='#fff'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke(); ctx.restore();
    const m=[(a[0]+b[0])/2,(a[1]+b[1])/2]; ctx.save(); ctx.globalAlpha=aa; ctx.strokeStyle=C.target; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(m[0]-18,m[1]-18); ctx.lineTo(m[0]+18,m[1]+18); ctx.moveTo(m[0]+18,m[1]-18); ctx.lineTo(m[0]-18,m[1]+18); ctx.stroke(); ctx.restore();}}]},
 {head:'Warum Russland es braucht', say:S_say[5], cams:[{at:0,view:vBaltijsk,fly:1.8},{at:sc=>wt(sc,'Bernstein')-0.6,view:viewBox([18.4,54.0,22.4,55.7]),fly:1.4}],
  over:[e=>{const {u,sc,ctx}=e; kal(e,0.6);
   const tb=wt(sc,'Baltijsk'); pin(e,[19.91,54.65],'Baltijsk · Ostseeflotte','#fff',clamp((u-tb)/0.4),{dx:36,dy:60,font:`800 32px ${FD}`});
   const ta=wt(sc,'rund 90'), a=clamp((u-ta+0.2)/0.6); if(a>0){const q=P(e,[19.95,54.88]); const g=ctx.createRadialGradient(q[0],q[1],5,q[0],q[1],160); g.addColorStop(0,'rgba(242,182,109,0.95)'); g.addColorStop(1,'rgba(242,182,109,0)'); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle=g; ctx.beginPath(); ctx.arc(q[0],q[1],160,0,7); ctx.fill(); ctx.restore();
    label(ctx,'≈ 90 % des Bernsteins weltweit',L+20,1240,{color:C.sand,alpha:a,font:`800 40px ${FD}`});}}]},
 {say:S_say[6], cams:[{at:0,view:vBal,fly:1.2},{at:1.2,view:vEU2,fly:3.5}],
  under:[e=>hl(e,'RUS',C.target,0.35,{outline:false})],
  over:[e=>kal(e,1)],
  top:[e=>{const {ctx,u}=e; const a=eout(clamp((u-0.2)/0.6)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,600,780,470,32); ctx.fill();
   const q='Welche Gebiete sind noch vom eigenen Land abgeschnitten?'; const z=fit(ctx,q,800,72,48,700,FD); ctx.fillStyle=C.ink; wrapLines(ctx,q,700).forEach((l,i)=>ctx.fillText(l,L+40,700+i*(z+8)));
   ctx.font=`800 44px ${FD}`; ctx.fillStyle=C.target; ctx.fillText('Schreib es in die Kommentare',L+40,1020,700); ctx.restore();}]}
];
return {tag:'GRENZ-KURIOSITÄTEN #1', scenes, wt};
}
