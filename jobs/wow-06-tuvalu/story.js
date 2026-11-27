// Story: Wow #6 – Länder, die es nicht mehr gibt
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



const GO='#FFE066', TE='#33D1B0', PK='#FF3B7F', CY='#7FD0FF', WAT='#3FA9FF';
const A=(u,t0,d=0.35)=>clamp((u-t0)/d);
const win=(u,t0,t1,d=0.3)=>clamp((u-t0)/d)*(1-clamp((u-t1)/d));
const VW=(lon,lat,wdeg)=>({lon,lat,scale:920/(wdeg*Math.PI/180)});
const vWorld=VW(170,-5,200), vPac=VW(172,-8,70), vT=VW(177.9,-8.1,7.5), vF=VW(179.1,-8.5,6), vAU=VW(162,-20,62);
const vG=vPac;
const ISL=[['Nanumea',[176.12,-5.68]],['Niutao',[177.34,-6.11]],['Nanumanga',[176.32,-6.29]],['Nui',[177.15,-7.24]],['Vaitupu',[178.68,-7.48]],['Nukufetau',[178.4,-8.0]],['Funafuti',[179.2,-8.52]],['Nukulaelae',[179.83,-9.38]],['Niulakita',[179.47,-10.78]]];
const FUN=[179.2,-8.52], SYD=[151.2,-33.87], BNE=[153.0,-27.5];
function pop(ctx,txt,a,u,t0,y=600,col='#fff',size=130){if(a<=0||window.NO_CHIPS) return; const k=1+0.3*Math.max(0,1-(u-t0)/0.25); ctx.save(); ctx.translate(540,y); ctx.scale(k,k); ctx.translate(-540,-y); big(ctx,txt,a,y,col,size); ctx.restore();}
function flash(ctx,u,t0,col='rgba(127,208,255,',m=0.28){const a=1-clamp((u-t0)/0.45); if(u<t0||a<=0) return; ctx.save(); ctx.fillStyle=col+(a*m)+')'; ctx.fillRect(0,0,1080,1920); ctx.restore();}
function badge(ctx,txt,a,col=PK){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 38px ${FB}`; const w=ctx.measureText(txt).width+44; const x=1080-L-w, y=250; ctx.fillStyle=col; rr(ctx,x,y,w,60,30); ctx.fill(); ctx.fillStyle='#fff'; ctx.fillText(txt,x+22,y+43); ctx.restore();}
function counter(ctx,from,to,a,u,t0,y,size=170,suf=''){if(a<=0) return; const k=eout(clamp((u-t0)/1.0)); big(ctx,Math.round(from+(to-from)*k).toLocaleString('de-DE')+suf,a,y,'#fff',size);}
// islands as glowing atoll rings (pixel sized, so they stay visible at any zoom)
function islands(e,a,n=9,col='#FFFFFF',r=9,wire=0){if(a<=0) return; const {ctx,t}=e; ISL.slice(0,n).forEach(([nm,ll],i)=>{const q=P(e,ll); if(!q) return; ctx.save(); ctx.globalAlpha=a; ctx.shadowColor=wire?CY:col; ctx.shadowBlur=16;
 if(wire){ctx.strokeStyle=CY; ctx.lineWidth=2; for(let k=0;k<3;k++){ctx.beginPath(); ctx.ellipse(q[0],q[1],r*1.6,r*(0.4+k*0.45),0,0,7); ctx.stroke();} ctx.beginPath(); ctx.arc(q[0],q[1],r*1.6,0,7); ctx.stroke();}
 else {ctx.strokeStyle=col; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(q[0],q[1],r,0,7); ctx.stroke(); ctx.fillStyle='rgba(255,255,255,0.25)'; ctx.fill();}
 ctx.restore();});}
// pixel cloud: the "digital" effect around a point
function pixels(e,ll,a,R=120,cell=18){if(a<=0) return; const q=P(e,ll); if(!q) return; const {ctx,t}=e; ctx.save(); for(let i=-6;i<=6;i++) for(let j=-6;j<=6;j++){const d=Math.hypot(i,j)*cell; if(d>R) continue; const fl=0.5+0.5*Math.sin(t*7+i*1.7+j*2.3); const al=a*fl*(1-d/R); if(al<0.05) continue; ctx.globalAlpha=al; ctx.fillStyle=(i+j)%3?CY:'#FFFFFF'; ctx.fillRect(q[0]+i*cell-cell/2+1,q[1]+j*cell-cell/2+1,cell-3,cell-3);} ctx.restore();}
function ripple(e,ll,t,a,col=WAT){if(a<=0) return; const q=P(e,ll); if(!q) return; const {ctx}=e; ctx.save(); for(let r=0;r<3;r++){const ph=((t*0.6)+r/3)%1; ctx.beginPath(); ctx.arc(q[0],q[1],20+ph*160,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph)*0.9; ctx.lineWidth=4; ctx.stroke();} ctx.restore();}
// big schematic atoll (screen space) with rising water share k (0..1 of the ring flooded)
function atoll(ctx,cx,cy,R,a,k,t){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.lineCap='round';
 ctx.fillStyle='rgba(63,169,255,0.18)'; ctx.beginPath(); ctx.ellipse(cx,cy,R*0.82,R*0.62,-0.4,0,7); ctx.fill();
 const N=60; for(let i=0;i<N;i++){const a0=i/N*Math.PI*2, a1=(i+0.7)/N*Math.PI*2; const fl=(i/N)<k; ctx.strokeStyle=fl?WAT:'#F2E6C4'; ctx.lineWidth=fl?10+2*Math.sin(t*4+i):16; ctx.beginPath(); ctx.ellipse(cx,cy,R,R*0.76,-0.4,a0,a1); ctx.stroke();}
 ctx.restore();}
function gauge(ctx,x,y0,hpx,a,fill,label){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(6,20,40,0.72)'; rr(ctx,x-60,y0-hpx-40,120,hpx+80,24); ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=2; ctx.stroke();
 const h=hpx*eout(fill); ctx.fillStyle=WAT; rr(ctx,x-30,y0-h,60,h,10); ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.5)'; for(let m=0;m<=5;m++){const yy=y0-m*hpx/5; ctx.beginPath(); ctx.moveTo(x-44,yy); ctx.lineTo(x-34,yy); ctx.stroke();}
 ctx.fillStyle='#fff'; ctx.font=`700 26px ${FB}`; ctx.textAlign='center'; ctx.fillText(label,x,y0+30); ctx.restore();}
function strip(ctx,a,k){if(a<=0) return; const x=140,y=800,w=800,h=220; ctx.save(); ctx.globalAlpha=a; rr(ctx,x,y,w,h,28); ctx.fillStyle='rgba(6,20,40,0.72)'; ctx.fill(); ctx.save(); rr(ctx,x,y,w,h,28); ctx.clip();
 ctx.fillStyle='#1F5FA8'; ctx.fillRect(x,y,w,h); ctx.fillStyle='#2E8BD8'; ctx.fillRect(x+w*0.56,y,w*0.44,h); const lw=w*0.12*eout(k); ctx.fillStyle='#F2E6C4'; ctx.fillRect(x+w*0.44-lw/2+lw/2,y,lw,h); ctx.restore();
 ctx.fillStyle='#fff'; ctx.font=`700 28px ${FB}`; ctx.fillText('Ozean',x+30,y+50); ctx.textAlign='right'; ctx.fillText('Lagune',x+w-30,y+50);
 ctx.strokeStyle=GO; ctx.lineWidth=3; const xm=x+w*0.44+lw/2; ctx.beginPath(); ctx.moveTo(x+w*0.44,y+h-40); ctx.lineTo(x+w*0.44+lw,y+h-40); ctx.stroke(); ctx.fillStyle=GO; ctx.textAlign='center'; ctx.font=`800 34px ${FB}`; ctx.fillText('≈ 20 m',xm,y+h-56); ctx.restore();}
function stamp(ctx,txt,a,u,t0){if(a<=0) return; const k=1+1.2*Math.max(0,1-(u-t0)/0.25); ctx.save(); ctx.globalAlpha=a; ctx.translate(540,1080); ctx.rotate(-0.12); ctx.scale(k,k); ctx.strokeStyle=PK; ctx.lineWidth=8; ctx.font=`800 60px ${FD}`; const w=ctx.measureText(txt).width+60; rr(ctx,-w/2,-50,w,100,14); ctx.stroke(); ctx.fillStyle=PK; ctx.textAlign='center'; ctx.fillText(txt,0,20); ctx.restore();}
function screen(ctx,a){if(a<=0) return; const x=300,y=620,w=480,h=640; ctx.save(); ctx.globalAlpha=a; rr(ctx,x,y,w,h,48); ctx.strokeStyle=CY; ctx.lineWidth=6; ctx.shadowColor=CY; ctx.shadowBlur=24; ctx.stroke(); ctx.restore();}
const scenes=[
 {head:'Ein Staat im Internet?', headInstant:true, say:S_say[0], cams:[{at:0,view:vPac},{at:sc=>wt(sc,'verschwindet')-0.2,view:vT,fly:1.6}],
  pops:[sc=>wt(sc,'Internet'),sc=>wt(sc,'Staat'),sc=>wt(sc,'verschwindet'),sc=>wt(sc,'Wie soll')], swish:[sc=>wt(sc,'verschwindet')-0.2],
  over:[e=>{const {u,sc,ctx,t}=e; const ti=wt(sc,'Internet'), ts=wt(sc,'Staat'), tv=wt(sc,'verschwindet'), tw=wt(sc,'Wie soll');
   pixels(e,FUN,0.9*A(u,0,0.4)*(1-0.7*A(u,tv,0.4)),150,20); pulse(e,FUN,t,A(u,0.1,0.3),PK,10); islands(e,A(u,tv+0.6,0.5));
   ripple(e,FUN,t,A(u,tv,0.4));
   pop(ctx,'www.',win(u,0,ti+0.4,0.15),u,0,600,'#fff',170);
   pop(ctx,'Staat online?',win(u,ti+0.4,tv,0.15),u,ti+0.4,600,'#fff',120); chip(ctx,'echter Staat',1180,win(u,ts,tv,0.25));
   chip(ctx,'das Land versinkt',1180,win(u,tv,tw,0.25),'#fff','rgba(229,72,77,0.95)');
   pop(ctx,'Wie soll das gehen?',A(u,tw,0.15),u,tw,600,'#fff',96);}],
  top:[e=>flash(e.ctx,e.u,wt(e.sc,'Internet'))]},
 {head:'Das ist Tuvalu', say:S_say[1], cams:[{at:0,view:vT,fly:1.6}],
  pops:[sc=>wt(sc,'11.000'),sc=>wt(sc,'neun'),sc=>wt(sc,'26')], swish:[0.05],
  over:[e=>{const {u,sc,ctx,t}=e; const t1=wt(sc,'11.000'), t9=wt(sc,'neun'), t26=wt(sc,'26');
   const n=u<t9?0:Math.min(9,1+Math.floor((u-t9)/0.12)); islands(e,1,n); pulse(e,FUN,t,A(u,0.2)*(1-A(u,t9)),PK,10);
   tag(e,[178,-6.8],'Tuvalu',A(u,0.1,0.3)*(1-A(u,t9)),0,-40,'#fff',40); pixels(e,FUN,0.5*(1-A(u,0.8,0.6)),150,20);
   counter(ctx,0,11000,win(u,t1,t9,0.2),u,t1,600,150); chip(ctx,'Einwohner',1180,win(u,t1,t9,0.25));
   pop(ctx,'9 Inseln',win(u,t9,t26,0.2),u,t9,600,'#fff',140);
   pop(ctx,'26 km²',A(u,t26,0.2),u,t26,600,'#fff',150); chip(ctx,'≈ ein Viertel von Sylt',1180,A(u,t26+0.4,0.25));}]},
 {head:'Wie hoch? Wie breit?', say:S_say[2], cams:[{at:0,view:vF,fly:1.4}],
  pops:[sc=>wt(sc,'4,6'),sc=>wt(sc,'20')], swish:[0,sc=>wt(sc,'Hauptinsel')],
  over:[e=>{const {u,sc,ctx,t}=e; const t4=wt(sc,'4,6'), th=wt(sc,'Hauptinsel'); islands(e,1-A(u,th,0.3),9);
   pop(ctx,'4,6 m',win(u,t4,th,0.2),u,t4,600,'#fff',160); gauge(ctx,860,1140,300,win(u,t4-0.3,th,0.3),A(u,t4,1.0)*0.46,'max. Höhe');
   chip(ctx,'höchster Punkt des Landes',1180,win(u,t4,th,0.25));
   strip(ctx,A(u,th,0.3),A(u,wt(sc,'20'),0.8)); pop(ctx,'kaum 20 m breit',A(u,wt(sc,'20'),0.2),u,wt(sc,'20'),600,'#fff',110);}]},
 {head:'Das Meer kommt', say:S_say[3], cams:[{at:0,view:vF,fly:0.6}],
  pops:[sc=>wt(sc,'schneller'),sc=>wt(sc,'2050'),sc=>wt(sc,'halb')], swish:[sc=>wt(sc,'NASA')],
  over:[e=>{const {u,sc,ctx,t}=e; const tsn=wt(sc,'schneller'), tn=wt(sc,'NASA'), th=wt(sc,'halb');
   atoll(ctx,540,960,300,A(u,0,0.4),0.5*eout(A(u,th,1.6))+0.04*Math.sin(t*2)*A(u,th),t);
   chip(ctx,'steigt schneller als im Weltschnitt',1180,win(u,tsn,tn,0.25),'#fff','rgba(229,72,77,0.95)');
   pop(ctx,'2050',win(u,wt(sc,'2050'),th,0.2),u,wt(sc,'2050'),560,'#fff',150);
   pop(ctx,'50 % unter Wasser',A(u,th,0.2),u,th,560,'#fff',100); chip(ctx,'bei Flut · Prognose NASA',1180,A(u,th+0.3,0.25));}],
  top:[e=>{badge(e.ctx,'2050',A(e.u,wt(e.sc,'2050'),0.3));}]},
 {head:'Plan B: Australien', say:S_say[4], cams:[{at:0,view:vAU,fly:1.6}],
  pops:[sc=>wt(sc,'2025'),sc=>wt(sc,'280'),sc=>wt(sc,'Drittel')], swish:[0],
  under:[e=>{const {u}=e; fill(e,'AUS',TE,0.6*A(u,0.6,0.5),3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const t28=wt(sc,'280'), td=wt(sc,'Drittel'); islands(e,1,9,'#fff',6); pulse(e,FUN,t,1,PK,9);
   const qa=P(e,FUN), qb=P(e,BNE); if(qa&&qb){for(let k=0;k<5;k++){const ph=((t*0.35)+k/5)%1; const x=qa[0]+(qb[0]-qa[0])*ph, y=qa[1]+(qb[1]-qa[1])*ph-Math.sin(ph*Math.PI)*120; ctx.save(); ctx.globalAlpha=A(u,t28,0.4)*Math.min(1,ph*6,(1-ph)*6); ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(x,y,9,0,7); ctx.fill(); ctx.beginPath(); ctx.arc(x,y-16,6,0,7); ctx.fill(); ctx.restore();}
    ctx.save(); ctx.globalAlpha=0.6*A(u,t28-0.2,0.4); ctx.setLineDash([12,12]); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(qa[0],qa[1]); ctx.quadraticCurveTo((qa[0]+qb[0])/2,(qa[1]+qb[1])/2-240,qb[0],qb[1]); ctx.stroke(); ctx.restore();}
   tag(e,[134,-25],'Australien',A(u,wt(sc,'Australien'),0.3),0,0,'#fff',38);
   pop(ctx,'seit 2025',win(u,wt(sc,'2025'),t28,0.2),u,wt(sc,'2025'),600,'#fff',130);
   counter(ctx,0,280,win(u,t28,td,0.2),u,t28,600,170,' / Jahr'); chip(ctx,'dauerhaft nach Australien',1180,win(u,t28,td,0.25));
   pop(ctx,'> 1/3',A(u,td,0.2),u,td,600,'#fff',170); chip(ctx,'der Bevölkerung hat sich beworben',1180,A(u,td,0.25),'#0B1C2A','rgba(255,224,102,0.96)');}],
  top:[e=>badge(e.ctx,'PLAN B',1,'rgba(6,20,40,0.85)')]},
 {head:'Plan C: Tuvalu digital', say:S_say[5], cams:[{at:0,view:vT,fly:1.4}],
  pops:[sc=>wt(sc,'digitale'),sc=>wt(sc,'3D'),sc=>wt(sc,'online')], swish:[0,sc=>wt(sc,'3D')],
  over:[e=>{const {u,sc,ctx,t}=e; const td=wt(sc,'digitale'), t3=wt(sc,'3D'), tk=wt(sc,'Kultur'), to=wt(sc,'online');
   const w3=A(u,t3,0.4); islands(e,1-w3,9); islands(e,w3,9,'#fff',10,1);
   if(w3>0&&w3<1.01){const yy=300+((u-t3)*700)%1300; ctx.save(); ctx.globalAlpha=0.7*A(u,t3,0.2)*(1-A(u,tk,0.4)); const g=ctx.createLinearGradient(0,yy-60,0,yy); g.addColorStop(0,'rgba(127,208,255,0)'); g.addColorStop(1,'rgba(127,208,255,0.6)'); ctx.fillStyle=g; ctx.fillRect(0,yy-60,1080,60); ctx.restore();}
   pixels(e,FUN,0.8*win(u,td,t3,0.3),200,22);
   pop(ctx,'Kopie 1:1',win(u,td,t3,0.2),u,td,600,'#fff',140);
   chip(ctx,'3D-Scan der Inseln',1180,win(u,t3,tk,0.25));
   screen(ctx,A(u,tk,0.4)*0.9); chip(ctx,'Kultur',1060,A(u,tk,0.25)); chip(ctx,'Behörden',1180,A(u,wt(sc,'Behörden'),0.25));
   pop(ctx,'online',A(u,to,0.2),u,to,560,'#fff',140);}],
  top:[e=>{badge(e.ctx,'PLAN C',1,'rgba(6,20,40,0.85)'); flash(e.ctx,e.u,wt(e.sc,'3D'));}]},
 {head:'Land ohne Land?', say:S_say[6], cams:[{at:0,view:vT,fly:0.8},{at:sc=>wt(sc,'Tuvalu sagt'),view:vPac,fly:2.0}],
  pops:[sc=>wt(sc,'Staat?'),sc=>wt(sc,'sagt ja'),sc=>wt(sc,'2023')], swish:[sc=>wt(sc,'Tuvalu sagt')],
  over:[e=>{const {u,sc,ctx,t}=e; const tq=wt(sc,'Ist ein'), tj=wt(sc,'sagt ja'), t23=wt(sc,'2023');
   islands(e,1,9,'#fff',8,1); pixels(e,FUN,0.5*A(u,tj,0.4),160,20); pulse(e,FUN,t,A(u,tj,0.3),PK,10);
   pop(ctx,'Land ohne Land',win(u,tq,wt(sc,'Staat?')+0.2,0.2),u,tq,560,'#fff',110);
   pop(ctx,'= Staat?',win(u,wt(sc,'Staat?')-0.1,tj,0.2),u,wt(sc,'Staat?')-0.1,700,'#fff',120);
   pop(ctx,'JA',win(u,tj,t23,0.15),u,tj,600,'#fff',220);
   stamp(ctx,'VERFASSUNG 2023',A(u,t23,0.2),u,t23);}],
  top:[e=>flash(e.ctx,e.u,wt(e.sc,'sagt ja'),'rgba(255,59,127,',0.25)]},
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
return {tag:'GEOFY · WOW #6', scenes, wt};
}
