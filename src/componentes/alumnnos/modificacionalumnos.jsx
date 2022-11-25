import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {  useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import OpcionesSelect from "../genericos/opcionesselect";
import Mensaje from "../mensajes/mensaje";
import useValidaciones from "../../hooks/useValidaciones";

const ModificacionAlumnos = () => {
    const {matricula} = useParams();
    const [alumno, setAlumno] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const[validarEmail] = useValidaciones(alumno.email);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(false);

    const URLApi  = process.env.REACT_APP_CONTROL_ESCOLAR_API_URL;


   //useState de para guardar la ALUMNO
   const actualizarAlumno = (e) => {
    e.preventDefault();
    const esValido = e.target.validity.valid;
    console.log(esValido);
    if(esValido){
      setAlumno({
        ...alumno,
        [e.target.name] : e.target.value
        
        })
    }
    
  }
    useEffect(() =>{ 

        //consultar materia
        const consultarAlumno= async () => {
            try {
                                 
               const response = await axios.get(`${URLApi}/alumno/${matricula}`);
                if(response.data.response.codRetorno === '0'){
                    setAlumno(response.data.alumno)
                }else{
                    //mandar mensaje 
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'No exite el alumno a consultar',
                      showConfirmButton: false,
                      timer: 2500

                    }).then(() => {
                      window.location('/alumnos/consultaalumnos')
                    })
                    return;
                }

                

            } catch (error) {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No exite el alumno a consultar',
                showConfirmButton: false,
                timer: 2500

              }).then(() => {
                window.location('/alumnos/consultaalumnos')
              })
            }
        }

        const consultarGrupos= async () => {
            try { 
                  const response = await axios.get(`${URLApi}/grupo`);
                   if(response.data.response.codRetorno === '0'){
                       setGrupos(response.data.listaGrupos) 
                   } 
   
               } catch (error) {
                   console.log(error)
               }

        }
        consultarAlumno();
        consultarGrupos();

    },[]);

  //Guardar registro
  const guardarRegistro = async (e)  => {
    e.preventDefault();
    
    //Validar que seleccione los datos correctos
    if(Object.keys(alumno.nombre).length ===0
    || Object.keys(alumno.apellidos).length ===0
    || alumno.telefono ===0
    || Object.keys(alumno.email).length ===0
      || alumno.grupo === "-1")
      {
         //mandar mensaje de validación
         setError(true);
         setMensaje("Todos los campos son obligatorios");
         return;
        }
            if(!validarEmail()){
              setError(true);
              setMensaje('El email es incorrecto');
              return;
            }else {
              setError(false);
            }
    
        console.log('paso las validaciones');
    setError(false);
        
    let url = `${URLApi}/alumno/${alumno.matricula}`;
    try {
        let request;

        request = await fetch(url,{
            method: 'PUT',
            body: JSON.stringify (alumno),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resultado = await request.json();

       //mandar mensaje de exito    
        const MySwal = withReactContent(Swal)

            Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro guardado exitosamente',
            showConfirmButton: false,
            timer: 1500,
            
            
        }).then(() => {
          window.location = '/alumnos/consultaalumnos'
        })
        
    } catch (error) {
        console.log(error);
    }

    
}
    return ( 
        <div className="registro-form">
        <div className="header-registro">
          <h1>Actualización De Alumnos</h1>
        </div>    
        <div className="registro-form-centrar">
            <form>
            <div class="form-group">
                <label for="formGroupExampleInput2">Matricula</label>
                <input type="text" class="form-control" id="txtMatricula" value={alumno.matricula ? alumno.matricula : ''}    name="matricula" disabled />
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Nombre</label>
                <input type="text" class="form-control" id="txtNombre" value={alumno.nombre ? alumno.nombre : ''}    name="nombre" placeholder="Nombres" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Apellidos</label>
                <input type="text" class="form-control" id="txtApellidos" value={alumno.apellidos ? alumno.apellidos : ''}    name ="apellidos" placeholder="Apellidos" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Teléfono</label>
                <input type="text" class="form-control" id="txtTelefono" maxLength={10} value={alumno.telefono ? alumno.telefono : ''}  pattern="[0-9]{0,13}" name ="telefono" placeholder="Telefono" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">E-mail</label> 
                <input type="text" class="form-control" id="txtEmail" name="email" value={alumno.email ? alumno.email : ''} placeholder="E-mail" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <select 
                    onChange={actualizarAlumno}
                    id="selectGrupo"
                    name="grupo"
                    className='custom-select' 
                    value = {alumno.grupo}>
                    <option value="-1"  >Seleccione un grupo</option>
                    {
                      grupos.map(grupo => 
                          <OpcionesSelect 
                              key={grupo.id}
                              opciones={grupo}
                          />
                      )    
                    }
                </select>
              </div>

              {error ?  <div className="m-4">
                <Mensaje mensaje={mensaje}></Mensaje>
              </div> : null}
             
             
              <button type="submit" class="btn btn-primary" onClick={guardarRegistro}>Actualizar</button>
          </form>
          
        </div>
      </div>
     );
}
 
export default ModificacionAlumnos;