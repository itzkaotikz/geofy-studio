import fs from 'fs';
import * as d3 from 'd3-geo';
const src=JSON.parse(fs.readFileSync(process.argv[2]));
const q=c=>typeof c[0]==='number'?[Math.round(c[0]*1000)/1000,Math.round(c[1]*1000)/1000]:c.map(q);
// Douglas-Peucker on lon/lat for a light version used in zoomed-out views
function dp(pts,eps){if(pts.length<=4) return pts; const keep=new Uint8Array(pts.length); const m=pts.length>>1; keep[0]=keep[pts.length-1]=keep[m]=1; const st=[[0,m],[m,pts.length-1]];
 while(st.length){const [a,b]=st.pop(); let md=0,mi=-1; const [x1,y1]=pts[a],[x2,y2]=pts[b]; const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1e-12;
  for(let i=a+1;i<b;i++){const d=Math.abs(dy*pts[i][0]-dx*pts[i][1]+x2*y1-y2*x1)/L; if(d>md){md=d;mi=i;}}
  if(md>eps&&mi>0){keep[mi]=1; st.push([a,mi],[mi,b]);}}
 return pts.filter((_,i)=>keep[i]);}
function simplify(g,eps){const polys=(g.type==='Polygon'?[g.coordinates]:g.coordinates).map(poly=>poly.map(r=>dp(r,eps)).filter(r=>r.length>=4)).filter(poly=>poly.length&&d3.geoArea({type:'Polygon',coordinates:poly})*6371*6371>300);
 if(!polys.length) return null; return polys.length===1?{type:'Polygon',coordinates:polys[0]}:{type:'MultiPolygon',coordinates:polys};}
const out=[];
for(const f of src.features){const p=f.properties;
 let id=p.ISO_A3_EH!=='-99'?p.ISO_A3_EH:p.ADM0_A3;
 let g={type:f.geometry.type,coordinates:q(f.geometry.coordinates)};
 // d3 wants clockwise exterior rings; rewind any polygon that covers more than a hemisphere
 const polys=g.type==='Polygon'?[g.coordinates]:g.coordinates;
 for(const poly of polys){ if(d3.geoArea({type:'Polygon',coordinates:poly})>2*Math.PI) poly.forEach(r=>r.reverse()); }
 const area=d3.geoArea({type:'Feature',geometry:g})*6371*6371;
 const lo=simplify(g,0.06);
 out.push({type:'Feature',id,properties:{de:p.NAME_DE,en:p.NAME_EN,pop:p.POP_EST,cont:p.CONTINENT,sub:p.SUBREGION,type:p.TYPE,area:Math.round(area),lo},geometry:g});}
fs.writeFileSync(process.argv[3],JSON.stringify({type:'FeatureCollection',features:out}));
const big=out.filter(f=>f.properties.area>2.6e8); console.log(out.length,'features; suspicious large:',big.map(f=>f.id).join(','));
