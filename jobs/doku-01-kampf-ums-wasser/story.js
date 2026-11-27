// Geofy Doku 1 – Kampf ums Wasser (16:9) – Länder, die es nicht mehr gibt
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
const {pop,counter,flash,badge,stamp,xmark,ripple,bars,gauge}=fx;
const W=KV.W, H=KV.H, Y=330, CY_=930; // Querformat: große Wörter oben, Chips unten
const VL=(lon,lat,w)=>({lon,lat,scale:1700/(w*Math.PI/180)});
const WAT='#3FA9FF', CY2='#7FD0FF', GR='#7FCB6A';
const NILE=[[31.24,30.05],[31.18,27.18],[32.64,25.69],[32.9,24.09],[31.35,21.8],[30.48,19.17],[33.32,19.53],[33.98,17.7],[32.53,15.6]].reverse();
const DELTA=[[31.24,30.05],[30.42,31.45]], DELTA2=[[31.24,30.05],[31.8,31.5]];
const BLUE=[[37.4,11.6],[37.6,11.3],[38.2,10.6],[38.0,10.0],[37.4,9.9],[36.6,10.2],[35.8,10.7],[35.09,11.21],[34.39,11.8],[33.6,13.55],[32.53,15.6]];
const WHITE=[[33.2,0.42],[32.3,1.9],[31.6,4.85],[31.0,7.0],[31.66,9.53],[32.4,12.0],[32.53,15.6]];
const EUPH=[[39.8,39.2],[38.32,37.48],[37.98,37.03],[39.0,35.95],[40.14,35.33],[41.1,34.4],[43.3,33.42],[43.78,33.35],[45.2,32.0],[46.26,31.05],[47.43,31.0]];
const TIGR=[[40.2,38.4],[40.23,37.92],[42.19,37.33],[43.13,36.34],[43.68,34.6],[44.37,33.31],[45.82,32.5],[47.15,31.84],[47.43,31.0],[47.8,30.5],[48.6,29.9]];
const INDUS=[[81.0,31.1],[79.0,32.6],[77.58,34.16],[75.5,35.3],[73.5,35.4],[72.69,34.09],[71.6,32.5],[70.8,30.5],[68.86,27.7],[68.37,25.39],[67.5,24.0]];
const JHEL=[[75.3,34.1],[73.5,33.2],[72.5,31.5],[71.6,30.6]], CHEN=[[76.5,33.0],[74.8,32.7],[73.0,31.0],[71.4,29.4]];
const RAVI=[[76.3,32.4],[74.3,31.6],[72.3,30.8]], BEAS=[[77.2,32.0],[75.5,31.3],[75.0,31.2]], SUTL=[[78.5,31.6],[76.5,31.3],[74.7,31.0],[73.0,29.8],[71.0,29.0]];
const RHINE=[[9.5,46.6],[9.6,47.5],[7.6,47.56],[8.47,49.5],[7.6,50.36],[6.95,50.94],[6.2,51.85],[4.1,51.95]];
const MEKONG=[[98.5,31.0],[99.2,27.0],[100.1,22.0],[100.1,20.3],[102.6,17.97],[105.8,15.1],[105.9,11.5],[106.7,9.6]];
const OTHER=[[[8.2,48.1],[11.6,48.6],[16.4,48.2],[19.0,47.5],[20.5,44.8],[22.5,44.0],[25.0,43.7],[28.0,45.3],[29.6,45.2]],[[-4.0,13.0],[-8.0,12.5],[-3.0,16.7],[0.0,16.2],[4.0,13.5],[6.7,7.8],[6.2,4.3]],[[80.0,31.0],[83.0,26.7],[88.0,25.3],[89.5,23.5],[90.5,22.5]],[[-109.0,40.0],[-111.5,36.8],[-114.6,35.5],[-114.7,32.7],[-114.8,31.8]],[[-73.0,-4.0],[-65.0,-3.5],[-60.0,-3.1],[-55.0,-2.3],[-50.0,-0.5]]];
const GERD=[35.09,11.21], CAI=[31.24,30.05], ATA=[38.32,37.48], BAG=[44.37,33.31], PAH=[75.32,34.01], KHA=[32.53,15.6];
const NILEC=['EGY','SDN','SSD','ETH','ERI','UGA','KEN','TZA','RWA','BDI','COD'];
const vETH=VL(37,12,30), vNILE=VL(33,15,52), vWORLD=VL(55,22,95), vGLOBE=VL(20,15,250), vGERD=VL(35.5,11.5,14), vEGY=VL(31,24,30), vMESO=VL(42,34.5,22), vTUR=VL(40,37.5,12), vIRQ=VL(44.5,32.5,14), vIND=VL(74,30,22), vPUN=VL(74.5,32,9), vRHINE=VL(7,50,14), vMEK=VL(103,18,30);
const vG=vWORLD;
function riv(e,pts,prog,col=WAT,w=7){if(prog<=0) return; const {ctx}=e; ctx.save(); ctx.shadowColor=col; ctx.shadowBlur=14; line(e,pts,col,prog,w); ctx.restore();}
function card(ctx,u,n,title){const a=clamp(u/0.25)*(1-clamp((u-2.1)/0.4)); if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(6,16,26,0.78)'; ctx.fillRect(0,0,W,H); ctx.textAlign='center'; ctx.fillStyle=PK; ctx.font=`700 34px ${KV.FM}`; ctx.fillText('KAPITEL '+n,W/2,H/2-70); const k=1+0.08*(1-eout(clamp(u/0.6))); ctx.translate(W/2,H/2+30); ctx.scale(k,k); ctx.fillStyle='#fff'; ctx.font=`800 104px ${FD}`; ctx.fillText(title,0,0); ctx.restore();}
function fireworks(e,ll,a,t){if(a<=0) return; const q=P(e,ll); if(!q) return; const {ctx}=e; ctx.save(); for(let b=0;b<4;b++){const ph=((t*0.55)+b/4)%1; const cx=q[0]+[-140,120,-60,180][b], cy=q[1]-180-[0,60,120,30][b]; for(let i=0;i<14;i++){const an=i/14*6.283; const r=20+ph*110; ctx.globalAlpha=a*(1-ph); ctx.fillStyle=[GO,PK,CY2,'#fff'][b]; ctx.beginPath(); ctx.arc(cx+Math.cos(an)*r,cy+Math.sin(an)*r+ph*ph*40,4,0,7); ctx.fill();}} ctx.restore();}
function scheme(ctx,a,u,t0,t){if(a<=0) return; const x=260,y=380,w=1400,h=420; ctx.save(); ctx.globalAlpha=a; rr(ctx,x,y,w,h,32); ctx.fillStyle='rgba(6,20,40,0.86)'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.16)'; ctx.lineWidth=2; ctx.stroke();
 const k=eout(clamp((u-t0)/1.2)); for(let i=0;i<60;i++){const f=i/60; const wdt=26*(1-0.75*k*clamp((f-0.35)/0.15)); ctx.fillStyle=WAT; ctx.fillRect(x+60+f*(w-120),y+h/2-wdt/2,(w-120)/60+1,wdt);}
 ctx.fillStyle='#E9DFC7'; ctx.fillRect(x+60+0.33*(w-120),y+h/2-70,18,140); ctx.fillStyle='rgba(63,169,255,0.35)'; ctx.fillRect(x+60,y+h/2-60*k,0.33*(w-120),120*k);
 for(let i=0;i<10;i++){const ph=((t*0.4)+i/10)%1; ctx.globalAlpha=a*0.9; ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(x+60+ph*(w-120),y+h/2,4,0,7); ctx.fill();}
 ctx.globalAlpha=a; ctx.fillStyle='#fff'; ctx.font=`800 44px ${FD}`; ctx.textAlign='center'; ctx.fillText('Oberlieger',x+250,y+90); ctx.fillText('Unterlieger',x+w-260,y+90);
 ctx.font=`700 28px ${FB}`; ctx.fillStyle='rgba(255,255,255,0.75)'; ctx.fillText('bekommt das Wasser zuerst',x+250,y+h-60); ctx.fillText('bekommt, was übrig bleibt',x+w-260,y+h-60); ctx.restore();}
function sides(ctx,a,u,tl,tr,l,r){if(a<=0) return; const y=360,w=760,h=110+Math.max(l.length,r.length)*72; [[110+0,l,tl,GO],[W-110-w,r,tr,PK]].forEach(([x,txt,t0,col])=>{const k=clamp((u-t0)/0.4); if(k<=0) return; ctx.save(); ctx.globalAlpha=a*k; rr(ctx,x,y+(1-eout(k))*30,w,h,32); ctx.fillStyle='rgba(6,20,40,0.86)'; ctx.fill(); ctx.strokeStyle=col; ctx.lineWidth=3; ctx.stroke(); ctx.fillStyle=col; ctx.font=`700 30px ${KV.FM}`; ctx.fillText(txt[0],x+40,y+70); ctx.fillStyle='#fff'; ctx.font=`800 54px ${FD}`; txt.slice(1).forEach((l,i)=>ctx.fillText(l,x+40,y+160+i*72)); ctx.restore();});}
function dams(e,a,n){if(a<=0) return; const {ctx}=e; const pts=[[38.32,37.48],[37.98,37.03],[38.6,38.3],[39.5,38.8],[38.9,37.8],[40.2,38.0],[41.5,37.5],[42.0,37.4],[40.8,38.5],[41.2,37.9],[39.9,37.2],[42.5,37.2],[38.0,37.4],[39.2,38.0],[40.5,37.6],[41.9,38.0],[43.0,37.5],[39.6,37.7],[40.9,37.3],[38.6,37.2],[42.3,37.7],[39.0,38.5]]; ctx.save(); pts.slice(0,n).forEach((ll,i)=>{const q=P(e,ll); if(!q) return; ctx.globalAlpha=a; ctx.fillStyle=i===0?GO:'#fff'; ctx.strokeStyle='#0B1C2A'; ctx.lineWidth=3; ctx.fillRect(q[0]-7,q[1]-7,14,14); ctx.strokeRect(q[0]-7,q[1]-7,14,14);}); ctx.restore();}
function reservoir(e,a){if(a<=0) return; const q=P(e,[35.4,11.0]); if(!q) return; const {ctx}=e; ctx.save(); ctx.globalAlpha=0.8; ctx.fillStyle=WAT; ctx.beginPath(); ctx.ellipse(q[0],q[1],140*eout(a),70*eout(a),-0.5,0,7); ctx.fill(); ctx.restore();}
function bulb(ctx,x,y,a,on){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle=on?GO:'rgba(255,255,255,0.2)'; if(on){ctx.shadowColor=GO; ctx.shadowBlur=20;} ctx.beginPath(); ctx.arc(x,y,22,0,7); ctx.fill(); ctx.shadowBlur=0; ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.fillRect(x-9,y+20,18,12); ctx.restore();}
function subscribe(ctx,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(6,16,26,0.7)'; ctx.fillRect(0,0,W,H); ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.font=`800 140px ${FD}`; ctx.fillText('geofy',W/2-14,H/2-20); ctx.fillStyle=PK; ctx.fillText('.',W/2+188,H/2-20); rr(ctx,W/2-200,H/2+50,400,96,48); ctx.fillStyle=PK; ctx.fill(); ctx.fillStyle='#fff'; ctx.font=`800 44px ${FB}`; ctx.fillText('Abonnieren',W/2,H/2+113); ctx.restore();}
const S=(o)=>Object.assign({noSubs:true,swish:[],pops:[]},o);
const scenes=[
 // ---------- Kapitel 1 ----------
 S({head:'Kampf ums Wasser', headInstant:true, say:S_say[0], cams:[{at:0,view:vETH}], pops:[sc=>wt(sc,'größten'),sc=>wt(sc,'fehlen'),sc=>wt(sc,'existenzielle')],
  under:[e=>{const {u,sc}=e; fill(e,'ETH',TE,0.35*A(u,0.2,0.6),2); fill(e,'EGY',RD,0.6*A(u,wt(sc,'Ägypten'),0.3),3); fill(e,'SDN',RD,0.6*A(u,wt(sc,'Sudan'),0.3),3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tf=wt(sc,'fehlen'), tx=wt(sc,'existenzielle'); fireworks(e,GERD,A(u,0.1,0.3)*(1-A(u,tf,0.6)),t); riv(e,BLUE,1,WAT,6); pulse(e,GERD,t,1,PK,12); tag(e,GERD,'Staudamm GERD',A(u,0.4,0.3),0,60,'#fff',32);
   pop(ctx,'9. September 2025',win(u,0,wt(sc,'größten'),0.15),u,0,Y,'#fff',110); pop(ctx,'größter Staudamm Afrikas',win(u,wt(sc,'größten'),tf,0.15),u,wt(sc,'größten'),Y,'#fff',96);
   pop(ctx,'Zwei Nachbarn fehlen',win(u,tf,tx,0.15),u,tf,Y,'#fff',100); pop(ctx,'„existenzielle Bedrohung“',A(u,tx,0.15),u,tx,Y,'#fff',96);
   tag(e,[30,26.5],'Ägypten',A(u,wt(sc,'Ägypten'),0.3),0,0,'#fff',34); tag(e,[30,15],'Sudan',A(u,wt(sc,'Sudan'),0.3),0,0,'#fff',34);}]}),
 S({head:'Kampf ums Wasser', say:S_say[1], cams:[{at:0,view:vNILE,fly:1.6}], swish:[0], pops:[sc=>wt(sc,'tausend'),sc=>wt(sc,'Wem gehört')],
  under:[e=>{fill(e,'ETH',TE,0.3,2); fill(e,'EGY',RD,0.45,3); fill(e,'SDN',RD,0.45,3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tw=wt(sc,'Wem gehört'); riv(e,BLUE,1); riv(e,NILE,1); riv(e,DELTA,1); riv(e,DELTA2,1); pulse(e,GERD,t,1,PK,11); pulse(e,CAI,t,A(u,0.6,0.3),GO,11); tag(e,CAI,'Kairo',A(u,0.6,0.3),0,-46,'#fff',30);
   const q1=P(e,GERD), q2=P(e,CAI); if(q1&&q2){ctx.save(); ctx.globalAlpha=A(u,wt(sc,'tausend')-0.3,0.4); ctx.setLineDash([14,12]); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(q1[0],q1[1]); ctx.lineTo(q2[0],q2[1]); ctx.stroke(); ctx.restore();}
   pop(ctx,'weit über 1.000 km',win(u,wt(sc,'tausend')-0.3,tw,0.15),u,wt(sc,'tausend')-0.3,Y,'#fff',100); pop(ctx,'Wem gehört das Wasser?',A(u,tw,0.15),u,tw,Y,'#fff',104);}]}),
 S({head:'Drei Flüsse', say:S_say[2], cams:[{at:0,view:vWORLD,fly:1.8}], swish:[0], pops:[sc=>wt(sc,'Nil'),sc=>wt(sc,'Euphrat'),sc=>wt(sc,'Indus'),sc=>wt(sc,'acht')],
  over:[e=>{const {u,sc,ctx}=e; const tn=wt(sc,'Nil'), te=wt(sc,'Euphrat'), ti=wt(sc,'Indus'), ta=wt(sc,'acht');
   riv(e,[...WHITE],A(u,tn,1.2)); riv(e,BLUE,A(u,tn,1.2)); riv(e,NILE,A(u,tn+0.3,1.2)); riv(e,EUPH,A(u,te,1.2)); riv(e,TIGR,A(u,te+0.2,1.2)); riv(e,INDUS,A(u,ti,1.2)); riv(e,CHEN,A(u,ti+0.3,1)); riv(e,SUTL,A(u,ti+0.3,1));
   tag(e,[33,22],'Nil',A(u,tn,0.3),0,0,'#fff',36); tag(e,[42.5,35.5],'Euphrat & Tigris',A(u,te,0.3),0,-40,'#fff',32); tag(e,[70.5,28],'Indus',A(u,ti,0.3),0,0,'#fff',36);
   pop(ctx,'3 Flüsse · 8 Länder',A(u,ta,0.15),u,ta,Y,'#fff',100); chip(ctx,'Hunderte Millionen Menschen hängen von ihnen ab',CY_,A(u,wt(sc,'Hunderte'),0.25));}]}),
 // ---------- Kapitel 2 ----------
 S({head:'Oben und unten', say:S_say[3], cams:[{at:0,view:vWORLD,fly:0.6}], pops:[sc=>wt(sc,'oben und unten'),sc=>wt(sc,'Oberliegern')],
  over:[e=>{const {u,sc,ctx,t}=e; scheme(ctx,A(u,1.8,0.4),u,wt(sc,'stauen'),t); pop(ctx,'oben · unten',win(u,wt(sc,'oben und unten'),wt(sc,'Wer am Oberlauf'),0.15),u,wt(sc,'oben und unten'),Y-60,'#fff',100);}],
  top:[e=>card(e.ctx,e.u,2,'Oben und unten')]}),
 S({head:'Oben und unten', say:S_say[4], cams:[{at:0,view:vGLOBE,fly:1.6}], swish:[0], pops:[sc=>wt(sc,'300'),sc=>wt(sc,'fehlt')],
  over:[e=>{const {u,sc,ctx}=e; [WHITE,BLUE,NILE,EUPH,TIGR,INDUS,RHINE,MEKONG,...OTHER].forEach((r,i)=>riv(e,r,A(u,0.3+i*0.15,1),WAT,5));
   counter(ctx,0,300,win(u,wt(sc,'300')-0.4,wt(sc,'Verträge'),0.2),u,wt(sc,'300')-0.4,Y,140,''); chip(ctx,'geteilte Flussgebiete weltweit',CY_,win(u,wt(sc,'300'),wt(sc,'Verträge'),0.25));
   chip(ctx,'Verträge · Kommissionen · Regeln',CY_,win(u,wt(sc,'Verträge'),wt(sc,'fehlt'),0.25),'#0B1C2A','rgba(51,209,176,0.96)'); pop(ctx,'… oder gar kein Vertrag',A(u,wt(sc,'fehlt'),0.15),u,wt(sc,'fehlt'),Y,'#fff',96);}]}),
 S({head:'Oben und unten', say:S_say[5], cams:[{at:0,view:vNILE,fly:1.6}], swish:[0], pops:[sc=>wt(sc,'Trinkwasser'),sc=>wt(sc,'Landwirtschaft'),sc=>wt(sc,'Strom'),sc=>wt(sc,'Macht')],
  under:[e=>{fill(e,'ETH',TE,0.3,2); fill(e,'EGY',RD,0.35,2);}],
  over:[e=>{const {u,sc,ctx}=e; riv(e,BLUE,1); riv(e,NILE,1); pop(ctx,'nicht ersetzbar',win(u,wt(sc,'ersetzen'),wt(sc,'Trinkwasser'),0.15),u,wt(sc,'ersetzen'),Y,'#fff',110);
   [['Trinkwasser','Trinkwasser'],['Landwirtschaft','Landwirtschaft'],['Strom','Strom']].forEach(([w,txt],i,arr)=>{const t0=wt(sc,w), t1=i<2?wt(sc,arr[i+1][0]):wt(sc,'Wer das'); pop(ctx,txt,win(u,t0,t1,0.12),u,t0,Y,['#fff',GR,GO][i],120);});
   pop(ctx,'Wasser = Macht',A(u,wt(sc,'Macht'),0.15),u,wt(sc,'Macht'),Y,'#fff',120);}]}),
 // ---------- Kapitel 3 ----------
 S({head:'Der Nil', say:S_say[6], cams:[{at:0,view:vNILE,fly:0.8}], pops:[sc=>wt(sc,'6.650'),sc=>wt(sc,'elf'),sc=>wt(sc,'97')],
  under:[e=>{const {u,sc}=e; NILEC.forEach((k,i)=>fill(e,k,i===0?RD:CY2,0.5*A(u,wt(sc,'elf')+i*0.1,0.25),2));}],
  over:[e=>{const {u,sc,ctx,t}=e; const t6=wt(sc,'6.650'), te=wt(sc,'elf'), t97=wt(sc,'97'), tb=wt(sc,'grünen');
   riv(e,WHITE,A(u,2.2,1.4)); riv(e,BLUE,A(u,2.2,1.4)); riv(e,NILE,A(u,2.8,1.4)); riv(e,DELTA,A(u,4,0.4)); riv(e,DELTA2,A(u,4,0.4));
   if(u>tb){const {ctx:c}=e; c.save(); c.globalAlpha=0.5*A(u,tb,0.5); line(e,NILE,GR,1,34); c.restore();}
   counter(ctx,0,6650,win(u,t6,te,0.2),u,t6,Y,130,' km'); pop(ctx,'11 Länder',win(u,te,t97,0.15),u,te,Y,'#fff',130);
   pop(ctx,'97 %',win(u,t97,tb,0.15),u,t97,Y,'#fff',170); chip(ctx,'des ägyptischen Wassers kommt aus dem Nil',CY_,win(u,t97,tb,0.25),'#fff','rgba(229,72,77,0.95)');
   pop(ctx,'ein grünes Band in der Wüste',A(u,tb,0.15),u,tb,Y,'#fff',90);}],
  top:[e=>card(e.ctx,e.u,3,'Der Nil')]}),
 S({head:'Der Nil', say:S_say[7], cams:[{at:0,view:vETH,fly:1.6}], swish:[0], pops:[sc=>wt(sc,'Äthiopien'),sc=>wt(sc,'85')],
  under:[e=>{const {u,sc}=e; fill(e,'ETH',TE,0.6*A(u,wt(sc,'Äthiopien'),0.3),3);}],
  over:[e=>{const {u,sc,ctx,t}=e; riv(e,WHITE,1,WAT,4); riv(e,NILE,1,WAT,5); riv(e,BLUE,1,CY2,6+6*A(u,wt(sc,'Blaue'),0.4)); tag(e,[37.4,9.7],'Blauer Nil',A(u,wt(sc,'Blaue'),0.3),0,40,'#fff',32); tag(e,[31.3,7.5],'Weißer Nil',A(u,wt(sc,'Blaue'),0.3),0,0,'#fff',28);
   pop(ctx,'nicht aus Ägypten',win(u,0.2,wt(sc,'Hochland'),0.15),u,0.2,Y,'#fff',100); pop(ctx,'Hochland von Äthiopien',win(u,wt(sc,'Hochland'),wt(sc,'85'),0.15),u,wt(sc,'Hochland'),Y,'#fff',96);
   pop(ctx,'bis zu 85 %',A(u,wt(sc,'85'),0.15),u,wt(sc,'85'),Y,'#fff',150); chip(ctx,'des Nilwassers in Ägypten stammt aus dem Blauen Nil',CY_,A(u,wt(sc,'85'),0.25));}]}),
 S({head:'Der Nil', say:S_say[8], cams:[{at:0,view:vNILE,fly:1.4}], swish:[0], pops:[sc=>wt(sc,'1959'),sc=>wt(sc,'nie')],
  under:[e=>{const {u,sc}=e; fill(e,'EGY',GO,0.6*A(u,wt(sc,'Ägypten'),0.3),3); fill(e,'SDN',GO,0.6*A(u,wt(sc,'Sudan'),0.3),3); fill(e,'ETH',TE,0.45,2);}],
  over:[e=>{const {u,sc,ctx}=e; riv(e,BLUE,1); riv(e,NILE,1); riv(e,WHITE,1); badge(ctx,'Kolonialzeit · 1959',A(u,0.4,0.3),'rgba(6,20,40,0.85)');
   pop(ctx,'Vertrag 1959',win(u,wt(sc,'1959'),wt(sc,'Äthiopien'),0.15),u,wt(sc,'1959'),Y,'#fff',130); const q=P(e,[39,9]); if(q) xmark(ctx,q[0],q[1],A(u,wt(sc,'Äthiopien'),0.3),1.2);
   stamp(ctx,'NIE ANERKANNT',A(u,wt(sc,'nie'),0.2),u,wt(sc,'nie'),Y+40);}]}),
 // ---------- Kapitel 4 ----------
 S({head:'Der Damm', say:S_say[9], cams:[{at:0,view:vGERD,fly:1.4}], pops:[sc=>wt(sc,'2011'),sc=>wt(sc,'74'),sc=>wt(sc,'Bodensee')],
  under:[e=>{fill(e,'ETH',TE,0.25,2); fill(e,'SDN',RD,0.25,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; const t7=wt(sc,'74'), tb=wt(sc,'Bodensee'); riv(e,BLUE,1,CY2,8); reservoir(e,A(u,t7-0.5,1.6)); pulse(e,GERD,t,1,PK,13); tag(e,GERD,'GERD',A(u,wt(sc,'kurz GERD'),0.3),0,60,'#fff',34); tag(e,[33,12.5],'Sudan',A(u,wt(sc,'Sudan'),0.3),0,0,'#fff',30);
   pop(ctx,'2011',win(u,wt(sc,'2011'),t7,0.15),u,wt(sc,'2011'),Y,'#fff',160); counter(ctx,0,74,win(u,t7,tb,0.2),u,t7,Y,140,' Mrd. m³');
   bars(ctx,A(u,tb,0.3),u,tb,[['Stausee GERD: 74 Mrd. m³',1,WAT],['Bodensee: ≈ 48 Mrd. m³',0.65,CY2]],'Wassermenge',560); pop(ctx,'≈ 1,5 × Bodensee',A(u,tb,0.15),u,tb,Y,'#fff',110);}],
  top:[e=>card(e.ctx,e.u,4,'Der Damm')]}),
 S({head:'Der Damm', say:S_say[10], cams:[{at:0,view:vNILE,fly:1.4}], swish:[0], pops:[sc=>wt(sc,'Hälfte'),sc=>wt(sc,'verdoppeln'),sc=>wt(sc,'Gefahr')],
  under:[e=>{fill(e,'ETH',TE,0.4,2); fill(e,'EGY',RD,0.4,2);}],
  over:[e=>{const {u,sc,ctx}=e; const th=wt(sc,'Hälfte'), tg=wt(sc,'Gefahr');
   sides(ctx,1,u,0.3,tg,['ÄTHIOPIEN','Fast die Hälfte','ohne Strom.','Damm verdoppelt','die Produktion.'],['ÄGYPTEN','In trockenen Jahren','kommt unten','weniger an.']);
   for(let i=0;i<10;i++) bulb(ctx,190+i*66,960,A(u,th,0.3),i<5||A(u,wt(sc,'verdoppeln'),0.4)>0.5&&i<10);}]}),
 S({head:'Der Damm', say:S_say[11], cams:[{at:0,view:vNILE,fly:0.6}], pops:[sc=>wt(sc,'Einigung'),sc=>wt(sc,'Völkerrechts'),sc=>wt(sc,'Chance')],
  under:[e=>{fill(e,'ETH',TE,0.4,2); fill(e,'EGY',RD,0.4,2); fill(e,'SDN',RD,0.4,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; riv(e,BLUE,1); riv(e,NILE,1); pulse(e,GERD,t,1,PK,11);
   chip(ctx,'über 10 Jahre Verhandlungen · Afrikanische Union vermittelt',CY_,win(u,0.2,wt(sc,'Einigung'),0.25)); stamp(ctx,'KEINE EINIGUNG',win(u,wt(sc,'Einigung'),wt(sc,'Ägypten'),0.2),u,wt(sc,'Einigung'),Y+40);
   sides(ctx,A(u,wt(sc,'Ägypten'),0.3),u,wt(sc,'Ägypten'),wt(sc,'Äthiopien sagt'),['ÄGYPTEN & SUDAN','„Bruch des','Völkerrechts“'],['ÄTHIOPIEN','„Keine Bedrohung,','sondern eine','gemeinsame Chance“']);}]}),
 // ---------- Kapitel 5 ----------
 S({head:'Euphrat und Tigris', say:S_say[12], cams:[{at:0,view:vNILE},{at:2.4,view:vMESO,fly:2.2}], pops:[sc=>wt(sc,'3.000'),sc=>wt(sc,'Türkei')], swish:[2.4],
  under:[e=>{const {u,sc}=e; fill(e,'TUR',GO,0.4*A(u,wt(sc,'Türkei'),0.3),2); fill(e,'SYR',CY2,0.4*A(u,wt(sc,'Syrien'),0.3),2); fill(e,'IRQ',PK,0.4*A(u,wt(sc,'Irak'),0.3),2);}],
  over:[e=>{const {u,sc,ctx}=e; riv(e,EUPH,A(u,wt(sc,'Euphrat'),1.6)); riv(e,TIGR,A(u,wt(sc,'Tigris'),1.6)); tag(e,[39.5,35.2],'Euphrat',A(u,wt(sc,'Euphrat'),0.3),0,0,'#fff',30); tag(e,[44.5,35.5],'Tigris',A(u,wt(sc,'Tigris'),0.3),0,0,'#fff',30);
   pop(ctx,'knapp 3.000 km nördlich',win(u,wt(sc,'3.000')-0.2,wt(sc,'Euphrat'),0.15),u,wt(sc,'3.000')-0.2,Y,'#fff',96); pop(ctx,'Wiege der Hochkulturen',win(u,wt(sc,'Hochkulturen')-0.4,wt(sc,'Türkei'),0.15),u,wt(sc,'Hochkulturen')-0.4,Y,'#fff',90);
   chip(ctx,'Türkei → Syrien → Irak → Persischer Golf',CY_,A(u,wt(sc,'Von dort'),0.25));}],
  top:[e=>card(e.ctx,e.u,5,'Euphrat und Tigris')]}),
 S({head:'Euphrat und Tigris', say:S_say[13], cams:[{at:0,view:vTUR,fly:1.4}], swish:[0], pops:[sc=>wt(sc,'GAP'),sc=>wt(sc,'20'),sc=>wt(sc,'Atatürk')],
  under:[e=>{fill(e,'TUR',GO,0.3,2); fill(e,'SYR',CY2,0.25,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; const t2=wt(sc,'20'); riv(e,EUPH,1); riv(e,TIGR,1); dams(e,1,Math.floor(22*eout(A(u,t2-0.6,1.6))));
   pulse(e,ATA,t,A(u,wt(sc,'Atatürk'),0.3),GO,12); tag(e,ATA,'Atatürk-Staudamm',A(u,wt(sc,'Atatürk'),0.3),0,-56,'#fff',32);
   pop(ctx,'Projekt GAP',win(u,wt(sc,'GAP'),t2,0.15),u,wt(sc,'GAP'),Y,'#fff',130); counter(ctx,0,22,win(u,t2-0.4,wt(sc,'Atatürk'),0.2),u,t2-0.4,Y,150,'+ Dämme');
   chip(ctx,'Türkei: Strom und Bewässerung für eine ärmere Region',CY_,A(u,wt(sc,'Strom'),0.25),'#0B1C2A','rgba(255,224,102,0.96)');}]}),
 S({head:'Euphrat und Tigris', say:S_say[14], cams:[{at:0,view:vIRQ,fly:1.4}], swish:[0], pops:[sc=>wt(sc,'80'),sc=>wt(sc,'40'),sc=>wt(sc,'2024')],
  under:[e=>{fill(e,'IRQ',PK,0.4,3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const t8=wt(sc,'80'), t4=wt(sc,'40'), tf=wt(sc,'Fachleute'), t24=wt(sc,'2024'); riv(e,EUPH,1,WAT,4+3*(1-A(u,t4,1))); riv(e,TIGR,1,WAT,4+3*(1-A(u,t4,1))); pulse(e,BAG,t,1,PK,10); tag(e,BAG,'Bagdad',1,0,-46,'#fff',30);
   pop(ctx,'tiefster Stand seit 80 Jahren',win(u,t8-0.3,t4,0.15),u,t8-0.3,Y,'#fff',88); counter(ctx,100,40,win(u,t4-0.6,tf,0.2),u,t4-0.6,Y,150,' %'); gauge(ctx,1650,820,320,win(u,t8-0.3,t24,0.3),1-0.6*A(u,t4-0.6,1),'Irak');
   ['Dämme in Türkei und Iran','Dürre','Hitze','Misswirtschaft'].forEach((c,i)=>{const ai=win(u,tf+i*0.7,t24,0.2); if(ai>0) chip(ctx,c,560+i*90,ai,'#fff',i<1?'rgba(229,72,77,0.95)':'rgba(6,20,40,0.85)');});
   badge(ctx,'2024: Rahmenabkommen Irak–Türkei',A(u,t24,0.3),'rgba(6,20,40,0.85)'); pop(ctx,'noch nicht gelöst',A(u,wt(sc,'Gelöst'),0.15),u,wt(sc,'Gelöst'),Y,'#fff',100);}]}),
 // ---------- Kapitel 6 ----------
 S({head:'Der Indus', say:S_say[15], cams:[{at:0,view:vWORLD},{at:2.2,view:vIND,fly:2.0}], pops:[sc=>wt(sc,'Himalaya'),sc=>wt(sc,'Pakistans')], swish:[2.2],
  under:[e=>{const {u,sc}=e; fill(e,'IND',GO,0.35*A(u,wt(sc,'Indien'),0.3),2); fill(e,'PAK',TE,0.4*A(u,wt(sc,'Pakistans'),0.3),2);}],
  over:[e=>{const {u,sc,ctx}=e; riv(e,INDUS,A(u,wt(sc,'Indus'),2.0)); [JHEL,CHEN,RAVI,BEAS,SUTL].forEach(r=>riv(e,r,A(u,wt(sc,'Nebenflüssen'),1.2),WAT,4));
   pop(ctx,'aus dem Himalaya',win(u,wt(sc,'Himalaya'),wt(sc,'Pakistans'),0.15),u,wt(sc,'Himalaya'),Y,'#fff',100); tag(e,[79,30],'Indien',A(u,wt(sc,'Indien'),0.3),0,0,'#fff',36); tag(e,[68.5,29.5],'Pakistan',A(u,wt(sc,'Pakistans'),0.3),0,0,'#fff',36);}],
  top:[e=>card(e.ctx,e.u,6,'Der Indus')]}),
 S({head:'Der Indus', say:S_say[16], cams:[{at:0,view:vPUN,fly:1.4}], swish:[0], pops:[sc=>wt(sc,'1960'),sc=>wt(sc,'östlichen'),sc=>wt(sc,'westlichen'),sc=>wt(sc,'drei Kriege')],
  under:[e=>{fill(e,'IND',GO,0.25,2); fill(e,'PAK',TE,0.3,2);}],
  over:[e=>{const {u,sc,ctx}=e; const to=wt(sc,'östlichen'), tw=wt(sc,'westlichen');
   [SUTL,BEAS,RAVI].forEach(r=>riv(e,r,1,A(u,to,0.3)>0.5?GO:WAT,4+3*A(u,to,0.3))); [INDUS,JHEL,CHEN].forEach(r=>riv(e,r,1,A(u,tw,0.3)>0.5?TE:WAT,4+3*A(u,tw,0.3)));
   pop(ctx,'1960',win(u,wt(sc,'1960'),to,0.15),u,wt(sc,'1960'),Y,'#fff',160); chip(ctx,'Indus-Wasservertrag · Weltbank',CY_,win(u,wt(sc,'1960'),to,0.25));
   pop(ctx,'3 östliche → Indien',win(u,to,tw,0.15),u,to,Y,GO,96); pop(ctx,'3 westliche → Pakistan',win(u,tw,wt(sc,'Dieser'),0.15),u,tw,Y,TE,96); pop(ctx,'überstand 3 Kriege',A(u,wt(sc,'drei Kriege'),0.15),u,wt(sc,'drei Kriege'),Y,'#fff',110);}]}),
 S({head:'Der Indus', say:S_say[17], cams:[{at:0,view:vIND,fly:1.2}], swish:[0], pops:[sc=>wt(sc,'April'),sc=>wt(sc,'setzte'),sc=>wt(sc,'Den Haag'),sc=>wt(sc,'bleibt')],
  under:[e=>{fill(e,'IND',GO,0.3,2); fill(e,'PAK',TE,0.3,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; const ts=wt(sc,'setzte'), tp=wt(sc,'Pakistan weist'), th=wt(sc,'Den Haag'), tn=wt(sc,'erkennt'), tb=wt(sc,'bleibt');
   riv(e,INDUS,1); [JHEL,CHEN,RAVI,BEAS,SUTL].forEach(r=>riv(e,r,1,WAT,4)); pulse(e,PAH,t,A(u,0.3,0.3)*(1-A(u,ts,0.4)),RD,11); tag(e,PAH,'Kaschmir: Anschlag, 26 Tote',A(u,0.3,0.3)*(1-A(u,ts,0.4)),0,-50,'#fff',28);
   stamp(ctx,'AUSGESETZT',win(u,ts,tp,0.2),u,ts,Y+40,RD); sides(ctx,win(u,tp,th,0.3),u,tp,tp+0.6,['INDIEN','Ausgesetzt, bis','Pakistan Terror-','Unterstützung beendet'],['PAKISTAN','Weist Vorwürfe zurück:','„Bedrohung für','das ganze Land“']);
   pop(ctx,'Den Haag 2026: unzulässig',win(u,th,tn,0.15),u,th,Y,'#fff',90); pop(ctx,'Indien erkennt Gericht nicht an',win(u,tn,tb,0.15),u,tn,Y,'#fff',80); badge(ctx,'Vertrag: weiter ausgesetzt',A(u,tb,0.3),'rgba(229,72,77,0.95)');}]}),
 // ---------- Kapitel 7 ----------
 S({head:'Das Muster', say:S_say[18], cams:[{at:0,view:vWORLD,fly:1.4}], pops:[sc=>wt(sc,'baut'),sc=>wt(sc,'fürchtet'),sc=>wt(sc,'Klimawandel')],
  over:[e=>{const {u,sc,ctx}=e; [WHITE,BLUE,NILE,EUPH,TIGR,INDUS,CHEN,SUTL].forEach(r=>riv(e,r,1)); const tb=wt(sc,'baut'), tf=wt(sc,'fürchtet'), tk=wt(sc,'Klimawandel');
   if(u>tk){ctx.save(); ctx.globalAlpha=0.22*A(u,tk,0.8); ctx.fillStyle='#FF7A3D'; ctx.fillRect(0,0,W,H); ctx.restore();}
   [['OBERLIEGER','baut: Strom, Wachstum',tb,GO],['UNTERLIEGER','fürchtet um Existenz',tf,PK],['KLIMAWANDEL','Dürren nehmen zu',tk,'#FF7A3D']].forEach(([k,txt,t0,col],i)=>{const a=A(u,t0,0.3); if(a<=0) return; const x=150+i*560; ctx.save(); ctx.globalAlpha=a; rr(ctx,x,600,500,220,28); ctx.fillStyle='rgba(6,20,40,0.88)'; ctx.fill(); ctx.strokeStyle=col; ctx.lineWidth=3; ctx.stroke(); ctx.fillStyle=col; ctx.font=`700 30px ${KV.FM}`; ctx.fillText(k,x+30,670); ctx.fillStyle='#fff'; ctx.font=`800 44px ${FD}`; ctx.fillText(txt,x+30,750,440); ctx.restore();});
   pop(ctx,'3 Flüsse · 1 Muster',win(u,0.2,tb,0.15),u,0.2,Y,'#fff',110);}],
  top:[e=>card(e.ctx,e.u,7,'Das Muster')]}),
 S({head:'Es geht auch anders', say:S_say[19], cams:[{at:0,view:vRHINE,fly:1.6},{at:sc=>wt(sc,'Mekong')-0.2,view:vMEK,fly:1.8}], swish:[0,sc=>wt(sc,'Mekong')-0.2], pops:[sc=>wt(sc,'1950'),sc=>wt(sc,'Mekong'),sc=>wt(sc,'gewinnen')],
  over:[e=>{const {u,sc,ctx}=e; riv(e,RHINE,A(u,0.3,1.4),TE,7); riv(e,MEKONG,A(u,wt(sc,'Mekong'),1.4),TE,7); tag(e,[7.4,49.2],'Rhein',A(u,0.6,0.3),-80,0,'#fff',34); tag(e,[104,16],'Mekong',A(u,wt(sc,'Mekong')+0.4,0.3),70,0,'#fff',34);
   pop(ctx,'seit 1950',win(u,wt(sc,'1950'),wt(sc,'Mekong'),0.15),u,wt(sc,'1950'),Y,'#fff',140); chip(ctx,'gemeinsame Kommission der Rhein-Staaten',CY_,win(u,wt(sc,'Kommission'),wt(sc,'Mekong'),0.25),'#0B1C2A','rgba(51,209,176,0.96)');
   chip(ctx,'Daten über Wasserstände werden geteilt',CY_,win(u,wt(sc,'Daten'),wt(sc,'Zusammenarbeit'),0.25),'#0B1C2A','rgba(51,209,176,0.96)'); pop(ctx,'alle gewinnen mehr',A(u,wt(sc,'gewinnen'),0.15),u,wt(sc,'gewinnen'),Y,'#fff',110);}]}),
 // ---------- Kapitel 8 ----------
 S({head:'Wem gehört das Wasser?', say:S_say[20], cams:[{at:0,view:vGLOBE,fly:1.8}], pops:[sc=>wt(sc,'Grenzen'),sc=>wt(sc,'Verhandlungstisch')],
  over:[e=>{const {u,sc,ctx}=e; [WHITE,BLUE,NILE,EUPH,TIGR,INDUS,RHINE,MEKONG,...OTHER].forEach(r=>riv(e,r,1,WAT,5));
   pop(ctx,'Wasser kennt keine Grenzen',win(u,0.3,wt(sc,'Menschen'),0.15),u,0.3,Y,'#fff',100); pop(ctx,'Menschen ziehen sie',win(u,wt(sc,'Menschen'),wt(sc,'Ob die'),0.15),u,wt(sc,'Menschen'),Y,'#fff',110);
   pop(ctx,'verbinden oder spalten?',win(u,wt(sc,'verbinden'),wt(sc,'Verhandlungstisch'),0.15),u,wt(sc,'verbinden'),Y,'#fff',100); pop(ctx,'am Verhandlungstisch',A(u,wt(sc,'Verhandlungstisch'),0.15),u,wt(sc,'Verhandlungstisch'),Y,'#fff',110);}],
  top:[e=>card(e.ctx,e.u,8,'Wem gehört das Wasser?')]}),
 S({head:'Was denkst du?', say:S_say[21], cams:[{at:0,view:vGLOBE,fly:0.6}], pops:[sc=>wt(sc,'Oberlauf'),sc=>wt(sc,'Regeln'),sc=>wt(sc,'abonnier')],
  over:[e=>{const {u,sc,ctx}=e; [WHITE,BLUE,NILE,EUPH,TIGR,INDUS].forEach(r=>riv(e,r,1,WAT,5));
   sides(ctx,1-A(u,wt(sc,'abonnier')-0.5,0.4),u,wt(sc,'Oberlauf')-0.6,wt(sc,'Oder'),['FRAGE 1','Darf der Oberlieger','frei entscheiden?'],['FRAGE 2','Braucht es','verbindliche Regeln','für alle?']);
   chip(ctx,'Schreib es in die Kommentare',CY_,win(u,wt(sc,'Kommentare'),wt(sc,'abonnier'),0.25),'#fff','rgba(229,72,77,0.95)');
   subscribe(ctx,A(u,wt(sc,'abonnier')-0.3,0.4));}]}),
];
return {tag:'GEOFY · DOKU #1', scenes, wt};
}
