import { Link } from "react-router-dom";

const Cards = ({texto, imagen, descripcion, redirigir}) => {
  console.log(redirigir);
    return (  
      <div className="card card-border">
        <div className="img-cards"> 
        <img src={imagen} alt={texto} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{texto}</h5>
          <p className="card-text">{descripcion}</p>
          <Link className="btn btn-primary" to={redirigir}>Consultar</Link>
        </div>
      </div> 

     );
}
 
export default Cards;