import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Mensaje from "../mensajes/mensaje";
import useValidaciones from "../../hooks/useValidaciones";

const ModificacionMaestro = () => {
  const navigate = useNavigate();
  const{id} = useParams();
  const[maestro, setMaestro] = useState({
    id: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    email:""

  });
  const[mensaje, setMensaje] = useState();
  const[error, setError] = useState(false);
  const[validarEmail] = useValidaciones(maestro.email);


  const URLApi  = process.env.REACT_APP_CONTROL_ESCOLAR_API_URL;

  useEffect(() =>{
    //consultar maestros
    const consultarMaestro= async () => {
        try {
                            
           const response = await axios.get(`${URLApi}/maestros/${id}`);
            if(response.data.response.codRetorno === '0'){
                setMaestro(response.data.maestro);
            }else{
                setMensaje('No hay información para mostrar');
            }

        } catch (error) {
            console.log(error)
        }
    }
    consultarMaestro();

  },[]);

  //useState de para guardar la maestro
  const actualizarMaestro = (e) => {
    e.preventDefault();
    //console.log(maestro);

    const esValido = e.target.validity.valid;
    console.log(esValido);
    if(esValido){
      setMaestro({
        ...maestro,
        [e.target.name] : e.target.value
        
        })
    }
    
  }
  //Guardar registro
  const guardarRegistro = async (e)  => {
    e.preventDefault();
    
    //Validar que seleccione los datos correctos
    if(Object.keys(maestro.nombre).length ===0
    || Object.keys(maestro.apellidos).length ===0
    || maestro.telefono ===0
    || Object.keys(maestro.email).length ===0)
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
        
    let url =  `${URLApi}/maestros/${maestro.id}`;
    let icono = '';
    let mensaje ='';
    try {
        let request;

        request = await fetch(url,{
            method: 'PUT',
            body: JSON.stringify (maestro),
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
          mensaje = 'Registro actualizado exitosamente'
        }else{
          console.log('entro a las variables de error') 
          icono = 'error'
          mensaje = 'Ocurrió un error'
        }
       
        
    } catch (error) {
        console.log(error);
        icono = 'error'
        mensaje = 'Ocurrió un error' 
    }

    //mandar mensaje de exito    
    const MySwal = withReactContent(Swal)

        Swal.fire({
        position: 'center',
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
        
        
    }).then(() => {
      window.location = '/maestros/consultamaestros';
    })
}


    return ( 
      <div className="registro-form">
      <div className="header-registro">
        <h1>Actualización De Maestros</h1>
      </div>    
      <div className="registro-form-centrar">
          <form>
          <div class="form-group">
              <label for="formGroupExampleInput2">ID</label>
              <input type="text" class="form-control" id="txtNombre" value={maestro.id ? maestro.id : ''}    name="id"  onChange={actualizarMaestro} disabled/>
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">Nombre</label>
              <input type="text" class="form-control" id="txtNombre" value={maestro.nombre ? maestro.nombre : ''}    name="nombre" placeholder="Nombres" onChange={actualizarMaestro}/>
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">Apellidos</label>
              <input type="text" class="form-control" id="txtApellidos" value={maestro.apellidos ? maestro.apellidos : ''}    name ="apellidos" placeholder="Apellidos" onChange={actualizarMaestro}/>
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">Teléfono</label>
              <input type="text" class="form-control" id="txtTelefono" maxLength={10} value={maestro.telefono ? maestro.telefono : ''}  pattern="[0-9]{0,13}" name ="telefono" placeholder="Telefono" onChange={actualizarMaestro}/>
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">E-mail</label> 
              <input type="text" class="form-control" id="txtEmail" name="email" value={maestro.email ? maestro.email : ''} placeholder="E-mail" onChange={actualizarMaestro}/>
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
 
export default ModificacionMaestro;