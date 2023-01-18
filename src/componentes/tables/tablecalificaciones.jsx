
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CalificacionesTable = ({calificacion}) => {
    
    
    
    const eliminarRegistro = () => {
        console.log('Eliminar registro');
    }
    return ( 
        <tr >
        <td >{calificacion.matricula}</td>
        <td >{calificacion.materia}</td>
        <td >{calificacion.calificacion}</td>
        <td >
            <button className='btn btn-primary' name="editar"
                
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
 
export default CalificacionesTable;