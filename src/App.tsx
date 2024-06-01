import { BrowserRouter as Router } from "react-router-dom";
import { Ruteo } from "./app/utilidades/rutas/Ruteo"; // Ajusta la ruta según tu estructura de proyecto
import { Cabecera } from "./app/componentes/contenedor/Cabecera"; // Ajusta la ruta según tu estructura de proyecto

function App() {
  return (
    <Router>
      <Cabecera />
      <Ruteo />
    </Router>
  );
}

export default App;
