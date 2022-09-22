import LayOut from "./componentes/layout";
import {
  BrowserRouter,
  Routes,
  Route,
  Switch
} from "react-router-dom";
import Inicio from "./componentes/inicio";
import ConsultaAlumnos from "./componentes/alumnnos/consultaalumnos";
import ModificacionAlumnos from "./componentes/alumnnos/modificacionalumnos";
import NuevoAlumno from "./componentes/alumnnos/nuevoalumno";
import ConsultaMaestros from "./componentes/maestros/consultamaestros";
import NuevoMaestro from "./componentes/maestros/nuevomaestro";
import ModificacionMaestro from "./componentes/maestros/modificacionmaestros";
import ConsultaCalificacion from "./componentes/calificaciones/consultacalificacion";
import Nuevacalificacion from "./componentes/calificaciones/nuevacalificacion";
import ModificacionCalificacion from "./componentes/calificaciones/modificacioncalificacion";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        //rutas alumnos 
        <Route path='/' element={<LayOut/>}>
          <Route index element= {<Inicio/>} />         
        </Route>
        <Route path='/alumnos/consultaalumnos' element={<LayOut/>}>
            <Route index element= {<ConsultaAlumnos/>} />
        </Route>
        <Route path='/alumnos/altaalumnos' element={<LayOut/>}>
            <Route index element= {<NuevoAlumno/>} />
        </Route>
        <Route path='/alumnos/modificacionalumnos/:matricula' element={<LayOut/>}>
            <Route index element= {<ModificacionAlumnos/>} />
        </Route>

        //rutas maestros 
        <Route path='/maestros/consultamaestros' element={<LayOut/>}>
            <Route index element= {<ConsultaMaestros/>} />
        </Route>
        <Route path='/maestros/altamaestros' element={<LayOut/>}>
            <Route index element= {<NuevoMaestro/>} />
        </Route>
        <Route path='/maestros/modificacionmaestros/:id' element={<LayOut/>}>
            <Route index element= {<ModificacionMaestro/>} />
            <Route path =":id" element ={<ModificacionMaestro/>}/>
        </Route>

        //rutas calificaciones 
        <Route path='/calificaciones/consultacalificacion' element={<LayOut/>}>
            <Route index element= {<ConsultaCalificacion/>} />
        </Route>
        <Route path='/calificaciones/altacalificacion' element={<LayOut/>}>
            <Route index element= {<Nuevacalificacion/>} />
        </Route>
        <Route path='/calificaciones/modificacioncalificacion/:id' element={<LayOut/>}>
            <Route index element= {<ModificacionCalificacion/>} />
            <Route path =":id" element ={<ModificacionCalificacion/>}/>
        </Route>
    </Routes>
  
  </BrowserRouter>
  );
}

export default App;
