const CACHE_NAME = "caches";
const lista = [
    `/`,
    `script.js`,
    `detalles.js`,
    `index.html`,
    `pelicula.html`,
    `styles/style.css`,
    `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css`,
    `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css`,
    `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js` 
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
                    cacheObject.addAll(lista);
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