import Cards from "./cards/cards";

import ImagenCalificacion from '../img/calificaciones.png';
import ImagenEstudiante from '../img/estudiante.png';
import ImagenProfesor from '../img/profesor.png';
const Inicio = () => {
    return ( 
        <div className="cards-format">
            <div className="cards-margin">
                <div className="row">
                    <div className="col format-shadow">
                        <Cards texto="Alumnos" imagen={ImagenEstudiante} descripcion="Consulta y modifica a los alumnos" redirigir="/alumnos/consultaalumnos"></Cards>
                    </div>
                    <div className="col format-shadow">
                        <Cards texto="Cursos" imagen={ImagenProfesor} descripcion="Consulta y modifica los datos de los cursos" redirigir="/maestros/consultamaestros"></Cards>
                    </div>
                    <div className="col format-shadow">
                        <Cards texto="Pagos" imagen={ImagenCalificacion} descripcion="Agrega y consulta pagos de los alumnos" redirigir="/calificaciones/consultacalificacion"></Cards>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Inicio; 