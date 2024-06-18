const toastContent = document.querySelector(".toast");
const toast = new bootstrap.Toast(toastContent);
const toastMessage = document.querySelector(".toast-body");

// Registro del SW

window.addEventListener(`DOMContentLoaded`, function () {
    if (`serviceWorker` in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then((reg) => {
                toast.show(toastMessage.innerText = "Modo offline activado");
            })
            .catch((err) => {

                toast.show(toastMessage.innerText = "Modo offline no disponible");
            });
    }

});



// Funcion que optimiza la creación de elementos DOM
const crearEtiqueta = (nombre = null, atributos = {}, contenido = "") => {

    if (!nombre) {
        return;
    }

    let etiqueta = document.createElement(nombre);

    for (const atributo in atributos) {
        etiqueta.setAttribute(atributo, atributos[atributo]);
    }

    if (contenido) {
        etiqueta.innerText = contenido;
    }

    return etiqueta;
};

const url = "https://api.themoviedb.org/3/";
const discoverMovie = "discover/movie";
const urlDetalles = "https://api.themoviedb.org/3/movie/"
const imgUrl = "https://image.tmdb.org/t/p/original/"
const APIkey = "?api_key=d973d2935b855eebb89abf06fd502657";

//FETCH

const requestPeliculas = () => {
    fetch(url + discoverMovie + APIkey)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            const resultados = respuesta.results;

            resultados.forEach(element => {

                // Llamo la funcion mostrar peliculas que renderiza un resumen de cada peli
                mostrarPeliculas(element);

                // Guardo ID
                const id = element["id"];

                // Hago otro fetch para traer detalles de peliculas por ID
                fetch(urlDetalles + id + APIkey)
                    .then(respuestaDetalles => respuestaDetalles.json())
                    .then(respuestaDetalles => {
                        const resultadosDetalles = respuestaDetalles;
                    });
            });
            busqueda(resultados);
        });
}

requestPeliculas();



// Funcion que imprime cards con peliculas
function mostrarPeliculas(pelicula) {
    let mostrarPeliculas = document.getElementById("mostrar");

    // Traigo datos desde la API
    let posterUrl = pelicula["poster_path"];
    let poster = imgUrl + posterUrl;
    let nombre = pelicula["title"];
    let fecha = pelicula["release_date"].slice(0, 4);
    let puntaje = pelicula["vote_average"].toLocaleString('es');

    let divPelis = crearEtiqueta("div", { class: "peli col-6 col-md-4 col-lg-2" });

    let divZoom = crearEtiqueta("div", { class: "zoom" });

    let button = crearEtiqueta("button", { class: "bi bi-heart-fill" });

    let img = crearEtiqueta("img", { src: poster, alt: `Poster de ${nombre}` });

    // Agregar event listener para redirigir a pelicula.html con el ID de la película
    img.addEventListener("click", () => {
        window.location.href = `pelicula.html?id=${pelicula.id}`;
    });

    let divContainer = crearEtiqueta("div", { class: "container" });

    let divDatos = crearEtiqueta("div", { class: "contenedor-datos-pelis row" });

    let h3 = crearEtiqueta("h3", { class: "col-8" }, `${nombre}`);

    let p1 = crearEtiqueta("p", { class: "col-4" }, `${fecha}`);

    let p2 = crearEtiqueta("p", { class: "col-12" }, `Puntaje: ${puntaje}`);

    divDatos.append(h3, p1, p2);
    divContainer.append(divDatos);
    divZoom.append(button, img);
    divPelis.append(divZoom, divContainer);
    mostrarPeliculas.append(divPelis);
}

// Función buscador
const busqueda = (datos = []) => {
    const buscarInput = document.getElementById("busqueda");
    const btnBuscar = document.getElementById("button-addon2");


    const buscar = () => {
        const peliBuscada = buscarInput.value.toLowerCase();

        datos.forEach(pelicula => {
            if (pelicula["title"].toLowerCase() == peliBuscada) {
                window.location.href = `pelicula.html?id=${pelicula.id}`;
            } else {
                toast.show(toastMessage.innerText = "Película no encontrada");
            }
        });
    }
    buscarInput.addEventListener("search", buscar);
    btnBuscar.addEventListener("click", buscar);
}


let eventoInstalacion;

// Activación del botón instalar
window.addEventListener("beforeinstallprompt", (e) => {
    console.log("beforeinstallprompt", e)
    eventoInstalacion = e;
});

// Traigo botón con DOM e instalo
    const btnInstalacion = document.querySelector(".btn-flotante");

    btnInstalacion.addEventListener("click", () => {
        console.log("click en instalar");
        if (eventoInstalacion && eventoInstalacion.prompt) {
            eventoInstalacion.prompt()
                .then((resultado) => {
                    const opcionElegida = resultado.outcome;
                    if (opcionElegida == "dismissed") {
                        toast.show(toastMessage.innerText = "Instalación Cancelada");
                    } else if (opcionElegida == "accepted") {
                        toast.show(toastMessage.innerText = "Instalación Completa");
                        ocultarBtnInstalacion(btnInstalacion);
                    }
                })
                .catch((error) => console.log("Hubo un error al instalar"))
        }
    });



// Oculto botón si ya se instaló

const ocultarBtnInstalacion = (btn) => {
    btn.style.display = "none";  
}

setTimeout(() => {
    if(eventoInstalacion == null){
        ocultarBtnInstalacion();
         }
}, 200);

    
 