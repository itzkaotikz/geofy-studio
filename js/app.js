(async function(){
const APP_VERSION='1.0.0';
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
  sol:'Auflösung',how:'Wie viele hattest du?',comment:'Schreib dein Ergebnis in die Kommentare',follow:h=>`Folge ${h} für das nächste Quiz`,go:'LOS',
  caption:c=>{const H=['Wie viele der 5 Länder erkennst du?','Schaffst du 5/5? Die letzten beiden haben es in sich.','Nur echte Geo-Profis erkennen alle 5.'];
   const tags=['#geografie','#geoquiz','#länderquiz',...c.tags,'#quiz','#allgemeinwissen','#lernenmittiktok'];
   return `#${c.ep} · ${c.region}${c.level?' · '+c.level:''} 🌍
${H[(c.n-1)%H.length]}
Zähl mit und schreib dein Ergebnis in die Kommentare: 3/5, 4/5 oder 5/5?

${tags.join(' ')}`;}},
 en:{eyebrow:(r,e)=>`GEO QUIZ · ${r.toUpperCase()} · #${String(e).padStart(3,'0')}`,title:'Can you name all 5 countries?',sub:'Easy to expert. Keep score and drop your result in the comments.',swipe:'Swipe to start',
  q:i=>`COUNTRY ${i} / 5`,ask:'Which country is highlighted?',later:'Answers on the last slide',levels:['Easy','Easy','Medium','Hard','Expert'],
  sol:'Answers',how:'How many did you get?',comment:'Drop your score in the comments',follow:h=>`Follow ${h} for the next quiz`,go:'GO',
  caption:c=>{const H=['How many of these 5 countries can you name?','Can you get 5/5? The last two are tough.','Only real geography pros get all 5.'];
   const tags=['#geography','#geoquiz','#mapquiz',...c.tags,'#quiz','#trivia','#learnontiktok'];
   return `#${c.ep} · ${c.region}${c.level?' · '+c.level:''} 🌍
${H[(c.n-1)%H.length]}
Keep score and drop your result in the comments: 3/5, 4/5 or 5/5?

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
 // faint survey grid on the ground
 ctx.strokeStyle='rgba(246,241,231,0.035)';ctx.lineWidth=2;
 for(let x=60;x<W;x+=120){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
 for(let y=60;y<H;y+=120){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}}
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

// ---------- static slides ----------
function fitFont(ctx,text,weight,max,min,maxW,fam){let z=max; ctx.font=`${weight} ${z}px ${fam}`; while(z>min&&ctx.measureText(text).width>maxW){z-=4; ctx.font=`${weight} ${z}px ${fam}`;} return z;}
// Every readable element stays inside x 100–880, y 300–1440 (see SAFE_* above)
function slideCover(ctx){const t=T[state.lang], r=REGIONS[state.region][state.lang];
 bg(ctx);
 ctx.font=`700 28px ${FM}`; ctx.fillStyle=C.target; ctx.textAlign='left'; ctx.fillText(t.eyebrow(r,state.ep),LEFT,340);
 ctx.font=`800 90px ${FD}`; ctx.fillStyle=C.ink; wrap(ctx,t.title,LEFT,440,MAPW,94);
 const box=[LEFT,600,MAPW,600]; drawMap(ctx,box,viewFor({type:'MultiPoint',coordinates:REGIONS[state.region].box},box,0.02),{landColor:C.landDim});
 ctx.beginPath(); ctx.arc(LEFT+MAPW-90,600+90,68,0,Math.PI*2); ctx.fillStyle=C.target; ctx.fill();
 ctx.font=`800 98px ${FD}`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('5',LEFT+MAPW-90,600+96); ctx.textBaseline='alphabetic'; ctx.textAlign='left';
 ctx.font=`500 34px ${FB}`; ctx.fillStyle=C.mute; wrap(ctx,t.sub,LEFT,1270,MAPW,46);
 ctx.font=`700 28px ${FM}`; ctx.fillStyle=C.ok; ctx.fillText(t.swipe.toUpperCase()+'  →',LEFT,1410);
}
function slideQuestion(ctx,i){const t=T[state.lang], id=state.ids[i];
 bg(ctx);
 ctx.font=`700 30px ${FM}`; ctx.fillStyle=C.ink; ctx.textAlign='left'; ctx.fillText(t.q(i+1),LEFT,340);
 pips(ctx,LEFT+MAPW-146,330,i+1);
 ctx.font=`500 24px ${FM}`; ctx.fillStyle=C.mute; ctx.textAlign='right'; ctx.fillText(t.levels[i].toUpperCase(),LEFT+MAPW-178,340); ctx.textAlign='left';
 fitFont(ctx,t.ask,800,70,48,MAPW,FD); ctx.fillStyle=C.ink; ctx.fillText(t.ask,LEFT,440);
 const box=[LEFT,490,MAPW,860]; drawMap(ctx,box,qView(id,box),{target:id});
 ctx.font=`500 24px ${FM}`; ctx.fillStyle=C.ink; ctx.globalAlpha=.75; ctx.fillText(coordLabel(id),LEFT+28,490+860-30); ctx.globalAlpha=1;
 ctx.font=`500 28px ${FB}`; ctx.fillStyle=C.mute; ctx.fillText(t.later,LEFT,1415);
}
function slideAnswers(ctx){const t=T[state.lang];
 bg(ctx);
 ctx.font=`700 28px ${FM}`; ctx.fillStyle=C.ok; ctx.textAlign='left'; ctx.fillText(t.sol.toUpperCase(),LEFT,330);
 fitFont(ctx,t.how,800,76,52,MAPW,FD); ctx.fillStyle=C.ink; ctx.fillText(t.how,LEFT,415);
 const rowH=140, top=455;
 state.ids.forEach((id,i)=>{const y=top+i*(rowH+12); const box=[LEFT,y,rowH,rowH];
  drawMap(ctx,box,viewFor(mainPart(byId.get(id)),box,0.22,2600),{target:id,radius:18,border:1.4});
  ctx.font=`700 22px ${FM}`; ctx.fillStyle=C.mute; ctx.fillText(`${i+1} · ${t.levels[i].toUpperCase()}`,LEFT+rowH+28,y+50);
  fitFont(ctx,nameOf(id),800,58,36,MAPW-rowH-36,FD); ctx.fillStyle=C.ink; ctx.fillText(nameOf(id),LEFT+rowH+28,y+108);
 });
 const y2=top+5*(rowH+12)+14;
 ctx.fillStyle=C.target; rr(ctx,LEFT,y2,MAPW,100,50); ctx.fill();
 fitFont(ctx,t.comment,800,40,28,MAPW-60,FD); ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.fillText(t.comment,LEFT+MAPW/2,y2+64); ctx.textAlign='left';
 ctx.font=`500 26px ${FB}`; ctx.fillStyle=C.mute; ctx.fillText(t.follow(state.handle),LEFT,y2+150);
}
function renderSlides(){const out=[];
 const make=fn=>{const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');fn(x);out.push(c);};
 make(slideCover); for(let i=0;i<5;i++) make(x=>slideQuestion(x,i)); make(slideAnswers); return out;}

// ---------- video ----------
const INTRO=2.6, OUTRO=3.4, FLY=1.0, REV=1.4; const perQ=()=>FLY+state.think+REV; const totalV=()=>INTRO+5*perQ()+OUTRO;
function drawVideo(ctx,tt){const t=T[state.lang], r=REGIONS[state.region];
 bg(ctx); ctx.textAlign='left'; ctx.textBaseline='alphabetic';
 const mapBox=[LEFT,490,MAPW,890];
 const rv=viewFor({type:'MultiPoint',coordinates:r.box},mapBox,0.02);
 if(tt<INTRO){const k=ease(clamp(tt/0.7));
  ctx.font=`700 28px ${FM}`; ctx.fillStyle=C.target; ctx.fillText(t.eyebrow(r[state.lang],state.ep),LEFT,340);
  ctx.font=`800 84px ${FD}`; ctx.fillStyle=C.ink; wrap(ctx,t.title,LEFT,435,MAPW,88);
  const ib=[LEFT,600,MAPW,700]; const iv=viewFor({type:'MultiPoint',coordinates:r.box},ib,0.02);
  drawMap(ctx,ib,{...iv,scale:iv.scale*(0.94+0.06*k)},{landColor:C.landDim});
  const p=clamp((tt-1.6)/0.6); if(p>0){ctx.font=`800 ${Math.round(200*ease(p))}px ${FD}`; ctx.fillStyle=C.target; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(t.go,LEFT+MAPW/2,ib[1]+ib[3]/2); ctx.textAlign='left'; ctx.textBaseline='alphabetic';}
  brand(ctx,1370); return;}
 let s=tt-INTRO;
 const PER=perQ(), TH=state.think;
 if(s<5*PER){const i=Math.floor(s/PER), u=s-i*PER, id=state.ids[i];
  const prev=i===0?rv:qView(state.ids[i-1],mapBox), target=qView(id,mapBox);
  const fly=ease(clamp(u/FLY)); const v=lerpView(prev,target,fly);
  const reveal=u>=FLY+TH; const ta=clamp((u-0.7)/0.3);
  drawMap(ctx,mapBox,v,{target:id,targetAlpha:ta,outline:reveal?C.ok:null});
  ctx.font=`700 30px ${FM}`; ctx.fillStyle=C.ink; ctx.fillText(t.q(i+1),LEFT,330); pips(ctx,LEFT+MAPW-146,320,i+1);
  ctx.font=`500 24px ${FM}`; ctx.fillStyle=C.mute; ctx.textAlign='right'; ctx.fillText(t.levels[i].toUpperCase(),LEFT+MAPW-178,330); ctx.textAlign='left';
  ctx.fillStyle='rgba(246,241,231,0.12)'; ctx.fillRect(LEFT,354,MAPW,8); ctx.fillStyle=C.target; ctx.fillRect(LEFT,354,MAPW*clamp(s/(5*PER)),8);
  if(!reveal){
   fitFont(ctx,t.ask,800,70,48,MAPW,FD); ctx.fillStyle=C.ink; ctx.fillText(t.ask,LEFT,450);
   if(u>FLY){const c=u-FLY, n=Math.ceil(TH-c), f=c/TH;
    const cx=LEFT+96, cy=mapBox[1]+mapBox[3]-96; ctx.beginPath(); ctx.arc(cx,cy,68,0,Math.PI*2); ctx.fillStyle='rgba(11,28,42,0.9)'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx,cy,68,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-f)); ctx.strokeStyle=C.target; ctx.lineWidth=11; ctx.lineCap='round'; ctx.stroke();
    ctx.font=`800 84px ${FD}`; ctx.fillStyle=C.ink; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(String(Math.max(1,n)),cx,cy+6); ctx.textAlign='left'; ctx.textBaseline='alphabetic';}
  } else {const k=ease(clamp((u-FLY-TH)/0.35));
   ctx.save(); ctx.globalAlpha=k; ctx.translate(0,(1-k)*20);
   fitFont(ctx,nameOf(id),800,92,48,MAPW,FD); ctx.fillStyle=C.ok; ctx.fillText(nameOf(id),LEFT,458);
   ctx.font=`700 26px ${FM}`; ctx.fillStyle=C.ok; ctx.fillText(coordLabel(id),LEFT+28,mapBox[1]+mapBox[3]-30);
   ctx.restore();}
  return;}
 s-=5*PER; const k=ease(clamp(s/0.6));
 ctx.globalAlpha=k;
 ctx.font=`800 92px ${FD}`; ctx.fillStyle=C.ink; wrap(ctx,t.how,LEFT,440,MAPW,96);
 ctx.font=`800 280px ${FD}`; ctx.fillStyle=C.target; ctx.fillText('?/5',LEFT-8,830);
 ctx.font=`500 38px ${FB}`; ctx.fillStyle=C.ink; wrap(ctx,t.comment,LEFT,950,MAPW,50);
 ctx.font=`500 30px ${FB}`; ctx.fillStyle=C.mute; ctx.fillText(t.follow(state.handle),LEFT,1090);
 ctx.globalAlpha=1; brand(ctx,1300);
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

// =================== Wissens-Modus ===================
NAMES.GRL=['Grönland','Greenland'];
const AFRIKA='DZA AGO BEN BWA BFA BDI CMR CAF TCD COG COD CIV DJI EGY GNQ ERI ETH GAB GMB GHA GIN GNB KEN LSO LBR LBY MDG MWI MLI MRT MAR MOZ NAM NER NGA RWA SEN SLE SOM ZAF SSD SDN SWZ TZA TGO TUN UGA ZMB ZWE ESH'.split(' ');
const GROUPS={afrika:AFRIKA,africa:AFRIKA};
const BOXES={welt:[-170,-56,180,78],world:[-170,-56,180,78],europa:[-25,34,45,71],europe:[-25,34,45,71],afrika:[-20,-36,53,38],africa:[-20,-36,53,38],asien:[25,-11,150,56],asia:[25,-11,150,56],'südamerika':[-82,-56,-34,13],nordamerika:[-170,7,-50,72],ozeanien:[110,-48,180,0]};
const KB=[100,580,780,700]; // where the subject sits: upper middle, clear of TikTok's right rail and caption zone
const MOVE_COL=['#33D1B0','#F6F1E7','#FF3B7F'];
function resolveCountry(tok){tok=(tok||'').trim(); if(!tok) return []; const low=tok.toLowerCase();
 if(GROUPS[low]) return GROUPS[low].filter(id=>byId.has(id));
 const up=tok.toUpperCase(); if(byId.has(up)) return [up];
 for(const [id,n] of Object.entries(NAMES)){ if(n[0].toLowerCase()===low||n[1].toLowerCase()===low) return byId.has(id)?[id]:[]; }
 const f=features.find(f=>(f.properties.en||'').toLowerCase()===low||(f.properties.de||'').toLowerCase()===low); return f?[f.id]:[];}
const resolveList=s=>(s||'').split(',').flatMap(resolveCountry);
function groupCentroid(ids){return d3.geoCentroid({type:'FeatureCollection',features:ids.map(id=>mainPart(byId.get(id)))});}
function camView(cam){const s=(cam||'').trim(); if(!s) return null; const low=s.toLowerCase();
 let b=BOXES[low]; const m=low.match(/^box\s*:?\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)/);
 if(m) b=[+m[1],+m[2],+m[3],+m[4]];
 if(b) return viewFor({type:'MultiPoint',coordinates:[[b[0],b[1]],[b[2],b[3]]]},KB,0.02);
 const ids=resolveList(s); if(!ids.length) return null;
 return viewFor({type:'FeatureCollection',features:ids.map(id=>mainPart(byId.get(id)))},KB,ids.length>1?0.05:0.18,4200);}
function projAt(v){const p=d3.geoMercator().scale(v.scale).translate([0,0]); const q=p([v.lon,v.lat]); return p.translate([KB[0]+KB[2]/2-q[0],KB[1]+KB[3]/2-q[1]]);}
function moveGeom(geom,from,to){const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]);
 const mp=c=>typeof c[0]==='number'?r2.invert(r1(c)):c.map(mp); return {type:geom.type,coordinates:mp(geom.coordinates)};}
const lines=s=>(s||'').split('\n').map(l=>l.trim()).filter(Boolean);
function parseLatLon(s){const m=s.match(/^(-?[\d.]+)\s*,\s*(-?[\d.]+)$/); return m?[+m[2],+m[1]]:null;}
function parseAct(sc){
 if(sc.type==='verschieben') return lines(sc.act).map(l=>{const [a,b]=l.split(/->|→/); if(!b) return null; const ids=resolveCountry(a); if(!ids.length) return null;
   const id=ids[0], to=parseLatLon(b.trim())||(resolveList(b).length?groupCentroid(resolveList(b)):null); if(!to) return null;
   return {id,from:d3.geoCentroid(mainPart(byId.get(id))),to,geom:mainPart(byId.get(id)).geometry};}).filter(Boolean);
 if(sc.type==='pins'){const out={pins:[],line:false}; lines(sc.act).forEach(l=>{if(/^(linie|line)$/i.test(l)){out.line=true;return;} const [p,label]=l.split('|'); const ll=parseLatLon((p||'').trim()); if(ll) out.pins.push({p:ll,label:(label||'').trim()});}); return out;}
 if(sc.type==='ranking') return lines(sc.act).map(l=>{const [a,label]=l.split('|'); const ids=resolveCountry(a); return ids.length?{id:ids[0],label:(label||'').trim()}:null;}).filter(Boolean);
 if(sc.type==='umriss') return resolveList(sc.act||sc.mark);
 return null;}

const STORIES=[
 {id:'afrika',label:'Wie groß ist Afrika wirklich?',scenes:[
  {type:'karte',cam:'box: -80, -38, 65, 80',mark:'Grönland, afrika',head:'Grönland vs. Afrika',text:'Auf den meisten Weltkarten sehen Grönland und Afrika fast gleich groß aus. In Wahrheit ist Afrika rund 14-mal so groß.',act:'',dur:0},
  {type:'verschieben',cam:'',mark:'afrika',head:'Die Mercator-Falle',text:'Schuld ist die Mercator-Projektion. Je weiter ein Land vom Äquator entfernt ist, desto stärker wird es auf der Karte aufgeblasen. Am Äquator schrumpft Grönland auf seine echte Größe.',act:'Grönland -> afrika',dur:0},
  {type:'verschieben',cam:'box: -10, 5, 65, 45',mark:'Saudi-Arabien',head:'So groß wie Saudi-Arabien',text:'Grönland ist ungefähr so groß wie Saudi-Arabien. Auf der Karte wirkt es aber größer als ganz Südamerika.',act:'Grönland -> 23, 28',dur:0},
  {type:'verschieben',cam:'afrika',mark:'afrika',head:'Alles passt rein',text:'Und Afrika selbst wird unterschätzt. Die USA, China und Indien zusammen sind immer noch kleiner als der afrikanische Kontinent.',act:'USA -> 24, 9\nChina -> -2, 24\nIndien -> -24, 27',dur:0},
  {type:'verschieben',cam:'box: -60, -45, 120, 75',mark:'afrika',head:'Und Russland?',text:'Selbst Russland, das größte Land der Erde, ist nur gut halb so groß wie Afrika. Am Äquator sieht man das sofort.',act:'Russland -> 2, 20',dur:0},
  {type:'verschieben',cam:'nordamerika',mark:'USA',head:'Deutschland in den USA',text:'Zum Vergleich: Deutschland passt rund 27-mal in die USA.',act:'Deutschland -> 39, -98',dur:0},
  {type:'karte',cam:'welt',mark:'',head:'Was hat dich überrascht?',text:'Welcher Vergleich hat dich am meisten überrascht? Schreib es in die Kommentare und folge für mehr Karten-Fakten.',act:'',dur:0}]},
 {id:'chile',label:'Warum ist Chile so lang?',scenes:[
  {type:'karte',cam:'südamerika',mark:'Chile',head:'Warum ist Chile so lang?',text:'Chile ist über 4.000 Kilometer lang, aber im Schnitt nur etwa 180 Kilometer breit.',act:'',dur:0},
  {type:'umriss',cam:'Chile',mark:'',head:'Zwischen Anden und Pazifik',text:'Im Osten liegen die Anden, im Westen der Pazifik. Dazwischen bleibt nur ein schmaler Streifen Land.',act:'Chile',dur:0},
  {type:'verschieben',cam:'europa',mark:'',head:'Chile auf Europa gelegt',text:'Legt man Chile auf Europa, reicht es von Skandinavien bis fast nach Nordafrika.',act:'Chile -> 48, 10',dur:0},
  {type:'pins',cam:'Chile',mark:'Chile',head:'Fast alle Klimazonen',text:'Deshalb hat Chile fast alle Klimazonen: von einer der trockensten Wüsten der Welt im Norden bis zu Gletschern in Patagonien.',act:'-23.6, -70.4 | Atacama-Wüste\n-33.45, -70.67 | Santiago\n-53.16, -70.92 | Punta Arenas\nlinie',dur:0},
  {type:'karte',cam:'welt',mark:'Chile',head:'Welches Land als Nächstes?',text:'Welches Land soll ich als Nächstes erklären? Schreib es in die Kommentare.',act:'',dur:0}]},
 {id:'nachbarn',label:'Welches Land hat die meisten Nachbarn?',scenes:[
  {type:'ranking',cam:'welt',mark:'',head:'Welches Land hat die meisten Nachbarn?',text:'Welches Land grenzt an die meisten anderen Länder? Hier kommt das Ranking.',act:'Deutschland | Platz 4 · 9 Nachbarn\nDR Kongo | Platz 4 · 9 Nachbarn\nBrasilien | Platz 3 · 10 Nachbarn\nRussland | Platz 1 · 14 Nachbarn\nChina | Platz 1 · 14 Nachbarn',dur:14},
  {type:'karte',cam:'China, Russland',mark:'China, Russland',head:'Gleichstand!',text:'China und Russland teilen sich Platz eins mit jeweils 14 Nachbarländern. Hättest du das gewusst? Schreib es in die Kommentare.',act:'',dur:0}]}
];
const TYPES=[['karte','Karte'],['umriss','Umriss'],['verschieben','Verschieben'],['pins','Pins'],['ranking','Ranking'],['titel','Titel']];
const K={story:'afrika',wpm:150,subs:true,scenes:JSON.parse(JSON.stringify(STORIES[0].scenes))};
try{const s=JSON.parse(localStorage.getItem('geofy-wissen')||'null'); if(s&&Array.isArray(s.scenes)) Object.assign(K,s);}catch(e){}
const kPersist=()=>{try{localStorage.setItem('geofy-wissen',JSON.stringify(K));}catch(e){}};
const words=t=>(t||'').trim().split(/\s+/).filter(Boolean).length;
let kd={durs:[],views:[],acts:[],total:0};
function kRebuild(){
 const worldV=camView('welt'); const durs=[],views=[],acts=[];
 K.scenes.forEach((sc,i)=>{acts.push(parseAct(sc));
  const auto=Math.max(3.5,words(sc.text)*60/K.wpm+1.5, sc.type==='ranking'?(acts[i]||[]).length*2.2+1.5:0);
  durs.push(sc.dur>0?+sc.dur:auto);
  views.push(sc.type==='titel'?(views[i-1]||worldV):(camView(sc.cam)||views[i-1]||worldV));});
 kd={durs,views,acts,total:durs.reduce((a,b)=>a+b,0)};
}
const fmt=s=>`${Math.floor(s/60)}:${String(Math.round(s%60)).padStart(2,'0')}`;

function drawK(ctx,tt){
 const S=K.scenes; ctx.textAlign='left'; ctx.textBaseline='alphabetic';
 if(!S.length){bg(ctx);return;}
 let acc=0,i=0; for(;i<S.length-1;i++){if(tt<acc+kd.durs[i]) break; acc+=kd.durs[i];}
 const sc=S[i], d=kd.durs[i], u=clamp(tt-acc,0,d), prev=S[i-1];
 const vPrev=i>0?kd.views[i-1]:kd.views[0], fl=Math.min(1.2,d*0.3);
 const v=lerpView(vPrev,kd.views[i],ease(clamp(u/fl)));
 const proj=projAt(v), path=d3.geoPath(proj,ctx);
 ctx.fillStyle=C.ocean; ctx.fillRect(0,0,W,H);
 ctx.beginPath(); path(grat); ctx.strokeStyle=C.grat; ctx.lineWidth=2; ctx.stroke();
 const land=landPath(proj,[0,0,W,H],v.scale); ctx.fillStyle=C.land; ctx.fill(land);
 // persistent marks
 const marks=resolveList(sc.mark); const same=prev&&prev.mark===sc.mark;
 const ma=(same?1:clamp((u-fl*0.6)/0.45))*(sc.type==='verschieben'||sc.type==='ranking'?0.5:0.92);
 if(marks.length&&ma>0){ctx.globalAlpha=ma; ctx.beginPath(); for(const id of marks) path(byId.get(id)); ctx.fillStyle=C.target; ctx.fill(); ctx.globalAlpha=1;}
 ctx.strokeStyle=C.bg; ctx.lineWidth=2.2; ctx.lineJoin='round'; ctx.stroke(land);
 const act=kd.acts[i], work=Math.max(0.5,d-fl);
 if(sc.type==='umriss'&&act){const p=clamp((u-fl)/Math.max(1.4,work*0.55));
  for(const id of act){const g=mainPart(byId.get(id)).geometry; const polys=g.type==='Polygon'?[g.coordinates]:g.coordinates;
   for(const poly of polys){const pts=poly[0].map(c=>proj(c)).filter(Boolean); let L=0; const seg=[0]; for(let k=1;k<pts.length;k++){L+=Math.hypot(pts[k][0]-pts[k-1][0],pts[k][1]-pts[k-1][1]); seg.push(L);}
    const lim=L*p; ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]);
    for(let k=1;k<pts.length;k++){ if(seg[k]<=lim) ctx.lineTo(pts[k][0],pts[k][1]); else {const r=(lim-seg[k-1])/(seg[k]-seg[k-1]||1); ctx.lineTo(lerp(pts[k-1][0],pts[k][0],r),lerp(pts[k-1][1],pts[k][1],r)); break;}}
    ctx.strokeStyle=C.target; ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke();}
   const fa=clamp((u-fl-Math.max(1.4,work*0.55))/0.5)*0.85; if(fa>0){ctx.globalAlpha=fa; ctx.beginPath(); path(byId.get(id)); ctx.fillStyle=C.target; ctx.fill(); ctx.globalAlpha=1;}}}
 if(sc.type==='verschieben'&&act){const m=ease(clamp((u-fl)/Math.min(2.6,work*0.6)));
  act.forEach((it,k)=>{const col=MOVE_COL[k%MOVE_COL.length];
   ctx.save(); ctx.setLineDash([10,9]); ctx.beginPath(); path({type:'Feature',geometry:it.geom}); ctx.strokeStyle='rgba(246,241,231,0.7)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();
   const c=d3.geoInterpolate(it.from,it.to)(m); const g={type:'Feature',geometry:moveGeom(it.geom,it.from,c)};
   ctx.beginPath(); path(g); ctx.globalAlpha=.88; ctx.fillStyle=col; ctx.fill(); ctx.globalAlpha=1; ctx.strokeStyle=C.bg; ctx.lineWidth=3; ctx.stroke();
   const pc=proj(c); if(pc){ctx.font=`800 40px ${FD}`; const t=nameOf(it.id); const w=ctx.measureText(t).width; const x=clamp(pc[0]-w/2,100,880-w);
    ctx.lineWidth=10; ctx.strokeStyle=C.bg; ctx.lineJoin='round'; ctx.strokeText(t,x,pc[1]+14); ctx.fillStyle=C.ink; ctx.fillText(t,x,pc[1]+14);}});}
 if(sc.type==='pins'&&act){const n=act.pins.length||1, gap=work*0.6/n;
  if(act.line){for(let k=1;k<act.pins.length;k++){const t0=fl+k*gap; const a=clamp((u-t0)/0.6); if(a<=0) continue;
    const ip=d3.geoInterpolate(act.pins[k-1].p,act.pins[k].p); ctx.save(); ctx.setLineDash([16,12]); ctx.beginPath(); path({type:'LineString',coordinates:d3.range(0,1.0001,0.05).map(x=>ip(x*a))}); ctx.strokeStyle=C.ok; ctx.lineWidth=6; ctx.stroke(); ctx.restore();
    if(a>=1){const mid=proj(ip(0.5)); if(mid){const km=Math.round(d3.geoDistance(act.pins[k-1].p,act.pins[k].p)*6371).toLocaleString('de-DE')+' km'; ctx.font=`700 30px ${FM}`; const w=ctx.measureText(km).width; ctx.fillStyle=C.ok; rr(ctx,mid[0]+18,mid[1]-26,w+28,48,24); ctx.fill(); ctx.fillStyle=C.bg; ctx.fillText(km,mid[0]+32,mid[1]+8);}}}}
  act.pins.forEach((pin,k)=>{const a=clamp((u-fl-k*gap)/0.35); if(a<=0) return; const pt=proj(pin.p); if(!pt) return;
   ctx.beginPath(); ctx.arc(pt[0],pt[1],14*ease(a),0,Math.PI*2); ctx.fillStyle=C.target; ctx.fill(); ctx.lineWidth=5; ctx.strokeStyle=C.ink; ctx.stroke();
   if(pin.label){ctx.globalAlpha=a; ctx.font=`700 34px ${FB}`; const w=ctx.measureText(pin.label).width; const left=pt[0]+w+70>880; const x=left?pt[0]-w-56:pt[0]+28;
    ctx.fillStyle='rgba(11,28,42,0.88)'; rr(ctx,x,pt[1]-30,w+28,58,16); ctx.fill(); ctx.fillStyle=C.ink; ctx.fillText(pin.label,x+14,pt[1]+11); ctx.globalAlpha=1;}});}
 if(sc.type==='ranking'&&act&&act.length){const seg=work/act.length; const k=Math.min(act.length-1,Math.floor(Math.max(0,u-fl)/seg));
  if(u>fl){act.forEach((it,j)=>{if(j>k) return; ctx.globalAlpha=j===k?1:0.45; ctx.beginPath(); path(byId.get(it.id)); ctx.fillStyle=C.target; ctx.fill(); ctx.globalAlpha=1; if(j===k){ctx.strokeStyle=C.ink; ctx.lineWidth=4; ctx.stroke();}});
   const it=act[k], a=ease(clamp((u-fl-k*seg)/0.4)); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.92)'; rr(ctx,100,1080,780,160,28); ctx.fill();
   ctx.font=`700 28px ${FM}`; ctx.fillStyle=C.ok; ctx.fillText(it.label.toUpperCase(),136,1130); fitFont(ctx,nameOf(it.id),800,66,40,710,FD); ctx.fillStyle=C.ink; ctx.fillText(nameOf(it.id),136,1206); ctx.globalAlpha=1;}}
 // title card
 if(sc.type==='titel'){ctx.fillStyle='rgba(11,28,42,0.86)'; ctx.fillRect(0,0,W,H);}
 // top band: brand line, progress, headline
 const gr=ctx.createLinearGradient(0,0,0,660); gr.addColorStop(0,'rgba(11,28,42,0.96)'); gr.addColorStop(0.7,'rgba(11,28,42,0.75)'); gr.addColorStop(1,'rgba(11,28,42,0)'); ctx.fillStyle=gr; ctx.fillRect(0,0,W,660);
 ctx.font=`800 32px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(CH.name,100,332); const bw=ctx.measureText(CH.name).width; ctx.fillStyle=C.target; ctx.fillText('.',102+bw,332);
 ctx.font=`700 24px ${FM}`; ctx.fillStyle=C.mute; ctx.fillText('WISSEN',100+bw+30,330);
 ctx.fillStyle='rgba(246,241,231,0.14)'; ctx.fillRect(100,356,780,6); ctx.fillStyle=C.target; ctx.fillRect(100,356,780*clamp(tt/kd.total),6);
 if(sc.head){const ha=prev&&prev.head===sc.head?1:ease(clamp(u/0.45)); ctx.save(); ctx.globalAlpha=ha; ctx.translate(0,(1-ha)*24);
  ctx.font=`800 ${sc.type==='titel'?96:70}px ${FD}`; ctx.fillStyle=C.ink; wrap(ctx,sc.head,100,sc.type==='titel'?760:450,780,sc.type==='titel'?100:76); ctx.restore();}
 // subtitles from the spoken text
 const sent=K.subs&&sc.text?(sc.text.match(/[^.!?]+[.!?]*/g)||[]).map(s=>s.trim()).filter(Boolean):[];
 if(sent.length){const tw=sent.map(words); const sum=tw.reduce((a,b)=>a+b,0)||1;
  const span=Math.max(0.5,d-0.6); let t0=0.3,j=0; for(;j<sent.length-1;j++){const len=span*tw[j]/sum; if(u<t0+len) break; t0+=len;}
  ctx.font=`700 46px ${FB}`; const ls=[]; let line=''; for(const w of sent[j].split(' ')){const t=line?line+' '+w:w; if(ctx.measureText(t).width>700&&line){ls.push(line);line=w;} else line=t;} ls.push(line);
  const bh=ls.length*60+44, by=1440-bh; ctx.fillStyle='rgba(11,28,42,0.9)'; rr(ctx,100,by,780,bh,26); ctx.fill();
  ctx.fillStyle=C.ink; ls.forEach((l,q)=>ctx.fillText(l,140,by+70+q*60));}
}

const kc=$('kcanvas'), kctx=kc.getContext('2d'); let kPlaying=false;
function kPlay(from,to,onDone){kPlaying=true; const t0=performance.now();
 const step=now=>{const tt=from+(now-t0)/1000; drawK(kctx,Math.min(tt,to)); if(tt<to) requestAnimationFrame(step); else {kPlaying=false; onDone&&onDone();}};
 requestAnimationFrame(step);}
function kStart(i){let a=0; for(let k=0;k<i;k++) a+=kd.durs[k]; return a;}

function kScript(){const st=STORIES.find(s=>s.id===K.story); let t=0; const out=[`# Skript: ${st?st.label:'Eigenes Wissens-Video'}`,'',`Länge: ${fmt(kd.total)} · Tempo ${K.wpm} Wörter/min`,''];
 K.scenes.forEach((sc,i)=>{out.push(`## Szene ${i+1} · ${fmt(t)}–${fmt(t+kd.durs[i])}${sc.head?' · '+sc.head:''}`); out.push(sc.text||'(kein Sprechtext)'); out.push(''); t+=kd.durs[i];});
 return out.join('\n');}

function kRender(){kRebuild(); kPersist();
 $('kTotal').textContent=fmt(kd.total);
 const b=$('kBadge'); const ok=kd.total>60; b.textContent=ok?`${fmt(kd.total)} · über 1 Minute, zählt für Creator Rewards`:`${fmt(kd.total)} · unter 1 Minute, zählt nicht für Creator Rewards`; b.classList.toggle('ok',ok);
 $('kScript').value=kScript();
 document.querySelectorAll('.scene').forEach((el,i)=>{const d=el.querySelector('.dur'); if(d) d.textContent=`${fmt(kStart(i))} · ${kd.durs[i].toFixed(1).replace('.',',')} s`;});
 if(!kPlaying) drawK(kctx,Math.min(kd.total,kStart(0)+kd.durs[0]*0.85));}

function kCards(){const box=$('kScenes'); box.innerHTML='';
 K.scenes.forEach((sc,i)=>{const el=document.createElement('div'); el.className='scene';
  const opts=TYPES.map(([v,l])=>`<option value="${v}"${v===sc.type?' selected':''}>${l}</option>`).join('');
  el.innerHTML=`<div class="scene-top"><strong>SZENE ${i+1}</strong><span class="dur"></span>
   <select aria-label="Typ Szene ${i+1}" data-f="type">${opts}</select>
   <button class="mini" type="button" data-a="view">Ansehen</button>
   <button class="mini" type="button" data-a="up" aria-label="Nach oben"${i===0?' disabled':''}>↑</button>
   <button class="mini" type="button" data-a="down" aria-label="Nach unten"${i===K.scenes.length-1?' disabled':''}>↓</button>
   <button class="mini" type="button" data-a="del" aria-label="Löschen">✕</button></div>
   <label>Überschrift<input data-f="head" id="k-head-${i}" type="text"></label>
   <label>Sprechtext<textarea data-f="text" id="k-text-${i}"></textarea></label>
   <div class="two"><label>Kamera<input data-f="cam" id="k-cam-${i}" type="text" placeholder="bleibt"></label>
   <label>Markieren<input data-f="mark" id="k-mark-${i}" type="text" placeholder="keine"></label>
   <label>Dauer (s)<input data-f="dur" id="k-dur-${i}" type="number" min="0" step="0.5" placeholder="auto"></label></div>
   <label data-actwrap>Aktion<textarea data-f="act" id="k-act-${i}"></textarea></label>`;
  el.querySelector('[data-f=head]').value=sc.head||''; el.querySelector('[data-f=text]').value=sc.text||'';
  el.querySelector('[data-f=cam]').value=sc.cam||''; el.querySelector('[data-f=mark]').value=sc.mark||'';
  el.querySelector('[data-f=dur]').value=sc.dur>0?sc.dur:''; el.querySelector('[data-f=act]').value=sc.act||'';
  const ph={umriss:'Chile',verschieben:'Grönland -> afrika\nUSA -> 24, 8',pins:'-33.45, -70.67 | Santiago\nlinie',ranking:'China | 14 Nachbarn'};
  const aw=el.querySelector('[data-actwrap]'); aw.hidden=!ph[sc.type]; el.querySelector('[data-f=act]').placeholder=ph[sc.type]||'';
  el.addEventListener('input',e=>{const f=e.target.dataset.f; if(!f) return; sc[f]=f==='dur'?(parseFloat(e.target.value)||0):e.target.value;
   if(f==='type'){K.story='custom'; $('kStory').value='custom'; kCards();} else K.story==='custom'||($('kStory').value='custom',K.story='custom'); kRender();});
  el.addEventListener('click',e=>{const a=e.target.dataset&&e.target.dataset.a; if(!a) return;
   if(a==='view'){ if(kPlaying) return; kPlay(kStart(i),kStart(i)+kd.durs[i]); kc.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'}); return;}
   if(a==='up'&&i>0){[K.scenes[i-1],K.scenes[i]]=[K.scenes[i],K.scenes[i-1]];}
   if(a==='down'&&i<K.scenes.length-1){[K.scenes[i+1],K.scenes[i]]=[K.scenes[i],K.scenes[i+1]];}
   if(a==='del'){K.scenes.splice(i,1);}
   K.story='custom'; $('kStory').value='custom'; kCards(); kRender();});
  box.appendChild(el);});}

const kStory=$('kStory'); STORIES.forEach(s=>{const o=document.createElement('option');o.value=s.id;o.textContent=s.label;kStory.appendChild(o);});
{const o=document.createElement('option');o.value='custom';o.textContent='Eigenes Video';kStory.appendChild(o);}
kStory.value=K.story; $('kWpm').value=String(K.wpm); $('kSubs').checked=K.subs;
kStory.addEventListener('change',()=>{const s=STORIES.find(s=>s.id===kStory.value); K.story=kStory.value; if(s) K.scenes=JSON.parse(JSON.stringify(s.scenes)); kCards(); kRender();});
$('kWpm').addEventListener('change',()=>{K.wpm=+$('kWpm').value; kRender();});
$('kSubs').addEventListener('change',()=>{K.subs=$('kSubs').checked; kRender();});
$('kAdd').addEventListener('click',()=>{K.scenes.push({type:'karte',cam:'',mark:'',head:'',text:'',act:'',dur:0}); K.story='custom'; kStory.value='custom'; kCards(); kRender();});
$('kPlay').addEventListener('click',()=>{if(!kPlaying) kPlay(0,kd.total);});
function kLegacyRecord(){const el=$('kStatus'); if(kPlaying) return;
 const types=['video/mp4;codecs=avc1.42E01E','video/mp4','video/webm;codecs=vp9','video/webm'];
 const mt=window.MediaRecorder&&kc.captureStream?types.find(t=>MediaRecorder.isTypeSupported(t)):null;
 if(!mt){status(el,'Aufnahme wird auf diesem Gerät nicht unterstützt. Nutze die Bildschirmaufnahme.',true);return;}
 const rec=new MediaRecorder(kc.captureStream(30),{mimeType:mt,videoBitsPerSecond:8_000_000}); const chunks=[];
 rec.ondataavailable=e=>{if(e.data&&e.data.size) chunks.push(e.data);};
 rec.onstop=()=>{const ext=mt.includes('mp4')?'mp4':'webm'; const blob=new Blob(chunks,{type:mt.split(';')[0]}); $('kRecord').disabled=false;
  status(el,`Fertig (${(blob.size/1e6).toFixed(1)} MB). Speichern …`); (kPending={name:`${CH.id}_wissen_${K.story}.${ext}`,blob},$('kSaveVideo').hidden=false);};
 $('kRecord').disabled=true; status(el,`Nimmt auf … bitte die Seite offen lassen (${fmt(kd.total)}).`); rec.start(1000);
 kPlay(0,kd.total+1.2,()=>{try{rec.requestData();}catch(e){} setTimeout(()=>rec.stop(),700);});}
let kPending=null;
$('kSaveVideo').addEventListener('click',()=>{if(kPending) save(kPending.name,kPending.blob,$('kStatus'));});
$('kRecord').addEventListener('click',async()=>{const el=$('kStatus'); if(kPlaying) return; $('kSaveVideo').hidden=true;
 let codecs=null; try{codecs=await pickCodecs(false);}catch(e){}
 if(!codecs){status(el,'Sauberer Export wird hier nicht unterstützt, nehme live auf …'); return kLegacyRecord();}
 kPlaying=true; $('kRecord').disabled=true; status(el,'Rendere Video … 0 %');
 try{const blob=await renderClean({canvas:kc,draw:t=>drawK(kctx,Math.min(t,kd.total)),duration:kd.total+1.2,audio:null,codecs,onProgress:p=>status(el,`Rendere Video … ${Math.round(p*100)} %`)});
  kPending={name:`${CH.id}_wissen_${K.story}.mp4`,blob}; status(el,`Fertig: ${(blob.size/1e6).toFixed(1)} MB, 30 fps. Jetzt sichern.`); $('kSaveVideo').hidden=false;}
 catch(e){status(el,'Export fehlgeschlagen ('+((e&&e.message)||e)+'). Nutze „Vorschau abspielen“ + Bildschirmaufnahme.',true);}
 finally{kPlaying=false; $('kRecord').disabled=false; kRender();}});

$('kCopy').addEventListener('click',async()=>{const ta=$('kScript'); try{await navigator.clipboard.writeText(ta.value); $('kCopy').textContent='Kopiert';}catch(e){ta.select(); $('kCopy').textContent='Markiert';} setTimeout(()=>$('kCopy').textContent='Kopieren',1600);});
$('kSaveMd').addEventListener('click',()=>save(`Skript – ${(STORIES.find(s=>s.id===K.story)||{label:'Eigenes Wissens-Video'}).label.replace(/[?\/]/g,'')}.md`,$('kScript').value,$('kStatus')));

function setMode(m){const w=m==='wissen'; $('mode-wissen').hidden=!w; $('mode-quiz').hidden=w; $('tab-wissen').setAttribute('aria-selected',w); $('tab-quiz').setAttribute('aria-selected',!w);
 try{localStorage.setItem('geofy-mode',m);}catch(e){} if(w) kRender();}
$('tab-quiz').addEventListener('click',()=>setMode('quiz')); $('tab-wissen').addEventListener('click',()=>setMode('wissen'));
kCards();
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
document.fonts&&document.fonts.ready.then(()=>{refresh(); kRender();});
})();
