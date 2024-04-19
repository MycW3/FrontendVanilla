import Layout from "./Layout.js";
import Home from "./Home.js";
import Detalles from "./Detalles.js";
import NotFound from "./NotFound.js";

const API_URL = 'http://localhost:3000/api/peliculas';

// Componente principal
const App = () => {
    let contenido;
    //obtiene las partes de la url
    const {pathname, search} = document.location;
    const componente = pathname.split('.html')[0];
    //obtiene los parametros
    const urlParams = new URLSearchParams(search);

    //Obtenemos la plantilla del sitio
    let layout = Layout();
    //definimos las rutas de la aplicación
    const routes = {
        '/': Home,
        '/index': Home,
        '/detalles:id': Detalles,
    };
    //obtiene el contenido a mostrar
    urlParams.has('id') ? contenido = routes[`${componente}:id`] : contenido = routes[componente];
    //Regresa el contenido a mosyrar al cliente
    return layout.replace('<Outlet />', contenido || NotFound);
};

export default App;
export { API_URL} ;

