// node cover2.js <page> <out.png> <time> <kicker> <line1|line2|line3(pink)>
const {chromium}=require('/opt/npm-tools/node_modules/playwright'); const fs=require('fs');
(async()=>{const [page,out,t,kicker,lines]=process.argv.slice(2); const b=await chromium.launch(); const p=await b.newPage();
await p.goto('http://localhost:8766/kvwork/'+page+'?style='+(process.env.STYLE||'satellite')+(process.env.TIMING?'&timing='+process.env.TIMING:'')); await p.evaluate(()=>window.ready);
const d=await p.evaluate(([t,kicker,lines])=>{const c=document.getElementById('c'), ctx=c.getContext('2d'); S.scenes.forEach(s=>{s.noSubs=true; s._h=s.head; s.head='';}); KV.draw(ctx,+t);
 const {C,FD,FM,L}=KV; const g=ctx.createLinearGradient(0,0,0,860); g.addColorStop(0,'rgba(11,28,42,1)'); g.addColorStop(0.55,'rgba(11,28,42,0.95)'); g.addColorStop(1,'rgba(11,28,42,0)'); ctx.fillStyle=g; ctx.fillRect(0,0,1080,860);
 ctx.textAlign='left'; ctx.font=`700 30px ${FM}`; ctx.fillStyle=C.ok; ctx.fillText(kicker,L,400);
 const ls=lines.split('|'); ls.forEach((l,i)=>{ctx.font=`800 120px ${FD}`; ctx.fillStyle=i===ls.length-1?C.target:C.ink; ctx.fillText(l,L,525+i*126,860);});
 ctx.font=`800 44px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText('geofy',L,1500); const bw=ctx.measureText('geofy').width; ctx.fillStyle=C.target; ctx.fillText('.',L+bw+2,1500);
 return c.toDataURL('image/png');},[t,kicker,lines]);
fs.writeFileSync(out,Buffer.from(d.split(',')[1],'base64')); await b.close();})();
