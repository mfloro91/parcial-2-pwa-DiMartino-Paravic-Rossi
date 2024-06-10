const CACHE_NAME = "caches";
const LISTA = [
    '/',
    '/script.js',
    '/detalles.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    '/styles/style.css',
    `index.html`,
    `pelicula.html`
]

// Eventos del S.W.

// Instalación y precaching

self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    // Evita el período de espera del navegador    
    self.skipWaiting();

    event.waitUntil(
        caches.has(CACHE_NAME).then(estaInstalado => {
            if(!estaInstalado){
                return caches.open(CACHE_NAME).then(function (cacheObject){
                    cacheObject.addAll(LISTA);
                })
            }
        })
    );
})

// Activación

self.addEventListener('activate', () => {
    console.log('SW: Activado');
})

// Estrategia de caché only

self.addEventListener('fetch', (event) => {
    const consulta = event.request;
    const consultaCache = caches.match(consulta).then( async (respuesta)=>{
        if(respuesta) return respuesta;
        const nuevaRespuesta = await fetch(consulta)
        const cache = await caches.open(CACHE_NAME)
        await cache.put (consulta, nuevaRespuesta.clone())
        return nuevaRespuesta;
    })    
event.respondWith(consultaCache);
})