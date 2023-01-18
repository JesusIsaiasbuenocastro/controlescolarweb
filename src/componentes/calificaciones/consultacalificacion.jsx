import CalificacionesTable from "../tables/tablecalificaciones";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from "react";
import axios from 'axios';
import Mensaje from "../mensajes/mensaje";

const ConsultaCalificacion = () => {
    const[calificaciones, setCalificaciones ] =  useState([]);
    const[calificacion, setCalificacion ] = useState(false);
    const[mensaje, setMensaje ] = useState('');
    
    const URLApi  = process.env.REACT_APP_CONTROL_ESCOLAR_API_URL;

    useEffect(() => {
        const consultaCalificaciones= async () => {
            try {
                console.log('Entro a consultar las calificaciones')
                const response = await axios.get(`${URLApi}/calificaciones/obtenertodos` );
                if(response.data.response.codRetorno === '0'){
                    setCalificaciones(response.data.listaCalificaciones
                        )
                    setCalificacion(true);
                }else{
                    setCalificacion(false);
                    setMensaje('No hay información para mostrar');
                }
                console.log(response);

            } catch (error) {
                console.log(error)
            }
        }
        consultaCalificaciones();

        
    },[]);

    const agregarRegistro = ()=>{
        console.log('Agregar registros');
    }

    return ( 
          
        <>
         <div className="registro-form-right">
        <div className="p-4">
           
        <button className='btn btn-primary' name="agregar"
                onClick={agregarRegistro}
            >
                <FontAwesomeIcon icon={faCirclePlus} className='mr-2' />
                Agregar
            </button>
        </div>
        </div>
        <div className="table-margin">
        {
            calificaciones ?
                    <table className="container table table-borderless table-hover ">
                                    
                    <thead height="10" >
                        <tr>
                            <th width="20" >Matricula</th>
                            <th width="100" >Materia</th>
                            <th width="20" >Calificacion</th>
                            <th width="20">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            calificaciones.map( (calificacion) => (
                                <CalificacionesTable 
                                    key={calificacion.matricula}
                                    calificacion={calificacion}
                                />
                            ))
                        }
                    </tbody>
                </table>
                
                :
                <Mensaje
                    mensaje={mensaje}
                />

        }
      
    
        </div>
        </>
     );
}
 
export default ConsultaCalificacion;