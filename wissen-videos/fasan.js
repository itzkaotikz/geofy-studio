// Story: Grenz-Kuriositäten #2 – Die Fasaneninsel
// Bidasoa zwischen Irun (ES) und Hendaye (FR) · ≈ 200 × 40 m · ES 1.2.–31.7., FR 1.8.–31.1. · 1659 Pyrenäenfrieden · 1660 Maria Theresia → Ludwig XIV.
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
const ES='#FFC23D', FR='#4F8DFF';
const ISL=[-1.7653,43.3425], MAD=[-3.70,40.42], PAR=[2.35,48.86];
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*55,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
const flip=t=>(Math.floor(t/0.9)%2===0)?ES:FR; // island colour alternates
function route(e,pts,k,col,w=7){if(k<=0) return; const {ctx,t}=e; const Q=pts.map(p=>P(e,p)); let tot=0; const seg=[]; for(let i=1;i<Q.length;i++){const d=Math.hypot(Q[i][0]-Q[i-1][0],Q[i][1]-Q[i-1][1]); seg.push(d); tot+=d;}
 let rem=tot*clamp(k); ctx.save(); ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.setLineDash([18,12]); ctx.lineDashOffset=-t*50; ctx.beginPath(); ctx.moveTo(Q[0][0],Q[0][1]); let end=Q[0];
 for(let i=1;i<Q.length&&rem>0;i++){const f=Math.min(1,rem/seg[i-1]); end=[lerp(Q[i-1][0],Q[i][0],f),lerp(Q[i-1][1],Q[i][1],f)]; ctx.lineTo(end[0],end[1]); rem-=seg[i-1];} ctx.stroke(); ctx.setLineDash([]);
 ctx.beginPath(); ctx.arc(end[0],end[1],12,0,7); ctx.fillStyle=col; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function big(ctx,txt,x,y,a,col='#fff',size=120){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,x,y); ctx.fillStyle=col; ctx.fillText(txt,x,y); ctx.restore();}

// schematic close-up of the river mouth (satellite texture is far too coarse for 200 m)
function inset(e,a,o={}){if(a<=0) return; const {ctx,t}=e; const X=L-20, Y=560, W2=820, H2=600; const s=0.94+0.06*eout(a);
 ctx.save(); ctx.globalAlpha=a; ctx.translate(X+W2/2,Y+H2/2); ctx.scale(s,s); ctx.translate(-W2/2,-H2/2);
 ctx.save(); rr(ctx,0,0,W2,H2,30); ctx.clip();
 ctx.fillStyle='#2E5E3A'; ctx.fillRect(0,0,W2,H2); // land
 // banks texture
 for(let i=0;i<60;i++){const x=(i*137)%W2, y=(i*271)%H2; ctx.fillStyle='rgba(255,255,255,0.04)'; ctx.fillRect(x,y,30,18);}
 // river band (flows bottom → top), slight curve
 const rv=(y)=>W2*0.5+Math.sin(y/H2*Math.PI*1.2)*60; const half=y=>120+40*Math.sin(y/170);
 ctx.beginPath(); for(let y=0;y<=H2;y+=10) ctx.lineTo(rv(y)-half(y),y); for(let y=H2;y>=0;y-=10) ctx.lineTo(rv(y)+half(y),y); ctx.closePath();
 const g=ctx.createLinearGradient(0,0,W2,0); g.addColorStop(0,'#1B4E73'); g.addColorStop(0.5,'#2C6E9A'); g.addColorStop(1,'#1B4E73'); ctx.fillStyle=g; ctx.fill();
 // ripples
 ctx.strokeStyle='rgba(255,255,255,0.18)'; ctx.lineWidth=3; for(let i=0;i<9;i++){const y=((i*70+t*30)%H2); ctx.beginPath(); ctx.moveTo(rv(y)-50,y); ctx.lineTo(rv(y)-10,y-6); ctx.stroke();}
 // border line in the river (dashed)
 ctx.setLineDash([14,12]); ctx.strokeStyle='rgba(255,255,255,0.55)'; ctx.lineWidth=3; ctx.beginPath(); for(let y=0;y<=H2;y+=10) ctx.lineTo(rv(y),y); ctx.stroke(); ctx.setLineDash([]);
 // island
 const ix=rv(H2*0.55), iy=H2*0.55, col=o.islandCol||'#7FCB8F'; ctx.save(); ctx.translate(ix,iy); ctx.rotate(-1.35);
 ctx.beginPath(); ctx.ellipse(0,0,150,34,0,0,7); ctx.fillStyle=col; ctx.shadowColor=col; ctx.shadowBlur=o.glow?30:0; ctx.fill(); ctx.shadowBlur=0; ctx.strokeStyle='#fff'; ctx.lineWidth=4; ctx.stroke();
 for(let i=-4;i<=4;i++){ctx.beginPath(); ctx.arc(i*28,((i*37)%2)*6,10,0,7); ctx.fillStyle='rgba(20,60,30,0.55)'; ctx.fill();}
 if(o.dims>0){ctx.globalAlpha=a*o.dims; ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-150,58); ctx.lineTo(150,58); ctx.stroke(); [[-150],[150]].forEach(([x])=>{ctx.beginPath(); ctx.moveTo(x,48); ctx.lineTo(x,68); ctx.stroke();});
  ctx.beginPath(); ctx.moveTo(176,-34); ctx.lineTo(176,34); ctx.stroke();} ctx.restore();
 if(o.dims>0){ctx.globalAlpha=a*o.dims; label(ctx,'≈ 200 m',ix+70,iy+30,{font:`800 30px ${FD}`}); label(ctx,'≈ 40 m',ix+60,iy-150,{font:`800 30px ${FD}`}); ctx.globalAlpha=a;}
 if(o.forbid>0){ctx.save(); ctx.globalAlpha=a*o.forbid; ctx.translate(ix,iy-10); ctx.beginPath(); ctx.arc(0,0,46,0,7); ctx.fillStyle='rgba(255,255,255,0.95)'; ctx.fill(); ctx.lineWidth=10; ctx.strokeStyle='#E53935'; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-30,-30); ctx.lineTo(30,30); ctx.stroke(); ctx.restore();}
 // bank labels
 const ai=o.towns??1; ctx.globalAlpha=a*ai*(o.irun??1); label(ctx,'Irun · Spanien',40,H2-70,{color:ES,font:`800 34px ${FD}`});
 ctx.globalAlpha=a*ai*(o.hend??1); label(ctx,'Hendaye · Frankreich',W2-410,80,{color:FR,font:`800 34px ${FD}`}); ctx.globalAlpha=a;
 label(ctx,'Bidasoa',rv(H2*0.3)-220,H2*0.3,{color:C.ice,font:`700 26px ${FB}`});
 ctx.restore(); rr(ctx,0,0,W2,H2,30); ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
// 12-month ring
function ring(e,a,u0,uF,u){if(a<=0) return; const {ctx}=e; const cx=540, cy=830, R=230, M=['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
 ctx.save(); ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(cx,cy,R+70,0,7); ctx.fillStyle='rgba(11,28,42,0.88)'; ctx.fill();
 const dES=Math.max(1.5,uF-u0), prog=u<uF?clamp((u-u0)/dES)*0.5:0.5+clamp((u-uF)/dES)*0.49; // Feb→Jul over the ES sentence, Aug→Jan over the FR sentence
 M.forEach((m,i)=>{const a0=-Math.PI/2+i*Math.PI/6, a1=a0+Math.PI/6, es=i>=1&&i<=6; const k=clamp((u-(es?u0:uF)-(es?i-1:(i+5)%12)*0.06)/0.3);
  ctx.globalAlpha=a*(0.25+0.75*k); ctx.beginPath(); ctx.arc(cx,cy,R+40,a0+0.02,a1-0.02); ctx.arc(cx,cy,R-10,a1-0.02,a0+0.02,true); ctx.closePath(); ctx.fillStyle=es?ES:FR; ctx.fill();
  const am=(a0+a1)/2; ctx.globalAlpha=a; ctx.font=`800 24px ${FD}`; ctx.fillStyle='#0B1C2A'; ctx.textAlign='center'; ctx.fillText(m,cx+Math.cos(am)*(R+15),cy+Math.sin(am)*(R+15)+8);});
 const ang=-Math.PI/2+(1+prog*12)*Math.PI/6+Math.PI/12; ctx.globalAlpha=a; ctx.strokeStyle='#fff'; ctx.lineWidth=6; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(ang)*(R-30),cy+Math.sin(ang)*(R-30)); ctx.stroke();
 const mi=Math.floor(1+prog*12)%12, es=mi>=1&&mi<=6; ctx.beginPath(); ctx.arc(cx,cy,14,0,7); ctx.fillStyle='#fff'; ctx.fill();
 ctx.font=`800 48px ${FD}`; ctx.textAlign='center'; ctx.fillStyle=es?ES:FR; ctx.fillText(es?'Spanien':'Frankreich',cx,cy+110); ctx.restore();}

const vEur=viewBox([-12,36,16,56]), vIber=viewBox([-10,35,9,50]), vPyr=viewBox([-5,41.5,4,45.5]), vMouth=viewBox([-3.6,42.3,0.2,44.3]), vMP=viewBox([-9,39,6,50.5]);

const scenes=[
 {head:'Die Insel, die das Land wechselt', headInstant:true, say:S_say[0], cams:[{at:0,view:vEur},{at:0.3,view:vPyr,fly:2.6},{at:sc=>wt(sc,'Jedes Jahr')-0.3,view:vMouth,fly:2.4}],
  under:[e=>{const {u,sc}=e; const a=clamp((u-wt(sc,'Spanien')+0.2)/0.4), b=clamp((u-wt(sc,'Frankreich')+0.2)/0.4); hl(e,'ESP',ES,0.45*a); hl(e,'FRA',FR,0.45*b);}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,ISL,t,clamp((u-0.3)/0.4),flip(u),13); const ah=clamp((u-wt(sc,'halbes Jahr'))/0.4);
   if(ah>0) label(ctx,'½ Jahr Spanien · ½ Jahr Frankreich',L+20,1180,{alpha:ah,font:`800 36px ${FD}`});
   const a3=clamp((u-wt(sc,'350'))/0.4); if(a3>0) label(ctx,'seit über 350 Jahren',L+20,1255,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:a3,font:`800 40px ${FD}`});}]},
 {head:'Die Fasaneninsel', say:S_say[1], cams:[{at:0,view:vMouth,fly:1.2},{at:0.8,view:viewBox([-2.6,42.8,-0.9,43.9]),fly:3.5},{at:sc=>wt(sc,'200 Meter')-0.4,view:vMouth,fly:3.0}],
  under:[e=>{hl(e,'ESP',ES,0.35); hl(e,'FRA',FR,0.35);}],
  over:[e=>{const {u,sc,t}=e; pulse(e,ISL,t,1-clamp((u-0.6)/0.5),flip(u),13);
   const a=clamp((u-0.6)/0.6); inset(e,a,{islandCol:'#7FCB8F',towns:clamp((u-wt(sc,'Irun'))/0.4),irun:1,hend:clamp((u-wt(sc,'Hendaye'))/0.4),dims:clamp((u-wt(sc,'200 Meter'))/0.4),glow:false});}]},
 {head:'Wer ist gerade dran?', say:S_say[2], cams:[{at:0,view:vMouth,fly:1.2},{at:1.5,view:vPyr,fly:4},{at:sc=>wt(sc,'Kondominium')-0.4,view:vIber,fly:3}],
  under:[e=>{const {u,sc}=e; const es=u<wt(sc,'August')-0.1; hl(e,'ESP',ES,es?0.6:0.2); hl(e,'FRA',FR,es?0.2:0.6);}],
  over:[e=>{const {u,sc,ctx}=e; const ar=clamp((u-0.2)/0.5)*(1-clamp((u-wt(sc,'Kondominium')-1.4)/0.5)); ring(e,ar,wt(sc,'Februar')-0.1,wt(sc,'August')-0.1,u);
   const ak=clamp((u-wt(sc,'Kondominium'))/0.4); if(ak>0){big(ctx,'Kondominium',540,860,ak*clamp((u-wt(sc,'Kondominium')-1.2)/0.5),'#fff',96); label(ctx,'kleinstes Kondominium der Welt',L+20,1180,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ak,font:`800 38px ${FD}`});}
   const at=clamp((u-wt(sc,'zwei Länder'))/0.4); if(at>0) label(ctx,'= ein Gebiet, zwei Länder',L+20,1255,{alpha:at,font:`800 36px ${FD}`});}]},
 {head:'1659: Frieden im Fluss', say:S_say[3], cams:[{at:0,view:vIber,fly:1.4},{at:sc=>wt(sc,'1659')-0.3,view:vMP,fly:1.8},{at:sc=>wt(sc,'Weil sie')-0.4,view:vPyr,fly:2.0},{at:sc=>wt(sc,'Pyrenäenfrieden')-0.6,view:vIber,fly:2.0}],
  under:[e=>{hl(e,'ESP',ES,0.55); hl(e,'FRA',FR,0.55);}],
  over:[e=>{const {u,sc,ctx,t}=e; const ay=clamp((u-wt(sc,'1659'))/0.4); big(ctx,'1659',540,620,ay*(1-clamp((u-wt(sc,'Weil sie'))/0.5)),'#fff',130);
   const k=(u-wt(sc,'verhandelten'))/2.2; route(e,[MAD,[-2.4,42.6],ISL],k,ES,7); route(e,[PAR,[0.5,46],ISL],k,FR,7); pulse(e,ISL,t,clamp(k*2),'#fff',12);
   const tm=clamp((u-wt(sc,'verhandelten'))/0.4); KV.label(ctx,'Spanien',0,0,{alpha:0}); tag(e,MAD,'Madrid',tm,-70,50,ES,30); tag(e,PAR,'Paris',tm,-40,-30,FR,30);
   const aw=clamp((u-wt(sc,'keine Seite'))/0.4); if(aw>0) label(ctx,'neutraler Boden – mitten im Fluss',L+20,1180,{alpha:aw*(1-clamp((u-wt(sc,'Pyrenäenfrieden')+0.2)/0.4)),font:`800 36px ${FD}`});
   const ap=clamp((u-wt(sc,'Pyrenäenfrieden'))/0.4); if(ap>0) label(ctx,'Pyrenäenfrieden · 1659',L+20,1255,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ap,font:`800 42px ${FD}`});}]},
 {head:'1660: Eine königliche Hochzeit', say:S_say[4], cams:[{at:0,view:vMP,fly:1.4},{at:sc=>wt(sc,'Frankreich')-0.4,view:viewBox([-6,41,6,50.5]),fly:2.2}],
  under:[e=>{hl(e,'ESP',ES,0.5); hl(e,'FRA',FR,0.5);}],
  over:[e=>{const {u,sc,ctx,t}=e; big(ctx,'1660',540,620,clamp((u-0.1)/0.4)*(1-clamp((u-wt(sc,'Danach'))/0.5)),'#fff',130);
   const k1=(u-wt(sc,'Prinzessin'))/1.8, k2=(u-wt(sc,'Frankreich'))/1.8; route(e,[MAD,[-2.4,42.6],ISL],k1,ES,7); route(e,[ISL,[0.5,46],PAR],k2,C.target,7);
   tag(e,MAD,'Maria Theresia',clamp((u-wt(sc,'Maria'))/0.4),-120,60,ES,30); pulse(e,ISL,t,clamp(k1),'#fff',12); tag(e,ISL,'Abschied vom Vater',clamp((u-wt(sc,'Vater'))/0.4),30,30,'#fff',28);
   tag(e,PAR,'Ludwig XIV.',clamp((u-wt(sc,'Ludwig'))/0.4),-90,-36,FR,32); const ah=clamp((u-wt(sc,'heiraten'))/0.4); if(ah>0) label(ctx,'Hochzeit 1660',L+20,1255,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ah,font:`800 42px ${FD}`});}]},
 {head:'Und heute?', say:S_say[5], cams:[{at:0,view:vIber,fly:1.4},{at:0.6,view:vMouth,fly:3.0},{at:sc=>wt(sc,'Gepflegt')-0.3,view:vPyr,fly:3.0}],
  under:[e=>{hl(e,'ESP',ES,0.3); hl(e,'FRA',FR,0.3);}],
  over:[e=>{const {u,sc,ctx}=e; const tg=wt(sc,'abwechselnd'), sw=u>tg?(Math.floor((u-tg)/0.8)%2):-1;
   inset(e,clamp((u-0.4)/0.5),{islandCol:sw===-1?'#7FCB8F':(sw===0?ES:FR),glow:sw>=0,forbid:clamp((u-wt(sc,'betreten'))/0.4),irun:sw===1?0.35:1,hend:sw===0?0.35:1});
   const au=clamp((u-wt(sc,'unbewohnt'))/0.4); if(au>0) label(ctx,'unbewohnt · Betreten meist verboten',L+20,1255,{alpha:au,font:`800 36px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:vPyr,fly:1.2},{at:1.4,view:vEur,fly:4.5}],
  under:[e=>{hl(e,'ESP',ES,0.45); hl(e,'FRA',FR,0.45);}],
  over:[e=>{const {u,t}=e; pulse(e,ISL,t,1,flip(u),12);}],
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
return {tag:'GRENZ-KURIOSITÄTEN #2', scenes, wt};
}
