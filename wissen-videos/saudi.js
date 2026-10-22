// Story: Rekorde #2 – Das größte Land ohne Fluss (Saudi-Arabien)
// ≈ 2,15 Mio km² ≈ 6 × Deutschland · Arabische Halbinsel ohne dauerhaften Fluss, auch Libyen · ≈ 50 % Trinkwasser aus Entsalzung, ≈ 40 % fossiles Grundwasser · Weizen bis 2016
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
function counter(ctx,txt,a,y=680,col='#fff',size=120){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function moved(geom,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:geom.type,coordinates:mp(geom.coordinates)}};}
function rivers(e,names,a){if(a<=0) return; const R=window.RIV||{}; const {ctx,path}=e; ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle='#7FD3FF'; ctx.shadowColor='#7FD3FF'; ctx.shadowBlur=14; ctx.lineWidth=6; ctx.lineCap='round'; ctx.lineJoin='round'; names.forEach(n=>{if(R[n]){ctx.beginPath(); path(R[n]); ctx.stroke();}}); ctx.restore();}
const SAND='#F2B66D', WATER='#7FD3FF';
const DEU=mainPart('DEU').geometry, dC=d3.geoCentroid(mainPart('DEU'));
const DE_SPOTS=[[41.5,27.6],[47.5,26.6],[44.5,23.6],[50.2,22.4],[46.2,19.6],[40.6,22.8]];
const PEN=['SAU','YEM','OMN','ARE','QAT','KWT','BHR'].filter(id=>BY.has(id));
const WADIS=[[[40.2,26.2],[42.5,26.5],[44.8,26.9],[46.9,27.4]],[[42.6,19.4],[43.2,20.6],[43.9,22.3]],[[44.4,20.3],[46.0,20.5],[48.0,21.2],[50.0,21.8]],[[46.45,25.0],[46.6,24.6],[46.85,24.3]],[[38.8,24.6],[40.1,24.9],[41.5,25.3]]];
const DESAL=[[49.66,27.0,''],[49.25,27.48,'Ras al-Chair'],[39.17,21.5,'Dschidda'],[42.0,17.7,'Shuqaiq'],[38.06,24.09,'Yanbu']];
const PC=[[39.8,29.8],[37.0,28.5],[41.8,27.5],[38.6,30.6]]; const PIVOT=[]; PC.forEach(([x,y],c)=>{for(let i=0;i<9;i++) PIVOT.push([x+(i%3-1)*0.32+((i*7+c)%5-2)*0.04,y+(Math.floor(i/3)-1)*0.28+((i*3+c)%4-1.5)*0.03]);});
const vMid=viewBox([20,8,64,38]), vSau=viewBox([34,15,57,33]), vPen=viewBox([33,11,61,32]), vLby=viewBox([8,18,57,34]), vRiv=viewBox([24,12,52,38]), vNorth=viewBox([34,26,44,32]);

function section(ctx,a,u,tl,tf){if(a<=0) return; const X=100,Y=520,Wd=780,Hd=600; ctx.save(); ctx.globalAlpha=a; ctx.translate(X,Y); ctx.save(); rr(ctx,0,0,Wd,Hd,30); ctx.clip();
 const g=ctx.createLinearGradient(0,0,0,Hd*0.3); g.addColorStop(0,'#2a5c8a'); g.addColorStop(1,'#7fb3d9'); ctx.fillStyle=g; ctx.fillRect(0,0,Wd,Hd*0.3);
 ctx.fillStyle='#E7C07A'; ctx.beginPath(); ctx.moveTo(0,Hd*0.3); for(let x=0;x<=Wd;x+=20) ctx.lineTo(x,Hd*0.3-14*Math.sin(x/60)-8*Math.sin(x/23)); ctx.lineTo(Wd,Hd); ctx.lineTo(0,Hd); ctx.closePath(); ctx.fill();
 ['#D9A95F','#C9934D','#B47E3F','#9D6B35'].forEach((c,i)=>{ctx.fillStyle=c; ctx.fillRect(0,Hd*(0.38+i*0.08),Wd,Hd*0.08);});
 const drop=clamp((u-tf)/2.2), top=Hd*(0.7+0.08*drop); ctx.fillStyle='#2F7DD1'; ctx.fillRect(0,top,Wd,Hd-top); ctx.fillStyle='rgba(255,255,255,0.2)'; for(let i=0;i<30;i++) ctx.fillRect((i*97)%Wd,top+10+(i*53)%(Hd-top-10),20,6);
 ctx.strokeStyle='#5A6B78'; ctx.lineWidth=10; ctx.beginPath(); ctx.moveTo(Wd*0.7,Hd*0.26); ctx.lineTo(Wd*0.7,top+20); ctx.stroke(); ctx.fillStyle='#5A6B78'; ctx.fillRect(Wd*0.7-30,Hd*0.2,60,30);
 ctx.font=`800 32px ${FD}`; ctx.fillStyle='#fff'; ctx.fillText('Wüste',30,Hd*0.36); ctx.globalAlpha=a*clamp((u-tl)/0.4); ctx.fillStyle='#fff'; ctx.fillText('Grundwasser · Tausende Jahre alt',30,top+50); ctx.globalAlpha=a;
 ctx.restore(); rr(ctx,0,0,Wd,Hd,30); ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}

const scenes=[
 {head:'Sechsmal Deutschland, kein Fluss', headInstant:true, say:S_say[0], cams:[{at:0,view:vMid},{at:0.3,view:vSau,fly:2.4},{at:sc=>wt(sc,'Fluss')-0.4,view:vRiv,fly:2.0}],
  under:[e=>{const {u}=e; hl(e,'SAU',SAND,0.7*clamp((u-0.3)/0.5));}],
  over:[e=>{const {u,sc,ctx}=e; const t6=wt(sc,'sechsmal'), tf=wt(sc,'Fluss'); let n=0;
   DE_SPOTS.forEach((p,i)=>{const k=clamp((u-t6-i*0.25)/0.35); if(k<=0) return; n++; const a=k*(1-clamp((u-tf)/0.6)*0.85); const g=moved(DEU,dC,p); ctx.save(); ctx.beginPath(); e.path(g); ctx.globalAlpha=a*0.75; ctx.fillStyle=C.target; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle='#fff'; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore();});
   if(n>0&&!window.NO_COUNTER) counter(ctx,`${n} × Deutschland`,clamp((u-t6)/0.4)*(1-clamp((u-tf)/0.5)),700,'#fff',90);
   rivers(e,['Nile','Euphrates','Tigris','Shatt al Arab'],clamp((u-tf)/0.6)); tag(e,[31.2,26],'Nil',clamp((u-tf-0.2)/0.4),-30,0,WATER,30); tag(e,[44,33.5],'Euphrat & Tigris',clamp((u-tf-0.4)/0.4),-120,-30,WATER,30);
   const af=clamp((u-wt(sc,'ganze Jahr'))/0.4); if(af>0) label(ctx,'in Saudi-Arabien: 0 dauerhafte Flüsse',L+10,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:af,font:`800 36px ${FD}`});}]},
 {head:'Saudi-Arabien', say:S_say[1], cams:[{at:0,view:vRiv,fly:1.0},{at:0.3,view:vSau,fly:2.2},{at:sc=>wt(sc,'Wadis')-0.3,view:viewBox([37,18,51,30]),fly:2.2}],
  under:[e=>{hl(e,'SAU',SAND,0.75);}],
  over:[e=>{const {u,sc,ctx,t}=e; rivers(e,['Nile','Euphrates','Tigris','Shatt al Arab'],0.6*(1-clamp(u/1.2)));
   const ag=clamp((u-wt(sc,'größte'))/0.4); if(ag>0) label(ctx,'größtes Land ohne dauerhaften Fluss',L+10,1180,{color:'#0B1C2A',bg:'rgba(242,182,109,0.95)',alpha:ag,font:`800 36px ${FD}`});
   const tw=wt(sc,'Wadis'); WADIS.forEach((w,i)=>{const k=clamp((u-tw-i*0.2)/0.5); if(k<=0) return; const fl=0.75+0.25*Math.max(0,Math.sin((t*2.2)+i*1.7)); ctx.save(); ctx.globalAlpha=k*fl; ctx.setLineDash([16,10]); ctx.strokeStyle=WATER; ctx.lineWidth=8; ctx.lineCap='round'; ctx.shadowColor=WATER; ctx.shadowBlur=10; ctx.beginPath(); e.path({type:'LineString',coordinates:w}); ctx.stroke(); ctx.restore();});
   const aw=clamp((u-wt(sc,'Täler'))/0.4); if(aw>0) label(ctx,'Wadi = Tal, das nur nach Regen Wasser führt',L+10,1250,{alpha:aw,font:`800 32px ${FD}`});}]},
 {head:'Eine ganze Halbinsel ohne Fluss', say:S_say[2], cams:[{at:0,view:vSau,fly:1.0},{at:sc=>wt(sc,'Arabischen')-0.3,view:vPen,fly:2.0},{at:sc=>wt(sc,'Libyen')-0.4,view:vLby,fly:2.0}],
  under:[e=>{const {u,sc}=e; const ap=clamp((u-wt(sc,'Arabischen'))/0.5); hl(e,'SAU',SAND,0.75); PEN.slice(1).forEach(id=>hl(e,id,SAND,0.75*ap)); hl(e,'LBY',SAND,0.75*clamp((u-wt(sc,'Libyen'))/0.5));}],
  over:[e=>{const {u,sc,ctx}=e; const ap=clamp((u-wt(sc,'Arabischen'))/0.4); if(ap>0) label(ctx,'Arabische Halbinsel: kein dauerhafter Fluss',L+10,1180,{alpha:ap,font:`800 32px ${FD}`});
   tag(e,[17,27],'Libyen',clamp((u-wt(sc,'Libyen'))/0.4),-50,0,SAND,36); rivers(e,['Nile'],0.5*clamp((u-wt(sc,'Libyen'))/0.5));}]},
 {head:'Woher kommt das Wasser?', say:S_say[3], cams:[{at:0,view:vLby,fly:1.0},{at:0.3,view:vSau,fly:2.2},{at:sc=>wt(sc,'entsalztem')-0.5,view:viewBox([35,16,53,30]),fly:2.4}],
  under:[e=>{hl(e,'SAU',SAND,0.6);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tm=wt(sc,'30 Millionen'), km=ease(clamp((u-tm+0.5)/1.2)); counter(ctx,`> ${Math.round(30*km)} Mio. Menschen`,clamp((u-tm+0.5)/0.4)*(1-clamp((u-wt(sc,'Hälfte'))/0.5)),700,'#fff',80);
   const th=wt(sc,'Meer gewonnen'); DESAL.forEach(([x,y,n],i)=>{const a=clamp((u-th-i*0.2)/0.4); pulse(e,[x,y],t,a,WATER,9); if(n) tag(e,[x,y],n,a,18,-26,WATER,24);});
   const ah=clamp((u-wt(sc,'Hälfte'))/0.4); if(ah>0) label(ctx,'≈ 50 % des Trinkwassers aus dem Meer',L+10,1180,{color:'#0B1C2A',bg:'rgba(127,211,255,0.95)',alpha:ah,font:`800 36px ${FD}`});
   const ae=clamp((u-wt(sc,'entsalztem'))/0.4); if(ae>0) label(ctx,'Meerwasser-Entsalzung',L+10,1250,{alpha:ae,font:`800 36px ${FD}`});}]},
 {head:'Wasser aus der Tiefe', say:S_say[4], cams:[{at:0,view:viewBox([35,16,53,30]),fly:1.0},{at:0.5,view:vSau,fly:5}],
  under:[e=>{hl(e,'SAU',SAND,0.5);}],
  top:[e=>{const {u,sc}=e; section(e.ctx,clamp((u-0.2)/0.5),u,wt(sc,'Grundwasser'),wt(sc,'kaum wieder'));}]},
 {head:'Weizen in der Wüste', say:S_say[5], cams:[{at:0,view:vSau,fly:1.0},{at:sc=>wt(sc,'Weizen')-0.4,view:vNorth,fly:2.2},{at:sc=>wt(sc,'Heute')-0.3,view:viewBox([36,25,48,33]),fly:2.4}],
  under:[e=>{hl(e,'SAU',SAND,0.35);}],
  over:[e=>{const {u,sc,ctx}=e; const tw=wt(sc,'Weizen'), tg=wt(sc,'grünen Kreisen'), th=wt(sc,'eingestellt'); const r=Math.max(16,e.v.scale/400);
   PIVOT.forEach((p,i)=>{const k=clamp((u-tw-i*0.05)/0.4); if(k<=0) return; const q=P(e,p); const dead=clamp((u-th-i*0.05)/0.6); ctx.save(); ctx.globalAlpha=k; ctx.beginPath(); ctx.arc(q[0],q[1],r*eout(k),0,7);
    ctx.fillStyle=dead>0?`rgba(${Math.round(lerp(80,200,dead))},${Math.round(lerp(200,170,dead))},${Math.round(lerp(90,120,dead))},0.95)`:'rgba(80,200,90,0.95)'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.6)'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();});
   const ay=clamp((u-wt(sc,'1980er'))/0.4)*(1-clamp((u-th)/0.4)); if(ay>0) label(ctx,'1980er/90er: Weizen mit Grundwasser',L+10,1180,{color:'#0B1C2A',bg:'rgba(127,203,143,0.95)',alpha:ay,font:`800 34px ${FD}`});
   const ag=clamp((u-tg)/0.4)*(1-clamp((u-th)/0.4)); if(ag>0) label(ctx,'Bewässerungskreise, aus dem All sichtbar',L+10,1250,{alpha:ag,font:`800 32px ${FD}`});
   const ae=clamp((u-th)/0.4); if(ae>0) label(ctx,'Heute weitgehend eingestellt',L+10,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:ae,font:`800 38px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:viewBox([36,25,48,33]),fly:1.2},{at:1.4,view:vMid,fly:4.5}],
  under:[e=>{hl(e,'SAU',SAND,0.6);}],
  over:[e=>{rivers(e,['Nile','Euphrates','Tigris','Shatt al Arab'],0.7);}],
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
return {tag:'REKORDE #2', scenes, wt};
}
