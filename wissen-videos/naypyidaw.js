// Story: Hauptstädte #3 – Naypyidaw
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
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function line(e,pts,col,prog,w=10,dash=null){if(prog<=0) return; const {ctx}=e; const q=pts.map(p=>P(e,p)); const n=Math.max(2,Math.floor(q.length*Math.min(1,prog))+(prog>=1?0:1)); ctx.save(); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='rgba(5,14,24,0.7)'; ctx.lineWidth=w+7; ctx.beginPath(); q.slice(0,n).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.strokeStyle=col; ctx.lineWidth=w; if(dash) ctx.setLineDash(dash); ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}

const NAY=[96.13,19.76], YGN=[96.16,16.84];
const vMM=viewBox([91.5,9,103,28.8]), vMid=viewBox([93.0,15.5,99.5,21.5]), vNay=viewBox([92.6,16.2,99.6,22.8]);
const scenes=[
 {head:'Naypyidaw', headInstant:true, say:S_say[0], cams:[{at:0,view:vMM}],
  under:[e=>{const {u,sc}=e; hl(e,'MMR',GOLD,0.6*clamp((u-wt(sc,'Myanmar'))/0.6),{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,NAY,t,clamp((u-wt(sc,'Naypyidaw'))/0.4),'#FF3D81',11); tag(e,NAY,'Naypyidaw',clamp((u-wt(sc,'Naypyidaw'))/0.4),30,-10,'#fff',34); chip(ctx,'Hauptstadt von Myanmar seit 2005',1180,clamp((u-wt(sc,'seit 2005'))/0.4)*(1-clamp((u-wt(sc,'Aber'))/0.4))); big(ctx,'leere Straßen?',clamp((u-wt(sc,'leere'))/0.4),480,'#fff',110);}]},
 {head:'Der Umzug', say:S_say[1], cams:[{at:0,view:vMM,fly:1.0},{at:0.6,view:vMid,fly:3.0}],
  under:[e=>{hl(e,'MMR',GOLD,0.25,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,YGN,t,clamp((u-wt(sc,'Rangun'))/0.4),'#7FD0FF',10); tag(e,YGN,'Rangun',clamp((u-wt(sc,'Rangun'))/0.4),30,15,'#fff',32); pulse(e,NAY,t,clamp((u-wt(sc,'Gebaut'))/0.4),'#FF3D81',10); tag(e,NAY,'Naypyidaw',clamp((u-wt(sc,'Gebaut'))/0.4),30,-10,'#fff',32);
   const a=P(e,YGN), b=P(e,NAY); arrow(ctx,a[0],a[1]-20,b[0],b[1]+30,clamp((u-wt(sc,'verkündete'))/1.2),GOLD,10);
   big(ctx,u<wt(sc,'Gebaut')?'2005':'ab ≈ 2002',clamp((u-wt(sc,'2005'))/0.4),480,'#fff',130); chip(ctx,'≈ 320 km nach Norden',1180,clamp((u-wt(sc,'320'))/0.4)); chip(ctx,'zunächst weitgehend geheim',1250,clamp((u-wt(sc,'geheim'))/0.4),'#fff','rgba(229,72,77,0.92)');}]},
 {head:'Die Gründe', say:S_say[2], cams:[{at:0,view:vMid,fly:1.0},{at:0.5,view:vMM,fly:3.0}],
  under:[e=>{hl(e,'MMR',GOLD,0.25,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,YGN,t,1,'#7FD0FF',9); pulse(e,NAY,t,1,'#FF3D81',9);
   chip(ctx,'Platzmangel in Rangun',1180,clamp((u-wt(sc,'Platzmangel'))/0.4)*(1-clamp((u-wt(sc,'die zentrale'))/0.4))); chip(ctx,'zentrale Lage im Land',1180,clamp((u-wt(sc,'die zentrale'))/0.4)*(1-clamp((u-wt(sc,'Sicherheit'))/0.4))); chip(ctx,'Sicherheit',1180,clamp((u-wt(sc,'Sicherheit'))/0.4)*(1-clamp((u-wt(sc,'Auch'))/0.4)));
   chip(ctx,'Astrologie: nicht belegt',1180,clamp((u-wt(sc,'Astrologie'))/0.4),'#fff','rgba(229,72,77,0.92)'); big(ctx,'Gründe vage',clamp((u-wt(sc,'vage'))/0.4)*(1-clamp((u-wt(sc,'Genannt'))/0.4)),480,'#fff',120);}]},
 {head:'Straßen für Millionen', say:S_say[3], cams:[{at:0,view:vMM,fly:1.0},{at:0.5,view:vNay,fly:3.0}],
  under:[e=>{hl(e,'MMR',GOLD,0.2,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,NAY,t,1,'#FF3D81',12); big(ctx,u<wt(sc,'Doch')?'20 Spuren':'wenig Verkehr',clamp((u-wt(sc,'zwanzig'))/0.4),480,'#fff',120);
   chip(ctx,'Ministerien, riesiges Parlament',1180,clamp((u-wt(sc,'Ministerien'))/0.4)*(1-clamp((u-wt(sc,'Straßen'))/0.4))); chip(ctx,'Straßen mit bis zu 20 Spuren',1180,clamp((u-wt(sc,'Straßen'))/0.4)*(1-clamp((u-wt(sc,'Doch'))/0.4))); chip(ctx,'Besucherberichte: kaum Verkehr',1180,clamp((u-wt(sc,'Doch'))/0.4),'#fff','rgba(229,72,77,0.92)');}]},
 {head:'Heute', say:S_say[4], cams:[{at:0,view:vNay,fly:1.0},{at:0.5,view:vMM,fly:3.0}],
  under:[e=>{hl(e,'MMR',GOLD,0.2,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,NAY,t,1,'#FF3D81',10); pulse(e,YGN,t,clamp((u-wt(sc,'Rangun'))/0.4),'#7FD0FF',12); tag(e,YGN,'Rangun',clamp((u-wt(sc,'Rangun'))/0.4),30,15,'#fff',32);
   big(ctx,'≈ 1 Mio.',clamp((u-wt(sc,'rund'))/0.4)*(1-clamp((u-wt(sc,'Wirtschaft'))/0.4)),480,'#fff',130); chip(ctx,'Verwaltungszone ≈ 1 Mio. Einwohner',1180,clamp((u-wt(sc,'Verwaltungszone'))/0.4)*(1-clamp((u-wt(sc,'Wirtschaft'))/0.4))); chip(ctx,'Wirtschaft und Alltag: weiter Rangun',1180,clamp((u-wt(sc,'Wirtschaft'))/0.4),'#0B1C2A','rgba(120,230,170,0.96)');}]},
 {head:'Beschluss ≠ Zentrum', say:S_say[5], cams:[{at:0,view:vMM,fly:1.0}],
  under:[e=>{hl(e,'MMR',GOLD,0.3,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,NAY,t,1,'#FF3D81',10); chip(ctx,'Hauptstadt per Beschluss gegründet',1180,clamp((u-wt(sc,'per Beschluss'))/0.4)*(1-clamp((u-wt(sc,'ein lebendiges'))/0.4))); chip(ctx,'lebendiges Zentrum entsteht nicht automatisch',1180,clamp((u-wt(sc,'ein lebendiges'))/0.4),'#0B1C2A','rgba(120,230,170,0.96)');}]},
 {say:S_say[6], cams:[{at:0,view:vMM,fly:1.2},{at:1.4,view:vMM,fly:4.5}],
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
return {tag:'HAUPTSTÄDTE #3', scenes, wt};
}
