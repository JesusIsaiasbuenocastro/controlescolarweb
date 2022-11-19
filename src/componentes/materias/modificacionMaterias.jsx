import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import OpcionesSelectMaestros from "../genericos/opcionesselectmaestros";
import Mensaje from "../mensajes/mensaje";

const ModificacionMaterias = () => {
    const {id} = useParams();
    const {navigate} = useNavigate();
    const [materia, setMateria] = useState([]);
    const [maestros, setMaestros] = useState([]);
    const [existeMateria, setExisteMateria] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(false);

    useEffect(() =>{
        console.log(id);

        //consultar materia
        const consultarMaterias= async () => {
            try {
                                
             //   const response = await axios.get('https://controlescolarbackend.herokuapp.com/api/materias');
               const response = await axios.get(`http://localhost:8080/api/materia/${id}`);
                if(response.data.response.codRetorno === '0'){
                    setMateria(response.data.materia)
                    setExisteMateria(true);
                }else{
                    setExisteMateria(false);
                    setMensaje('No hay información para mostrar');
                }

               

            } catch (error) {
                console.log(error)
            }
        }

        const consultarMestros = async () => {
            try {
                                
                //   const response = await axios.get('https://controlescolarbackend.herokuapp.com/api/materias');
                  const response = await axios.get('http://localhost:8080/api/maestros');
                  console.log(response.data);
                   if(response.data.response.codRetorno === '0'){
                       setMaestros(response.data.listaMaestros
                        ) 
                   } 
   
               } catch (error) {
                   console.log(error)
               }

        }
        consultarMaterias();
        consultarMestros();

        
        //consultar catalogo maestros


    },[]);

    const actualizarMateria = (e) => {
        e.preventDefault();
           
        const esValido = e.target.validity.valid;
        if(esValido){
            setMateria({
            ...materia,
            [e.target.name] : e.target.value
            
        })
        }
        
      }
     //Guardar registro
     const guardarRegistro = async (e)  => {
        e.preventDefault();
      /*  console.log(materia);
        console.log(Object.keys(materia.nombre).length);
        console.log(Object.keys(materia.limite).length );
        console.log(materia.idMaestro);
        */
        //Validar que seleccione los datos correctos
        if(Object.keys(materia.nombre).length ===0
          || materia.limite ===0
            || materia.idMaestro === "-1")
          {
             //mandar mensaje de validación
             setError(true);
             setMensaje("Todos los campos son obligatorios");
             return;
            }
        
            console.log('paso las validaciones');
        setError(false);
            
        //let url = `https://controlescolarbackend.herokuapp.com/api/alumno`;
        let url = `http://localhost:8080/api/materia/${id}`;
          
  
        try {
            let request;
    
            request = await fetch(url,{
                method: 'PUT',
                body: JSON.stringify (materia),
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
           //navigate('/materias/consultamaterias');
        })
    }
    

    return ( 
        <div className="registro-form">
        <div className="header-registro">
          <h1>Actualización de materias</h1>
        </div>    
        <div className="registro-form-centrar">
            <form>
              <div class="form-group">
                <label for="formGroupExampleInput2">Descripción</label>
                <input type="text" class="form-control" id="txtNombre" value={materia.nombre ? materia.nombre : ''} name="nombre" placeholder="Nombres" onChange={actualizarMateria}/>
              </div>
              <div class="form-group">
                <label for="limite">limite</label>
                <input type="text" class="form-control" id="limite" value={materia.limite ? materia.limite : 0 } name ="limite" placeholder="limite"  pattern="[0-9]{0,13}" onChange={actualizarMateria} maxLength='2' />
              </div>
              <div class="form-group">
                <select 
                    onChange={actualizarMateria}
                    id="idMaestro"
                    name="idMaestro"
                    className='custom-select' 
                    value = {materia.idMaestro }
                    >
                    <option value='-1'  >Seleccione un maestro</option>
                    
                    {
                      maestros.map(maestro => 
                          <OpcionesSelectMaestros 
                              key={maestro.id}
                              opciones={maestro}
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
 
export default ModificacionMaterias;