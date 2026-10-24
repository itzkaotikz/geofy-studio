// Story: Was wäre, wenn …? #3 – Die Sahara war einmal grün
// ≈ 350 km lang, 13–65 km breit · Great Game · 1893/1895 Grenzziehung als Puffer · Nachbarn TJK, PAK, CHN (92 km) · Wachdschir-Pass 4.923 m · ≈ 18.000 Einw.
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', GR='#4CD964', BR='#C68B4B', RAIN='#7FD0FF';
const G10=window.G10; const F=k=>({type:'Feature',geometry:G10[k]});
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}

const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));


const vAf=viewBox([-22,-8,48,40]), vSah=viewBox([-19,11,39,34]), vT=viewBox([1,21,15,29.5]);
const SAHC=['MAR','ESH','DZA','TUN','LBY','EGY','MRT','MLI','NER','TCD','SDN'];
const SAHP=[[-17.5,20.5],[-13,27.5],[-9,30.5],[-5,31.5],[0,32],[10,33],[20,32],[26,31.5],[33,31],[35,26],[37,22],[36,17.5],[28,15.5],[20,14.5],[12,14.8],[4,15.5],[-5,15.3],[-12,15.5],[-17.8,16.2]];
function sah(e,a,mix){if(a<=0) return; const {ctx,path,proj}=e; ctx.save(); ctx.beginPath(); SAHC.forEach(k=>{const f=WW.features.find(x=>x.id===k); if(f) path(f);}); ctx.clip(); ctx.beginPath(); SAHP.forEach((p,i)=>{const q=proj(p); i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);}); ctx.closePath();
 ctx.globalAlpha=a*0.55*(1-mix); ctx.fillStyle=BR; ctx.fill(); ctx.globalAlpha=a*0.62*mix; ctx.fillStyle=GR; ctx.fill(); ctx.restore();}
const scenes=[
 {head:'Die Sahara heute', headInstant:true, say:S_say[0], cams:[{at:0,view:vAf},{at:0.3,view:vSah,fly:3.0}],
  under:[e=>{const {u,sc}=e; sah(e,clamp((u-wt(sc,'Sahara'))/0.5),clamp((u-wt(sc,'war sie grün'))/1.2));}],
  over:[e=>{const {u,sc,ctx}=e; tag(e,[14,24],'Sahara',clamp((u-wt(sc,'Sahara'))/0.4),-60,0,'#fff',44); chip(ctx,'vor ≈ 11.000 Jahren: grün',1180,clamp((u-wt(sc,'11.000'))/0.4)*(1-clamp((u-wt(sc,'Was wäre'))/0.4))); big(ctx,'Was wäre, wenn …?',clamp((u-wt(sc,'Was wäre'))/0.4),700,'#fff',92);}]},
 {head:'Felsbilder', say:S_say[1], cams:[{at:0,view:vSah,fly:1.0},{at:0.4,view:vT,fly:3.2}],
  under:[e=>{sah(e,1,1);}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,[8.0,25.5],t,clamp((u-wt(sc,'Tassili'))/0.4),'#fff',10); tag(e,[8.0,25.5],"Tassili n'Ajjer",clamp((u-wt(sc,'Tassili'))/0.4),-250,-40,'#fff',32);
   [['Elefanten','Elefanten'],['Giraffen','Giraffen'],['Nashörner','Nashörner'],['Nilpferde','Nilpferde']].forEach(([f,txt],i)=>{const a=clamp((u-wt(sc,f))/0.35); const nx=i<3?clamp((u-wt(sc,['Giraffen','Nashörner','Nilpferde'][i]))/0.35):0; if(a>0&&nx<1) chip(ctx,txt,1180,a*(1-nx));});
   chip(ctx,'ohne Wasser unmöglich',1180,clamp((u-wt(sc,'ohne Wasser'))/0.4));}]},
 {head:'Warum grün?', say:S_say[2], cams:[{at:0,view:vT,fly:1.0},{at:0.4,view:vAf,fly:3.0},{at:sc=>wt(sc,'Das verstärkte')-0.4,view:viewBox([-22,0,48,38]),fly:2.5}],
  under:[e=>{sah(e,1,0.2+0.8*clamp((e.u-wt(e.sc,'Das verstärkte'))/2.0));}],
  over:[e=>{const {u,sc,ctx}=e; chip(ctx,'Erdachse taumelt (Präzession)',1180,clamp((u-wt(sc,'Erdachse'))/0.4)*(1-clamp((u-wt(sc,'Dadurch'))/0.4))); chip(ctx,'Sommer: Nordhalbkugel sonnennäher',1180,clamp((u-wt(sc,'Dadurch'))/0.4)*(1-clamp((u-wt(sc,'Das verstärkte'))/0.4)));
   const ak=clamp((u-wt(sc,'Das verstärkte'))/0.4); [-12,2,16,30].forEach((lo,i)=>{const a=P(e,[lo,7]), b=P(e,[lo,22]); arrow(ctx,a[0],a[1],b[0],b[1],clamp((u-wt(sc,'Das verstärkte')-i*0.2)/1.2),RAIN,12);}); if(ak>0) tag(e,[-14,10],'Monsun-Regen',ak,0,0,RAIN,34); chip(ctx,'Regengürtel wandert nach Norden',1180,clamp((u-wt(sc,'wanderte'))/0.4));}]},
 {head:'Grün, trocken, grün …', say:S_say[3], cams:[{at:0,view:viewBox([-22,0,48,38]),fly:1.0},{at:0.5,view:vSah,fly:3.0}],
  under:[e=>{const {u,sc}=e; const m=0.5+0.5*Math.sin((u-0.5)*2.4); sah(e,1,m);}],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'21.000'))/0.4); if(a>0) big(ctx,'alle ≈ 21.000 Jahre',a*(1-clamp((u-wt(sc,'230'))/0.4)),680,'#fff',92); const b=clamp((u-wt(sc,'230'))/0.4); if(b>0){const v=Math.round(230*ease(clamp((u-wt(sc,'230'))/1.2))); big(ctx,`> ${v} Mal ergrünt`,b,680,'#fff',100);}}]},
 {head:'Das Ende', say:S_say[4], cams:[{at:0,view:vSah,fly:1.0},{at:0.6,view:viewBox([-22,0,48,38]),fly:4}],
  under:[e=>{const {u,sc}=e; sah(e,1,1-clamp((u-wt(sc,'Der Regen'))/3.0));}],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'5.000'))/0.4); if(a>0) big(ctx,'vor ≈ 5.000–6.000 Jahren',a*(1-clamp((u-wt(sc,'Der Regen'))/0.5)),680,'#fff',84); chip(ctx,'Regen weg, Seen schrumpfen',1180,clamp((u-wt(sc,'schrumpften'))/0.4)*(1-clamp((u-wt(sc,'Savanne'))/0.4))); chip(ctx,'aus Savanne wird Wüste',1180,clamp((u-wt(sc,'Savanne'))/0.4));}]},
 {head:'Und morgen?', say:S_say[5], cams:[{at:0,view:viewBox([-22,0,48,38]),fly:1.0},{at:0.5,view:vSah,fly:5}],
  under:[e=>{const {u,sc}=e; sah(e,1,0.5+0.5*Math.sin(u*1.6));}],
  over:[e=>{const {u,sc,ctx}=e; big(ctx,'?',clamp((u-wt(sc,'offen'))/0.4),700,'#fff',200); chip(ctx,'Forscher: Monsun könnte stärker werden',1180,clamp((u-wt(sc,'Manche'))/0.4)*(1-clamp((u-wt(sc,'Sicher'))/0.4))); chip(ctx,'Sicher ist das nicht',1180,clamp((u-wt(sc,'Sicher'))/0.4));}]},
 {say:S_say[6], cams:[{at:0,view:vSah,fly:1.2},{at:1.4,view:vSah,fly:4.5}],
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
return {tag:'WAS WÄRE, WENN …? #3', scenes, wt};
}
