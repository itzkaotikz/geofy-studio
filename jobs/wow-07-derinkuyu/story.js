// Story: Wow #7 – Länder, die es nicht mehr gibt
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



const GO='#FFE066', TE='#33D1B0', PK='#FF3B7F', CY='#7FD0FF', SAND='#E8C99A';
const A=(u,t0,d=0.35)=>clamp((u-t0)/d);
const win=(u,t0,t1,d=0.3)=>clamp((u-t0)/d)*(1-clamp((u-t1)/d));
const VW=(lon,lat,wdeg)=>({lon,lat,scale:920/(wdeg*Math.PI/180)});
const vTR=VW(35,39,22), vK=VW(34.75,38.45,6.5);
const vG=vTR;
const DER=[34.73,38.37], ERC=[35.45,38.53], HAS=[34.17,38.13];
function pop(ctx,txt,a,u,t0,y=600,col='#fff',size=130){if(a<=0||window.NO_CHIPS) return; const k=1+0.3*Math.max(0,1-(u-t0)/0.25); ctx.save(); ctx.translate(540,y); ctx.scale(k,k); ctx.translate(-540,-y); big(ctx,txt,a,y,col,size); ctx.restore();}
function flash(ctx,u,t0,col='rgba(255,224,102,',m=0.28){const a=1-clamp((u-t0)/0.45); if(u<t0||a<=0) return; ctx.save(); ctx.fillStyle=col+(a*m)+')'; ctx.fillRect(0,0,1080,1920); ctx.restore();}
function counter(ctx,from,to,a,u,t0,y,size=150,suf=''){if(a<=0) return; const k=eout(clamp((u-t0)/1.0)); big(ctx,Math.round(from+(to-from)*k).toLocaleString('de-DE')+suf,a,y,'#fff',size);}
// --- graphics (screen space) ---
const PX=150,PY=720,PW=780,PH=620; // panel
function panel(ctx,a){ctx.save(); ctx.globalAlpha=a; rr(ctx,PX,PY,PW,PH,32); ctx.fillStyle='rgba(6,20,40,0.82)'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.16)'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();}
function wall(ctx,a,crack,hole){if(a<=0) return; panel(ctx,a); ctx.save(); ctx.globalAlpha=a; rr(ctx,PX,PY,PW,PH,32); ctx.clip();
 const bw=130,bh=56; for(let r=0;r*bh<PH;r++) for(let c=-1;c*bw<PW+bw;c++){const x=PX+c*bw+(r%2?bw/2:0), y=PY+r*bh; ctx.fillStyle=(r*7+c*3)%5?'#8A6B52':'#7A5D47'; ctx.fillRect(x+3,y+3,bw-6,bh-6);}
 const cx=PX+PW/2, cy=PY+PH/2; if(crack>0){ctx.strokeStyle='#1A1010'; ctx.lineWidth=7; ctx.lineCap='round'; const pts=[[0,0],[40,-60],[10,-130],[70,-210],[-30,60],[-80,130],[-40,210],[60,40],[150,80]]; const n=Math.ceil(crack*pts.length); ctx.beginPath(); ctx.moveTo(cx,cy); for(let i=0;i<n;i++) ctx.lineTo(cx+pts[i][0],cy+pts[i][1]); ctx.stroke();}
 if(hole>0){const R=40+200*eout(hole); const g=ctx.createRadialGradient(cx,cy,0,cx,cy,R); g.addColorStop(0,'#000'); g.addColorStop(0.8,'#0a0605'); g.addColorStop(1,'rgba(10,6,5,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(cx,cy,R*1.05,R,0,0,7); ctx.fill();}
 ctx.restore();}
function tunnel(ctx,a,t){if(a<=0) return; panel(ctx,a); ctx.save(); ctx.globalAlpha=a; rr(ctx,PX,PY,PW,PH,32); ctx.clip(); ctx.fillStyle='#120b08'; ctx.fillRect(PX,PY,PW,PH); const cx=PX+PW/2, cy=PY+PH/2;
 for(let i=0;i<9;i++){const k=((i/9)+(t*0.35))%1; const s=1-k; ctx.strokeStyle=`rgba(232,201,154,${0.15+0.6*s})`; ctx.lineWidth=2+6*s; const w=PW*0.9*s+20, h=PH*0.9*s+16; rr(ctx,cx-w/2,cy-h/2,w,h,Math.min(w,h)*0.4); ctx.stroke();}
 ctx.fillStyle='rgba(255,224,102,0.9)'; ctx.beginPath(); ctx.arc(cx,cy,10,0,7); ctx.fill(); ctx.restore();}
const LV=18, GY=PY+90; const lvY=i=>GY+30+i*((PH-140)/LV);
function section(ctx,a,n,u,t,{ruler=0,icons=null,shafts=0,people=0,door=0}={}){if(a<=0) return; panel(ctx,a); ctx.save(); ctx.globalAlpha=a; rr(ctx,PX,PY,PW,PH,32); ctx.clip();
 const g=ctx.createLinearGradient(0,GY,0,PY+PH); g.addColorStop(0,'#7A5A3E'); g.addColorStop(1,'#3A281C'); ctx.fillStyle=g; ctx.fillRect(PX,GY,PW,PH);
 ctx.fillStyle='#9FB3C8'; ctx.fillRect(PX,PY,PW,GY-PY); ctx.fillStyle='#E9DFC7'; ctx.fillRect(PX+330,GY-58,110,58); ctx.beginPath(); ctx.moveTo(PX+318,GY-58); ctx.lineTo(PX+385,GY-100); ctx.lineTo(PX+452,GY-58); ctx.fill();
 for(let i=0;i<Math.min(LV,n);i++){const y=lvY(i), off=(i%2?120:0); ctx.fillStyle='#120b08'; rr(ctx,PX+90+off,y,PW-300,(PH-140)/LV-8,6); ctx.fill(); if(i>0){ctx.strokeStyle='#120b08'; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(PX+(i%2?210:390),lvY(i-1)+10); ctx.lineTo(PX+(i%2?240:360),y+10); ctx.stroke();}}
 if(shafts>0){ctx.strokeStyle='rgba(159,179,200,0.7)'; ctx.lineWidth=4; [PX+140,PX+300,PX+520].forEach((x,k)=>{const h=(PH-120)*eout(clamp(shafts*1.3-k*0.15)); ctx.beginPath(); ctx.moveTo(x,GY); ctx.lineTo(x,GY+h); ctx.stroke(); for(let d=0;d<4;d++){const ph=((t*0.6)+d/4)%1; ctx.fillStyle='rgba(127,208,255,0.9)'; ctx.beginPath(); ctx.arc(x,GY+ph*h,5,0,7); ctx.fill();}});}
 if(people>0){for(let k=0;k<26;k++){const ph=clamp(people*1.2-(k%13)*0.05); const lv=Math.floor(k/2)%LV; const y=GY-20+(lvY(lv)+10-GY+20)*eout(ph); const x=PX+390+((k*37)%160)-80; ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(x,y,6,0,7); ctx.fill();}}
 if(door>0){const y=lvY(2)+((PH-140)/LV-8)/2, x0=PX+PW-210, x=x0-110*eout(door); ctx.save(); ctx.translate(x,y); ctx.rotate(-door*3); ctx.fillStyle='#C9B79A'; ctx.beginPath(); ctx.arc(0,0,30,0,7); ctx.fill(); ctx.strokeStyle='#5A4636'; ctx.lineWidth=4; ctx.stroke(); ctx.beginPath(); ctx.arc(0,0,8,0,7); ctx.stroke(); ctx.restore();}
 if(icons){icons.forEach(([txt,lv,ai])=>{if(ai<=0) return; const y=lvY(lv)+12; ctx.save(); ctx.globalAlpha=a*ai; ctx.font=`800 30px ${FB}`; const w=ctx.measureText(txt).width+30; rr(ctx,PX+PW-w-40,y-22,w,44,22); ctx.fillStyle='#fff'; ctx.fill(); ctx.fillStyle=C.bg; ctx.fillText(txt,PX+PW-w-25,y+10); ctx.restore();});}
 ctx.restore();
 if(ruler>0){ctx.save(); ctx.globalAlpha=a*ruler; const x=PX+PW-36, y1=GY+(lvY(LV-1)-GY+20)*eout(ruler); ctx.strokeStyle=GO; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x,GY); ctx.lineTo(x,y1); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x-12,GY); ctx.lineTo(x+12,GY); ctx.moveTo(x-12,y1); ctx.lineTo(x+12,y1); ctx.stroke(); ctx.fillStyle=GO; ctx.font=`800 34px ${FB}`; ctx.textAlign='right'; ctx.fillText(Math.round(85*eout(ruler))+' m',x-16,y1-8); ctx.restore();}}
function volcano(e,ll,a,t){if(a<=0) return; const q=P(e,ll); if(!q) return; const {ctx}=e; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='#6B5A4C'; ctx.beginPath(); ctx.moveTo(q[0]-70,q[1]+30); ctx.lineTo(q[0]-14,q[1]-60); ctx.lineTo(q[0]+14,q[1]-60); ctx.lineTo(q[0]+70,q[1]+30); ctx.closePath(); ctx.fill(); ctx.fillStyle='#fff'; ctx.beginPath(); ctx.moveTo(q[0]-26,q[1]-40); ctx.lineTo(q[0]-14,q[1]-60); ctx.lineTo(q[0]+14,q[1]-60); ctx.lineTo(q[0]+26,q[1]-40); ctx.fill();
 for(let i=0;i<5;i++){const ph=((t*0.4)+i/5)%1; ctx.globalAlpha=a*(1-ph)*0.7; ctx.fillStyle='#BDB3A8'; ctx.beginPath(); ctx.arc(q[0]+Math.sin(i*2)*20*ph,q[1]-70-ph*120,14+ph*30,0,7); ctx.fill();} ctx.restore();}
const DOTS=[]; (()=>{let s=11; const r=()=>{s=(s*16807)%2147483647; return s/2147483647;}; for(let i=0;i<200;i++){const an=r()*6.283, d=Math.sqrt(r())*1.35; DOTS.push([34.7+Math.cos(an)*d*1.25,38.5+Math.sin(an)*d*0.8]);}})();
function dots(e,a,n){if(a<=0) return; const {ctx}=e; ctx.save(); ctx.globalAlpha=a; DOTS.slice(0,n).forEach((ll,i)=>{const q=P(e,ll); if(!q) return; ctx.fillStyle=i%5?'#FFE066':'#fff'; ctx.beginPath(); ctx.arc(q[0],q[1],6,0,7); ctx.fill();}); ctx.restore();}
const scenes=[
 {head:'Hinter dieser Wand …', headInstant:true, say:S_say[0], cams:[{at:0,view:vTR}],
  pops:[sc=>wt(sc,'reißt'),sc=>wt(sc,'Tunnel'),sc=>wt(sc,'Stadt'),sc=>wt(sc,'20.000')], swish:[sc=>wt(sc,'Tunnel'),sc=>wt(sc,'Stadt')],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.25,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tr=wt(sc,'reißt'), td=wt(sc,'Dahinter'), tt=wt(sc,'Tunnel'), ts=wt(sc,'Stadt'), tu=wt(sc,'Unter'), t2=wt(sc,'20.000');
   wall(ctx,1-A(u,tt,0.25),A(u,tr,0.8),A(u,td,0.6)); tunnel(ctx,win(u,tt,ts,0.2),t); section(ctx,A(u,ts,0.3),Math.floor(LV*eout(A(u,ts,1.6))),u,t);
   pop(ctx,'1963',win(u,0,tt,0.15),u,0,560,'#fff',160);
   pop(ctx,'ein Tunnel',win(u,tt,ts,0.15),u,tt,560,'#fff',120); pop(ctx,'eine ganze Stadt',win(u,ts,t2,0.15),u,ts,560,'#fff',100);
   counter(ctx,0,20000,A(u,t2,0.2),u,t2,560,140); chip(ctx,'Menschen · unter der Erde',1395,A(u,t2,0.25),'#fff','rgba(229,72,77,0.95)');}],
  top:[e=>flash(e.ctx,e.u,wt(e.sc,'Dahinter'),'rgba(255,255,255,',0.2)]},
 {head:'Derinkuyu, Kappadokien', say:S_say[1], cams:[{at:0,view:vK,fly:1.6}],
  pops:[sc=>wt(sc,'Derinkuyu'),sc=>wt(sc,'85'),sc=>wt(sc,'18')], swish:[0,sc=>wt(sc,'85')-0.2],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.12,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; const t8=wt(sc,'85'), t18=wt(sc,'18');
   pulse(e,DER,t,A(u,0.3,0.3)*(1-A(u,t8-0.2,0.3)),PK,12); tag(e,DER,'Derinkuyu',A(u,wt(sc,'Derinkuyu'),0.3)*(1-A(u,t8-0.2,0.3)),0,-50,'#fff',38); tag(e,[34.7,38.95],'Kappadokien',A(u,wt(sc,'Kappadokien'),0.3)*(1-A(u,t8-0.2,0.3)),0,-40,'#fff',30);
   section(ctx,A(u,t8-0.2,0.3),Math.floor(LV*eout(A(u,t18,1.2)))+(u<t18?6:0),u,t,{ruler:A(u,t8,1.4)});
   pop(ctx,'85 m tief',win(u,t8,t18,0.2),u,t8,560,'#fff',130); pop(ctx,'18 Ebenen',A(u,t18,0.2),u,t18,560,'#fff',130);}]},
 {head:'Leben unter der Erde', say:S_say[2], cams:[{at:0,view:vK,fly:0.4}],
  pops:[sc=>wt(sc,'Ställe'),sc=>wt(sc,'Brunnen'),sc=>wt(sc,'Weinkeller'),sc=>wt(sc,'Kirchen'),sc=>wt(sc,'Schächte')], swish:[],
  over:[e=>{const {u,sc,ctx,t}=e; const tsch=wt(sc,'Schächte');
   const ic=[['Ställe',2,A(u,wt(sc,'Ställe'),0.2)],['Brunnen',6,A(u,wt(sc,'Brunnen'),0.2)],['Weinkeller',9,A(u,wt(sc,'Weinkeller'),0.2)],['Kirche',13,A(u,wt(sc,'Kirchen'),0.2)]];
   section(ctx,1,LV,u,t,{ruler:1,icons:ic,shafts:A(u,tsch,1.2)});
   pop(ctx,'sogar Kirchen',win(u,wt(sc,'Kirchen'),tsch,0.15),u,wt(sc,'Kirchen'),560,'#fff',120);
   pop(ctx,'Tausende Luftschächte',A(u,tsch,0.2),u,tsch,560,'#fff',90);}]},
 {head:'Warum unter der Erde?', say:S_say[3], cams:[{at:0,view:vK,fly:0.4}],
  pops:[sc=>wt(sc,'Schutz'),sc=>wt(sc,'verschwanden'),sc=>wt(sc,'Steintüren')], swish:[sc=>wt(sc,'verschwanden')],
  over:[e=>{const {u,sc,ctx,t}=e; const tq=wt(sc,'warum'), ts=wt(sc,'Schutz'), tv=wt(sc,'verschwanden'), td=wt(sc,'Steintüren');
   section(ctx,1,LV,u,t,{people:A(u,tv,1.8),door:A(u,td+0.2,1.0)});
   pop(ctx,'Warum?',win(u,tq,ts,0.15),u,tq,560,'#fff',150); pop(ctx,'Zum Schutz',win(u,ts,td,0.15),u,ts,560,'#fff',130);
   chip(ctx,'ganze Dörfer verschwinden im Boden',1395,win(u,tv,td,0.25),'#fff','rgba(229,72,77,0.95)');
   pop(ctx,'Steintüren',A(u,td,0.15),u,td,560,'#fff',120); chip(ctx,'von innen verschlossen',1395,A(u,td+0.3,0.25));}],
  top:[e=>flash(e.ctx,e.u,wt(e.sc,'Schutz'),'rgba(229,72,77,',0.22)]},
 {head:'Der Trick: weiches Gestein', say:S_say[4], cams:[{at:0,view:vK,fly:0.8}],
  pops:[sc=>wt(sc,'Tuff'),sc=>wt(sc,'Vulkanen'),sc=>wt(sc,'einfachem')], swish:[0],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.1,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tt=wt(sc,'Tuff'), tv=wt(sc,'Vulkanen'), tw=wt(sc,'einfachem');
   volcano(e,ERC,A(u,tv,0.4),t); volcano(e,HAS,A(u,tv+0.25,0.4),t); tag(e,ERC,'Erciyes',A(u,tv+0.3,0.3),0,40,'#fff',28); tag(e,HAS,'Hasan Dağı',A(u,tv+0.5,0.3),0,40,'#fff',28);
   pulse(e,DER,t,1,PK,10);
   pop(ctx,'Tuff',win(u,tt-0.2,tw,0.2),u,tt-0.2,560,SAND,170); chip(ctx,'weiches Vulkangestein',1395,win(u,tt,tw,0.25),'#0B1C2A','rgba(255,224,102,0.96)');
   pop(ctx,'einfach auszuhöhlen',A(u,tw,0.2),u,tw,560,'#fff',96);}]},
 {head:'Nicht die einzige', say:S_say[5], cams:[{at:0,view:vK,fly:0.6}],
  pops:[sc=>wt(sc,'allein'),sc=>wt(sc,'200')], swish:[sc=>wt(sc,'200')],
  over:[e=>{const {u,sc,ctx,t}=e; const t2=wt(sc,'200'); pulse(e,DER,t,1,PK,10);
   dots(e,1,Math.floor(200*eout(A(u,t2-0.4,1.4))));
   counter(ctx,1,200,A(u,t2-0.4,0.2),u,t2-0.4,560,170,'+'); chip(ctx,'unterirdische Städte in Kappadokien',1395,A(u,t2,0.25));}]},
 {head:'Bis zu dieser Wand', say:S_say[6], cams:[{at:0,view:vTR,fly:1.6}],
  pops:[sc=>wt(sc,'20.'),sc=>wt(sc,'Wand')], swish:[0,sc=>wt(sc,'Bis zu')],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.2,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tb=wt(sc,'Bis zu');
   pop(ctx,'bis ins 20. Jh. genutzt',win(u,wt(sc,'20.'),wt(sc,'Vergessenheit'),0.2),u,wt(sc,'20.'),560,'#fff',90);
   pop(ctx,'vergessen',win(u,wt(sc,'Vergessenheit'),tb,0.2),u,wt(sc,'Vergessenheit'),560,'rgba(255,255,255,0.7)',130);
   wall(ctx,A(u,tb,0.3),1,A(u,wt(sc,'Wand'),0.8)); pop(ctx,'bis zu dieser Wand',A(u,tb,0.2),u,tb,560,'#fff',100);}]},
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
return {tag:'GEOFY · WOW #7', scenes, wt};
}
