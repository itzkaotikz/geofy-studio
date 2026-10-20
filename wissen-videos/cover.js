const {chromium}=require('/opt/npm-tools/node_modules/playwright'); const fs=require('fs');
(async()=>{const b=await chromium.launch(); const p=await b.newPage(); await p.goto('http://localhost:8766/kvwork/chile.html'); await p.evaluate(()=>window.ready);
const d=await p.evaluate(()=>{const c=document.getElementById('c'), ctx=c.getContext('2d'); const sc=S.scenes[0]; sc.noSubs=true; const h=sc.head; sc.head=''; KV.draw(ctx,5.2); sc.head=h;
 const {C,FD,FM,L}=KV; const g=ctx.createLinearGradient(0,0,0,820); g.addColorStop(0,'rgba(11,28,42,1)'); g.addColorStop(0.5,'rgba(11,28,42,1)'); g.addColorStop(0.8,'rgba(11,28,42,0.9)'); g.addColorStop(1,'rgba(11,28,42,0)'); ctx.fillStyle=g; ctx.fillRect(0,0,1080,820);
 ctx.textAlign='left'; ctx.font=`700 30px ${FM}`; ctx.fillStyle=C.ok; ctx.fillText('GEO-WISSEN',L,400);
 ctx.font=`800 128px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText('Warum ist',L,525); ctx.fillText('Chile so',L,655); ctx.fillStyle=C.target; ctx.fillText('lang?',L,785);
 ctx.font=`800 44px ${FD}`; ctx.fillStyle=C.ink; ctx.fillText('geofy',L,1500); const bw=ctx.measureText('geofy').width; ctx.fillStyle=C.target; ctx.fillText('.',L+bw+2,1500);
 return c.toDataURL('image/png');});
fs.writeFileSync(process.argv[2],Buffer.from(d.split(',')[1],'base64')); await b.close();})();
