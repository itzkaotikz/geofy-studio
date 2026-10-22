// Story: Grenz-Kuriositäten #3 – Baarle
// 22 belgische Exklaven in NL, darin 7 (+1) niederländische Gegen-Enklaven · Vertrag von Maastricht 1843 · Haustür-Regel · Restaurants · letzte Parzelle 1995
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const BE='#F5C542', NL='#FF7A2F', BEd='#C99A1E';
const BAARLE=[4.93,51.44];
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*55,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 140px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle='#fff'; ctx.fillText(txt,540,y); ctx.restore();}
// deterministic pseudo-random
const rnd=(i,k=0)=>{const x=Math.sin(i*127.1+k*311.7)*43758.5453; return x-Math.floor(x);};
// panel frame for schematic drawings
function panel(ctx,a,draw){if(a<=0) return; const X=100,Y=window.PANEL_Y||500,Wd=780,Hd=640; const s=0.95+0.05*eout(a); ctx.save(); ctx.globalAlpha=a; ctx.translate(X+Wd/2,Y+Hd/2); ctx.scale(s,s); ctx.translate(-Wd/2,-Hd/2);
 ctx.save(); rr(ctx,0,0,Wd,Hd,30); ctx.clip(); draw(ctx,Wd,Hd); ctx.restore(); rr(ctx,0,0,Wd,Hd,30); ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function tagIn(ctx,txt,x,y,col,bg='rgba(11,28,42,0.9)',size=30){ctx.save(); ctx.font=`800 ${size}px ${FD}`; const w=ctx.measureText(txt).width; ctx.fillStyle=bg; rr(ctx,x,y-size,w+24,size+16,12); ctx.fill(); ctx.fillStyle=col; ctx.fillText(txt,x+12,y); ctx.restore();}
function borderLine(ctx,x0,y0,x1,y1,t){ctx.save(); ctx.setLineDash([18,12]); ctx.lineDashOffset=-t*30; ctx.strokeStyle='#fff'; ctx.lineWidth=6; ctx.shadowColor='#fff'; ctx.shadowBlur=10; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke(); ctx.restore();}
// house cut in half by the border
function house(ctx,cx,cy,s,t,{bed=1,table=1,door=false,nums=0}={}){ctx.save(); ctx.translate(cx,cy); ctx.scale(s,s);
 ctx.fillStyle=BE; ctx.fillRect(-200,-120,200,240); ctx.fillStyle=NL; ctx.fillRect(0,-120,200,240);
 ctx.fillStyle='#7A3B2E'; ctx.beginPath(); ctx.moveTo(-230,-120); ctx.lineTo(0,-260); ctx.lineTo(230,-120); ctx.closePath(); ctx.fill();
 ctx.fillStyle='rgba(11,28,42,0.25)'; ctx.fillRect(-200,-120,400,240);
 if(bed>0){ctx.globalAlpha=bed; ctx.fillStyle='#fff'; rr(ctx,-170,30,120,50,10); ctx.fill(); ctx.fillStyle='#9FD8F5'; rr(ctx,-170,20,40,30,8); ctx.fill(); ctx.fillStyle='#5A3A2A'; ctx.fillRect(-176,80,8,24); ctx.fillRect(-56,80,8,24); ctx.globalAlpha=1;
  ctx.font=`800 40px ${FD}`; ctx.fillStyle='#0B1C2A'; ctx.fillText('z',-90,-10); ctx.font=`800 30px ${FD}`; ctx.fillText('z',-62,-40);}
 if(table>0){ctx.globalAlpha=table; ctx.fillStyle='#5A3A2A'; ctx.fillRect(50,40,120,12); ctx.fillRect(60,52,8,50); ctx.fillRect(152,52,8,50); ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(85,32,12,0,7); ctx.fill(); ctx.fillStyle='#F2B66D'; ctx.beginPath(); ctx.arc(135,30,10,0,7); ctx.fill(); ctx.globalAlpha=1;}
 if(door){ctx.fillStyle='#3B2A20'; ctx.fillRect(-40,20,80,100); ctx.fillStyle='#F2B66D'; ctx.beginPath(); ctx.arc(26,72,5,0,7); ctx.fill();}
 if(nums>0){ctx.globalAlpha=nums; tagIn(ctx,'Nr. 2',-150,-40,'#0B1C2A',BE,30); tagIn(ctx,'Nr. 19',40,-40,'#0B1C2A',NL,30); ctx.globalAlpha=1;}
 ctx.restore(); }
// town plan: Dutch ground, Belgian patches, Dutch counter-patches
const CELLS=[]; for(let r=0;r<4;r++) for(let c=0;c<6;c++) CELLS.push([c,r]); const ORDER=[8,0,3,5,13,18,21,1,10,15,22,6,11,19,2,16,23,4,9,14,20,12];
const PATCH=ORDER.map((ci,i)=>{const [c,r]=CELLS[ci]; const big=i===0; return {x:80+c*125+(rnd(i,1)-0.5)*40, y:90+r*140+(rnd(i,2)-0.5)*30, r:big?70:20+rnd(i,3)*24, sh:rnd(i,4)};});
const COUNTER=[[0,-25,-18],[0,30,22],[0,-5,40],[0,40,-30],[0,-45,25],[0,10,-45],[7,0,0]];
function blob(ctx,x,y,r,sh){ctx.beginPath(); for(let k=0;k<=24;k++){const a=k/24*Math.PI*2; const rr2=r*(0.8+0.25*Math.sin(a*3+sh*6)+0.1*Math.cos(a*5+sh*3)); const px=x+Math.cos(a)*rr2, py=y+Math.sin(a)*rr2*0.85; k?ctx.lineTo(px,py):ctx.moveTo(px,py);} ctx.closePath();}
function town(ctx,W2,H2,u,tB,tN,{flick=-1,last=-1}={}){ctx.fillStyle=NL; ctx.fillRect(0,0,W2,H2); ctx.fillStyle='rgba(11,28,42,0.18)'; ctx.fillRect(0,0,W2,H2);
 ctx.strokeStyle='rgba(255,255,255,0.35)'; ctx.lineWidth=8; [[0,200,W2,240],[0,420,W2,380],[260,0,300,H2],[520,0,470,H2]].forEach(([a,b,c,d])=>{ctx.beginPath(); ctx.moveTo(a,b); ctx.lineTo(c,d); ctx.stroke();});
 let n=0; PATCH.forEach((p,i)=>{const k=clamp((u-tB-i*0.12)/0.3); if(k<=0) return; n++; let col=BE;
  if(flick>=0){col=rnd(i,Math.floor(u*3))>0.5?BE:NL; if(u>flick) col=BE;}
  if(i===last) col=u>tN?BE:'#8CA3B6';
  ctx.save(); ctx.globalAlpha=k; blob(ctx,p.x,p.y,p.r*eout(k),p.sh); ctx.fillStyle=col; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();});
 if(tN!=null&&last<0) COUNTER.forEach(([pi,dx,dy],j)=>{const k=clamp((u-tN-j*0.15)/0.3); if(k<=0) return; const p=PATCH[pi]; ctx.save(); ctx.globalAlpha=k; blob(ctx,p.x+dx,p.y+dy,(pi===0?14:9)*eout(k),j/7); ctx.fillStyle=NL; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();});
 return n;}
function street(ctx,W2,H2,u,t,tc,td){ctx.fillStyle='#4A5560'; ctx.fillRect(0,0,W2,H2); ctx.fillStyle='#3A444D'; ctx.fillRect(0,H2*0.55,W2,H2*0.45);
 ctx.fillStyle='#8B949C'; ctx.fillRect(0,H2*0.5,W2,18);
 // crosses along a border line
 const bx=x=>390+Math.sin(x/80)*20; const k=clamp((u-tc)/0.6);
 for(let i=0;i<9;i++){const y=H2*0.56+i*32; const x=bx(y); ctx.save(); ctx.globalAlpha=clamp(k*9-i); ctx.strokeStyle='#fff'; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(x-14,y-10); ctx.lineTo(x+14,y+10); ctx.moveTo(x+14,y-10); ctx.lineTo(x-14,y+10); ctx.stroke(); ctx.restore();}
 if(k>0){ctx.save(); ctx.globalAlpha=k; ctx.font=`800 46px ${FD}`; ctx.fillStyle=BE; ctx.fillText('B',bx(0)-90,H2*0.86); ctx.fillStyle=NL; ctx.fillText('NL',bx(0)+40,H2*0.86); ctx.restore();}
 const hd=clamp((u-td)/0.5); if(hd>0){ctx.save(); ctx.globalAlpha=hd; house(ctx,390,H2*0.3,0.62,t,{bed:0,table:0,door:true,nums:clamp((u-td-1.2)/0.4)}); ctx.restore(); borderLine(ctx,390,0,390,H2*0.5,t);}}
function restaurant(ctx,W2,H2,u,t,tm){ctx.fillStyle=BE; ctx.fillRect(0,0,W2/2,H2); ctx.fillStyle=NL; ctx.fillRect(W2/2,0,W2/2,H2); ctx.fillStyle='rgba(11,28,42,0.3)'; ctx.fillRect(0,0,W2,H2);
 borderLine(ctx,W2/2,0,W2/2,H2,t); tagIn(ctx,'Belgien',30,60,'#0B1C2A',BE,30); tagIn(ctx,'Niederlande',W2-230,60,'#0B1C2A',NL,30);
 // clocks: NL closes earlier
 const clock=(x,y,h,col)=>{ctx.save(); ctx.translate(x,y); ctx.beginPath(); ctx.arc(0,0,46,0,7); ctx.fillStyle='#fff'; ctx.fill(); ctx.strokeStyle=col; ctx.lineWidth=6; ctx.stroke(); ctx.strokeStyle='#0B1C2A'; ctx.lineWidth=5; ctx.lineCap='round';
  const a=h/12*Math.PI*2-Math.PI/2; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*24,Math.sin(a)*24); ctx.moveTo(0,0); ctx.lineTo(0,-34); ctx.stroke(); ctx.restore();};
 clock(130,160,1,BEd); clock(W2-130,160,11,NL);
 const k=ease(clamp((u-tm)/1.4)); const tx=lerp(W2*0.72,W2*0.28,k);
 ctx.fillStyle='#5A3A2A'; ctx.fillRect(tx-80,400,160,14); ctx.fillRect(tx-70,414,10,70); ctx.fillRect(tx+60,414,10,70);
 [[-110,0],[110,0]].forEach(([dx])=>{ctx.fillStyle='#0B1C2A'; ctx.beginPath(); ctx.arc(tx+dx,350,26,0,7); ctx.fill(); ctx.fillRect(tx+dx-30,376,60,80);});
 ctx.fillStyle='#F2B66D'; ctx.beginPath(); ctx.arc(tx-30,392,10,0,7); ctx.fill(); ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(tx+30,392,10,0,7); ctx.fill();}

const vEur=viewBox([-6,44,22,58]), vBen=viewBox([1.5,49.3,8.5,53.7]), vB=viewBox([3.6,50.6,6.3,52.3]);

const scenes=[
 {head:'Ein Haus, zwei Länder', headInstant:true, say:S_say[0], cams:[{at:0,view:vEur},{at:0.3,view:vBen,fly:2.6},{at:sc=>wt(sc,'Willkommen')-0.3,view:vB,fly:1.6}],
  under:[e=>{const {u,sc}=e; hl(e,'BEL',BE,0.6*clamp((u-wt(sc,'Belgien'))/0.4)); hl(e,'NLD',NL,0.6*clamp((u-wt(sc,'Niederlanden'))/0.4));}],
  over:[e=>{const {u,sc,t}=e; pulse(e,BAARLE,t,clamp((u-wt(sc,'Willkommen'))/0.4),'#fff',12);}],
  top:[e=>{const {u,sc,ctx,t}=e; const a=clamp((u-wt(sc,'schlafen')+0.2)/0.4)*(1-clamp((u-wt(sc,'Willkommen')+0.1)/0.4));
   panel(ctx,a,(c,W2,H2)=>{c.fillStyle='#1d3a52'; c.fillRect(0,0,W2,H2); house(c,W2/2,H2*0.62,1.25,t,{bed:clamp((u-wt(sc,'schlafen'))/0.4),table:clamp((u-wt(sc,'frühstücken'))/0.4)}); borderLine(c,W2/2,0,W2/2,H2,t);
    c.globalAlpha=clamp((u-wt(sc,'Belgien'))/0.4); tagIn(c,'Belgien',40,70,'#0B1C2A',BE,34); c.globalAlpha=clamp((u-wt(sc,'Niederlanden'))/0.4); tagIn(c,'Niederlande',W2-270,70,'#0B1C2A',NL,34); c.globalAlpha=1;});
   const aw=clamp((u-wt(sc,'Willkommen'))/0.4); if(aw>0) label(ctx,'Baarle',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:aw,font:`800 44px ${FD}`});}]},
 {head:'Ein Ort, zwei Länder', say:S_say[1], cams:[{at:0,view:vB,fly:1.0},{at:0.4,view:vBen,fly:2.2},{at:sc=>wt(sc,'mitten im Ort')-0.4,view:vB,fly:1.6}],
  under:[e=>{hl(e,'BEL',BE,0.5); hl(e,'NLD',NL,0.5);}],
  over:[e=>{const {u,t}=e; pulse(e,BAARLE,t,1,'#fff',12);}],
  top:[e=>{const {u,sc,ctx}=e; const tB=wt(sc,'22'), tN=wt(sc,'wiederum'); const a=clamp((u-tB+0.6)/0.5); let n=0;
   panel(ctx,a,(c,W2,H2)=>{n=town(c,W2,H2,u,tB,tN); tagIn(c,'Niederlande',W2-270,H2-30,'#0B1C2A',NL,30);});
   if(a>0&&n>0) label(ctx,`${n} Stücke Belgien`,L+20,1210,{color:'#0B1C2A',bg:'rgba(245,197,66,0.95)',alpha:a,font:`800 42px ${FD}`});
   const an=clamp((u-tN)/0.4); if(an>0) label(ctx,'+ niederländische Inseln darin',L+20,1280,{color:'#0B1C2A',bg:'rgba(255,122,47,0.95)',alpha:an,font:`800 36px ${FD}`});}]},
 {head:'Wie kam es dazu?', say:S_say[2], cams:[{at:0,view:vB,fly:1.0},{at:sc=>wt(sc,'getrennte')-0.4,view:vBen,fly:2.2},{at:sc=>wt(sc,'1843')-0.4,view:vB,fly:2.0}],
  under:[e=>{const {u,sc}=e; const k=clamp((u-wt(sc,'getrennte'))/0.5); hl(e,'BEL',BE,0.5*k); hl(e,'NLD',NL,0.5*k);}],
  top:[e=>{const {u,sc,ctx}=e; const tm=wt(sc,'Mittelalter'), tg=wt(sc,'getrennte'), ty=wt(sc,'1843'); const a=clamp((u-tm+0.3)/0.5)*(1-clamp((u-tg+0.2)/0.5))+clamp((u-wt(sc,'Flickwerk'))/0.5)*(1-clamp((u-ty+0.1)/0.4));
   panel(ctx,a,(c,W2,H2)=>{town(c,W2,H2,u,tm-3,null,{flick:wt(sc,'Flickwerk')});});
   const am=clamp((u-tm)/0.4)*(1-clamp((u-tg)/0.4)); if(am>0) label(ctx,'getauscht · verkauft · vererbt',L+20,1250,{alpha:am,font:`800 38px ${FD}`});
   big(ctx,'1843',clamp((u-ty)/0.4)); const at=clamp((u-ty)/0.4); if(at>0) label(ctx,'Grenze festgeschrieben',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:at,font:`800 40px ${FD}`});}]},
 {head:'Weiße Kreuze und Haustüren', say:S_say[3], cams:[{at:0,view:vB,fly:1.0},{at:2,view:viewBox([4.2,51.0,5.7,51.9]),fly:4}],
  under:[e=>{hl(e,'BEL',BE,0.4); hl(e,'NLD',NL,0.4);}],
  top:[e=>{const {u,sc,ctx,t}=e; const tc=wt(sc,'weiße Kreuze'), td=wt(sc,'mitten durch Häuser'); panel(ctx,clamp((u-0.2)/0.5),(c,W2,H2)=>street(c,W2,H2,u,t,tc,td));
   const ah=clamp((u-wt(sc,'Haustür'))/0.4); if(ah>0) label(ctx,'Die Haustür entscheidet',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ah,font:`800 42px ${FD}`});
   const an=clamp((u-wt(sc,'gehört'))/0.4); if(an>0) label(ctx,'Tür auf der Grenze: 2 Hausnummern',L+20,1180,{alpha:an,font:`800 34px ${FD}`});}]},
 {head:'Kuriose Situationen', say:S_say[4], cams:[{at:0,view:viewBox([4.2,51.0,5.7,51.9]),fly:1.0},{at:1,view:vB,fly:6}],
  under:[e=>{hl(e,'BEL',BE,0.4); hl(e,'NLD',NL,0.4);}],
  top:[e=>{const {u,sc,ctx,t}=e; panel(ctx,clamp((u-0.2)/0.5),(c,W2,H2)=>restaurant(c,W2,H2,u,t,wt(sc,'wechselten')));
   const ar=clamp((u-wt(sc,'Restaurants'))/0.4); if(ar>0) label(ctx,'Niederlande: früher Sperrstunde',L+20,1250,{color:'#0B1C2A',bg:'rgba(255,122,47,0.95)',alpha:ar*(1-clamp((u-wt(sc,'wechselten'))/0.4)),font:`800 36px ${FD}`});
   const aw=clamp((u-wt(sc,'wechselten'))/0.4); if(aw>0) label(ctx,'Einfach Tisch wechseln',L+20,1250,{color:'#0B1C2A',bg:'rgba(245,197,66,0.95)',alpha:aw,font:`800 40px ${FD}`});}]},
 {head:'Das letzte Grundstück', say:S_say[5], cams:[{at:0,view:vB,fly:1.0},{at:2,view:vBen,fly:4}],
  under:[e=>{hl(e,'BEL',BE,0.4); hl(e,'NLD',NL,0.4);}],
  top:[e=>{const {u,sc,ctx}=e; const ty=wt(sc,'1995'); panel(ctx,clamp((u-0.2)/0.5),(c,W2,H2)=>{town(c,W2,H2,u,-5,ty,{last:13}); const p=PATCH[13]; c.save(); c.globalAlpha=0.7+0.3*Math.sin(u*6); c.strokeStyle='#fff'; c.lineWidth=5; c.beginPath(); c.arc(p.x,p.y,p.r+22,0,7); c.stroke(); c.restore();});
   big(ctx,'1995',clamp((u-ty)/0.4)*(1-clamp((u-ty-1.6)/0.4)),1000);
   const a=clamp((u-wt(sc,'zugeordnet'))/0.4); if(a>0) label(ctx,'erst 1995 endgültig geklärt',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:a,font:`800 40px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:vBen,fly:1.2},{at:1.4,view:vEur,fly:4.5}],
  under:[e=>{hl(e,'BEL',BE,0.5); hl(e,'NLD',NL,0.5);}],
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
return {tag:'GRENZ-KURIOSITÄTEN #3', scenes, wt};
}
