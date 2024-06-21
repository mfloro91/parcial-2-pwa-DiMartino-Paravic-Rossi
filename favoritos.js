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

const pelisLocal = JSON.parse(localStorage.getItem("favoritos")) || []; 
let mostrarPeliculas = document.getElementById("mostrar-fav");

function mostrarPeliculasFav(peliculas) {
    mostrarPeliculas.innerHTML = "";
    const imgUrl = "https://image.tmdb.org/t/p/original/";
    
    peliculas.forEach(pelicula => {
     const poster = imgUrl + pelicula.poster_path;

        let divPelis = crearEtiqueta("div", { class: "peli col-6 col-md-4 col-lg-2" });

        let divZoom = crearEtiqueta("div", { class: "zoom" });

        let button = crearEtiqueta("button", {
            class: "bi bi-heartbreak-fill",
            id: `fav-${pelicula.id}`,
            onclick: "agregarFavoritos(event)"
        });

        button.addEventListener("click", (event) => {
            const index = pelisLocal.findIndex(peli => peli.id === pelicula.id);
            if (index !== -1){
                pelisLocal.splice(index,1);
                mostrarPeliculas.innerHTML = "";
                mostrarPeliculasFav(pelisLocal);
                localStorage.setItem("favoritos", JSON.stringify(pelisLocal));
            }
        });

        let img = crearEtiqueta("img", { src: poster, alt: `Poster de ${pelicula.title}` });

      
        img.addEventListener("click", () => {
            window.location.href = `pelicula.html?id=${pelicula.id}`;
        });

        let divContainer = crearEtiqueta("div", { class: "container" });

        let divDatos = crearEtiqueta("div", { class: "contenedor-datos-pelis row" });

        let h3 = crearEtiqueta("h3", { class: "col-8" }, `${pelicula.original_title}`);

        let p1 = crearEtiqueta("p", { class: "col-4" }, `${pelicula.release_date.slice(0, 4)}`);

        let p2 = crearEtiqueta("p", { class: "col-12" }, `Puntaje: ${pelicula.vote_average.toLocaleString('es')}`);

        divDatos.append(h3, p1, p2);
        divContainer.append(divDatos);
        divZoom.append(button, img);
        divPelis.append(divZoom, divContainer);
        mostrarPeliculas.append(divPelis);
    });
} 

 mostrarPeliculasFav(pelisLocal);


