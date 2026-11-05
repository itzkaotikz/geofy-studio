// Story: Wow #5 – Länder, die es nicht mehr gibt
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
function big(ctx,txt,a,y=700,col='#fff',size=120){if(a<=0||window.NO_CHIPS) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,y); ctx.fillStyle=col; ctx.fillText(txt,540,y); ctx.restore();}
const cs=(e,ids,col,a)=>ids.forEach(k=>hl(e,k,col,a,{outline:false}));
function pulse(e,ll,t,a,col=C.target,r0=11){if(a<=0) return; const {ctx}=e; const q=P(e,ll); ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],r0+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],r0,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();}
function line(e,pts,col,prog,w=10,dash=null){if(prog<=0) return; const {ctx}=e; const q=pts.map(p=>P(e,p)); const n=Math.max(2,Math.floor(q.length*Math.min(1,prog))+(prog>=1?0:1)); ctx.save(); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='rgba(5,14,24,0.7)'; ctx.lineWidth=w+7; ctx.beginPath(); q.slice(0,n).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.strokeStyle=col; ctx.lineWidth=w; if(dash) ctx.setLineDash(dash); ctx.stroke(); ctx.restore();}
function arrow(ctx,x0,y0,x1,y1,a,col,w=12){if(a<=0) return; const k=eout(a); const x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; ctx.save(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*22,y+Math.sin(an)*22); ctx.lineTo(x+Math.cos(an+2.4)*26,y+Math.sin(an+2.4)*26); ctx.lineTo(x+Math.cos(an-2.4)*26,y+Math.sin(an-2.4)*26); ctx.closePath(); ctx.fill(); ctx.restore();}


const G10=window.G10; const F=k=>({type:'Feature',geometry:G10[k]});
function fill(e,k,col,a,lw=3){if(a<=0) return; const {ctx,path}=e; ctx.save(); ctx.beginPath(); path(F(k)); ctx.globalAlpha=a*0.4; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=Math.min(1,a*1.5); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();}



const SU=['RUS','UKR','BLR','EST','LVA','LTU','MDA','GEO','ARM','AZE','KAZ','UZB','TKM','KGZ','TJK'];
const YU=['SVN','HRV','BIH','SRB','MNE','MKD','KOS'];
const GO='#FFE066', TE='#33D1B0', PK='#FF3D81', RD='#E5484D';
const vE=viewBox([-12,28,62,72]), vD=viewBox([4.5,47.0,16.5,55.5]), vU=viewBox([18,22,150,80]), vY=viewBox([12.5,39.5,25.0,47.5]), vC=viewBox([10.5,46.0,24.0,52.5]), vT=viewBox([27.5,-12.5,42.0,-0.5]), vW=viewBox([-25,-38,150,78]);
const vG=vW;
const all=(e,a,col)=>{fill(e,'DDR',col||OR,a,2); SU.forEach(k=>fill(e,k,col||RD,a,1.5)); YU.forEach(k=>fill(e,k,col||BL,a,1.5)); ['CZE','SVK'].forEach(k=>fill(e,k,col||TE,a,1.5));};
const scenes=[
 {head:'Länder, die es nicht mehr gibt', headInstant:true, say:S_say[0], cams:[{at:0,view:vE}],
  under:[e=>{const {u,sc}=e; all(e,0.8*clamp((u-0.3)/1.2));}],
  over:[e=>{const {u,sc,ctx}=e; chip(ctx,'Heute: verschwunden',1180,clamp((u-wt(sc,'nicht mehr'))/0.4),'#fff','rgba(229,72,77,0.95)');}]},
 {head:'Die DDR', say:S_say[1], cams:[{at:0,view:vE},{at:0.1,view:vD,fly:2.0}],
  under:[e=>{const {u,sc}=e; const b=clamp((u-wt(sc,'nur noch'))/0.6); fill(e,'DEU',GO,0.15+0.6*b,2); fill(e,'DDR',OR,0.85*clamp((u-wt(sc,'DDR'))/0.4)*(1-b),3);}],
  over:[e=>{const {u,sc,ctx}=e; tag(e,[12.6,51.9],'DDR',clamp((u-wt(sc,'DDR'))/0.4)*(1-clamp((u-wt(sc,'nur noch'))/0.4)),0,0,'#fff',40); big(ctx,'1949–1990',clamp((u-wt(sc,'1949'))/0.4)*(1-clamp((u-wt(sc,'Oktober'))/0.4)),570,'#fff',130); chip(ctx,'3. Oktober 1990: Beitritt',1180,clamp((u-wt(sc,'Oktober'))/0.4)*(1-clamp((u-wt(sc,'nur noch'))/0.4))); chip(ctx,'Ein Deutschland',1180,clamp((u-wt(sc,'nur noch'))/0.4),'#0B1C2A','rgba(255,224,102,0.96)');}]},
 {head:'Die Sowjetunion', say:S_say[2], cams:[{at:0,view:vD},{at:0.1,view:vU,fly:2.5}],
  under:[e=>{const {u,sc}=e; const a=clamp((u-wt(sc,'Sowjetunion'))/0.5), b=clamp((u-wt(sc,'zerfiel'))/0.5); SU.forEach(k=>fill(e,k,RD,0.8*a*(1-0.3*b),1.5)); fill(e,'RUS',OR,0.85*clamp((u-wt(sc,'Russland'))/0.4),3); fill(e,'UKR',GO,0.85*clamp((u-wt(sc,'Ukraine'))/0.4),3); fill(e,'KAZ',TE,0.85*clamp((u-wt(sc,'Kasachstan'))/0.4),3);}],
  over:[e=>{const {u,sc,ctx}=e; chip(ctx,'größtes Land der Erde',1180,clamp((u-wt(sc,'größte'))/0.4)*(1-clamp((u-wt(sc,'zerfiel'))/0.4))); big(ctx,'15',clamp((u-wt(sc,'15'))/0.4)*(1-clamp((u-wt(sc,'darunter'))/0.4)),570,'#fff',170); chip(ctx,'Ende 1991: 15 Staaten',1180,clamp((u-wt(sc,'zerfiel'))/0.4),'#fff','rgba(229,72,77,0.95)'); tag(e,[95,63],'Russland',clamp((u-wt(sc,'Russland'))/0.4),0,0,'#fff',34); tag(e,[31.5,49.2],'Ukraine',clamp((u-wt(sc,'Ukraine'))/0.4),0,0,'#fff',28); tag(e,[67,48],'Kasachstan',clamp((u-wt(sc,'Kasachstan'))/0.4),0,0,'#fff',30);}]},
 {head:'Jugoslawien', say:S_say[3], cams:[{at:0,view:vU},{at:0.1,view:vY,fly:2.5}],
  under:[e=>{const {u,sc}=e; const a=clamp((u-wt(sc,'Jugoslawien'))/0.5), b=clamp((u-wt(sc,'mehrere'))/0.6); YU.forEach(k=>fill(e,k,BL,0.8*a*(1-0.5*b),1.5)); fill(e,'SVN',GO,0.85*clamp((u-wt(sc,'Slowenien'))/0.4),3); fill(e,'HRV',TE,0.85*clamp((u-wt(sc,'Kroatien'))/0.4),3); fill(e,'SRB',OR,0.85*clamp((u-wt(sc,'Serbien'))/0.4),3);}],
  over:[e=>{const {u,sc,ctx}=e; big(ctx,'1991',clamp((u-wt(sc,'1991'))/0.4)*(1-clamp((u-wt(sc,'Heute'))/0.4)),570,'#fff',150); chip(ctx,'heute mehrere Staaten',1180,clamp((u-wt(sc,'mehrere'))/0.4)); tag(e,[14.8,46.15],'Slowenien',clamp((u-wt(sc,'Slowenien'))/0.4),0,-10,'#fff',26); tag(e,[16.3,45.4],'Kroatien',clamp((u-wt(sc,'Kroatien'))/0.4),0,0,'#fff',26); tag(e,[20.8,44.0],'Serbien',clamp((u-wt(sc,'Serbien'))/0.4),0,0,'#fff',26);}]},
 {head:'Die Tschechoslowakei', say:S_say[4], cams:[{at:0,view:vY},{at:0.1,view:vC,fly:2.5}],
  under:[e=>{const {u,sc}=e; const a=clamp((u-wt(sc,'Tschechoslowakei'))/0.5); const c=clamp((u-wt(sc,'Tschechien'))/0.4), s=clamp((u-wt(sc,'Slowakei'))/0.4); fill(e,'CZE',c>0?BL:TE,0.85*a,c>0?3:1.5); fill(e,'SVK',TE,0.85*a,s>0?3:1.5);}],
  over:[e=>{const {u,sc,ctx}=e; big(ctx,'1993',clamp((u-wt(sc,'1993'))/0.4)*(1-clamp((u-wt(sc,'Daraus'))/0.4)),570,'#fff',150); tag(e,[15.4,49.8],'Tschechien',clamp((u-wt(sc,'Tschechien'))/0.4),0,0,'#fff',32); tag(e,[19.5,48.7],'Slowakei',clamp((u-wt(sc,'Slowakei'))/0.4),0,0,'#fff',32); chip(ctx,'friedliche Trennung',1180,clamp((u-wt(sc,'friedlich'))/0.4)*(1-clamp((u-wt(sc,'Samtene'))/0.4)),'#0B1C2A','rgba(51,209,176,0.96)'); chip(ctx,'„Samtene Scheidung“',1180,clamp((u-wt(sc,'Samtene'))/0.4));}]},
 {head:'Aus zwei mach eins', say:S_say[5], cams:[{at:0,view:vC},{at:0.1,view:vT,fly:3.0}],
  under:[e=>{const {u,sc}=e; const t=clamp((u-wt(sc,'1964'))/0.6); fill(e,'TZA',t>0.5?GO:OR,0.8*clamp((u-wt(sc,'Tanganjika'))/0.4),3); fill(e,'ZNZ',t>0.5?GO:PK,0.95*clamp((u-wt(sc,'Sansibar'))/0.4),3);}],
  over:[e=>{const {u,sc,ctx}=e; const t=clamp((u-wt(sc,'1964'))/0.4); tag(e,[34.5,-6.5],'Tanganjika',clamp((u-wt(sc,'Tanganjika'))/0.4)*(1-t),0,0,'#fff',32); tag(e,[39.3,-6.1],'Sansibar',clamp((u-wt(sc,'Sansibar'))/0.4)*(1-t),0,-60,'#fff',30); tag(e,[34.5,-6.5],'Tansania',t,0,0,'#fff',40); big(ctx,'1964',t*(1-clamp((u-wt(sc,'Name'))/0.4)),570,'#fff',150); chip(ctx,'TANganjika + SANsibar = TANSANIA',1180,clamp((u-wt(sc,'Name'))/0.4),'#0B1C2A','rgba(255,224,102,0.96)',34);}]},
 {head:'Grenzen sind nicht für immer', say:S_say[6], cams:[{at:0,view:vT},{at:0.1,view:vW,fly:3.0}],
  under:[e=>{const {u}=e; all(e,0.6*clamp(u/1.5)); fill(e,'TZA',GO,0.6*clamp(u/1.5),1.5);}],
  over:[e=>{const {u,sc,ctx}=e; chip(ctx,'Die Weltkarte ändert sich ständig',1180,clamp((u-wt(sc,'Doch'))/0.4));}]},
 {say:S_say[7], cams:[{at:0,view:vG,fly:1.2},{at:1.4,view:vG,fly:4.5}],
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
return {tag:'GEOFY · WOW #5', scenes, wt};
}
