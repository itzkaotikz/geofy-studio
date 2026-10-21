(async function(){
const APP_VERSION='2.0.0';
const W=1080,H=1920;
const C={bg:'#0B1C2A',ocean:'#10283B',grat:'rgba(246,241,231,0.07)',land:'#E9DFC7',landDim:'#B9B09B',target:'#FF3B7F',ok:'#33D1B0',ink:'#F6F1E7',mute:'#8CA3B6',line:'#1F4360'};
const FD='"Bricolage Grotesque", "Hanken Grotesk", sans-serif', FB='"Hanken Grotesk", sans-serif', FM='"JetBrains Mono", monospace';

const NAMES={ /* iso3: [de, en] */
PRT:['Portugal','Portugal'],AUT:['Österreich','Austria'],ROU:['Rumänien','Romania'],SVK:['Slowakei','Slovakia'],MKD:['Nordmazedonien','North Macedonia'],
POL:['Polen','Poland'],HRV:['Kroatien','Croatia'],LTU:['Litauen','Lithuania'],BIH:['Bosnien und Herzegowina','Bosnia and Herzegovina'],MDA:['Moldau','Moldova'],
BGR:['Bulgarien','Bulgaria'],SRB:['Serbien','Serbia'],LVA:['Lettland','Latvia'],MNE:['Montenegro','Montenegro'],ALB:['Albanien','Albania'],
EGY:['Ägypten','Egypt'],NGA:['Nigeria','Nigeria'],KEN:['Kenia','Kenya'],MLI:['Mali','Mali'],BWA:['Botswana','Botswana'],
PER:['Peru','Peru'],URY:['Uruguay','Uruguay'],PRY:['Paraguay','Paraguay'],BOL:['Bolivien','Bolivia'],GUY:['Guyana','Guyana'],
VNM:['Vietnam','Vietnam'],KAZ:['Kasachstan','Kazakhstan'],MNG:['Mongolei','Mongolia'],LAO:['Laos','Laos'],KGZ:['Kirgisistan','Kyrgyzstan'],
DEU:['Deutschland','Germany'],FRA:['Frankreich','France'],ESP:['Spanien','Spain'],ITA:['Italien','Italy'],GBR:['Vereinigtes Königreich','United Kingdom'],
IRL:['Irland','Ireland'],NLD:['Niederlande','Netherlands'],BEL:['Belgien','Belgium'],LUX:['Luxemburg','Luxembourg'],CHE:['Schweiz','Switzerland'],
CZE:['Tschechien','Czechia'],HUN:['Ungarn','Hungary'],SVN:['Slowenien','Slovenia'],GRC:['Griechenland','Greece'],DNK:['Dänemark','Denmark'],
NOR:['Norwegen','Norway'],SWE:['Schweden','Sweden'],FIN:['Finnland','Finland'],EST:['Estland','Estonia'],BLR:['Belarus','Belarus'],UKR:['Ukraine','Ukraine'],
RUS:['Russland','Russia'],ISL:['Island','Iceland'],CYP:['Zypern','Cyprus'],TUR:['Türkei','Turkey'],USA:['USA','USA'],CAN:['Kanada','Canada'],
MEX:['Mexiko','Mexico'],BRA:['Brasilien','Brazil'],ARG:['Argentinien','Argentina'],CHL:['Chile','Chile'],COL:['Kolumbien','Colombia'],VEN:['Venezuela','Venezuela'],
ECU:['Ecuador','Ecuador'],SUR:['Suriname','Suriname'],CHN:['China','China'],IND:['Indien','India'],JPN:['Japan','Japan'],KOR:['Südkorea','South Korea'],
PRK:['Nordkorea','North Korea'],THA:['Thailand','Thailand'],KHM:['Kambodscha','Cambodia'],MMR:['Myanmar','Myanmar'],IDN:['Indonesien','Indonesia'],
IRN:['Iran','Iran'],IRQ:['Irak','Iraq'],SAU:['Saudi-Arabien','Saudi Arabia'],AFG:['Afghanistan','Afghanistan'],PAK:['Pakistan','Pakistan'],
UZB:['Usbekistan','Uzbekistan'],TKM:['Turkmenistan','Turkmenistan'],TJK:['Tadschikistan','Tajikistan'],NPL:['Nepal','Nepal'],BGD:['Bangladesch','Bangladesh'],
ZAF:['Südafrika','South Africa'],MAR:['Marokko','Morocco'],DZA:['Algerien','Algeria'],TUN:['Tunesien','Tunisia'],LBY:['Libyen','Libya'],SDN:['Sudan','Sudan'],
ETH:['Äthiopien','Ethiopia'],TZA:['Tansania','Tanzania'],COD:['DR Kongo','DR Congo'],AGO:['Angola','Angola'],NAM:['Namibia','Namibia'],ZMB:['Sambia','Zambia'],
ZWE:['Simbabwe','Zimbabwe'],MOZ:['Mosambik','Mozambique'],MDG:['Madagaskar','Madagascar'],GHA:['Ghana','Ghana'],NER:['Niger','Niger'],TCD:['Tschad','Chad'],
AUS:['Australien','Australia'],NZL:['Neuseeland','New Zealand'],GEO:['Georgien','Georgia'],ARM:['Armenien','Armenia'],AZE:['Aserbaidschan','Azerbaijan']
};
const REGIONS={
 europe:{de:'Europa',en:'Europe',box:[[-25,34],[45,71]]},
 africa:{de:'Afrika',en:'Africa',box:[[-20,-36],[53,38]]},
 samerica:{de:'Südamerika',en:'South America',box:[[-82,-56],[-34,13]]},
 asia:{de:'Asien',en:'Asia',box:[[25,-11],[150,56]]},
 namerica:{de:'Nordamerika',en:'North America',box:[[-130,5],[-55,60]]},
 oceania:{de:'Ozeanien',en:'Oceania',box:[[110,-48],[180,0]]},
 world:{de:'Welt',en:'World',box:[[-170,-56],[180,78]]}
};
const PRESETS=[
 {id:'eu1',label:'Europa · Level 1',region:'europe',ids:['PRT','AUT','ROU','SVK','MKD']},
 {id:'eu2',label:'Europa · Level 2',region:'europe',ids:['POL','HRV','LTU','BIH','MDA']},
 {id:'eu3',label:'Europa · Level 3',region:'europe',ids:['BGR','SRB','LVA','MNE','ALB']},
 {id:'af1',label:'Afrika · Level 1',region:'africa',ids:['EGY','NGA','KEN','MLI','BWA']},
 {id:'sa1',label:'Südamerika · Level 1',region:'samerica',ids:['PER','URY','PRY','BOL','GUY']},
 {id:'as1',label:'Asien · Level 1',region:'asia',ids:['VNM','KAZ','MNG','LAO','KGZ']}
];
const T={
 de:{eyebrow:(r,e)=>`GEO-QUIZ · ${r.toUpperCase()} · #${String(e).padStart(3,'0')}`,title:'Erkennst du alle 5 Länder?',sub:'Von leicht bis Profi. Zähl mit und verrat uns dein Ergebnis in den Kommentaren.',swipe:'Wischen zum Start',
  q:i=>`LAND ${i} / 5`,ask:'Welches Land ist markiert?',later:'Auflösung auf der letzten Slide',levels:['Leicht','Leicht','Mittel','Schwer','Profi'],
  sol:'Auflösung',how:'Wie viele hattest du?',comment:'Schreib deine Lösung in die Kommentare',cta:'Gib dem Video ein Like, schreib deine Lösung in die Kommentare und schick es jemandem, der sein Wissen testen soll.',follow:h=>`Folge ${h} für das nächste Quiz`,go:'LOS',
  caption:c=>{const H=['Wie viele der 5 Länder erkennst du?','Schaffst du 5/5? Die letzten beiden haben es in sich.','Nur echte Geo-Profis erkennen alle 5.'];
   const tags=['#geoquiz',c.tags[1]||c.tags[0]||'#länderquiz','#geografie','#länderquiz','#lernenmittiktok']; // 5, most relevant first
   return `#${c.ep} · ${c.region}${c.level?' · '+c.level:''} 🌍
${H[(c.n-1)%H.length]}
Zähl mit: 3/5, 4/5 oder 5/5? Gib dem Video ein Like, schreib deine Lösung in die Kommentare und schick es jemandem, der sein Wissen testen soll.

${tags.join(' ')}`;}},
 en:{eyebrow:(r,e)=>`GEO QUIZ · ${r.toUpperCase()} · #${String(e).padStart(3,'0')}`,title:'Can you name all 5 countries?',sub:'Easy to expert. Keep score and drop your result in the comments.',swipe:'Swipe to start',
  q:i=>`COUNTRY ${i} / 5`,ask:'Which country is highlighted?',later:'Answers on the last slide',levels:['Easy','Easy','Medium','Hard','Expert'],
  sol:'Answers',how:'How many did you get?',comment:'Drop your answer in the comments',cta:'Like the video, drop your answer in the comments and send it to someone who should test their knowledge.',follow:h=>`Follow ${h} for the next quiz`,go:'GO',
  caption:c=>{const H=['How many of these 5 countries can you name?','Can you get 5/5? The last two are tough.','Only real geography pros get all 5.'];
   const tags=['#geoquiz',c.tags[1]||c.tags[0]||'#mapquiz','#geography','#mapquiz','#learnontiktok']; // 5, most relevant first
   return `#${c.ep} · ${c.region}${c.level?' · '+c.level:''} 🌍
${H[(c.n-1)%H.length]}
Keep score: 3/5, 4/5 or 5/5? Like the video, drop your answer in the comments and send it to someone who should test their knowledge.

${tags.join(' ')}`;}}
};

const state={channel:'geofy',preset:PRESETS[1].id,lang:'de',ep:2,handle:'@geofy',think:5,ids:PRESETS[1].ids.slice(),region:'europe'};
try{const s=JSON.parse(localStorage.getItem('geofy-state')||'null'); if(s&&s.ids&&s.ids.length===5) Object.assign(state,s);}catch(e){}
if(!state.handle||/^@mapcheck/.test(state.handle)) state.handle='@geofy'; if(!state.think) state.think=5;
function persist(){try{localStorage.setItem('geofy-state',JSON.stringify(state));}catch(e){}}

// ---------- channels (each future channel brings its own name, handle and palette) ----------
const CHANNELS=[{id:'geofy',name:'geofy',label:'Geofy',handle:'@geofy',colors:{bg:'#0B1C2A',ocean:'#10283B',land:'#E9DFC7',landDim:'#B9B09B',target:'#FF3B7F',ok:'#33D1B0',ink:'#F6F1E7',mute:'#8CA3B6'}}];
let CH=CHANNELS[0];
// ---------- data ----------
let world=null; try{world=await (await fetch('data/world.json')).json();}catch(e){}
if(!world||!window.d3){document.getElementById('loadErr').hidden=false;return;}
Object.assign(NAMES,{TWN:['Taiwan','Taiwan'],CHN:['China','China'],COG:['Republik Kongo','Republic of the Congo'],CIV:['Elfenbeinküste','Ivory Coast'],SWZ:['Eswatini','Eswatini'],DOM:['Dominikanische Republik','Dominican Republic'],CAF:['Zentralafrikanische Rep.','Central African Rep.'],BIH:['Bosnien und Herzegowina','Bosnia and Herzegovina']});
const features=world.features.filter(f=>f.id&&f.id!=='ATA'&&f.geometry);
const byId=new Map(features.map(f=>[f.id,f]));
features.forEach(f=>{f.bb=d3.geoBounds(f); f.loF=f.properties.lo?{type:'Feature',id:f.id,geometry:f.properties.lo}:null;});
// Land for one frame as a single Path2D: only countries in view, light outlines when zoomed out
function landPath(proj,box,scale){const [x,y,w,h]=box;
 const pts=[[x,y],[x+w,y],[x,y+h],[x+w,y+h],[x+w/2,y],[x+w/2,y+h],[x,y+h/2],[x+w,y+h/2]].map(p=>proj.invert(p)).filter(p=>p&&isFinite(p[0])&&isFinite(p[1]));
 let lon0=-180,lon1=180,lat0=-90,lat1=90;
 if(pts.length===8){lon0=Math.min(...pts.map(p=>p[0]))-1; lon1=Math.max(...pts.map(p=>p[0]))+1; lat0=Math.min(...pts.map(p=>p[1]))-1; lat1=Math.max(...pts.map(p=>p[1]))+1; if(lon1-lon0>300){lon0=-180;lon1=180;}}
 const lo=scale<1600, p2=new Path2D(), path=d3.geoPath(proj,p2);
 for(const f of features){const b=f.bb; if(b[1][1]<lat0||b[0][1]>lat1) continue; if(b[0][0]<=b[1][0]&&(b[1][0]<lon0||b[0][0]>lon1)) continue;
  const g=lo?f.loF:f; if(g) path(g);}
 return p2;}
const nameOf=id=>{const n=NAMES[id]; if(n) return state.lang==='de'?n[0]:n[1]; const f=byId.get(id); if(!f) return id; return (state.lang==='de'?f.properties.de:f.properties.en)||f.properties.en||id;};

function polyArea(p){let a=d3.geoArea(p); if(a>2*Math.PI) a=4*Math.PI-a; return a;}
function mainPart(f){const g=f.geometry; if(g.type!=='MultiPolygon') return {type:'Feature',geometry:g};
 let best=null,ba=-1; for(const c of g.coordinates){const p={type:'Polygon',coordinates:c}; const a=polyArea(p); if(a>ba){ba=a;best=p;}} return {type:'Feature',geometry:best};}

// a "view" is {lon,lat,scale} for a mercator centred in a box
function viewFor(obj,box,pad,maxScale){
 const [x,y,w,h]=box; const p=d3.geoMercator().fitExtent([[x+w*pad,y+h*pad],[x+w*(1-pad),y+h*(1-pad)]],obj);
 let s=p.scale(); const c=p.invert([x+w/2,y+h/2]);
 if(maxScale&&s>maxScale){ const g=d3.geoCentroid(obj); return {lon:g[0],lat:g[1],scale:maxScale}; }
 return {lon:c[0],lat:c[1],scale:s};
}
function projFor(v,box){const [x,y,w,h]=box; const p=d3.geoMercator().scale(v.scale).translate([0,0]); const q=p([v.lon,v.lat]); return p.translate([x+w/2-q[0],y+h/2-q[1]]);}
const lerp=(a,b,t)=>a+(b-a)*t;
function lerpView(a,b,t){return {lon:lerp(a.lon,b.lon,t),lat:lerp(a.lat,b.lat,t),scale:Math.exp(lerp(Math.log(a.scale),Math.log(b.scale),t))};}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));

const grat=d3.geoGraticule().step([10,10])();
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}

function drawMap(ctx,box,view,opt={}){
 const [x,y,w,h]=box; const r=opt.radius??36;
 ctx.save(); rr(ctx,x,y,w,h,r); ctx.clip();
 ctx.fillStyle=C.ocean; ctx.fillRect(x,y,w,h);
 const proj=projFor(view,box); const path=d3.geoPath(proj,ctx);
 ctx.beginPath(); path(grat); ctx.strokeStyle=C.grat; ctx.lineWidth=2; ctx.stroke();
 const land=landPath(proj,box,view.scale); ctx.fillStyle=opt.landColor||C.land; ctx.fill(land);
 if(opt.target){const f=byId.get(opt.target); if(f){
   ctx.globalAlpha=opt.targetAlpha??1;
   ctx.beginPath(); path(f); ctx.fillStyle=opt.targetColor||C.target; ctx.fill();
   ctx.globalAlpha=1;}}
 ctx.strokeStyle=C.bg; ctx.lineWidth=opt.border??2.4; ctx.lineJoin='round'; ctx.stroke(land);
 if(opt.target&&opt.outline){const f=byId.get(opt.target); ctx.beginPath(); path(f); ctx.strokeStyle=opt.outline; ctx.lineWidth=6; ctx.stroke();}
 ctx.restore();
 ctx.save(); rr(ctx,x+1,y+1,w-2,h-2,r); ctx.strokeStyle='rgba(246,241,231,0.14)'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();
 return proj;
}

function wrap(ctx,text,x,y,maxW,lh,opt={}){
 const words=text.split(' '); let line=''; const lines=[];
 for(const w of words){const t=line?line+' '+w:w; if(ctx.measureText(t).width>maxW&&line){lines.push(line);line=w;} else line=t;}
 lines.push(line); lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lh)); return lines.length;
}
function coordLabel(id){const f=byId.get(id); if(!f) return ''; const g=d3.geoCentroid(mainPart(f));
 return `${Math.abs(g[1]).toFixed(1)}° ${g[1]>=0?'N':'S'}  ·  ${Math.abs(g[0]).toFixed(1)}° ${g[0]>=0?'E':'W'}`;}

function bg(ctx){ctx.fillStyle=C.bg;ctx.fillRect(0,0,W,H);
 const g=ctx.createRadialGradient(W/2,880,80,W/2,880,1250); g.addColorStop(0,'#123049'); g.addColorStop(1,'#081521'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);}
function brand(ctx,y=1390){
 ctx.font=`800 46px ${FD}`; ctx.fillStyle=C.ink; ctx.textBaseline='alphabetic'; ctx.textAlign='left';
 ctx.fillText(CH.name,LEFT,y); const w=ctx.measureText(CH.name).width; ctx.fillStyle=C.target; ctx.fillText('.',LEFT+w+2,y);
 ctx.font=`500 26px ${FM}`; ctx.fillStyle=C.mute; ctx.fillText(state.handle,LEFT,y+44);}
function pips(ctx,x,y,n){for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(x+i*34,y,10,0,Math.PI*2);ctx.fillStyle=i<n?C.target:'rgba(246,241,231,0.18)';ctx.fill();}}

// TikTok safe area, measured on a real upload: phones crop ~50px per side, search bar + status bar cover y<290,
// the right rail starts at x≈900 below y≈870, avatar/name/caption cover y>1460.
const LEFT=100, MAPW=780, SAFE_TOP=300, SAFE_BOTTOM=1440;
const regionView=()=>{const r=REGIONS[state.region]; return viewFor({type:'MultiPoint',coordinates:r.box},[LEFT,520,MAPW,860],0.02);};
function qView(id,box){const f=byId.get(id); return viewFor(mainPart(f),box,0.3,3400);}

// ---------- shared layout (identical to the knowledge videos) ----------
// watermark row y 292 · headline y 368 · content card y 440–1340 · bottom line centred at x 555, baseline 1560
const ROW_Y=292, HEAD_Y=368, QB=[100,440,780,900], SUB_X=555, SUB_Y=1560, SUB_W=660;
function fitFont(ctx,text,weight,max,min,maxW,fam){let z=max; ctx.font=`${weight} ${z}px ${fam}`; while(z>min&&ctx.measureText(text).width>maxW){z-=4; ctx.font=`${weight} ${z}px ${fam}`;} return z;}
function mark(ctx){ctx.save(); ctx.globalAlpha=0.55; ctx.font=`800 30px ${FD}`; ctx.fillStyle=C.ink; ctx.textAlign='left'; ctx.fillText(CH.name,LEFT,ROW_Y); const w=ctx.measureText(CH.name).width; ctx.fillStyle=C.target; ctx.fillText('.',LEFT+2+w,ROW_Y); ctx.restore();}
function rowRight(ctx,text,n){ctx.save(); ctx.textAlign='right'; ctx.font=`700 24px ${FM}`; ctx.fillStyle=C.mute; ctx.fillText(text,n!=null?LEFT+MAPW-190:LEFT+MAPW,ROW_Y-2); ctx.restore(); if(n!=null) pips(ctx,LEFT+MAPW-146,ROW_Y-10,n);}
function headline(ctx,text,col=C.ink,alpha=1){if(!text) return; ctx.save(); ctx.globalAlpha=alpha; ctx.shadowColor='rgba(0,0,0,0.45)'; ctx.shadowBlur=14; ctx.textAlign='left';
 const z=fitFont(ctx,text,800,66,46,MAPW,FD); ctx.fillStyle=col; const ls=[]; let l=''; for(const w of text.split(' ')){const t=l?l+' '+w:w; if(ctx.measureText(t).width>MAPW&&l){ls.push(l);l=w;} else l=t;} ls.push(l);
 ls.slice(0,2).forEach((x,i)=>ctx.fillText(x,LEFT,HEAD_Y+i*(z+6))); ctx.restore();}
// bottom line in subtitle style; hi = index of the word drawn pink (-1 none, 'all' all pink)
function subLine(ctx,text,{hi=-1,col=C.ink,hiCol=C.target,size=58,alpha=1}={}){if(!text) return; ctx.save(); ctx.globalAlpha=alpha; ctx.font=`800 ${size}px ${FD}`; ctx.textAlign='left';
 const ls=[]; let l=''; for(const w of text.split(' ')){const t=l?l+' '+w:w; if(ctx.measureText(t).width>SUB_W&&l){ls.push(l);l=w;} else l=t;} ls.push(l);
 const base=SUB_Y-(ls.length-1)*(size+12); let wi=0; ctx.lineJoin='round'; ctx.lineWidth=12; ctx.strokeStyle='rgba(6,16,26,0.92)';
 ls.forEach((x,li)=>{const lw=ctx.measureText(x).width; let px=SUB_X-lw/2; const y=base+li*(size+12); for(const w of x.split(' ')){ctx.strokeText(w,px,y); ctx.fillStyle=(hi==='all'||hi===wi)?hiCol:col; ctx.fillText(w,px,y); px+=ctx.measureText(w+' ').width; wi++;}}); ctx.restore();}
const SUBT={de:{intro:'Zähl mit: Wie viele schaffst du?',swipe:'Wischen zum Start →'},en:{intro:'Keep score: how many can you get?',swipe:'Swipe to start →'}};
// ---------- static slides ----------
function slideCover(ctx){const t=T[state.lang], r=REGIONS[state.region][state.lang];
 bg(ctx); mark(ctx); rowRight(ctx,t.eyebrow(r,state.ep));
 headline(ctx,t.title);
 const box=[LEFT,QB[1]+60,MAPW,QB[3]-60]; drawMap(ctx,box,viewFor({type:'MultiPoint',coordinates:REGIONS[state.region].box},box,0.02),{landColor:C.landDim});
 ctx.beginPath(); ctx.arc(LEFT+MAPW-90,box[1]+90,68,0,Math.PI*2); ctx.fillStyle=C.target; ctx.fill();
 ctx.font=`800 98px ${FD}`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('5',LEFT+MAPW-90,box[1]+96); ctx.textBaseline='alphabetic'; ctx.textAlign='left';
 subLine(ctx,SUBT[state.lang].swipe,{hi:'all',hiCol:C.ok,size:52});
}
function slideQuestion(ctx,i){const t=T[state.lang], id=state.ids[i];
 bg(ctx); mark(ctx); rowRight(ctx,t.q(i+1)+' · '+t.levels[i].toUpperCase(),i+1);
 headline(ctx,t.ask);
 drawMap(ctx,QB,qView(id,QB),{target:id});
 ctx.font=`500 24px ${FM}`; ctx.fillStyle=C.ink; ctx.globalAlpha=.75; ctx.fillText(coordLabel(id),LEFT+28,QB[1]+QB[3]-30); ctx.globalAlpha=1;
 subLine(ctx,t.later,{col:'rgba(246,241,231,0.75)',size:44});
}
function slideAnswers(ctx){const t=T[state.lang];
 bg(ctx); mark(ctx); rowRight(ctx,t.sol.toUpperCase());
 headline(ctx,t.how);
 const rowH=140, top=QB[1];
 state.ids.forEach((id,i)=>{const y=top+i*(rowH+12); const box=[LEFT,y,rowH,rowH];
  drawMap(ctx,box,viewFor(mainPart(byId.get(id)),box,0.22,2600),{target:id,radius:18,border:1.4});
  ctx.font=`700 22px ${FM}`; ctx.fillStyle=C.mute; ctx.fillText(`${i+1} · ${t.levels[i].toUpperCase()}`,LEFT+rowH+28,y+50);
  fitFont(ctx,nameOf(id),800,58,36,MAPW-rowH-36,FD); ctx.fillStyle=C.ink; ctx.fillText(nameOf(id),LEFT+rowH+28,y+108);
 });
 const y2=top+5*(rowH+12)+14;
 ctx.fillStyle=C.target; rr(ctx,LEFT,y2,MAPW,100,50); ctx.fill();
 fitFont(ctx,t.comment,800,40,28,MAPW-60,FD); ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.fillText(t.comment,LEFT+MAPW/2,y2+64); ctx.textAlign='left';
 subLine(ctx,t.follow(state.handle),{col:'rgba(246,241,231,0.75)',size:40});
}
// ---------- cover / thumbnail (same layout as the knowledge covers) ----------
function drawThumb(ctx){const r=REGIONS[state.region]||REGIONS.europe, de=state.lang==='de';
 bg(ctx); ctx.textAlign='left'; ctx.textBaseline='alphabetic';
 const glow=ctx.createRadialGradient(W/2,1100,60,W/2,1100,700); glow.addColorStop(0,'rgba(255,59,127,0.16)'); glow.addColorStop(1,'rgba(255,59,127,0)'); ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);
 const box=[LEFT,860,MAPW,560]; const tg=state.ids.map(id=>byId.get(id)).filter(Boolean).map(mainPart); const v=tg.length?viewFor({type:'FeatureCollection',features:tg},box,0.16,2400):viewFor({type:'MultiPoint',coordinates:r.box},box,0.04); const proj=drawMap(ctx,box,v,{landColor:C.landDim});
 ctx.save(); rr(ctx,box[0],box[1],box[2],box[3],36); ctx.clip();
 state.ids.forEach((id,i)=>{const f=byId.get(id); if(!f) return; const p=proj(d3.geoCentroid(mainPart(f))); if(!p) return;
  ctx.beginPath(); ctx.arc(p[0],p[1],50,0,Math.PI*2); ctx.fillStyle='rgba(255,59,127,0.25)'; ctx.fill();
  ctx.beginPath(); ctx.arc(p[0],p[1],30,0,Math.PI*2); ctx.fillStyle=C.target; ctx.fill(); ctx.lineWidth=5; ctx.strokeStyle=C.ink; ctx.stroke();
  ctx.font=`800 34px ${FD}`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(String(i+1),p[0],p[1]+2); ctx.textAlign='left'; ctx.textBaseline='alphabetic';});
 ctx.restore();
 ctx.font=`700 30px ${FM}`; ctx.fillStyle=C.ok; ctx.fillText(`${de?'GEO-QUIZ':'GEO QUIZ'} · ${r[state.lang].toUpperCase()} · #${String(state.ep).padStart(3,'0')}`,LEFT,400);
 const ls=de?['Erkennst du','alle 5','Länder?']:['Can you name','all 5','countries?']; ls.forEach((l,i)=>{ctx.font=`800 120px ${FD}`; ctx.fillStyle=i===ls.length-1?C.target:C.ink; ctx.fillText(l,LEFT,525+i*126,860);});
 ctx.font=`800 44px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(CH.name,LEFT,1500); const bw=ctx.measureText(CH.name).width; ctx.fillStyle=C.target; ctx.fillText('.',LEFT+bw+2,1500);
}
const thumbCanvas=document.createElement('canvas'); thumbCanvas.width=W; thumbCanvas.height=H; let thumbBlob=null;
function renderThumb(){drawThumb(thumbCanvas.getContext('2d')); const du=thumbCanvas.toDataURL('image/png'); $('thumbImg').src=du; thumbBlob=dataURLtoBlob(du);}
function renderSlides(){const out=[];
 const make=fn=>{const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');fn(x);out.push(c);};
 make(slideCover); for(let i=0;i<5;i++) make(x=>slideQuestion(x,i)); make(slideAnswers); return out;}

// ---------- video ----------
const INTRO=2.6, OUTRO=3.4, FLY=1.0, REV=1.4; const perQ=()=>FLY+state.think+REV; const totalV=()=>INTRO+5*perQ()+OUTRO;
function drawVideo(ctx,tt){const t=T[state.lang], r=REGIONS[state.region];
 bg(ctx); ctx.textAlign='left'; ctx.textBaseline='alphabetic';
 const mapBox=QB;
 const rv=viewFor({type:'MultiPoint',coordinates:r.box},mapBox,0.02);
 mark(ctx);
 if(tt<INTRO){const k=ease(clamp(tt/0.7));
  rowRight(ctx,t.eyebrow(r[state.lang],state.ep)); headline(ctx,t.title);
  drawMap(ctx,mapBox,{...rv,scale:rv.scale*(0.94+0.06*k)},{landColor:C.landDim});
  const p=clamp((tt-1.6)/0.6); if(p>0){ctx.font=`800 ${Math.round(200*ease(p))}px ${FD}`; ctx.fillStyle=C.target; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(t.go,mapBox[0]+mapBox[2]/2,mapBox[1]+mapBox[3]/2); ctx.textAlign='left'; ctx.textBaseline='alphabetic';}
  subLine(ctx,SUBT[state.lang].intro,{hi:Math.min(5,Math.floor(tt/0.35))});
  return;}
 let s=tt-INTRO;
 const PER=perQ(), TH=state.think;
 if(s<5*PER){const i=Math.floor(s/PER), u=s-i*PER, id=state.ids[i];
  const prev=i===0?rv:qView(state.ids[i-1],mapBox), target=qView(id,mapBox);
  const fly=ease(clamp(u/FLY)); const v=lerpView(prev,target,fly);
  const reveal=u>=FLY+TH; const ta=clamp((u-0.7)/0.3);
  drawMap(ctx,mapBox,v,{target:id,targetAlpha:ta,outline:reveal?C.ok:null});
  rowRight(ctx,t.q(i+1)+' · '+t.levels[i].toUpperCase(),i+1);
  if(!reveal){
   headline(ctx,t.ask);
   if(u>FLY){const c=u-FLY, n=Math.ceil(TH-c), f=c/TH;
    const cx=LEFT+96, cy=mapBox[1]+mapBox[3]-96; ctx.beginPath(); ctx.arc(cx,cy,68,0,Math.PI*2); ctx.fillStyle='rgba(11,28,42,0.9)'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx,cy,68,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-f)); ctx.strokeStyle=C.target; ctx.lineWidth=11; ctx.lineCap='round'; ctx.stroke();
    ctx.font=`800 84px ${FD}`; ctx.fillStyle=C.ink; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(String(Math.max(1,n)),cx,cy+6); ctx.textAlign='left'; ctx.textBaseline='alphabetic';}
   subLine(ctx,state.lang==='de'?'Schreib deine Antwort in die Kommentare':'Drop your answer in the comments',{col:'rgba(246,241,231,0.7)',size:44});
  } else {const k=ease(clamp((u-FLY-TH)/0.35));
   headline(ctx,t.ask,C.ink,1-k*0.6);
   ctx.save(); ctx.globalAlpha=k; ctx.font=`700 26px ${FM}`; ctx.fillStyle=C.ok; ctx.fillText(coordLabel(id),LEFT+28,mapBox[1]+mapBox[3]-30); ctx.restore();
   ctx.save(); ctx.globalAlpha=k; ctx.translate(0,(1-k)*16); subLine(ctx,nameOf(id),{hi:'all',hiCol:C.ok,size:84}); ctx.restore();}
  return;}
 s-=5*PER; const k=ease(clamp(s/0.6));
 ctx.globalAlpha=k;
 headline(ctx,t.how);
 ctx.fillStyle='rgba(19,47,69,0.95)'; rr(ctx,LEFT,560,MAPW,560,32); ctx.fill();
 ctx.font=`800 220px ${FD}`; ctx.fillStyle=C.target; ctx.textAlign='center'; ctx.fillText('?/5',LEFT+MAPW/2,790); ctx.textAlign='left';
 const rows=state.lang==='de'?[['heart','Like da lassen'],['bubble','Lösung in die Kommentare'],['share','Teilen zum Mitraten']]:[['heart','Leave a like'],['bubble','Answer in the comments'],['share','Share to play along']];
 rows.forEach(([ic,txt],i)=>{const ai=clamp((s-0.5-i*0.5)/0.35); if(ai<=0) return; const y=880+i*80, x=LEFT+70; ctx.save(); ctx.globalAlpha=k*ai; ctx.translate(x,y-14);
  ctx.fillStyle=C.target; ctx.strokeStyle=C.target; ctx.lineWidth=5; ctx.lineJoin='round'; ctx.lineCap='round';
  if(ic==='heart'){ctx.beginPath(); ctx.moveTo(0,16); ctx.bezierCurveTo(-30,-4,-18,-28,0,-12); ctx.bezierCurveTo(18,-28,30,-4,0,16); ctx.fill();}
  if(ic==='bubble'){rr(ctx,-24,-20,48,34,10); ctx.fill(); ctx.beginPath(); ctx.moveTo(-10,12); ctx.lineTo(-16,26); ctx.lineTo(4,13); ctx.fill();}
  if(ic==='share'){ctx.beginPath(); ctx.moveTo(-20,18); ctx.quadraticCurveTo(-18,-8,14,-8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10,-22); ctx.lineTo(26,-8); ctx.lineTo(10,6); ctx.closePath(); ctx.fill();}
  ctx.restore(); ctx.save(); ctx.globalAlpha=k*ai; ctx.font=`800 40px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(txt,x+60,y,600); ctx.restore();});
 ctx.globalAlpha=1;
 subLine(ctx,t.follow(state.handle),{col:'rgba(246,241,231,0.75)',size:40,alpha:k});
}

// ---------- UI ----------
const $=id=>document.getElementById(id);
const selPreset=$('preset');
PRESETS.forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.label;selPreset.appendChild(o);});
const custom=document.createElement('option');custom.value='custom';custom.textContent='Eigene Auswahl';selPreset.appendChild(custom);
selPreset.value=state.preset;
$('ep').value=state.ep; $('handle').value=state.handle; $('think').value=String(state.think);
$('think').addEventListener('change',()=>{state.think=+$('think').value; refresh();});
function setLang(l){state.lang=l;$('lang-de').setAttribute('aria-pressed',l==='de');$('lang-en').setAttribute('aria-pressed',l==='en');}
setLang(state.lang);

function buildSlots(){const box=$('slots'); box.innerHTML='';
 const sorted=features.map(f=>({id:f.id,n:nameOf(f.id)})).sort((a,b)=>a.n.localeCompare(b.n,state.lang));
 state.ids.forEach((id,i)=>{const lab=document.createElement('label'); lab.htmlFor='slot'+i;
  lab.innerHTML=`<span><b>${i+1}</b> · ${T[state.lang].levels[i]}</span>`;
  const s=document.createElement('select'); s.id='slot'+i;
  for(const f of sorted){const o=document.createElement('option');o.value=f.id;o.textContent=f.n;s.appendChild(o);}
  s.value=id; s.addEventListener('change',()=>{state.ids[i]=s.value; state.preset='custom'; selPreset.value='custom'; refresh();});
  lab.appendChild(s); const wrapEl=document.createElement('div'); wrapEl.className='slot'; wrapEl.appendChild(lab); box.appendChild(wrapEl);});}

let slides=[];
function refresh(){persist(); buildSlotsIfNeeded();
 slides=renderSlides(); const strip=$('strip'); strip.innerHTML='';
 const names=['Cover',...state.ids.map((_,i)=>'Frage '+(i+1)),'Auflösung'];
 slides.forEach((c,i)=>{const d=document.createElement('div');d.className='shot';
  const img=document.createElement('img'); img.alt=names[i]; const du=c.toDataURL('image/png'); img.src=du; slideBlobs[i]=dataURLtoBlob(du);
  const row=document.createElement('div'); row.className='row';
  row.innerHTML=`<small>${String(i+1).padStart(2,'0')} · ${names[i]}</small>`;
  const b=document.createElement('button'); b.className='mini'; b.type='button'; b.textContent='Speichern'; b.addEventListener('click',()=>saveOne(i));
  row.appendChild(b); d.append(img,row); strip.appendChild(d);});
 renderThumb();
 $('vLen').textContent=`ca. ${Math.round(totalV())} Sekunden`;
 const RTAGS={europe:{de:['#europa','#europaquiz'],en:['#europe','#europequiz']},africa:{de:['#afrika','#afrikaquiz'],en:['#africa','#africaquiz']},samerica:{de:['#südamerika'],en:['#southamerica']},asia:{de:['#asien','#asienquiz'],en:['#asia','#asiaquiz']},namerica:{de:['#nordamerika','#karibik'],en:['#northamerica','#caribbean']},oceania:{de:['#ozeanien','#pazifik'],en:['#oceania','#pacific']},world:{de:['#weltkarte','#länder'],en:['#worldmap','#countries']}};
 const pr=PRESETS.find(p=>p.id===state.preset); const lv=pr&&pr.label.includes('Level')?pr.label.split('·')[1].trim():'';
 $('caption').value=T[state.lang].caption({ep:String(state.ep).padStart(3,'0'),n:state.ep,region:REGIONS[state.region][state.lang],level:state.lang==='en'?lv:lv,tags:(RTAGS[state.region]||{})[state.lang]||[]});
 if(!playing) drawVideo(vctx,INTRO+FLY+2.2);
}
let slotLang=null, slotKey='';
function buildSlotsIfNeeded(){const k=state.lang+state.ids.join(); if(k!==slotKey){slotKey=k; buildSlots();}}

selPreset.addEventListener('change',()=>{const p=PRESETS.find(p=>p.id===selPreset.value); state.preset=selPreset.value; if(p){state.ids=p.ids.slice(); state.region=p.region;} refresh();});
$('ep').addEventListener('input',()=>{state.ep=Math.max(1,parseInt($('ep').value)||1); refresh();});
$('handle').addEventListener('input',()=>{state.handle=$('handle').value.trim()||'@geofy'; refresh();});
$('lang-de').addEventListener('click',()=>{setLang('de');refresh();});
$('lang-en').addEventListener('click',()=>{setLang('en');refresh();});


// ---------- country database & quiz generator ----------
const CONT={europe:'Europe',africa:'Africa',asia:'Asia',samerica:'South America',namerica:'North America',oceania:'Oceania'};
const EXCL=new Set(['ATA','KOS','SOL','CYN','ESH','SAH']);
const fame=f=>Math.log10((f.properties.pop||0)+1)*0.6+Math.log10(Math.max(1,f.properties.area||1))*0.4;
function pool(region){return features.filter(f=>!EXCL.has(f.id)&&/^(Sovereign country|Country)$/.test(f.properties.type)&&(f.properties.area||0)>1500&&(region==='world'||f.properties.cont===CONT[region])).sort((a,b)=>fame(b)-fame(a));}
// seeded with the first real post (#001 Europa Level 1, 18.10.2026)
let HIST={used:{europe:['PRT','AUT','ROU','SVK','MKD']},log:[{ep:1,region:'europe',ids:['PRT','AUT','ROU','SVK','MKD'],date:'2026-10-18'}]}; try{const h=JSON.parse(localStorage.getItem('geofy-history')||'null'); if(h&&h.used) HIST=h;}catch(e){}
const saveHist=()=>{try{localStorage.setItem('geofy-history',JSON.stringify(HIST));}catch(e){}};
function genInfo(){const r=$('genRegion').value, all=pool(r), used=new Set(HIST.used[r]||[]); const left=all.filter(f=>!used.has(f.id)).length;
 $('genInfo').textContent=`${REGIONS[r].de}: ${left} von ${all.length} Ländern noch nicht verwendet · ${HIST.log.length} Folgen exportiert`;}
function generate(r){let used=new Set(HIST.used[r]||[]); let avail=pool(r).filter(f=>!used.has(f.id));
 if(avail.length<5){HIST.used[r]=[]; saveHist(); avail=pool(r);}
 const k=avail.length, pick=[];
 for(let q=0;q<5;q++){const a=Math.floor(q*k/5), b=Math.max(a+1,Math.floor((q+1)*k/5)); pick.push(avail[a+Math.floor(Math.random()*(b-a))].id);}
 return pick;}
function markUsed(){const r=state.region; const u=new Set(HIST.used[r]||[]); state.ids.forEach(id=>u.add(id)); HIST.used[r]=[...u];
 if(!HIST.log.some(e=>e.ep===state.ep&&e.ids.join()===state.ids.join())) HIST.log.push({ep:state.ep,region:r,ids:state.ids.slice(),date:new Date().toISOString().slice(0,10)});
 saveHist(); genInfo();}
$('genRegion').value=REGIONS[state.region]&&state.region!=='custom'?state.region:'europe';
$('genRegion').addEventListener('change',genInfo);
$('genBtn').addEventListener('click',()=>{const r=$('genRegion').value; state.ids=generate(r); state.region=r; state.preset='custom'; selPreset.value='custom';
 const last=HIST.log.reduce((m,e)=>Math.max(m,e.ep),0); state.ep=Math.max(state.ep,last+1); $('ep').value=state.ep; refresh(); genInfo();});
// channel switch (one channel for now; new channels are added to CHANNELS)
CHANNELS.forEach(c=>{const o=document.createElement('option');o.value=c.id;o.textContent=c.label;$('channel').appendChild(o);});
$('channel').value=CH.id; $('ver').textContent='Studio · v'+APP_VERSION;
genInfo();
// saving: share sheet on phones (Fotos/Dateien), normal download on desktop
const fname=(i,ext)=>`${CH.id}_${String(state.ep).padStart(3,'0')}_${state.lang}_${String(i).padStart(2,'0')}.${ext}`;
function status(el,msg,err){el.textContent=msg; el.classList.toggle('err',!!err);}
const touch=matchMedia('(pointer:coarse)').matches;
const mimeOf=n=>n.endsWith('.mp4')?'video/mp4':n.endsWith('.png')?'image/png':n.endsWith('.md')?'text/markdown':'application/octet-stream';
async function shareOrDownload(files,el){
 const fl=files.map(f=>new File([f.blob],f.name,{type:mimeOf(f.name)}));
 if(touch&&navigator.canShare&&navigator.canShare({files:fl})){
  try{await navigator.share({files:fl}); status(el,'Gespeichert/geteilt: '+files.length+(files.length>1?' Dateien':' Datei')); return true;}
  catch(e){ if(e&&e.name==='AbortError'){status(el,'Abgebrochen.'); return false;} if(e&&e.name==='NotAllowedError'){status(el,'Bitte noch einmal auf „sichern“ tippen.',true); return false;} }}
 for(const f of files){const a=document.createElement('a'); a.href=URL.createObjectURL(f.blob); a.download=f.name; document.body.appendChild(a); a.click(); a.remove(); const u=a.href; setTimeout(()=>URL.revokeObjectURL(u),8000); await new Promise(r=>setTimeout(r,250));}
 status(el,'Gespeichert: '+files.map(f=>f.name).join(', ')); return true;}
async function save(filename,data,el){const blob=data instanceof Blob?data:new Blob([data],{type:mimeOf(filename)}); return shareOrDownload([{name:filename,blob}],el);}
function dataURLtoBlob(u){const [h,b]=u.split(','); const bin=atob(b); const a=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) a[i]=bin.charCodeAt(i); return new Blob([a],{type:h.slice(5,h.indexOf(';'))});}
let slideBlobs=[];
async function saveOne(i){const ok=await shareOrDownload([{name:fname(i+1,'png'),blob:slideBlobs[i]}],$('carStatus')); if(ok) markUsed();}
$('saveZip').addEventListener('click',async()=>{const ok=await shareOrDownload(slideBlobs.map((b,i)=>({name:fname(i+1,'png'),blob:b})),$('carStatus')); if(ok) markUsed();});

// video playback / recording
const vc=$('vcanvas'), vctx=vc.getContext('2d'); let playing=false;
// ---- sound effects (Web Audio, scheduled on the same timeline as the animation) ----
let AC=null; const getAC=()=>{if(!AC){const A=window.AudioContext||window.webkitAudioContext; if(!A) return null; AC=new A();} if(AC.state==='suspended') AC.resume().catch(()=>{}); return AC;};
let noiseBuf=null; function noise(ac){if(!noiseBuf){noiseBuf=ac.createBuffer(1,ac.sampleRate*0.1,ac.sampleRate); const d=noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;} return noiseBuf;}
function env(ac,t,peak,dec){const g=ac.createGain(); g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(peak,t+0.004); g.gain.exponentialRampToValueAtTime(0.0001,t+dec); return g;}
function sTick(ac,outs,t,hi){const n=ac.createBufferSource(); n.buffer=noise(ac); const bp=ac.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=hi?3200:2400; bp.Q.value=6; const g=env(ac,t,0.9,0.06);
 const o=ac.createOscillator(); o.type='sine'; o.frequency.value=hi?1600:1200; const g2=env(ac,t,0.18,0.05);
 n.connect(bp).connect(g); o.connect(g2); outs.forEach(d=>{g.connect(d); g2.connect(d);}); n.start(t); n.stop(t+0.08); o.start(t); o.stop(t+0.08);}
function sChime(ac,outs,t){[[988,0],[1319,0.12]].forEach(([f,dt])=>{['sine','triangle'].forEach((ty,j)=>{const o=ac.createOscillator(); o.type=ty; o.frequency.value=f*(j?2:1); const g=env(ac,t+dt,j?0.06:0.28,1.1); o.connect(g); outs.forEach(d=>g.connect(d)); o.start(t+dt); o.stop(t+dt+1.2);});});}
function sPop(ac,outs,t){const o=ac.createOscillator(); o.type='sine'; o.frequency.setValueAtTime(280,t); o.frequency.exponentialRampToValueAtTime(880,t+0.14); const g=env(ac,t,0.35,0.22); o.connect(g); outs.forEach(d=>g.connect(d)); o.start(t); o.stop(t+0.25);}
function scheduleSfx(ac,outs,t0){const PER=perQ(), TH=state.think; sPop(ac,outs,t0+1.6);
 for(let i=0;i<5;i++){const b=t0+INTRO+i*PER; for(let k=0;k<TH;k++) sTick(ac,outs,b+FLY+k,k%2===0); sChime(ac,outs,b+FLY+TH);}
 sPop(ac,outs,t0+INTRO+5*PER+0.1);}
function play(onDone,outs,tail){playing=true; tail=tail||0; let t0=performance.now();
 if(state.sfx!==false){const ac=getAC(); if(ac){const at=ac.currentTime+0.08; scheduleSfx(ac,outs||[ac.destination],at); t0+=80;}}
 const step=now=>{const tt=(now-t0)/1000; const TT=totalV(); drawVideo(vctx,Math.min(tt,TT)); if(tt<TT+tail) requestAnimationFrame(step); else {playing=false; onDone&&onDone();}};
 requestAnimationFrame(step);}
$('sfx').checked=state.sfx!==false; $('sfx').addEventListener('change',()=>{state.sfx=$('sfx').checked; persist();});
$('play').addEventListener('click',()=>{if(playing) return; if(vc.requestFullscreen&&matchMedia('(max-width:640px)').matches){vc.requestFullscreen().catch(()=>{});} play(()=>{if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});});});
function legacyRecord(){const el=$('vidStatus'); if(playing) return;
 const types=['video/mp4;codecs=avc1.42E01E,mp4a.40.2','video/mp4','video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];
 const mt=window.MediaRecorder&&vc.captureStream?types.find(t=>MediaRecorder.isTypeSupported(t)):null;
 if(!mt){status(el,'Aufnahme wird auf diesem Gerät nicht unterstützt. Nutze die Bildschirmaufnahme.',true);return;}
 const vs=vc.captureStream(30); let outs=null, ka=null; const ac=state.sfx!==false?getAC():null; if(ac&&ac.createMediaStreamDestination){const md=ac.createMediaStreamDestination(); outs=[md,ac.destination]; md.stream.getAudioTracks().forEach(tr=>vs.addTrack(tr));
  ka=ac.createOscillator(); ka.frequency.value=40; const kg=ac.createGain(); kg.gain.value=0.003; ka.connect(kg).connect(md); ka.start();}
 const rec=new MediaRecorder(vs,{mimeType:mt,videoBitsPerSecond:8_000_000}); const chunks=[];
 rec.ondataavailable=e=>{if(e.data&&e.data.size) chunks.push(e.data);};
 rec.onstop=()=>{try{ka&&ka.stop();}catch(e){} const ext=mt.includes('mp4')?'mp4':'webm'; const blob=new Blob(chunks,{type:mt.split(';')[0]}); $('record').disabled=false;
   status(el,`Fertig (${(blob.size/1e6).toFixed(1)} MB). Speichern …`); (pendingVideo={name:`${CH.id}_${String(state.ep).padStart(3,'0')}_${state.lang}.${ext}`,blob},$('saveVideo').hidden=false);};
 $('record').disabled=true; status(el,`Nimmt auf … bitte die Seite offen lassen (ca. ${Math.round(totalV()+1.5)} s).`); rec.start(1000);
 play(()=>{try{rec.requestData();}catch(e){} setTimeout(()=>rec.stop(),700);},outs,1.5);}

// ---- clean export: render frame by frame at a constant 30 fps and mux into a standard MP4 ----
const FPS=30;
async function pickCodecs(withAudio){
 if(!window.VideoEncoder||!window.VideoFrame||!window.Mp4Muxer) return null;
 const vlist=window.__TEST_CODECS?['vp09.00.40.08']:['avc1.640028','avc1.4d0028','avc1.42E028'];
 let v=null; for(const c of vlist){try{const r=await VideoEncoder.isConfigSupported({codec:c,width:W,height:H,bitrate:8e6,framerate:FPS,...(c.startsWith('avc')?{avc:{format:'avc'}}:{})}); if(r&&r.supported){v=c;break;}}catch(e){}}
 if(!v) return null; if(!withAudio) return {v,a:null};
 if(!window.AudioEncoder||!window.AudioData||!window.OfflineAudioContext) return null;
 const alist=window.__TEST_CODECS?['opus']:['mp4a.40.2'];
 for(const c of alist){try{const r=await AudioEncoder.isConfigSupported({codec:c,sampleRate:48000,numberOfChannels:2,bitrate:192000}); if(r&&r.supported) return {v,a:c};}catch(e){}}
 return null;}
async function renderClean({canvas,draw,duration,audio,codecs,onProgress}){
 const isAvc=codecs.v.startsWith('avc'), isAac=codecs.a&&codecs.a.startsWith('mp4a');
 const muxer=new Mp4Muxer.Muxer({target:new Mp4Muxer.ArrayBufferTarget(),video:{codec:isAvc?'avc':'vp9',width:W,height:H,frameRate:FPS},
  ...(codecs.a?{audio:{codec:isAac?'aac':'opus',numberOfChannels:2,sampleRate:48000}}:{}),fastStart:'in-memory',firstTimestampBehavior:'offset'});
 let err=null;
 if(codecs.a){const oac=new OfflineAudioContext(2,Math.ceil(48000*duration),48000); audio(oac); const buf=await oac.startRendering();
  // Safari writes a wrong AAC config; always give the muxer the correct one (AAC-LC, 48 kHz, stereo)
  const aenc=new AudioEncoder({output:(ch,meta)=>{ if(isAac) meta={...(meta||{}),decoderConfig:{codec:'mp4a.40.2',sampleRate:48000,numberOfChannels:2,description:new Uint8Array([0x11,0x90])}}; muxer.addAudioChunk(ch,meta);},error:e=>{err=e;}});
  aenc.configure({codec:codecs.a,sampleRate:48000,numberOfChannels:2,bitrate:192000});
  const L=buf.length,c0=buf.getChannelData(0),c1=buf.getChannelData(1),N=1024;
  for(let i=0;i<L;i+=N){const n=Math.min(N,L-i); const d=new Float32Array(n*2); d.set(c0.subarray(i,i+n),0); d.set(c1.subarray(i,i+n),n);
   const ad=new AudioData({format:'f32-planar',sampleRate:48000,numberOfFrames:n,numberOfChannels:2,timestamp:Math.round(i*1e6/48000),data:d}); aenc.encode(ad); ad.close();}
  await aenc.flush(); aenc.close(); if(err) throw err;}
 const venc=new VideoEncoder({output:(ch,meta)=>muxer.addVideoChunk(ch,meta),error:e=>{err=e;}});
 venc.configure({codec:codecs.v,width:W,height:H,bitrate:8_000_000,framerate:FPS,latencyMode:'quality',...(isAvc?{avc:{format:'avc'}}:{})});
 const n=Math.ceil(duration*FPS);
 for(let f=0;f<n;f++){ if(err) throw err; draw(f/FPS);
  const fr=new VideoFrame(canvas,{timestamp:Math.round(f*1e6/FPS),duration:Math.round(1e6/FPS)}); venc.encode(fr,{keyFrame:f%60===0}); fr.close();
  while(venc.encodeQueueSize>6){await new Promise(r=>setTimeout(r,5)); if(err) throw err;}
  if(f%10===0){onProgress&&onProgress(f/n); await new Promise(r=>setTimeout(r,0));}}
 await venc.flush(); venc.close(); if(err) throw err;
 muxer.finalize(); return new Blob([muxer.target.buffer],{type:'video/mp4'});}

$('saveThumb').addEventListener('click',()=>{if(thumbBlob) save(fname(0,'png').replace('_00.png','_cover.png'),thumbBlob,$('thumbStatus'));});
let pendingVideo=null;
$('saveVideo').addEventListener('click',()=>{if(pendingVideo) save(pendingVideo.name,pendingVideo.blob,$('vidStatus'));});
$('record').addEventListener('click',async()=>{const el=$('vidStatus'); if(playing) return; $('saveVideo').hidden=true;
 const sfxOn=state.sfx!==false; let codecs=null; try{codecs=await pickCodecs(sfxOn);}catch(e){}
 if(!codecs){status(el,'Sauberer Export wird hier nicht unterstützt, nehme live auf …'); return legacyRecord();}
 playing=true; $('record').disabled=true; status(el,'Rendere Video … 0 %');
 try{const blob=await renderClean({canvas:vc,draw:t=>drawVideo(vctx,Math.min(t,totalV())),duration:totalV()+1.5,audio:sfxOn?(oac=>scheduleSfx(oac,[oac.destination],0)):null,codecs,onProgress:p=>status(el,`Rendere Video … ${Math.round(p*100)} %`)});
  pendingVideo={name:fname(0,'mp4').replace('_00.mp4','.mp4'),blob}; markUsed();
  status(el,`Fertig: ${(blob.size/1e6).toFixed(1)} MB, 30 fps. Jetzt sichern, die Caption liegt unten bereit.`); $('saveVideo').hidden=false;}
 catch(e){status(el,'Export fehlgeschlagen ('+((e&&e.message)||e)+'). Nutze „Vorschau abspielen“ + Bildschirmaufnahme.',true);}
 finally{playing=false; $('record').disabled=false; drawVideo(vctx,INTRO+FLY+2.2);}});
document.querySelectorAll('.gridToggle').forEach(cb=>cb.addEventListener('change',()=>{const on=cb.checked; document.querySelectorAll('.gridToggle').forEach(o=>o.checked=on); document.querySelectorAll('.safe').forEach(el=>el.hidden=!on);}));
$('copyCap2').addEventListener('click',async()=>{const ta=$('caption'); try{await navigator.clipboard.writeText(ta.value); $('copyCap2').textContent='Caption kopiert';}catch(e){ta.select(); ta.scrollIntoView({block:'center'}); $('copyCap2').textContent='Caption markiert';} setTimeout(()=>$('copyCap2').textContent='Caption kopieren',1800);});

$('copyCap').addEventListener('click',async()=>{const ta=$('caption'); try{await navigator.clipboard.writeText(ta.value); $('copyCap').textContent='Kopiert';}catch(e){ta.select(); $('copyCap').textContent='Markiert';} setTimeout(()=>$('copyCap').textContent='Kopieren',1600);});

// =================== Wissen 2.0 (js/wissen.js) ===================
window.GEO={world,features,byId,NAMES,pickCodecs,renderClean,save,status,dataURLtoBlob};
function setMode(m){const w=m==='wissen'; $('mode-wissen').hidden=!w; $('mode-quiz').hidden=w; $('tab-wissen').setAttribute('aria-selected',w); $('tab-quiz').setAttribute('aria-selected',!w);
 try{localStorage.setItem('geofy-mode',m);}catch(e){} if(w&&window.WISSEN) window.WISSEN.show();}
$('tab-quiz').addEventListener('click',()=>setMode('quiz')); $('tab-wissen').addEventListener('click',()=>setMode('wissen'));
let startMode='quiz'; try{startMode=localStorage.getItem('geofy-mode')||'quiz';}catch(e){}
if(location.hash==='#wissen') startMode='wissen';

if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').then(reg=>{
 const show=()=>{$('updateBtn').hidden=false;};
 if(reg.waiting&&navigator.serviceWorker.controller) show();
 reg.addEventListener('updatefound',()=>{const w=reg.installing; w&&w.addEventListener('statechange',()=>{if(w.state==='installed'&&navigator.serviceWorker.controller) show();});});
 setInterval(()=>reg.update().catch(()=>{}),60*60*1000);
}).catch(()=>{});
 $('updateBtn').addEventListener('click',async()=>{const reg=await navigator.serviceWorker.getRegistration(); if(reg&&reg.waiting) reg.waiting.postMessage('skip'); setTimeout(()=>location.reload(),300);});
 navigator.serviceWorker.addEventListener('controllerchange',()=>location.reload());}
try{await Promise.all(['800 100px "Bricolage Grotesque"','500 30px "Hanken Grotesk"','700 30px "JetBrains Mono"','500 30px "JetBrains Mono"'].map(f=>document.fonts.load(f)));}catch(e){}
refresh(); setMode(startMode);
document.fonts&&document.fonts.ready.then(()=>{refresh();});
})();
