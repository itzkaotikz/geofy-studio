// Story: Warum ist …? #5 – Afghanistans Finger (Wakhan-Korridor)
// ≈ 350 km lang, 13–65 km breit · Great Game · 1893/1895 Grenzziehung als Puffer · Nachbarn TJK, PAK, CHN (92 km) · Wachdschir-Pass 4.923 m · ≈ 18.000 Einw.
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', RU='#E5484D', GB='#4F8DFF', AF='#FF3B7F', TJ='#7CE0C3', PK='#B79CFF', CN='#FFB74D';
const G10=window.G10; const F=k=>({type:'Feature',geometry:G10[k]});
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
// Wakhan strip: clip Afghanistan to the area east of 71.3° E and north of 36.4° N
function wakhan(e,a,col=GOLD){if(a<=0) return; const {ctx,path}=e; const p0=P(e,[71.55,38.6]), p1=P(e,[75.5,36.4]); ctx.save(); ctx.beginPath(); ctx.rect(p0[0],p0[1],p1[0]-p0[0],p1[1]-p0[1]); ctx.clip(); ctx.beginPath(); path(F('AFG')); ctx.globalAlpha=a*0.75; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}
const vWide=viewBox([30,5,110,55]), vAfg=viewBox([59,28.5,77,39.5]), vCor=viewBox([70.6,35.4,75.8,38.6]), vAsia=viewBox([40,8,100,52]);
const WAKH=[74.88,37.05], ISH=[71.6,36.72];
const scenes=[
 {head:'Afghanistans Finger', headInstant:true, say:S_say[0], cams:[{at:0,view:vWide},{at:0.3,view:vAfg,fly:3.0},{at:sc=>wt(sc,'Finger')-0.2,view:viewBox([66,33,77,39.5]),fly:2.6}],
  under:[e=>{const {u,sc}=e; fill(e,'AFG',AF,clamp((u-wt(sc,'Afghanistan'))/0.5));}],
  over:[e=>{const {u,sc,t,ctx}=e; wakhan(e,clamp((u-wt(sc,'Finger'))/0.5)); const q0=P(e,ISH), q1=P(e,WAKH); arrow(ctx,q0[0],q0[1]-50,q1[0],q1[1]-50,clamp((u-wt(sc,'weit nach'))/1.2),'#fff',10); fill(e,'CHN',CN,0.6*clamp((u-wt(sc,'China'))/0.5)); tag(e,[77,37.6],'China',clamp((u-wt(sc,'China'))/0.4),-60,0,CN,32); chip(ctx,'Warum gibt es diesen Streifen?',1180,clamp((u-wt(sc,'Warum'))/0.4),'#fff','rgba(11,28,42,0.93)');}]},
 {head:'Der Wakhan-Korridor', say:S_say[1], cams:[{at:0,view:viewBox([66,33,77,39.5]),fly:1.0},{at:0.4,view:vCor,fly:3.0},{at:sc=>wt(sc,'Im Norden')-0.3,view:viewBox([69.5,34.6,76.5,39.3]),fly:3}],
  under:[e=>{fill(e,'AFG',AF,0.6);}],
  over:[e=>{const {u,sc,t,ctx}=e; wakhan(e,1); const a1=clamp((u-wt(sc,'350'))/0.4); if(a1>0){const v=Math.round(350*ease(clamp((u-wt(sc,'350'))/0.9))); big(ctx,`≈ ${v} km lang`,a1*(1-clamp((u-wt(sc,'Im Norden'))/0.4)),660,'#fff',100);}
   const a2=clamp((u-wt(sc,'13 Kilometer'))/0.4); chip(ctx,'an engen Stellen nur 13 km breit',1180,a2);
   tag(e,[73.2,38.25],'Pamir',clamp((u-wt(sc,'Pamir'))/0.4),-60,0,'#fff',34); tag(e,[72.2,35.9],'Hindukusch',clamp((u-wt(sc,'Hindukusch'))/0.4),-90,0,'#fff',34);}]},
 {head:'Das Große Spiel', say:S_say[2], cams:[{at:0,view:vAfg,fly:1.6},{at:0.6,view:vAsia,fly:3.5}],
  under:[e=>{const {u,sc}=e; const ar=clamp((u-wt(sc,'Russland'))/0.5), ab=clamp((u-wt(sc,'Briten'))/0.5); ['RUS','KAZ','UZB','TKM','KGZ','TJK'].forEach(k=>hl(e,k,RU,0.42*ar,{outline:false})); ['IND','PAK','BGD'].forEach(k=>hl(e,k,GB,0.42*ab,{outline:false})); fill(e,'AFG',AF,0.5);}],
  over:[e=>{const {u,sc,ctx}=e; const ar=clamp((u-wt(sc,'Russland'))/0.4), ab=clamp((u-wt(sc,'Briten'))/0.4); const a=P(e,[68,50]), b=P(e,[68,40]); arrow(ctx,a[0],a[1],b[0],b[1],ar,RU,14); const c=P(e,[75,22]), d=P(e,[72,32.5]); arrow(ctx,c[0],c[1],d[0],d[1],ab,GB,14);
   tag(e,[60,52],'Russisches Reich',ar,-120,0,'#fff',32); tag(e,[78,21],'Britisch-Indien',ab,-60,0,'#fff',32); const ag=clamp((u-wt(sc,'Große Spiel'))/0.4); if(ag>0) big(ctx,'„Das Große Spiel“',ag,680,GOLD,92);}]},
 {head:'1895: ein Puffer', say:S_say[3], cams:[{at:0,view:vAsia,fly:1.0},{at:0.4,view:viewBox([62,30,80,42]),fly:3.0}],
  under:[e=>{const {u,sc}=e; const f=1-clamp((u-wt(sc,'1895'))/1.5)*0.5; ['RUS','KAZ','UZB','TKM','KGZ','TJK'].forEach(k=>hl(e,k,RU,0.42*f,{outline:false})); ['IND','PAK','BGD'].forEach(k=>hl(e,k,GB,0.42*f,{outline:false})); fill(e,'AFG',AF,0.45);}],
  over:[e=>{const {u,sc,ctx,t}=e; const ab=clamp((u-wt(sc,'Puffer'))/0.4), as=clamp((u-wt(sc,'schmale Streifen'))/0.5); wakhan(e,as); const q=P(e,[73.2,37.0]); if(ab>0) label(ctx,'Puffer',q[0]-60,q[1]-50,{color:'#0B1C2A',bg:'rgba(255,224,102,0.96)',alpha:ab,font:`800 40px ${FD}`});
   const ay=clamp((u-wt(sc,'1895'))/0.4); if(ay>0) big(ctx,'1895',ay*(1-clamp((u-wt(sc,'schmale'))/0.4)),680,'#fff',130); chip(ctx,'Reiche sollen sich nicht berühren',1180,clamp((u-wt(sc,'berühren'))/0.4),'#fff','rgba(11,28,42,0.93)');}]},
 {head:'Drei Nachbarn', say:S_say[4], cams:[{at:0,view:viewBox([62,30,80,42]),fly:1.0},{at:0.5,view:viewBox([68,33.5,79,40.5]),fly:3.0},{at:sc=>wt(sc,'Wachdschir')-0.4,view:viewBox([72.5,35.8,76.5,38.4]),fly:2.6}],
  under:[e=>{const {u,sc}=e; fill(e,'AFG',AF,0.45); fill(e,'TJK',TJ,clamp((u-wt(sc,'Tadschikistan'))/0.5)); fill(e,'PAK',PK,clamp((u-wt(sc,'Pakistan'))/0.5)); fill(e,'CHN',CN,clamp((u-wt(sc,'China'))/0.5));}],
  over:[e=>{const {u,sc,ctx,t}=e; wakhan(e,0.9); tag(e,[71.5,38.6],'Tadschikistan',clamp((u-wt(sc,'Tadschikistan'))/0.4),-80,0,TJ,30); tag(e,[72.3,35.2],'Pakistan',clamp((u-wt(sc,'Pakistan'))/0.4),-60,0,PK,30); tag(e,[76.4,37.8],'China',clamp((u-wt(sc,'China'))/0.4),-40,0,CN,30);
   chip(ctx,'Grenze zu China: 92 km',1180,clamp((u-wt(sc,'92'))/0.4)*(1-clamp((u-wt(sc,'Wachdschir'))/0.4)));
   const ap=clamp((u-wt(sc,'Wachdschir'))/0.4); pulse(e,WAKH,t,ap,'#fff',10); tag(e,WAKH,'Wachdschir-Pass',ap,-260,-30,'#fff',30); chip(ctx,'über 4.900 m hoch',1180,clamp((u-wt(sc,'4.900'))/0.4));}]},
 {head:'Kaum bewohnt', say:S_say[5], cams:[{at:0,view:viewBox([72.5,35.8,76.5,38.4]),fly:1.0},{at:0.5,view:vAfg,fly:5}],
  under:[e=>{fill(e,'AFG',AF,0.45);}],
  over:[e=>{const {u,sc,ctx}=e; wakhan(e,0.9); const a=clamp((u-wt(sc,'18.000'))/0.4); if(a>0){const v=Math.round(18000*ease(clamp((u-wt(sc,'18.000'))/0.9))); big(ctx,`≈ ${v.toLocaleString('de-DE')} Menschen`,a*(1-clamp((u-wt(sc,'Ein Grenzstreifen'))/0.4)),680,'#fff',88);} chip(ctx,'gezogen von zwei Weltreichen',1180,clamp((u-wt(sc,'Ein Grenzstreifen'))/0.4),'#fff','rgba(11,28,42,0.93)');}]},
 {say:S_say[6], cams:[{at:0,view:vAfg,fly:1.2},{at:1.4,view:vAfg,fly:4.5}],
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
return {tag:'WARUM IST …? #5', scenes, wt};
}
