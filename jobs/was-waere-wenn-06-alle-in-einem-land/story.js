// Story: Was wäre wenn #6 – Länder, die es nicht mehr gibt
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



const GO='#FFE066', TE='#33D1B0', PK='#FF3B7F', CY='#7FD0FF', GR='#7FCB6A';
const A=(u,t0,d=0.35)=>clamp((u-t0)/d);
const win=(u,t0,t1,d=0.3)=>clamp((u-t0)/d)*(1-clamp((u-t1)/d));
const VW=(lon,lat,wdeg)=>({lon,lat,scale:920/(wdeg*Math.PI/180)});
const vWorld=VW(15,25,230), vEU=VW(10,46,30), vNY=VW(-74.0,40.75,6), vMA=VW(2.95,39.6,6), vIT=VW(12.5,42.5,16);
const vG=vWorld;
const PAR=[2.35,48.86], NYC=[-73.97,40.78], MAJ=[2.95,39.62];
function pop(ctx,txt,a,u,t0,y=600,col='#fff',size=130){if(a<=0||window.NO_CHIPS) return; const k=1+0.3*Math.max(0,1-(u-t0)/0.25); ctx.save(); ctx.translate(540,y); ctx.scale(k,k); ctx.translate(-540,-y); big(ctx,txt,a,y,col,size); ctx.restore();}
function flash(ctx,u,t0,col='rgba(255,224,102,',m=0.28){const a=1-clamp((u-t0)/0.45); if(u<t0||a<=0) return; ctx.save(); ctx.fillStyle=col+(a*m)+')'; ctx.fillRect(0,0,1080,1920); ctx.restore();}
function counter(ctx,from,to,a,u,t0,y,size=120,suf='',dur=1.0){if(a<=0) return; const k=eout(clamp((u-t0)/dur)); big(ctx,Math.round(from+(to-from)*k).toLocaleString('de-DE')+suf,a,y,'#fff',size);}
// people dots: random points on land, computed once
const FEATS=[...KV.byId().values()]; const DOTS=[]; (()=>{let s=7; const rnd=()=>{s=(s*16807)%2147483647; return s/2147483647;}; let tries=0;
 while(DOTS.length<520&&tries<20000){tries++; const lon=-170+rnd()*340, lat=-50+rnd()*120; const ft=FEATS.find(f=>d3.geoContains(f,[lon,lat])); if(ft) DOTS.push({ll:[lon,lat],r:rnd()});}})();
// target points inside a feature (for converging)
function targets(f,n,seed=3){const b=d3.geoBounds(f); let s=seed; const rnd=()=>{s=(s*16807)%2147483647; return s/2147483647;}; const out=[]; let k=0; while(out.length<n&&k<20000){k++; const p=[b[0][0]+rnd()*(b[1][0]-b[0][0]), b[0][1]+rnd()*(b[1][1]-b[0][1])]; if(d3.geoContains(f,p)) out.push(p);} return out;}
const ITA=KV.byId().get('ITA'), DEU=KV.byId().get('DEU'); const TIT=targets(ITA,DOTS.length);
function people(e,a,k,tg=TIT){if(a<=0) return; const {ctx,t}=e; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='#FFFFFF'; ctx.shadowColor='rgba(255,255,255,0.8)'; ctx.shadowBlur=6;
 DOTS.forEach((d,i)=>{const kk=eout(clamp(k*1.4-d.r*0.4)); const g=tg[i%tg.length]; const ll=[d.ll[0]+(g[0]-d.ll[0])*kk, d.ll[1]+(g[1]-d.ll[1])*kk]; const q=P(e,ll); if(!q) return; ctx.beginPath(); ctx.arc(q[0],q[1],3.2+0.6*Math.sin(t*3+i),0,7); ctx.fill();}); ctx.restore();}
function bars(ctx,a,u,t0,t1){if(a<=0) return; const x=110,w=860; ctx.save(); ctx.globalAlpha=a; rr(ctx,x-30,760,w+60,420,32); ctx.fillStyle='rgba(6,20,40,0.78)'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.16)'; ctx.lineWidth=2; ctx.stroke();
 ctx.fillStyle='#fff'; ctx.font=`700 34px ${FB}`; ctx.fillText('Landfläche der Erde',x,820);
 const row=(y,lab,share,col,k)=>{ctx.fillStyle='rgba(255,255,255,0.12)'; rr(ctx,x,y,w,54,14); ctx.fill(); ctx.fillStyle=col; rr(ctx,x,y,Math.max(10,w*share*eout(k)),54,14); ctx.fill(); ctx.fillStyle='#fff'; ctx.font=`700 32px ${FB}`; ctx.fillText(lab,x,y-14);};
 row(910,'Wohnen (alle in Italien): ≈ 0,2 %',0.002,PK,A(u,t0,0.6)); row(1060,'Felder und Weiden: ≈ 33 %',0.33,GR,A(u,t1,1.0)); ctx.restore();}
function crowd(ctx,a){if(a<=0) return; const x0=240,y0=760,c=12,s=50; ctx.save(); ctx.globalAlpha=a; rr(ctx,x0-40,y0-90,600+0,640,32); ctx.fillStyle='rgba(6,20,40,0.78)'; ctx.fill();
 ctx.fillStyle='#fff'; ctx.font=`700 30px ${FB}`; ctx.fillText('1 m²',x0,y0-40); ctx.strokeStyle=CY; ctx.lineWidth=3; ctx.strokeRect(x0,y0,2*s*2.4,2*s*2.4);
 for(let i=0;i<4;i++){const px=x0+40+(i%2)*120, py=y0+40+Math.floor(i/2)*120; if(i>1) continue; ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(px+20,py+10,18,0,7); ctx.fill(); rr(ctx,px,py+34,40,60,14); ctx.fill();}
 ctx.font=`800 44px ${FB}`; ctx.fillText('= 2 Menschen',x0,y0+330); ctx.restore();}
const scenes=[
 {head:'Alle in einem Land?', headInstant:true, say:S_say[0], cams:[{at:0,view:vWorld},{at:sc=>wt(sc,'kleiner'),view:vEU,fly:1.8}],
  pops:[sc=>wt(sc,'acht'),sc=>wt(sc,'Wie groß'),sc=>wt(sc,'kleiner'),sc=>wt(sc,'Viel')], swish:[sc=>wt(sc,'kleiner')],
  over:[e=>{const {u,sc,ctx}=e; const te=wt(sc,'einziges'), tw=wt(sc,'Wie groß'), tk=wt(sc,'kleiner'), tv=wt(sc,'Viel');
   people(e,A(u,0,0.3),A(u,te,2.2)*0.55,TIT);
   counter(ctx,7.9e9,8.2e9,win(u,0,tw,0.15),u,0,600,104,'',1.6); chip(ctx,'Menschen',1180,win(u,0.3,te,0.25));
   chip(ctx,'alle in 1 Land',1180,win(u,te,tw,0.25),'#fff','rgba(229,72,77,0.95)');
   pop(ctx,'Wie groß?',win(u,tw,tk,0.15),u,tw,600,'#fff',150);
   pop(ctx,'kleiner, als du denkst',win(u,tk,tv,0.15),u,tk,600,'#fff',86); pop(ctx,'Viel kleiner.',A(u,tv,0.15),u,tv,600,'#fff',130);}]},
 {head:'So dicht wie Paris', say:S_say[1], cams:[{at:0,view:vEU,fly:0.6}],
  pops:[sc=>wt(sc,'Paris'),sc=>wt(sc,'20.000'),sc=>wt(sc,'Deutschland')], swish:[sc=>wt(sc,'reicht')],
  under:[e=>{const {u,sc}=e; hl(e,'DEU',CY,0.9*A(u,wt(sc,'Deutschland'),0.4));}],
  over:[e=>{const {u,sc,ctx,t}=e; const tp=wt(sc,'Paris'), t2=wt(sc,'20.000'), tr=wt(sc,'reicht'), td=wt(sc,'Deutschland');
   pulse(e,PAR,t,A(u,tp,0.3)*(1-A(u,td)),PK,11); tag(e,PAR,'Paris',A(u,tp,0.3)*(1-A(u,td)),0,-46,'#fff',34);
   counter(ctx,0,20000,win(u,t2,tr,0.2),u,t2,600,130); chip(ctx,'Menschen pro km²',1180,win(u,t2,tr,0.25));
   pop(ctx,'≈ 412.000 km²',win(u,tr,td,0.2),u,tr,600,'#fff',110);
   pop(ctx,'≈ Deutschland',A(u,td,0.2),u,td,600,'#fff',120); chip(ctx,'etwas größer als Deutschland',1180,A(u,td,0.25));}]},
 {head:'So dicht wie Manhattan', say:S_say[2], cams:[{at:0,view:vNY,fly:1.4},{at:sc=>wt(sc,'Dann passt')-0.1,view:vEU,fly:1.4},{at:sc=>wt(sc,'Rest')-0.1,view:vWorld,fly:1.6}],
  pops:[sc=>wt(sc,'Manhattan'),sc=>wt(sc,'29.000'),sc=>wt(sc,'Italien'),sc=>wt(sc,'leer')], swish:[0,sc=>wt(sc,'Dann passt')-0.1,sc=>wt(sc,'Rest')-0.1],
  under:[e=>{const {u,sc}=e; hl(e,'ITA',PK,0.95*A(u,wt(sc,'Italien'),0.4));}],
  over:[e=>{const {u,sc,ctx,t}=e; const tm=wt(sc,'Manhattan'), t2=wt(sc,'29.000'), tdp=wt(sc,'Dann passt'), ti=wt(sc,'Italien'), tr=wt(sc,'Rest');
   pulse(e,NYC,t,A(u,0.3,0.3)*(1-A(u,tdp)),PK,11); tag(e,NYC,'Manhattan',A(u,tm,0.3)*(1-A(u,tdp)),0,-46,'#fff',34);
   counter(ctx,0,29000,win(u,t2,tdp,0.2),u,t2,600,130); chip(ctx,'fast 29.000 pro km²',1180,win(u,t2,tdp,0.25));
   people(e,A(u,tdp,0.4),1,TIT); pop(ctx,'≈ Italien',win(u,ti,tr,0.2),u,ti,600,'#fff',130); chip(ctx,'≈ 285.000 km²',1180,win(u,ti,tr,0.25));
   pop(ctx,'Rest der Erde: leer',A(u,tr,0.2),u,tr,600,'#fff',90);}]},
 {head:'Dicht an dicht', say:S_say[3], cams:[{at:0,view:vIT,fly:1.2},{at:sc=>wt(sc,'Dann reicht')-0.2,view:vMA,fly:1.6}],
  pops:[sc=>wt(sc,'zwei'),sc=>wt(sc,'Mallorca')], swish:[0,sc=>wt(sc,'Dann reicht')-0.2],
  under:[e=>{const {u,sc}=e; hl(e,'ITA',PK,0.9*(1-A(u,wt(sc,'Dann reicht'),0.5))); fill(e,'MAL',GO,0.95*A(u,wt(sc,'Mallorca'),0.4),4);}],
  over:[e=>{const {u,sc,ctx}=e; const tz=wt(sc,'zwei'), td=wt(sc,'Dann reicht'), tm=wt(sc,'Mallorca');
   crowd(ctx,win(u,tz-0.3,td,0.3)); pop(ctx,'4.100 km²',win(u,td,tm,0.2),u,td,600,'#fff',140);
   pop(ctx,'≈ Mallorca',A(u,tm,0.2),u,tm,600,'#fff',130); chip(ctx,'etwas größer als Mallorca',1180,A(u,tm,0.25),'#0B1C2A','rgba(255,224,102,0.96)');}]},
 {head:'Der Haken', say:S_say[4], cams:[{at:0,view:vWorld,fly:1.6}],
  pops:[sc=>wt(sc,'Haken'),sc=>wt(sc,'Essen'),sc=>wt(sc,'Drittel')], swish:[0],
  under:[e=>{const {u,sc}=e; hl(e,'ITA',PK,0.9);}],
  over:[e=>{const {u,sc,ctx}=e; const th=wt(sc,'Haken'), tw=wt(sc,'Wohnen'), te=wt(sc,'Essen'), tf=wt(sc,'Felder');
   pop(ctx,'DER HAKEN',win(u,th,tw,0.15),u,th,600,'#fff',140);
   pop(ctx,'Essen',win(u,te,tf,0.15),u,te,600,'#fff',150);
   bars(ctx,A(u,tw,0.3),u,tw+0.2,tf);}],
  top:[e=>flash(e.ctx,e.u,wt(e.sc,'Haken'))]},
 {head:'Genug Platz?', say:S_say[5], cams:[{at:0,view:vWorld,fly:0.6}],
  pops:[sc=>wt(sc,'genug'),sc=>wt(sc,'eher nicht')], swish:[],
  under:[e=>{hl(e,'ITA',PK,0.9);}],
  over:[e=>{const {u,sc,ctx}=e; const tl=wt(sc,'Platz zum Leben');
   pop(ctx,'Wohnen: ja',A(u,wt(sc,'genug'),0.2),u,wt(sc,'genug'),560,'#fff',120);
   pop(ctx,'Leben: eher nicht',A(u,wt(sc,'eher nicht'),0.2),u,wt(sc,'eher nicht'),720,'#E5484D',100);}]},
 {say:S_say[6], cams:[{at:0,view:vG,fly:1.2},{at:1.4,view:vG,fly:4.5}],
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
return {tag:'GEOFY · WAS WÄRE WENN #6', scenes, wt};
}
