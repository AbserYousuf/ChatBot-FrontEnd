import React, { useEffect, useState } from 'react'
import LogContext from './LogContext'
import { useNavigate } from 'react-router-dom'
export default function HanldeLogCon({children}) {
  const [Acesstoken,setAcesstoken]=useState(null) 
  const [loading,setLoading]=useState(false)
  const [start,setStart]=useState(false) 
  const [Forbidden,setForbidden]=useState(true)
  const [access,setAccess]=useState(false)
  const [email,setEmail]=useState('')
  const navigate = useNavigate()
  const [alert,setalert]=useState({
    role:"",
    msg:""
  })
  const authheaders={
    "Content-Type":"application/json"
  }
  useEffect(()=>{
         if(alert.msg!==''){
          setTimeout(() => {
            setalert({
              role:"",
              msg:""
            })
          }, 4000);
         }
  },[alert])
  const login=async(payload)=>{
    setLoading(true)
    const url = import.meta.env.VITE_APP_URL 
    try {
     const response = await fetch(`${url}/api/auth/login`,{
      method:"POST",
      headers:authheaders ,
      body:JSON.stringify(payload),
      credentials:'include'
     })
     const json = await response.json()
  if(!response.ok){
    setTimeout(() => {
      setLoading(false)
      setalert({
        role:"error",
        msg:`OOps! Error${response.status}. ${json.msg}`
      })
    }, 10000);
    return
  }
else{
  setAcesstoken(json.logintoken)
  localStorage.setItem('LoginToken',json.logintoken)
  localStorage.setItem('time',Date.now())
  setTimeout(() => {
    setLoading(false)
    navigate('/chat')
  }, 4000);

}
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
        setalert({
          role:"error",
          msg:`Some Error Occurred.`
        })
      }, 10000);
      console.error(error)
    }
  }
  const Signup=async(payload)=>{
    setLoading(true)
    const url = import.meta.env.VITE_APP_URL 
    try {
     const response = await fetch(`${url}/api/auth/signup`,{
      method:"POST",
      headers:authheaders ,
      body:JSON.stringify(payload)
     })
     const json = await response.json()
  if(!response.ok){
    setTimeout(() => {
      setLoading(false)
      setalert({
        role:"error",
        msg:`Error${response.status}. ${json.msg}`
      })
    }, 10000);
    return
  }

    setTimeout(() => {
      setLoading(false)
      navigate('/login')
    }, 10000);
  
    } catch (error) {
     setTimeout(() => {
      setLoading(false)
      setalert({
        role:"error",
        msg:`Some Error Occurred.`
      })
     }, 10000);
      console.error(error)
    }
  }
const forgotPassword=async(email)=>{
  setStart(true)
  const url = import.meta.env.VITE_APP_URL 
  try {
   const response = await fetch(`${url}/api/auth/forgot`,{
    method:"POST",
    headers:authheaders ,
    credentials:'include',
    body:JSON.stringify({email}),
   })
   const json = await response.json()
if(!response.ok){
 
    setStart(false)
    setalert({
      role:"error",
      msg:`Error${response.status}. ${json.msg}`
    })

  return
}
if(!json.success){

    setStart(false)
    setalert({
      role:"info",
      msg:`${json.msg}`
    })
  return
}
else{

    setStart(false)
    setAccess(true)
    setEmail(email)
  navigate('otp')
  
}
  }
 catch(error){
  console.error(error)
  setLoading(false)
      setalert({
        role:"error",
        msg:`Some Error Occured . `
      })
 } 
}
 const otpverify=async(otp)=>{
  setStart(true )
  const url = import.meta.env.VITE_APP_URL 
  try {
   const response = await fetch(`${url}/api/auth/otp`,{
    method:"POST",
    headers:authheaders ,
    credentials:'include',
    body:JSON.stringify({otp})
   })
   const json = await response.json()
   const message = json.msg==="Invalid or Expired Token"?true:false
   if(message){
    setStart(false)
    setForbidden(true)
     setalert({
       role:"info",
       msg:"Session Expired"
     })
     setTimeout(() => {
      
       navigate('/forgot')
       setAccess(false)
       setForbidden(true)
     }, 3000);
     return
   }
   
   if(!response.ok){
    setStart(false)
     setalert({
       role:"error",
       msg:`Error${response.status}. ${json.msg}`
      })
      return
    }
    else{
      setStart(false)
      setForbidden(false)
      navigate('/reset')
    }
 }
 catch(error){
  console.error(error)
  setStart(false)
  setForbidden(true)
      setalert({
        role:"error",
        msg:"Something went Wrong"
      })
 }
}
const resetpassword = async (password) => {
  setStart(true)
  const url = import.meta.env.VITE_APP_URL
  try {
    const response = await fetch(`${url}/api/auth/reset`, {
      method: "POST",
      headers: authheaders,
      credentials: 'include',
      body: JSON.stringify({ password }),
    })
    const json = await response.json()
    const message = json.msg === "Invalid or Expired Token" ? true : false
    if (message) {
      setalert({ role: "info", msg: "Session Expired" })
      setTimeout(() => {
        navigate('/forgot')
        setForbidden(true)
        setStart(false)
        setAccess(false)
      }, 3000)
      return
    }
    if (!response.ok) {
      setForbidden(true)
      setStart(false)        
      setAccess(false)
      setalert({ role: "error", msg: `Error${response.status}. ${json.msg}` })
      return
    }

    
  else{
    navigate('/login')
   setTimeout(() => {
    setForbidden(true)
    setAccess(false)
    setStart(false)
   }, 2000);
  } 

  } catch (error) {
    console.error(error)
    setAccess(false)
    setStart(false)        
    setForbidden(true)
    setalert({ role: "error", msg: `Some Error Occurred` })
  }
}

  return (
    <LogContext.Provider value={{start,login,alert,setalert,forgotPassword,otpverify,resetpassword,email,Signup,loading,Acesstoken,access,Forbidden}}>
        {children}
    </LogContext.Provider>
  )

}
