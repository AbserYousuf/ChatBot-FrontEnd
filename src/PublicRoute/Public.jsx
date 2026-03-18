
import { Navigate } from "react-router-dom"
import LogContext from "../Contexts/LogContext"
import { useContext } from "react"
export default function Public({children}) {
    const context = useContext(LogContext)
    const {acess}=context
        const token = localStorage.getItem('LoginToken')
        if(token && !acess){
              return <Navigate to='/chat' replace/>
        } 
        return children
}
