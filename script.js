"use strict"
const crearEtiqueta = (nombre = null, atributos = {}, contenido = "") => {

    if (!nombre){
        return;
    }

    let etiqueta = document.createElement(nombre);

    for (const atributo in atributos) {
        etiqueta.setAttribute(atributo, atributos[atributo]);
    }

    if (contenido){
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
                        console.log(resultadosDetalles);
                    });
            });

        });
}

requestPeliculas();

function mostrarPeliculas(pelicula) {
    let mostrarPeliculas = document.getElementById("mostrar");

    // Traigo datos desde la API
    let posterUrl = pelicula["poster_path"];
    let poster = imgUrl + posterUrl;
    let nombre = pelicula["title"];
    let fecha = pelicula["release_date"].slice(0, 4);
    let puntaje = pelicula["vote_average"].toLocaleString('es');

    let divPelis = crearEtiqueta("div", {class: "peli col-2"});

    let divZoom = crearEtiqueta("div", {class: "zoom"});  

    let button = crearEtiqueta("button", {class: "bi bi-heart-fill"});

    let img = crearEtiqueta("img", {src: poster, alt: `Poster de ${nombre}`});

    let divContainer = crearEtiqueta("div", {class: "container"});

    let divDatos = crearEtiqueta("div", {class: "contenedor-datos-pelis row"});

    let h3 = crearEtiqueta("h3", {class: "col-8"}, `${nombre}`);

    let p1 = crearEtiqueta("p", {class: "col-4"}, `${fecha}`);

    let p2 = crearEtiqueta("p", {class: "col-12"}, `Puntaje: ${puntaje}`);

    divDatos.append(h3, p1, p2);
    divContainer.append(divDatos);
    divZoom.append(button, img);
    divPelis.append(divZoom, divContainer);
    mostrarPeliculas.append(divPelis);

}

/*let peliculas = [
    {
    nombre:"Nace una Estrella",
    fecha: "1937",
    director:"William A. Wellman",
    poster:"img/nace-una-estrella.webp",
},
{
    nombre:"La Soga",
    fecha: "1948",
    director:"Alfred Hitchchock",
    poster:"img/la-soga.webp",
},
{
    nombre: "A la hora señalada",
    fecha: "1952",
    director: "Fred Zinnemann",
    poster: "img/la-hora-senalada.webp"
},
{
    nombre: "2001: odisea del espacio",
    fecha: "1968",
    director: "Stanley Kubrick",
    poster: "img/odisea-del-espacio.webp"
},
{
    nombre: "El Padrino",
    fecha: "1972",
    director: "Francis Ford Coppola",
    poster: "img/el-padrino.webp"
},
{
    nombre: "Volver al Futuro",
    fecha: "1985",
    director: "Robert Zemeckis",
    poster: "img/volver-al-futuro.webp"
},
{
    nombre: "Perfume de Mujer",
    fecha: "1992",
    director: "Martin Brest",
    poster: "img/perfume-de-mujer.webp"
},
{
    nombre: "Shrek",
    fecha: "2001",
    director: "Andrew Adamson",
    poster: "img/shrek.webp"
},
{
    nombre: "Interestelar",
    fecha: "2014",
    director: "Christopher Nolan",
    poster: "img/interestelar.webp"
},
{
    nombre: "The Batman",
    fecha: "2022",
    director: "Matt Reeves",
    poster: "img/the-batman.webp"
}
]*/