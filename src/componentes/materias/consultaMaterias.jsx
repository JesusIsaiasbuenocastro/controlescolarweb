import { useState,useEffect } from "react";
import axios from 'axios';
import TableMaterias from "../tables/tablematerias";
import Mensaje from "../mensajes/mensaje";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
const ConsultaMaterias = () => {
    
    const[consMaterias, setConsultaMaterias ] =  useState([]);
    const[materias, setMaterias ] = useState(false);
    const[mensaje, setMensaje ] = useState('');

    const URLApi  = process.env.REACT_APP_CONTROL_ESCOLAR_API_URL;

    useEffect(() => {
        const consultarMaterias= async () => {
            try {
                                
                const response = await axios.get(`${URLApi}/materias` );
                if(response.data.response.codRetorno === '0'){
                    setConsultaMaterias(response.data.listaMaterias)
                    setMaterias(true);
                }else{
                    setMaterias(false);
                    setMensaje('No hay información para mostrar');
                }

            } catch (error) {
                console.log(error)
            }
        }
        consultarMaterias();

        
    },[]);
    
    const agregarRegistro = () =>{
        console.log('agregar registro')
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
            materias ?
                    <table className="container table table-borderless table-hover ">
                                    
                    <thead height="10" >
                        <tr>
                            <th width="20" >Nombre</th>
                            <th width="100" >Maestro</th>
                            <th width="20" >Limite</th>
                            <th width="20">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            consMaterias.map( (materia) => (
                                <TableMaterias 
                                    key={materia.id}
                                    materia={materia}
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
 
export default ConsultaMaterias;