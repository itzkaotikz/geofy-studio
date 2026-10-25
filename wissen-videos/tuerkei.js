// Story: Warum ist …? #8 – Türkei auf zwei Kontinenten
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
const STR=[[26.2,40.05],[26.75,40.42],[27.5,40.7],[28.4,40.92],[29.0,41.02],[29.12,41.2]];
const MAR=[[26.2,41.75],[26.55,41.45],[26.4,41.1],[26.2,40.82]];
const IST=[28.98,41.01], GAL=[26.67,40.4];
const vTR=viewBox([24.8,35.2,45.2,43]), vTRw=viewBox([24,34.5,46,43.5]), vST=viewBox([24.0,38.8,31.5,42.4]), vBO=viewBox([26.6,39.9,31.0,42.0]), vTH=viewBox([24.4,38.9,30.4,42.3]);
const scenes=[
 {head:'Zwei Kontinente', headInstant:true, say:S_say[0], cams:[{at:0,view:vTRw},{at:0.3,view:vTR,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'AS',OR,clamp((u-wt(sc,'Rund'))/0.6)); fill(e,'TH',BL,clamp((u-wt(sc,'nur etwa'))/0.6));}],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'97'))/0.4); if(a>0) big(ctx,u<wt(sc,'nur etwa')?'97 % Asien':'3 % Europa',a*(1-clamp((u-wt(sc,'Europa.'))/1.6)*0),680,'#fff',130); chip(ctx,'Türkei: 97 % Asien · 3 % Europa',1180,clamp((u-wt(sc,'nur etwa'))/0.4)); tag(e,[27.2,41.5],'Europa',clamp((u-wt(sc,'nur etwa'))/0.4),-30,-40,'#fff',30); tag(e,[33,39.2],'Asien (Anatolien)',clamp((u-wt(sc,'Rund'))/0.4),0,0,'#0B1C2A',32);}]},
 {head:'Die Meerengen', say:S_say[1], cams:[{at:0,view:vTR,fly:1.0},{at:0.5,view:vST,fly:2.6},{at:0,view:vST}].slice(0,2),
  under:[e=>{fill(e,'AS',OR,0.3); fill(e,'TH',BL,0.35);}],
  over:[e=>{const {u,sc,ctx,t}=e; const r=clamp((u-wt(sc,'Dardanellen'))/3.2); line(e,STR,GOLD,r,9); tag(e,[26.3,40.0],'Dardanellen',clamp((u-wt(sc,'Dardanellen'))/0.4),-170,10,'#fff',28); tag(e,[27.7,40.6],'Marmarameer',clamp((u-wt(sc,'Marmarameers'))/0.4),-30,40,'#fff',28); tag(e,[29.1,41.15],'Bosporus',clamp((u-wt(sc,'Bosporus'))/0.4),20,-30,'#fff',28);
   chip(ctx,'Meerengen trennen Asien und Europa',1180,clamp((u-wt(sc,'Meerengen'))/0.4)*(1-clamp((u-wt(sc,'Der Bosporus'))/0.4))); chip(ctx,'Bosporus: engste Stelle ≈ 700 m',1180,clamp((u-wt(sc,'Der Bosporus'))/0.4));}]},
 {head:'Ostthrakien · Istanbul', say:S_say[2], cams:[{at:0,view:vST,fly:1.0},{at:0.5,view:vBO,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'AS',OR,0.25); fill(e,'TH',BL,0.35+0.35*clamp((u-wt(sc,'Ostthrakien'))/0.6));}],
  over:[e=>{const {u,sc,ctx,t}=e; line(e,STR,GOLD,1,7); tag(e,[27.6,41.35],'Ostthrakien',clamp((u-wt(sc,'Ostthrakien'))/0.4),-60,-20,'#fff',30); pulse(e,IST,t,clamp((u-wt(sc,'Istanbul'))/0.4));
   chip(ctx,'Istanbul liegt auf beiden Kontinenten',1180,clamp((u-wt(sc,'Istanbul'))/0.4)); const a=clamp((u-wt(sc,'15'))/0.4); if(a>0) big(ctx,'≈ 15 Mio.',a,680,'#fff',120); tag(e,[29.35,41.0],'Asien',clamp((u-wt(sc,'beiden'))/0.4),0,60,'#0B1C2A',26); tag(e,[28.5,41.1],'Europa',clamp((u-wt(sc,'beiden'))/0.4),-20,-70,'#fff',26);}]},
 {head:'Die Osmanen in Europa', say:S_say[3], cams:[{at:0,view:vBO,fly:1.0},{at:0.5,view:vTH,fly:3.0}],
  under:[e=>{fill(e,'AS',OR,0.25); fill(e,'TH',BL,0.45);}],
  over:[e=>{const {u,sc,ctx,t}=e; const a=clamp((u-wt(sc,'1354'))/0.4); if(a>0) big(ctx,u<wt(sc,'1453')?'1354':'1453',a,680,'#fff',150);
   pulse(e,GAL,t,clamp((u-wt(sc,'Gallipoli'))/0.4),GOLD,10); tag(e,[26.5,40.3],'Gallipoli',clamp((u-wt(sc,'Gallipoli'))/0.4),-150,20,'#fff',28);
   const q0=P(e,[26.3,40.0]), q1=P(e,[26.7,40.55]); arrow(ctx,q0[0],q0[1],q1[0],q1[1],clamp((u-wt(sc,'nach Europa'))/0.8),GOLD,10);
   pulse(e,IST,t,clamp((u-wt(sc,'Konstantinopel'))/0.4),RED,10); tag(e,[29.0,41.05],'Konstantinopel',clamp((u-wt(sc,'Konstantinopel'))/0.4),-20,-40,'#fff',28);
   chip(ctx,'1354 Übergang bei Gallipoli (zu prüfen)',1180,clamp((u-wt(sc,'Schon'))/0.4)*(1-clamp((u-wt(sc,'1453'))/0.4))); chip(ctx,'1453: Eroberung Konstantinopels',1180,clamp((u-wt(sc,'1453'))/0.4));}]},
 {head:'Lausanne 1923', say:S_say[4], cams:[{at:0,view:vTH,fly:1.0},{at:0.5,view:vTR,fly:3.2}],
  under:[e=>{const {u,sc}=e; fill(e,'AS',OR,0.25); fill(e,'TH',BL,0.55+0.2*clamp((u-wt(sc,'Ostthrakien'))/0.6));}],
  over:[e=>{const {u,sc,ctx,t}=e; const a=clamp((u-wt(sc,'1923'))/0.4); if(a>0) big(ctx,'1923',a*(1-clamp((u-wt(sc,'Die Grenze'))/0.4)),680,'#fff',150);
   line(e,MAR,GR,clamp((u-wt(sc,'Mariza'))/1.4),9); tag(e,[25.6,41.5],'Griechenland',clamp((u-wt(sc,'Griechenland'))/0.4),-20,0,'#fff',28); tag(e,[26.35,41.1],'Mariza',clamp((u-wt(sc,'Mariza'))/0.4),-110,0,'#fff',26);
   chip(ctx,'Vertrag von Lausanne: heutige Grenze',1180,clamp((u-wt(sc,'Lausanne'))/0.4)*(1-clamp((u-wt(sc,'Die Grenze'))/0.4))); chip(ctx,'Grenze zu Griechenland: Fluss Mariza (schematisch)',1180,clamp((u-wt(sc,'Die Grenze'))/0.4));}]},
 {head:'Eine Stadt als Brücke', say:S_say[5], cams:[{at:0,view:vTR,fly:1.0},{at:0.5,view:vBO,fly:3.2}],
  under:[e=>{fill(e,'AS',OR,0.3); fill(e,'TH',BL,0.45);}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,IST,t,0.9,GOLD,9); chip(ctx,'Brücken und Tunnel verbinden beide Kontinente',1180,clamp((u-wt(sc,'Brücken'))/0.4)*(1-clamp((u-wt(sc,'Eine Stadt'))/0.4))); chip(ctx,'Istanbul: Brücke zwischen zwei Welten',1180,clamp((u-wt(sc,'Eine Stadt'))/0.4),'#0B1C2A','rgba(120,230,170,0.96)');}]},
 {say:S_say[6], cams:[{at:0,view:vTRw,fly:1.2},{at:1.4,view:vTRw,fly:4.5}],
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
return {tag:'WARUM IST …? #8', scenes, wt};
}
