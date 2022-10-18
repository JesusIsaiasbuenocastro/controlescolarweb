const Mensaje = ({mensaje}) => {
    return ( 
        <div className="alert alert-info" role="alert">
            {mensaje}
        </div>
     );
}
 
export default Mensaje;