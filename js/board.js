// Geofy Studio – Content-Pipeline (Board). Liest jobs/ aus dem GitHub-Repo, lädt Stimmen hoch, zeigt fertige Videos.
(() => {
  const OWNER = 'itzkaotikz', REPO = 'geofy-studio', BRANCH = 'main';
  const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
  const $ = id => document.getElementById(id);
  const ST = { 'idee': 'Idee', 'skript': 'Skript', 'wartet-auf-stimme': 'Wartet auf Stimme', 'in-produktion': 'In Produktion', 'fertig': 'Fertig', 'veroeffentlicht': 'Veröffentlicht' };
  let token = ''; try { token = localStorage.getItem('geofy-gh-token') || ''; } catch (e) {}
  let filter = 'offen', data = null, loaded = false, timer = null;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const hdr = () => token ? { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' } : { Accept: 'application/vnd.github+json' };
  const b64dec = s => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\n/g, '')), c => c.charCodeAt(0)));
  const b64enc = str => { const b = new TextEncoder().encode(str); let s = ''; b.forEach(x => s += String.fromCharCode(x)); return btoa(s); };

  async function getFile(path) {
    if (token) {
      const r = await fetch(`${API}/contents/${path}?ref=${BRANCH}&t=${Date.now()}`, { headers: hdr(), cache: 'no-store' });
      if (!r.ok) throw new Error(r.status === 401 ? 'GitHub-Token ungültig oder abgelaufen' : 'GitHub ' + r.status);
      const j = await r.json(); return { text: b64dec(j.content), sha: j.sha };
    }
    const r = await fetch(`https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}?t=${Date.now()}`, { cache: 'no-store' });
    if (!r.ok) throw new Error('Laden fehlgeschlagen (' + r.status + ')'); return { text: await r.text(), sha: null };
  }
  async function putFile(path, b64, message, sha) {
    const r = await fetch(`${API}/contents/${path}`, { method: 'PUT', headers: { ...hdr(), 'Content-Type': 'application/json' }, body: JSON.stringify({ message, content: b64, branch: BRANCH, ...(sha ? { sha } : {}) }) });
    if (!r.ok) { const t = await r.text(); throw new Error(r.status === 401 || r.status === 403 ? 'Kein Schreibrecht: Token prüfen (Contents: Read and write)' : 'Upload fehlgeschlagen (' + r.status + ') ' + t.slice(0, 120)); }
    return r.json();
  }
  async function sha(path) { const r = await fetch(`${API}/contents/${path}?ref=${BRANCH}`, { headers: hdr() }); return r.ok ? (await r.json()).sha : null; }

  function captions(j) {
    const tags = (j.hashtags || []).join(' '), cap = (j.caption || '').trim();
    const out = [['TikTok', `${cap}\n\n${tags}`], ['Instagram Reel', `${cap}\n\n${tags}`], ['YouTube Shorts – Titel', `${(j.youtube_title || j.title || '').slice(0, 95)} #shorts`], ['YouTube Shorts – Beschreibung', `${cap}\n\n${tags} #shorts`]];
    if (j.story) out.push(['Instagram Story (Umfrage)', `${j.story.question || ''}\n${(j.story.options || []).join(' / ')}`]);
    out.push(['Highlight', j.highlight || j.series || 'Geofy']);
    return out;
  }
  const copyBtn = (txt, label = 'Kopieren') => `<button type="button" class="mini" data-copy="${esc(txt)}">${label}</button>`;

  function stats() {
    const js = data.jobs, c = s => js.filter(j => j.status === s).length;
    const wait = c('wartet-auf-stimme');
    $('bStats').innerHTML = [[wait, 'warten auf Stimme', wait < 3 ? 'warn' : ''], [c('in-produktion'), 'in Produktion', ''], [c('fertig'), 'fertig, nicht gepostet', ''], [c('veroeffentlicht'), 'veröffentlicht', '']]
      .map(([n, l, k]) => `<div class="bstat ${k}"><b>${n}</b><span>${l}</span></div>`).join('');
  }
  function list() {
    const js = data.jobs.filter(j => filter === 'alle' ? true : filter === 'fertig' ? ['fertig', 'veroeffentlicht'].includes(j.status) : !['fertig', 'veroeffentlicht'].includes(j.status));
    $('bList').innerHTML = js.length ? js.map(j => `
      <details class="bjob" data-slug="${esc(j.slug)}">
        <summary><div><h3>${esc(j.title)}</h3><div class="meta">${esc(j.series || '')}${j.nr ? ' #' + j.nr : ''} · ${j.words} Wörter${j.duration ? ' · ' + j.duration.toFixed(1) + ' s' : ''}</div></div>
        <span class="bbadge s-${esc(j.status)}">${esc(ST[j.status] || j.status)}</span></summary>
        <div class="bbody"><p class="bhint">Wird geladen …</p></div>
      </details>`).join('') : '<p class="bhint">Hier ist gerade nichts.</p>';
    $('bList').querySelectorAll('.bjob').forEach(d => d.addEventListener('toggle', () => { if (d.open && !d.dataset.done) detail(d); }));
  }
  async function detail(d) {
    const slug = d.dataset.slug, body = d.querySelector('.bbody');
    try {
      const [jf, sf] = await Promise.all([getFile(`jobs/${slug}/job.json`), getFile(`jobs/${slug}/script.txt`)]);
      const j = JSON.parse(jf.text), script = sf.text.trim(); d.dataset.done = 1; d._job = j; d._sha = jf.sha;
      const rel = `https://github.com/${OWNER}/${REPO}/releases/download/video-${slug}/`;
      let h = '';
      if (j.error) h += `<p class="berr">${esc(j.error)}</p>`;
      if (['skript', 'wartet-auf-stimme', 'idee'].includes(j.status) || !j.release) {
        h += `<div class="acts">${copyBtn(script, 'Skript kopieren (für ElevenLabs)')}</div><pre>${esc(script)}</pre>
          <label class="btn" style="align-self:flex-start">MP3 hochladen<input type="file" accept="audio/mpeg,.mp3" hidden data-up></label>
          <p class="bhint" data-upinfo>${token ? 'Nach dem Hochladen startet die Produktion automatisch.' : 'Zum Hochladen unten den GitHub-Schlüssel eintragen.'}</p>`;
      }
      if (j.release) {
        h += `<div class="acts"><a class="btn" href="${rel}${slug}.mp4" download>Video laden</a><a class="btn ghost" href="${rel}cover_${slug}.png" download>Cover laden</a><a class="mini" href="${esc(j.release)}" target="_blank" rel="noopener">Alle Dateien</a></div>`;
        h += captions(j).map(([t, c]) => `<div class="bcap"><h4>${esc(t)}</h4><pre>${esc(c)}</pre><div class="acts">${copyBtn(c)}</div></div>`).join('');
        if (j.status === 'fertig') h += `<div class="acts"><button type="button" class="btn ghost" data-pub>Als veröffentlicht markieren</button></div>`;
      }
      if ((j.check || []).length) h += `<div class="bcap"><h4>Vor dem Posten prüfen</h4><pre>${esc(j.check.map(c => '– ' + c).join('\n'))}</pre></div>`;
      h += `<div class="acts"><button type="button" class="mini" data-prev>Live-Vorschau (ohne Ton)</button></div><div data-prevbox></div>`;
      body.innerHTML = h;
      body.querySelector('[data-up]')?.addEventListener('change', e => upload(d, e.target.files[0]));
      body.querySelector('[data-pub]')?.addEventListener('click', () => setStatus(d, 'veroeffentlicht'));
      body.querySelector('[data-prev]').addEventListener('click', () => { body.querySelector('[data-prevbox]').innerHTML = `<iframe class="bprev" title="Vorschau" src="pipeline/page.html?job=${encodeURIComponent(slug)}&play=1&timing=1"></iframe>`; });
    } catch (e) { body.innerHTML = `<p class="berr">${esc(e.message)}</p>`; }
  }
  async function upload(d, f) {
    const info = d.querySelector('[data-upinfo]');
    if (!f) return; if (!token) { info.textContent = 'Bitte zuerst unten den GitHub-Schlüssel speichern.'; $('bTokenBox').open = true; return; }
    if (f.size > 20e6) { info.textContent = 'Die Datei ist größer als 20 MB.'; return; }
    try {
      info.textContent = 'Lade hoch …';
      const buf = new Uint8Array(await f.arrayBuffer()); let s = ''; for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
      const slug = d.dataset.slug, p = `jobs/${slug}/voice.mp3`;
      await putFile(p, btoa(s), `Stimme: ${slug}`, await sha(p));
      info.textContent = 'Hochgeladen. Die Produktion läuft jetzt, in etwa 15–25 Minuten ist das Video hier.';
      setTimeout(load, 4000);
    } catch (e) { info.textContent = e.message; }
  }
  async function setStatus(d, st) {
    try { const j = d._job; j.status = st; await putFile(`jobs/${d.dataset.slug}/job.json`, b64enc(JSON.stringify(j, null, 1)), `Job ${d.dataset.slug}: ${st}`, d._sha); load(); }
    catch (e) { alertBox(e.message); }
  }
  const alertBox = m => { $('bStatus').textContent = m; };

  async function load() {
    $('bStatus').textContent = 'Lade Pipeline …';
    try {
      data = JSON.parse((await getFile('jobs/index.json')).text);
      $('bUpdated').textContent = 'Stand ' + new Date(data.updated).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' });
      $('bStatus').textContent = ''; stats(); list(); loaded = true;
      clearTimeout(timer); if (data.jobs.some(j => j.status === 'in-produktion')) timer = setTimeout(load, 60000);
    } catch (e) { $('bStatus').textContent = e.message; }
  }

  document.addEventListener('click', async e => {
    const b = e.target.closest('[data-copy]'); if (!b) return;
    const t = b.dataset.copy, old = b.textContent;
    try { await navigator.clipboard.writeText(t); b.textContent = 'Kopiert'; } catch (err) { b.textContent = 'Nicht möglich'; }
    setTimeout(() => b.textContent = old, 1500);
  });
  $('bFilter').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; filter = b.dataset.f; $('bFilter').querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); if (data) list(); });
  const tokInfo = () => { $('bTokenInfo').textContent = token ? 'Schlüssel ist auf diesem Gerät gespeichert.' : 'Noch kein Schlüssel gespeichert. Ansehen geht auch ohne.'; };
  $('bTokenSave').addEventListener('click', () => { token = $('bToken').value.trim(); $('bToken').value = ''; try { token ? localStorage.setItem('geofy-gh-token', token) : localStorage.removeItem('geofy-gh-token'); } catch (e) {} tokInfo(); load(); });
  tokInfo();
  window.BOARD = { show: () => { if (!loaded) load(); } };
  if (!$('mode-board').hidden) window.BOARD.show();
})();
