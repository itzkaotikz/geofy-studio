// Story: Rekorde #3 – Samoa überspringt einen Tag (30.12.2011)
// Datumsgrenze · 1892 Wechsel auf die Ostseite · AUS +21 h, NZ +23 h · „zwei Arbeitstage pro Woche“ · Tokelau · Amerikanisch-Samoa: < 1 Flugstunde, 24 h
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', WS='#FF3B7F', AS='#4F8DFF', NZC='#7CE0C3', AUC='#FF8A5B';
const G=window.S10; const F=k=>({type:'Feature',geometry:G[k]}); const AUSF={type:'Feature',geometry:window.AUSG};
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function shape(e,f,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(f); ctx.globalAlpha=a*0.7; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.4); ctx.strokeStyle='#fff'; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
const WSM=[-172.1,-13.75], ASM=[-170.7,-14.3], TKL=[-171.8,-9.2];
// schematic date line: before 2011 straight near 180°, after 2011 bent east around Samoa and Tokelau
const IDL0=[[180,25],[180,-5],[180,-8],[180,-15],[180,-17],[180,-55]];
const IDL1=[[180,25],[180,-5],[-171.15,-7],[-171.15,-15],[180,-17],[180,-55]];
function idl(e,k,a,t){if(a<=0) return; const {ctx}=e; const pts=IDL0.map((p,i)=>{const q=IDL1[i]; const lon0=p[0], lon1=q[0]; let d=((lon1-lon0+540)%360)-180; return [lon0+d*k, lerp(p[1],q[1],k)];}); ctx.save(); ctx.globalAlpha=a; ctx.setLineDash([22,14]); ctx.lineDashOffset=-t*30; ctx.strokeStyle='#fff'; ctx.lineWidth=6; ctx.shadowColor='#fff'; ctx.shadowBlur=10; ctx.beginPath(); e.path({type:'LineString',coordinates:pts}); ctx.stroke(); ctx.restore();}
// calendar pages
function cal(ctx,x,y,day,wd,a,cross=0,s=1){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle='#fff'; rr(ctx,-110,-130,220,260,20); ctx.fill(); ctx.fillStyle='#E5484D'; rr(ctx,-110,-130,220,64,20); ctx.fill(); ctx.fillRect(-110,-90,220,24); ctx.font=`800 30px ${FD}`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.fillText('DEZ 2011',0,-86); ctx.fillStyle='#0B1C2A'; ctx.font=`800 110px ${FD}`; ctx.fillText(day,0,40); ctx.font=`800 34px ${FD}`; ctx.fillText(wd,0,100);
 if(cross>0){ctx.strokeStyle='#E5484D'; ctx.lineWidth=16; ctx.lineCap='round'; const k=eout(cross); ctx.beginPath(); ctx.moveTo(-90,-110); ctx.lineTo(-90+180*k,-110+220*k); ctx.stroke(); if(cross>0.5){const k2=eout((cross-0.5)*2); ctx.beginPath(); ctx.moveTo(90,-110); ctx.lineTo(90-180*k2,-110+220*k2); ctx.stroke();}}
 ctx.restore();}
const vPac={lon:-176,lat:-14,scale:1100}, vWide={lon:170,lat:-20,scale:420}, vReg={lon:172,lat:-26,scale:620}, vClose={lon:-171.4,lat:-13.9,scale:9000}, vTK={lon:-172,lat:-11.5,scale:2600};
const scenes=[
 {head:'Der Tag, den es nie gab', headInstant:true, say:S_say[0], cams:[{at:0,view:vWide},{at:0.3,view:vPac,fly:4}],
  under:[e=>{shape(e,F('WSM'),WS,1,2);}],
  top:[e=>{const {u,sc,ctx}=e; const a=clamp((u-0.1)/0.5); const ac=clamp((u-wt(sc,'nicht.'))/0.6); const ag=clamp((u-wt(sc,'gestrichen'))/0.4);
   cal(ctx,250,(window.CAL_Y||740),'29','Donnerstag',clamp((u-wt(sc,'Donnerstag'))/0.4)); cal(ctx,540,(window.CAL_Y||740),'30','Freitag',a*(1-ag*0.4),ac); cal(ctx,830,(window.CAL_Y||740),'31','Samstag',clamp((u-wt(sc,'Samstag'))/0.4));
   chip(ctx,'In Samoa gestrichen',1180,ag,'#fff','rgba(229,72,77,0.95)');}]},
 {head:'Die Datumsgrenze', say:S_say[1], cams:[{at:0,view:vPac,fly:1.0},{at:0.4,view:{lon:-178,lat:-12,scale:700},fly:6}],
  under:[e=>{shape(e,F('WSM'),WS,1,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; idl(e,0,clamp((u-wt(sc,'Datumsgrenze'))/0.6),t); const q=P(e,[180,-30]); const al=clamp((u-wt(sc,'Westlich'))/0.4); if(al>0){label(ctx,'Westen: +1 Tag',q[0]-330,q[1],{color:'#0B1C2A',bg:'rgba(255,224,102,0.96)',alpha:al,font:`800 36px ${FD}`}); label(ctx,'Osten: −1 Tag',q[0]+40,q[1],{color:'#fff',bg:'rgba(11,28,42,0.93)',alpha:clamp((u-wt(sc,'östlich'))/0.4),font:`800 36px ${FD}`});} tag(e,WSM,'Samoa',clamp((u-wt(sc,'Samoa'))/0.4),20,-30,'#fff',32);}]},
 {head:'1892: Datum wie Amerika', say:S_say[2], cams:[{at:0,view:{lon:-178,lat:-12,scale:700},fly:1.0},{at:0.4,view:{lon:-160,lat:-5,scale:330},fly:6}],
  under:[e=>{shape(e,F('WSM'),WS,1,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; idl(e,0,1,t); const ay=clamp((u-wt(sc,'1892'))/0.4); if(ay>0) big(ctx,'1892',ay*(1-clamp((u-wt(sc,'Über hundert'))/0.4)),680,'#fff',130); pulse(e,WSM,t,1,WS,10); const q0=P(e,[-168,-12]), q1=P(e,[-130,8]); const aa=clamp((u-wt(sc,'Amerika'))/1.0); if(aa>0){const k=eout(aa); ctx.save(); ctx.strokeStyle=GOLD; ctx.fillStyle=GOLD; ctx.lineWidth=10; ctx.lineCap='round'; const x=lerp(q0[0],q1[0],k), y=lerp(q0[1],q1[1],k); ctx.beginPath(); ctx.moveTo(q0[0],q0[1]); ctx.lineTo(x,y); ctx.stroke(); ctx.restore();} chip(ctx,'Samoa: Ostseite, Datum wie die USA',1180,clamp((u-wt(sc,'Über hundert'))/0.4));}]},
 {head:'Der Handel zieht nach Westen', say:S_say[3], cams:[{at:0,view:{lon:-160,lat:-5,scale:330},fly:1.0},{at:0.4,view:vReg,fly:3.5}],
  under:[e=>{const {u,sc}=e; shape(e,F('WSM'),WS,1,2); shape(e,AUSF,AUC,clamp((u-wt(sc,'Australien'))/0.5)*0.8,2); shape(e,F('NZL'),NZC,clamp((u-wt(sc,'Neuseeland'))/0.5)*0.8,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; idl(e,0,1,t); tag(e,[134,-25],'+21 h',clamp((u-wt(sc,'21'))/0.4),-40,0,AUC,40); tag(e,[172,-41],'+23 h',clamp((u-wt(sc,'23'))/0.4),-150,0,NZC,40); pulse(e,WSM,t,1,WS,10);
   chip(ctx,'Samoa Freitag = Neuseeland Samstag',1180,clamp((u-wt(sc,'Wenn in Samoa'))/0.4)*(1-clamp((u-wt(sc,'Premierminister'))/0.4))); chip(ctx,'„Wir verlieren zwei Arbeitstage pro Woche“',1180,clamp((u-wt(sc,'Premierminister'))/0.4),'#fff','rgba(11,28,42,0.93)',32);}]},
 {head:'2011: zurück nach Westen', say:S_say[4], cams:[{at:0,view:vReg,fly:1.0},{at:0.4,view:vTK,fly:3.5}],
  under:[e=>{shape(e,F('WSM'),WS,1,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; const k=clamp((u-wt(sc,'sprang'))/1.4); idl(e,ease(k),1,t); pulse(e,WSM,t,1,WS,10); tag(e,WSM,'Samoa',1,-150,20,'#fff',30); const at=clamp((u-wt(sc,'Tokelau'))/0.4); pulse(e,TKL,t,at,GOLD,9); tag(e,TKL,'Tokelau',at,-160,-20,GOLD,30); const a2=clamp((u-wt(sc,'sprang'))/0.4)*(1-clamp((u-wt(sc,'Seitdem'))/0.4)); if(a2>0) big(ctx,'2011',a2,680,'#fff',130); chip(ctx,'fast dieselbe Uhrzeit wie Neuseeland',1180,clamp((u-wt(sc,'Seitdem'))/0.4));}]},
 {head:'Nachbarn, ein Tag dazwischen', say:S_say[5], cams:[{at:0,view:vTK,fly:1.0},{at:0.4,view:vClose,fly:3.5}],
  under:[e=>{const {u,sc}=e; shape(e,F('WSM'),WS,1,2); shape(e,F('ASM'),AS,clamp((u-wt(sc,'Amerikanisch'))/0.5),2);}],
  over:[e=>{const {u,sc,ctx,t}=e; idl(e,1,1,t); tag(e,[-172.4,-13.6],'Samoa',1,-60,-40,'#fff',32); tag(e,[-170.7,-14.3],'Amerikanisch-Samoa',clamp((u-wt(sc,'Amerikanisch'))/0.4),-140,60,'#fff',30); chip(ctx,'< 1 Flugstunde',1180,clamp((u-wt(sc,'Flugstunde'))/0.4)); chip(ctx,'aber 24 Stunden Unterschied',1250,clamp((u-wt(sc,'ganzer Tag'))/0.4),'#fff','rgba(229,72,77,0.95)');}]},
 {say:S_say[6], cams:[{at:0,view:vPac,fly:1.2},{at:1.4,view:vPac,fly:4.5}],
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
return {tag:'REKORDE #3', scenes, wt};
}
