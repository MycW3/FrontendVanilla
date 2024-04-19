import { API_URL } from "./App.js";
import getElemento from "./lib/getElemento.js";
import PeliculaCard from "./PeliculaCard.js";

const Detalles = () => {
    let id;
    //obtiene las partes del URL
    const { search } = document.location;
    //obtiene los parametros
    const urlParams = new URLSearchParams(search);
    //Obtiene el parametro si hay
    urlParams.has('id') ? id = urlParams.get('id') || null : id = null;

    //Busca la pelicula
    const buscarPeliculas = async (id) => {
        let data = null;
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok)
        data = await response.json();

        //Aqui dibujara las peliculas encontradas
        const resultados = await getElemento('.resultados');
        resultados.innerHTML = dibujaPeliculas(data);
    }

    //Dibuja una pelicula
    const dibujaPeliculas = (pelicula) =>{
        return `
            ${(pelicula != null) 
                ? `
                    <div class="container">
                        ${PeliculaCard(pelicula)}
                        <div class="movie-desc">${pelicula.sinopsis}</div>
                    </div>
                ` :
                `
                    <div class="empty">
                        <h2>No hay peliculas encontradas</h2>
                    </div>
                `
            }
        `;
    }

    //Busca la pelicula al cargar la pagina
    buscarPeliculas(id);

    return `
        <div class="resultados"></div>
    `;
}

export default Detalles;