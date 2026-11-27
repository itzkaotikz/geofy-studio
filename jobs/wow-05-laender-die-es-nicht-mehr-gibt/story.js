// Story: Wow #5 – Länder, die es nicht mehr gibt
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



const SU=['RUS','UKR','BLR','EST','LVA','LTU','MDA','GEO','ARM','AZE','KAZ','UZB','TKM','KGZ','TJK'];
const YU=['SVN','HRV','BIH','SRB','MNE','MKD','KOS'];
const GO='#FFE066', TE='#33D1B0', PK='#FF3B7F', RD='#E5484D', CY='#7FD0FF', VI='#B98CFF';
const PAL=[PK,CY,GO,TE,VI,'#FF9F6B','#9BE38A'];
const vE=viewBox([-5,30,95,72]), vD=viewBox([4.5,47.0,16.5,55.5]), vU=viewBox([18,30,140,78]), vY=viewBox([12.5,39.5,25.0,47.5]), vC=viewBox([10.5,46.0,24.0,52.5]), vT=viewBox([27.5,-12.5,42.0,-0.5]), vS=viewBox([18,-2,46,24]), vW=viewBox([-25,-38,150,78]);
const vG=vW;
const A=(u,t0,d=0.35)=>clamp((u-t0)/d);
const win=(u,t0,t1,d=0.3)=>clamp((u-t0)/d)*(1-clamp((u-t1)/d));
function pop(ctx,txt,a,u,t0,y=600,col='#fff',size=130){if(a<=0||window.NO_CHIPS) return; const k=1+0.3*Math.max(0,1-(u-t0)/0.25); ctx.save(); ctx.translate(540,y); ctx.scale(k,k); ctx.translate(-540,-y); big(ctx,txt,a,y,col,size); ctx.restore();}
function flash(ctx,u,t0,col='rgba(255,59,127,',m=0.3){const a=1-clamp((u-t0)/0.45); if(u<t0||a<=0) return; ctx.save(); ctx.fillStyle=col+(a*m)+')'; ctx.fillRect(0,0,1080,1920); ctx.restore();}
function badge(ctx,txt,a,col=PK){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 38px ${FB}`; const w=ctx.measureText(txt).width+44; const x=1080-L-w, y=250; ctx.fillStyle=col; rr(ctx,x,y,w,60,30); ctx.fill(); ctx.fillStyle='#fff'; ctx.fillText(txt,x+22,y+43); ctx.restore();}
// fill a country shifted by (dx,dy) pixels: for shatter / split effects
function fillS(e,k,col,a,dx=0,dy=0,lw=2.5){if(a<=0) return; const {ctx}=e; ctx.save(); ctx.translate(dx,dy); fill(e,k,col,a,lw); ctx.restore();}
function shatter(e,ids,k,cols,a,amt=40){if(a<=0) return; const {path}=e; const cs=ids.map(i=>path.centroid(F(i))); const cx=cs.reduce((s,c)=>s+c[0],0)/cs.length, cy=cs.reduce((s,c)=>s+c[1],0)/cs.length;
 ids.forEach((i,n)=>{const c=cs[n]; const d=Math.hypot(c[0]-cx,c[1]-cy)||1; const m=eout(k)*amt*Math.min(1.6,0.5+d/250); fillS(e,i,cols?cols[n%cols.length]:RD,a,(c[0]-cx)/d*m,(c[1]-cy)/d*m,2);});}
function counter(ctx,from,to,a,u,t0,y,size=170,suf=''){if(a<=0) return; const k=eout(clamp((u-t0)/1.0)); big(ctx,Math.round(from+(to-from)*k)+suf,a,y,'#fff',size);}
const qmark=(e,ll,a)=>{const q=P(e,ll); if(!q||a<=0) return; const {ctx}=e; ctx.save(); ctx.globalAlpha=a; ctx.translate(q[0],q[1]); const s=1+0.15*Math.sin(e.t*6); ctx.scale(s,s); ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(0,0,42,0,7); ctx.fill(); ctx.fillStyle=C.bg; ctx.font=`800 56px ${FD}`; ctx.textAlign='center'; ctx.fillText('?',0,20); ctx.restore();};
const scenes=[
 {head:'Die Weltkarte von 1985', headInstant:true, say:S_say[0], cams:[{at:0,view:vE},{at:sc=>wt(sc,'mitten')-0.2,view:vD,fly:1.4}],
  pops:[sc=>wt(sc,'vier'),sc=>wt(sc,'nicht mehr'),sc=>wt(sc,'größte'),sc=>wt(sc,'mitten')], swish:[sc=>wt(sc,'mitten')-0.2],
  under:[e=>{const {u,sc}=e; const t4=wt(sc,'vier'), tg=wt(sc,'größte'), tm=wt(sc,'mitten');
   SU.forEach(k=>fill(e,k,RD,0.8*A(u,t4,0.3)*(1-0.6*A(u,tm,0.4)),1.5)); fill(e,'DDR',GO,0.9*A(u,t4+0.25,0.3),2.5); YU.forEach(k=>fill(e,k,CY,0.8*A(u,t4+0.5,0.3)*(1-0.6*A(u,tg,0.4)),1.5)); ['CZE','SVK'].forEach(k=>fill(e,k,TE,0.8*A(u,t4+0.75,0.3)*(1-0.6*A(u,tg,0.4)),1.5));}],
  over:[e=>{const {u,sc,ctx}=e; const t4=wt(sc,'vier'), tn=wt(sc,'nicht mehr'), tg=wt(sc,'größte'), tm=wt(sc,'mitten');
   pop(ctx,'1985',win(u,0,t4-0.05,0.15),u,0,600,'#fff',190);
   pop(ctx,'4 Länder',win(u,t4,tn,0.15),u,t4,600,'#fff',140);
   chip(ctx,'heute: verschwunden',1180,win(u,tn,tg,0.25),'#fff','rgba(229,72,77,0.95)');
   qmark(e,[90,60],win(u,tg,tm,0.25)); chip(ctx,'das größte Land der Erde?',1180,win(u,tg,tm,0.25));
   qmark(e,[12.3,52.0],A(u,tm+0.6,0.25)); chip(ctx,'mitten in Deutschland?',1180,A(u,tm,0.25));}],
  top:[e=>badge(e.ctx,'1985',A(e.u,0.4,0.3),'rgba(6,20,40,0.85)')]},
 {head:'Die Sowjetunion', say:S_say[1], cams:[{at:0,view:vU,fly:1.4}],
  pops:[sc=>wt(sc,'1991'),sc=>wt(sc,'zerfiel'),sc=>wt(sc,'15')], swish:[0,sc=>wt(sc,'zerfiel')],
  under:[e=>{const {u,sc}=e; const tz=wt(sc,'zerfiel'), tr=wt(sc,'Russland');
   const k=A(u,tz,0.8); if(k<=0) SU.forEach(i=>fill(e,i,RD,0.85*A(u,0.2,0.4),1.5)); else shatter(e,SU,k,PAL,0.85*(1-0.5*A(u,tr,0.4)),46);
   const T=(w,id,col)=>{const a=A(u,wt(sc,w),0.3); if(a>0) shatter(e,[id],1,null,0,0), fill(e,id,col,0.95*a,4);};}],
  over:[e=>{const {u,sc,ctx}=e; const tz=wt(sc,'zerfiel'), t15=wt(sc,'15'), td=wt(sc,'darunter');
   tag(e,[70,62],'Sowjetunion',A(u,0.3)*(1-A(u,tz)),0,0,'#fff',42);
   pop(ctx,'Ende 1991',win(u,wt(sc,'1991'),t15,0.2),u,wt(sc,'1991'),600,'#fff',140);
   counter(ctx,1,15,win(u,t15,td+0.3,0.2),u,t15,600,180); chip(ctx,'15 neue Staaten',1180,A(u,t15,0.25),'#fff','rgba(229,72,77,0.95)');
   [['Russland',[95,62]],['Ukraine',[31,49]],['Kasachstan',[67,48]]].forEach(([n,ll])=>tag(e,ll,n,A(u,wt(sc,n),0.25),0,0,'#fff',36));}],
  top:[e=>badge(e.ctx,'1 / 4',1,'rgba(6,20,40,0.85)')]},
 {head:'Die DDR', say:S_say[2], cams:[{at:0,view:vD,fly:1.4}],
  pops:[sc=>wt(sc,'DDR'),sc=>wt(sc,'Oktober'),sc=>wt(sc,'nur noch')], swish:[0,sc=>wt(sc,'trat')],
  under:[e=>{const {u,sc}=e; const tb=wt(sc,'trat'), tn=wt(sc,'nur noch'); const m=A(u,tb,1.2);
   fill(e,'DEU',m>0.99?GO:CY,0.25+0.5*A(u,tn,0.4),2+2*A(u,tn,0.4)); fill(e,'DDR',m>0.5?GO:PK,0.9*A(u,wt(sc,'DDR'),0.3)*(1-0.8*A(u,tn,0.5)),3);}],
  over:[e=>{const {u,sc,ctx}=e; const to=wt(sc,'Oktober'), tb=wt(sc,'Bundesrepublik'), tn=wt(sc,'nur noch');
   tag(e,[12.6,51.9],'DDR',A(u,wt(sc,'DDR'))*(1-A(u,tb)),0,0,'#fff',42); tag(e,[8.3,50.6],'BRD',A(u,wt(sc,'DDR')+0.3)*(1-A(u,tb)),0,0,'#fff',36);
   pop(ctx,'3.10.1990',win(u,to-0.15,tn,0.2),u,to-0.15,600,'#fff',130);
   pop(ctx,'1 Deutschland',A(u,tn,0.2),u,tn,600,'#fff',104); chip(ctx,'Beitritt zur Bundesrepublik',1180,win(u,tb,tn,0.25),'#fff','rgba(229,72,77,0.95)');}],
  top:[e=>badge(e.ctx,'2 / 4',1,'rgba(6,20,40,0.85)')]},
 {head:'Jugoslawien', say:S_say[3], cams:[{at:0,view:vY,fly:1.4}],
  pops:[sc=>wt(sc,'zerbrach'),sc=>wt(sc,'Kriegen'),sc=>wt(sc,'Slowenien'),sc=>wt(sc,'Kroatien'),sc=>wt(sc,'Serbien')], swish:[0,sc=>wt(sc,'zerbrach')],
  under:[e=>{const {u,sc}=e; const tz=wt(sc,'zerbrach'); const k=A(u,tz,0.7); if(k<=0) YU.forEach(i=>fill(e,i,CY,0.85*A(u,0.2,0.4),1.5)); else shatter(e,YU,k,PAL,0.85,22);}],
  over:[e=>{const {u,sc,ctx}=e; const tz=wt(sc,'zerbrach'), tk=wt(sc,'Kriegen'), th=wt(sc,'Heute');
   tag(e,[19.0,44.0],'Jugoslawien',A(u,0.3)*(1-A(u,tz)),0,0,'#fff',40);
   pop(ctx,'ab 1991',win(u,tz,th,0.2),u,tz,600,'#fff',140); chip(ctx,'teils in Kriegen',1180,win(u,tk,th,0.25),'#fff','rgba(229,72,77,0.95)');
   chip(ctx,'heute 7 Staaten',1180,A(u,th,0.25));
   [['Slowenien',[14.8,46.15]],['Kroatien',[16.2,45.5]],['Serbien',[20.9,44.0]]].forEach(([n,ll])=>tag(e,ll,n,A(u,wt(sc,n),0.25),0,0,'#fff',32));}],
  top:[e=>badge(e.ctx,'3 / 4',1,'rgba(6,20,40,0.85)')]},
 {head:'Die Tschechoslowakei', say:S_say[4], cams:[{at:0,view:vC,fly:1.4}],
  pops:[sc=>wt(sc,'1993'),sc=>wt(sc,'friedlich'),sc=>wt(sc,'Samtene')], swish:[0,sc=>wt(sc,'trennte')],
  under:[e=>{const {u,sc}=e; const k=eout(A(u,wt(sc,'trennte'),0.9)); const a=0.85*A(u,0.2,0.4); fillS(e,'CZE',k>0.3?CY:TE,a,-26*k,0,2.5); fillS(e,'SVK',TE,a,26*k,0,2.5);}],
  over:[e=>{const {u,sc,ctx}=e; const ty=wt(sc,'1993'), tf=wt(sc,'friedlich'), ts=wt(sc,'Samtene');
   tag(e,[17.0,49.3],'Tschechoslowakei',A(u,0.3)*(1-A(u,wt(sc,'trennte'))),0,0,'#fff',38);
   pop(ctx,'1993',win(u,ty,ts,0.2),u,ty,600,'#fff',160); chip(ctx,'ganz friedlich',1180,win(u,tf,ts,0.25),'#0B1C2A','rgba(51,209,176,0.96)');
   tag(e,[15.0,49.8],'Tschechien',A(u,wt(sc,'Tschechien'),0.25),-26,0,'#fff',32); tag(e,[19.6,48.7],'Slowakei',A(u,wt(sc,'Slowakei'),0.25),26,0,'#fff',32);
   pop(ctx,'„Samtene Scheidung“',A(u,ts,0.2),u,ts,600,'#fff',92);}],
  top:[e=>badge(e.ctx,'4 / 4',1,'rgba(6,20,40,0.85)')]},
 {head:'Und das Gegenteil?', say:S_say[5], cams:[{at:0,view:vC},{at:sc=>wt(sc,'Aus zwei')-0.2,view:vT,fly:1.6}],
  pops:[sc=>wt(sc,'Gegenteil'),sc=>wt(sc,'1964'),sc=>wt(sc,'Tansania')], swish:[sc=>wt(sc,'Aus zwei')-0.2],
  under:[e=>{const {u,sc}=e; const t6=wt(sc,'1964'); const m=A(u,t6,0.6); fill(e,'TZA',m>0.5?GO:CY,0.85*A(u,wt(sc,'Tanganjika'),0.3),3); fill(e,'ZNZ',m>0.5?GO:PK,0.95*A(u,wt(sc,'Sansibar'),0.3),4);}],
  over:[e=>{const {u,sc,ctx}=e; const tg=wt(sc,'Gegenteil'), t6=wt(sc,'1964'), tn=wt(sc,'Name');
   pop(ctx,'Das Gegenteil',win(u,tg,wt(sc,'Tanganjika'),0.2),u,tg,600,'#fff',130); chip(ctx,'aus 2 wird 1',1180,win(u,wt(sc,'Aus zwei'),t6,0.25));
   tag(e,[34.0,-6.5],'Tanganjika',A(u,wt(sc,'Tanganjika'),0.25)*(1-A(u,t6)),0,0,'#fff',34); tag(e,[39.3,-6.1],'Sansibar',A(u,wt(sc,'Sansibar'),0.25)*(1-A(u,t6)),60,-60,'#fff',32);
   pop(ctx,'1964',win(u,t6,tn,0.2),u,t6,600,'#fff',160); tag(e,[34.5,-6.5],'Tansania',A(u,wt(sc,'Tansania'),0.25),0,0,'#fff',42);
   pop(ctx,'TAN + SAN = Tansania',A(u,tn,0.2),u,tn,600,'#fff',76);}],
  top:[e=>{flash(e.ctx,e.u,wt(e.sc,'Gegenteil'),'rgba(255,224,102,',0.28);}]},
 {head:'Das jüngste Land der Welt', say:S_say[6], cams:[{at:0,view:vT},{at:0.1,view:vS,fly:1.6}],
  pops:[sc=>wt(sc,'Südsudan'),sc=>wt(sc,'2011'),sc=>wt(sc,'jüngste')], swish:[0.1],
  under:[e=>{const {u,sc}=e; const ts=wt(sc,'Südsudan'), k=eout(A(u,ts+0.2,0.9)); fill(e,'SDN',CY,0.45*A(u,0.6,0.5),2); fillS(e,'SSD',GO,0.95*A(u,ts,0.3),0,34*k,4);}],
  over:[e=>{const {u,sc,ctx}=e; const ts=wt(sc,'Südsudan'), t1=wt(sc,'2011'), tj=wt(sc,'jüngste');
   chip(ctx,'die Karte ändert sich weiter',1180,win(u,0.2,ts,0.25)); tag(e,[30,15.5],'Sudan',A(u,0.8,0.3),0,0,'#fff',34); tag(e,[30.5,7.0],'Südsudan',A(u,ts+0.3,0.3),0,34,'#fff',38);
   pop(ctx,'seit 2011',win(u,t1,tj,0.2),u,t1,600,'#fff',150); pop(ctx,'jüngstes Land',A(u,tj,0.2),u,tj,600,'#fff',120); chip(ctx,'das jüngste Land der Welt',1180,A(u,tj,0.25),'#0B1C2A','rgba(255,224,102,0.96)');}],
  top:[]},
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
return {tag:'GEOFY · WOW #5', scenes, wt};
}
