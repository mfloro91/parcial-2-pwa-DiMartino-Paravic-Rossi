const CACHE_NAME = 'caches';
const LISTA = [
    '/',
    '/script.js',
    '/detalles.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    '/styles/style.css'
]

self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    event.waitUntil(
        caches.has(CACHE_NAME).then(estaInstalado => {
            if(!estaInstalado){
                return caches.open(CACHE_NAME).then(cache => {
                    return cache.addAll(LISTA);
                })
            }
        })
    );
})

self.addEventListener('activate', () => {
    console.log('SW: Activado');
})

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