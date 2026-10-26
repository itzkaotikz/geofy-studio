// Story: Hauptstädte #4 – Ankara
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


const IST=[28.98,41.01], ANK=[32.86,39.93];
const RAIL=[[28.98,41.01],[29.9,40.75],[30.4,40.2],[31.2,40.0],[32.86,39.93]];
const vTR=viewBox([24.8,35.2,45.2,43]), vIA=viewBox([26.2,37.6,35.8,42.6]);
const scenes=[
 {head:'Istanbul oder Ankara?', headInstant:true, say:S_say[0], cams:[{at:0,view:vTR}],
  under:[e=>{const {u,sc}=e; hl(e,'TUR',GOLD,0.5*clamp((u-wt(sc,'Istanbul'))/0.6),{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,IST,t,clamp((u-wt(sc,'Istanbul'))/0.4),'#7FD0FF',11); tag(e,IST,'Istanbul',clamp((u-wt(sc,'Istanbul'))/0.4),-150,-5,'#fff',32);
   pulse(e,ANK,t,clamp((u-wt(sc,'Ankara'))/0.4),'#FF3D81',11); tag(e,ANK,'Ankara',clamp((u-wt(sc,'Ankara'))/0.4),25,-10,'#fff',32);
   chip(ctx,'größte Stadt: Istanbul',1180,clamp((u-wt(sc,'größte'))/0.4)*(1-clamp((u-wt(sc,'Trotzdem'))/0.4))); chip(ctx,'Hauptstadt: Ankara',1180,clamp((u-wt(sc,'Trotzdem'))/0.4),'#fff','rgba(255,61,129,0.95)'); big(ctx,'Warum?',clamp((u-wt(sc,'Warum?'))/0.4),480,'#fff',130);}]},
 {head:'Besetzt und Neuanfang', say:S_say[1], cams:[{at:0,view:vTR,fly:1.0},{at:0.5,view:vIA,fly:3.0}],
  under:[e=>{hl(e,'TUR',GOLD,0.25,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,IST,t,1,'#E5484D',11); tag(e,IST,'Istanbul',1,-150,-5,'#fff',30); pulse(e,ANK,t,clamp((u-wt(sc,'Ankara'))/0.4),'#FF3D81',11); tag(e,ANK,'Ankara',clamp((u-wt(sc,'Ankara'))/0.4),25,-10,'#fff',30);
   const a=P(e,IST), b=P(e,ANK); arrow(ctx,a[0]+25,a[1]+10,b[0]-30,b[1]-5,clamp((u-wt(sc,'Landesinneren'))/1.2),GOLD,10);
   chip(ctx,'Istanbul von Alliierten besetzt (1918–1923)',1180,clamp((u-wt(sc,'besetzt'))/0.4)*(1-clamp((u-wt(sc,'Mustafa'))/0.4))); chip(ctx,'Führung der Nationalbewegung im Landesinneren',1180,clamp((u-wt(sc,'Mustafa'))/0.4)*(1-clamp((u-wt(sc,'Parlament'))/0.4))); big(ctx,'1920',clamp((u-wt(sc,'1920'))/0.4),480,'#fff',140); chip(ctx,'1920: erstes Parlament in Ankara',1180,clamp((u-wt(sc,'Parlament'))/0.4));}]},
 {head:'Vorteile von Ankara', say:S_say[2], cams:[{at:0,view:vIA,fly:1.0},{at:0.5,view:vTR,fly:3.0}],
  under:[e=>{hl(e,'TUR',GOLD,0.25,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,IST,t,1,'#7FD0FF',9); pulse(e,ANK,t,1,'#FF3D81',11); line(e,RAIL,GOLD,clamp((u-wt(sc,'Bahnanschluss'))/1.4),8);
   chip(ctx,'zentral in Anatolien',1180,clamp((u-wt(sc,'zentral'))/0.4)*(1-clamp((u-wt(sc,'weit weg'))/0.4))); chip(ctx,'weit weg von Küste und Kriegsschiffen',1180,clamp((u-wt(sc,'weit weg'))/0.4)*(1-clamp((u-wt(sc,'Bahnanschluss'))/0.4))); chip(ctx,'schon Bahnanschluss (Linie schematisch)',1180,clamp((u-wt(sc,'Bahnanschluss'))/0.4));}]},
 {head:'13. Oktober 1923', say:S_say[3], cams:[{at:0,view:vTR,fly:1.0},{at:0.5,view:vIA,fly:3.0}],
  under:[e=>{hl(e,'TUR',GOLD,0.3,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,ANK,t,1,'#FF3D81',13); tag(e,ANK,'Ankara',1,25,-10,'#fff',32); big(ctx,u<wt(sc,'Wenige')?'13.10.1923':'Republik',clamp((u-wt(sc,'13.'))/0.4),480,'#fff',130); chip(ctx,'Ankara wird Hauptstadt',1180,clamp((u-wt(sc,'offiziell'))/0.4)*(1-clamp((u-wt(sc,'Wenige'))/0.4))); chip(ctx,'29. Oktober 1923: Republik ausgerufen',1180,clamp((u-wt(sc,'Wenige'))/0.4));}]},
 {head:'Ein Zeichen', say:S_say[4], cams:[{at:0,view:vIA,fly:1.0},{at:0.5,view:vTR,fly:3.0}],
  under:[e=>{hl(e,'TUR',GOLD,0.3,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,IST,t,1,'#7FD0FF',10); pulse(e,ANK,t,1,'#FF3D81',12); chip(ctx,'Bruch mit dem Sultanat',1180,clamp((u-wt(sc,'Bruch'))/0.4)); chip(ctx,'und mit der alten Hauptstadt am Bosporus',1250,clamp((u-wt(sc,'alten'))/0.4),'#fff','rgba(229,72,77,0.92)');}]},
 {head:'Damals und heute', say:S_say[5], cams:[{at:0,view:vTR,fly:1.0}],
  under:[e=>{hl(e,'TUR',GOLD,0.3,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,ANK,t,1,'#FF3D81',12); big(ctx,u<wt(sc,'Heute')?'einige 10.000':'≈ 6 Mio.',clamp((u-wt(sc,'einigen'))/0.4),480,'#fff',120); chip(ctx,'Ankara damals: kleine Stadt',1180,clamp((u-wt(sc,'kleine'))/0.4)*(1-clamp((u-wt(sc,'Heute'))/0.4))); chip(ctx,'Ankara heute: rund 6 Mio. Einwohner',1180,clamp((u-wt(sc,'Heute'))/0.4));}]},
 {head:'Istanbul bleibt Zentrum', say:S_say[6], cams:[{at:0,view:vTR,fly:1.0},{at:0.5,view:vIA,fly:3.0}],
  under:[e=>{hl(e,'TUR',GOLD,0.3,{outline:true});}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,IST,t,1,'#7FD0FF',13); tag(e,IST,'Istanbul',1,-150,-5,'#fff',32); pulse(e,ANK,t,1,'#FF3D81',9); chip(ctx,'Istanbul: Wirtschaft und Kultur',1180,clamp((u-wt(sc,'wirtschaftliche'))/0.4),'#0B1C2A','rgba(120,230,170,0.96)');}]},
 {say:S_say[7], cams:[{at:0,view:vTR,fly:1.2},{at:1.4,view:vTR,fly:4.5}],
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
return {tag:'HAUPTSTÄDTE #4', scenes, wt};
}
