import { useEffect, useState } from "react";
import axios from 'axios';
import TableAlumnos from "../tables/tablealumnos";
import Mensaje from "../mensajes/mensaje";
import OpcionesSelect from "../genericos/opcionesselect";

const ConsultaAlumnos = () => {

    const [consultaAlumno, setConsultaAlumno] = useState([]);
    const [consultaGrupo, setConsultaGrupo] = useState([]);
    const [alumnos, setAlumnos] = useState(true);
    const [busqueda, setBusqueda] = useState({
        matricula : 0,
        grupo : '-1'
    });
    const [checkMatricula, setCheckMatricula] = useState(false);
    const [checkGrupo, setCheckGrupo] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [advertencia, setAdvertencia] = useState(false);

    const URLApi  = process.env.REACT_APP_CONTROL_ESCOLAR_API_URL;
    useEffect(() => {

        //Se pudiera poner un spinner
        setTimeout(() => {
                consultarAlumnos();
                consultarGrupos();
        }, 2000);

        
    },[]);
    const consultarAlumnos = async () => {
        try {
            
            const response = await axios.get(`${URLApi}/alumno/obtenerlista`);         
           //const response = await axios.get('http://localhost:8080/api/alumno/obtenerlista');
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
            //const response = await axios.get('http://localhost:8080/api/grupo/');
            //const response = await axios.get('https://controlescolarbackend.herokuapp.com/api/grupo/');
            const response = await axios.get(`${URLApi}/grupo/`);
            
            if(response.data.response.codRetorno === '0'){
                setConsultaGrupo(response.data.listaGrupos) 
            } 
        } catch (error) {
            console.log(error)
        }
    }
    const actualizarBusqueda = (e) => {
        e.preventDefault();
        const esValido = e.target.validity.valid;
        if(esValido){
            setBusqueda({
                ...busqueda,
                [e.target.name] : e.target.value
            });
        }
        
    }

    const buscarPorFiltro = async() => {
        if(!validacionesFiltro()){
            setAdvertencia(true); 
        }else{
            if (checkMatricula || checkGrupo) {
                obtenerListaAlumnosFiltro();
                
            }else{
                consultarAlumnos();
            } 
            setAdvertencia(false); 
        }

       
       
    }

    const obtenerListaAlumnosFiltro = async () => {
        //let url = `http://localhost:8080/api/alumno/obtenerlistafiltro` ;
        //let url = `https://controlescolarbackend.herokuapp.com/api/alumno/obtenerlistafiltro` ;
        let url = `${URLApi}/alumno/obtenerlistafiltro` ;
        
        try {
            let request;
    
            request = await fetch(url,{
                method: 'POST',
                body: JSON.stringify (busqueda),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const resultado = await request.json();
            console.log(resultado);
            if(resultado.response.codRetorno === '0'){
                setConsultaAlumno(resultado.listaAlumnos)
                setAlumnos(false);
            }else{
                //mostrar mensaje que no hay información 
                setAlumnos(true);
            }
            
        } catch (error) {
            console.log(error);
        }
    } 

    const validacionesFiltro = () => {
        if(checkMatricula && checkGrupo){
            //Validar que se haya escrito algo y que se haya seleccionado del combobox una opcion
            if(Object.keys(busqueda.matricula).length ===0 || busqueda.grupo === '-1'){
                setAdvertencia(true);
                setMensaje('Favor de ingresar los datos del filtro')
                return false;
            }
            
        }else if (checkGrupo){
            if(busqueda.grupo === '-1'){
                setAdvertencia(true);
                setMensaje('Favor de seleccionar el grupo a consultar')
                return false;
            }
        }else if(checkMatricula){
            //validar que  se haya escrito algo 
            if(Object.keys(busqueda.matricula).length ===0){
                setAdvertencia(true);
                setMensaje('Favor de ingresar la matricula')
                return false;
            }
        }

        return true;
    }

    const hdlClickBusquedaMatricula = () => {
        setCheckMatricula(!checkMatricula);
        setBusqueda({
            ...busqueda,
            matricula : ''
        })
        setAdvertencia(false);
    }
    const hdlClickBusquedaGrupo = () => {
        setCheckGrupo(!checkGrupo)
        setBusqueda({
            ...busqueda,
            grupo : '-1'
        })
        setAdvertencia(false);
    }

    return ( 
    <>
    <div className="header-registro">
          <h1>Consulta de alumnos</h1>
        </div>
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
                                <label   htmlFor="matricula">Búsqueda por matricula</label>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" id="matricula" onChange={actualizarBusqueda} value={busqueda.matricula ? busqueda.matricula : ''} name="matricula" pattern="[0-9]{0,13}"  maxLength='8'   />
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
                                <label   htmlFor="grupo">Búsqueda por grupo</label>
                            </div>
                            <div className="col">
                           
                                <select 
                                    id="grupo"
                                    name="grupo"
                                    onChange={actualizarBusqueda}
                                    className='custom-select' 
                                    value = {busqueda.grupo}>
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

            {
                advertencia ?
                <Mensaje
                mensaje={mensaje}
                />
            :null

            }
            

            <div className="format-padding">
                <button className="btn btn-primary" onClick={buscarPorFiltro}>Buscar</button>
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