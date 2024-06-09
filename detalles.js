const urlDetalles = "https://api.themoviedb.org/3/movie/";
const imgUrl = "https://image.tmdb.org/t/p/original/";
const APIkey = "?api_key=d973d2935b855eebb89abf06fd502657";


const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (movieId) {
    fetch(urlDetalles + movieId + APIkey)
        .then(respuesta => respuesta.json())
        .then(pelicula => {
            mostrarDetallesPelicula(pelicula);
        })
        .catch(error => console.error('Error:', error));
}

function mostrarDetallesPelicula(pelicula) {
    const detallesDiv = document.getElementById("detallesPelicula");

//---
    const posterUrl = pelicula["poster_path"];
    const poster = imgUrl + posterUrl;
    const nombre = pelicula["title"];
    const fecha = pelicula["release_date"];
    const puntaje = pelicula["vote_average"].toLocaleString('es');
    const descripcion = pelicula["overview"];

    const img = document.createElement("img");
    img.src = poster;
    img.alt = `Poster de ${nombre}`;
    img.className = "img-fluid";

    const h3 = document.createElement("h3");
    h3.textContent = nombre;

    const pFecha = document.createElement("p");
    pFecha.textContent = `Fecha de lanzamiento: ${fecha}`;

    const pPuntaje = document.createElement("p");
    pPuntaje.textContent = `Puntaje: ${puntaje}`;

    const pDescripcion = document.createElement("p");
    pDescripcion.textContent = descripcion;

    detallesDiv.append(img, h3, pFecha, pPuntaje, pDescripcion);
}