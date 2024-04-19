import{ API_URL} from "./App.js";
import getElemento from "./lib/getElemento.js";
import PeliculaCard from "./PeliculaCard.js";

const Home = () => {
    //Busca las peliculas
    const buscarPeliculas = async (titulo) =>{
        const response = await fetch(`${API_URL}?s=${titulo}`);
        const data = await response.json();

        //Aqui dibujara las peliculas encontradas
        const resultados = await getElemento('.resultados');
        resultados.innerHTML = dibujaPeliculas(data);
    }


//Dibujar las peliculas
const dibujaPeliculas = (peliculas) => {
    return`
        ${peliculas?.length > 0
        ?`
            <div class="container">
                ${peliculas.map((pelicula)=> PeliculaCard(pelicula)).join('')}
            </div>
        `:
        `
            <div class="empty">
                <h2>No hay peliculas encontradas.</h2>
            </div>
        `
        }
    `;
};

//Busca peliculas al hacer clic en la lupa
const botonBuscar = async () => {
    const buscar = await getElemento('#imgBuscar');
    buscar.addEventListener ('click', (e) => {
        const searchTerm = document.getElementById('txtBuscar').value;
        buscarPeliculas(searchTerm);
    });
}

//busca todas las peliculas al cargar la pagina
buscarPeliculas('');

//preparar la acción clic del boton buscar
botonBuscar();

return `
    <div class="search">
        <input id="txtBuscar" placeholder="Buscar peliculas por título" />
        <img id="imgBuscar" src="search.svg" alt="Buscar" />
    </div>
    <div class="resultados"></div>
`;
};


export default Home;