// Geofy Pipeline renderer.
// usage: node pipeline/render.js <slug> preview <t1,t2,...>   -> out/<slug>/preview_t<t>.jpg
//        node pipeline/render.js <slug> video [fps]           -> out/<slug>/silent.mp4 + meta.json
//        node pipeline/render.js <slug> cover                 -> out/<slug>/cover.png (Angaben aus job.json "cover")
// Erwartet einen lokalen Server auf PORT (Standard 8766), der das Repo-Hauptverzeichnis ausliefert.
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/npm-tools/node_modules/playwright'); }
const fs = require('fs'), path = require('path'), { spawn } = require('child_process');
const [slug, cmd = 'video', arg] = process.argv.slice(2);
if (!slug) { console.error('usage: node pipeline/render.js <slug> preview|video|cover [arg]'); process.exit(2); }
const PORT = process.env.PORT || 8766;
const OUT = path.join(__dirname, '..', 'out', slug); fs.mkdirSync(OUT, { recursive: true });
const hasTiming = fs.existsSync(path.join(__dirname, '..', 'jobs', slug, 'timing.json'));
const url = `http://localhost:${PORT}/pipeline/page.html?job=${encodeURIComponent(slug)}&style=${process.env.STYLE || 'satellite'}${hasTiming ? '&timing=1' : ''}`;

(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(url); const info = await p.evaluate(() => window.ready);
  if (errs.length) console.log(errs.join('\n'));
  fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(info, null, 1));
  console.log('total', info.total.toFixed(2), hasTiming ? '(mit Stimme)' : '(ohne Stimme, geschätzt)');

  if (cmd === 'preview') {
    const times = (arg || '').split(',').filter(Boolean).length ? arg.split(',') : info.scenes.map(s => (s.start + Math.min(s.dur * 0.6, 4)).toFixed(1));
    for (const t of times) { const d = await p.evaluate(t => frame(+t, 0.85), t); fs.writeFileSync(path.join(OUT, `preview_t${t}.jpg`), Buffer.from(d.split(',')[1], 'base64')); }
    console.log('preview', times.join(','));
  } else if (cmd === 'cover') {
    const job = await p.evaluate(() => window.JOB); const cv = job.cover || {};
    const d = await p.evaluate(([t, kicker, lines]) => {
      const c = document.getElementById('c'), ctx = c.getContext('2d');
      S.scenes.forEach(s => { s.noSubs = true; s.head = ''; }); window.NO_COUNTER = 1; window.NO_CHIPS = 1; KV.draw(ctx, +t);
      const { C, FD, FM, L } = KV; const g = ctx.createLinearGradient(0, 0, 0, 860);
      g.addColorStop(0, 'rgba(11,28,42,1)'); g.addColorStop(0.55, 'rgba(11,28,42,0.95)'); g.addColorStop(1, 'rgba(11,28,42,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 860);
      ctx.textAlign = 'left'; ctx.font = `700 30px ${FM}`; ctx.fillStyle = C.ok; ctx.fillText(kicker, L, 400);
      const ls = lines.split('|'); ls.forEach((l, i) => { ctx.font = `800 120px ${FD}`; ctx.fillStyle = i === ls.length - 1 ? C.target : C.ink; ctx.fillText(l, L, 525 + i * 126, 860); });
      ctx.font = `800 44px ${FD}`; ctx.fillStyle = C.ink; ctx.fillText('geofy', L, 1500); const bw = ctx.measureText('geofy').width; ctx.fillStyle = C.target; ctx.fillText('.', L + bw + 2, 1500);
      return c.toDataURL('image/png');
    }, [cv.time ?? 4, cv.kicker || 'GEOFY', cv.lines || job.title || slug]);
    fs.writeFileSync(path.join(OUT, 'cover.png'), Buffer.from(d.split(',')[1], 'base64')); console.log('cover ok');
  } else {
    const fps = +arg || 30; const n = Math.ceil(info.total * fps);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(fps), '-movflags', '+faststart', path.join(OUT, 'silent.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = 0; f < n; f++) {
      const d = await p.evaluate(t => frame(t), f / fps);
      if (!ff.stdin.write(Buffer.from(d.split(',')[1], 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
      if (f % 300 === 0) console.log('frame', f, '/', n);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('rendered', n, 'frames');
  }
  await b.close();
  if (errs.length) { console.error('Fehler auf der Seite:\n' + errs.join('\n')); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
