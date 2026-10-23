// Story: Grenz-Kuriositäten #5 – Jungholz
// Tirol (Bezirk Reutte), nur am Sorgschrofen (1.636 m) mit Tirol verbunden · 299 Einw., 7,06 km² · Kauf 1342, Grenzverträge 1844/1850 · Zollvertrag 1868 · D-Mark · PLZ 6691/87491
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const DE='#F5C542', AT='#FF6B6B', GOLD='#FFE066';
const DACH=window.DACH; const F=k=>({type:'Feature',geometry:DACH[k]});
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function pulseXY(ctx,x,y,t,a,col=C.target,r0=11){if(a<=0) return; ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(x,y,r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(x,y,r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
const pulse=(e,ll,t,a,col,r0)=>{const q=P(e,ll); pulseXY(e.ctx,q[0],q[1],t,a,col,r0);};
function land(e,k,col,a){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.4; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
const JH=[10.45,47.575];
const vWide=viewBox([5,45.6,17.5,55.2]), vAll=viewBox([9.3,46.9,11.6,48.1]), vClose=viewBox([10.15,47.42,10.75,47.72]);
// schematic panel (not to scale): Bavaria around, Tyrol below, Jungholz touching Tyrol at a single peak
const PX=100, PY=520, PW=880, PH=700;
const TIROL=[[0,470],[120,450],[230,500],[340,440],[440,400],[520,450],[640,430],[760,490],[880,460],[880,700],[0,700]];
const JUNG=[[440,400],[520,360],[565,285],[515,205],[410,190],[335,245],[345,330]];
const ROAD=[[470,290],[600,230],[720,300],[770,420],[730,560]];
function poly(ctx,pts,ox,oy){ctx.beginPath(); pts.forEach(([x,y],i)=>i?ctx.lineTo(ox+x,oy+y):ctx.moveTo(ox+x,oy+y)); ctx.closePath();}
function panel(e,a,{jung=1,peak=0,road=0,plz=0}={}){if(a<=0) return; const {ctx,t}=e; const PYv=window.PANEL_Y||PY; const s=0.96+0.04*eout(a); ctx.save(); ctx.globalAlpha=a; ctx.translate(PX+PW/2,PYv+PH/2); ctx.scale(s,s); ctx.translate(-(PX+PW/2),-(PYv+PH/2));
 ctx.save(); rr(ctx,PX,PYv,PW,PH,30); ctx.clip(); ctx.fillStyle='#8A7130'; ctx.fillRect(PX,PYv,PW,PH); ctx.fillStyle='rgba(245,197,66,0.55)'; ctx.fillRect(PX,PYv,PW,PH);
 poly(ctx,TIROL,PX,PYv); ctx.fillStyle='#8E3B3B'; ctx.fill(); ctx.fillStyle='rgba(255,107,107,0.55)'; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=4; ctx.stroke();
 if(jung>0){ctx.globalAlpha=a*jung; poly(ctx,JUNG,PX,PYv); ctx.fillStyle='#C94A4A'; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=4; ctx.stroke(); ctx.globalAlpha=a;}
 ctx.font=`800 40px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=8; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.lineJoin='round';
 const txt=(s,x,y,col='#fff',sz=40)=>{ctx.font=`800 ${sz}px ${FD}`; ctx.strokeText(s,PX+x,PYv+y); ctx.fillStyle=col; ctx.fillText(s,PX+x,PYv+y);};
 txt('Bayern (DE)',190,110,'#fff',38); txt('Tirol (AT)',220,620,'#fff',38); if(jung>0) txt('Jungholz',450,295,'#fff',36);
 if(road>0){const k=road; const n=ROAD.length-1; const pos=k*n; const ii=Math.min(n-1,Math.floor(pos)), f=pos-ii; ctx.save(); ctx.setLineDash([18,12]); ctx.strokeStyle='#fff'; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(PX+ROAD[0][0],PYv+ROAD[0][1]); for(let i=1;i<=ii;i++) ctx.lineTo(PX+ROAD[i][0],PYv+ROAD[i][1]); const cx=lerp(ROAD[ii][0],ROAD[ii+1][0],f), cy=lerp(ROAD[ii][1],ROAD[ii+1][1],f); ctx.lineTo(PX+cx,PYv+cy); ctx.stroke(); ctx.restore(); ctx.beginPath(); ctx.arc(PX+cx,PYv+cy,14,0,7); ctx.fillStyle='#fff'; ctx.fill(); ctx.strokeStyle='#0B1C2A'; ctx.lineWidth=4; ctx.stroke(); if(k>0.3) txt('Straße über Deutschland',690,200,'#fff',28);}
 if(peak>0){pulseXY(ctx,PX+440,PYv+400,t,peak,'#fff',10); ctx.globalAlpha=a*peak; txt('Sorgschrofen 1.636 m',220,380,'#fff',30); ctx.globalAlpha=a;}
 if(plz>0){ctx.globalAlpha=a*plz; label(ctx,'PLZ 6691 (AT)',PX+590,PYv+300,{color:'#fff',bg:'rgba(201,74,74,0.95)',font:`800 30px ${FD}`}); label(ctx,'PLZ 87491 (DE)',PX+590,PYv+230,{color:'#0B1C2A',bg:'rgba(245,197,66,0.96)',font:`800 30px ${FD}`}); ctx.globalAlpha=a;}
 ctx.font=`700 22px ${FB}`; ctx.fillStyle='rgba(255,255,255,0.85)'; ctx.textAlign='right'; ctx.fillText('schematisch, nicht maßstabsgetreu',PX+PW-24,PYv+PH-22);
 ctx.restore(); rr(ctx,PX,PYv,PW,PH,30); ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function timeline(ctx,a,u,ts){if(a<=0) return; const y=1340, x0=150, x1=930; ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle='rgba(255,255,255,0.8)'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x1,y); ctx.stroke();
 [['1342','Bayern → Tirol',0],['1844','Grenzvertrag',0.55],['1850','Grenzvertrag',0.95]].forEach(([yr,tx,p],i)=>{const k=clamp((u-ts[i])/0.4); if(k<=0) return; const x=x0+(x1-x0)*(0.06+p*0.88); ctx.globalAlpha=a*k; ctx.beginPath(); ctx.arc(x,y,14,0,7); ctx.fillStyle=GOLD; ctx.fill(); ctx.font=`800 40px ${FD}`; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.lineWidth=8; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.strokeText(yr,x,y-34); ctx.fillText(yr,x,y-34); ctx.font=`700 26px ${FB}`; ctx.strokeText(tx,x,y+50); ctx.fillText(tx,x,y+50);}); ctx.restore();}
const scenes=[
 {head:'Nur an einem Punkt verbunden', headInstant:true, say:S_say[0], cams:[{at:0,view:vWide},{at:0.3,view:vAll,fly:3.4},{at:sc=>wt(sc,'einzigen')-0.3,view:vClose,fly:2.4}],
  under:[e=>{const {u,sc}=e; const a=clamp((u-wt(sc,'Österreich'))/0.5); land(e,'AUT',AT,a); land(e,'DEU',DE,a*0.8);}],
  over:[e=>{const {u,sc,ctx,t}=e; const ap=clamp((u-wt(sc,'Dieses Dorf'))/0.4); pulse(e,JH,t,ap,'#fff',11); chip(ctx,'nur an einem Punkt mit Österreich verbunden',1180,clamp((u-wt(sc,'einzigen'))/0.4),'#0B1C2A','rgba(255,224,102,0.96)',34);}]},
 {head:'Jungholz in Tirol', say:S_say[1], cams:[{at:0,view:vClose,fly:1.0},{at:0.4,view:vAll,fly:6}],
  under:[e=>{land(e,'AUT',AT,0.8); land(e,'DEU',DE,0.6);}],
  over:[e=>{const {u,sc,ctx,t}=e; panel(e,clamp((u-0.2)/0.5)); const a1=clamp((u-wt(sc,'300'))/0.4); chip(ctx,'≈ 300 Einwohner',1290,a1); chip(ctx,'≈ 7 km²',1360,clamp((u-wt(sc,'sieben'))/0.4),'#fff','rgba(11,28,42,0.93)'); chip(ctx,'fast ringsum: Bayern',1430,clamp((u-wt(sc,'Bayern'))/0.4),'#0B1C2A','rgba(245,197,66,0.96)');}]},
 {head:'Ein Gipfel als Verbindung', say:S_say[2], cams:[{at:0,view:vAll,fly:1.0},{at:0.5,view:vClose,fly:7}],
  under:[e=>{land(e,'AUT',AT,0.8); land(e,'DEU',DE,0.6);}],
  over:[e=>{const {u,sc,ctx}=e; panel(e,1,{peak:clamp((u-wt(sc,'Sorgschrofen'))/0.4),road:clamp((u-wt(sc,'mit dem Auto'))/2.2)}); chip(ctx,'1.636 m',1290,clamp((u-wt(sc,'1.636'))/0.4));}]},
 {head:'Wie kam es dazu?', say:S_say[3], cams:[{at:0,view:vClose,fly:1.0},{at:0.5,view:vAll,fly:7}],
  under:[e=>{land(e,'AUT',AT,0.8); land(e,'DEU',DE,0.6);}],
  over:[e=>{const {u,sc,ctx}=e; panel(e,1,{peak:0.6}); timeline(ctx,clamp((u-wt(sc,'1342'))/0.4),u,[wt(sc,'1342'),wt(sc,'1844'),wt(sc,'1850')]);}]},
 {head:'Wirtschaftlich deutsch', say:S_say[4], cams:[{at:0,view:vAll,fly:1.0},{at:0.5,view:vClose,fly:8}],
  under:[e=>{land(e,'AUT',AT,0.8); land(e,'DEU',DE,0.6);}],
  over:[e=>{const {u,sc,ctx}=e; panel(e,1,{plz:clamp((u-wt(sc,'zwei Postleitzahlen'))/0.4)}); chip(ctx,'seit 1868: deutsches Zollgebiet',1290,clamp((u-wt(sc,'1868'))/0.4)); chip(ctx,'bis zum Euro: D-Mark',1360,clamp((u-wt(sc,'D-Mark'))/0.4),'#fff','rgba(11,28,42,0.93)');}]},
 {head:'Nur über Deutschland', say:S_say[5], cams:[{at:0,view:vClose,fly:1.0},{at:0.4,view:vWide,fly:5}],
  under:[e=>{land(e,'AUT',AT,0.8); land(e,'DEU',DE,0.6);}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,JH,t,1,'#fff',10); chip(ctx,'erreichbar nur über Deutschland',1180,clamp((u-wt(sc,'erreicht'))/0.4)); chip(ctx,'und trotzdem: Teil Tirols',1250,clamp((u-wt(sc,'trotzdem'))/0.4),'#fff','rgba(201,74,74,0.95)');}]},
 {say:S_say[6], cams:[{at:0,view:vAll,fly:1.2},{at:1.4,view:vAll,fly:4.5}],
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
return {tag:'GRENZ-KURIOSITÄTEN #5', scenes, wt};
}
