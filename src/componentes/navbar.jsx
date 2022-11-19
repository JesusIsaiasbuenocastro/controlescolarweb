import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light " >
    <a className="navbar-brand" href="/">Control Escolar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
          Alumnos
        </a>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/alumnos/altaalumnos">Nuevo</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/alumnos/consultaalumnos">Consultar</Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
          Maestros
        </a>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/maestros/altamaestros">Nuevo</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/maestros/consultamaestros">Consultar</Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
          Calificaciones
        </a>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/calificaciones/altacalificacion">Nuevo</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/calificaciones/consultacalificacion">Consultar</Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
          Catalogos
        </a>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/materias/consultamaterias">Materias</Link>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Grupos</a>
        </div>
      </li>
    </ul>
    
  </div>
</nav> 
     );
}
 
export default NavBar;