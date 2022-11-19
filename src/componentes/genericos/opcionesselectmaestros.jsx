const OpcionesSelectMaestros = ({opciones}) => {
    return ( 
        <option  value={opciones.id} >{opciones.nombre+ ' ' + opciones.apellidos
        }</option>
    );
}
 
export default OpcionesSelectMaestros;