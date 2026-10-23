// Geofy Studio · Wissen 2.0
// Skript (Absätze = Szenen) + Stimme (MP3) → Szenen mit Kamerafahrten, Markierungen, Zahlen, Vergleichen, Routen,
// wortgenauen Untertiteln, Outro-Karte, Cover und Caption. Gerendert mit der Wissens-Engine (js/kv-engine.js), Stil Satellit.
(function(){
'use strict';
const $=id=>document.getElementById(id);
let G=null, KV=null, ready=false;
const SERIES=[
 {id:'karten',name:'Karten lügen',tag:'#kartenlügen'},{id:'warum',name:'Warum ist …?',tag:'#warumist'},
 {id:'grenz',name:'Grenz-Kuriositäten',tag:'#grenzkuriositäten'},{id:'waswaere',name:'Was wäre, wenn …?',tag:'#waswärewenn'},
 {id:'wo',name:'Wo leben eigentlich alle?',tag:'#bevölkerung'},{id:'nadel',name:'Nadelöhre der Welt',tag:'#nadelöhre'},
 {id:'rekorde',name:'Rekorde',tag:'#rekorde'},{id:'haupt',name:'Hauptstadt-Geheimnisse',tag:'#hauptstadt'},{id:'frei',name:'Geo-Wissen',tag:'#geowissen'}];
const EXAMPLES=[
 ['chile','warum',1,'Warum ist Chile so lang?'],['afrika','karten',1,'Wie groß ist Afrika wirklich?'],['kaliningrad','grenz',1,'Kaliningrad'],
 ['zeitzonen','rekorde',1,'Die meisten Zeitzonen'],['kreis','wo',1,'Der Kreis der Menschheit'],['deutschland','karten',2,'So groß ist Deutschland wirklich'],
 ['grenzen','warum',2,'Warum sind Afrikas Grenzen so gerade?'],['fasan','grenz',2,'Die Fasaneninsel'],['eis','waswaere',1,'Was, wenn alles Eis schmilzt?'],
 ['suez','nadel',1,'Der Suezkanal'],['kanada','karten',3,'Kanada oder USA?'],['gambia','warum',3,'Warum ist Gambia nur ein Fluss?'],['baarle','grenz',3,'Baarle: zwei Länder, ein Ort'],['saudi','rekorde',2,'Das größte Land ohne Fluss'],['brasilia','haupt',1,'Warum wurde Brasília ins Nichts gebaut?'],['indonesien','karten',4,'Wie groß ist Indonesien wirklich?'],['alaska','warum',4,'Warum gehört Alaska zu den USA?'],['bodensee','grenz',4,'Der Bodensee hat keine Grenze'],['mittelmeer','waswaere',2,'Das Mittelmeer trocknet aus'],['australien','wo',2,'Warum wohnen fast alle Australier an der Küste?'],['antarktis','karten',5,'Wie groß ist die Antarktis wirklich?'],['wakhan','warum',5,'Warum hat Afghanistan einen Finger?'],['jungholz','grenz',5,'Jungholz: nur ein Punkt verbindet es mit Österreich'],['samoa','rekorde',3,'Der Tag, den es in Samoa nie gab'],['panama','nadel',2,'Der Panamakanal'],['russland','karten',6,'Wie groß ist Russland wirklich?']];
const PAL=['#FF3B7F','#33D1B0','#F2B66D','#9FD8F5','#7FCB8F','#B79CFF'];
const W={state:{series:'karten',ep:4,title:'',script:'',cover:'',coverAt:0}, timing:null, voice:null, voiceName:'', scenes:[], story:null, edits:{}};
try{const s=JSON.parse(localStorage.getItem('geofy-wissen2')||'null'); if(s) Object.assign(W.state,s);}catch(e){}
const persist=()=>{try{localStorage.setItem('geofy-wissen2',JSON.stringify(W.state));}catch(e){}};

// ---------------- Lexikon ----------------
const REG={ // [lon,lat,spanDeg]
 'europa':[12,52,62],'afrika':[17,2,78],'asien':[88,32,120],'südamerika':[-60,-22,58],'nordamerika':[-100,46,90],'mittelamerika':[-86,15,26],
 'ozeanien':[150,-22,70],'antarktis':[30,-70,150],'arktis':[0,76,140],'karibik':[-73,17,30],'mittelmeer':[16,38,48],'skandinavien':[16,63,34],
 'balkan':[21,43,18],'sahara':[8,23,52],'alpen':[10.5,46.4,13],'anden':[-70,-20,40],'himalaya':[84,30,26],'amazonas':[-60,-5,30],
 'nahen osten':[45,28,40],'naher osten':[45,28,40],'südostasien':[110,8,45],'zentralasien':[66,43,38],'sibirien':[105,62,80],'patagonien':[-69,-47,18],
 'pazifik':[-170,5,120],'atlantik':[-35,25,90],'indischer ozean':[78,-12,80],'indischen ozean':[78,-12,80],'nordsee':[3,56,16],'ostsee':[19,58,20],
 'rotes meer':[38,21,20],'roten meer':[38,21,20],'äquator':[0,0,140],'weltkarte':[15,20,320]};
const PLACES={ // Landmarken: [lon,lat,spanDeg]
 'suezkanal':[32.35,30.6,5],'panamakanal':[-79.7,9.1,4],'straße von hormus':[56.4,26.5,7],'straße von malakka':[100.5,3.5,12],'straße von gibraltar':[-5.6,36,6],
 'bosporus':[29.05,41.1,3],'ärmelkanal':[-1.5,50.2,9],'beringstraße':[-169,65.8,12],'kap der guten hoffnung':[18.47,-34.36,10],'kap hoorn':[-67.3,-55.98,10],
 'bab al-mandab':[43.3,12.6,6],'dardanellen':[26.4,40.2,4],'nil':[31.2,23,32],'ganges':[84,25.5,22],'jangtse':[112,30.5,26],'mississippi':[-91,35,26],
 'rhein':[7.5,49.5,9],'donau':[19,46,22],'wolga':[46,52,22],'mekong':[104,15,22],'mount everest':[86.92,27.99,6],'everest':[86.92,27.99,6],
 'kilimandscharo':[37.36,-3.07,6],'mont blanc':[6.86,45.83,4],'zugspitze':[10.98,47.42,3],'matterhorn':[7.66,45.98,3],'atacama':[-69.5,-24,11],
 'atacama-wüste':[-69.5,-24,11],'gobi':[105,43,22],'kalahari':[22,-23,15],'grand canyon':[-112.1,36.1,5],'great barrier reef':[147,-18,16],
 'großes barriereriff':[147,-18,16],'totes meer':[35.5,31.5,3],'toten meer':[35.5,31.5,3],'kaspisches meer':[50.5,41.5,15],'bodensee':[9.3,47.6,3],
 'victoriasee':[33,-1,7],'baikalsee':[108,53.5,11],'hawaii':[-157,20.5,9],'galápagos':[-90.5,-0.6,6],'sizilien':[14,37.5,5],'korsika':[9.1,42.1,4],
 'kreta':[24.9,35.2,5],'mallorca':[3,39.6,3],'tasmanien':[146.6,-42,7],'feuerland':[-68,-54,9],'nordpol':[0,84,50],'datumsgrenze':[180,0,70],
 'bir tawil':[33.7,21.9,6],'kaliningrad':[20.5,54.7,6],'fasaneninsel':[-1.77,43.34,4],'gambia':[-15.3,13.45,6],'yuxi':[102.54,24.35,10],'büsingen':[8.69,47.7,3],
 'baarle':[4.93,51.44,8],'llívia':[1.98,42.46,3],'gibraltar':[-5.35,36.14,4],'ceuta':[-5.32,35.89,4],'melilla':[-2.94,35.29,4],'kleinwalsertal':[10.17,47.34,3],
 'jungholz':[10.45,47.57,3],'point roberts':[-123.07,48.99,4],'alaska':[-150,63,30],'sibirien':[105,62,80]};
const CONT={'europa':'Europe','afrika':'Africa','asien':'Asia','südamerika':'South America','nordamerika':'North America','ozeanien':'Oceania'};
const ALIAS={'usa':'USA','vereinigte staaten':'USA','amerika':'USA','großbritannien':'GBR','england':'GBR','vereinigtes königreich':'GBR','holland':'NLD','dr kongo':'COD',
 'demokratische republik kongo':'COD','kongo':'COD','republik kongo':'COG','tschechien':'CZE','elfenbeinküste':'CIV','grönland':'GRL','taiwan':'TWN','nordkorea':'PRK','südkorea':'KOR',
 'korea':'KOR','emirate':'ARE','vereinigte arabische emirate':'ARE','bosnien':'BIH','weißrussland':'BLR','burma':'MMR','persien':'IRN','vatikan':'VAT','westsahara':'ESH','kosovo':'KOS'};
const NUMW={'eins':1,'zwei':2,'drei':3,'vier':4,'fünf':5,'sechs':6,'sieben':7,'acht':8,'neun':9,'zehn':10,'elf':11,'zwölf':12,'zwanzig':20,'dreißig':30,'hundert':100};
const UNIT={'kilometer':'km','kilometern':'km','km':'km','meter':'m','metern':'m','prozent':'%','millionen':'Mio.','million':'Mio.','milliarden':'Mrd.','milliarde':'Mrd.',
 'quadratkilometer':'km²','quadratkilometern':'km²','jahre':'Jahre','jahren':'Jahre','tage':'Tage','tagen':'Tage','einwohner':'Einwohner','menschen':'Menschen','grad':'°',
 'stunden':'Std.','zeitzonen':'Zeitzonen','länder':'Länder','ländern':'Länder','nachbarn':'Nachbarn','sprachen':'Sprachen','inseln':'Inseln','schiffe':'Schiffe','seen':'Seen'};
const CITY_BLOCK=new Set(['essen','mitte','nord','süd','ost','west','victoria','ende','san','santa','halle','marken']);
let LEX=null, AREA=new Map();
function buildLex(places){const m=new Map(); const add=(k,v)=>{k=k.toLowerCase(); if(!m.has(k)) m.set(k,v);};
 for(const [k,id] of Object.entries(ALIAS)) if(G.byId.has(id)) add(k,{kind:'country',id});
 for(const [id,n] of Object.entries(G.NAMES)) if(G.byId.has(id)){add(n[0],{kind:'country',id}); add(n[1],{kind:'country',id});}
 for(const f of G.features){const p=f.properties; if(p.de) add(p.de,{kind:'country',id:f.id}); if(p.en) add(p.en,{kind:'country',id:f.id}); AREA.set(f.id,p.area||0);}
 for(const [k,v] of Object.entries(PLACES)) add(k,{kind:'place',name:k.replace(/(^|[\s-])\S/g,c=>c.toUpperCase()),ll:[v[0],v[1]],view:v});
 for(const [k,v] of Object.entries(REG)) add(k,{kind:'region',key:k,view:v});
 if(places){for(const [de,en,b] of places.seas){const v=[(b[0]+b[2])/2,(b[1]+b[3])/2,Math.max(b[2]-b[0],(b[3]-b[1])*1.3)*1.15]; add(de,{kind:'sea',name:de,view:v}); if(en) add(en,{kind:'sea',name:de,view:v});}
  for(const [de,en,x,y,pop] of places.cities){if(CITY_BLOCK.has(de.toLowerCase())) continue; add(de,{kind:'city',name:de,ll:[x,y],pop}); if(en) add(en,{kind:'city',name:de,ll:[x,y],pop});}}
 return m;}
const clean=w=>w.replace(/^[„“"'(]+|[.,:;!?“”"')]+$/g,'');
function lookup(phrase){const k=phrase.toLowerCase(); let e=LEX.get(k); if(e) return e;
 for(const suf of ['s','es','n']){if(k.length>4&&k.endsWith(suf)){e=LEX.get(k.slice(0,-suf.length)); if(e&&e.kind!=='city') return e;}} return null;}
const nameOfId=id=>{const n=G.NAMES[id]; if(n) return n[0]; const f=G.byId.get(id); return (f&&(f.properties.de||f.properties.en))||id;};

// ---------------- Analyse eines Absatzes ----------------
function analyse(words){ // words: [{w,t0,t1}] times relative to scene start
 const ents=[], nums=[], sentences=[]; let sent=[];
 for(let i=0;i<words.length;i++){
  const raw=words[i].w, cw=clean(raw); sent.push(i); if(/[.?!]$/.test(raw)||i===words.length-1){sentences.push(sent); sent=[];}
  // entities: up to 3-grams, must start uppercase (German nouns) or be an alias like USA
  let hit=null, len=0;
  for(let n=3;n>=1&&!hit;n--){if(i+n>words.length) continue; const ph=words.slice(i,i+n).map(x=>clean(x.w)).join(' '); if(!/^[A-ZÄÖÜ]/.test(ph)) continue; if(n>1&&/[.,:;!?]$/.test(words[i+n-2].w)) continue;
   const e=lookup(ph); if(e){hit=e; len=n;}}
  if(hit){ents.push({...hit,t:words[i].t0,i,text:words.slice(i,i+len).map(x=>clean(x.w)).join(' ')}); i+=len-1; continue;}
  // numbers: 4.000 · 55 · 9,5 · 27-mal · Jahreszahlen · Zahlwörter mit Einheit
  let m=cw.match(/^(\d{1,3}(?:\.\d{3})+|\d+(?:,\d+)?)(-mal)?$/); let val=null, txt=null;
  if(m){val=m[1]; txt=m[1];}
  else if(NUMW[cw.toLowerCase()]&&words[i+1]&&UNIT[clean(words[i+1].w).toLowerCase()]){val=String(NUMW[cw.toLowerCase()]); txt=val;}
  if(val){const next=words[i+1]?clean(words[i+1].w).toLowerCase():''; const next2=words[i+2]?clean(words[i+2].w).toLowerCase():''; let unit=UNIT[next]||'';
   if(unit==='Mio.'||unit==='Mrd.'){const u2=UNIT[next2]; if(u2&&u2!=='Mio.'&&u2!=='Mrd.') unit=unit+' '+u2;}
   const isYear=/^(1[0-9]{3}|20[0-9]{2})$/.test(val)&&!unit&&!(m&&m[2]);
   const label=m&&m[2]?`${txt} ×`:isYear?val:unit?`${txt} ${unit}`:null;
   if(label) nums.push({t:words[i].t0,i,label,year:isYear});}}
 // routes: "von X nach Y" / "zwischen X und Y"
 const routes=[];
 for(let a=0;a<ents.length-1;a++){const e1=ents[a], e2=ents[a+1]; const w1=e1.i>0?clean(words[e1.i-1].w).toLowerCase():'', w2=e2.i>0?clean(words[e2.i-1].w).toLowerCase():'';
  if((w1==='von'&&w2==='nach')||(w1==='zwischen'&&w2==='und')) routes.push({a:e1,b:e2,t:e1.t});}
 // size comparisons: a sentence with two countries + a size word
 const comps=[];
 sentences.forEach(si=>{const txt=si.map(k=>words[k].w).join(' '); if(!/(groß|größer|kleiner|Fläche|passt|passen|hinein|mal so|Vergleich|echte[rn]? Größe)/i.test(txt)) return;
  const cs=ents.filter(e=>e.kind==='country'&&e.i>=si[0]&&e.i<=si[si.length-1]); const ids=[...new Set(cs.map(e=>e.id))]; if(ids.length<2) return;
  const [x,y]=ids; const small=AREA.get(x)<=AREA.get(y)?x:y, big=small===x?y:x; comps.push({small,big,t:cs[1].t});});
 const q=sentences.map(si=>si.map(k=>words[k].w).join(' ')).find(s=>/\?$/.test(s)&&s.length<=44);
 return {ents,nums,routes,comps,question:q||''};}

// ---------------- Kamera ----------------
function viewOfEnt(e){const {viewObj,viewBox}=KV;
 if(e.kind==='country'){const f=KV.mainPart(e.id); let v=viewObj(f,KV.KB,0.22); const maxS=920/(6*Math.PI/180); if(v.scale>maxS) v={...v,scale:maxS}; return v;}
 if(e.kind==='city') return spanView(e.ll[0],e.ll[1],7);
 if(e.kind==='place') return spanView(e.view[0],e.view[1],e.view[2]);
 return spanView(e.view[0],e.view[1],e.view[2]);}
function spanView(lon,lat,span){const s=920/(Math.max(8,Math.min(330,span))*Math.PI/180); return {lon,lat,scale:s};}
function unionView(ents){const pts=[]; ents.forEach(e=>{if(e.kind==='country'){const b=d3.geoBounds(KV.mainPart(e.id)); pts.push(b[0],b[1]);} else if(e.kind==='city') pts.push(e.ll); else if(e.kind==='place'&&e.view[2]<12){const v=e.view; pts.push([v[0]-v[2]/2,v[1]-v[2]/3],[v[0]+v[2]/2,v[1]+v[2]/3]);} else {const v=e.view; pts.push([v[0]-v[2]/2,v[1]-v[2]/3],[v[0]+v[2]/2,v[1]+v[2]/3]);}});
 if(!pts.length) return null; const lons=pts.map(p=>p[0]); if(Math.max(...lons)-Math.min(...lons)>200) return spanView(15,20,320);
 let v=KV.viewObj({type:'MultiPoint',coordinates:pts},KV.KB,0.12); const maxS=920/(6*Math.PI/180); if(v.scale>maxS) v={...v,scale:maxS}; return v;}
const zoomed=(v,k)=>({lon:v.lon,lat:v.lat,scale:v.scale*k});

// ---------------- Szenen bauen ----------------
function isOutro(text){return /^Wusstest du/i.test(text)||/(Gib dem Video ein Like|Like da|folge für mehr)/i.test(text);}
function buildScenes(){const paras=GeoAlign.splitScenes(W.state.script); const T=W.timing;
 const out=[]; paras.forEach((p,i)=>{const tw=T.scenes[i]; const start=i===0?0:Math.max(T.scenes[i-1].speechEnd+0.05,tw.speechStart-0.35);
  const words=tw.words.map(w=>({w:w.w,t0:w.t0-start,t1:w.t1-start})); const an=analyse(words); const ed=W.edits[i]||{};
  out.push({i,text:p,words,an,outro:isOutro(p),head:ed.head!=null?ed.head:(i===0?(W.state.title||an.question):an.question),
   countries:ed.countries!=null?ed.countries:[...new Set(an.ents.filter(e=>e.kind==='country').map(e=>nameOfId(e.id)))].join(', '),fx:ed.fx||'auto'});});
 W.scenes=out; return out;}

function sceneEnts(sc){ // user-edited country list overrides detected countries (keeps detected timing where possible)
 const want=sc.countries.split(',').map(s=>s.trim()).filter(Boolean).map(s=>{const e=lookup(s); return e&&e.kind==='country'?e.id:null;}).filter(Boolean);
 const det=sc.an.ents.filter(e=>e.kind!=='country'||want.includes(e.id)); const have=new Set(det.filter(e=>e.kind==='country').map(e=>e.id));
 want.forEach((id,k)=>{if(!have.has(id)) det.push({kind:'country',id,t:0.4+k*0.6,i:-1,text:nameOfId(id)});});
 return det.sort((a,b)=>a.t-b.t);}

function makeStory(){const {C,FD,FB,L,clamp,ease,eout,label,rr,fit,hl}=KV; const sc0=W.scenes;
 const colorOf=new Map(); let ci=0; const colFor=id=>{if(!colorOf.has(id)) colorOf.set(id,PAL[ci++%PAL.length]); return colorOf.get(id);};
 const seen=new Set(); let lastView=spanView(15,20,320);
 const allEnts=sc0.flatMap(sc=>sceneEnts(sc)); const focus=allEnts.length?viewOfEnt(allEnts[0]):null; let lastFocus=focus;
 const tagAt=(e,ll,txt,a,col,dy=0)=>{const q=e.proj(ll); if(!q||q[0]<-40||q[0]>1120||q[1]<330||q[1]>1450) return; label(e.ctx,txt,q[0]-txt.length*8,q[1]+dy,{color:col,alpha:a,font:`800 32px ${FD}`});};
 const pulse=(e,ll,a,col)=>{if(a<=0) return; const q=e.proj(ll); if(!q) return; const {ctx,t}=e; ctx.save(); for(let r=0;r<2;r++){const ph=((t*0.8)+r/2)%1; ctx.beginPath(); ctx.arc(q[0],q[1],12+ph*50,0,7); ctx.strokeStyle=col; ctx.globalAlpha=a*(1-ph); ctx.lineWidth=5; ctx.stroke();} ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(q[0],q[1],11,0,7); ctx.fillStyle=col; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke(); ctx.restore();};
 const ctr=e=>e.kind==='country'?d3.geoCentroid(KV.mainPart(e.id)):(e.kind==='city'||e.kind==='place')?e.ll:[e.view[0],e.view[1]];
 const moved=(geom,from,to)=>{const r1=d3.geoRotation([-from[0],-from[1]]), r2=d3.geoRotation([-to[0],-to[1]]); const mp=x=>typeof x[0]==='number'?r2.invert(r1(x)):x.map(mp); return {type:'Feature',geometry:{type:geom.type,coordinates:mp(geom.coordinates)}};};
 const big=(ctx,txt,a)=>{if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.font=`800 130px ${FD}`; ctx.textAlign='center'; ctx.lineWidth=12; ctx.strokeStyle='rgba(5,14,24,0.85)'; ctx.lineJoin='round'; ctx.strokeText(txt,540,700); ctx.fillStyle='#fff'; ctx.fillText(txt,540,700); ctx.restore();};
 const scenes=sc0.map((sc,si)=>{
  const ents=sceneEnts(sc), an=sc.an, dur=(sc.words.length?sc.words[sc.words.length-1].t1:3)+0.8, wt=frag=>{const i=sc.words.findIndex(w=>clean(w.w).toLowerCase().startsWith(frag.toLowerCase())); return i>=0?sc.words[i].t0:dur*0.5;};
  const prevSeen=new Set(seen); ents.filter(e=>e.kind==='country').forEach(e=>{seen.add(e.id); colFor(e.id);});
  const cams=[]; const prev=lastView;
  if(sc.outro){cams.push({at:0,view:zoomed(prev,0.85),fly:1.2},{at:1.4,view:spanView(15,22,300),fly:4.5});}
  else if(!ents.length||sc.fx==='karte'){const base=ents.length?unionView(ents):(focus?zoomed(focus,0.6):prev); const far=zoomed(base,0.55), near=zoomed(base,1.15);
   if(si===0&&!ents.length&&focus){cams.push({at:0,view:spanView(15,22,300),fly:0.1},{at:0.4,view:zoomed(focus,0.7),fly:Math.max(2.5,dur*0.6)},{at:Math.max(2.8,dur*0.65),view:focus,fly:dur*0.35});}
   else cams.push({at:0,view:far,fly:1.6},{at:1.8,view:near,fly:Math.max(2,dur-2)});}
  else {const uv=unionView(ents)||prev; cams.push({at:0,view:ents.length>1?uv:viewOfEnt(ents[0]),fly:1.4});
   let lastT=-9; ents.forEach((e,k)=>{if(k===0&&ents.length===1) return; if(e.t-lastT<1.1) return; lastT=e.t; cams.push({at:Math.max(0.2,e.t-0.35),view:viewOfEnt(e),fly:1.2});});
   const lt=ents[ents.length-1].t; if(ents.length>1&&dur-lt>2.2) cams.push({at:lt+1.4,view:uv,fly:1.6});}
  // size comparison: bring the larger country into view with the moving one
  const comps=(sc.fx==='auto'||sc.fx==='vergleich')?an.comps.slice(0,1):[];
  if(sc.fx==='vergleich'&&!comps.length){const cs=[...new Set(ents.filter(e=>e.kind==='country').map(e=>e.id))]; if(cs.length>=2){const [x,y]=cs; const small=AREA.get(x)<=AREA.get(y)?x:y; comps.push({small,big:small===x?y:x,t:ents[1].t});}}
  const compTo=comps.map(c=>{const bb=d3.geoBounds(KV.mainPart(c.big)), sb=d3.geoBounds(KV.mainPart(c.small)); const cb=d3.geoCentroid(KV.mainPart(c.big)); const wB=(bb[1][0]-bb[0][0]+360)%360, wS=(sb[1][0]-sb[0][0]+360)%360;
   const to=[cb[0]+(Math.min(wB,60)/2+Math.min(wS,60)/2)*0.85*Math.cos(cb[1]*Math.PI/180)**0, cb[1]]; return {...c,from:d3.geoCentroid(KV.mainPart(c.small)),to};});
  compTo.forEach(c=>{for(let q=cams.length-1;q>0;q--){if(cams[q].at>c.t-0.5&&cams[q].at<c.t+3.4) cams.splice(q,1);} cams.push({at:Math.max(0.3,c.t-0.3),view:KV.viewObj({type:'FeatureCollection',features:[KV.mainPart(c.big),moved(KV.mainPart(c.small).geometry,c.from,c.to)]},KV.KB,0.12),fly:1.6});});
  const routes=(sc.fx==='auto'||sc.fx==='route')?an.routes:[];
  routes.forEach(r=>{cams.push({at:Math.max(0.3,r.t-0.2),view:unionView([r.a,r.b]),fly:1.4});});
  cams.sort((a,b)=>a.at-b.at); lastView=cams[cams.length-1].view; if(ents.length) lastFocus=unionView(ents)||lastFocus;
  const pops=[...ents.map(e=>e.t),...an.nums.map(n=>n.t)].filter(t=>t>0.2);
  const under=[e=>{const {u}=e;
   prevSeen.forEach(id=>{if(!ents.some(x=>x.id===id)) hl(e,id,colFor(id),0.22,{outline:false});});
   ents.forEach(x=>{if(x.kind==='country') hl(e,x.id,colFor(x.id),0.85*clamp((u-x.t+0.15)/0.4)); if(x.kind==='region'&&CONT[x.key]){const a=0.35*clamp((u-x.t+0.15)/0.5); if(a>0) G.features.filter(f=>f.properties.cont===CONT[x.key]).forEach(f=>hl(e,f.id,'#F6F1E7',a,{outline:false}));}});}];
  const over=[e=>{const {u,ctx}=e;
   const shown=new Set(); ents.forEach(x=>{const a=clamp((u-x.t)/0.35); if(a<=0) return; const key=x.kind+(x.id||x.name||x.key); if(shown.has(key)) return; shown.add(key);
    if(x.kind==='country') tagAt(e,ctr(x),nameOfId(x.id),a,colFor(x.id)); else if(x.kind==='city'||x.kind==='place'){pulse(e,x.ll,a,'#FFE066'); tagAt(e,x.ll,x.kind==='place'?x.text:x.name,a,'#FFE066',-40);} else if(x.kind==='sea') tagAt(e,ctr(x),x.name,a,C.ice);});
   compTo.forEach(c=>{const k=ease(clamp((u-c.t)/1.6)); if(k<=0) return; const cur=d3.geoInterpolate(c.from,c.to)(k); const g=moved(KV.mainPart(c.small).geometry,c.from,cur);
    ctx.save(); ctx.beginPath(); e.path(g); ctx.globalAlpha=0.8; ctx.fillStyle=colFor(c.small); ctx.fill(); ctx.globalAlpha=1; ctx.strokeStyle='#fff'; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore();
    if(k>0.9) label(ctx,`${nameOfId(c.small)} in echter Größe`,L+20,1180,{color:'#0B1C2A',bg:'rgba(246,241,231,0.95)',alpha:clamp((k-0.9)*10)*(1-clamp((u-c.t-4.5)/0.5)),font:`800 36px ${FD}`});});
   routes.forEach(r=>{const k=clamp((u-r.t)/1.8); if(k<=0) return; const a=ctr(r.a), b=ctr(r.b); const ip=d3.geoInterpolate(a,b); ctx.save(); ctx.setLineDash([18,12]); ctx.lineDashOffset=-e.t*50; ctx.beginPath();
    e.path({type:'LineString',coordinates:d3.range(0,1.0001,0.02).map(x=>ip(x*eout(k)))}); ctx.strokeStyle='#FFE066'; ctx.lineWidth=7; ctx.lineCap='round'; ctx.stroke(); ctx.restore();
    if(k>=1){const km=Math.round(d3.geoDistance(a,b)*6371/100)*100; label(ctx,`≈ ${km.toLocaleString('de-DE')} km Luftlinie`,L+20,1255,{color:'#0B1C2A',bg:'rgba(255,224,102,0.95)',font:`800 38px ${FD}`});}});
   // numbers: two badge slots, newest on top; years appear big first
   const vis=an.nums.filter(n=>u>=n.t); const last2=vis.slice(-2);
   last2.forEach((n,k)=>{const a=clamp((u-n.t)/0.3); const y=last2.length===2&&k===0?1180:1255; const slotY=last2.length===1?1255:y; if(n.year&&u-n.t<1.6){big(ctx,n.label,a*(1-clamp((u-n.t-1.2)/0.4)));}
    else label(ctx,n.label,L+20,slotY,{color:'#fff',bg:k===last2.length-1?'rgba(255,59,127,0.95)':'rgba(11,28,42,0.9)',alpha:a,font:`800 42px ${FD}`});});}];
  const top=sc.outro?[e=>outroCard(e,sc)]:[];
  return {head:sc.outro?'':sc.head, headInstant:si===0, say:sc.text, cams, under, over, top, pops, wt};});
 return {tag:'',scenes};}

function outroCard(e,sc){const {ctx,u}=e; const {C,FD,clamp,eout,rr,fit}=KV; const a=eout(clamp((u-0.2)/0.6));
 const wt=f=>{const i=sc.words.findIndex(w=>clean(w.w).toLowerCase().startsWith(f)); return i>=0?sc.words[i].t0:null;};
 const rows=[['heart','Like da lassen',wt('like')],['bubble','Kommentar: Wusstest du es?',wt('kommentar')],['share','Teilen mit jemandem',wt('schick')??wt('teil')]];
 const q=/^Wusstest du/i.test(sc.text)?'Wusstest du das schon?':(sc.text.split(/[.?!]/)[0]+'?');
 ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(11,28,42,0.92)'; rr(ctx,100,560,780,470,32); ctx.fill(); const z=fit(ctx,q,800,76,48,700,FD); ctx.font=`800 ${z}px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(q,140,670,700);
 rows.forEach(([ic,txt,t],i)=>{const t0=t==null?1.2+i*0.9:t; const ai=clamp((u-t0+0.2)/0.35); if(ai<=0) return; const y=790+i*105, x=170; ctx.save(); ctx.globalAlpha=a*ai; ctx.translate(x,y-14); const s=1+0.25*Math.max(0,1-(u-t0)/0.4); ctx.scale(s,s);
  ctx.fillStyle=C.target; ctx.strokeStyle=C.target; ctx.lineWidth=5; ctx.lineJoin='round'; ctx.lineCap='round';
  if(ic==='heart'){ctx.beginPath(); ctx.moveTo(0,16); ctx.bezierCurveTo(-30,-4,-18,-28,0,-12); ctx.bezierCurveTo(18,-28,30,-4,0,16); ctx.fill();}
  if(ic==='bubble'){rr(ctx,-24,-20,48,34,10); ctx.fill(); ctx.beginPath(); ctx.moveTo(-10,12); ctx.lineTo(-16,26); ctx.lineTo(4,13); ctx.fill();}
  if(ic==='share'){ctx.beginPath(); ctx.moveTo(-20,18); ctx.quadraticCurveTo(-18,-8,14,-8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10,-22); ctx.lineTo(26,-8); ctx.lineTo(10,6); ctx.closePath(); ctx.fill();}
  ctx.restore(); ctx.save(); ctx.globalAlpha=a*ai; ctx.font=`800 42px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText(txt,x+60,y,620); ctx.restore();});
 ctx.restore();}

// ---------------- Audio: Stimme + Effekte ----------------
function whooshBuf(ac){const n=Math.floor(ac.sampleRate*0.55), b=ac.createBuffer(1,n,ac.sampleRate), d=b.getChannelData(0); let a=0; for(let i=0;i<n;i++){const c=0.02+0.25*(i/n); a+=c*((Math.random()*2-1)-a); d[i]=a*Math.pow(Math.sin(Math.PI*i/n),2)*2.2;} return b;}
function schedule(ac,dest,t0,from=0){const S=KV.S; const out=ac.createGain(); out.connect(dest);
 // limiter so loud voices never clip
 const lim=ac.createDynamicsCompressor(); lim.threshold.value=-3; lim.knee.value=0; lim.ratio.value=20; lim.attack.value=0.003; lim.release.value=0.1; out.disconnect(); out.connect(lim); lim.connect(dest);
 if(W.voice){const src=ac.createBufferSource(); src.buffer=W.voice; const g=ac.createGain(); g.gain.value=W.voiceGain||1; src.connect(g).connect(out); src.start(t0,from);}
 const wb=whooshBuf(ac); const sfx=ac.createGain(); sfx.gain.value=0.32; sfx.connect(out);
 S.events.forEach(ev=>{const at=t0+ev.t-from-(ev.kind==='whoosh'?0.25:0); if(ev.t<from||at<t0) return;
  if(ev.kind==='whoosh'){const s=ac.createBufferSource(); s.buffer=wb; s.connect(sfx); s.start(at);}
  if(ev.kind==='pop'){const o=ac.createOscillator(); o.type='sine'; o.frequency.setValueAtTime(1280,at); o.frequency.exponentialRampToValueAtTime(380,at+0.09); const g=ac.createGain(); g.gain.setValueAtTime(0.0001,at); g.gain.exponentialRampToValueAtTime(0.5,at+0.004); g.gain.exponentialRampToValueAtTime(0.0001,at+0.09); o.connect(g).connect(sfx); o.start(at); o.stop(at+0.1);}});}
function voiceGain(buf){const d=buf.getChannelData(0); let s=0,c=0; for(let i=0;i<d.length;i+=4){const v=d[i]; if(Math.abs(v)>0.01){s+=v*v;c++;}} const rms=Math.sqrt(s/Math.max(1,c)); return rms>0?Math.min(4,0.13/rms):1;}

// ---------------- Rendering / Vorschau ----------------
let canvas, ctx, playing=false, ac=null, raf=0;
function rebuild(){if(!W.timing) return; buildScenes(); const st=makeStory(); W.story=st; KV.build(st,158,W.timing);
 KV.S.scenes.forEach((s,i)=>{s.pops=st.scenes[i].pops; }); KV.S.events=[]; KV.S.scenes.forEach(s=>{KV.S.events.push({t:s.start,kind:'whoosh'}); (s.pops||[]).forEach(p=>KV.S.events.push({t:s.start+p,kind:'pop'}));});
 KV.S.scenes.forEach(sc=>{sc.cams.forEach(c=>{});});
 renderCards(); updateMeta(); drawAt(firstFrameTime()); renderCover(); renderCaption();}
function firstFrameTime(){const s=KV.S.scenes[0]; return Math.min(s.start+s.dur-0.1,3.2);}
function drawAt(t){KV.draw(ctx,Math.max(0,Math.min(t,KV.S.total-0.01)));}
function updateMeta(){const t=KV.S.total; $('wLen').textContent=fmt(t); const b=$('wBadge'); const ok=t>=60; b.textContent=`${fmt(t)} · ${ok?'über 1 Minute, zählt für Creator Rewards':'unter 1 Minute, zählt nicht für Creator Rewards'}${W.timing.estimated?' · ohne Stimme geschätzt':''}`; b.classList.toggle('ok',ok);}
const fmt=s=>`${Math.floor(s/60)}:${String(Math.round(s%60)).padStart(2,'0')}`;
function stop(){playing=false; cancelAnimationFrame(raf); if(ac){try{ac.close();}catch(e){} ac=null;} $('wPlay').textContent='Vorschau abspielen';}
function play(from=0,to=null){if(playing){stop(); return;} if(!KV.S) return; playing=true; $('wPlay').textContent='Stopp';
 const A=window.AudioContext||window.webkitAudioContext; ac=new A(); const t0=ac.currentTime+0.12; schedule(ac,ac.destination,t0,from); const end=to??KV.S.total;
 const step=()=>{if(!playing) return; const t=from+(ac.currentTime-t0); drawAt(Math.max(from,t)); if(t<end) raf=requestAnimationFrame(step); else stop();}; raf=requestAnimationFrame(step);}

// ---------------- Szenen-Karten ----------------
const FX=[['auto','Automatisch'],['karte','Nur Kamerafahrt'],['vergleich','Größenvergleich'],['route','Route / Entfernung']];
function renderCards(){const box=$('wScenes'); box.innerHTML='';
 W.scenes.forEach((sc,i)=>{const S=KV.S.scenes[i]; const el=document.createElement('div'); el.className='scene';
  const det=[]; const an=sc.an; an.ents.forEach(e=>det.push(e.kind==='country'?nameOfId(e.id):(e.kind==='city'||e.kind==='place')?`📍 ${e.kind==='place'?e.text:e.name}`:e.kind==='sea'?`🌊 ${e.name}`:`🗺 ${e.text}`)); an.nums.forEach(n=>det.push(`# ${n.label}`)); an.routes.forEach(r=>det.push(`↔ ${r.a.text} – ${r.b.text}`)); an.comps.forEach(c=>det.push(`⇄ ${nameOfId(c.small)} in ${nameOfId(c.big)}`));
  el.innerHTML=`<div class="scene-top"><strong>SZENE ${i+1}${sc.outro?' · OUTRO':''}</strong><span class="dur">${fmt(S.start)} · ${S.dur.toFixed(1).replace('.',',')} s</span>
   <button class="mini" type="button" data-a="view">Ansehen</button></div>
   <p class="hint" style="margin:0">${escapeHtml(sc.text)}</p>
   ${sc.outro?'<p class="info">Outro-Karte: Like · Kommentar · Teilen, eingeblendet auf deine Worte.</p>':`
   <p class="info">Erkannt: ${det.length?escapeHtml(det.join(' · ')):'nichts – die Kamera zoomt langsam weiter'}</p>
   <div class="two"><label>Überschrift<input data-f="head" type="text" placeholder="keine"></label>
   <label>Länder markieren<input data-f="countries" type="text" placeholder="z. B. Chile, Peru"></label>
   <label>Effekt<select data-f="fx">${FX.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select></label></div>`}`;
  const h=el.querySelector('[data-f=head]'); if(h){h.value=sc.head||''; el.querySelector('[data-f=countries]').value=sc.countries; el.querySelector('[data-f=fx]').value=sc.fx;}
  el.addEventListener('change',e=>{const f=e.target.dataset.f; if(!f) return; W.edits[i]={...(W.edits[i]||{}),[f]:e.target.value}; rebuild();});
  el.addEventListener('click',e=>{if(e.target.dataset.a==='view'){stop(); play(S.start,S.start+S.dur); canvas.scrollIntoView({block:'center',behavior:'smooth'});}});
  box.appendChild(el);});}
const escapeHtml=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// ---------------- Cover & Caption ----------------
const coverCanvas=document.createElement('canvas'); coverCanvas.width=1080; coverCanvas.height=1920; let coverBlob=null;
function seriesObj(){return SERIES.find(s=>s.id===W.state.series)||SERIES[0];}
function kicker(){const s=seriesObj(); return s.id==='frei'?'GEO-WISSEN':`${s.name.toUpperCase()} #${W.state.ep}`;}
function coverLines(){const raw=(W.state.cover||'').trim(); if(raw) return raw.split('|').map(s=>s.trim()).filter(Boolean).slice(0,3);
 const t=(W.state.title||'Geo-Wissen').trim(); const ws=t.split(' '); const c2=document.createElement('canvas').getContext('2d'); c2.font=`800 120px ${KV.FD}`; const L=[]; let l='';
 for(const w of ws){const s=l?l+' '+w:w; if(c2.measureText(s).width>860&&l){L.push(l); l=w;} else l=s;} L.push(l); return L.slice(0,3);}
function renderCover(){const c=coverCanvas.getContext('2d'); const S=KV.S; const idx=Math.min(W.state.coverAt||0,S.scenes.length-1); const sc=S.scenes[idx];
 const t=sc.start+Math.min(sc.dur-0.2,Math.max(1.5,(sc.speak||sc.dur)*0.8)); const keep=S.scenes.map(s=>[s.noSubs,s.head,s.top]); S.scenes.forEach(s=>{s.noSubs=true; s.head=''; s.top=[];});
 try{KV.draw(c,t);}finally{S.scenes.forEach((s,i)=>{[s.noSubs,s.head,s.top]=keep[i];});}
 const {C,FD,FM,L}=KV; const g=c.createLinearGradient(0,0,0,860); g.addColorStop(0,'rgba(11,28,42,1)'); g.addColorStop(0.55,'rgba(11,28,42,0.95)'); g.addColorStop(1,'rgba(11,28,42,0)'); c.fillStyle=g; c.fillRect(0,0,1080,860);
 c.textAlign='left'; c.font=`700 30px ${FM}`; c.fillStyle=C.ok; c.fillText(kicker(),L,400);
 const ls=coverLines(); ls.forEach((l,i)=>{c.font=`800 120px ${FD}`; c.fillStyle=i===ls.length-1?C.target:C.ink; c.fillText(l,L,525+i*126,860);});
 c.font=`800 44px ${FD}`; c.fillStyle=C.ink; c.fillText('geofy',L,1500); const bw=c.measureText('geofy').width; c.fillStyle=C.target; c.fillText('.',L+bw+2,1500);
 const du=coverCanvas.toDataURL('image/png'); $('wCoverImg').src=du; coverBlob=G.dataURLtoBlob(du);}
const tagify=s=>'#'+s.toLowerCase().replace(/[^a-z0-9äöüß]/g,'');
function renderCaption(){const s=seriesObj(); const first=(W.state.script.trim().split(/(?<=[.?!])\s/)[0]||'').trim();
 const counts=new Map(); W.scenes.forEach(sc=>sc.an.ents.forEach(e=>{const k=e.kind==='country'?nameOfId(e.id):e.kind==='city'?e.name:e.kind==='sea'?e.name:e.text; counts.set(k,(counts.get(k)||0)+1);}));
 const top=[...counts.entries()].sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
 const tags=[top[0]?tagify(top[0]):'#weltkarte', s.tag, '#geografie', top[1]?tagify(top[1]):'#geowissen', '#lernenmittiktok'];
 const uniq=[...new Set(tags)]; while(uniq.length<5) uniq.splice(3,0,['#geowissen','#allgemeinwissen','#weltkarte'].find(x=>!uniq.includes(x)));
 const hook=first.length>140?first.slice(0,137)+'…':first;
 $('wCaption').value=`${hook} 🌍 Wusstest du das schon?\n\n${uniq.slice(0,5).join(' ')}`;}

// ---------------- Export ----------------
let pending=null;
async function exportVideo(){const el=$('wStatus'); stop(); if(!KV.S) return; $('wSave').hidden=true;
 let codecs=null; try{codecs=await G.pickCodecs(true);}catch(e){}
 if(!codecs){G.status(el,'Sauberer Export wird auf diesem Gerät nicht unterstützt (Safari 17+/Chrome nötig).',true); return;}
 $('wExport').disabled=true; G.status(el,'Rendere Video … 0 %');
 try{const blob=await G.renderClean({canvas,draw:t=>drawAt(t),duration:KV.S.total,audio:oac=>schedule(oac,oac.destination,0,0),codecs,onProgress:p=>G.status(el,`Rendere Video … ${Math.round(p*100)} %`)});
  const s=seriesObj(); pending={name:`geofy_${s.id}_${String(W.state.ep).padStart(2,'0')}_${slug(W.state.title||'wissen')}.mp4`,blob};
  G.status(el,`Fertig: ${(blob.size/1e6).toFixed(1)} MB, ${fmt(KV.S.total)}. Jetzt sichern, Cover und Caption liegen unten bereit.`); $('wSave').hidden=false;}
 catch(e){G.status(el,'Export fehlgeschlagen ('+((e&&e.message)||e)+').',true);}
 finally{$('wExport').disabled=false; drawAt(firstFrameTime());}}
const slug=s=>s.toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'').slice(0,40);

// ---------------- Ablauf ----------------
async function analyseAll(){const el=$('wStatus'); const text=W.state.script.trim(); if(!text){G.status(el,'Bitte zuerst ein Skript einfügen.',true); return;}
 W.edits={}; const n=GeoAlign.splitScenes(text).length;
 if(W.voice){G.status(el,'Synchronisiere Stimme und Text …'); await new Promise(r=>setTimeout(r,30)); W.timing=await GeoAlign.align(W.voice,text); W.voiceGain=voiceGain(W.voice);
  G.status(el,`Stimme synchronisiert: ${n} Szenen, ${W.timing.stats.pauses} Pausen erkannt.`);}
 else {W.timing=GeoAlign.estimate(text); G.status(el,`${n} Szenen gebaut. Ohne Stimme ist das Timing geschätzt – lade die MP3 hoch, dann sitzen Untertitel und Animationen genau.`);}
 rebuild(); $('wOut').hidden=false;}
async function loadVoice(file){const el=$('wStatus'); try{G.status(el,'Lade Stimme …'); const ab=await file.arrayBuffer(); const A=window.AudioContext||window.webkitAudioContext; const tmp=new A(); W.voice=await tmp.decodeAudioData(ab); tmp.close&&tmp.close();
  W.voiceName=file.name; $('wVoiceInfo').textContent=`${file.name} · ${W.voice.duration.toFixed(1).replace('.',',')} s`; G.status(el,'Stimme geladen. Jetzt „Video bauen“.');}
 catch(e){G.status(el,'Die Audiodatei konnte nicht gelesen werden ('+(e.message||e)+').',true);}}

async function init(){if(ready) return; ready=true; G=window.GEO; KV=window.KV;
 KV.setWorld(G.world); let places=null; try{places=await (await fetch('data/places.json')).json();}catch(e){} LEX=buildLex(places);
 canvas=$('wcanvas'); ctx=canvas.getContext('2d');
 const ser=$('wSeries'); SERIES.forEach(s=>{const o=document.createElement('option'); o.value=s.id; o.textContent=s.name; ser.appendChild(o);}); ser.value=W.state.series;
 const ex=$('wExample'); EXAMPLES.forEach(([id,,,label])=>{const o=document.createElement('option'); o.value=id; o.textContent=label; ex.appendChild(o);});
 $('wEp').value=W.state.ep; $('wTitle').value=W.state.title; $('wScript').value=W.state.script; $('wCover').value=W.state.cover||'';
 const upd=()=>{W.state.series=ser.value; W.state.ep=Math.max(1,parseInt($('wEp').value)||1); W.state.title=$('wTitle').value; W.state.cover=$('wCover').value; W.state.coverAt=+$('wCoverAt').value||0; persist(); if(KV.S&&W.timing){renderCover(); renderCaption();}};
 ['wSeries','wEp','wTitle','wCover','wCoverAt'].forEach(id=>$(id).addEventListener('input',upd));
 $('wTitle').addEventListener('change',()=>{if(W.timing) rebuild();});
 $('wScript').addEventListener('input',()=>{W.state.script=$('wScript').value; persist(); $('wOut').hidden=true; W.timing=null;});
 ex.addEventListener('change',async()=>{const e=EXAMPLES.find(x=>x[0]===ex.value); if(!e) return; try{const t=await (await fetch(`wissen-videos/${e[0]}_script.txt`)).text(); $('wScript').value=t.trim(); W.state.script=t.trim(); W.state.series=e[1]; W.state.ep=e[2]; W.state.title=e[3]; W.state.cover='';
   ser.value=e[1]; $('wEp').value=e[2]; $('wTitle').value=e[3]; $('wCover').value=''; persist(); W.voice=null; $('wVoiceInfo').textContent='keine Stimme'; $('wOut').hidden=true; G.status($('wStatus'),'Beispiel geladen. MP3 hochladen oder direkt „Video bauen“.');}catch(err){}});
 $('wVoice').addEventListener('change',e=>{const f=e.target.files&&e.target.files[0]; if(f) loadVoice(f);});
 $('wBuild').addEventListener('click',analyseAll); $('wPlay').addEventListener('click',()=>play(0)); $('wExport').addEventListener('click',exportVideo);
 $('wSave').addEventListener('click',()=>{if(pending) G.save(pending.name,pending.blob,$('wStatus'));});
 $('wSaveCover').addEventListener('click',()=>{if(coverBlob){const s=seriesObj(); G.save(`geofy_${s.id}_${String(W.state.ep).padStart(2,'0')}_${slug(W.state.title||'wissen')}_cover.png`,coverBlob,$('wCoverStatus'));}});
 $('wCopyCap').addEventListener('click',async()=>{const ta=$('wCaption'); try{await navigator.clipboard.writeText(ta.value); $('wCopyCap').textContent='Kopiert';}catch(e){ta.select(); $('wCopyCap').textContent='Markiert';} setTimeout(()=>$('wCopyCap').textContent='Kopieren',1600);});
 $('wSaveMd').addEventListener('click',()=>{const s=seriesObj(); const md=`---\ntyp: skript\nerstellt: ${new Date().toISOString().slice(0,10)}\nstatus: aktiv\ntags: [geofy, wissens-content, skript]\nquelle: geofy-studio\n---\n\n# Skript Geofy ${s.name} ${W.state.ep} ${W.state.title}\n\n## Sprechtext (Absätze = Szenen)\n${W.state.script.trim()}\n\n## Caption\n${$('wCaption').value}\n\n## Verwandt\n- [[Geofy]]\n- [[Geofy – Content-Plan Wissensvideos]]\n`;
  G.save(`Skript Geofy ${s.name.replace(/[?…\/]/g,'').trim()} ${W.state.ep} ${W.state.title.replace(/[?\/]/g,'')}.md`,md,$('wStatus'));});
 const A=$('wCoverAt'); A.addEventListener('focus',()=>{if(!KV.S) return; A.innerHTML=KV.S.scenes.map((s,i)=>`<option value="${i}">Szene ${i+1}</option>`).join(''); A.value=String(W.state.coverAt||0);});
 // satellite texture
 const im=new Image(); im.src='wissen-videos/tex/satellite.jpg'; try{await im.decode(); KV.setStyle('satellite',im);}catch(e){KV.setStyle('studio');}
 if(W.state.script.trim()&&!W.timing){} }
window.WISSEN={init,show:()=>{init(); if(KV&&KV.S) drawAt(firstFrameTime());}, _W:W, _rebuild:()=>rebuild(), _analyse:()=>analyseAll(), _loadVoiceBuffer:b=>{W.voice=b;}};
})();
