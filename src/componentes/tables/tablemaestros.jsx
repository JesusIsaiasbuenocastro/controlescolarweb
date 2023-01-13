import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const TableMaestros = ({maestro}) => {
    const navigate = useNavigate();
    const URLApi  = process.env.REACT_APP_CONTROL_ESCOLAR_API_URL;
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
            const url = `${URLApi}/maestros/${maestro.id}`;       
            
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