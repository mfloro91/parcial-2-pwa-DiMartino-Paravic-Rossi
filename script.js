"use strict"

const url = "https://api.themoviedb.org/3/";
const discoverMovie = "discover/movie";
const imgUrl = "https://image.tmdb.org/t/p/original/"
const APIkey = "?api_key=d973d2935b855eebb89abf06fd502657";

//FETCH

const requestPeliculas = () => {
    fetch(url + discoverMovie + APIkey)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            const resultados = respuesta.results;

            resultados.forEach(element => {
                console.log(resultados);

                // Llamo la funcion mostrar peliculas que renderiza un resumen de cada peli
                mostrarPeliculas(element);
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
    // let director = pelicula[""];

    let divPelis = document.createElement("div");
    divPelis.setAttribute("class", "peli col-2");

    let divZoom = document.createElement("div");
    divZoom.setAttribute("class", "zoom");

    let button = document.createElement("button");
    button.setAttribute("class", "bi bi-heart-fill");

    let img = document.createElement("img");
    img.setAttribute('src', `${poster}`);
    img.setAttribute('alt', `Poster de ${nombre}`);

    let divContainer = document.createElement("div");
    divContainer.setAttribute("class", "container");

    let divDatos = document.createElement("div");
    divDatos.setAttribute("class", "contenedor-datos-pelis row");

    let h3 = document.createElement("h3");
    h3.setAttribute("class", "col-8");
    h3.innerText = `${nombre}`;

    let p1 = document.createElement("p");
    p1.setAttribute("class", "col-4");
    p1.innerText = `${fecha}`;

    let p2 = document.createElement("p");
    p2.setAttribute("class", "col-12");
    p2.innerText = `Dirigida por: `;

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