// Story: Hauptstädte #2 – Canberra
// ≈ 350 km lang, 13–65 km breit · Great Game · 1893/1895 Grenzziehung als Puffer · Nachbarn TJK, PAK, CHN (92 km) · Wachdschir-Pass 4.923 m · ≈ 18.000 Einw.
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', SY='#FF6B6B', ME='#7FD0FF', CA='#FF3B7F';
const G10=window.G10; const F=k=>({type:'Feature',geometry:G10[k]});
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.5; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}

const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));



const SYD=[151.21,-33.87], MEL=[144.96,-37.81], CBR=[149.13,-35.28];
const vAus=viewBox([112,-45,156,-9]), vSE=viewBox([142,-39.2,153.5,-32.8]), vCb=viewBox([147.4,-36.5,150.9,-34.1]);
function pin(e,ll,t,a,col,txt,dx=24,dy=-40){if(a<=0) return; pulse(e,ll,t,a,col,10); tag(e,ll,txt,a,dx,dy,'#fff',34);}
function ring(e,ll,km,a,col){if(a<=0) return; const {ctx}=e; ctx.save(); ctx.beginPath(); for(let k=0;k<=72;k++){const an=k/72*Math.PI*2; const p=P(e,[ll[0]+Math.cos(an)*km/111/Math.cos(ll[1]*Math.PI/180), ll[1]+Math.sin(an)*km/111]); k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);} ctx.closePath(); ctx.globalAlpha=a*0.25; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=5; ctx.setLineDash([16,10]); ctx.stroke(); ctx.restore();}
function line(e,a_,b_,k,col,w=6){if(k<=0) return; const {ctx}=e; const a=P(e,a_), b=P(e,b_); ctx.save(); ctx.strokeStyle=col; ctx.lineWidth=w; ctx.setLineDash([14,10]); ctx.lineCap='round'; ctx.globalAlpha=Math.min(1,k*1.5); ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k); ctx.stroke(); ctx.restore();}
const scenes=[
 {head:'Weder Sydney noch Melbourne', headInstant:true, say:S_say[0], cams:[{at:0,view:vAus},{at:0.4,view:vSE,fly:3.0},{at:sc=>wt(sc,'Canberra')-0.3,view:viewBox([145.5,-37.3,152.5,-33.4]),fly:2.4}],
  under:[e=>{fill(e,'AUS',GOLD,0.25);}],
  over:[e=>{const {u,sc,ctx,t}=e; pin(e,SYD,t,clamp((u-wt(sc,'Sydney'))/0.4),SY,'Sydney'); pin(e,MEL,t,clamp((u-wt(sc,'Melbourne'))/0.4),ME,'Melbourne',-200,-30); big(ctx,'Keine von beiden',clamp((u-wt(sc,'Keine'))/0.4),680,'#fff',100); pin(e,CBR,t,clamp((u-wt(sc,'Canberra'))/0.4),CA,'Canberra',30,10);}]},
 {head:'1901: Zwei Rivalen', say:S_say[1], cams:[{at:0,view:viewBox([145.5,-37.3,152.5,-33.4]),fly:1.0},{at:0.5,view:vSE,fly:3.0}],
  under:[e=>{fill(e,'AUS',GOLD,0.25);}],
  over:[e=>{const {u,sc,ctx,t}=e; pin(e,SYD,t,1,SY,'Sydney'); pin(e,MEL,t,1,ME,'Melbourne',-200,-30); const a=clamp((u-wt(sc,'1901'))/0.4); if(a>0) big(ctx,'1901',a*(1-clamp((u-wt(sc,'Rivalen'))/0.4)),680,'#fff',140); line(e,MEL,SYD,clamp((u-wt(sc,'Rivalen'))/0.8),'#fff'); chip(ctx,'beide wollten die Hauptstadt',1180,clamp((u-wt(sc,'beide'))/0.4));}]},
 {head:'Der Kompromiss', say:S_say[2], cams:[{at:0,view:vSE,fly:1.0},{at:0.5,view:viewBox([141,-39.5,154.5,-32]),fly:3.0}],
  under:[e=>{fill(e,'AUS',GOLD,0.25);}],
  over:[e=>{const {u,sc,ctx,t}=e; pin(e,SYD,t,1,SY,'Sydney'); pin(e,MEL,t,1,ME,'Melbourne',-200,-30); ring(e,SYD,160,clamp((u-wt(sc,'160'))/0.7),SY); chip(ctx,'mindestens 160 km von Sydney',1180,clamp((u-wt(sc,'mindestens'))/0.4)*(1-clamp((u-wt(sc,'Bis sie'))/0.4))); chip(ctx,'Parlament vorerst in Melbourne',1180,clamp((u-wt(sc,'Bis sie'))/0.4));}]},
 {head:'1908: Die Wahl', say:S_say[3], cams:[{at:0,view:viewBox([141,-39.5,154.5,-32]),fly:1.0},{at:0.5,view:vSE,fly:3.0}],
  under:[e=>{fill(e,'AUS',GOLD,0.25);}],
  over:[e=>{const {u,sc,ctx,t}=e; pin(e,SYD,t,1,SY,'Sydney'); pin(e,MEL,t,1,ME,'Melbourne',-200,-30); const k=clamp((u-wt(sc,'1908'))/1.0); line(e,SYD,CBR,k,'#fff'); line(e,MEL,CBR,k,'#fff'); pin(e,CBR,t,clamp((u-wt(sc,'1908'))/0.4),CA,'Canberra',30,10); const a=clamp((u-wt(sc,'1908'))/0.4); if(a>0) big(ctx,'1908',a*(1-clamp((u-wt(sc,'Wettbewerb'))/0.4)),680,'#fff',140); chip(ctx,'Wettbewerb: Walter Burley Griffin',1180,clamp((u-wt(sc,'Wettbewerb'))/0.4));}]},
 {head:'Der Name', say:S_say[4], cams:[{at:0,view:vSE,fly:1.0},{at:0.5,view:vCb,fly:3.0}],
  under:[e=>{fill(e,'AUS',GOLD,0.25);}],
  over:[e=>{const {u,sc,ctx,t}=e; pin(e,CBR,t,1,CA,'Canberra',30,-30); const a=clamp((u-wt(sc,'1913'))/0.4); if(a>0) big(ctx,'1913',a*(1-clamp((u-wt(sc,'Canberra stammt'))/0.4)),680,'#fff',140); big(ctx,'„Treffpunkt“',clamp((u-wt(sc,'Treffpunkt'))/0.4),680,GOLD,110); chip(ctx,'vermutlich aus einer Aboriginal-Sprache',1180,clamp((u-wt(sc,'wahrscheinlich'))/0.4));}]},
 {head:'1927: Parlament', say:S_say[5], cams:[{at:0,view:vCb,fly:1.0},{at:0.5,view:viewBox([148.4,-35.8,149.9,-34.8]),fly:3.0}],
  under:[e=>{fill(e,'AUS',GOLD,0.25);}],
  over:[e=>{const {u,sc,ctx,t}=e; fill(e,'LAKE','#7FD0FF',clamp((u-wt(sc,'See'))/0.6)); tag(e,[149.07,-35.33],'Lake Burley Griffin',clamp((u-wt(sc,'Lake'))/0.4),-150,40,'#fff',30); const a=clamp((u-wt(sc,'1927'))/0.4); if(a>0) big(ctx,'1927',a*(1-clamp((u-wt(sc,'Im Zentrum'))/0.4)),680,'#fff',140); chip(ctx,'künstlicher See (schematisch)',1180,clamp((u-wt(sc,'künstlicher'))/0.4));}]},
 {head:'Sydney ist größer', say:S_say[6], cams:[{at:0,view:viewBox([148.4,-35.8,149.9,-34.8]),fly:1.0},{at:0.5,view:vSE,fly:3.5}],
  under:[e=>{fill(e,'AUS',GOLD,0.25);}],
  over:[e=>{const {u,sc,ctx,t}=e; pin(e,SYD,t,1,SY,'Sydney'); pin(e,CBR,t,1,CA,'Canberra',30,10); chip(ctx,'Hauptstadt: Canberra',1180,clamp((u-wt(sc,'Hauptstadt'))/0.4));}]},
 {say:S_say[7], cams:[{at:0,view:vSE,fly:1.2},{at:1.4,view:vSE,fly:4.5}],
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
return {tag:'HAUPTSTÄDTE #2', scenes, wt};
}
