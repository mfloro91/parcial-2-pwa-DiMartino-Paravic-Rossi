"use strict"

let peliculas = [
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
]

function mostrarPeliculas() {
    let mostrarPeliculas = document.getElementById("mostrar");
    let contenidoHTML = '';

    for (const peli of peliculas) {
        contenidoHTML += 
        `<div class="peli col-2">
            <div class="zoom">
                <button><i class="bi bi-heart-fill"></i></button>
                <img src="${peli.poster}" alt="Poster de ${peli.nombre}">   
            </div>
            <div class="container">
                <div class="contenedor-datos-pelis row">
                    <h3 class="col-8">${peli.nombre}</h3>
                    <p class="col-4">${peli.fecha}</p>
                    <p class="col-12">Dirigida por: ${peli.director}</p>
                </div>
            </div>
        </div>`;
    }

    mostrarPeliculas.innerHTML = contenidoHTML;
}

mostrarPeliculas();

