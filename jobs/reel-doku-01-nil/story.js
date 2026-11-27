// Doku-Teaser 1 – Nil (9:16) – Länder, die es nicht mehr gibt
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const GOLD='#FFE066', OR='#FF7A3D', WA='#7FD0FF', BL='#4D9BFF', RED='#E5484D';
function chip(ctx,txt,y,a,col='#0B1C2A',bg='rgba(255,224,102,0.96)',size=38){if(a<=0||window.NO_CHIPS) return; label(ctx,txt,L+20,y,{color:col,bg,alpha:a,font:`800 ${size}px ${FD}`});}
const tag=(e,ll,txt,a,dx=0,dy=0,col='#fff',size=30)=>{const q=P(e,ll); if(!q||a<=0) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; if(KV.LOOK==='v3') return KV.bigText(ctx,txt,a,y,col,size); ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function line(e,pts,col,prog,w=10,dash=null){if(prog<=0) return; const {ctx}=e; const q=pts.map(p=>P(e,p)); const n=Math.max(2,Math.floor(q.length*Math.min(1,prog))+(prog>=1?0:1)); ctx.save(); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='rgba(5,14,24,0.7)'; ctx.lineWidth=w+7; ctx.beginPath(); q.slice(0,n).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.strokeStyle=col; ctx.lineWidth=w; if(dash) ctx.setLineDash(dash); ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}


const G10=window.G10; const F=k=>G10[k]?{type:'Feature',geometry:G10[k]}:KV.byId().get(k);
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.4; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}



const fx=FX.make({big,chip,fill,P}); const {A,win,VW}=fx; const {PK,GO,CY,TE,RD}=fx.COL;
const {pop,counter,flash,badge,stamp,xmark,bars}=fx;
const Y=700, CYc=1395, WAT='#3FA9FF', CY2='#7FD0FF', GR='#7FCB6A';
const NILE=[[31.24,30.05],[31.18,27.18],[32.64,25.69],[32.9,24.09],[31.35,21.8],[30.48,19.17],[33.32,19.53],[33.98,17.7],[32.53,15.6]].reverse();
const DELTA=[[31.24,30.05],[30.42,31.45]], DELTA2=[[31.24,30.05],[31.8,31.5]];
const BLUE=[[37.4,11.6],[37.6,11.3],[38.2,10.6],[38.0,10.0],[37.4,9.9],[36.6,10.2],[35.8,10.7],[35.09,11.21],[34.39,11.8],[33.6,13.55],[32.53,15.6]];
const WHITE=[[33.2,0.42],[32.3,1.9],[31.6,4.85],[31.0,7.0],[31.66,9.53],[32.4,12.0],[32.53,15.6]];
const EUPH=[[39.8,39.2],[38.32,37.48],[37.98,37.03],[39.0,35.95],[40.14,35.33],[41.1,34.4],[43.3,33.42],[43.78,33.35],[45.2,32.0],[46.26,31.05],[47.43,31.0]];
const TIGR=[[40.2,38.4],[40.23,37.92],[42.19,37.33],[43.13,36.34],[43.68,34.6],[44.37,33.31],[45.82,32.5],[47.15,31.84],[47.43,31.0],[47.8,30.5],[48.6,29.9]];
const INDUS=[[81.0,31.1],[79.0,32.6],[77.58,34.16],[75.5,35.3],[73.5,35.4],[72.69,34.09],[71.6,32.5],[70.8,30.5],[68.86,27.7],[68.37,25.39],[67.5,24.0]];
const JHEL=[[75.3,34.1],[73.5,33.2],[72.5,31.5],[71.6,30.6]], CHEN=[[76.5,33.0],[74.8,32.7],[73.0,31.0],[71.4,29.4]];
const RAVI=[[76.3,32.4],[74.3,31.6],[72.3,30.8]], BEAS=[[77.2,32.0],[75.5,31.3],[75.0,31.2]], SUTL=[[78.5,31.6],[76.5,31.3],[74.7,31.0],[73.0,29.8],[71.0,29.0]];
const RHINE=[[9.5,46.6],[9.6,47.5],[7.6,47.56],[8.47,49.5],[7.6,50.36],[6.95,50.94],[6.2,51.85],[4.1,51.95]];
const MEKONG=[[98.5,31.0],[99.2,27.0],[100.1,22.0],[100.1,20.3],[102.6,17.97],[105.8,15.1],[105.9,11.5],[106.7,9.6]];
const GERD=[35.09,11.21], CAI=[31.24,30.05];
const vEGY=VW(31,25,18), vNILE=VW(33,19,30), vETH=VW(37,11.5,16), vGERD=VW(35.4,11.2,7), vMID=VW(42,24,48), vWORLD=VW(45,25,80);
function riv(e,pts,prog,col=WAT,w=7){if(prog<=0) return; const {ctx}=e; ctx.save(); ctx.shadowColor=col; ctx.shadowBlur=14; line(e,pts,col,prog,w); ctx.restore();}
function reservoir(e,a){if(a<=0) return; const q=P(e,[35.4,11.0]); if(!q) return; const {ctx}=e; ctx.save(); ctx.globalAlpha=0.8; ctx.fillStyle=WAT; ctx.beginPath(); ctx.ellipse(q[0],q[1],140*eout(a),70*eout(a),-0.5,0,7); ctx.fill(); ctx.restore();}

function sides(ctx,a,u,t0,col,k,lines,y){const al=a*clamp((u-t0)/0.4); if(al<=0) return; const x=110,w=860,h=110+lines.length*70; ctx.save(); ctx.globalAlpha=al; rr(ctx,x,y,w,h,30); ctx.fillStyle='rgba(6,20,40,0.88)'; ctx.fill(); ctx.strokeStyle=col; ctx.lineWidth=3; ctx.stroke(); ctx.fillStyle=col; ctx.font=`700 30px ${KV.FM}`; ctx.fillText(k,x+40,y+64); ctx.fillStyle='#fff'; ctx.font=`800 52px ${FD}`; lines.forEach((l,i)=>ctx.fillText(l,x+40,y+140+i*70)); ctx.restore();}
function ytcard(ctx,a,u,t0){if(a<=0) return; const y=560,x=140,w=800,h=450,k=eout(clamp((u-t0)/0.5)); ctx.save(); ctx.globalAlpha=a; ctx.translate(540,y+h/2); ctx.scale(0.85+0.15*k,0.85+0.15*k); ctx.translate(-540,-(y+h/2)); rr(ctx,x,y,w,h,30); ctx.fillStyle='rgba(6,20,40,0.92)'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=2; ctx.stroke();
 ctx.fillStyle='#E5484D'; rr(ctx,x+w/2-70,y+70,140,96,26); ctx.fill(); ctx.fillStyle='#fff'; ctx.beginPath(); ctx.moveTo(x+w/2-20,y+92); ctx.lineTo(x+w/2+30,y+118); ctx.lineTo(x+w/2-20,y+144); ctx.fill();
 ctx.textAlign='center'; ctx.fillStyle='#7FD0FF'; ctx.font=`700 30px ${KV.FM}`; ctx.fillText('NEUE DOKU · YOUTUBE',540,y+230); ctx.fillStyle='#fff'; ctx.font=`800 64px ${FD}`; ctx.fillText('Kampf ums Wasser',540,y+310); ctx.font=`700 36px ${FB}`; ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.fillText('Nil · Euphrat · Indus · 6 Min.',540,y+372); ctx.fillStyle='#FF3B7F'; ctx.fillText('Link im Profil ↑',540,y+425); ctx.restore();}
const scenes=[
 {head:'Wasser abdrehen?', headInstant:true, say:S_say[0], cams:[{at:0,view:vEGY},{at:sc=>wt(sc,'einzigen')-0.3,view:vNILE,fly:1.2}], swish:[sc=>wt(sc,'Ägypten'),sc=>wt(sc,'einzigen')-0.3], pops:[0.2,sc=>wt(sc,'Ägypten'),sc=>wt(sc,'97'),sc=>wt(sc,'Nil')],
  under:[e=>{const {u,sc}=e; fill(e,'EGY',RD,0.6*A(u,wt(sc,'Ägypten'),0.3),3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const ta=wt(sc,'Ägypten'), t9=wt(sc,'97'), tn=wt(sc,'Nil');
   const q=P(e,[31.5,26.5]); if(q){ctx.save(); const k=A(u,0.1,0.4)*(1-A(u,ta,0.3)); if(k>0){ctx.globalAlpha=k; ctx.fillStyle=WAT; ctx.beginPath(); ctx.arc(540,1050,70+10*Math.sin(t*6),0,7); ctx.fill();} ctx.restore();}
   if(q) xmark(ctx,540,1050,win(u,0.6,ta,0.2),1.4);
   riv(e,NILE,A(u,tn-0.6,1.0)); riv(e,DELTA,A(u,tn,0.4)); riv(e,DELTA2,A(u,tn,0.4)); tag(e,[31.5,24],'Nil',A(u,tn,0.3),60,0,'#fff',38);
   pop(ctx,'Wasser abgedreht?',win(u,0.2,ta,0.15),u,0.2,Y,'#fff',110); pop(ctx,'Ägypten',win(u,ta,t9,0.15),u,ta,Y,'#fff',130);
   counter(ctx,0,97,win(u,t9-0.3,tn,0.2),u,t9-0.3,Y,190,' %'); chip(ctx,'des Wassers aus einem einzigen Fluss',CYc,win(u,t9,tn+0.6,0.25),'#fff','rgba(229,72,77,0.95)'); pop(ctx,'der Nil',A(u,tn,0.15),u,tn,Y,'#fff',150);}]},
 {head:'Woher kommt das Wasser?', say:S_say[1], cams:[{at:0,view:vNILE,fly:0.6},{at:sc=>wt(sc,'Hochland')-0.2,view:vETH,fly:1.4},{at:sc=>wt(sc,'größten')-0.4,view:vGERD,fly:1.2}], swish:[sc=>wt(sc,'Hochland')-0.2,sc=>wt(sc,'größten')-0.4], pops:[sc=>wt(sc,'gar nicht'),sc=>wt(sc,'85'),sc=>wt(sc,'2025'),sc=>wt(sc,'größten')],
  under:[e=>{const {u,sc}=e; fill(e,'EGY',RD,0.4*(1-A(u,wt(sc,'Hochland'),0.4)),2); fill(e,'ETH',TE,0.55*A(u,wt(sc,'Hochland'),0.3),3);}],
  over:[e=>{const {u,sc,ctx,t}=e; const t8=wt(sc,'85'), th=wt(sc,'Hochland'), ts=wt(sc,'September'), tg=wt(sc,'größten');
   riv(e,NILE,1,WAT,6); riv(e,WHITE,1,WAT,4); riv(e,BLUE,1,CY2,6+6*A(u,wt(sc,'Blauen'),0.4)); tag(e,[37.6,10.0],'Blauer Nil',A(u,wt(sc,'Blauen'),0.3)*(1-A(u,tg-0.4,0.3)),0,40,'#fff',34);
   stamp(ctx,'NICHT AUS ÄGYPTEN',win(u,wt(sc,'gar nicht'),th,0.2),u,wt(sc,'gar nicht'),Y+20);
   pop(ctx,'bis zu 85 %',win(u,t8,ts,0.15),u,t8,Y,'#fff',150); chip(ctx,'aus dem Hochland von Äthiopien',CYc,win(u,th,ts,0.25));
   pop(ctx,'September 2025',win(u,ts,tg,0.15),u,ts,Y,'#fff',110); pulse(e,GERD,t,A(u,tg-0.3,0.3),PK,14); tag(e,GERD,'GERD',A(u,tg,0.3),0,70,'#fff',36);
   pop(ctx,'größter Staudamm Afrikas',A(u,tg,0.15),u,tg,Y,'#fff',86);}]},
 {head:'Ein Meer hinter der Mauer', say:S_say[2], cams:[{at:0,view:vGERD,fly:0.4},{at:sc=>wt(sc,'Chance')-0.3,view:vETH,fly:1.2}], swish:[sc=>wt(sc,'Bodensee'),sc=>wt(sc,'Chance')-0.3], pops:[sc=>wt(sc,'74'),sc=>wt(sc,'Bodensee'),sc=>wt(sc,'Hälfte'),sc=>wt(sc,'verdoppeln')],
  under:[e=>{fill(e,'ETH',TE,0.4,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; const t7=wt(sc,'74'), tb=wt(sc,'Bodensee'), tc=wt(sc,'Chance'), th=wt(sc,'Hälfte'), tv=wt(sc,'verdoppeln');
   riv(e,BLUE,1,CY2,8); reservoir(e,A(u,0.2,2.0)); pulse(e,GERD,t,1,PK,12);
   counter(ctx,0,74,win(u,t7-0.3,tb,0.2),u,t7-0.3,Y,170,' Mrd. m³'); bars(ctx,win(u,tb,tc,0.3),u,tb,[['Stausee GERD: 74 Mrd. m³',1,WAT],['Bodensee: ≈ 48 Mrd. m³',0.65,CY2]],'Wassermenge',900);
   pop(ctx,'≈ 1,5 × Bodensee',win(u,tb,tc,0.15),u,tb,Y,'#fff',110); pop(ctx,'Chance für Äthiopien',win(u,tc,th,0.15),u,tc,Y,GO,96);
   pop(ctx,'≈ 50 % ohne Strom',win(u,th,tv,0.15),u,th,Y,'#fff',110); for(let i=0;i<10;i++){const on=i<5||A(u,tv,0.5)>0.5; const al=A(u,th,0.3); if(al>0){ctx.save(); ctx.globalAlpha=al; ctx.fillStyle=on?GO:'rgba(255,255,255,0.22)'; if(on){ctx.shadowColor=GO; ctx.shadowBlur=18;} ctx.beginPath(); ctx.arc(225+i*70,1250,24,0,7); ctx.fill(); ctx.restore();}}
   pop(ctx,'Strom × 2',A(u,tv,0.15),u,tv,Y,GO,140);}]},
 {head:'Wer oben sitzt …', say:S_say[3], cams:[{at:0,view:vNILE,fly:1.4}], swish:[0,sc=>wt(sc,'zehn')], pops:[sc=>wt(sc,'existenzielle'),sc=>wt(sc,'oben'),sc=>wt(sc,'zehn'),sc=>wt(sc,'Einigung')],
  under:[e=>{const {u,sc}=e; fill(e,'EGY',RD,0.55,3); fill(e,'ETH',TE,0.4,2);}],
  over:[e=>{const {u,sc,ctx,t}=e; const tx=wt(sc,'existenzielle'), to=wt(sc,'oben'), tz=wt(sc,'zehn'), te=wt(sc,'Einigung');
   riv(e,BLUE,1,CY2,6); riv(e,NILE,1,WAT,7-3*A(u,to,1.2)); riv(e,DELTA,1); riv(e,DELTA2,1); pulse(e,GERD,t,1,PK,12); pulse(e,CAI,t,1,GO,10);
   pop(ctx,'„existenzielle Bedrohung“',win(u,tx,to,0.15),u,tx,Y,'#fff',84);
   sides(ctx,win(u,to,tz,0.25),u,to,GO,'OBEN',['entscheidet mit …'],560); sides(ctx,win(u,to,tz,0.25),u,to+0.8,PK,'UNTEN',['… wie viel ankommt'],1000);
   counter(ctx,0,10,win(u,tz-0.3,te,0.2),u,tz-0.3,Y,170,'+ Jahre'); chip(ctx,'Verhandlungen',CYc,win(u,tz,te,0.25)); stamp(ctx,'KEINE EINIGUNG',A(u,te,0.2),u,te,Y+20);}]},
 {head:'Kein Einzelfall', say:S_say[4], cams:[{at:0,view:vMID,fly:1.4},{at:sc=>wt(sc,'erkläre')-0.3,view:vWORLD,fly:1.2}], swish:[0,sc=>wt(sc,'erkläre')-0.3], pops:[sc=>wt(sc,'Euphrat'),sc=>wt(sc,'Indus'),sc=>wt(sc,'Doku'),sc=>wt(sc,'recht')],
  over:[e=>{const {u,sc,ctx}=e; const tu=wt(sc,'Euphrat'), ti=wt(sc,'Indus'), td=wt(sc,'erkläre'), tl=wt(sc,'Link'), tr=wt(sc,'Und jetzt');
   riv(e,NILE,1); riv(e,BLUE,1); riv(e,EUPH,A(u,tu-0.2,1.0)); riv(e,TIGR,A(u,tu,1.0)); riv(e,INDUS,A(u,ti-0.2,1.0)); [JHEL,CHEN,SUTL].forEach(r=>riv(e,r,A(u,ti,0.8),WAT,4));
   tag(e,[41,35.5],'Euphrat',A(u,tu,0.3)*(1-A(u,td,0.3)),0,-40,'#fff',34); tag(e,[69,27],'Indus',A(u,ti,0.3)*(1-A(u,td,0.3)),0,0,'#fff',34);
   pop(ctx,'kein Einzelfall',win(u,0.2,tu,0.15),u,0.2,Y,'#fff',110); pop(ctx,'gleicher Streit',win(u,tu,td,0.15),u,tu,Y,'#fff',110);
   ytcard(ctx,win(u,td,tr,0.3),u,td); pop(ctx,'Wer hat recht?',A(u,tr,0.15),u,tr,Y,'#fff',120); chip(ctx,'Schreib es in die Kommentare',CYc,A(u,tr+0.4,0.25),'#fff','rgba(229,72,77,0.95)');}]},
];
return {tag:'GEOFY · DOKU-TEASER', scenes, wt};
}
