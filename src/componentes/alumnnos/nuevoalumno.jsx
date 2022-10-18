import { useState,useEffect } from "react";
import axios from 'axios';
import OpcionesSelect from "../genericos/opcionesselect";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';


const NuevoAlumno = () => {

  const [consultaGrupo, setConsultaGrupo] = useState([]);
  const [alumno , setAlumno] = useState({});
  const [error , setError] = useState(false);
  
   //useState de para guardar la ALUMNO
   const actualizarAlumno = (e) => {
    e.preventDefault();
    //console.log(alumno);
    setAlumno({
        ...alumno,
        [e.target.name] : e.target.value
        
    })
  }

  
    //Guardar registro
    const guardarRegistro = async (e)  => {
      e.preventDefault();
      console.log(Object.keys(alumno).length );
      
      if( Object.keys(alumno).length < 5 ){
          //mandar mensaje de validación
          setError(true);
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
           return;
          }
      
          console.log('paso las validaciones');
      setError(false);
          
      //let url = `https://controlescolarbackend.herokuapp.com/api/alumno`;
      let url = `http://localhost:8080/api/alumno`;
        

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

         
          
      } catch (error) {
          console.log(error);
      }

      //mandar mensaje de exito    
      const MySwal = withReactContent(Swal)

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro guardado exitosamente',
          showConfirmButton: false,
          timer: 1500,
          
        
      }).then(() => {
        // navigate('/catalogomodelos');
      })
  }


   useEffect(() => {
     const consultarGrupos = async () => {
        try {
            //const response = await axios.get('https://controlescolarbackend.herokuapp.com/api/grupo/');
            const response = await axios.get('http://localhost:8080/api/grupo/');
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
                <input type="text" class="form-control" id="txtNombre" name="nombre" placeholder="Nombres" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Apellidos</label>
                <input type="text" class="form-control" id="txtApellidos"  name ="apellidos" placeholder="Apellidos" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Telefono</label>
                <input type="text" class="form-control" id="txtTelefono" name ="telefono" placeholder="Telefono" onChange={actualizarAlumno}/>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">E-mail</label> 
                <input type="text" class="form-control" id="txtEmail" name="email" placeholder="E-mail" onChange={actualizarAlumno}/>
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
              <button type="submit" class="btn btn-primary" onClick={guardarRegistro}>Registrar</button>
          </form>
        </div>
      </div>
     );
}
 
export default NuevoAlumno;