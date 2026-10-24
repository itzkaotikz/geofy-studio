// Story: Warum ist …? #6 – Bolivien ohne Meer
// ≈ 350 km lang, 13–65 km breit · Great Game · 1893/1895 Grenzziehung als Puffer · Nachbarn TJK, PAK, CHN (92 km) · Wachdschir-Pass 4.923 m · ≈ 18.000 Einw.
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', BO='#FF3B7F', CL='#4F8DFF', PE='#E5484D', SEA='#4F8DFF';
const G10=window.G10; const F=k=>({type:'Feature',geometry:G10[k]});
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}

const vSA=viewBox([-85,-40,-35,8]), vBol=viewBox([-72,-24,-56,-8]), vTit=viewBox([-71.5,-17.5,-68,-14.5]), vCoast=viewBox([-73.5,-26,-65,-17.5]), vAta=viewBox([-71,-24.5,-66.5,-19.5]);
const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));
const scenes=[
 {head:'Marine ohne Meer', headInstant:true, say:S_say[0], cams:[{at:0,view:vSA},{at:0.3,view:vBol,fly:2.8},{at:sc=>wt(sc,'Titicacasee')-0.3,view:viewBox([-72,-18.2,-67,-14.2]),fly:2.2},{at:sc=>wt(sc,'Warum')-0.4,view:vSA,fly:3.0}],
  under:[e=>{const {u,sc}=e; hl(e,'BOL',BO,0.5*clamp((u-wt(sc,'Bolivien'))/0.5),{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; fill(e,'TIT',SEA,clamp((u-wt(sc,'Titicacasee'))/0.5),4); chip(ctx,'Bolivien: Binnenland mit Marine',1180,clamp((u-wt(sc,'Marine'))/0.4)*(1-clamp((u-wt(sc,'Warum'))/0.4))); big(ctx,'Kein Meer?',clamp((u-wt(sc,'Warum'))/0.4),700,'#fff',110);}]},
 {head:'Früher mit Küste', say:S_say[1], cams:[{at:0,view:vSA,fly:1.0},{at:0.4,view:vCoast,fly:3.0},{at:sc=>wt(sc,'Atacama')-0.4,view:vAta,fly:2.8}],
  under:[e=>{hl(e,'BOL',BO,0.45,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; fill(e,'LIT',GOLD,clamp((u-wt(sc,'Pazifikküste'))/0.6)); tag(e,[-70.0,-22.8],'Pazifik',clamp((u-wt(sc,'Pazifikküste'))/0.4),-140,0,'#fff',34); tag(e,[-68.6,-23.0],'Atacama',clamp((u-wt(sc,'Atacama'))/0.4),0,40,'#fff',32); chip(ctx,'Küste von Bolivien (schematisch)',1180,clamp((u-wt(sc,'Küste')+0.2)/0.4)||clamp((u-wt(sc,'Pazifikküste'))/0.4));}]},
 {head:'Der Salpeterkrieg', say:S_say[2], cams:[{at:0,view:vAta,fly:1.0},{at:0.5,view:vCoast,fly:3.0},{at:sc=>wt(sc,'1879')-0.3,view:viewBox([-80,-34,-62,-12]),fly:3.0}],
  under:[e=>{const {u,sc}=e; hl(e,'BOL',BO,0.45,{outline:false}); const c=clamp((u-wt(sc,'Chile'))/0.5), p=clamp((u-wt(sc,'Peru'))/0.5); hl(e,'CHL',CL,0.42*c,{outline:false}); hl(e,'PER',PE,0.42*p,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; fill(e,'LIT',GOLD,0.8); chip(ctx,'Salpeter: Dünger und Sprengstoff',1180,clamp((u-wt(sc,'Salpeter'))/0.4)*(1-clamp((u-wt(sc,'1879'))/0.4))); const a=clamp((u-wt(sc,'1879'))/0.4); if(a>0) big(ctx,'1879',a,680,'#fff',140); tag(e,[-71,-31],'Chile',clamp((u-wt(sc,'Chile'))/0.4),0,0,CL,36); tag(e,[-76,-9],'Peru',clamp((u-wt(sc,'Peru'))/0.4),0,0,PE,36);}]},
 {head:'Chile gewinnt', say:S_say[3], cams:[{at:0,view:viewBox([-80,-34,-62,-12]),fly:1.0},{at:0.5,view:vCoast,fly:3.0}],
  under:[e=>{const {u,sc}=e; hl(e,'BOL',BO,0.45,{outline:false}); hl(e,'CHL',CL,0.42,{outline:false}); hl(e,'PER',PE,0.42,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; const k=clamp((u-wt(sc,'Chile gewann'))/0.5); const lit=clamp((u-wt(sc,'Küste'))/0.6); fill(e,'LIT',lit>0?CL:GOLD,Math.max(0.8,lit)); fill(e,'TAR',CL,clamp((u-wt(sc,'Tarapacá'))/0.6)); tag(e,[-69.3,-20.0],'Tarapacá',clamp((u-wt(sc,'Tarapacá'))/0.4),0,0,'#fff',30); chip(ctx,'Bolivien verliert die gesamte Küste',1180,lit*(1-clamp((u-wt(sc,'1904'))/0.4))); const a=clamp((u-wt(sc,'1904'))/0.4); if(a>0) big(ctx,'1904',a,680,'#fff',140);}]},
 {head:'Tag des Meeres', say:S_say[4], cams:[{at:0,view:vCoast,fly:1.0},{at:0.5,view:viewBox([-85,-40,-35,8]),fly:3.5}],
  under:[e=>{hl(e,'BOL',BO,0.5,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; fill(e,'LIT',CL,0.5); const a=clamp((u-wt(sc,'23.'))/0.4); chip(ctx,'23. März: Tag des Meeres',1180,a*(1-clamp((u-wt(sc,'Gerichtshof'))/0.4))); const b=clamp((u-wt(sc,'Gerichtshof'))/0.4); chip(ctx,'Klage vor dem IGH, 2018 verloren',1180,b); const y=clamp((u-wt(sc,'2018'))/0.4); if(y>0) big(ctx,'2018',y,680,'#fff',140);}]},
 {head:'Marine am See', say:S_say[5], cams:[{at:0,view:viewBox([-85,-40,-35,8]),fly:1.0},{at:0.5,view:vBol,fly:3.0},{at:sc=>wt(sc,'wartet')-0.5,view:viewBox([-72,-18.2,-67,-14.2]),fly:3.0}],
  under:[e=>{hl(e,'BOL',BO,0.5,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; fill(e,'TIT',SEA,1,4); chip(ctx,'Eine der wenigen Binnenländer mit Marine',1180,clamp((u-wt(sc,'Binnenländer'))/0.4)); big(ctx,'⚓',clamp((u-wt(sc,'wartet'))/0.4),680,'#fff',150);}]},
 {say:S_say[6], cams:[{at:0,view:vBol,fly:1.2},{at:1.4,view:vBol,fly:4.5}],
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
return {tag:'WARUM IST …? #6', scenes, wt};
}
