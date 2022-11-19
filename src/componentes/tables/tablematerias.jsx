import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TableMaterias = ({materia}) => {
    console.log(materia);
    const navigate = useNavigate();
    const eliminarRegistro = () =>{
        console.log("Eliminar registro");
    }
    return ( 

        <tr >
        <td >{materia.nombre}</td>
        <td >{materia.idMaestro}</td>
        <td >{materia.limite}</td>  
        <td >
            <button className='btn btn-primary' name="editar"
                onClick={() => navigate(`/materias/modificacionmaterias/${materia.id}`)}
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
 
export default TableMaterias;