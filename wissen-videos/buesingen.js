// Story: Grenz-Kuriositäten #6 – Büsingen
// ≈ 350 km lang, 13–65 km breit · Great Game · 1893/1895 Grenzziehung als Puffer · Nachbarn TJK, PAK, CHN (92 km) · Wachdschir-Pass 4.923 m · ≈ 18.000 Einw.
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', DE='#F5C542', CH='#FF6B6B', RH='#7FD0FF';
const G10=window.G10; const F=k=>({type:'Feature',geometry:G10[k]});
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}

const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));

const vDACH=viewBox([5,45,17,55]), vHoch=viewBox([8.0,47.35,9.4,48.0]), vBus=viewBox([8.52,47.62,8.86,47.80]), vCH=viewBox([5.5,45.6,11,48.2]);
const BUS=[8.69,47.70];
function bus(e,a,col=GOLD){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F('BUS')); ctx.globalAlpha=a*0.85; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle='#fff'; ctx.lineWidth=4; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
const scenes=[
 {head:'Deutsch in der Schweiz', headInstant:true, say:S_say[0], cams:[{at:0,view:vDACH},{at:0.3,view:vHoch,fly:3.0},{at:sc=>wt(sc,'Hier gilt')-0.3,view:vBus,fly:2.6}],
  under:[e=>{const {u,sc}=e; hl(e,'DEU',DE,0.35,{outline:false}); hl(e,'CHE',CH,0.4*clamp((u-wt(sc,'Schweiz'))/0.5),{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; bus(e,clamp((u-wt(sc,'Büsingen'))/0.5)); tag(e,[8.69,47.74],'Büsingen',clamp((u-wt(sc,'Büsingen'))/0.4),-80,-40,'#fff',34); chip(ctx,'Deutsch, aber ringsum Schweiz',1180,clamp((u-wt(sc,'rundherum'))/0.4)*(1-clamp((u-wt(sc,'Wie kann'))/0.4))); big(ctx,'Wie kann das sein?',clamp((u-wt(sc,'Wie kann'))/0.4),700,'#fff',92);}]},
 {head:'Eine deutsche Insel', say:S_say[1], cams:[{at:0,view:vBus,fly:1.0},{at:0.4,view:vHoch,fly:3.0},{at:sc=>wt(sc,'Gebiete')-0.3,view:vCH,fly:3.0}],
  under:[e=>{const {u,sc}=e; hl(e,'DEU',DE,0.35,{outline:false}); hl(e,'CHE',CH,0.4,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; bus(e,1); const a=clamp((u-wt(sc,'1810'))/0.4), b=clamp((u-wt(sc,'1871'))/0.4); if(a>0) big(ctx,'1810 · Baden',a*(1-b),680,'#fff',100); if(b>0) big(ctx,'1871 · Deutsches Reich',b*(1-clamp((u-wt(sc,'Die Gebiete'))/0.4)),680,'#fff',84); chip(ctx,'Die Schweiz umgibt das Dorf',1180,clamp((u-wt(sc,'Insel')+0.6)/0.4));}]},
 {head:'1918: Abstimmung', say:S_say[2], cams:[{at:0,view:vCH,fly:1.0},{at:0.4,view:vHoch,fly:3.0},{at:sc=>wt(sc,'passendes')-0.4,view:vBus,fly:2.5}],
  under:[e=>{hl(e,'DEU',DE,0.3,{outline:false}); hl(e,'CHE',CH,0.4,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; bus(e,1); const a=clamp((u-wt(sc,'1918'))/0.4); if(a>0){const v=Math.round(96*ease(clamp((u-wt(sc,'96'))/0.9))); big(ctx,u>wt(sc,'96')?`≈ ${v} % für die Schweiz`:'1918',a*(1-clamp((u-wt(sc,'Doch daraus'))/0.4)),680,'#fff',96);} chip(ctx,'Kein passendes Tauschland',1180,clamp((u-wt(sc,'passendes'))/0.4));}]},
 {head:'Schweizer Zollgebiet', say:S_say[3], cams:[{at:0,view:vBus,fly:1.0},{at:0.5,view:vHoch,fly:3.0}],
  under:[e=>{hl(e,'DEU',DE,0.3,{outline:false}); hl(e,'CHE',CH,0.4,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; bus(e,1); const a=clamp((u-wt(sc,'1.400'))/0.4); if(a>0){const v=Math.round(1400*ease(clamp((u-wt(sc,'1.400'))/0.9))); big(ctx,`≈ ${v.toLocaleString('de-DE')} Einwohner`,a*(1-clamp((u-wt(sc,'Zollgebiet'))/0.4)),680,'#fff',88);} chip(ctx,'Schweizer Zollgebiet',1180,clamp((u-wt(sc,'Zollgebiet'))/0.4)*(1-clamp((u-wt(sc,'Kontrollen'))/0.4))); chip(ctx,'keine Grenzkontrollen',1180,clamp((u-wt(sc,'Kontrollen'))/0.4)*(1-clamp((u-wt(sc,'Mehrwert'))/0.4))); chip(ctx,'Schweizer Mehrwertsteuer',1180,clamp((u-wt(sc,'Mehrwert'))/0.4));}]},
 {head:'Zwei Postleitzahlen', say:S_say[4], cams:[{at:0,view:vHoch,fly:1.0},{at:0.5,view:vBus,fly:3.0}],
  under:[e=>{hl(e,'DEU',DE,0.3,{outline:false}); hl(e,'CHE',CH,0.4,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; bus(e,1); const a=clamp((u-wt(sc,'zwei'))/0.4)*(1-clamp((u-wt(sc,'Autos'))/0.4)); chip(ctx,'DE-78266 · CH-8238',1180,a); const b=clamp((u-wt(sc,'KN'))/0.4); if(b>0) big(ctx,u>wt(sc,'BÜS')?'BÜS':'KN',clamp((u-wt(sc,'Autos'))/0.4),680,'#fff',150);}]},
 {head:'Ein Stück Schweiz?', say:S_say[5], cams:[{at:0,view:vBus,fly:1.0},{at:0.5,view:vDACH,fly:4.5}],
  under:[e=>{hl(e,'DEU',DE,0.3,{outline:false}); hl(e,'CHE',CH,0.4,{outline:false});}],
  over:[e=>{const {u,sc,ctx}=e; bus(e,1); chip(ctx,'deutsches Dorf, Schweizer Alltag',1180,clamp((u-wt(sc,'Schweiz')+0.6)/0.4));}]},
 {say:S_say[6], cams:[{at:0,view:vCH,fly:1.2},{at:1.4,view:vCH,fly:4.5}],
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
return {tag:'GRENZ-KURIOSITÄTEN #6', scenes, wt};
}
