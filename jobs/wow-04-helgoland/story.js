// Story: Wow #4 – Helgoland gegen Sansibar
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


const G10=window.G10; const F=k=>({type:'Feature',geometry:G10[k]});
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.4; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}


const HEL=[7.893,54.181], CUX=[8.70,53.87], BRH=[8.58,53.55], KIEL=[10.15,54.37], BRU=[9.14,53.90], REN=[9.65,54.28], ZAN=[39.2,-6.15];
const KAN=[BRU,[9.3,54.05],REN,[10.0,54.35],KIEL];
const vN=viewBox([5.0,52.4,11.2,55.4]), vH=viewBox([5.0,52.6,10.9,55.4]), vA=viewBox([14.0,-27.0,45.0,0.5]), vG=vN;
const scenes=[
 {head:'Eine Insel gegen Afrika', headInstant:true, say:S_say[0], cams:[{at:0,view:vN}],
  under:[e=>{const {u,sc}=e; fill(e,'DEU','#FFE066',0.12);}],
  over:[e=>{const {u,sc,ctx,t}=e; const a=clamp((u-wt(sc,'Helgoland'))/0.4); fill(e,'HGL','#FF3D81',a,3); pulse(e,HEL,t,a,'#FF3D81',14); tag(e,HEL,'Helgoland',a,0,-60,'#fff',36); chip(ctx,'getauscht gegen ein Stück Afrika',1180,clamp((u-wt(sc,'getauscht'))/0.4));}]},
 {head:'Klein und britisch', say:S_say[1], cams:[{at:0,view:vN,fly:1.0},{at:0.2,view:vH,fly:2.5}],
  under:[e=>{fill(e,'DEU','#FFE066',0.12);}],
  over:[e=>{const {u,sc,ctx,t}=e; fill(e,'HGL','#FF3D81',1,3); pulse(e,HEL,t,1,'#FF3D81',12); tag(e,HEL,'Helgoland',1,0,-60,'#fff',32); line(e,[HEL,CUX],'#FFE066',clamp((u-wt(sc,'50'))/0.8),6); chip(ctx,'≈ 1 km² groß',1180,clamp((u-wt(sc,'einen'))/0.4)*(1-clamp((u-wt(sc,'Trotzdem'))/0.4))); chip(ctx,'≈ 50 km vor der Küste',1180,clamp((u-wt(sc,'50'))/0.4)*(1-clamp((u-wt(sc,'Trotzdem'))/0.4))); chip(ctx,'britisch seit 1807',1180,clamp((u-wt(sc,'1807'))/0.4),'#fff','rgba(229,72,77,0.95)');}]},
 {head:'Warum die Marine sie wollte', say:S_say[2], cams:[{at:0,view:vH,fly:1.0},{at:0.2,view:vN,fly:3.0}],
  under:[e=>{fill(e,'DEU','#FFE066',0.12);}],
  over:[e=>{const {u,sc,ctx,t}=e; fill(e,'HGL','#FF3D81',1,3); pulse(e,CUX,t,clamp((u-wt(sc,'Elbe'))/0.4),'#7FD0FF',12); pulse(e,BRH,t,clamp((u-wt(sc,'Weser'))/0.4),'#7FD0FF',12); tag(e,CUX,'Elbe',clamp((u-wt(sc,'Elbe'))/0.4),-50,0,'#fff',28); tag(e,BRH,'Weser',clamp((u-wt(sc,'Weser'))/0.4),-50,0,'#fff',28); line(e,KAN,'#7FD0FF',clamp((u-wt(sc,'Kaiser'))/2.0),7); tag(e,KIEL,'Kiel',clamp((u-wt(sc,'Kiel'))/0.4),30,-20,'#fff',28); chip(ctx,'Marine: Elbe- und Wesermündung',1180,clamp((u-wt(sc,'Marine'))/0.4)*(1-clamp((u-wt(sc,'Kaiser'))/0.4))); chip(ctx,'Kaiser-Wilhelm-Kanal Kiel',1180,clamp((u-wt(sc,'Kaiser'))/0.4));}]},
 {head:'1890: Vertrag', say:S_say[3], cams:[{at:0,view:vN,fly:1.0},{at:0.15,view:vA,fly:3.5}],
  under:[e=>{const {u,sc}=e; fill(e,'DEU','#FFE066',0.1); fill(e,'TZA','#4D9BFF',0.1); fill(e,'ZNZ','#4D9BFF',0.9*clamp((u-wt(sc,'Sansibar'))/0.5));}],
  over:[e=>{const {u,sc,ctx,t}=e; big(ctx,'1890',clamp((u-wt(sc,'1890'))/0.4),480,'#fff',150); pulse(e,ZAN,t,clamp((u-wt(sc,'Sansibar'))/0.4),'#4D9BFF',14); tag(e,ZAN,'Sansibar',clamp((u-wt(sc,'Sansibar'))/0.4),0,-60,'#fff',34); chip(ctx,'Helgoland-Sansibar-Vertrag',1180,clamp((u-wt(sc,'1890'))/0.4)*(1-clamp((u-wt(sc,'Deutschland verzichtete'))/0.4))); chip(ctx,'Verzicht auf Ansprüche in Ostafrika',1180,clamp((u-wt(sc,'Deutschland verzichtete'))/0.4)*(1-clamp((u-wt(sc,'Dafür'))/0.4)),'#fff','rgba(77,155,255,0.95)'); chip(ctx,'Dafür: Helgoland',1180,clamp((u-wt(sc,'Dafür'))/0.4),'#0B1C2A','rgba(255,224,102,0.96)');}]},
 {head:'Caprivi-Zipfel', say:S_say[4], cams:[{at:0,view:vA,fly:1.0}],
  under:[e=>{const {u,sc}=e; fill(e,'NAM','#FF9F40',0.15); fill(e,'CAP','#FF3D81',0.9*clamp((u-wt(sc,'Caprivi'))/0.6),3); fill(e,'TZA','#4D9BFF',0.1);}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,[23.5,-17.8],t,clamp((u-wt(sc,'Caprivi'))/0.4),'#FF3D81',14); tag(e,[23.5,-17.8],'Caprivi-Zipfel',clamp((u-wt(sc,'Caprivi'))/0.4),0,-60,'#fff',32); tag(e,[17.5,-22.5],'Namibia',clamp((u-wt(sc,'Namibia'))/0.4),0,0,'#fff',34); chip(ctx,'schmaler Landstreifen in Namibia',1180,clamp((u-wt(sc,'schmalen'))/0.4));}]},
 {head:'1947 und 1952', say:S_say[5], cams:[{at:0,view:vA,fly:1.0},{at:0.15,view:vH,fly:3.0}],
  under:[e=>{fill(e,'DEU','#FFE066',0.12);}],
  over:[e=>{const {u,sc,ctx,t}=e; fill(e,'HGL','#FF3D81',1,3); pulse(e,HEL,t,1,'#FF3D81',12); const b=clamp((u-wt(sc,'1952'))/0.4); big(ctx,b>0.5?'1952':'1947',clamp((u-wt(sc,'1947'))/0.4),480,'#fff',150); chip(ctx,'1947: gewaltige Sprengung',1180,clamp((u-wt(sc,'1947'))/0.4)*(1-b),'#fff','rgba(229,72,77,0.95)'); chip(ctx,'1952: zurück an Deutschland',1180,b,'#0B1C2A','rgba(255,224,102,0.96)');}]},
 {head:'Heute', say:S_say[6], cams:[{at:0,view:vH,fly:1.0},{at:0.4,view:vA,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'DEU','#FFE066',0.1); fill(e,'TZA','#4D9BFF',0.5*clamp((u-wt(sc,'Tansania'))/0.6)); fill(e,'ZNZ','#4D9BFF',0.9);}],
  over:[e=>{const {u,sc,ctx,t}=e; fill(e,'HGL','#FF3D81',clamp(1-(u-wt(sc,'Sansibar'))/0.4),3); chip(ctx,'≈ 1.300 Einwohner',1180,clamp((u-wt(sc,'1.300'))/0.4)*(1-clamp((u-wt(sc,'Sansibar'))/0.4))); chip(ctx,'Sansibar gehört zu Tansania',1180,clamp((u-wt(sc,'Sansibar'))/0.4),'#fff','rgba(77,155,255,0.95)'); tag(e,ZAN,'Sansibar',clamp((u-wt(sc,'Sansibar'))/0.4),0,-60,'#fff',30);}]},
 {say:S_say[7], cams:[{at:0,view:vG,fly:1.2},{at:1.4,view:vG,fly:4.5}],
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
return {tag:'GEOFY · WOW #4', scenes, wt};
}
