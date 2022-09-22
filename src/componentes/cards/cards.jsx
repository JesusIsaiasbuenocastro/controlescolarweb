import { Link } from "react-router-dom";

const Cards = ({texto, imagen, descripcion, redirigir}) => {
  console.log(redirigir);
    return (  
      <div class="card card-border">
        <div className="img-cards"> 
        <img src={imagen} class="" alt={texto} />
        </div>
        <div class="card-body">
          <h5 class="card-title">{texto}</h5>
          <p class="card-text">{descripcion}</p>
          <Link className="btn btn-primary" to={redirigir}>Consultar</Link>
        </div>
      </div> 

     );
}
 
export default Cards;