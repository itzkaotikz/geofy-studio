// Story: Warum ist …? #7 – Niederlande unter dem Meeresspiegel
// ≈ 350 km lang, 13–65 km breit · Great Game · 1893/1895 Grenzziehung als Puffer · Nachbarn TJK, PAK, CHN (92 km) · Wachdschir-Pass 4.923 m · ≈ 18.000 Einw.
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', OR='#FF9F43', WA='#7FD0FF', DK='#FFB74D', RED='#E5484D';
const G10=window.G10; const F=k=>({type:'Feature',geometry:G10[k]});
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}

const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));



const vNL=viewBox([2.6,50.6,7.6,53.8]), vIJ=viewBox([4.4,52.0,6.2,53.4]), vZE=viewBox([3.0,51.15,4.8,52.0]), vNLw=viewBox([1.5,50.0,8.5,54.2]);
const AFS=[[5.043,52.936],[5.397,53.073]];
function stroke(e,k,col,a,w=5,dash=null){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineJoin='round'; if(dash) ctx.setLineDash(dash); ctx.stroke(); ctx.restore();}
const scenes=[
 {head:'Tiefliegende Länder', headInstant:true, say:S_say[0], cams:[{at:0,view:vNLw},{at:0.3,view:vNL,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'NLD',OR,clamp((u-wt(sc,'Niederlande'))/0.5));}],
  over:[e=>{const {u,sc,ctx}=e; chip(ctx,'> 1/4 unter dem Meeresspiegel',1180,clamp((u-wt(sc,'Viertel'))/0.4)*(1-clamp((u-wt(sc,'Der Name'))/0.4))); const a=clamp((u-wt(sc,'tiefliegende'))/0.4); if(a>0) big(ctx,'„tiefliegende Länder“',a*(1-clamp((u-wt(sc,'Warum leben'))/0.4)),680,'#fff',84); big(ctx,'Warum trotzdem bewohnt?',clamp((u-wt(sc,'Warum leben'))/0.4),700,'#fff',80);}]},
 {head:'Delta von Rhein, Maas, Schelde', say:S_say[1], cams:[{at:0,view:vNL,fly:1.0},{at:0.5,view:vNLw,fly:3.2}],
  under:[e=>{fill(e,'NLD',OR,0.35);}],
  over:[e=>{const {u,sc,ctx}=e; const r=clamp((u-wt(sc,'Rhein'))/1.2); if(r>0){ctx.save(); ctx.globalAlpha=r; ctx.beginPath(); e.path(F('RIV')); ctx.strokeStyle=WA; ctx.lineWidth=5; ctx.stroke(); ctx.restore();} tag(e,[3.2,52.8],'Nordsee',clamp((u-wt(sc,'Nordsee'))/0.4),-170,0,'#fff',34); stroke(e,'NLD','#fff',clamp((u-wt(sc,'Deiche'))/0.6),5,[16,10]); chip(ctx,'Deiche gegen die Nordsee (schematisch)',1180,clamp((u-wt(sc,'Deiche'))/0.4)); chip(ctx,'flach, feucht, nah am Meer',1180,clamp((u-wt(sc,'flach'))/0.4)*(1-clamp((u-wt(sc,'Deiche'))/0.4)));}]},
 {head:'Land aus dem Wasser', say:S_say[2], cams:[{at:0,view:vNLw,fly:1.0},{at:0.5,view:vNL,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'NLD',OR,0.3); fill(e,'FLE',GOLD,clamp((u-wt(sc,'Polder'))/0.8)); fill(e,'ZEE',GOLD,0.0);}],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'13.'))/0.4); if(a>0) big(ctx,'seit dem 13. Jh.',a*(1-clamp((u-wt(sc,'Polder'))/0.5)),680,'#fff',100); chip(ctx,'Windmühlen pumpen Wasser ab',1180,clamp((u-wt(sc,'Windmühlen'))/0.4)*(1-clamp((u-wt(sc,'Polder'))/0.4))); chip(ctx,'Polder: eingedeichtes Land (Bsp. Flevoland)',1180,clamp((u-wt(sc,'Polder'))/0.4)); tag(e,[5.6,52.5],'Flevoland',clamp((u-wt(sc,'Polder'))/0.4),-60,0,'#0B1C2A',30);}]},
 {head:'1932: Abschlussdeich', say:S_say[3], cams:[{at:0,view:vNL,fly:1.0},{at:0.5,view:vIJ,fly:3.0}],
  under:[e=>{const {u,sc}=e; fill(e,'NLD',OR,0.25); fill(e,'IJS',WA,0.7*clamp((u-wt(sc,'Süßwasser'))/0.8)); fill(e,'FLE',GOLD,0.55*clamp((u-wt(sc,'neues Land'))/0.8));}],
  over:[e=>{const {u,sc,ctx}=e; const k=clamp((u-wt(sc,'Abschlussdeich'))/1.4); if(k>0){const a=P(e,AFS[0]),b=P(e,AFS[1]); ctx.save(); ctx.strokeStyle='#fff'; ctx.lineWidth=12; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k); ctx.stroke(); ctx.restore();} const y=clamp((u-wt(sc,'1932'))/0.4); if(y>0) big(ctx,'1932',y*(1-clamp((u-wt(sc,'Aus der'))/0.4)),680,'#fff',140); tag(e,[5.2,53.1],'Abschlussdeich · 30 km',clamp((u-wt(sc,'30'))/0.4),-60,-40,'#fff',30); chip(ctx,'Zuiderzee wird zum IJsselmeer (Süßwasser)',1180,clamp((u-wt(sc,'Süßwasser'))/0.4));}]},
 {head:'1953: Die Flut', say:S_say[4], cams:[{at:0,view:vIJ,fly:1.0},{at:0.5,view:vZE,fly:3.2}],
  under:[e=>{const {u,sc}=e; fill(e,'NLD',OR,0.25); fill(e,'ZEE',RED,clamp((u-wt(sc,'Sturmflut'))/0.8)*0.8);}],
  over:[e=>{const {u,sc,ctx,t}=e; const y=clamp((u-wt(sc,'1953'))/0.4); if(y>0) big(ctx,u<wt(sc,'tötete')?'1953':'≈ 1.800 Tote',y*(1-clamp((u-wt(sc,'Danach'))/0.4)),680,'#fff',130); pulse(e,[3.7,51.6],t,clamp((u-wt(sc,'Sturmflut'))/0.4),RED,10); chip(ctx,'Deltawerke: Dämme + Sturmflutwehre',1180,clamp((u-wt(sc,'Deltawerke'))/0.4)*(1-clamp((u-wt(sc,'1997'))/0.4))); chip(ctx,'fertig 1997',1180,clamp((u-wt(sc,'1997'))/0.4));}]},
 {head:'Ein Bauwerk', say:S_say[5], cams:[{at:0,view:vZE,fly:1.0},{at:0.5,view:vNLw,fly:4}],
  under:[e=>{fill(e,'NLD',OR,0.35); fill(e,'IJS',WA,0.6); fill(e,'FLE',GOLD,0.5);}],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'Fünftel'))/0.4); if(a>0) big(ctx,'> 1/5 der Einwohner',a,680,'#fff',96); chip(ctx,'geschützt von Deichen, Pumpen, Wehren',1180,clamp((u-wt(sc,'geschützt'))/0.4)); chip(ctx,'kein Zufall, sondern ein Bauwerk',1250,clamp((u-wt(sc,'Bauwerk'))/0.4),'#0B1C2A','rgba(120,230,170,0.96)');}]},
 {say:S_say[6], cams:[{at:0,view:vNLw,fly:1.2},{at:1.4,view:vNLw,fly:4.5}],
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
return {tag:'WARUM IST …? #7', scenes, wt};
}
