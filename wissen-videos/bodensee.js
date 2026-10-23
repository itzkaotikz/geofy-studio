// Story: Grenz-Kuriositäten #4 – Der Bodensee hat keine Grenze
// 536 km², 251 m tief · Ufer D 173 / CH 72 / A 28 km · Hoher See: Grenze nie geklärt (A: Kondominium, CH: Realteilung, D: offen) · Untersee/Konstanz: Mitte · Fische herrenlos · Notruf
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const DE='#F5C542', AT='#FF6B6B', CH='#B79CFF', WATER='#7FD0FF';
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const DACH=window.DACH, LAKE=window.LAKE;
const lakeF={type:'Feature',geometry:LAKE.features[0].geometry};
const cF=k=>({type:'Feature',geometry:DACH[k]});
function land(e,k,col,a){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(cF(k)); ctx.globalAlpha=a*0.38; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.4); ctx.strokeStyle=col; ctx.lineWidth=3; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function lake(e,a=1,fill='#2F86C8',fa=0.96){const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(lakeF); ctx.globalAlpha=a*fa; ctx.fillStyle=fill; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle='#fff'; ctx.lineWidth=3.5; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
const CEN=[9.40,47.62], KONST=[9.175,47.66], UNTER=[8.98,47.70];
const vWide=viewBox([6.5,45.9,11.5,48.9]), vLake=viewBox([8.7,47.15,10.2,48.15]), vTight=viewBox([8.95,47.4,9.85,47.9]), vKon=viewBox([8.65,47.45,9.55,47.95]);
function boat(e,t,ph,sp,col='#fff'){const {ctx}=e; const a=(t*sp+ph)%1; const A=[9.18,47.66], B=[9.70,47.52], M=[9.40,47.60]; const k=a<0.5?a*2:(1-a)*2; const p0=[lerp(A[0],M[0],k),lerp(A[1],M[1],k)]; const p1=[lerp(M[0],B[0],k),lerp(M[1],B[1],k)]; const q=P(e,[lerp(p0[0],p1[0],k),lerp(p0[1],p1[1],k)]); ctx.save(); ctx.translate(q[0],q[1]); ctx.scale(1.7,1.7); ctx.fillStyle=col; ctx.strokeStyle='rgba(11,28,42,0.9)'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-16,0); ctx.lineTo(16,0); ctx.lineTo(10,10); ctx.lineTo(-10,10); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillRect(-2,-18,4,18); ctx.beginPath(); ctx.moveTo(2,-18); ctx.lineTo(16,-4); ctx.lineTo(2,-4); ctx.closePath(); ctx.fill(); ctx.restore();}
function bar(ctx,x,y,w,full,col,txt,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,x,y,820,70,16); ctx.fill(); ctx.fillStyle=col; rr(ctx,x+8,y+8,Math.max(20,(820-16)*w*eout(a)),54,10); ctx.fill(); ctx.font=`800 36px ${FD}`; ctx.textAlign='left'; ctx.lineWidth=8; ctx.strokeStyle='rgba(5,14,24,0.95)'; ctx.lineJoin='round'; ctx.strokeText(txt,x+26,y+46); ctx.fillStyle='#fff'; ctx.fillText(txt,x+26,y+46); ctx.restore();}
function qmark(ctx,x,y,a,s=1){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.scale(s,s); ctx.font=`800 110px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.lineJoin='round'; ctx.strokeText('?',0,0); ctx.fillStyle='#fff'; ctx.fillText('?',0,0); ctx.restore();}
function bubble(ctx,x,y,col,txt,sub,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y+(1-eout(a))*30); ctx.fillStyle='rgba(11,28,42,0.93)'; rr(ctx,0,0,820,130,26); ctx.fill(); ctx.fillStyle=col; rr(ctx,0,0,16,130,8); ctx.fill(); ctx.font=`800 44px ${FD}`; ctx.fillStyle=col; ctx.textAlign='left'; ctx.fillText(txt,40,56); ctx.font=`700 36px ${FB}`; ctx.fillStyle='#fff'; ctx.fillText(sub,40,106); ctx.restore();}
function fish(ctx,x,y,s,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle='#FFB74D'; ctx.strokeStyle='#0B1C2A'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-60,0); ctx.quadraticCurveTo(-10,-48,50,0); ctx.quadraticCurveTo(-10,48,-60,0); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(50,0); ctx.lineTo(90,-28); ctx.lineTo(90,28); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle='#0B1C2A'; ctx.beginPath(); ctx.arc(-30,-6,6,0,7); ctx.fill(); ctx.restore();}

const scenes=[
 {head:'Der Bodensee hat keine Grenze', headInstant:true, say:S_say[0], cams:[{at:0,view:vWide},{at:0.3,view:vLake,fly:3.2}],
  under:[e=>{const {u,sc}=e; const a=clamp((u-0.6)/0.6); land(e,'DEU',DE,a*0.8); land(e,'AUT',AT,a*0.8); land(e,'CHE',CH,a*0.8); }],
  over:[e=>lake(e,1),e=>{const {u,sc,ctx,t}=e; const td=wt(sc,'Deutschland'); tag(e,[8.95,48.0],'Deutschland',clamp((u-td)/0.35),0,0,DE,34); tag(e,[10.0,47.25],'Österreich',clamp((u-wt(sc,'Österreich'))/0.35),-30,0,AT,34); tag(e,[8.85,47.3],'Schweiz',clamp((u-wt(sc,'Schweiz'))/0.35),0,0,CH,34);
   const q=P(e,CEN); qmark(ctx,q[0],q[1]+30,clamp((u-wt(sc,'wem welcher'))/0.4),1+0.06*Math.sin(t*4));}]},
 {head:'536 km², bis zu 251 m tief', say:S_say[1], cams:[{at:0,view:vLake,fly:1.0},{at:0.5,view:vTight,fly:3.5}],
  under:[e=>{land(e,'DEU',DE,0.55); land(e,'AUT',AT,0.55); land(e,'CHE',CH,0.55); }],
  over:[e=>lake(e,1),e=>{const {u,sc,ctx}=e; const a1=clamp((u-wt(sc,'536'))/0.4)*(1-clamp((u-wt(sc,'Am Ufer'))/0.4)); big(ctx,'536 km²',a1,640,'#fff',116); const a2=clamp((u-wt(sc,'251'))/0.4)*(1-clamp((u-wt(sc,'Am Ufer'))/0.4)); big(ctx,'251 m tief',a2,790,WATER,96);
   const y0=1170; bar(ctx,130,y0,173/173,1,DE,'Deutschland  173 km',clamp((u-wt(sc,'Deutschland hat'))/0.6)); bar(ctx,130,y0+90,72/173,1,CH,'Schweiz  72 km',clamp((u-wt(sc,'Schweiz 72')+0.15)/0.6)); bar(ctx,130,y0+180,28/173,1,AT,'Österreich  28 km',clamp((u-wt(sc,'Österreich 28')+0.15)/0.6));
   const al=clamp((u-wt(sc,'Nur im offenen'))/0.4); if(al>0) label(ctx,"offenes Wasser: keine Linie",L+20,1130,{color:'#0B1C2A',bg:'rgba(255,224,102,0.96)',alpha:al,font:`800 38px ${FD}`});}]},
 {head:'Warum? Es ging auch ohne', say:S_say[2], cams:[{at:0,view:vTight,fly:1.0},{at:3,view:vLake,fly:7}],
  under:[e=>{land(e,'DEU',DE,0.45); land(e,'AUT',AT,0.45); land(e,'CHE',CH,0.45); }],
  over:[e=>lake(e,1),e=>{const {u,sc,ctx,t}=e; const ab=clamp((u-wt(sc,'fischte'))/0.3); if(ab>0){ctx.save(); ctx.globalAlpha=ab; boat(e,t,0,0.05,'#fff'); boat(e,t,0.4,0.04,'#FFE066'); boat(e,t,0.7,0.06,'#fff'); ctx.restore();}
   const a1=clamp((u-wt(sc,'Jahrhundertelang'))/0.4); if(a1>0) label(ctx,'Jahrhundertelang: keine Grenze',L+20,1180,{color:'#fff',bg:'rgba(11,28,42,0.92)',alpha:a1,font:`800 38px ${FD}`});
   const a2=clamp((u-wt(sc,'geregelt'))/0.4); if(a2>0) label(ctx,'geregelt: nur bei Ärger',L+20,1250,{color:'#0B1C2A',bg:'rgba(255,224,102,0.96)',alpha:a2,font:`800 38px ${FD}`});
   const a3=clamp((u-wt(sc,'brauchte'))/0.4); if(a3>0) label(ctx,'Grenze? Brauchte niemand',L+20,1320,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:a3,font:`800 38px ${FD}`});}]},
 {head:'Drei Länder, drei Meinungen', say:S_say[3], cams:[{at:0,view:vLake,fly:1.0},{at:0.6,view:vTight,fly:3.0},{at:sc=>wt(sc,'Deutschland sagt')-0.4,view:viewBox([8.8,47.3,10.0,48.0]),fly:2.5}],
  under:[e=>{const {u,sc}=e; const k=clamp((u-wt(sc,'Österreich sagt'))/0.5); land(e,'DEU',DE,0.45); land(e,'AUT',AT,0.45+0.25*k*(1-clamp((u-wt(sc,'Die Schweiz'))/0.4))); land(e,'CHE',CH,0.45+0.25*clamp((u-wt(sc,'Die Schweiz'))/0.5)*(1-clamp((u-wt(sc,'Deutschland sagt'))/0.4))); }],
  over:[e=>lake(e,1),e=>{const {u,sc,ctx,t}=e; bubble(ctx,130,1080,AT,'Österreich','gehört allen gemeinsam',clamp((u-wt(sc,'Österreich sagt'))/0.4)); bubble(ctx,130,1230,CH,'Schweiz','teilen wir in Stücke',clamp((u-wt(sc,'Die Schweiz'))/0.4)); bubble(ctx,130,1380,DE,'Deutschland','Frage ist offen',clamp((u-wt(sc,'Deutschland sagt'))/0.4));
   const ks=clamp((u-wt(sc,'Stücke'))/0.5); if(ks>0){const q=P(e,CEN); ctx.save(); ctx.globalAlpha=ks*0.95; ctx.strokeStyle='#fff'; ctx.lineWidth=4; ctx.setLineDash([14,10]); ctx.lineDashOffset=-t*30; [[9.18,47.66],[9.50,47.48],[9.72,47.58],[9.45,47.80]].forEach(p=>{const z=P(e,p); ctx.beginPath(); ctx.moveTo(q[0],q[1]); ctx.lineTo(q[0]+(z[0]-q[0])*ks,q[1]+(z[1]-q[1])*ks); ctx.stroke();}); ctx.restore();}
   const kq=clamp((u-wt(sc,'offen'))/0.4); const q=P(e,CEN); qmark(ctx,q[0],q[1]+30,kq,1+0.06*Math.sin(t*4));}]},
 {head:'Wie geht das im Alltag?', say:S_say[4], cams:[{at:0,view:vTight,fly:1.0},{at:0.3,view:vKon,fly:2.6},{at:sc=>wt(sc,'Im offenen See')-0.4,view:vTight,fly:2.4}],
  under:[e=>{land(e,'DEU',DE,0.45); land(e,'AUT',AT,0.45); land(e,'CHE',CH,0.45); }],
  over:[e=>lake(e,1),e=>{const {u,sc,ctx,t}=e; const ak=clamp((u-wt(sc,'Untersee'))/0.4)*(1-clamp((u-wt(sc,'Im offenen See'))/0.4)); pulse(e,KONST,t,ak,'#fff',10); tag(e,KONST,'Konstanz',ak,-190,-24,'#fff',30);
   if(ak>0) label(ctx,'Grenze in der Mitte',L+20,1180,{color:'#0B1C2A',bg:'rgba(255,224,102,0.96)',alpha:ak,font:`800 40px ${FD}`});
   const tf=wt(sc,'Fische'), af=clamp((u-tf)/0.4)*(1-clamp((u-wt(sc,'Notruf'))/0.4)); const q=P(e,CEN); fish(ctx,q[0]+Math.sin(t*1.6)*40,q[1]+10,0.9,af); if(af>0) label(ctx,'Fische: herrenlos bis zum Fang',L+20,1180,{color:'#fff',bg:'rgba(11,28,42,0.92)',alpha:af,font:`800 38px ${FD}`});
   const an=clamp((u-wt(sc,'Notruf'))/0.4); if(an>0){pulse(e,CEN,t,an,'#FF3B3B',12); label(ctx,'Notruf 112: das Land, das ihn bekommt, hilft',L+20,1180,{color:'#fff',bg:'rgba(229,72,77,0.95)',alpha:an,font:`800 36px ${FD}`});}}]},
 {head:'Grenze weg, alles klappt', say:S_say[5], cams:[{at:0,view:vTight,fly:1.0},{at:0.5,view:vWide,fly:5.5}],
  under:[e=>{land(e,'DEU',DE,0.45); land(e,'AUT',AT,0.45); land(e,'CHE',CH,0.45); }],
  over:[e=>lake(e,1),e=>{const {u,sc,ctx,t}=e; const a=clamp((u-wt(sc,'nicht gibt'))/0.5); if(a>0) {const q=P(e,CEN); qmark(ctx,q[0],q[1]+30,a*0.0,1);} label(ctx,'Grenze: nicht vorhanden ✓',L+20,1180,{color:'#0B1C2A',bg:'rgba(120,230,170,0.96)',alpha:clamp((u-wt(sc,'funktioniert'))/0.4),font:`800 40px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:vWide,fly:1.2},{at:1.4,view:vLake,fly:4.5}],
  under:[e=>{land(e,'DEU',DE,0.45); land(e,'AUT',AT,0.45); land(e,'CHE',CH,0.45); }],
  over:[e=>lake(e,1)],
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
return {tag:'GRENZ-KURIOSITÄTEN #4', scenes, wt};
}
