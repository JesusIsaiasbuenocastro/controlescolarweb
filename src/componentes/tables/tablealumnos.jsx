import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const TableAlumno = ({alumno}) => {
    const URLApi  = process.env.REACT_APP_CONTROL_ESCOLAR_API_URL;
    
    const navigate = useNavigate();

    const eliminarRegistro = (e) =>{
         e.preventDefault();
       
        //Mandar llamar el mensaje de si esta seguro que se desea eliminar el registro
         
        const MySwal = withReactContent(Swal)

        Swal.fire({
            position: 'center',
            icon: 'question',
            title: '¿Desea eliminar el registro seleccionado?',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar'
            
        
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              //eliminar el registro
              eliminar();
            } 
        })
        console.log("Eliminar registro");
    }
    const eliminar = async () => {
        try {
            
            let request;
            const url = `${URLApi}/alumno/${alumno.matricula}`;       
            
            request = await fetch(url,{
                method:'DELETE'
              
            });
    
            await request.json();

            //mandar mensaje de eliminado exitosamente
             //mandar mensaje de exito    
            const MySwal = withReactContent(Swal)

            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro eliminado exitosamente',
                showConfirmButton: false,
                timer: 1500,
                
            
            }).then(() => {
                //Refrescar la pagina
                window.location.reload(false)
            })     
    
        }catch(error){
            console.log(error);
        }

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
