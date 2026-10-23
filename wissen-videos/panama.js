// Story: Nadelöhre #2 – Der Panamakanal
// 80–82 km · Gatúnsee 26 m · 200 Mio. Liter pro Durchfahrt · Dez 2023: 22 statt 36 Schiffe/Tag · ≈ 22.000 / ≈ 5.600 Tote · 1914 · 1999 · > 5 % Welthandel
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', WATER='#2F86C8', PANC='#FF3B7F';
const PANF={type:'Feature',geometry:window.PANG}, GAT=window.GATUN;
function route(e,pts,k,col,w=7,{dash=true,head=true,alpha=1}={}){if(k<=0||alpha<=0) return null; const {ctx,t}=e; const Q=pts.map(p=>P(e,p)); let tot=0; const seg=[]; for(let i=1;i<Q.length;i++){const d=Math.hypot(Q[i][0]-Q[i-1][0],Q[i][1]-Q[i-1][1]); seg.push(d>400?0:d); tot+=seg[i-1];}
 let rem=tot*clamp(k); ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round'; if(dash){ctx.setLineDash([18,12]); ctx.lineDashOffset=-t*50;} ctx.shadowColor=col; ctx.shadowBlur=10; ctx.beginPath(); ctx.moveTo(Q[0][0],Q[0][1]); let end=Q[0];
 for(let i=1;i<Q.length&&rem>0;i++){if(seg[i-1]===0){ctx.moveTo(Q[i][0],Q[i][1]); continue;} const f=Math.min(1,rem/seg[i-1]); end=[lerp(Q[i-1][0],Q[i][0],f),lerp(Q[i-1][1],Q[i][1],f)]; ctx.lineTo(end[0],end[1]); rem-=seg[i-1];} ctx.stroke(); ctx.setLineDash([]); ctx.shadowBlur=0;
 if(head&&k<1){ship(ctx,end[0],end[1],0,1,col);} ctx.restore(); return end;}
function ship(ctx,x,y,ang,s=1,col='#fff'){ctx.save(); ctx.translate(x,y); ctx.rotate(ang); ctx.scale(s,s); ctx.beginPath(); ctx.moveTo(-16,-7); ctx.lineTo(10,-7); ctx.lineTo(18,0); ctx.lineTo(10,7); ctx.lineTo(-16,7); ctx.closePath(); ctx.fillStyle=col; ctx.fill(); ctx.strokeStyle='#0B1C2A'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();}
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pan(e,a){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(PANF); ctx.globalAlpha=a*0.35; ctx.fillStyle=PANC; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle=PANC; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function lake(e,a){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); GAT.features.forEach(f=>path(f)); ctx.globalAlpha=a*0.9; ctx.fillStyle=WATER; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();}
const CANAL=[[-79.92,9.38],[-79.92,9.27],[-79.86,9.17],[-79.76,9.13],[-79.70,9.11],[-79.66,9.06],[-79.61,9.02],[-79.59,8.99],[-79.55,8.93],[-79.52,8.87]];
const HORN=[[-79.9,9.6],[-74,12.5],[-62,12],[-48,2],[-34.8,-6],[-39,-22],[-48,-30],[-58,-40],[-65,-50],[-67.3,-56.3],[-72,-55],[-76,-47],[-73,-35],[-71.5,-20],[-79,-8],[-81,-1],[-80,5],[-79.5,8.6]];
const vWide=viewBox([-100,-5,-55,30]), vPan=viewBox([-82.8,7.0,-77.0,9.9]), vCan=viewBox([-80.15,8.8,-79.35,9.45]), vAm=viewBox([-115,-58,-25,25]);
// lock profile panel: Atlantic 0 m → 3 steps up → lake +26 m → 1 + 2 steps down → Pacific
const PX=100, PY=520, PW=880, PH=520;
function profile(ctx,a,k,t){if(a<=0) return; const PYv=window.PANEL_Y||PY; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.93)'; rr(ctx,PX,PYv,PW,PH,30); ctx.fill(); ctx.save(); rr(ctx,PX,PYv,PW,PH,30); ctx.clip();
 const base=PYv+PH-90, hpx=230; const H=m=>base-m/26*hpx; const X=f=>PX+40+f*(PW-80);
 const steps=[[0,0],[0.14,0],[0.14,8.7],[0.19,8.7],[0.19,17.3],[0.24,17.3],[0.24,26],[0.68,26],[0.68,16.5],[0.76,16.5],[0.76,8.3],[0.81,8.3],[0.81,0],[1,0]];
 // terrain
 ctx.beginPath(); ctx.moveTo(X(0),PYv+PH); steps.forEach(([f,m])=>ctx.lineTo(X(f),H(m)+14)); ctx.lineTo(X(1),PYv+PH); ctx.closePath(); ctx.fillStyle='#5B4A33'; ctx.fill();
 // water surface
 ctx.beginPath(); steps.forEach(([f,m],i)=>i?ctx.lineTo(X(f),H(m)):ctx.moveTo(X(f),H(m))); ctx.strokeStyle='#7FD0FF'; ctx.lineWidth=8; ctx.stroke();
 ctx.font=`800 28px ${FD}`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.fillText('Atlantik',X(0.06),base+44); ctx.fillText('Pazifik',X(0.92),base+44); ctx.fillText('Gatúnsee',X(0.46),H(26)-26); ctx.fillStyle=GOLD; ctx.fillText('+26 m',X(0.46),H(26)+50);
 ctx.font=`700 22px ${FB}`; ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.fillText('Schleusen',X(0.19),base+78); ctx.fillText('Schleusen',X(0.75),base+78); ctx.textAlign='right'; ctx.fillText('schematisch',PX+PW-20,PYv+36);
 // ship along the profile
 const f=clamp(k); let m=0; for(let i=1;i<steps.length;i++){if(f<=steps[i][0]){m=steps[i-1][1]; break;} m=steps[i][1];} ship(ctx,X(f),H(m)-8,0,2.2,'#fff');
 ctx.restore(); rr(ctx,PX,PYv,PW,PH,30); ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function bars(ctx,a,k){if(a<=0) return; const y0=1180; ctx.save(); ctx.globalAlpha=a; [['normal',36,'#7FD0FF'],['Dez. 2023',22,'#FF5A5F']].forEach(([n,v,c],i)=>{const y=y0+i*80; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,y,820,62,14); ctx.fill(); const w=(820-20)*v/36*(i?k:1); ctx.fillStyle=c; rr(ctx,L+10,y+8,Math.max(10,w),46,10); ctx.fill(); ctx.font=`800 32px ${FD}`; ctx.fillStyle='#0B1C2A'; ctx.textAlign='left'; ctx.fillText(`${n}: ${v} Schiffe/Tag`,L+26,y+43);}); ctx.restore();}
const scenes=[
 {head:'Schiffe fahren bergauf', headInstant:true, say:S_say[0], cams:[{at:0,view:vWide},{at:0.3,view:vPan,fly:3.4}],
  over:[e=>{const {u,sc,ctx,t}=e; pan(e,clamp((u-0.3)/0.5)); lake(e,clamp((u-wt(sc,'See'))/0.5)); route(e,CANAL,clamp((u-wt(sc,'Panamakanal'))/1.2),GOLD,7,{dash:false,head:false}); profile(ctx,clamp((u-wt(sc,'26'))/0.4)*(1-clamp((u-wt(sc,'Willkommen'))/0.4)),clamp((u-wt(sc,'bergauf'))/2.5),t); tag(e,[-80.3,8.3],'Panama',clamp((u-wt(sc,'Panamakanal'))/0.4),-60,0,'#fff',34);}]},
 {head:'Atlantik trifft Pazifik', say:S_say[1], cams:[{at:0,view:vPan,fly:1.0},{at:sc=>wt(sc,'Ohne ihn')-0.3,view:vAm,fly:3.0}],
  over:[e=>{const {u,sc,ctx,t}=e; pan(e,0.8); lake(e,1); route(e,CANAL,1,GOLD,7,{dash:false,head:false}); const a1=clamp((u-wt(sc,'80'))/0.4); chip(ctx,'≈ 80 km lang',1180,a1*(1-clamp((u-wt(sc,'Ohne ihn'))/0.4))); tag(e,[-81.5,10.6],'Atlantik (Karibik)',clamp((u-wt(sc,'Atlantik'))/0.4)*(1-clamp((u-wt(sc,'Ohne ihn'))/0.4)),-60,0,'#fff',28); tag(e,[-80.5,7.5],'Pazifik',clamp((u-wt(sc,'Pazifik'))/0.4)*(1-clamp((u-wt(sc,'Ohne ihn'))/0.4)),-50,0,'#fff',28);
   route(e,HORN,clamp((u-wt(sc,'Ohne ihn'))/3.0),'#FF5A5F',6); tag(e,[-67.3,-56.3],'Kap Hoorn',clamp((u-wt(sc,'Kap Hoorn'))/0.4),-180,30,'#fff',30);}]},
 {head:'Schleusen heben die Schiffe', say:S_say[2], cams:[{at:0,view:vAm,fly:1.0},{at:0.4,view:vCan,fly:3.0}],
  over:[e=>{const {u,sc,ctx,t}=e; pan(e,0.8); lake(e,1); route(e,CANAL,1,GOLD,7,{dash:false,head:false}); tag(e,[-79.85,9.15],'Gatúnsee',clamp((u-wt(sc,'Gatúnsee'))/0.4),-80,-30,'#fff',30); profile(ctx,clamp((u-wt(sc,'Schleusen'))/0.5),clamp((u-wt(sc,'heben'))/(sc.dur-wt(sc,'heben')-0.4)),t);}]},
 {head:'Ein Kanal, der Wasser braucht', say:S_say[3], cams:[{at:0,view:vCan,fly:1.0},{at:0.4,view:vPan,fly:6}],
  over:[e=>{const {u,sc,ctx}=e; pan(e,0.8); lake(e,1); route(e,CANAL,1,GOLD,7,{dash:false,head:false}); const a=clamp((u-wt(sc,'200'))/0.4); if(a>0){const v=Math.round(200*ease(clamp((u-wt(sc,'200'))/0.9))); big(ctx,`${v} Mio. Liter`,a*(1-clamp((u-wt(sc,'2023'))/0.4)),660,'#7FD0FF',104);} chip(ctx,'pro Durchfahrt',1180,a*(1-clamp((u-wt(sc,'2023'))/0.4)),'#fff','rgba(11,28,42,0.93)'); bars(ctx,clamp((u-wt(sc,'2023'))/0.4),clamp((u-wt(sc,'22'))/0.8));}]},
 {head:'Ein Bau mit hohem Preis', say:S_say[4], cams:[{at:0,view:vPan,fly:1.0},{at:0.4,view:vCan,fly:8}],
  over:[e=>{const {u,sc,ctx}=e; pan(e,0.8); lake(e,1); route(e,CANAL,1,GOLD,7,{dash:false,head:false}); chip(ctx,'Frankreich 1881–1889: ≈ 22.000 Tote',1180,clamp((u-wt(sc,'französischen'))/0.4),'#fff','rgba(11,28,42,0.93)',34); chip(ctx,'USA: ≈ 5.600 Tote',1250,clamp((u-wt(sc,'amerikanischen'))/0.4),'#fff','rgba(11,28,42,0.93)',34); const a=clamp((u-wt(sc,'1914'))/0.4); if(a>0) big(ctx,'1914 eröffnet',a,660,GOLD,100);}]},
 {head:'Heute: Panamas Kanal', say:S_say[5], cams:[{at:0,view:vCan,fly:1.0},{at:0.4,view:vWide,fly:5}],
  over:[e=>{const {u,sc,ctx}=e; pan(e,0.8); lake(e,1); route(e,CANAL,1,GOLD,7,{dash:false,head:false}); chip(ctx,'seit 1999: gehört Panama',1180,clamp((u-wt(sc,'1999'))/0.4)); const a=clamp((u-wt(sc,'fünf Prozent'))/0.4); if(a>0) big(ctx,'> 5 % des Welthandels',a,660,'#fff',84);}]},
 {say:S_say[6], cams:[{at:0,view:vPan,fly:1.2},{at:1.4,view:vPan,fly:4.5}],
  under:[],
  over:[],
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
return {tag:'NADELÖHRE #2', scenes, wt};
}
