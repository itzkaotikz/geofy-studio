// Story: Warum ist …? #4 – Warum gehört Alaska zu den USA?
// 30.03.1867, 7,2 Mio. $, ≈ 4,74 $/km², ≈ 132 Mio. $ (2024) · Krimkrieg, Briten in Kanada, Seeotter · „Seward's Icebox“ · ≈ 4,2 × Deutschland · Diomedes 3,8 km, 21 h
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,mainPart,label,rr,fit,hl}=KV;
const BY=KV.byId();
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function counter(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function moved(geom,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:geom.type,coordinates:mp(geom.coordinates)}};}
const USg=BY.get('USA').geometry; const AK={type:'Feature',geometry:{type:'MultiPolygon',coordinates:USg.coordinates.filter(c=>{const g=d3.geoCentroid({type:'Polygon',coordinates:c}); return g[1]>50&&(g[0]<-129||g[0]>165);})}};
const RU='#E5484D', US='#4F8DFF', GOLD='#FFE066', ICE='#9FD8F5';
function ak(e,col,a){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(AK); ctx.globalAlpha=a*0.55; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=4; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
const DEU=mainPart('DEU').geometry, dC=d3.geoCentroid(mainPart('DEU'));
const DE4=[[-158.5,68.6],[-144.5,68.4],[-157,61.4],[-144,61.8]];
const SITKA=[-135.33,57.05], SPB=[30.3,59.9], KRIM=[34.1,44.9], NOME=[-165.4,64.5], JUN=[-134.4,58.3], PRU=[-148.3,70.3], BIG=[-169.05,65.78], LIT=[-168.95,65.75];
const vAk=viewBox([-172,51,-128,72]), vAkW=viewBox([-180,45,-115,73]), vNP={lon:-170,lat:55,scale:260}, vBer=viewBox([-176,62.5,-161,68.5]);

function card(ctx,a,u){if(a<=0) return; const X=150,Y=560,Wd=680,Hd=500; ctx.save(); ctx.globalAlpha=a; ctx.translate(X+Wd/2,Y+Hd/2); ctx.rotate(-0.04); ctx.translate(-Wd/2,-Hd/2);
 ctx.fillStyle='#EFE6D2'; ctx.fillRect(0,0,Wd,Hd); ctx.strokeStyle='#3B2A20'; ctx.lineWidth=4; ctx.strokeRect(14,14,Wd-28,Hd-28);
 ctx.fillStyle='#3B2A20'; ctx.font=`800 26px ${FB}`; ctx.textAlign='center'; ctx.fillText('NEW YORK · 1867',Wd/2,62); ctx.fillRect(40,80,Wd-80,4);
 ctx.font=`800 70px ${FD}`; ctx.fillText('„Seward’s',Wd/2,170); ctx.fillText('Icebox“',Wd/2,250);
 ctx.font=`700 28px ${FB}`; ctx.fillText('= Sewards Eisschrank',Wd/2,300);
 // ice cube
 ctx.save(); ctx.translate(Wd/2,390); ctx.rotate(Math.sin(u*2)*0.08); ctx.fillStyle=ICE; ctx.strokeStyle='#5A8FB0'; ctx.lineWidth=4; rr(ctx,-55,-55,110,110,16); ctx.fill(); ctx.stroke(); ctx.fillStyle='rgba(255,255,255,0.7)'; rr(ctx,-38,-40,30,20,6); ctx.fill(); ctx.restore();
 ctx.restore();}

const scenes=[
 {head:'Warum gehört Alaska zu den USA?', headInstant:true, say:S_say[0], cams:[{at:0,view:vNP},{at:0.3,view:vAkW,fly:2.4},{at:sc=>wt(sc,'Russland')-0.4,view:vAk,fly:2.0}],
  under:[e=>{const {u,sc}=e; const tr=wt(sc,'Russland'); const toRU=clamp((u-tr)/0.4), back=clamp((u-wt(sc,'7,2'))/0.6); hl(e,'RUS',RU,0.35*toRU,{outline:false});
   ak(e,US,clamp((u-0.4)/0.5)*(1-toRU*(1-back))); ak(e,RU,toRU*(1-back));}],
  over:[e=>{const {u,sc,ctx}=e; tag(e,[-152,64],'Alaska',clamp((u-0.4)/0.4),-50,0,'#fff',38);
   const ap=clamp((u-wt(sc,'7,2'))/0.4); if(ap>0){ctx.save(); ctx.globalAlpha=ap; ctx.translate(540,1170); ctx.rotate(-0.06); ctx.fillStyle=GOLD; ctx.beginPath(); ctx.moveTo(-230,-50); ctx.lineTo(200,-50); ctx.lineTo(250,0); ctx.lineTo(200,50); ctx.lineTo(-230,50); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.arc(190,0,10,0,7); ctx.fillStyle='#0B1C2A'; ctx.fill();
    ctx.font=`800 56px ${FD}`; ctx.fillStyle='#0B1C2A'; ctx.textAlign='center'; ctx.fillText('7,2 Mio. $',-20,20); ctx.restore();}}]},
 {head:'Ein Schnäppchen', say:S_say[1], cams:[{at:0,view:vAk,fly:1.0},{at:2,view:vAkW,fly:6}],
  under:[e=>{ak(e,US,0.8);}],
  over:[e=>{const {u,sc,ctx}=e; counter(ctx,'1867',clamp((u-0.1)/0.4)*(1-clamp((u-wt(sc,'Pro'))/0.4)));
   const ak2=clamp((u-wt(sc,'Quadratkilometer'))/0.4); if(ak2>0) counter(ctx,'< 5 $ pro km²',ak2*(1-clamp((u-wt(sc,'Selbst'))/0.4)),700,GOLD,96);
   const th=wt(sc,'130'), kh=ease(clamp((u-th+0.6)/1.2)); if(kh>0) counter(ctx,`≈ ${Math.round(130*kh)} Mio. $`,clamp((u-th+0.6)/0.3),700,'#fff',110);
   const al=clamp((u-wt(sc,'heutigem'))/0.4); if(al>0) label(ctx,'in heutigem Geld',L+20,1250,{alpha:al,font:`800 38px ${FD}`});}]},
 {head:'Warum verkaufte Russland?', say:S_say[2], cams:[{at:0,view:vAkW,fly:1.0},{at:sc=>wt(sc,'Krimkrieg')-0.5,view:{lon:100,lat:58,scale:130},fly:2.6},{at:sc=>wt(sc,'Briten')-0.4,view:viewBox([-175,40,-55,73]),fly:2.0},{at:sc=>wt(sc,'Seeotter')-0.4,view:vAk,fly:2.0}],
  under:[e=>{const {u,sc}=e; hl(e,'RUS',RU,0.35); ak(e,RU,0.7); hl(e,'CAN','#B79CFF',0.6*clamp((u-wt(sc,'Briten'))/0.5));}],
  over:[e=>{const {u,sc,ctx,t}=e; const tk=wt(sc,'Krimkrieg'); const ak3=clamp((u-tk)/0.4)*(1-clamp((u-wt(sc,'weit weg'))/0.4)); if(ak3>0) label(ctx,'Krimkrieg 1853–1856 verloren',L+20,1180,{color:'#fff',bg:'rgba(11,28,42,0.92)',alpha:ak3,font:`800 38px ${FD}`});
   const ag=clamp((u-wt(sc,'Geld'))/0.4)*(1-clamp((u-wt(sc,'weit weg'))/0.4)); if(ag>0) label(ctx,'Russland braucht Geld',L+20,1250,{color:'#fff',bg:'rgba(229,72,77,0.95)',alpha:ag,font:`800 40px ${FD}`});
   const tw=wt(sc,'weit weg'), kw=clamp((u-tw+0.2)/1.6), kf=1-clamp((u-wt(sc,'Seeotter'))/0.4); if(kw>0&&kf>0){ctx.save(); ctx.globalAlpha=kf;const ip=d3.geoInterpolate(SPB,SITKA); ctx.save(); ctx.setLineDash([16,10]); ctx.strokeStyle=GOLD; ctx.lineWidth=6; ctx.beginPath(); e.path({type:'LineString',coordinates:d3.range(0,1.0001,0.02).map(x=>ip(x*eout(kw)))}); ctx.stroke(); ctx.restore();
    pulse(e,SPB,t,1,'#fff',9); tag(e,SPB,'St. Petersburg',1,-120,40,'#fff',26); if(kw>=1){pulse(e,SITKA,t,1,GOLD,10); label(ctx,`≈ ${Math.round(d3.geoDistance(SPB,SITKA)*6371/100)*100} km bis Sitka`.replace(/\B(?=(\d{3})+(?!\d))/g,'.'),L+20,1180,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',font:`800 36px ${FD}`});} ctx.restore();}
   const ab=clamp((u-wt(sc,'Briten'))/0.4)*(1-clamp((u-wt(sc,'Seeotter'))/0.4)); tag(e,[-105,60],'Kanada: britisch',ab,-90,0,'#B79CFF',32);
   const ao=clamp((u-wt(sc,'Seeotter'))/0.4); if(ao>0) label(ctx,'Seeotter: fast ausgerottet ✕',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ao,font:`800 38px ${FD}`});}]},
 {head:'Sewards Eisschrank', say:S_say[3], cams:[{at:0,view:vAk,fly:1.0},{at:0.5,view:vAkW,fly:6}],
  under:[e=>{ak(e,US,0.6);}],
  top:[e=>{const {u,sc,ctx}=e; card(ctx,clamp((u-wt(sc,'Spötter'))/0.5),u); const au=clamp((u-wt(sc,'Unsinn'))/0.4)*(1-clamp((u-wt(sc,'Spötter'))/0.4)); if(au>0) label(ctx,'„Was für ein Unsinn!“',L+20,1250,{alpha:au,font:`800 40px ${FD}`});}]},
 {head:'Gold, Öl und viel Platz', say:S_say[4], cams:[{at:0,view:vAkW,fly:1.0},{at:0.4,view:vAk,fly:2.0}],
  under:[e=>{ak(e,US,0.6);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tg=wt(sc,'Gold'), to=wt(sc,'Öl'), td=wt(sc,'viermal');
   [[NOME,'Gold'],[JUN,'Gold']].forEach(([p,n],i)=>{const a=clamp((u-tg-i*0.2)/0.4)*(1-clamp((u-td)/0.5)); pulse(e,p,t,a,GOLD,11); tag(e,p,n,a,18,-30,GOLD,28);});
   const ao=clamp((u-to)/0.4)*(1-clamp((u-td)/0.5)); pulse(e,PRU,t,ao,'#1B1B1B',11); tag(e,PRU,'Öl',ao,18,-30,'#fff',28);
   let n=0; DE4.forEach((p,i)=>{const k=clamp((u-td-i*0.3)/0.35); if(k<=0) return; n++; const g=moved(DEU,dC,p); ctx.save(); ctx.beginPath(); e.path(g); ctx.globalAlpha=k*0.7; ctx.fillStyle=C.target; ctx.fill(); ctx.globalAlpha=k; ctx.strokeStyle='#fff'; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore();});
   if(n>0) label(ctx,`${n} × Deutschland passt hinein`,L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',font:`800 40px ${FD}`});}]},
 {head:'Russland ist ganz nah', say:S_say[5], cams:[{at:0,view:vAk,fly:1.0},{at:0.6,view:viewBox([-180,58,-150,70]),fly:2.4},{at:sc=>wt(sc,'Diomedes')-0.4,view:vBer,fly:2.2}],
  under:[e=>{hl(e,'RUS',RU,0.45); ak(e,US,0.6);}],
  over:[e=>{const {u,sc,ctx,t}=e; const td=wt(sc,'Diomedes'); const a=clamp((u-td)/0.4); pulse(e,BIG,t,a,RU,9); pulse(e,LIT,t,a,US,9); tag(e,BIG,'Russland',a,-180,-30,RU,28); tag(e,LIT,'USA',a,24,30,US,28);
   const ad=clamp((u-wt(sc,'Kilometer'))/0.4); if(ad>0){const p=P(e,[-168.98,64.5]), q=P(e,[-168.98,67.2]); ctx.save(); ctx.globalAlpha=ad; ctx.setLineDash([12,10]); ctx.strokeStyle='#fff'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(q[0],q[1]); ctx.stroke(); ctx.restore(); tag(e,[-168.98,67.0],'Datumsgrenze',ad,-90,-20,'#fff',24);
    label(ctx,'nur 3,8 km Abstand',L+20,1180,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:ad,font:`800 38px ${FD}`});}
   const az=clamp((u-wt(sc,'ganzer Tag'))/0.4); if(az>0) label(ctx,'aber 21 Stunden Zeitunterschied',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:az,font:`800 38px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:vBer,fly:1.2},{at:1.4,view:vNP,fly:4.5}],
  under:[e=>{hl(e,'RUS',RU,0.35); ak(e,US,0.6);}],
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
return {tag:'WARUM IST …? #4', scenes, wt};
}
