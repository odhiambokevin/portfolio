import { useRouteError } from "react-router-dom";

const NotFound = () => {
    const error = useRouteError();
    return ( 
        
            <div>
               <h1>Not Found</h1>
            </div>
            
                
        
     );
}
 
export default NotFound;