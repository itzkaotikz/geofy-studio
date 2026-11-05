// Story: Was wäre wenn #1 – Bosporus gesperrt
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


const BOS=[[29.13,41.23],[29.08,41.17],[29.06,41.11],[29.04,41.07],[29.01,41.03],[28.99,41.0]];
const IST=[29.0,41.05], BSEA=[33.5,43.2], MARM=[28.2,40.75], AEG=[25.4,39.6], MON=[6.91,46.43];
const ROUTE=[[31.5,42.6],[29.6,41.6],...BOS,[28.4,40.8],[27.2,40.55],[26.65,40.38],[26.35,40.15],[26.1,40.0],AEG];
const KAN=[[28.62,41.30],[28.66,41.2],[28.72,41.1],[28.77,41.0]];
const vI=viewBox([26.0,39.2,32.0,42.6]), vB=viewBox([26.5,41.0,42.5,48.5]), vM=viewBox([20.0,34.5,42.5,47.5]), vE=viewBox([4.0,37.0,33.0,49.0]);
const vG=vM;
const CC=[['TUR','Türkei'],['BGR','Bulgarien'],['ROU','Rumänien'],['UKR','Ukraine'],['RUS','Russland'],['GEO','Georgien']];
const scenes=[
 {head:'Was wäre wenn …', headInstant:true, say:S_say[0], cams:[{at:0,view:vI}],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.12);}],
  over:[e=>{const {u,sc,ctx,t}=e; const a=clamp((u-wt(sc,'Bosporus'))/0.4); line(e,BOS,'#FF3D81',a*1.0,12); pulse(e,IST,t,a,'#FF3D81',13); tag(e,[29.6,41.05],'Bosporus',a,90,0,'#fff',36); chip(ctx,'… der Bosporus gesperrt wird?',1180,clamp((u-wt(sc,'gesperrt'))/0.4),'#fff','rgba(229,72,77,0.95)'); tag(e,[28.95,40.85],'Istanbul',clamp((u-wt(sc,'Istanbul'))/0.4),0,40,'#fff',30);}]},
 {head:'Eine schmale Meerenge', say:S_say[1], cams:[{at:0,view:vI},{at:0.45,view:vM,fly:2.5}],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.12);}],
  over:[e=>{const {u,sc,ctx,t}=e; line(e,BOS,'#FF3D81',1,12); chip(ctx,'≈ 30 km lang',1180,clamp((u-wt(sc,'30'))/0.4)*(1-clamp((u-wt(sc,'700'))/0.4))); chip(ctx,'nur ≈ 700 m breit',1180,clamp((u-wt(sc,'700'))/0.4)*(1-clamp((u-wt(sc,'verbindet'))/0.4)),'#fff','rgba(229,72,77,0.95)'); const a=clamp((u-wt(sc,'Schwarze'))/0.4); tag(e,BSEA,'Schwarzes Meer',a,0,0,'#fff',36); tag(e,[24.5,36.0],'Mittelmeer',clamp((u-wt(sc,'Mittelmeer'))/0.4),0,0,'#fff',36); line(e,ROUTE,'#7FD0FF',clamp((u-wt(sc,'verbindet'))/2.0),7);}]},
 {head:'Sechs Länder, ein Ausgang', say:S_say[2], cams:[{at:0,view:vB,fly:1.5}],
  under:[e=>{const {u,sc}=e; CC.forEach(([k,n],i)=>fill(e,k,['#FF7A3D','#FFE066','#4D9BFF','#33D1B0','#E5484D','#B98CFF'][i],0.85*clamp((u-wt(sc,n))/0.4),3));}],
  over:[e=>{const {u,sc,ctx,t}=e; chip(ctx,'6 Länder am Schwarzen Meer',1180,clamp((u-wt(sc,'Sechs'))/0.4)*(1-clamp((u-wt(sc,'Ihre'))/0.4))); const a=clamp((u-wt(sc,'hier'))/0.4); pulse(e,IST,t,a,'#FF3D81',15); chip(ctx,'einziger Weg ins Mittelmeer',1180,a,'#fff','rgba(229,72,77,0.95)');}]},
 {head:'Ein Nadelöhr der Welt', say:S_say[3], cams:[{at:0,view:vB},{at:0.2,view:vM,fly:2.5}],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.12);}],
  over:[e=>{const {u,sc,ctx,t}=e; line(e,ROUTE,'#FFE066',clamp((u-0.2)/2.5),9); big(ctx,'≈ 40.000',clamp((u-wt(sc,'40.000'))/0.4)*(1-clamp((u-wt(sc,'Eine Sperrung'))/0.4)),480,'#fff',140); chip(ctx,'Schiffe pro Jahr',1180,clamp((u-wt(sc,'Schiffe'))/0.4)*(1-clamp((u-wt(sc,'Getreide'))/0.4))); chip(ctx,'Getreide · Öl · Container',1180,clamp((u-wt(sc,'Getreide'))/0.4)*(1-clamp((u-wt(sc,'Eine Sperrung'))/0.4))); chip(ctx,'Preise weltweit ↑',1180,clamp((u-wt(sc,'Preise'))/0.4),'#fff','rgba(229,72,77,0.95)');}]},
 {head:'Der Vertrag von Montreux', say:S_say[4], cams:[{at:0,view:vM},{at:0.3,view:vE,fly:2.5}],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.15);}],
  over:[e=>{const {u,sc,ctx,t}=e; const a=clamp((u-wt(sc,'Montreux'))/0.4); pulse(e,MON,t,a,'#FFE066',13); tag(e,MON,'Montreux',a,0,-55,'#fff',32); line(e,BOS,'#FF3D81',1,10); big(ctx,'1936',clamp((u-wt(sc,'1936'))/0.4)*(1-clamp((u-wt(sc,'Handelsschiffe'))/0.4)),480,'#fff',150); chip(ctx,'Handelsschiffe: frei im Frieden',1180,clamp((u-wt(sc,'Handelsschiffe'))/0.4),'#0B1C2A','rgba(51,209,176,0.96)');}]},
 {head:'Und im Krieg?', say:S_say[5], cams:[{at:0,view:vE},{at:0.1,view:vI,fly:2.5}],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.15);}],
  over:[e=>{const {u,sc,ctx,t}=e; line(e,BOS,'#E5484D',1,14); pulse(e,IST,t,1,'#E5484D',13); chip(ctx,'Kriegsschiffe: Türkei kann beschränken',1180,clamp((u-wt(sc,'Kriegsschiffe'))/0.4),'#fff','rgba(229,72,77,0.95)'); big(ctx,'2022',clamp((u-wt(sc,'2022'))/0.4),480,'#fff',150);}]},
 {head:'Kanal Istanbul', say:S_say[6], cams:[{at:0,view:vI}],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.15);}],
  over:[e=>{const {u,sc,ctx,t}=e; line(e,BOS,'#FF3D81',1,12); const a=clamp((u-wt(sc,'Kanal'))/1.2); line(e,KAN,"#FFE066",a,12,[16,10]); tag(e,[28.3,41.15],'Kanal Istanbul?',clamp((u-wt(sc,'Kanal'))/0.4),-60,0,'#fff',30); chip(ctx,'geplant – aber noch nicht gebaut',1180,clamp((u-wt(sc,'noch nicht'))/0.4),'#0B1C2A','rgba(255,224,102,0.96)');}]},
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
return {tag:'GEOFY · WAS WÄRE WENN #1', scenes, wt};
}
