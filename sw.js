const CACHE = 'cucina-v2';
const CSS_FONT = 'https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap';
// il CSS dei caratteri sta qui perché l'offline funzioni già dalla prima visita,
// senza dipendere da quando il service worker prende il controllo della pagina
const FILE = ['./', './index.html', './manifest.json', './icona.svg', './marchio.svg', './logotipo.svg', './icona-180.png', './icona-512.png',
  ...['pasta','carne','zuppe','pesce','etnico','riso','forno','patate','verdure','legumi'].map(n=>'./foto/'+n+'.png'),
  CSS_FONT];
const FONT = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // uno alla volta: le add in parallelo sulla stessa cache si pestano i piedi
    // e falliscono in silenzio. Un file mancante non blocca gli altri.
    for (const f of FILE) {
      try { await c.add(f); } catch (err) {}
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// Una risposta di errore non va mai messa in cache: prenderebbe il posto della
// copia buona. Le risposte opache hanno status 0 e non sono ispezionabili:
// si scartano anche quelle.
const daTenere = r => !!r && r.ok && r.status === 200 && r.type !== 'opaque';

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  const conserva = r => {
    if (!daTenere(r)) return r;
    const copia = r.clone();
    caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {});
    return r;
  };

  // I font stanno su un altro dominio e non cambiano mai: prima la cache,
  // così restano disponibili anche senza rete.
  if (FONT.includes(url.hostname)) {
    e.respondWith(
      caches.match(e.request).then(salvata => salvata || fetch(e.request).then(conserva))
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Per i file dell'app: prima la rete, così un aggiornamento arriva subito;
  // se la rete manca si ripiega sulla copia salvata.
  e.respondWith(
    fetch(e.request)
      .then(conserva)
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
