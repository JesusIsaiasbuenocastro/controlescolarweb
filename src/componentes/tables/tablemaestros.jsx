import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const TableMaestros = ({maestro}) => {
    const navigate = useNavigate();

    const eliminarRegistro = () =>{
        console.log("Eliminar registro");
    }

    return (
        <tr >
        <td >{maestro.id}</td>
        <td >{maestro.nombre}</td>
        <td >{maestro.apellidos}</td>
        <td> {maestro.telefono}</td>
        <td> {maestro.email}</td>
        <td >
            <button className='btn btn-primary' name="editar"
                onClick={() => navigate(`/maestros/modificacionmaestros/${maestro.id}`)}
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
 
export default TableMaestros;