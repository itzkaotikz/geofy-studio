// Story: Rekorde #1 – Welches Land hat die meisten Zeitzonen?
// Fakten: Frankreich 12 (ohne Antarktis-Anspruch), Russland 11, USA 11 (inkl. Außengebiete), China 1 (UTC+8);
// Kashgar: Sonnenaufgang im Winter gegen 10 Uhr Pekinger Zeit. Sommer: Paris 12:00 (UTC+2) = 10:00 UTC → Tahiti 00:00 (UTC−10), Wallis 22:00 (UTC+12).
function makeStory(){
const {C,FD,FB,FM,L,KB,clamp,ease,eout,lerp,viewBox,mainPart,label,rr,fit,wrapLines,hl}=KV;
const BY=KV.byId();
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const FR=['FRA','PYF','NCL','WLF','SPM','ATF'];
const SPOTS={GLP:[-61.55,16.2],MTQ:[-61.0,14.65],GUF:[-53.1,3.9],REU:[55.5,-21.1],MYT:[45.15,-12.8],NCL:[165.6,-21.3],PYF:[-149.4,-17.65],WLF:[-176.2,-13.3],SPM:[-56.3,46.9],PAR:[2.35,48.86]};
const fr=(e,a)=>FR.forEach(id=>hl(e,id,C.target,a));
// time-zone stripes: nominal 15° bands, every other one tinted
function stripes(e,a){if(a<=0) return; const {ctx,proj}=e; const s=proj.scale(), [tx]=proj.translate(), lonC=-proj.rotate()[0]; const k=Math.PI/180;
 ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(159,216,245,0.12)';
 for(let z=-12;z<12;z+=2){const l0=-7.5+15*z; const dl=((l0-lonC+540)%360)-180; const x0=tx+s*dl*k, w=s*15*k; for(const off of [-2*Math.PI*s,0,2*Math.PI*s]) ctx.fillRect(x0+off,0,w,1920);}
 ctx.restore();}
function clock(ctx,x,y,r,h,m,title,col,a){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y);
 ctx.beginPath(); ctx.arc(0,0,r,0,7); ctx.fillStyle='rgba(11,28,42,0.92)'; ctx.fill(); ctx.lineWidth=6; ctx.strokeStyle=col; ctx.stroke();
 for(let i=0;i<12;i++){const an=i*Math.PI/6; ctx.beginPath(); ctx.moveTo(Math.sin(an)*r*0.78,-Math.cos(an)*r*0.78); ctx.lineTo(Math.sin(an)*r*0.9,-Math.cos(an)*r*0.9); ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke();}
 const ha=((h%12)+m/60)*Math.PI/6, ma=m*Math.PI/30; ctx.lineCap='round';
 ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.sin(ha)*r*0.5,-Math.cos(ha)*r*0.5); ctx.strokeStyle=C.ink; ctx.lineWidth=8; ctx.stroke();
 ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.sin(ma)*r*0.75,-Math.cos(ma)*r*0.75); ctx.strokeStyle=col; ctx.lineWidth=5; ctx.stroke();
 ctx.textAlign='center'; ctx.font=`800 34px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`,0,r+46); ctx.font=`700 26px ${FB}`; ctx.fillStyle=col; ctx.fillText(title,0,r+80); ctx.restore();}
function night(e,a,utcHour){if(a<=0) return; const {ctx,path}=e; const lon=(12-utcHour)*15, lat=23.4; const c=d3.geoCircle().center([lon+180,-lat]).radius(90)(); ctx.save(); ctx.globalAlpha=a*0.55; ctx.beginPath(); path(c); ctx.fillStyle='#000814'; ctx.fill(); ctx.restore();}
function pulse(e,ll,t,a,col=C.target){if(a<=0) return; const {ctx}=e; const q=P(e,ll); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],12+ph*60,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],11,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.globalAlpha=1;}
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 30px ${FD}`});};

const vRus={lon:100,lat:52,scale:520}, vUS=viewBox([-128,22,-64,52]), vFR=viewBox([-7,40,11,52]), vWorld=viewBox([-180,-60,180,80]), vCar=viewBox([-67,11,-55,19.5]), vGuy=viewBox([-62,-1,-47,10]),
 vInd=viewBox([40,-25,60,-9]), vNcl=viewBox([158,-26,172,-16]), vPyf=viewBox([-158,-24,-140,-12]), vPac={lon:-170,lat:5,scale:330}, vCN=viewBox([72,16,136,54]);
const scenes=[
 {head:'Wer hat die meisten Zeitzonen?', headInstant:true, say:S_say[0], cams:[{at:0,view:vRus},{at:sc=>wt(sc,'die USA')-0.3,view:vUS,fly:1.4},{at:sc=>wt(sc,'Frankreich')-0.4,view:vFR,fly:1.6}],
  under:[e=>{const {u,sc}=e; stripes(e,0.9); hl(e,'RUS',C.ice,0.55*(1-clamp((u-wt(sc,'die USA'))/0.6))); hl(e,'USA',C.ice,0.55*clamp((u-wt(sc,'die USA')+0.2)/0.4)*(1-clamp((u-wt(sc,'Frankreich'))/0.6)));
   hl(e,'FRA',C.target,clamp((u-wt(sc,'Frankreich')+0.2)/0.4));}],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'zwölf'))/0.4); if(a>0) label(ctx,'12 Zeitzonen',L+20,1210,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:a,font:`800 56px ${FD}`});}]},
 {head:'Frankreich ist überall', say:S_say[1], cams:[{at:0,view:vFR},{at:sc=>wt(sc,'Überseegebiete')-0.6,view:vWorld,fly:2.2}],
  under:[e=>{stripes(e,0.7); fr(e,1);}],
  over:[e=>{const {u,sc,t,ctx}=e; const t0=wt(sc,'Überseegebiete'); Object.entries(SPOTS).forEach(([k,ll],i)=>{if(k==='PAR') return; pulse(e,ll,t,clamp((u-t0-i*0.18)/0.3));});
   const a=clamp((u-wt(sc,'Kolonialzeit'))/0.4); if(a>0) label(ctx,'Überbleibsel der Kolonialzeit',L+20,1210,{alpha:a,font:`800 38px ${FD}`});}]},
 {head:'Eine Weltreise durch Frankreich', say:S_say[2], cams:[{at:0,view:vCar,fly:1.6},{at:sc=>wt(sc,'In Südamerika')-0.3,view:vGuy,fly:1.3},{at:sc=>wt(sc,'Im Indischen')-0.3,view:vInd,fly:1.6},{at:sc=>wt(sc,'Neukaledonien')-0.6,view:vNcl,fly:1.6},{at:sc=>wt(sc,'Französisch-Polynesien')-0.5,view:vPyf,fly:1.5}],
  under:[e=>fr(e,1)],
  over:[e=>{const {u,sc,t}=e; const items=[['GLP','Guadeloupe','Guadeloupe',-200,-30],['MTQ','Martinique','Martinique',-190,30],['GUF','Französisch-Guayana','Französisch-Guayana',-200,80],['REU','La Réunion','La Réunion',40,10],['MYT','Mayotte','Mayotte',40,10],['NCL','Neukaledonien','Neukaledonien',-120,90],['PYF','Polynesien','Französisch-Polynesien',-160,90]];
   items.forEach(([k,frag,txt,dx,dy])=>{const a=clamp((u-wt(sc,frag)+0.1)/0.35); pulse(e,SPOTS[k],t,a); tag(e,SPOTS[k],txt,a,dx,dy);});}]},
 {head:'12 Uhr in Paris – und sonst?', say:S_say[3], cams:[{at:0,view:{lon:2,lat:30,scale:420},fly:1.8},{at:sc=>wt(sc,'Tahiti')-0.5,view:{lon:-150,lat:5,scale:420},fly:1.6},{at:sc=>wt(sc,'Wallis')-0.5,view:{lon:-176,lat:0,scale:420},fly:1.0}],
  under:[e=>{const {u,sc}=e; night(e,clamp((u-wt(sc,'zwölf Uhr'))/0.6),10); fr(e,0.9);}],
  over:[e=>{const {u,sc,ctx,t}=e; pulse(e,SPOTS.PAR,t,clamp((u-wt(sc,'Paris'))/0.3)); pulse(e,SPOTS.PYF,t,clamp((u-wt(sc,'Tahiti'))/0.3)); pulse(e,SPOTS.WLF,t,clamp((u-wt(sc,'Wallis'))/0.3));
   clock(ctx,230,1150,92,12,0,'Paris',C.sand,clamp((u-wt(sc,'zwölf Uhr'))/0.4)); clock(ctx,490,1150,92,0,0,'Tahiti',C.ice,clamp((u-wt(sc,'Mitternacht'))/0.4)); clock(ctx,750,1150,92,22,0,'Wallis & Futuna',C.ok,clamp((u-wt(sc,'zehn Uhr'))/0.4));}]},
 {head:'Platz 2: Russland und die USA', say:S_say[4], cams:[{at:0,view:vRus,fly:1.6},{at:sc=>wt(sc,'Bei den USA')-0.4,view:vPac,fly:2.0}],
  under:[e=>{const {u,sc}=e; stripes(e,0.9); hl(e,'RUS',C.ice,0.6); hl(e,'USA',C.ok,0.6*clamp((u-wt(sc,'die USA'))/0.4));}],
  over:[e=>{const {u,sc,ctx,t}=e; label(ctx,'Russland · 11',L+20,1140,{color:C.ice,alpha:clamp((u-wt(sc,'elf'))/0.4),font:`800 44px ${FD}`}); label(ctx,'USA · 11',L+20,1215,{color:C.ok,alpha:clamp((u-wt(sc,'elf'))/0.4),font:`800 44px ${FD}`});
   const ti=wt(sc,'Inseln'); [[144.8,13.4,'Guam'],[-170.7,-14.3,'Amerikanisch-Samoa'],[166.6,19.3,'Wake'],[-157.9,21.3,'Hawaii']].forEach(([x,y,n],i)=>{const a=clamp((u-ti-i*0.25)/0.3); pulse(e,[x,y],t,a,C.ok); tag(e,[x,y],n,a,30,10,C.ok);});}]},
 {head:'China: nur eine Zeitzone', say:S_say[5], cams:[{at:0,view:vCN,fly:1.8},{at:sc=>wt(sc,'Im Westen')-0.4,view:viewBox([66,26,104,48]),fly:1.5}],
  under:[e=>{const {u,sc}=e; stripes(e,1); hl(e,'CHN',C.target,0.55);}],
  over:[e=>{const {u,sc,ctx}=e; const a=clamp((u-wt(sc,'einzige'))/0.4); if(a>0) label(ctx,'ganz China: UTC+8',L+20,1210,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:a,font:`800 44px ${FD}`});
   const ts=wt(sc,'Im Westen'), as=clamp((u-ts)/0.4); if(as>0){const q=P(e,[76,39.5]); KV.icon(ctx,'sun',q[0],q[1],1,as); label(ctx,'Kaschgar',q[0]+56,q[1]-12,{color:C.sand,alpha:as,font:`800 32px ${FD}`}); label(ctx,'Sonnenaufgang ≈ 10 Uhr',q[0]+56,q[1]+44,{alpha:clamp((u-wt(sc,'zehn'))/0.4),font:`700 28px ${FB}`});}}]},
 {say:S_say[6], cams:[{at:0,view:vFR,fly:1.4},{at:1.4,view:vWorld,fly:3.5}],
  under:[e=>{stripes(e,0.6); fr(e,1);}],
  top:[e=>{const {ctx,u}=e; const a=eout(clamp((u-0.2)/0.6)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,L,600,780,470,32); ctx.fill();
   const q='Hättest du auf Frankreich getippt?'; const z=fit(ctx,q,800,76,52,700,FD); ctx.fillStyle=C.ink; wrapLines(ctx,q,700).forEach((l,i)=>ctx.fillText(l,L+40,710+i*(z+8)));
   ctx.font=`800 44px ${FD}`; ctx.fillStyle=C.target; ctx.fillText('Schreib es in die Kommentare',L+40,1010,700); ctx.restore();}]}
];
return {tag:'REKORDE #1', scenes, wt};
}
