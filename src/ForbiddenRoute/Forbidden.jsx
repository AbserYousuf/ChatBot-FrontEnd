import { Navigate } from "react-router-dom";
import LogContext from "../Contexts/LogContext";
import { useContext } from "react";
export default function Forbidden({children}) {
    const context = useContext(LogContext)
    const {Forbidden} = context
 if(Forbidden){
    return <Navigate to='/forgot' replace/>
    
 }
 return children
}
