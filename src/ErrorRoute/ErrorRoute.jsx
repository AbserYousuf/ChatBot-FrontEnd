import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ErrorRoute({children}) {
  const token  = localStorage.getItem('LoginToken')
  if(token){
    return <Navigate to='/chat' replace/>
  }
  return children
}
