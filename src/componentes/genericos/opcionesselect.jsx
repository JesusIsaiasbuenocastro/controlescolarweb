const OpcionesSelect = ({opciones}) => {
    return ( 
        <option  value={opciones.id} >{opciones.descripcion}</option>
     );
}
 
export default OpcionesSelect;