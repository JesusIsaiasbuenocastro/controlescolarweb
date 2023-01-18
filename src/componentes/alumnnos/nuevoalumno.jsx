import { useState,useEffect } from "react";
import axios from 'axios';
import OpcionesSelect from "../genericos/opcionesselect";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import Mensaje from "../mensajes/mensaje";
import useValidaciones from "../../hooks/useValidaciones";

const NuevoAlumno = () => {

  const [consultaGrupo, setConsultaGrupo] = useState([]);
  const [alumno , setAlumno] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email:"",
    grupo:-1
  });
  const [error , setError] = useState(false);
  const [mensaje , setMensaje] = useState(''); 
  const URLApi  = process.env.REACT_APP_CONTROL_ESCOLAR_API_URL;
  const[validarEmail] =useValidaciones(alumno.email);

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

    let url = `${URLApi}/alumno/`;
    try {
        let request;

        request = await fetch(url,{
            method: 'POST',
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


   useEffect(() => {
     const consultarGrupos = async () => {
        try {
            const response = await axios.get(`${URLApi}/grupo/`);
            console.log(response.data.listaGrupos);
            if(response.data.response.codRetorno === '0'){
                setConsultaGrupo(response.data.listaGrupos) 
            } 
        } catch (error) {
            console.log(error)
        }
    }
    consultarGrupos();
    //Se pudiera poner un spinner
    /*setTimeout(() => {
        
    }, 2000);
*/
    
  },[]);
  
    return ( 
      <div className="registro-form">
        <div className="header-registro">
          <h1>Registro De Alumnos</h1>
        </div>    
        <div className="registro-form-centrar">
            <form>
              <div class="form-group">
                <label for="formGroupExampleInput2">Nombre</label>
                <input type="text" class="form-control" id="txtNombre" value={alumno.nombre ? alumno.nombre : ''} name="nombre" placeholder="Nombres" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Apellidos</label>
                <input type="text" class="form-control" id="txtApellidos"  name ="apellidos" placeholder="Apellidos" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Teléfono</label>
                <input type="text" class="form-control" id="txtTelefono" maxLength={10} value={alumno.telefono ? alumno.telefono : ''}  pattern="[0-9]{0,13}" name ="telefono" placeholder="Telefono" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">E-mail</label> 
                <input type="text" class="form-control" id="txtEmail" name="email" pattern= '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$'placeholder="E-mail" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <select 
                    onChange={actualizarAlumno}
                    id="selectGrupo"
                    name="grupo"
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

              {error ?  <div className="m-4">
                <Mensaje mensaje={mensaje}></Mensaje>
              </div> : null}
             
             
              <button type="submit" class="btn btn-primary" onClick={guardarRegistro}>Registrar</button>
          </form>
          
        </div>
      </div>
     );
}
 
export default NuevoAlumno;