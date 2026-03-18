import { useContext, } from "react";
import LogContext from "../Contexts/LogContext";
import { Navigate } from "react-router-dom";
export default function Protected({children}) {
    const context = useContext(LogContext)
    const token = localStorage.getItem('LoginToken')
    const {access} = context 
    if(!access ){
        return <Navigate to='/forgot' replace/>
    }
          return children
}
