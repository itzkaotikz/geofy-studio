// Story: Krieg auf der Karte #2 – Deutschlands Grenzen 1914–1990
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', OR='#FF9F43', WA='#7FD0FF', BL='#4D9BFF', RED='#E5484D', GR='#78E6AA';
const G10=window.G10; const F=k=>({type:'Feature',geometry:G10[k]});
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0||window.NO_CHIPS) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));

function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function line(e,pts,col,prog,w=10,dash=null){if(prog<=0) return; const {ctx}=e; const q=pts.map(p=>P(e,p)); const n=Math.max(2,Math.floor(q.length*Math.min(1,prog))+(prog>=1?0:1)); ctx.save(); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='rgba(5,14,24,0.7)'; ctx.lineWidth=w+7; ctx.beginPath(); q.slice(0,n).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.strokeStyle=col; ctx.lineWidth=w; if(dash) ctx.setLineDash(dash); ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}

const OST_LINE=[[14.28,53.93],[14.55,53.4],[14.65,52.6],[14.72,51.95],[14.99,51.15]];
const vDE=viewBox([5,47,22.5,55.4]), vDEw=viewBox([4,46.2,24,56]);
const GRY='#9AA7B2';
function bars(ctx,a,u0){ // Flächenvergleich
 if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.92)'; rr(ctx,70,540,940,330,28); ctx.fill();
 const rows=[['1914','≈ 540.000 km²',540,GOLD],['heute','≈ 358.000 km²',358,BL]]; rows.forEach(([l,t,v,c],i)=>{const y=640+i*110, w=(v/540)*600*Math.min(1,eout(clamp(u0-i*0.4))); ctx.fillStyle='#fff'; ctx.font=`800 40px ${FD}`; ctx.textAlign='left'; ctx.fillText(l,110,y+14); ctx.fillStyle=c; rr(ctx,250,y-24,Math.max(2,w),56,12); ctx.fill(); ctx.fillStyle='#0B1C2A'; ctx.font=`800 34px ${FD}`; if(w>260) ctx.fillText(t,270,y+14);});
 ctx.restore();}
const scenes=[
 {head:'Deutschlands Grenzen', headInstant:true, say:S_say[0], cams:[{at:0,view:vDEw},{at:0.3,view:vDE,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'DEU',BL,clamp((u-wt(sc,'Deutschlands'))/0.6));}],
  over:[e=>{const {u,sc,ctx}=e; chip(ctx,'Deutschland heute ≈ 358.000 km²',1180,clamp((u-wt(sc,'Zwei Weltkriege'))/0.4)); big(ctx,'1914 → 1990',clamp((u-wt(sc,'20.'))/0.4),480,'#fff',110);}]},
 {head:'1914: Kaiserreich', say:S_say[1], cams:[{at:0,view:vDE,fly:1.0},{at:0.5,view:vDEw,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'DEU',GOLD,0.55); fill(e,'ALS',GOLD,clamp((u-wt(sc,'Elsass-Lothringen'))/0.6)*0.9); fill(e,'POS',GOLD,clamp((u-wt(sc,'Posen'))/0.6)*0.9); fill(e,'OST',GOLD,clamp((u-wt(sc,'große Gebiete'))/0.6)*0.9);}],
  over:[e=>{const {u,sc,ctx}=e; big(ctx,'1914',clamp((u-wt(sc,'1914'))/0.4)*(1-clamp((u-wt(sc,'Dazu'))/0.4)),480,'#fff',130); chip(ctx,'Kaiserreich ≈ 540.000 km²',1180,clamp((u-wt(sc,'rund'))/0.4)); tag(e,[7.4,48.6],'Elsass-Lothringen',clamp((u-wt(sc,'Elsass-Lothringen'))/0.4),-60,0,'#fff',26); tag(e,[17.2,52.4],'Posen',clamp((u-wt(sc,'Posen'))/0.4),0,0,'#fff',28); tag(e,[18.8,53.4],'Westpreußen',clamp((u-wt(sc,'Westpreußen'))/0.4),10,-30,'#fff',26);}]},
 {head:'1919: Versailles', say:S_say[2], cams:[{at:0,view:vDEw,fly:1.0},{at:0.5,view:vDE,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'DEU',GOLD,0.55); const a=clamp((u-wt(sc,'Elsass-Lothringen'))/0.8); fill(e,'ALS',GOLD,0.9-0.6*a); if(a>0) fill(e,'ALS',BL,a*0.9); const b=clamp((u-wt(sc,'Posen'))/0.8); fill(e,'POS',GOLD,0.9-0.6*b); if(b>0) fill(e,'POS',RED,b*0.9); fill(e,'OST',GOLD,0.9);}],
  over:[e=>{const {u,sc,ctx}=e; big(ctx,'1919',clamp((u-wt(sc,'1919'))/0.4)*(1-clamp((u-wt(sc,'Elsass-Lothringen'))/0.4)),480,'#fff',130); big(ctx,'−13 %',clamp((u-wt(sc,'13 Prozent'))/0.4),480,'#fff',130); chip(ctx,'Elsass-Lothringen → Frankreich',1180,clamp((u-wt(sc,'Elsass-Lothringen'))/0.4)*(1-clamp((u-wt(sc,'Posen'))/0.4)),'#fff','rgba(77,155,255,0.95)'); chip(ctx,'Posen, Teile Westpreußens → Polen',1180,clamp((u-wt(sc,'Posen'))/0.4),'#fff','rgba(229,72,77,0.95)');}]},
 {head:'1945: Oder und Neiße', say:S_say[3], cams:[{at:0,view:vDE,fly:1.0},{at:0.5,view:vDEw,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'DEU',GOLD,0.55); fill(e,'ALS',BL,0.3); fill(e,'POS',RED,0.3); const a=clamp((u-wt(sc,'Gebiete östlich'))/0.8); fill(e,'OST',GOLD,0.9-0.6*a); if(a>0) fill(e,'OST',GRY,a*0.9);}],
  over:[e=>{const {u,sc,ctx,t}=e; big(ctx,u<wt(sc,'Rund ein')?'1945':'−25 %',clamp((u-wt(sc,'1945'))/0.4)*(1-clamp((u-wt(sc,'Rund ein'))/0.3)*0),480,'#fff',130); const q0=P(e,[20,52]),q1=P(e,[13,52]); arrow(ctx,q0[0],q0[1],q1[0],q1[1],clamp((u-wt(sc,'flohen'))/1.0),RED,12);
   chip(ctx,'östlich von Oder und Neiße → Polen/UdSSR',1180,clamp((u-wt(sc,'Gebiete östlich'))/0.4)*(1-clamp((u-wt(sc,'Rund ein'))/0.4))); chip(ctx,'≈ 12 Mio. Flucht und Vertreibung (zu prüfen)',1180,clamp((u-wt(sc,'zwölf'))/0.4),'#fff','rgba(229,72,77,0.92)'); tag(e,[16.5,51.1],'Schlesien',clamp((u-wt(sc,'Schlesien'))/0.4),0,0,'#fff',26); tag(e,[15.6,53.9],'Pommern',clamp((u-wt(sc,'Pommern'))/0.4),0,0,'#fff',26); tag(e,[20.8,54.1],'Ostpreußen',clamp((u-wt(sc,'Ostpreußen'))/0.4),0,0,'#fff',26);}]},
 {head:'1990: Endgültig', say:S_say[4], cams:[{at:0,view:vDEw,fly:1.0},{at:0.5,view:vDE,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'DEU',BL,0.55); fill(e,'OST',GRY,0.4); fill(e,'POS',GRY,0.25); fill(e,'ALS',GRY,0.25);}],
  over:[e=>{const {u,sc,ctx,t}=e; const a=clamp((u-wt(sc,'1990'))/0.4); big(ctx,'1990',a*(1-clamp((u-wt(sc,'Heute'))/0.4)),480,'#fff',130); line(e,OST_LINE,GOLD,clamp((u-wt(sc,'Oder-Neiße-Grenze'))/1.4),9); chip(ctx,'Oder-Neiße-Grenze endgültig anerkannt',1180,clamp((u-wt(sc,'Oder-Neiße-Grenze'))/0.4)*(1-clamp((u-wt(sc,'Heute'))/0.4))); bars(ctx,clamp((u-wt(sc,'Heute'))/0.5),clamp((u-wt(sc,'Heute'))/1.2)); chip(ctx,'Grenzverläufe vereinfacht',1250,clamp((u-wt(sc,'Oder-Neiße-Grenze'))/0.4)*(1-clamp((u-wt(sc,'Heute'))/0.4)),'#fff','rgba(11,28,42,0.8)',30);}]},
 {head:'Kein Naturgesetz', say:S_say[5], cams:[{at:0,view:vDE,fly:1.0},{at:0.5,view:vDEw,fly:3.0}],
  under:[e=>{fill(e,'DEU',BL,0.55); fill(e,'OST',GRY,0.35);}],
  over:[e=>{const {u,sc,ctx}=e; chip(ctx,'Grenzen: Ergebnis von Kriegen und Verträgen',1180,clamp((u-wt(sc,'Kriegen'))/0.4),'#0B1C2A','rgba(120,230,170,0.96)'); chip(ctx,'kein Naturgesetz',1250,clamp((u-wt(sc,'Naturgesetz'))/0.4));}]},
 {say:S_say[6], cams:[{at:0,view:vDEw,fly:1.2},{at:1.4,view:vDEw,fly:4.5}],
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
return {tag:'KRIEG AUF DER KARTE #2', scenes, wt};
}
