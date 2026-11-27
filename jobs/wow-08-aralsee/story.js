// Wow #8 – Länder, die es nicht mehr gibt
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
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; if(KV.LOOK==='v3') return KV.bigText(ctx,txt,a,y,col,size); ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function line(e,pts,col,prog,w=10,dash=null){if(prog<=0) return; const {ctx}=e; const q=pts.map(p=>P(e,p)); const n=Math.max(2,Math.floor(q.length*Math.min(1,prog))+(prog>=1?0:1)); ctx.save(); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='rgba(5,14,24,0.7)'; ctx.lineWidth=w+7; ctx.beginPath(); q.slice(0,n).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.strokeStyle=col; ctx.lineWidth=w; if(dash) ctx.setLineDash(dash); ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}


const G10=window.G10; const F=k=>G10[k]?{type:'Feature',geometry:G10[k]}:KV.byId().get(k);
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.4; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}



const fx=FX.make({big,chip,fill,P}); const {A,win,VW}=fx; const {PK,GO,CY,TE,RD}=fx.COL;
const {pop,counter}=fx;
const vC=VW(62,44.6,24), vA=VW(60,45.1,7.5), vM=VW(59.3,44.2,6), vG=vC;
const MOY=[59.02,43.77], ARAL=[61.67,46.8], NUK=[59.6,42.46], DAM=[60.85,46.1];
const AMU=[[61.5,40.6],[60.6,41.4],[59.9,42.2],[59.4,42.9],[59.1,43.5]], SYR=[[66.5,44.6],[65.0,45.0],[63.6,45.6],[62.4,45.9],[61.7,46.1]];
const WAT='#3FA9FF', SAND='#D9B77E', RUST='#A0522D';
function lake(e,k,a,col=WAT,s=1){if(a<=0) return; const {ctx,path}=e; const f=F(k); ctx.save(); if(s!==1){const c=path.centroid(f); ctx.translate(c[0],c[1]); ctx.scale(s,s); ctx.translate(-c[0],-c[1]);} ctx.beginPath(); path(f); ctx.globalAlpha=a*0.75; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.4); ctx.strokeStyle='#BFE3FF'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function outline(e,k,a){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.setLineDash([12,10]); ctx.globalAlpha=a; ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function wreck(ctx,x,y,s,a,tilt=0){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.rotate(tilt); ctx.scale(s,s); ctx.fillStyle=RUST; ctx.beginPath(); ctx.moveTo(-90,0); ctx.lineTo(90,0); ctx.lineTo(70,34); ctx.lineTo(-74,34); ctx.closePath(); ctx.fill(); ctx.fillStyle='#7A3E22'; ctx.fillRect(-40,-34,60,34); ctx.fillRect(-10,-62,12,28); ctx.strokeStyle='rgba(0,0,0,0.35)'; ctx.lineWidth=3; for(let i=-70;i<70;i+=20){ctx.beginPath(); ctx.moveTo(i,6); ctx.lineTo(i+6,28); ctx.stroke();} ctx.restore();}
function desert(ctx,a,water){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; rr(ctx,120,700,840,560,32); ctx.clip(); const g=ctx.createLinearGradient(0,700,0,1260); g.addColorStop(0,'#F2D9A6'); g.addColorStop(1,'#C69A5B'); ctx.fillStyle=g; ctx.fillRect(120,700,840,560);
 ctx.fillStyle='rgba(255,255,255,0.25)'; ctx.fillRect(120,700,840,170); if(water>0){ctx.fillStyle=`rgba(63,169,255,${0.85*water})`; ctx.fillRect(120,1000-60*water,840,260+60*water);}
 wreck(ctx,380,1060-40*water,1.1,1,-0.06); wreck(ctx,720,1110-40*water,0.8,1,0.08); ctx.restore(); ctx.save(); ctx.globalAlpha=a; rr(ctx,120,700,840,560,32); ctx.strokeStyle='rgba(255,255,255,0.18)'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();}
function fields(e,a){if(a<=0) return; const {ctx}=e; const pts=[[60.3,41.8],[60.8,41.3],[59.8,42.4],[61.2,40.9],[64.5,45.0],[63.2,45.5],[65.6,44.8],[60.1,42.0],[59.5,42.7]]; pts.forEach((ll,i)=>{const q=P(e,ll); if(!q) return; const k=clamp(a*1.5-i*0.08); if(k<=0) return; ctx.save(); ctx.globalAlpha=k; ctx.fillStyle=i%2?'#7FCB6A':'#9BD67F'; ctx.fillRect(q[0]-22,q[1]-14,44,28); ctx.strokeStyle='#E9F7E1'; ctx.lineWidth=2; for(let j=-16;j<=16;j+=8){ctx.beginPath(); ctx.moveTo(q[0]+j,q[1]-12); ctx.lineTo(q[0]+j,q[1]+12); ctx.stroke();} ctx.restore();});}
function dust(e,a){if(a<=0) return; const {ctx,t}=e; const src=P(e,[59.8,44.6]), dst=[P(e,NUK),P(e,MOY),P(e,[61.2,43.5])]; if(!src) return; ctx.save(); for(let k=0;k<60;k++){const d=dst[k%3]; if(!d) continue; const ph=((t*0.25)+k/60)%1; const x=src[0]+(d[0]-src[0])*ph+Math.sin(k*3+t*2)*30, y=src[1]+(d[1]-src[1])*ph+Math.cos(k*2+t)*20; ctx.globalAlpha=a*0.55*(1-ph); ctx.fillStyle=k%3?'#E8DCC8':'#FFFFFF'; ctx.beginPath(); ctx.arc(x,y,6+ph*14,0,7); ctx.fill();} ctx.restore();}
const scenes=[
 {head:'Schiffe in der Wüste', headInstant:true, say:S_say[0], cams:[{at:0,view:vM}],
  pops:[sc=>wt(sc,'Wüste'),sc=>wt(sc,'60'),sc=>wt(sc,'passiert')], swish:[sc=>wt(sc,'60')],
  over:[e=>{const {u,sc,ctx}=e; const t6=wt(sc,'60'), tp=wt(sc,'Was ist');
   desert(ctx,1,A(u,t6,0.6)*(1-A(u,tp,0.9)));
   pop(ctx,'mitten in der Wüste',win(u,0,t6,0.15),u,0,560,'#fff',96);
   pop(ctx,'vor 60 Jahren: Wasser',win(u,t6,tp,0.15),u,t6,560,'#fff',90);
   pop(ctx,'Was ist passiert?',A(u,tp,0.15),u,tp,560,'#fff',104); chip(ctx,'Moynaq, Usbekistan',1360,A(u,0.4,0.3));}]},
 {head:'Der Aralsee 1960', say:S_say[1], cams:[{at:0,view:vC,fly:1.2},{at:sc=>wt(sc,'1960'),view:vA,fly:1.4}],
  pops:[sc=>wt(sc,'viertgrößte'),sc=>wt(sc,'68.000'),sc=>wt(sc,'Bayern')], swish:[0,sc=>wt(sc,'1960')],
  under:[e=>{const {u,sc}=e; fill(e,'KAZ','#7FD0FF',0.3*A(u,wt(sc,'Kasachstan'),0.3)); fill(e,'UZB','#FFE066',0.3*A(u,wt(sc,'Usbekistan'),0.3));}],
  over:[e=>{const {u,sc,ctx}=e; const t1=wt(sc,'1960'), tv=wt(sc,'viertgrößte'), t6=wt(sc,'68.000'), tb=wt(sc,'Bayern');
   lake(e,'A60',A(u,t1-0.4,0.6)); tag(e,[66,47.5],'Kasachstan',A(u,wt(sc,'Kasachstan'),0.3)*(1-A(u,t1)),0,0,'#fff',34); tag(e,[63,41.5],'Usbekistan',A(u,wt(sc,'Usbekistan'),0.3)*(1-A(u,t1)),0,0,'#fff',34);
   pop(ctx,'1960',win(u,t1,tv,0.2),u,t1,560,'#fff',160); pop(ctx,'Nr. 4 der Welt',win(u,tv,t6,0.2),u,tv,560,'#fff',120);
   counter(ctx,0,68000,win(u,t6,tb,0.2),u,t6,560,130,' km²'); pop(ctx,'≈ Bayern',A(u,tb,0.2),u,tb,560,'#fff',130); chip(ctx,'viertgrößter See der Erde',1360,A(u,tv,0.25));}]},
 {head:'Die Flüsse werden umgeleitet', say:S_say[2], cams:[{at:0,view:vC,fly:1.4}],
  pops:[sc=>wt(sc,'leitete'),sc=>wt(sc,'Baumwoll')], swish:[0],
  over:[e=>{const {u,sc,ctx}=e; const tu=wt(sc,'leitete'), tb=wt(sc,'Baumwoll'); lake(e,'A60',1);
   line(e,AMU,WAT,A(u,0.2,1.0),8); line(e,SYR,WAT,A(u,0.4,1.0),8); tag(e,[60.3,41.6],'Amudarja',A(u,wt(sc,'Amudarja'),0.3),-90,0,'#fff',30); tag(e,[64.2,45.6],'Syrdarja',A(u,wt(sc,'Syrdarja'),0.3),0,-40,'#fff',30);
   fields(e,A(u,tb-0.3,1.4)); pop(ctx,'umgeleitet',win(u,tu,tb,0.2),u,tu,560,'#fff',130); pop(ctx,'für Baumwolle',A(u,tb,0.2),u,tb,560,'#fff',110); chip(ctx,'Bewässerung in der Wüste',1360,A(u,tb+0.3,0.25),'#0B1C2A','rgba(255,224,102,0.96)');}]},
 {head:'Der See schrumpft', say:S_say[3], cams:[{at:0,view:vA,fly:1.2}],
  pops:[sc=>wt(sc,'2007'),sc=>wt(sc,'zehn')], swish:[0],
  over:[e=>{const {u,sc,ctx}=e; const ts=wt(sc,'schrumpfte'), tz=wt(sc,'zehn'); const k=A(u,0.4,Math.max(1,tz-0.4));
   lake(e,'A60',1-k); outline(e,'A60',A(u,0.4,0.3)); lake(e,'NOR',A(u,ts-0.6,0.8)); lake(e,'WST',A(u,ts-0.6,0.8));
   big(ctx,String(Math.round(1960+47*eout(clamp((u-0.3)/Math.max(1,tz-0.6))))),win(u,0.3,tz,0.2),560,'#fff',150); fx.badge(ctx,'1960 → 2007',A(u,0.3,0.3),'rgba(6,20,40,0.85)');
   counter(ctx,100,10,A(u,tz,0.2),u,tz-0.6,560,170,' %'); chip(ctx,'von der ursprünglichen Fläche',1360,A(u,tz,0.25),'#fff','rgba(229,72,77,0.95)');}],
  top:[e=>fx.flash(e.ctx,e.u,wt(e.sc,'zehn'),'rgba(229,72,77,',0.2)]},
 {head:'Eine neue Wüste', say:S_say[4], cams:[{at:0,view:vA,fly:0.6}],
  pops:[sc=>wt(sc,'Aralkum'),sc=>wt(sc,'Salz')], swish:[sc=>wt(sc,'Wind')],
  over:[e=>{const {u,sc,ctx}=e; const ta=wt(sc,'Aralkum'), tw=wt(sc,'Wind'); outline(e,'A60',1); lake(e,'NOR',1); lake(e,'WST',1);
   const {path}=e; ctx.save(); ctx.beginPath(); path(F('A60')); ctx.globalAlpha=0.55*A(u,0.2,0.6); ctx.fillStyle=SAND; ctx.fill(); ctx.restore(); lake(e,'NOR',1); lake(e,'WST',1);
   dust(e,A(u,tw,0.6)); tag(e,NUK,'Nukus',A(u,tw+0.4,0.3),0,40,'#fff',28);
   pop(ctx,'Aralkum',win(u,ta,tw,0.2),u,ta,560,'#fff',150); pop(ctx,'Salz und Staub',A(u,wt(sc,'Salz'),0.2),u,wt(sc,'Salz'),560,'#fff',110); chip(ctx,'die jüngste Wüste der Erde',1360,A(u,ta+0.3,0.25));}]},
 {head:'Es gibt Hoffnung', say:S_say[5], cams:[{at:0,view:VW(60.8,46.3,6),fly:1.4}],
  pops:[sc=>wt(sc,'Damm'),sc=>wt(sc,'wächst'),sc=>wt(sc,'Fische')], swish:[0],
  over:[e=>{const {u,sc,ctx,t}=e; const td=wt(sc,'Damm'), tw=wt(sc,'wächst'), tf=wt(sc,'Fische'); outline(e,'A60',0.7); lake(e,'NOR',1,WAT,1+0.18*eout(A(u,tw,1.6)));
   const q=P(e,DAM); if(q){const k=A(u,td,0.4); ctx.save(); ctx.globalAlpha=k; ctx.strokeStyle='#FFE066'; ctx.lineWidth=12; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(q[0]-60*k,q[1]+10*k); ctx.lineTo(q[0]+60*k,q[1]-10*k); ctx.stroke(); ctx.restore();}
   tag(e,DAM,'Damm (2005)',A(u,td,0.3),0,50,'#fff',30); fx.ripple(e,[60.7,46.4],A(u,tw,0.4));
   pop(ctx,'Hoffnung',win(u,0.2,td,0.2),u,0.2,560,'#fff',140); pop(ctx,'der Norden wächst',win(u,tw,tf,0.2),u,tw,560,'#fff',100);
   pop(ctx,'die Fische kommen zurück',A(u,tf,0.2),u,tf,560,'#fff',80); chip(ctx,'Nordaralsee',1360,A(u,tw,0.25),'#0B1C2A','rgba(51,209,176,0.96)');}]},
 {head:'Ein ganzes Meer', say:S_say[6], cams:[{at:0,view:vM,fly:1.2}],
  pops:[sc=>wt(sc,'Meer')], swish:[0],
  over:[e=>{const {u,sc,ctx}=e; desert(ctx,A(u,0.2,0.4),0); pop(ctx,'ein ganzes Meer',A(u,wt(sc,'ganzes'),0.2),u,wt(sc,'ganzes'),560,'#fff',110);}]},
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
return {tag:'GEOFY · WOW #8', scenes, wt};
}
