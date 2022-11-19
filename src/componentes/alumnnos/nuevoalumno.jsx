import { useState,useEffect } from "react";
import axios from 'axios';
import OpcionesSelect from "../genericos/opcionesselect";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import Mensaje from "../mensajes/mensaje";


const NuevoAlumno = () => {

  const [consultaGrupo, setConsultaGrupo] = useState([]);
  const [alumno , setAlumno] = useState({});
  const [error , setError] = useState(false);
  const [mensaje , setMensaje] = useState('');
  //Para el sweeralert
  const [iconoSweetAlert  , setIconoSweetAlert ] = useState('');
  const [mensajeSweetAlert , setMensajeSweetAlert] = useState('');
  
  //validar el email 
 const validate = (text) => {
    return /\S+@\S+\.\S+/.test(text);
  }


   //useState de para guardar la ALUMNO
   const actualizarAlumno = (e) => {
    e.preventDefault();
    //console.log(alumno);
    if(e.target.name==='email'){
      console.log("Entro a validar el email")
      if(!validate(e.target.value)){
        setError(true);
        setMensaje('El email es incorrecto');
        return;
      }else {
        setError(false);
      }
     }


    const esValido = e.target.validity.valid;
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
      
      if( Object.keys(alumno).length < 5){
          //mandar mensaje de validación
          setError(true);
          setMensaje("Todos los campos son obligatorios");
          return;
      }
      //Validar que seleccione los datos correctos
      if(Object.keys(alumno.nombre).length ===0
        || Object.keys(alumno.apellidos).length ===0
        || Object.keys(alumno.telefono).length ===0
        || Object.keys(alumno.email).length ===0
          || alumno.grupo === "-1")
        {
           //mandar mensaje de validación
           setError(true);
           setMensaje("Todos los campos son obligatorios");
           return;
          }

        if (Object.keys(alumno.telefono).length < 10){
          //mandar mensaje de validación
          setError(true);
          setMensaje("El número de celular incorrecto");
          return;
        }
      
          console.log('paso las validaciones');
          setError(false);
          
    //let url = `https://controlescolarbackend.herokuapp.com/api/alumno`;
      let url = `http://localhost:8080/api/alumno`;
      let icono = '';
      let mensaje ='';
      const MySwal = withReactContent(Swal)
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
         

          if(resultado.codRetorno !== '-1'){
            console.log('entro a las variables de exito ')
            //setIconoSweetAlert('success');
            //setMensajeSweetAlert('Registro guardado exitosamente');
            icono = 'success'
            mensaje = 'Registro guardado exitosamente'
          }else{
            console.log('entro a las variables de error')
           // setIconoSweetAlert('error');
           // setMensajeSweetAlert('Ocurrió un error');
            icono = 'error'
            mensaje = 'Ocurrió un error'
          }
          
          
      } catch (error) {
          console.log(error);
          icono = 'error'
          mensaje = 'Ocurrió un error'
          //setIconoSweetAlert('error');
          //setMensajeSweetAlert('Ocurrió un error');
      }
      console.log(icono)
      console.log(mensaje)
      //mandar mensaje 
      Swal.fire({
        position: 'center',
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 2500

      }).then(() => {
        // navigate('/catalogomodelos');
      })

    
  }


   useEffect(() => {
     const consultarGrupos = async () => {
        try {
            const response = await axios.get('https://controlescolarbackend.herokuapp.com/api/grupo/');
            //const response = await axios.get('http://localhost:8080/api/grupo/');
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
        consultarGrupos();
    }, 2000);

    
  },[]);
  
    return ( 
      <div className="registro-form">
        <div className="header-registro">
          <h1>Registro de alumnos</h1>
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
                <label for="formGroupExampleInput2">Telefono</label>
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