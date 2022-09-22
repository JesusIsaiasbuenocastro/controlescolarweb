import { useEffect, useState } from "react";
import axios from 'axios';
import TableAlumnos from "../tables/tablealumnos";

const ConsultaAlumnos = () => {

    const [consultaAlumno, setConsultaAlumno] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [checkMatricula, setCheckMatricula] = useState(false);
    const [checkGrupo, setCheckGrupo] = useState(false);

    useEffect(() => {
        const consultarAlumnos = async () => {
            try {

                let respuesta;
                                
                const response = await axios.get('https://controlescolarbackend.herokuapp.com/api/alumno/');
                console.log(response.data.listaAlumnos);
                if(response.data.response.codRetorno === '0'){
                    setConsultaAlumno(response.data.listaAlumnos)
                }else{
                    //mostrar mensaje que no hay información 
                }
               
            } catch (error) {
                console.log(error)
            }
        }
        consultarAlumnos();
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
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="chkboxMatricula" onClick={hdlClickBusquedaMatricula} checked={checkMatricula}/>
                            <label class="custom-control-label" for="chkboxMatricula">Búsqueda por matricula</label>
                        </div>
                    </div>
                </div>
                <div className="col-g">
                    <div className="format-padding">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="checkGrupo" onClick={hdlClickBusquedaGrupo} checked={checkGrupo}/>
                            <label class="custom-control-label" for="checkGrupo">Búsqueda por grupo</label>
                        </div>
                    </div>
                </div>    
            </div>
           
                {
                    checkMatricula ?
                    <div className="p-4">
                        <div className="row">
                            <div className="col p-1">
                                <label   for="txtBusquedaMatricula">Búsqueda por matricula</label>
                            </div>
                            <div className="col">
                                <input type="text" class="form-control" id="txtBusquedaMatricula" name="txtBusquedaMatricula"   />
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
                                <label   for="buqueda">Búsqueda por grupo</label>
                            </div>
                            <div className="col">
                                <select 
                                    id="buqueda"
                                    name="buqueda"
                                    onChange={actualizarBusqueda}
                                    className='custom-select' >
                                    <option value="-1"  >Seleccione opción de búsqueda</option>
                                    <option  value="1" >Por grupo </option>
                                    <option  value="2" >Por matricula  </option>
                                
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
    
    </div>
    </>
    );
}
 
export default ConsultaAlumnos;