import { Navigate } from "react-router-dom"
export default function Acess({children}) {
  const token = localStorage.getItem('LoginToken')
  if(!token){
    return <Navigate to='/login' replace/>
  }
  return children
}
