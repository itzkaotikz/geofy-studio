// Story: Was wäre wenn #5 – Bosporus gesperrt
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
const IST=[29.0,41.05], BSEA=[33.5,43.2], AEG=[25.4,39.6], MON=[6.91,46.43], BAR=[29.05,41.10], NENT=[29.3,41.45];
const ROUTE=[[31.5,42.6],[30.2,41.85],[29.5,41.4],...BOS,[28.4,40.8],[27.2,40.55],[26.65,40.38],[26.35,40.15],[26.1,40.0],AEG];
const KAN=[[28.62,41.30],[28.66,41.2],[28.72,41.1],[28.77,41.0]];
const vI=viewBox([26.0,39.2,32.0,42.6]), vN=viewBox([27.2,40.2,33.2,43.6]), vB=viewBox([26.5,40.0,42.5,48.5]), vM=viewBox([20.0,34.5,42.5,47.5]), vE=viewBox([4.0,37.0,33.0,49.0]), vW=viewBox([-12,22,48,56]), vWW=viewBox([-60,-10,110,68]);
const vG=vM;
const CC=[['TUR','Türkei'],['BGR','Bulgarien'],['ROU','Rumänien'],['UKR','Ukraine'],['RUS','Russland'],['GEO','Georgien']];
const CCOL=['#FF7A3D','#FFE066','#4D9BFF','#33D1B0','#E5484D','#B98CFF'];
const PINK='#FF3D81';
const A=(u,t0,d=0.35)=>clamp((u-t0)/d);
const win=(u,t0,t1,d=0.3)=>clamp((u-t0)/d)*(1-clamp((u-t1)/d));
// big centered word with pop-in scale
function pop(ctx,txt,a,u,t0,y=600,col='#fff',size=130){if(a<=0||window.NO_CHIPS) return; const k=1+0.35*Math.max(0,1-(u-t0)/0.25); ctx.save(); ctx.translate(540,y); ctx.scale(k,k); ctx.translate(-540,-y); big(ctx,txt,a,y,col,size); ctx.restore();}
function flash(ctx,u,t0,col='rgba(229,72,77,',m=0.38){const a=1-clamp((u-t0)/0.45); if(u<t0||a<=0) return; ctx.save(); ctx.fillStyle=col+(a*m)+')'; ctx.fillRect(0,0,1080,1920); ctx.restore();}
function badge(ctx,txt,a,col=PINK){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 40px ${FD}`; const w=ctx.measureText(txt).width+44; const x=1080-L-w, y=250; ctx.fillStyle=col; rr(ctx,x,y,w,62,31); ctx.fill(); ctx.fillStyle='#fff'; ctx.textAlign='left'; ctx.fillText(txt,x+22,y+45); ctx.restore();}
function shipIcon(ctx,x,y,ang,s=1,col='#fff',a=1){ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.rotate(ang); ctx.scale(s,s); ctx.beginPath(); ctx.moveTo(16,0); ctx.lineTo(6,-7); ctx.lineTo(-14,-7); ctx.lineTo(-14,7); ctx.lineTo(6,7); ctx.closePath(); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=2.5; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.stroke(); ctx.fillStyle='rgba(5,14,24,0.55)'; ctx.fillRect(-10,-3,10,6); ctx.restore();}
// ships flowing along a polyline (screen coords), stop = 0..1 fades flow out
function flow(e,pts,n,speed,a,cols=['#fff','#FFE066','#7FD0FF']){if(a<=0) return; const q=pts.map(p=>P(e,p)).filter(Boolean); const L0=[0]; for(let i=1;i<q.length;i++) L0.push(L0[i-1]+Math.hypot(q[i][0]-q[i-1][0],q[i][1]-q[i-1][1])); const tot=L0[L0.length-1];
 for(let k=0;k<n;k++){const f=((k/n)+e.t*speed)%1, d=f*tot; let i=1; while(i<L0.length-1&&L0[i]<d) i++; const r=(d-L0[i-1])/Math.max(1,L0[i]-L0[i-1]); const x=q[i-1][0]+(q[i][0]-q[i-1][0])*r, y=q[i-1][1]+(q[i][1]-q[i-1][1])*r; shipIcon(e.ctx,x,y,Math.atan2(q[i][1]-q[i-1][1],q[i][0]-q[i-1][0]),1.15,cols[k%cols.length],a*Math.min(1,f*8,(1-f)*8));}}
// growing queue of ships north of the barrier
const QUEUE=[];for(let i=0;i<48;i++){const row=Math.floor(i/6), col=i%6; QUEUE.push([29.3+col*0.17+row*0.07+(row%2)*0.08, 41.38+row*0.13]);}
function queue(e,count,a){if(a<=0) return; for(let i=0;i<Math.min(count,QUEUE.length);i++){const q=P(e,QUEUE[i]); if(!q) continue; shipIcon(e.ctx,q[0],q[1],2.3+((i*0.7)%0.5),1.35,['#fff','#FFE066','#7FD0FF','#FF7A3D'][i%4],a);}}
function barrier(e,a,col='#E5484D'){if(a<=0) return; const q=P(e,BAR); if(!q) return; const {ctx}=e; const k=eout(clamp(a)); ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.lineCap='round'; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineWidth=26; ctx.beginPath(); ctx.moveTo(q[0]-70*k,q[1]+8*k); ctx.lineTo(q[0]+70*k,q[1]-8*k); ctx.stroke(); ctx.strokeStyle=col; ctx.lineWidth=16; ctx.stroke();
 for(let i=-2;i<=2;i++){ctx.strokeStyle='#fff'; ctx.lineWidth=5; const x=q[0]+i*28*k, y=q[1]-i*3.2*k; ctx.beginPath(); ctx.moveTo(x-6,y+6); ctx.lineTo(x+6,y-6); ctx.stroke();} ctx.restore();}
function xmark(ctx,x,y,a,s=1){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.scale(s*(1+0.4*(1-a)),s*(1+0.4*(1-a))); ctx.lineCap='round'; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineWidth=20; ctx.beginPath(); ctx.moveTo(-22,-22); ctx.lineTo(22,22); ctx.moveTo(22,-22); ctx.lineTo(-22,22); ctx.stroke(); ctx.strokeStyle='#E5484D'; ctx.lineWidth=11; ctx.stroke(); ctx.restore();}
function counter(ctx,from,to,a,u,t0,y,suffix='',size=150){if(a<=0) return; const k=eout(clamp((u-t0)/1.1)); big(ctx,Math.round(from+(to-from)*k).toLocaleString('de-DE')+suffix,a,y,'#fff',size);}
const DEST=[['Ägypten',[31.2,30.6]],['Italien',[12.5,41.9]],['Spanien',[-3.7,40.4]],['Libanon',[35.6,33.9]],['Tunesien',[10.2,36.8]]];
const ORIG=[33.2,44.4];
const scenes=[
 {head:'Was wäre wenn …', headInstant:true, say:S_say[0], cams:[{at:0,view:vI},{at:sc=>wt(sc,'Stunden')-0.2,view:vB,fly:1.6}],
  pops:[sc=>wt(sc,'700'),sc=>wt(sc,'gesperrt'),sc=>wt(sc,'Was passiert'),sc=>wt(sc,'sechs'),sc=>wt(sc,'Tag eins')],
  swish:[sc=>wt(sc,'Stunden')-0.2],
  under:[e=>{const {u,sc}=e; const t6=wt(sc,'sechs'); CC.forEach(([k],i)=>fill(e,k,CCOL[i],0.9*A(u,t6+i*0.16,0.25),3));}],
  over:[e=>{const {u,sc,ctx,t}=e; const tg=wt(sc,'gesperrt'); line(e,BOS,PINK,1,12); flow(e,ROUTE,9,0.07,1-A(u,tg,0.4)); barrier(e,A(u,tg,0.3)); queue(e,Math.floor((u-tg)*4),A(u,tg+0.2)*(1-A(u,wt(sc,'sechs'),0.4)));
   const ts=wt(sc,'Stunden'); pulse(e,IST,t,1-A(u,ts,0.3),PINK,12);
   pop(ctx,'nur 700 m breit',win(u,0,wt(sc,'gesperrt')-0.05,0.2),u,0,600,'#fff',112);
   chip(ctx,'GESPERRT',1180,win(u,tg,wt(sc,'Was passiert'),0.2),'#fff','rgba(229,72,77,0.97)',52);
   pop(ctx,'Was passiert dann?',win(u,wt(sc,'Was passiert'),ts-0.1,0.2),u,wt(sc,'Was passiert'),600,'#FFE066',104);
   chip(ctx,'nach wenigen Stunden …',1180,win(u,ts,wt(sc,'sechs'),0.25));
   chip(ctx,'Seehandel von 6 Ländern: Stopp',1180,win(u,wt(sc,'sechs'),wt(sc,'Tag eins'),0.25),'#fff','rgba(229,72,77,0.95)');
   pop(ctx,'TAG 1',A(u,wt(sc,'Tag eins'),0.2),u,wt(sc,'Tag eins'),640,'#fff',190);}],
  top:[e=>{const {u,sc,ctx}=e; flash(ctx,u,wt(sc,'gesperrt'));}]},
 {head:'Das ist der Bosporus', say:S_say[1], cams:[{at:0,view:vI,fly:1.0},{at:sc=>wt(sc,'einzige')-0.2,view:vM,fly:1.6}],
  pops:[sc=>wt(sc,'30'),sc=>wt(sc,'700'),sc=>wt(sc,'einzige')], swish:[0,sc=>wt(sc,'einzige')-0.2],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.12);}],
  over:[e=>{const {u,sc,ctx,t}=e; const t30=wt(sc,'30'), t7=wt(sc,'700'), te=wt(sc,'einzige');
   line(e,BOS,A(u,t30)>0?'#FFE066':PINK,clamp(u/0.9),A(u,t30)>0?16:12); tag(e,[29.75,41.15],'Bosporus',A(u,wt(sc,'Bosporus'))*(1-A(u,te)),80,0,'#fff',38); pulse(e,IST,t,A(u,wt(sc,'Istanbul')),PINK,13); tag(e,[28.95,40.85],'Istanbul',A(u,wt(sc,'Istanbul'))*(1-A(u,te)),0,46,'#fff',32);
   pop(ctx,'≈ 30 km',win(u,t30,t7,0.2),u,t30,600,'#FFE066',140);
   pop(ctx,'≈ 700 m',win(u,t7,te,0.2),u,t7,600,'#fff',140); chip(ctx,'an der engsten Stelle',1180,win(u,t7,te,0.25),'#fff','rgba(229,72,77,0.95)');
   line(e,ROUTE,'#7FD0FF',A(u,te,1.6),8); tag(e,BSEA,'Schwarzes Meer',A(u,te+0.3),0,0,'#fff',38); tag(e,[24.5,36.2],'Mittelmeer',A(u,te+1.0),0,0,'#fff',38);
   chip(ctx,'der einzige Ausgang',1180,A(u,te,0.3),'#0B1C2A','rgba(255,224,102,0.96)');}],
  top:[e=>badge(e.ctx,'TAG 1',1)]},
 {head:'Tag 1: Stau vor Istanbul', say:S_say[2], cams:[{at:0,view:vN,fly:1.3}],
  pops:[sc=>wt(sc,'110'),sc=>wt(sc,'Tanker'),sc=>wt(sc,'Frachter'),sc=>wt(sc,'Getreide')], swish:[0,sc=>wt(sc,'Jetzt')],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.12);}],
  over:[e=>{const {u,sc,ctx}=e; const t1=wt(sc,'110'), tj=wt(sc,'Jetzt'); line(e,BOS,PINK,1,12); flow(e,ROUTE,12,0.09,1-A(u,tj,0.4)); barrier(e,A(u,tj,0.3)); queue(e,Math.floor(Math.max(0,u-tj)*14),A(u,tj));
   counter(ctx,0,110,win(u,t1,tj,0.2),u,t1,600); chip(ctx,'Schiffe pro Tag',1180,win(u,t1,tj,0.25));
   [['Tanker','TANKER'],['Frachter','FRACHTER'],['Getreide','GETREIDE']].forEach(([w,txt],i,arr)=>{const t0=wt(sc,w), t1b=i<arr.length-1?wt(sc,arr[i+1][0]):99; pop(ctx,txt,win(u,t0,t1b,0.15),u,t0,600,['#fff','#7FD0FF','#FFE066'][i],120);});
   chip(ctx,'Stau am Eingang',1180,A(u,tj+0.3),'#fff','rgba(229,72,77,0.95)');}],
  top:[e=>{const {u,sc,ctx}=e; badge(ctx,'TAG 1',1); flash(ctx,u,wt(sc,'Jetzt'));}]},
 {head:'Woche 1: Die Welt merkt es', say:S_say[3], cams:[{at:0,view:vW,fly:1.4},{at:sc=>wt(sc,'weltweit')-0.1,view:vWW,fly:1.8}],
  pops:[sc=>wt(sc,'Getreide'),sc=>wt(sc,'Öl'),sc=>wt(sc,'Container'),sc=>wt(sc,'Preise')], swish:[0,sc=>wt(sc,'weltweit')-0.1],
  under:[e=>{const {u,sc}=e; CC.forEach(([k],i)=>fill(e,k,CCOL[i],0.55*(1-A(u,wt(sc,'weltweit'),0.6)),2));}],
  over:[e=>{const {u,sc,ctx,t}=e; const tg=wt(sc,'Getreide');
   DEST.forEach(([n,d],i)=>{const pts=[ORIG,[29.6,41.8],[29.05,41.1],[28.2,40.7],[26.2,40.0],d]; const a=A(u,0.3+i*0.25,1.0); line(e,pts,'rgba(255,61,129,0.9)',a,6,[14,10]); tag(e,d,n,A(u,0.8+i*0.25)*(1-A(u,wt(sc,'weltweit'),0.4)),0,-40,'#fff',28);});
   const q=P(e,[29.05,41.1]); if(q) xmark(ctx,q[0],q[1],A(u,0.5,0.3),1.1);
   [['Getreide','Getreide'],['Öl','Öl'],['Container','Container']].forEach(([w,txt],i,arr)=>{const t0=wt(sc,w), t1b=i<arr.length-1?wt(sc,arr[i+1][0]):wt(sc,'Preise'); chip(ctx,txt+' steckt fest',1180,win(u,t0,t1b,0.15),'#0B1C2A','rgba(255,224,102,0.96)');});
   const tp=wt(sc,'Preise'); pop(ctx,'Preise ↑',A(u,tp,0.2),u,tp,600,'#E5484D',150); chip(ctx,'weltweit',1180,A(u,wt(sc,'weltweit'),0.25),'#fff','rgba(229,72,77,0.95)');}],
  top:[e=>{const {u,ctx}=e; pop(ctx,'WOCHE 1',win(u,0,0.9,0.15),u,0,640,'#fff',170); badge(ctx,'WOCHE 1',A(u,0.9,0.2));}]},
 {head:'Doch es gibt einen Haken', say:S_say[4], cams:[{at:0,view:vM,fly:1.0},{at:sc=>wt(sc,'Vertrag')-0.1,view:vE,fly:1.4},{at:sc=>wt(sc,'erlaubt')-0.1,view:vI,fly:1.5}],
  pops:[sc=>wt(sc,'Haken'),sc=>wt(sc,'1936'),sc=>wt(sc,'freie')], swish:[0,sc=>wt(sc,'Vertrag')-0.1,sc=>wt(sc,'erlaubt')-0.1],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.15);}],
  over:[e=>{const {u,sc,ctx,t}=e; const th=wt(sc,'Haken'), tv=wt(sc,'Vertrag'), ty=wt(sc,'1936'), te=wt(sc,'erlaubt');
   pop(ctx,'DER HAKEN',win(u,th,tv,0.2),u,th,600,'#FFE066',140);
   pulse(e,MON,t,win(u,tv,te,0.3),'#FFE066',13); tag(e,MON,'Montreux, Schweiz',win(u,tv,te,0.3),0,-55,'#fff',32);
   pop(ctx,'1936',win(u,ty,te,0.2),u,ty,600,'#fff',160);
   line(e,BOS,'#33D1B0',A(u,te),14); barrier(e,(1-A(u,te,0.4))*A(u,0.01,0.01)); flow(e,ROUTE,10,0.09,A(u,te+0.4,0.6),['#fff','#33D1B0']);
   chip(ctx,'Handelsschiffe: freie Fahrt im Frieden',1180,A(u,te,0.3),'#0B1C2A','rgba(51,209,176,0.96)');}],
  top:[e=>{const {u,sc,ctx}=e; flash(ctx,u,wt(sc,'Haken'),'rgba(255,224,102,',0.3);}]},
 {head:'Und im Krieg?', say:S_say[5], cams:[{at:0,view:vI,fly:0.8},{at:sc=>wt(sc,'2022')-0.1,view:vB,fly:1.5}],
  pops:[sc=>wt(sc,'einschränken'),sc=>wt(sc,'2022')], swish:[sc=>wt(sc,'2022')-0.1],
  under:[e=>{const {u,sc}=e; fill(e,'TUR','#FF7A3D',0.15); fill(e,'UKR','#4D9BFF',0.9*A(u,wt(sc,'Ukraine'),0.3),3); fill(e,'RUS','#E5484D',0.7*A(u,wt(sc,'Ukraine')+0.2,0.3),3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tk=wt(sc,'Kriegsschiffe'), te=wt(sc,'einschränken'), t2=wt(sc,'2022'); line(e,BOS,'#E5484D',1,14);
   [[31.0,42.3],[30.4,41.95],[29.8,41.65]].forEach((g,i)=>{const q=P(e,g); if(q){shipIcon(ctx,q[0],q[1],2.6,1.6,'#9AA8B8',A(u,tk+i*0.15,0.25)); xmark(ctx,q[0],q[1]-34,A(u,te+i*0.12,0.25),0.6);}});
   chip(ctx,'Kriegsschiffe: Türkei kann beschränken',1180,win(u,tk,t2,0.25),'#fff','rgba(229,72,77,0.95)');
   pop(ctx,'2022',A(u,t2,0.2),u,t2,600,'#fff',160); chip(ctx,'nach Beginn des Ukraine-Kriegs',1180,A(u,wt(sc,'Ukraine'),0.25));}],
  top:[]},
 {head:'Gibt es einen Ausweg?', say:S_say[6], cams:[{at:0,view:vI,fly:1.3}],
  pops:[sc=>wt(sc,'Umgehung'),sc=>wt(sc,'Kanal'),sc=>wt(sc,'noch nicht')], swish:[0],
  under:[e=>{fill(e,'TUR','#FF7A3D',0.15);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tu=wt(sc,'Umgehung'), tk=wt(sc,'Kanal'), tn=wt(sc,'noch nicht'); line(e,BOS,PINK,1,12); flow(e,ROUTE,8,0.08,1);
   pop(ctx,'Umgehung: keine',win(u,tu,tk,0.2),u,tu,600,'#fff',110);
   line(e,KAN,'#FFE066',A(u,tk,1.2),12,[16,10]); tag(e,[28.3,41.15],'Kanal Istanbul',A(u,tk,0.3),-80,0,'#fff',32);
   chip(ctx,'soll den Bosporus entlasten',1180,win(u,wt(sc,'entlasten')-0.3,tn,0.25),'#0B1C2A','rgba(255,224,102,0.96)');
   chip(ctx,'geplant – noch nicht gebaut',1180,A(u,tn,0.25),'#fff','rgba(229,72,77,0.95)');}],
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
return {tag:'GEOFY · WAS WÄRE WENN #5', scenes, wt};
}
