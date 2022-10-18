import { useEffect, useState } from "react";
import axios from 'axios';
import TableAlumnos from "../tables/tablealumnos";
import Mensaje from "../mensajes/mensaje";
import OpcionesSelect from "../genericos/opcionesselect";

const ConsultaAlumnos = () => {

    const [consultaAlumno, setConsultaAlumno] = useState([]);
    const [consultaGrupo, setConsultaGrupo] = useState([]);
    const [alumnos, setAlumnos] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [checkMatricula, setCheckMatricula] = useState(false);
    const [checkGrupo, setCheckGrupo] = useState(false);

    useEffect(() => {
        const consultarAlumnos = async () => {
            try {
                                
               // const response = await axios.get('https://controlescolarbackend.herokuapp.com/api/alumno/');
               const response = await axios.get('http://localhost:8080/api/alumno/obtenerlista');
                console.log(response.data.listaAlumnos);
                if(response.data.response.codRetorno === '0'){
                    setConsultaAlumno(response.data.listaAlumnos)
                    setAlumnos(false);
                }else{
                    //mostrar mensaje que no hay información 
                    setAlumnos(true);
                }

            } catch (error) {
                console.log(error)
            }
        }

        const consultarGrupos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/grupo/');
                //const response = await axios.get('https://controlescolarbackend.herokuapp.com/api/grupo/');
                
                console.log(response.data.listaGrupos);
                if(response.data.response.codRetorno === '0'){
                    setConsultaGrupo(response.data.listaGrupos) 
                } 
            } catch (error) {
                console.log(error)
            }
        }

        //Se pudiera poner un spinner
        setTimeout(() => {
                consultarAlumnos();
                consultarGrupos();
        }, 2000);

        
    },[]);

    const actualizarBusqueda = (e) => {
        e.preventDefault();
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    const hdlClickBusquedaMatricula = () => setCheckMatricula(!checkMatricula)
    const hdlClickBusquedaGrupo = () => setCheckGrupo(!checkGrupo)

    return ( 

<>
        <div className="format-busqueda">
            <div className="format-padding">
                <label name="selectGrupo">Búsqueda por: </label>
            </div>
            <div className="row">
                <div className="col-g">
                    <div className="format-padding">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="chkboxMatricula" onClick={hdlClickBusquedaMatricula} checked={checkMatricula}/>
                            <label className="custom-control-label" htmlFor="chkboxMatricula">Búsqueda por matricula</label>
                        </div>
                    </div>
                </div>
                <div className="col-g">
                    <div className="format-padding">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="checkGrupo" onClick={hdlClickBusquedaGrupo} checked={checkGrupo}/>
                            <label className="custom-control-label" htmlFor="checkGrupo">Búsqueda por grupo</label>
                        </div>
                    </div>
                </div>    
            </div>
           
                {
                    checkMatricula ?
                    <div className="p-4">
                        <div className="row">
                            <div className="col p-1">
                                <label   htmlFor="txtBusquedaMatricula">Búsqueda por matricula</label>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" id="txtBusquedaMatricula" name="txtBusquedaMatricula"   />
                            </div>
                        </div>
                    </div>
                                
                    : 
                    null
                }

                {
                    checkGrupo ?

                    <div className="p-4">
                        <div className="row">
                            <div className="col p-1 text-center">
                                <label   htmlFor="buqueda">Búsqueda por grupo</label>
                            </div>
                            <div className="col">
                           
                                <select 
                                    id="buqueda"
                                    name="buqueda"
                                    onChange={actualizarBusqueda}
                                    className='custom-select' >
                                    <option value="-1"  >Seleccione un grupo</option>
                                    {
                                        consultaGrupo.map(grupo => 
                                            <OpcionesSelect 
                                                key={grupo.id}
                                                opciones={grupo}
                                            />
                                        )    
                                    }
                                
                                </select>
                            </div>
                        </div>
                    </div>
                        : 
                        null
                }
            <div className="format-padding">
                <button className="btn btn-primary">Buscar</button>
            </div>
        </div>

        <div className="table-margin">
        
        {
            !alumnos ?
                    <table className="container table table-borderless table-hover ">
                                    
                    <thead height="10" >
                        <tr>
                            <th width="20" >Matricula</th>
                            <th width="100" >Nombre</th>
                            <th width="20" >Apellidos</th>
                            <th width="20" >Telefono</th>
                            <th width="20" >Email</th>
                            <th width="20" >Grupo</th>
                            <th width="20">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            consultaAlumno.map( alumno => (
                                <TableAlumnos 
                                    key={alumno.matricula}
                                    alumno={alumno}
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
    </>
    );
}
 
export default ConsultaAlumnos;