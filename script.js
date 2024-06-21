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

let resultados = [];

const requestPeliculas = () => {
    fetch(url + discoverMovie + APIkey)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            resultados = respuesta.results;

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

const localFav = JSON.parse(localStorage.getItem("favoritos")) || [];

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

    let button = crearEtiqueta("button", { class: "bi bi-heart-fill", id: `fav-${pelicula.id}`, onclick: "agregarFavoritos(event)" });

    if (localFav.some(peli => peli.id === pelicula.id)) {
        button.style.color = "red";
    }

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
    if (eventoInstalacion == null) {
        ocultarBtnInstalacion();
    }
}, 200);


const agregarFavoritos = (event) => {

    const idBtn = event.target.id.split('-')[1];
    event.target.style.color = "red";

    const favAgregado = resultados.find(pelicula => pelicula.id == idBtn);

    if (!(localFav.some(peli => peli.id === favAgregado.id))) {
        localFav.push(favAgregado);
    }

    localStorage.setItem("favoritos", JSON.stringify(localFav));

}

const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget
        // Extract info from data-bs-* attributes
        const recipient = button.getAttribute('data-bs-whatever')
        // If necessary, you could initiate an Ajax request here
        // and then do the updating in a callback.

        // Update the modal's content.
        const modalTitle = exampleModal.querySelector('.modal-title')
        const modalBodyInput = exampleModal.querySelector('.modal-body input')

        modalTitle.textContent = `New message to ${recipient}`
        modalBodyInput.value = recipient
    })
}


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsC9nrHxys2DUADzUv0YfP9LAYDuxsxos",
    authDomain: "moviedb-3df96.firebaseapp.com",
    projectId: "moviedb-3df96",
    storageBucket: "moviedb-3df96.appspot.com",
    messagingSenderId: "930719564439",
    appId: "1:930719564439:web:388ef2ecb83cd938bc9fd2",
    measurementId: "G-QRR4S02EM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Funcion que valida los datos ingresados en el form

const loginButton = document.querySelector(".loginbutton");
const inputEmail = document.getElementById("email_log");
const formLogin = document.getElementById("formLogin");

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(inputEmail.value);

    /*
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.show(toastMessage.innerText = `${errorMessage}`);
        });*/

})



