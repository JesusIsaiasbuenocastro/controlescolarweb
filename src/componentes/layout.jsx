
import { Outlet } from "react-router-dom";
import NavBar from "./navbar";

const LayOut = () => {
    return ( 
        <>
          <NavBar></NavBar>  
            <Outlet></Outlet>
        </>
     );
}
 
export default LayOut;