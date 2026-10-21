// Story: Was wäre, wenn …? #1 – Was, wenn alles Eis schmilzt?
// ≈ 70 m (USGS) · Antarktis ≈ 58 m · Grönland ≈ 7 m · seit 1880 + 21–24 cm (NOAA)
// Flutmasken: ETOPO 20′ + Natural-Earth-Landmaske, Stufen 0–70 m in 5-m-Schritten (window.FLOOD)
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
const MY=la=>Math.log(Math.tan(Math.PI/4+la*Math.PI/360)), TOP=MY(84), BOT=MY(-80);
function drawImg(ctx,proj,img,alpha){if(alpha<=0||!img) return; const s=proj.scale(), [tx,ty]=proj.translate(), lonC=-proj.rotate()[0]; const w=2*Math.PI*s, y0=ty-s*TOP, h=s*(TOP-BOT); const iw=img.width, ih=img.height;
 const base=tx+s*(-180-lonC)*Math.PI/180; ctx.save(); ctx.globalAlpha=alpha; ctx.imageSmoothingQuality='high';
 for(const x0 of [base-w,base,base+w]){const sx=clamp((0-x0)/w*iw,0,iw), ex=clamp((1080-x0)/w*iw,0,iw), sy=clamp((0-y0)/h*ih,0,ih), ey=clamp((1920-y0)/h*ih,0,ih);
  if(ex-sx<1||ey-sy<1) continue; ctx.drawImage(img,sx,sy,ex-sx,ey-sy,x0+sx/iw*w,y0+sy/ih*h,(ex-sx)/iw*w,(ey-sy)/ih*h);} ctx.restore();}
function flood(e,lev){lev=clamp(lev,0,70); if(lev<=0.05) return; const F=window.FLOOD||[]; const k=lev/5, i=Math.floor(k), f=k-i;
 if(i>=14){drawImg(e.ctx,e.proj,F[14],1); return;} drawImg(e.ctx,e.proj,F[i],i===0?f:1); if(f>0.02&&i>0) drawImg(e.ctx,e.proj,F[i+1],f); else if(i===0) drawImg(e.ctx,e.proj,F[1],0);}
function gauge(ctx,lev,a){if(a<=0) return; const txt=`Meeresspiegel +${Math.round(lev)} m`; label(ctx,txt,L+20,1250,{color:'#fff',bg:'rgba(33,120,190,0.95)',alpha:a,font:`800 42px ${FD}`});}
// city pin that "sinks" once the water passes its elevation
function city(e,ll,name,elev,lev,a,dx=26,dy=-30){if(a<=0) return; const {ctx}=e; const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; const sunk=lev>=elev;
 ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],12,0,7); ctx.fillStyle=sunk?'#5FB4FF':C.sand; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke();
 if(sunk){for(let r=0;r<2;r++){const ph=((e.t*0.9)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],14+ph*40,0,7); ctx.strokeStyle='#5FB4FF'; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=4; ctx.stroke();}} ctx.restore();
 label(ctx,`${name} · ${elev} m`,q[0]+dx,q[1]+dy,{color:sunk?'#9FD8F5':C.sand,alpha:a,font:`800 30px ${FD}`});}
function tower(ctx,a,lev){if(a<=0) return; const x=720, y=600, w=190, h=560, fl=23; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,x-30,y-60,w+60,h+100,24); ctx.fill();
 ctx.fillStyle='#C9D3DC'; ctx.fillRect(x,y,w,h); ctx.fillStyle='#0B1C2A'; for(let i=0;i<fl;i++) for(let j=0;j<4;j++) ctx.fillRect(x+14+j*44,y+8+i*(h/fl),28,h/fl-10);
 const wh=h*(lev/76); ctx.fillStyle='rgba(60,150,230,0.85)'; ctx.fillRect(x-30,y+h-wh,w+60,wh+40); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-30,y+h-wh); ctx.lineTo(x+w+30,y+h-wh); ctx.stroke();
 ctx.font=`800 30px ${FD}`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.fillText('≈ 23 Stockwerke',x+w/2,y-20); ctx.restore();}
function bars(ctx,a,u,t1,t2){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,1080,780,250,24); ctx.fill();
 const rows=[['Antarktis',58,t1,'#F6F1E7'],['Grönland',7.4,t2,C.ice]]; rows.forEach(([n,v,t0,col],i)=>{const k=ease(clamp((u-t0)/1.2)); const y=1140+i*100; ctx.globalAlpha=a*clamp((u-t0+0.2)/0.3);
  ctx.font=`800 32px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(n,L+28,y); ctx.textAlign='right'; ctx.fillStyle=col; ctx.fillText(`≈ ${Math.round(v*k)} m`,L+752,y); ctx.textAlign='left';
  ctx.fillStyle='rgba(246,241,231,0.15)'; rr(ctx,L+28,y+16,724,24,12); ctx.fill(); ctx.fillStyle=col; rr(ctx,L+28,y+16,Math.max(24,724*(v/70)*k),24,12); ctx.fill();}); ctx.restore();}

function polar(ctx,a,u){if(a<=0) return; const R=270, cx=540, cy=760; const pj=d3.geoOrthographic().rotate([-20+u*4,90]).scale(R*2.1).translate([cx,cy]).clipAngle(90), pth=d3.geoPath(pj,ctx);
 ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(cx,cy,R+18,0,7); ctx.fillStyle='rgba(11,28,42,0.92)'; ctx.fill(); ctx.beginPath(); ctx.arc(cx,cy,R,0,7); ctx.clip(); ctx.beginPath(); ctx.arc(cx,cy,R,0,7); const g=ctx.createRadialGradient(cx-60,cy-60,30,cx,cy,R); g.addColorStop(0,'#1d4f7a'); g.addColorStop(1,'#0a2440'); ctx.fillStyle=g; ctx.fill();
 const W0=window.WORLDRAW; if(W0){ctx.beginPath(); W0.features.forEach(f=>{if(f.geometry&&f.id!=='ATA') pth(f);}); ctx.fillStyle='#4f6b4a'; ctx.fill(); const at=W0.features.find(f=>f.id==='ATA'); if(at){ctx.beginPath(); pth(at); ctx.fillStyle='#F4F8FB'; ctx.shadowColor='#bfe3ff'; ctx.shadowBlur=24; ctx.fill(); ctx.shadowBlur=0;}}
 ctx.restore(); ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(cx,cy,R,0,7); ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); label(ctx,'Antarktis',cx-90,cy+R-40,{color:'#0B1C2A',bg:'rgba(246,241,231,0.95)',alpha:a,font:`800 36px ${FD}`});}
const vWorld={lon:20,lat:22,scale:150}, vAtl=viewBox([-30,25,40,66]), vGrl=viewBox([-60,58,-15,82]), vAnt={lon:60,lat:-66,scale:520};
const vDE=viewBox([3,49.5,17,56.5]), vDE2=viewBox([5.5,51,15.5,55]), vNL=viewBox([2,50,16,58.5]), vVen=viewBox([6,42,18,48.5]);
const vSha=viewBox([110,24,130,38]), vBkk=viewBox([92,6,110,20]), vMum=viewBox([64,12,82,26]), vFla=viewBox([-92,22,-74,33]), vBgd=viewBox([84,19,96,28]);
const levS0=(sc,u)=>70*ease(clamp((u-wt(sc,'70 Meter')+0.2)/3.2));

const scenes=[
 {head:'Was, wenn alles Eis schmilzt?', headInstant:true, say:S_say[0], cams:[{at:0,view:viewBox([-15,35,30,62])},{at:sc=>wt(sc,'70 Meter')-0.3,view:vAtl,fly:2.6},{at:sc=>wt(sc,'Weltkarte')-0.4,view:vWorld,fly:2.4}],
  under:[e=>{const {u,sc}=e; flood(e,levS0(sc,u));}],
  over:[e=>{const {u,sc,ctx}=e; const lev=levS0(sc,u); gauge(ctx,lev,clamp((u-wt(sc,'70 Meter')+0.2)/0.4));
   const th=wt(sc,'Hochhaus'), at=clamp((u-th+0.2)/0.4)*(1-clamp((u-wt(sc,'Weltkarte')+0.2)/0.4)); tower(ctx,at,70*ease(clamp((u-th)/1.6)));}]},
 {head:'Wo liegt das Eis?', say:S_say[1], cams:[{at:0,view:vWorld,fly:1.2},{at:sc=>wt(sc,'Antarktis')-0.4,view:viewBox([-60,-45,80,30]),fly:1.8},{at:sc=>wt(sc,'Grönland')-0.4,view:vGrl,fly:1.8}],
  under:[e=>{const {u,sc}=e; flood(e,70*(1-clamp(u/0.8))); hl(e,'GRL',C.ice,0.7*clamp((u-wt(sc,'Grönland'))/0.4));}],
  over:[e=>{const {u,sc,ctx}=e; polar(ctx,clamp((u-wt(sc,'Antarktis')+0.2)/0.5)*(1-clamp((u-wt(sc,'Grönland')+0.3)/0.4)),u); tag(e,[-42,73],'Grönland',clamp((u-wt(sc,'Grönland'))/0.4),-70,0,C.ice,36);
   bars(ctx,clamp((u-wt(sc,'Antarktis'))/0.4),u,wt(sc,'60 Meter')-0.3,wt(sc,'sieben')-0.2);}]},
 {head:'Und Deutschland?', say:S_say[2], cams:[{at:0,view:vDE,fly:1.6},{at:sc=>wt(sc,'Hamburg')-0.4,view:vDE2,fly:2.4},{at:sc=>wt(sc,'sogar Berlin')-0.3,view:viewBox([7,50.5,16.5,55]),fly:2.0}],
  under:[e=>{const {u,sc}=e; const lev=70*clamp((u-wt(sc,'Nordsee')+0.2)/(wt(sc,'sogar Berlin')-wt(sc,'Nordsee')+0.4)); e.lev=lev; flood(e,lev); hl(e,'DEU','#F6F1E7',0.12,{outline:true});}],
  over:[e=>{const {u,sc,ctx}=e; const lev=e.lev||0; gauge(ctx,lev,clamp((u-wt(sc,'Nordsee')+0.2)/0.4));
   city(e,[10.0,53.55],'Hamburg',6,lev,clamp((u-wt(sc,'Hamburg'))/0.3),26,-30); city(e,[8.8,53.08],'Bremen',12,lev,clamp((u-wt(sc,'Bremen'))/0.3),-180,40);
   city(e,[9.73,52.37],'Hannover',55,lev,clamp((u-wt(sc,'Hannover'))/0.3),26,40); city(e,[13.4,52.52],'Berlin',34,lev,clamp((u-wt(sc,'Berlin'))/0.3),-90,-34);}]},
 {head:'Niederlande, Dänemark, Venedig', say:S_say[3], cams:[{at:0,view:vNL,fly:1.6},{at:sc=>wt(sc,'Dänemark')-0.4,view:viewBox([4,53,16,58.5]),fly:1.5},{at:sc=>wt(sc,'Venedig')-0.5,view:vVen,fly:1.8}],
  under:[e=>{const {u,sc}=e; flood(e,70); hl(e,'NLD',C.target,0.5*clamp((u-0.3)/0.4)); hl(e,'DNK',C.target,0.5*clamp((u-wt(sc,'Dänemark'))/0.4));}],
  over:[e=>{const {u,sc,ctx}=e; gauge(ctx,70,1); tag(e,[5.3,52.3],'Niederlande',clamp((u-0.3)/0.4),-120,60,'#fff',32); tag(e,[9.5,56],'Dänemark',clamp((u-wt(sc,'Dänemark'))/0.4),30,0,'#fff',32);
   city(e,[12.33,45.44],'Venedig',1,70,clamp((u-wt(sc,'Venedig'))/0.3),26,-30);}]},
 {head:'Weltweit', say:S_say[4], cams:[{at:0,view:vVen,fly:0.8},{at:sc=>wt(sc,'Shanghai')-0.6,view:vSha,fly:1.2},{at:sc=>wt(sc,'Bangkok')-0.4,view:vBkk,fly:1.0},{at:sc=>wt(sc,'Mumbai')-0.4,view:vMum,fly:1.0},{at:sc=>wt(sc,'Florida')-0.5,view:vFla,fly:1.3},{at:sc=>wt(sc,'Bangladesch')-0.5,view:vBgd,fly:1.4}],
  under:[e=>{flood(e,70);}],
  over:[e=>{const {u,sc,ctx}=e; gauge(ctx,70,1); city(e,[121.47,31.23],'Shanghai',4,70,clamp((u-wt(sc,'Shanghai'))/0.3)); city(e,[100.5,13.75],'Bangkok',2,70,clamp((u-wt(sc,'Bangkok'))/0.3));
   city(e,[72.88,19.07],'Mumbai',14,70,clamp((u-wt(sc,'Mumbai'))/0.3)); tag(e,[-81.5,28],'Florida',clamp((u-wt(sc,'Florida'))/0.4),-60,0,'#fff',34); tag(e,[90.3,23.7],'Bangladesch',clamp((u-wt(sc,'Bangladesch'))/0.4),-100,0,'#fff',34);}]},
 {head:'Keine Sorge', say:S_say[5], cams:[{at:0,view:vBgd,fly:1.0},{at:0.4,view:vWorld,fly:3.0},{at:sc=>wt(sc,'schon heute')-0.4,view:viewBox([-15,35,30,62]),fly:2.6}],
  under:[e=>{const {u,sc}=e; flood(e,70*(1-ease(clamp((u-wt(sc,'Tausende')+0.4)/2.4))));}],
  over:[e=>{const {u,sc,ctx}=e; const ta=wt(sc,'Tausende'), at=clamp((u-ta)/0.4); if(at>0) label(ctx,'würde Tausende Jahre dauern',L+20,1180,{alpha:at*(1-clamp((u-wt(sc,'schon heute'))/0.4)),font:`800 38px ${FD}`});
   const t8=wt(sc,'1880'), a8=clamp((u-t8)/0.4); if(a8>0) label(ctx,'seit 1880: + 21–24 cm',L+20,1250,{color:'#fff',bg:'rgba(33,120,190,0.95)',alpha:a8,font:`800 44px ${FD}`});
   const ah=clamp((u-wt(sc,'schon heute'))/0.4); if(ah>0) label(ctx,'Der Meeresspiegel steigt schon heute',L+20,1180,{alpha:ah,font:`800 36px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:viewBox([-15,35,30,62]),fly:1.2},{at:1.4,view:vWorld,fly:4.5}],
  under:[e=>{const {u}=e; flood(e,70*ease(clamp((u-0.3)/2.5)));}],
  top:[e=>{const {ctx,u,sc}=e; const a=eout(clamp((u-0.2)/0.6)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.92)'; rr(ctx,L,560,780,470,32); ctx.fill();
   const q='Wusstest du das schon?'; const z=fit(ctx,q,800,76,52,700,FD); ctx.font=`800 ${z}px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(q,L+40,670);
   const rows=[['heart','Like da lassen','Like'],['bubble','Kommentar: Wusstest du es?','Kommentare'],['share','Teilen mit jemandem','schick']];
   rows.forEach(([ic,txt,f],i)=>{const ai=clamp((u-wt(sc,f)+0.2)/0.35); if(ai<=0) return; const y=790+i*105, x=L+70; ctx.save(); ctx.globalAlpha=a*ai; ctx.translate(x,y-14); const s=1+0.25*Math.max(0,1-(u-wt(sc,f))/0.4);
    ctx.scale(s,s); ctx.fillStyle=C.target; ctx.strokeStyle=C.target; ctx.lineWidth=5; ctx.lineJoin='round'; ctx.lineCap='round';
    if(ic==='heart'){ctx.beginPath(); ctx.moveTo(0,16); ctx.bezierCurveTo(-30,-4,-18,-28,0,-12); ctx.bezierCurveTo(18,-28,30,-4,0,16); ctx.fill();}
    if(ic==='bubble'){rr(ctx,-24,-20,48,34,10); ctx.fill(); ctx.beginPath(); ctx.moveTo(-10,12); ctx.lineTo(-16,26); ctx.lineTo(4,13); ctx.fill();}
    if(ic==='share'){ctx.beginPath(); ctx.moveTo(-20,18); ctx.quadraticCurveTo(-18,-8,14,-8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10,-22); ctx.lineTo(26,-8); ctx.lineTo(10,6); ctx.closePath(); ctx.fill();}
    ctx.restore(); ctx.save(); ctx.globalAlpha=a*ai; ctx.font=`800 42px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(txt,x+60,y,620); ctx.restore();});
   ctx.restore();}]}
];
return {tag:'WAS WÄRE, WENN …? #1', scenes, wt};
}
