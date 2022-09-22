import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TableAlumno = ({alumno}) => {

    
    const navigate = useNavigate();

    const eliminarRegistro = () =>{
        console.log("Eliminar registro");
    }

    return ( 
        <tr >
            <td >{alumno.matricula}</td>
            <td >{alumno.nombre}</td>
            <td >{alumno.apellidos}</td>
            <td> {alumno.telefono}</td>
            <td> {alumno.email}</td>
            <td> {alumno.grupo}</td>
            <td >
                <button className='btn btn-primary' name="editar"
                    onClick={() => navigate(`/alumnos/modificacionalumnos/${alumno.matricula}`)}
                >
                    <FontAwesomeIcon icon={faEdit} className='mr-2' />
                    Editar
                </button>
                <button className='btn btn-danger' name="eliminar"
                    onClick={eliminarRegistro}
                >
                    <FontAwesomeIcon icon={faMinusCircle} className='mr-2' />
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default TableAlumno;
