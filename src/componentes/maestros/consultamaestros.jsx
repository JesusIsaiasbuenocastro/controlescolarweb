import { useEffect, useState } from "react";
import axios from 'axios';
import Mensaje from "../mensajes/mensaje";
import TableMaestros from "../tables/tablemaestros";


const ConsultaMaestros = () => {
    const [consultaMaestros, setConsultaMaestros] = useState([]);
    const [maestros, setMaestros] = useState([]);

    useEffect(() => {
        
        //Se pudiera poner un spinner
        setTimeout(() => {

            const consultarMaestros = async () => {
                try {
                            
                    // const response = await axios.get('http://controlescolarbackend.herokuapp.com/api/maestros');
                    const response = await axios.get('http://localhost:8080/api/maestros');
                     console.log(response.data.listaMaestros);
                     if(response.data.response.codRetorno === '0'){
                        setConsultaMaestros(response.data.listaMaestros)
                         setMaestros(false);
                     }else{
                         //mostrar mensaje que no hay información 
                         setMaestros(true);
                     }
         
                 } catch (error) {
                     console.log(error)
                 }
            }
            
            consultarMaestros();
                
        }, 2000);

        
    },[]);

    return ( 
        <>
        <div className="margin-consulta">
        <div className="table-margin">
        
        {
            !maestros ?
                    <table className="container table table-borderless table-hover ">
                                    
                    <thead height="10" >
                        <tr>
                            <th width="20" >Id</th>
                            <th width="100" >Nombre</th>
                            <th width="20" >Apellidos</th>
                            <th width="20" >Telefono</th>
                            <th width="20" >Email</th>
                            <th width="20">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            consultaMaestros.map( maestro => (
                                <TableMaestros
                                    key={maestro.id}
                                    maestro={maestro}
                                />
                            ))
                        }
                    </tbody>
                </table>
                
                :
                <Mensaje
                    mensaje={"No hay información para mostrar"}
                />

        }
      
    
        </div>
        </div>
    </>
     );
}
 
export default ConsultaMaestros;