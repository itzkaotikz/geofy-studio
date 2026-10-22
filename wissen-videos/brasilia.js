// Story: Hauptstadt-Geheimnisse #1 – Brasília
// eingeweiht 21.04.1960, 41 Monate Bauzeit · Rio–Brasília ≈ 930 km · Verfassung 1891 · Kubitschek „50 Jahre in 5“ · Costa/Niemeyer · UNESCO 1987 · ≈ 2,8–3,0 Mio. Einw.
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function counter(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function crown(ctx,x,y,a,s=1){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle='#FFE066'; ctx.strokeStyle='#0B1C2A'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-26,10); ctx.lineTo(-26,-14); ctx.lineTo(-13,0); ctx.lineTo(0,-20); ctx.lineTo(13,0); ctx.lineTo(26,-14); ctx.lineTo(26,10); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();}
const BSB=[-47.88,-15.79], RIO=[-43.17,-22.91], GOLD='#FFE066';
const COAST=[[-46.63,-23.55,12],[-43.17,-22.91,10],[-38.5,-12.97,6],[-34.88,-8.05,5],[-38.54,-3.72,4],[-48.5,-1.45,3],[-51.22,-30.03,4],[-49.27,-25.43,3],[-43.94,-19.92,5],[-40.3,-20.3,2],[-35.2,-5.8,2],[-44.3,-2.5,2],[-37.0,-10.9,2],[-48.55,-27.6,2],[-35.7,-9.6,2]];
const DOTS=[]; COAST.forEach(([x,y,n],c)=>{for(let i=0;i<n*4;i++){const r=0.25+((i*37+c*11)%17)/17*1.4, a=(i*2.399+c); DOTS.push([x+Math.cos(a)*r,y+Math.sin(a)*r*0.8]);}});
const vSA=viewBox([-82,-56,-34,13]), vBra=viewBox([-74,-34,-34,5]), vMid=viewBox([-56,-26,-38,-8]), vBsb=viewBox([-52,-20,-43.5,-11.5]);

// schematic Plano Piloto: curved residential axis (wings) crossing the straight monumental axis, lake to the east
function plan(ctx,a,k,{lab=0,shape=0,t=0}={}){if(a<=0) return; const X=100,Y=window.PANEL_Y||500,Wd=780,Hd=640; ctx.save(); ctx.globalAlpha=a; ctx.translate(X,Y); ctx.save(); rr(ctx,0,0,Wd,Hd,30); ctx.clip();
 ctx.fillStyle='#9C7A4A'; ctx.fillRect(0,0,Wd,Hd); for(let i=0;i<60;i++){ctx.fillStyle='rgba(60,90,40,0.18)'; ctx.beginPath(); ctx.arc((i*137)%Wd,(i*251)%Hd,18+(i%5)*6,0,7); ctx.fill();}
 const kl=clamp((k-0.15)/0.4); if(kl>0){ctx.save(); ctx.globalAlpha=a*kl; ctx.fillStyle='#2F7DD1'; ctx.beginPath(); ctx.moveTo(560,40); ctx.bezierCurveTo(700,60,740,200,690,300); ctx.bezierCurveTo(650,380,720,470,640,600); ctx.bezierCurveTo(600,560,610,480,590,420); ctx.bezierCurveTo(560,330,620,250,560,180); ctx.bezierCurveTo(520,130,500,60,560,40); ctx.closePath(); ctx.fill(); ctx.restore();}
 // wings: arc
 const cx=360, cy=330; const ka=clamp(k/0.6); ctx.strokeStyle='#F6F1E7'; ctx.lineCap='round'; ctx.lineWidth=14; ctx.beginPath(); const a0=Math.PI*1.13, a1=Math.PI*1.87; ctx.arc(cx,cy+260,330,a0,a0+(a1-a0)*ka); ctx.stroke();
 // blocks along wings
 for(let i=0;i<16;i++){const f=i/15; if(f>ka) continue; const an=a0+(a1-a0)*f; const px=cx+Math.cos(an)*330, py=cy+260+Math.sin(an)*330; ctx.fillStyle='rgba(246,241,231,0.8)'; ctx.fillRect(px-14,py-30,28,18); ctx.fillRect(px-14,py+12,28,18);}
 // monumental axis
 const km=clamp((k-0.3)/0.5); ctx.lineWidth=16; ctx.strokeStyle=GOLD; ctx.beginPath(); ctx.moveTo(150,cy+20); ctx.lineTo(150+(560-150)*km,cy+20-60*km*0.0); ctx.stroke();
 if(km>0.95){ctx.fillStyle=GOLD; ctx.beginPath(); ctx.moveTo(560,cy+20); ctx.lineTo(530,cy-6); ctx.lineTo(530,cy+46); ctx.closePath(); ctx.fill();}
 if(shape>0){ctx.save(); ctx.globalAlpha=a*shape*(0.6+0.4*Math.sin(t*4)); ctx.strokeStyle=C.target; ctx.lineWidth=6; ctx.setLineDash([14,10]); ctx.beginPath(); ctx.moveTo(150,cy+20); ctx.lineTo(560,cy+20); ctx.moveTo(cx-300,cy+120); ctx.quadraticCurveTo(cx,cy-90,cx+300,cy+120); ctx.stroke(); ctx.restore();}
 if(lab>0){ctx.save(); ctx.globalAlpha=a*lab; ctx.font=`800 28px ${FD}`; ctx.fillStyle='rgba(11,28,42,0.88)'; rr(ctx,24,24,300,46,12); ctx.fill(); ctx.fillStyle=GOLD; ctx.fillText('Plano Piloto (schematisch)',38,56); ctx.restore();}
 ctx.restore(); rr(ctx,0,0,Wd,Hd,30); ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}

const scenes=[
 {head:'Eine Hauptstadt aus dem Nichts', headInstant:true, say:S_say[0], cams:[{at:0,view:vSA},{at:0.3,view:vBra,fly:2.4},{at:sc=>wt(sc,'Hauptstadt')-0.3,view:vBsb,fly:2.2}],
  under:[e=>{const {u}=e; hl(e,'BRA',C.ok,0.35*clamp((u-0.3)/0.5),{outline:true});}],
  over:[e=>{const {u,t}=e; pulse(e,BSB,t,clamp((u-0.5)/0.4),GOLD,11);}],
  top:[e=>{const {u,sc,ctx,t}=e; const t41=wt(sc,'41'); const a=clamp((u-wt(sc,'Hauptstadt')+0.2)/0.5); plan(ctx,a,clamp((u-wt(sc,'Hauptstadt'))/3.2),{t});
   const an=clamp((u-0.3)/0.4)*(1-clamp((u-wt(sc,'Heute'))/0.4)); if(an>0) label(ctx,'1956: Hochland, fast nichts',L+20,1250,{alpha:an,font:`800 38px ${FD}`});
   const am=clamp((u-t41)/0.4); if(am>0) label(ctx,'Bauzeit: 41 Monate',L+20,1250,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:am,font:`800 42px ${FD}`});}]},
 {head:'Von Rio nach Brasília', say:S_say[1], cams:[{at:0,view:vBsb,fly:1.0},{at:0.4,view:vMid,fly:2.4},{at:sc=>wt(sc,'900')-0.4,view:viewBox([-52,-25,-40,-13]),fly:2.0}],
  under:[e=>{hl(e,'BRA',C.ok,0.3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tr=wt(sc,'Rio'), tb=wt(sc,'neue Hauptstadt'); pulse(e,RIO,t,clamp((u-tr)/0.4),'#fff',10); tag(e,RIO,'Rio de Janeiro',clamp((u-tr)/0.4),20,40,'#fff',30);
   pulse(e,BSB,t,clamp((u-0.2)/0.4),GOLD,11); tag(e,BSB,'Brasília',clamp((u-0.2)/0.4),20,-34,GOLD,32);
   const mv=ease(clamp((u-tb)/1.4)); const p=d3.geoInterpolate(RIO,BSB)(mv); const q=P(e,mv>0?p:RIO); if(u>tr) crown(ctx,q[0],q[1]-46,clamp((u-tr)/0.4),1.2);
   const k9=clamp((u-wt(sc,'900')+0.2)/1.2); if(k9>0){const a=P(e,RIO), b=P(e,d3.geoInterpolate(RIO,BSB)(eout(k9))); ctx.save(); ctx.setLineDash([16,10]); ctx.strokeStyle=GOLD; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke(); ctx.restore();
    label(ctx,'≈ 930 km Luftlinie ins Landesinnere',L+10,1250,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:clamp(k9*2),font:`800 36px ${FD}`});}
   const aa=clamp((u-wt(sc,'1960'))/0.4)*(1-clamp((u-tr)/0.4)); if(aa>0) label(ctx,'Hauptstadt seit 1960',L+20,1250,{alpha:aa,font:`800 40px ${FD}`});}]},
 {head:'Warum dieser Aufwand?', say:S_say[2], cams:[{at:0,view:viewBox([-52,-25,-40,-13]),fly:1.0},{at:0.4,view:vBra,fly:2.4}],
  under:[e=>{hl(e,'BRA',C.ok,0.25);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tk=wt(sc,'Küste'); DOTS.forEach((d,i)=>{const a=clamp((u-tk+0.4-i*0.012)/0.3); if(a<=0) return; const q=P(e,d); ctx.save(); ctx.globalAlpha=a*0.9; ctx.fillStyle=GOLD; ctx.beginPath(); ctx.arc(q[0],q[1],5,0,7); ctx.fill(); ctx.restore();});
   const ai=clamp((u-wt(sc,'Landesinnere'))/0.4); if(ai>0){const q=P(e,[-55,-10]); ctx.save(); ctx.globalAlpha=ai; ctx.font=`800 40px ${FD}`; ctx.textAlign='center'; ctx.fillStyle='rgba(246,241,231,0.9)'; ctx.fillText('kaum erschlossen',q[0],q[1]); ctx.restore();}
   const ta=wt(sc,'ändern'); [[-38,-12],[-43,-21],[-49,-26],[-45,-4]].forEach((s,i)=>{const k=clamp((u-ta+0.6-i*0.15)/0.8); if(k<=0) return; const a=P(e,s), b=P(e,d3.geoInterpolate(s,BSB)(0.75*eout(k))); ctx.save(); ctx.strokeStyle=C.target; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke(); const an=Math.atan2(b[1]-a[1],b[0]-a[0]); ctx.translate(b[0],b[1]); ctx.rotate(an); ctx.fillStyle=C.target; ctx.beginPath(); ctx.moveTo(18,0); ctx.lineTo(-10,-14); ctx.lineTo(-10,14); ctx.closePath(); ctx.fill(); ctx.restore();});
   pulse(e,BSB,t,clamp((u-ta)/0.4),GOLD,11);
   const ac=clamp((u-tk)/0.4); if(ac>0) label(ctx,'Die meisten lebten an der Küste',L+20,1250,{alpha:ac*(1-clamp((u-ta)/0.4)),font:`800 38px ${FD}`});
   const am=clamp((u-ta)/0.4); if(am>0) label(ctx,'Hauptstadt in die Mitte',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:am,font:`800 40px ${FD}`});}]},
 {head:'Eine alte Idee', say:S_say[3], cams:[{at:0,view:vBra,fly:1.0},{at:sc=>wt(sc,'Kubitschek')-0.6,view:vMid,fly:2.4},{at:sc=>wt(sc,'50 Jahre')-0.4,view:vBsb,fly:2.4}],
  under:[e=>{hl(e,'BRA',C.ok,0.3);}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,BSB,t,1,GOLD,11); const t91=wt(sc,'1891'), tk=wt(sc,'Kubitschek'), t50=wt(sc,'50 Jahre');
   counter(ctx,'1891',clamp((u-t91)/0.4)*(1-clamp((u-wt(sc,'Umgesetzt'))/0.4)));
   const av=clamp((u-wt(sc,'Zentrum'))/0.4)*(1-clamp((u-wt(sc,'Umgesetzt'))/0.4)); if(av>0) label(ctx,'Verfassung: Hauptstadt ins Zentrum',L+10,1250,{alpha:av,font:`800 36px ${FD}`});
   const ak=clamp((u-tk+0.4)/0.4); if(ak>0) label(ctx,'Präsident Juscelino Kubitschek',L+10,1180,{color:'#0B1C2A',bg:'rgba(246,241,231,0.95)',alpha:ak,font:`800 34px ${FD}`});
   const k5=clamp((u-t50)/1.2); if(k5>0){counter(ctx,`${Math.round(lerp(50,5,ease(k5)))} Jahre`,clamp((u-t50)/0.3),700,GOLD,120); label(ctx,'50 Jahre Fortschritt in 5',L+10,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:clamp((u-t50)/0.4),font:`800 38px ${FD}`});}}]},
 {head:'Geplant am Reißbrett', say:S_say[4], cams:[{at:0,view:vBsb,fly:1.0},{at:1,view:viewBox([-50,-18.5,-45.5,-13.5]),fly:8}],
  under:[e=>{hl(e,'BRA',C.ok,0.25);}],
  top:[e=>{const {u,sc,ctx,t}=e; plan(ctx,clamp((u-0.2)/0.5),1,{lab:1,shape:clamp((u-wt(sc,'Flugzeug'))/0.4),t});
   const ac=clamp((u-wt(sc,'Lúcio'))/0.4); if(ac>0) label(ctx,'Lúcio Costa & Oscar Niemeyer',L+10,1180,{alpha:ac,font:`800 36px ${FD}`});
   const af=clamp((u-wt(sc,'Flugzeug'))/0.4)*(1-clamp((u-wt(sc,'1987'))/0.4)); if(af>0) label(ctx,'erinnert an ein Flugzeug',L+10,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:af,font:`800 38px ${FD}`});
   const au=clamp((u-wt(sc,'1987'))/0.4); if(au>0) label(ctx,'UNESCO-Welterbe seit 1987',L+10,1250,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:au,font:`800 38px ${FD}`});}]},
 {head:'Brasília heute', say:S_say[5], cams:[{at:0,view:vBsb,fly:1.0},{at:0.6,view:vBra,fly:5}],
  under:[e=>{hl(e,'BRA',C.ok,0.3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tm=wt(sc,'drei Millionen'); const k=ease(clamp((u-tm+0.8)/1.4)); pulse(e,BSB,t,1,GOLD,12);
   for(let i=0;i<60;i++){const a=i*2.399, r=0.15+(i%13)/13*1.1; const a2=clamp((u-tm+0.8)/1.4-i/80); if(a2<=0) continue; const q=P(e,[BSB[0]+Math.cos(a)*r,BSB[1]+Math.sin(a)*r*0.8]); ctx.save(); ctx.globalAlpha=a2*0.9; ctx.fillStyle=GOLD; ctx.beginPath(); ctx.arc(q[0],q[1],4,0,7); ctx.fill(); ctx.restore();}
   if(k>0) counter(ctx,`≈ ${(3*k).toFixed(1).replace('.',',')} Mio.`,clamp((u-tm+0.8)/0.4),700,'#fff',110);
   const ag=clamp((u-wt(sc,'größten'))/0.4); if(ag>0) label(ctx,'aus dem Nichts zur Großstadt',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ag,font:`800 40px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:vBra,fly:1.2},{at:1.4,view:vSA,fly:4.5}],
  under:[e=>{hl(e,'BRA',C.ok,0.35);}],
  over:[e=>{const {t}=e; pulse(e,BSB,t,1,GOLD,10);}],
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
return {tag:'HAUPTSTADT-GEHEIMNISSE #1', scenes, wt};
}
