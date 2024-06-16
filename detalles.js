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

    const posterUrl = pelicula["poster_path"];
    const poster = imgUrl + posterUrl;
    const nombre = pelicula["title"];
    const fecha = pelicula["release_date"];
    const puntaje = pelicula["vote_average"].toLocaleString('es');
    const descripcion = pelicula["overview"];

    // Crear estructura de la card
    detallesDiv.innerHTML = `
        <div class="card" style="max-width: 720px; margin: auto;">
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${poster}" class="img-fluid rounded-start" alt="Poster de ${nombre}">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text"><strong>Fecha de lanzamiento:</strong> ${fecha}</p>
                        <p class="card-text"><strong>Puntaje:</strong> ${puntaje}</p>
                        <p class="card-text">${descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
