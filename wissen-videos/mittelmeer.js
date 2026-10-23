// Story: Was wäre, wenn …? #2 – Das Mittelmeer trocknet aus (Messinische Salinitätskrise)
// ≈ 6 Mio. Jahre · −70 % Wasser · −850 m West / bis −2 km Ost · Flutung ≈ 2 Jahre, bis 10 m/Tag (Modell) · Gibraltar ≈ 14 km
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const WATER='#2F86C8', SALT='#D8C79F', GOLD='#FFE066', RED='#FF5A5F';
const SEAS=window.SEAS;
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
// sea: dry = share of salt-colored sea (0 wet … 1 dry); flood = share of the basin refilled from Gibraltar eastwards
function sea(e,{dry=0,flood=-1}={}){const {ctx,path}=e; const paint=(col,a)=>{ctx.save(); ctx.beginPath(); SEAS.features.forEach(f=>path(f)); ctx.globalAlpha=a; ctx.fillStyle=col; ctx.fill(); ctx.restore();};
 if(flood>=0){paint(SALT,0.92); const x0=P(e,[-6.2,38])[0], x1=P(e,[37,38])[0]; ctx.save(); ctx.beginPath(); ctx.rect(Math.min(x0,x1),0,Math.abs(x1-x0)*clamp(flood)+0.001,1920); ctx.clip(); paint(WATER,0.92); ctx.restore();}
 else {if(dry<1) paint(WATER,0.92*(1-dry*0.0)); if(dry>0) paint(SALT,0.92*dry);}
}
const G=[-5.5,35.98];
const vMed=viewBox([-12,29,38,45.5]), vGib=viewBox([-8.2,35.0,-3.6,37.0]), vWide=viewBox([-20,22,48,50]);
function arrowDown(ctx,x,y,a,col='#fff',h=110){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=10; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,y-h); ctx.lineTo(x,y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x-26,y-18); ctx.lineTo(x,y+14); ctx.lineTo(x+26,y-18); ctx.closePath(); ctx.fill(); ctx.restore();}
function evap(ctx,x,y,t,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle='rgba(255,255,255,0.9)'; ctx.lineWidth=6; ctx.lineCap='round'; for(let k=0;k<3;k++){const xx=x+k*60, ph=((t*0.7)+k/3)%1; ctx.globalAlpha=a*(1-ph); ctx.beginPath(); ctx.moveTo(xx,y-ph*80); ctx.bezierCurveTo(xx-14,y-ph*80-20,xx+14,y-ph*80-40,xx,y-ph*80-60); ctx.stroke();} ctx.restore();}
const scenes=[
 {head:'Das Mittelmeer war fast weg', headInstant:true, say:S_say[0], cams:[{at:0,view:vWide},{at:0.3,view:vMed,fly:3.4}],
  under:[e=>{}], over:[e=>sea(e,{dry:0}),e=>{const {u,sc,ctx,t}=e; const ap=clamp((u-wt(sc,'Gibraltar'))/0.4); pulse(e,G,t,ap,RED,11); tag(e,G,'Gibraltar',ap,-150,-28,'#fff',30);
   const ay=clamp((u-wt(sc,'sechs'))/0.5); if(ay>0) big(ctx,'vor ≈ 6 Mio. Jahren',ay*(1-clamp((u-wt(sc,'dicht'))/0.5)),700,GOLD,80);
   const ad=clamp((u-wt(sc,'dicht'))/0.4); if(ad>0){const q=P(e,G); ctx.save(); ctx.globalAlpha=ad; ctx.strokeStyle=RED; ctx.lineWidth=12; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(q[0]-6,q[1]-34); ctx.lineTo(q[0]+6,q[1]+34); ctx.stroke(); ctx.restore(); label(ctx,'Gibraltar dicht – kein Atlantikwasser mehr',L+20,1180,{color:'#fff',bg:'rgba(229,72,77,0.95)',alpha:ad,font:`800 36px ${FD}`});}}]},
 {head:'Es verdunstet mehr, als nachkommt', say:S_say[1], cams:[{at:0,view:vMed,fly:1.0},{at:3,view:vMed,fly:7}],
  over:[e=>{const {u,sc,ctx,t}=e; const k0=wt(sc,'Ohne Nachschub'); const k=clamp((u-k0)/Math.max(1,wt(sc,'Es verlor')+1.6-k0)); sea(e,{dry:ease(k)}); const q=P(e,[14,35.5]); evap(ctx,q[0]-60,q[1]+10,t,clamp((u-wt(sc,'verdunstet'))/0.4)*(1-clamp((u-wt(sc,'Es verlor'))/0.4)));
   const q2=P(e,[3,39.2]); evap(ctx,q2[0]-60,q2[1]+10,t,clamp((u-wt(sc,'verdunstet'))/0.4)*(1-clamp((u-wt(sc,'Es verlor'))/0.4)));
   const a=clamp((u-wt(sc,'70 Prozent'))/0.4); if(a>0){const v=Math.round(70*ease(clamp((u-wt(sc,'70 Prozent'))/1.2))); big(ctx,`−${v} % Wasser`,a,700,'#fff',112);}}]},
 {head:'Salzebenen statt Meer', say:S_say[2], cams:[{at:0,view:vMed,fly:1.0},{at:0.6,view:viewBox([-6,31,30,42]),fly:5}],
  over:[e=>{const {u,sc,ctx,t}=e; sea(e,{dry:1}); const a1=clamp((u-wt(sc,'Im Westen'))/0.4), a2=clamp((u-wt(sc,'im Osten'))/0.4); const q1=P(e,[2,39.5]), q2=P(e,[21,34.5]);
   arrowDown(ctx,q1[0],q1[1],a1,'#fff',90); if(a1>0) label(ctx,'−850 m',q1[0]-95,q1[1]+60,{color:'#0B1C2A',bg:'rgba(255,224,102,0.96)',alpha:a1,font:`800 40px ${FD}`});
   arrowDown(ctx,q2[0],q2[1],a2,'#fff',150); if(a2>0) label(ctx,'bis −2 km',q2[0]-100,q2[1]+60,{color:'#0B1C2A',bg:'rgba(255,224,102,0.96)',alpha:a2,font:`800 40px ${FD}`});
   const as=clamp((u-wt(sc,'Wo heute'))/0.4); if(as>0) label(ctx,'Salzebenen und Salzseen',L+20,1180,{color:'#0B1C2A',bg:'rgba(255,255,255,0.96)',alpha:as,font:`800 40px ${FD}`});
   const au=clamp((u-wt(sc,'bis heute'))/0.4); if(au>0) label(ctx,'Salzschichten: bis heute am Meeresboden',L+20,1250,{color:'#fff',bg:'rgba(11,28,42,0.93)',alpha:au,font:`800 36px ${FD}`});}]},
 {head:'Dann kam der Atlantik zurück', say:S_say[3], cams:[{at:0,view:vMed,fly:1.0},{at:0.5,view:viewBox([-8,32,12,42]),fly:2.2},{at:sc=>wt(sc,'Pegel')-0.5,view:vMed,fly:3.0}],
  over:[e=>{const {u,sc,ctx,t}=e; const tb=wt(sc,'brach'); const k=clamp((u-tb)/(sc.dur-tb-0.8)); sea(e,{flood:k}); pulse(e,G,t,clamp((u-tb)/0.3),'#fff',11);
   const a=clamp((u-wt(sc,'zehn'))/0.4); if(a>0){const v=Math.round(10*ease(clamp((u-wt(sc,'zehn'))/0.8))); big(ctx,`+${v} m pro Tag`,a*(1-clamp((u-wt(sc,'Nach etwa'))/0.4)),700,'#fff',100);}
   const a2=clamp((u-wt(sc,'zwei Jahren'))/0.4); if(a2>0) big(ctx,'≈ 2 Jahre',a2,700,GOLD,112);
   label(ctx,'nach einer Modellrechnung',L+20,1180,{color:'#fff',bg:'rgba(11,28,42,0.93)',alpha:clamp((u-wt(sc,'Modellrechnung'))/0.4),font:`800 36px ${FD}`});}]},
 {head:'Und heute?', say:S_say[4], cams:[{at:0,view:vMed,fly:1.0},{at:0.4,view:vGib,fly:2.2},{at:sc=>wt(sc,'Aber Afrika')-0.5,view:viewBox([-12,28,12,40]),fly:2.5}],
  over:[e=>{const {u,sc,ctx,t}=e; sea(e,{dry:0}); const a=clamp((u-wt(sc,'Heute ist'))/0.4)*(1-clamp((u-wt(sc,'Aber Afrika'))/0.4)); pulse(e,G,t,a,'#fff',10); tag(e,G,'Gibraltar',a,-150,-28,'#fff',30); if(a>0) big(ctx,'≈ 14 km breit',a,640,GOLD,92);
   const an=clamp((u-wt(sc,'nicht über'))/0.4)*(1-clamp((u-wt(sc,'Aber Afrika'))/0.4)); if(an>0) label(ctx,'nicht über Nacht',L+20,1180,{color:'#0B1C2A',bg:'rgba(120,230,170,0.96)',alpha:an,font:`800 40px ${FD}`});
   const aa=clamp((u-wt(sc,'Aber Afrika'))/0.5); if(aa>0){const q=P(e,[0,31]), q2=P(e,[0,35.3]); ctx.save(); ctx.globalAlpha=aa; ctx.strokeStyle=RED; ctx.fillStyle=RED; ctx.lineWidth=12; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(q[0],q[1]); ctx.lineTo(q2[0],q[1]+(q2[1]-q[1])*aa); ctx.stroke(); ctx.beginPath(); const hy=q[1]+(q2[1]-q[1])*aa; ctx.moveTo(q2[0]-30,hy+16); ctx.lineTo(q2[0],hy-24); ctx.lineTo(q2[0]+30,hy+16); ctx.closePath(); ctx.fill(); ctx.restore(); label(ctx,'Afrika driftet nach Norden',L+20,1180,{color:'#fff',bg:'rgba(229,72,77,0.95)',alpha:aa,font:`800 40px ${FD}`});}}]},
 {head:'In Millionen Jahren?', say:S_say[5], cams:[{at:0,view:viewBox([-12,28,12,40]),fly:1.0},{at:0.6,view:vMed,fly:4.5}],
  over:[e=>{const {u,sc,ctx,t}=e; sea(e,{dry:ease(clamp((u-wt(sc,'erneut'))/2.5))*0.8}); const q=P(e,[16,37]); const a=clamp((u-wt(sc,'wieder'))/0.5); if(a>0){ctx.save(); ctx.globalAlpha=a; ctx.translate(q[0],q[1]); ctx.font=`800 120px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.9)'; ctx.lineJoin='round'; ctx.strokeText('?',0,0); ctx.fillStyle='#fff'; ctx.fillText('?',0,0); ctx.restore();}
   label(ctx,'in vielen Millionen Jahren',L+20,1180,{color:'#0B1C2A',bg:'rgba(255,224,102,0.96)',alpha:clamp((u-wt(sc,'vielen'))/0.4),font:`800 40px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:vMed,fly:1.2},{at:1.4,view:vMed,fly:4.5}],
  under:[],
  over:[e=>sea(e,{dry:0.0})],
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
return {tag:'WAS WÄRE, WENN …? #2', scenes, wt};
}
