// Story: Krieg auf der Karte #1 – Warum Russland so schwer zu erobern ist
// ≈ 350 km lang, 13–65 km breit · Great Game · 1893/1895 Grenzziehung als Puffer · Nachbarn TJK, PAK, CHN (92 km) · Wachdschir-Pass 4.923 m · ≈ 18.000 Einw.
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', FR='#4F8DFF', DE='#B0B8C4', RU='#E5484D', MO='#FFB74D', ICE='#BFE6FF';
const G10=window.G10; const F=k=>({type:'Feature',geometry:G10[k]});
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}

const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));



const KOW=[23.9,54.9], VIL=[25.28,54.69], VIT=[30.2,55.19], SMO=[32.05,54.78], BOR=[35.82,55.52], MOS=[37.62,55.75], BRE=[23.7,52.1], MIN=[27.56,53.9], VYA=[34.3,55.2], NEAR=[36.6,55.9];
const R1812=[KOW,VIL,VIT,SMO,BOR,MOS], R1941=[BRE,MIN,SMO,VYA,NEAR];
const vEU=viewBox([-2,40,62,64]), vRoute=viewBox([20,51,41,58]), vMos=viewBox([30,53.3,40.5,57.6]);
function pin(e,ll,t,a,col,txt,dx=24,dy=-40){if(a<=0) return; pulse(e,ll,t,a,col,10); tag(e,ll,txt,a,dx,dy,'#fff',34);}
function route(e,pts,k,col,w=12,dash=null){if(k<=0) return; const {ctx}=e; const q=pts.map(p=>P(e,p)); const L_=[0]; for(let i=1;i<q.length;i++) L_.push(L_[i-1]+Math.hypot(q[i][0]-q[i-1][0],q[i][1]-q[i-1][1])); const tot=L_[L_.length-1]*Math.min(1,k);
 ctx.save(); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round'; if(dash) ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(q[0][0],q[0][1]); let end=q[0], an=0;
 for(let i=1;i<q.length;i++){ if(L_[i]<=tot){ctx.lineTo(q[i][0],q[i][1]); end=q[i]; an=Math.atan2(q[i][1]-q[i-1][1],q[i][0]-q[i-1][0]);} else {const f=(tot-L_[i-1])/(L_[i]-L_[i-1]); end=[q[i-1][0]+(q[i][0]-q[i-1][0])*f,q[i-1][1]+(q[i][1]-q[i-1][1])*f]; an=Math.atan2(q[i][1]-q[i-1][1],q[i][0]-q[i-1][0]); ctx.lineTo(end[0],end[1]); break;}}
 ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(end[0]+Math.cos(an)*24,end[1]+Math.sin(an)*24); ctx.lineTo(end[0]+Math.cos(an+2.4)*26,end[1]+Math.sin(an+2.4)*26); ctx.lineTo(end[0]+Math.cos(an-2.4)*26,end[1]+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}
const cnt=(u,t0,from,to,d=1.2)=>Math.round(from+(to-from)*ease(clamp((u-t0)/d)));
const scenes=[
 {head:'Zweimal Richtung Moskau', headInstant:true, say:S_say[0], cams:[{at:0,view:vEU},{at:0.4,view:vRoute,fly:3.4}],
  under:[e=>{hl(e,'RUS',RU,0.28,{outline:false});}],
  over:[e=>{const {u,sc,ctx,t}=e; route(e,R1812,clamp((u-wt(sc,'1812'))/2.2),FR); route(e,R1941,clamp((u-wt(sc,'1941'))/2.2),DE,12,[20,12]); pin(e,MOS,t,clamp((u-wt(sc,'Moskau'))/0.4),RU,'Moskau',24,-40);
   chip(ctx,'1812 · Napoleon',1180,clamp((u-wt(sc,'1812'))/0.4)*(1-clamp((u-wt(sc,'1941'))/0.4)),'#fff','rgba(79,141,255,0.95)'); chip(ctx,'1941 · Wehrmacht',1180,clamp((u-wt(sc,'1941'))/0.4)*(1-clamp((u-wt(sc,'Warum'))/0.4)),'#0B1C2A','rgba(176,184,196,0.96)'); big(ctx,'Warum gescheitert?',clamp((u-wt(sc,'Warum'))/0.4),700,'#fff',92);}]},
 {head:'1812: Napoleon', say:S_say[1], cams:[{at:0,view:vRoute,fly:1.0},{at:0.4,view:viewBox([21,52.5,30,56.5]),fly:3.0},{at:sc=>wt(sc,'wich')-0.3,view:vRoute,fly:3.0}],
  under:[e=>{hl(e,'RUS',RU,0.28,{outline:false});}],
  over:[e=>{const {u,sc,ctx,t}=e; pin(e,KOW,t,clamp((u-wt(sc,'Njemen'))/0.4),FR,'Njemen',-170,-30); const a=clamp((u-wt(sc,'615.000'))/0.4); if(a>0) big(ctx,`≈ ${cnt(u,wt(sc,'615.000'),0,615000).toLocaleString('de-DE')} Mann`,a*(1-clamp((u-wt(sc,'wich'))/0.4)),680,'#fff',96);
   route(e,R1812,clamp((u-wt(sc,'wich'))/4),FR); chip(ctx,'Russen weichen zurück',1180,clamp((u-wt(sc,'wich'))/0.4)*(1-clamp((u-wt(sc,'verbrannte'))/0.4))); chip(ctx,'verbrannte Erde: Felder, Brücken, Vorräte',1180,clamp((u-wt(sc,'verbrannte'))/0.4),'#fff','rgba(229,72,77,0.95)');}]},
 {head:'Gegner Nr. 1: die Weite', say:S_say[2], cams:[{at:0,view:vRoute,fly:1.0},{at:0.5,view:viewBox([19,50,43,59]),fly:4}],
  under:[e=>{hl(e,'RUS',RU,0.28,{outline:false});}],
  over:[e=>{const {u,sc,ctx,t}=e; route(e,R1812,1,FR); pin(e,MOS,t,1,RU,'Moskau',24,-40); big(ctx,'≈ 1.000 km',clamp((u-wt(sc,'Weite'))/0.4)*(1-clamp((u-wt(sc,'Nachschub'))/0.4)),680,'#fff',120); chip(ctx,'Hunger, Nachschub kommt kaum hinterher',1180,clamp((u-wt(sc,'essen'))/0.4));}]},
 {head:'Moskau brennt', say:S_say[3], cams:[{at:0,view:viewBox([19,50,43,59]),fly:1.0},{at:0.4,view:vMos,fly:3.0},{at:sc=>wt(sc,'Rückzug')-0.3,view:vRoute,fly:4}],
  under:[e=>{hl(e,'RUS',RU,0.28,{outline:false});}],
  over:[e=>{const {u,sc,ctx,t}=e; const back=clamp((u-wt(sc,'Rückzug'))/4); route(e,R1812,1-0.0*back,FR,12); if(back>0) route(e,[...R1812].reverse(),back,ICE,8,[14,10]); pin(e,MOS,t,1,RU,'Moskau',24,-40);
   chip(ctx,'September 1812: Moskau brennt',1180,clamp((u-wt(sc,'September'))/0.4)*(1-clamp((u-wt(sc,'Rückzug'))/0.4))); const w=clamp((u-wt(sc,'Winter'))/0.4); if(w>0) big(ctx,'bis −30 °C',w*(1-clamp((u-wt(sc,'Zurück kam'))/0.4)),680,ICE,120);
   const z=clamp((u-wt(sc,'Zurück kam'))/0.4); if(z>0) big(ctx,`${cnt(u,wt(sc,'Zurück kam'),615000,100000,2.2).toLocaleString('de-DE')} Mann`,z,680,'#fff',96); chip(ctx,'Schätzungen: um 100.000 kehren zurück',1180,clamp((u-wt(sc,'Schätzungen'))/0.4));}]},
 {head:'1941: Wieder vor Moskau', say:S_say[4], cams:[{at:0,view:vRoute,fly:1.0},{at:0.5,view:viewBox([21,50.5,40,57.5]),fly:3.0},{at:sc=>wt(sc,'Rote Armee')-0.3,view:vMos,fly:3}],
  under:[e=>{hl(e,'RUS',RU,0.28,{outline:false});}],
  over:[e=>{const {u,sc,ctx,t}=e; route(e,R1941,clamp((u-wt(sc,'1941'))/3),DE,12,[20,12]); pin(e,MOS,t,1,RU,'Moskau',24,-40); chip(ctx,'Dezember 1941: noch in Sommeruniform',1180,clamp((u-wt(sc,'Sommeruniform'))/0.4)*(1-clamp((u-wt(sc,'130.000'))/0.4)));
   const a=clamp((u-wt(sc,'130.000'))/0.4); if(a>0) big(ctx,`> ${cnt(u,wt(sc,'130.000'),0,130000).toLocaleString('de-DE')} Erfrierungen`,a*(1-clamp((u-wt(sc,'Rote Armee'))/0.4)),680,ICE,80);
   const b=clamp((u-wt(sc,'Rote Armee'))/2.5); if(b>0){const s0=P(e,[37.3,55.75]), s1=P(e,[34.2,55.3]); arrow(ctx,s0[0],s0[1],s1[0],s1[1],b,RU,16);} chip(ctx,'Gegenangriff: > 200 km zurück',1180,clamp((u-wt(sc,'200'))/0.4),'#fff','rgba(229,72,77,0.95)');}]},
 {head:'Nicht nur der Winter', say:S_say[5], cams:[{at:0,view:vMos,fly:1.0},{at:0.5,view:vRoute,fly:3},{at:sc=>wt(sc,'Mongolen')-0.4,view:viewBox([15,40,70,64]),fly:3.4}],
  under:[e=>{const {u,sc}=e; hl(e,'RUS',RU,0.28,{outline:false}); hl(e,'MNG',MO,0.5*clamp((u-wt(sc,'Mongolen'))/0.6),{outline:false});}],
  over:[e=>{const {u,sc,ctx,t}=e; const k=clamp((u-wt(sc,'Weite'))/0.4)*(1-clamp((u-wt(sc,'Unbesiegbar'))/0.4)); chip(ctx,'Weite + Nachschub + Verteidiger',1180,k);
   const m=clamp((u-wt(sc,'Mongolen'))/2.5); if(m>0){const a0=P(e,[56,52]), a1=P(e,[40.4,56.1]), b1=P(e,[30.5,50.45]); arrow(ctx,a0[0],a0[1],a1[0],a1[1],m,MO,14); arrow(ctx,a0[0],a0[1],b1[0],b1[1],m,MO,14);} chip(ctx,'13. Jh.: Mongolen erobern große Teile',1180,clamp((u-wt(sc,'Mongolen'))/0.4),'#0B1C2A','rgba(255,183,77,0.96)');}]},
 {say:S_say[6], cams:[{at:0,view:vRoute,fly:1.2},{at:1.4,view:vRoute,fly:4.5}],
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
return {tag:'KRIEG AUF DER KARTE #1', scenes, wt};
}
