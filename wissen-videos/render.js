// usage: node render.js <page> <out.mp4> [fps] [preview-times]
const {chromium}=require('/opt/npm-tools/node_modules/playwright'); const fs=require('fs'); const {spawn}=require('child_process');
(async()=>{const [page,out,fpsArg,previews]=process.argv.slice(2); const fps=+fpsArg||30;
const b=await chromium.launch(); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8766/kvwork/'+page); const info=await p.evaluate(()=>window.ready); if(errs.length) console.log(errs.join('\n'));
fs.writeFileSync(out.replace(/\.mp4$/,'.json'),JSON.stringify(info,null,1)); console.log('total',info.total.toFixed(2));
if(previews){for(const t of previews.split(',')){const d=await p.evaluate(t=>frame(+t,0.9),t); fs.writeFileSync(out.replace(/\.mp4$/,`_t${t}.jpg`),Buffer.from(d.split(',')[1],'base64'));} await b.close(); console.log(errs.join('\n')||'ok'); return;}
const n=Math.ceil(info.total*fps);
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-r',String(fps),'-movflags','+faststart',out.replace(/\.mp4$/,'_silent.mp4')],{stdio:['pipe','inherit','inherit']});
for(let f=0;f<n;f++){const d=await p.evaluate(t=>frame(t),f/fps); if(!ff.stdin.write(Buffer.from(d.split(',')[1],'base64'))) await new Promise(r=>ff.stdin.once('drain',r)); if(f%300===0) console.log('frame',f,'/',n);}
ff.stdin.end(); await new Promise(r=>ff.on('close',r)); await b.close(); console.log(errs.join('\n')||'rendered');})();
