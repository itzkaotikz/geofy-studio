// Story: Nadelöhre der Welt #1 – Der Suezkanal
// 193 km, keine Schleusen, 1869 · Singapur→Rotterdam ≈ 6.000 km / 9 Tage kürzer · ≈ 8 % Seehandel · Ever Given 23.–29.3.2021, ≈ 450 Schiffe · Rotes Meer seit Ende 2023
function makeStory(){
const {C,FD,FB,L,clamp,ease,eout,lerp,viewBox,label,rr,fit,hl}=KV;
const S_say=document.getElementById('script').textContent.trim().split(/\n\s*\n/).map(s=>s.replace(/\s+/g,' ').trim());
const wt=(sc,frag)=>{const i=Math.max(0,sc.say.indexOf(frag));
 if(sc.wordsT){let pos=0; for(const w of sc.wordsT){const j=sc.say.indexOf(w.w,pos); if(j+w.w.length>i) return w.t0; pos=j+w.w.length;} return sc.wordsT[sc.wordsT.length-1].t0;}
 return 0.25+i/sc.say.length*sc.speak;};
const P=(e,ll)=>e.proj(ll);
const tag=(e,ll,txt,a,dx=40,dy=12,col=C.target,size=30)=>{const q=P(e,ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]+dx,q[1]+dy,{color:col,alpha:a,font:`800 ${size}px ${FD}`});};
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*55,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function big(ctx,txt,x,y,a,col='#fff',size=120){if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,x,y); ctx.fillStyle=col; ctx.fillText(txt,x,y); ctx.restore();}
// dense great-circle sampling of a waypoint list
function dense(pts){const out=[]; for(let i=1;i<pts.length;i++){const f=d3.geoInterpolate(pts[i-1],pts[i]); const n=Math.max(2,Math.ceil(d3.geoDistance(pts[i-1],pts[i])*180/Math.PI/1.5)); for(let k=0;k<n;k++) out.push(f(k/n));} out.push(pts[pts.length-1]); return out;}
function route(e,pts,k,col,w=7,{dash=true,head=true,alpha=1}={}){if(k<=0||alpha<=0) return null; const {ctx,t}=e; const Q=pts.map(p=>P(e,p)); let tot=0; const seg=[]; for(let i=1;i<Q.length;i++){const d=Math.hypot(Q[i][0]-Q[i-1][0],Q[i][1]-Q[i-1][1]); seg.push(d>400?0:d); tot+=seg[i-1];}
 let rem=tot*clamp(k); ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round'; if(dash){ctx.setLineDash([18,12]); ctx.lineDashOffset=-t*50;} ctx.shadowColor=col; ctx.shadowBlur=10; ctx.beginPath(); ctx.moveTo(Q[0][0],Q[0][1]); let end=Q[0];
 for(let i=1;i<Q.length&&rem>0;i++){if(seg[i-1]===0){ctx.moveTo(Q[i][0],Q[i][1]); continue;} const f=Math.min(1,rem/seg[i-1]); end=[lerp(Q[i-1][0],Q[i][0],f),lerp(Q[i-1][1],Q[i][1],f)]; ctx.lineTo(end[0],end[1]); rem-=seg[i-1];} ctx.stroke(); ctx.setLineDash([]); ctx.shadowBlur=0;
 if(head&&k<1){ship(ctx,end[0],end[1],0,1,col);} ctx.restore(); return end;}
function ship(ctx,x,y,ang,s=1,col='#fff'){ctx.save(); ctx.translate(x,y); ctx.rotate(ang); ctx.scale(s,s); ctx.beginPath(); ctx.moveTo(-16,-7); ctx.lineTo(10,-7); ctx.lineTo(18,0); ctx.lineTo(10,7); ctx.lineTo(-16,7); ctx.closePath(); ctx.fillStyle=col; ctx.fill(); ctx.strokeStyle='#0B1C2A'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();}
const CANAL=[[32.31,31.27],[32.33,30.95],[32.29,30.62],[32.33,30.45],[32.43,30.35],[32.55,30.20],[32.57,30.02],[32.56,29.93]];
const PSD=[32.30,31.26], SUZ=[32.55,29.95], SIN=[103.82,1.26], RTM=[4.05,51.97], CAPE=[18.5,-35.2];
const R_SUEZ=dense([SIN,[98,5.5],[80.5,5.5],[52,12.6],[43.4,12.6],[38.5,20],[34.5,27.4],[32.56,29.93],[32.31,31.27],[25,33.5],[11,37.4],[-5.6,35.95],[-9.6,37],[-9.6,43],[-5,48.3],[1.4,50.9],RTM]);
const R_CAPE=dense([SIN,[105.8,-6.2],[95,-12],[60,-28],[35,-36],CAPE,[12,-28],[8,-10],[-5,2],[-18,12],[-18,26],[-12,36],[-9.6,43],[-5,48.3],[1.4,50.9],RTM]);
const RED=[[32.5,29.9],[35,27.8],[38,21.5],[41.5,15.5],[43.4,12.6],[45,12.2],[42.6,15.2],[39,21],[35.5,27.9],[34.4,29.5],[32.5,29.9]];
// schematic of the canal with Ever Given
function inset(e,a,u,{stuck=0,queue=0,dayK=-1}={}){if(a<=0) return; const {ctx,t}=e; const X=L-20, Y=560, W2=820, H2=560; ctx.save(); ctx.globalAlpha=a; ctx.translate(X,Y);
 ctx.save(); rr(ctx,0,0,W2,H2,30); ctx.clip(); ctx.fillStyle='#C9A86A'; ctx.fillRect(0,0,W2,H2); for(let i=0;i<70;i++){ctx.fillStyle='rgba(120,90,40,0.12)'; ctx.fillRect((i*137)%W2,(i*251)%H2,40,14);}
 const cx=W2*0.5, cw=120; ctx.fillStyle='#2D6F98'; ctx.fillRect(cx-cw/2,0,cw,H2); ctx.fillStyle='rgba(255,255,255,0.12)'; ctx.fillRect(cx-cw/2,0,10,H2); ctx.fillRect(cx+cw/2-10,0,10,H2);
 // Ever Given diagonal
 ctx.save(); ctx.translate(cx,H2*0.52); ctx.rotate(-0.95); const sl=330; ctx.fillStyle='#1E7A3C'; ctx.beginPath(); ctx.moveTo(-sl/2,-22); ctx.lineTo(sl/2-30,-22); ctx.lineTo(sl/2,0); ctx.lineTo(sl/2-30,22); ctx.lineTo(-sl/2,22); ctx.closePath(); ctx.fill();
 const cols=['#D94F3D','#2F7DD1','#E8B53A','#6FBF73','#E07B39']; for(let i=0;i<10;i++) for(let j=0;j<2;j++){ctx.fillStyle=cols[(i*3+j)%5]; ctx.fillRect(-sl/2+16+i*28,-17+j*17,24,14);} ctx.fillStyle='#fff'; ctx.fillRect(-sl/2+4,-18,10,36); ctx.restore();
 // queues
 const n=Math.round(queue); for(let i=0;i<Math.min(n,7);i++){ship(ctx,cx,H2*0.08+i*0+(-i*0),Math.PI/2,1.4,'#F6F1E7');}
 for(let i=0;i<Math.min(n,6);i++){ship(ctx,cx,26+i*0,0,0,'#fff');}
 for(let i=0;i<Math.min(Math.ceil(n/60),4);i++){ship(ctx,cx-15+((i%2)*30),40+i*40,Math.PI/2,1.4,'#F6F1E7'); ship(ctx,cx-15+((i%2)*30),H2-40-i*40,-Math.PI/2,1.4,'#F6F1E7');}
 ctx.font=`800 30px ${FD}`; ctx.fillStyle='#0B1C2A'; ctx.fillText('Mittelmeer ↑',24,44); ctx.fillText('Rotes Meer ↓',24,H2-24);
 if(stuck>0){ctx.globalAlpha=a*stuck; label(ctx,'Ever Given · 400 m',cx+60,H2*0.52-120,{color:'#fff',bg:'rgba(255,59,127,0.95)',font:`800 32px ${FD}`}); ctx.globalAlpha=a;}
 if(dayK>=0){const d=Math.min(6,1+Math.floor(dayK*6)); ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,W2-250,H2-130,220,100,18); ctx.fill(); ctx.font=`800 52px ${FD}`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.fillText(`Tag ${d}`,W2-140,H2-62);}
 ctx.restore(); rr(ctx,0,0,W2,H2,30); ctx.strokeStyle='rgba(246,241,231,0.6)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();}
function canalLine(e,k,a=1){if(k<=0) return; route(e,CANAL,k,'#FFE066',8,{dash:false,head:false,alpha:a});}

const vMid=viewBox([10,8,60,42]), vEgy=viewBox([27,25,38,34]), vCan=viewBox([30,28.6,35,32.2]), vWorldR=viewBox([-25,-42,112,58]), vTrade=viewBox([-10,5,60,57]), vEU=viewBox([-5,40,25,58]), vRed=viewBox([25,8,55,34]);

const scenes=[
 {head:'Ein Schiff legt die Welt lahm', headInstant:true, say:S_say[0], cams:[{at:0,view:vMid},{at:0.5,view:vEgy,fly:4.0},{at:sc=>wt(sc,'Suezkanal')-0.4,view:vCan,fly:2.0}],
  under:[e=>{const {u,sc}=e; hl(e,'EGY',C.sand,0.35*clamp((u-wt(sc,'Suezkanal'))/0.4));}],
  over:[e=>{const {u,sc,ctx,t}=e; const ts=wt(sc,'Suezkanal'), ai=clamp((u-0.2)/0.4)*(1-clamp((u-ts+0.3)/0.4)); const tq=wt(sc,'450'), kq=ease(clamp((u-tq+0.4)/1.4));
   inset(e,ai,u,{stuck:clamp((u-wt(sc,'stecken'))/0.4),queue:450*kq}); if(ai>0&&kq>0) big(ctx,`${Math.round(450*kq)} Schiffe warten`,540,1210,ai,'#fff',64);
   canalLine(e,(u-ts)/1.4); tag(e,[32.6,30.6],'Suezkanal',clamp((u-ts)/0.4),30,0,'#FFE066',36);}]},
 {head:'193 km, keine Schleuse', say:S_say[1], cams:[{at:0,view:vCan,fly:1.0},{at:sc=>wt(sc,'Mittelmeer')-0.4,view:viewBox([28.5,27.5,36.5,33]),fly:2.0},{at:sc=>wt(sc,'Schleuse')-0.4,view:vCan,fly:2.0},{at:sc=>wt(sc,'Eröffnet')-0.3,view:vEgy,fly:2.4}],
  under:[e=>{hl(e,'EGY',C.sand,0.3);}],
  over:[e=>{const {u,sc,ctx,t}=e; canalLine(e,1); pulse(e,PSD,t,clamp((u-0.3)/0.4),'#FFE066',10); pulse(e,SUZ,t,clamp((u-0.3)/0.4),'#FFE066',10);
   tag(e,PSD,'Port Said',clamp((u-0.3)/0.4),24,-30,'#fff',28); tag(e,SUZ,'Suez',clamp((u-0.3)/0.4),24,30,'#fff',28);
   tag(e,[30.2,32.3],'Mittelmeer',clamp((u-wt(sc,'Mittelmeer'))/0.4),-80,0,C.ice,32); tag(e,[33.6,28.6],'Rotes Meer',clamp((u-wt(sc,'Roten Meer'))/0.4),0,0,C.ice,32);
   const a1=clamp((u-wt(sc,'193'))/0.4); if(a1>0) label(ctx,'193 km',L+20,1180,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:a1,font:`800 44px ${FD}`});
   const a2=clamp((u-wt(sc,'Schleuse'))/0.4); if(a2>0) label(ctx,'0 Schleusen',L+260,1180,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:a2,font:`800 44px ${FD}`});
   const a3=clamp((u-wt(sc,'Eröffnet'))/0.4); if(a3>0) label(ctx,'eröffnet 1869',L+20,1255,{alpha:a3,font:`800 40px ${FD}`});}]},
 {head:'Der Umweg um Afrika', say:S_say[2], cams:[{at:0,view:vEgy,fly:1.0},{at:0.3,view:vWorldR,fly:2.6}],
  under:[e=>{}],
  over:[e=>{const {u,sc,ctx,t}=e; const tc=wt(sc,'Ohne'), tk=wt(sc,'herumfahren'); canalLine(e,1,0.8);
   route(e,R_CAPE,(u-tc)/(tk-tc+1.6),C.ice,7); route(e,R_SUEZ,(u-tk)/1.8,'#FFE066',7);
   pulse(e,SIN,t,clamp((u-0.5)/0.4),'#fff',10); pulse(e,RTM,t,clamp((u-0.5)/0.4),'#fff',10); tag(e,SIN,'Singapur',clamp((u-wt(sc,'Singapur'))/0.4),-60,50,'#fff',30); tag(e,RTM,'Rotterdam',clamp((u-wt(sc,'Rotterdam'))/0.4),-160,-30,'#fff',30);
   tag(e,CAPE,'Kap der Guten Hoffnung',clamp((u-tk)/0.4),-170,60,C.ice,28);
   const a6=clamp((u-wt(sc,'6.000'))/0.4); if(a6>0) label(ctx,'um Afrika: + 6.000 km',L+20,1180,{color:'#0B1C2A',bg:'rgba(159,216,245,0.95)',alpha:a6,font:`800 42px ${FD}`});
   const a9=clamp((u-wt(sc,'neun Tage'))/0.4); if(a9>0) label(ctx,'≈ 9 Tage länger',L+20,1255,{alpha:a9,font:`800 40px ${FD}`});}]},
 {head:'Ein Nadelöhr für die Welt', say:S_say[3], cams:[{at:0,view:vWorldR,fly:1.0},{at:0.3,view:vTrade,fly:2.4},{at:sc=>wt(sc,'bei uns')-0.6,view:vEU,fly:2.0}],
  under:[e=>{const {u,sc}=e; hl(e,'DEU',C.target,0.6*clamp((u-wt(sc,'bei uns'))/0.4));}],
  over:[e=>{const {u,sc,ctx,t}=e; canalLine(e,1); route(e,R_SUEZ,1,'#FFE066',5,{head:false,alpha:0.7});
   // ship stream along the route
   const pts=R_SUEZ.map(p=>P(e,p)); const nS=14; for(let i=0;i<nS;i++){const f=((t*0.04)+i/nS)%1; const idx=Math.floor(f*(pts.length-1)), q=pts[idx], q2=pts[Math.min(pts.length-1,idx+1)]; if(!q) continue; ship(ctx,q[0],q[1],Math.atan2(q2[1]-q[1],q2[0]-q[0]),1,'#fff');}
   const k8=ease(clamp((u-wt(sc,'acht Prozent')+0.3)/1.0)); big(ctx,`≈ ${Math.round(8*k8)} %`,540,700,clamp((u-wt(sc,'acht Prozent')+0.3)/0.4)*(1-clamp((u-wt(sc,'bei uns'))/0.4)),'#FFE066',130);
   const a0=clamp((u-wt(sc,'acht Prozent'))/0.4); if(a0>0) label(ctx,'des weltweiten Seehandels',L+20,1180,{alpha:a0,font:`800 38px ${FD}`});
   [['Öl',0],['Kleidung',1],['Elektronik',2]].forEach(([n,i])=>{const ai=clamp((u-wt(sc,n))/0.3); if(ai>0) label(ctx,n,L+20+i*230,1255,{color:'#0B1C2A',bg:'rgba(246,241,231,0.95)',alpha:ai,font:`800 36px ${FD}`});});
   tag(e,[10.0,53.55],'Hamburg',clamp((u-wt(sc,'bei uns'))/0.4),24,-30,C.target,32); pulse(e,[10.0,53.55],t,clamp((u-wt(sc,'bei uns'))/0.4),C.target,10);}]},
 {head:'Die Ever Given', say:S_say[4], cams:[{at:0,view:vEU,fly:1.0},{at:0.3,view:vCan,fly:3.0},{at:sc=>wt(sc,'Weltweit')-0.4,view:vMid,fly:2.4}],
  under:[e=>{hl(e,'EGY',C.sand,0.25);}],
  over:[e=>{const {u,sc,ctx}=e; canalLine(e,1); const ai=clamp((u-0.3)/0.5)*(1-clamp((u-wt(sc,'Weltweit')+0.2)/0.4)); const td=wt(sc,'sechs Tage');
   inset(e,ai,u,{stuck:clamp((u-wt(sc,'400'))/0.4),queue:450,dayK:u<td-0.4?-1:clamp((u-td+0.4)/1.6)});
   const ad=clamp((u-wt(sc,'23.')||0)/0.4); const az=clamp((u-wt(sc,'zu spät'))/0.4); if(az>0) label(ctx,'Lieferungen weltweit verspätet',L+20,1250,{color:'#fff',bg:'rgba(255,59,127,0.95)',alpha:az,font:`800 40px ${FD}`});
   const am=clamp((u-wt(sc,'sechs Tage'))/0.4); if(am>0&&az<=0) label(ctx,'23. – 29. März 2021',L+20,1250,{alpha:am,font:`800 38px ${FD}`});}]},
 {head:'Das Rote Meer heute', say:S_say[5], cams:[{at:0,view:vMid,fly:1.0},{at:0.3,view:vRed,fly:2.4},{at:sc=>wt(sc,'langen Weg')-0.4,view:vWorldR,fly:2.4}],
  under:[e=>{const {u,sc,ctx,path}=e; const a=clamp((u-wt(sc,'Rote Meer'))/0.4); if(a>0){ctx.save(); ctx.beginPath(); path({type:'Polygon',coordinates:[RED.slice().reverse()]}); ctx.fillStyle=`rgba(255,59,127,${0.35*a})`; ctx.fill(); ctx.strokeStyle=`rgba(255,59,127,${a})`; ctx.lineWidth=4; ctx.setLineDash([10,8]); ctx.stroke(); ctx.restore();}}],
  over:[e=>{const {u,sc,ctx}=e; canalLine(e,1,0.8); tag(e,[39,19],'Rotes Meer',clamp((u-wt(sc,'Rote Meer'))/0.4),30,0,C.target,34);
   const a1=clamp((u-wt(sc,'Angriffen'))/0.4); if(a1>0) label(ctx,'seit Ende 2023: Angriffe auf Schiffe',L+20,1180,{alpha:a1*(1-clamp((u-wt(sc,'langsam'))/0.4)),font:`800 34px ${FD}`});
   const tl=wt(sc,'langen Weg'), tr=wt(sc,'langsam'); route(e,R_CAPE,(u-tl)/1.8,C.ice,7); route(e,R_SUEZ,(u-tr)/2.0,'#FFE066',6,{alpha:0.9});
   const ar=clamp((u-tr)/0.4); if(ar>0) label(ctx,'Verkehr erholt sich langsam',L+20,1250,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',alpha:ar,font:`800 38px ${FD}`});}]},
 {say:S_say[6], cams:[{at:0,view:vWorldR,fly:1.2},{at:1.4,view:vMid,fly:4.5}],
  under:[e=>{}],
  over:[e=>{canalLine(e,1); route(e,R_SUEZ,1,'#FFE066',5,{head:false,alpha:0.7});}],
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
return {tag:'NADELÖHRE #1', scenes, wt};
}
