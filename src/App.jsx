import './index.css'
import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Chat from './Components/chat'
import Login from './Components/Login'
import Forgot from './Components/Forgot'
import Protected from './ProtectedRoute/Protected'
import Navbar from './Components/Navbar'
import Otp from './Components/Otp'
import Reset from './Components/Reset'
import Home from './Components/Home'
import Signup from './Components/Signup'
import Public from './PublicRoute/Public'
import Access from './AcessRoute/Acess'
import Forbidden from './ForbiddenRoute/Forbidden'
import NotFound from './Components/NotFound'
import ErrorRoute from './ErrorRoute/ErrorRoute'
export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('LoginToken')
    if (token) {
      localStorage.setItem('lastRoute', '/chat')
    }
  }, [location])
  useEffect(() => {
    const token = localStorage.getItem('LoginToken')
    const lastRoute = localStorage.getItem('lastRoute')
    if (token && lastRoute) {
      navigate(lastRoute)
    }
  }, []) 
  useEffect(() => {
    const token = localStorage.getItem('LoginToken')
    if (!token) return
  
    const ACTIVITY_TIMEOUT = 60 * 60 * 1000
    const CHECK_INTERVAL   = 60 * 1000
    let lastUpdate = 0
    let active = true
  
    // ✅ Step 1 — check if already expired on mount
    const existingLastActive = parseInt(localStorage.getItem('lastActive') || '0')
    if (existingLastActive && Date.now() - existingLastActive > ACTIVITY_TIMEOUT) {
      localStorage.removeItem('LoginToken')
      localStorage.removeItem('lastRoute')
      localStorage.removeItem('lastActive')
      navigate('/login')
      return
    }
  
    // ✅ Step 2 — only set lastActive if first time
    if (!existingLastActive) {
      localStorage.setItem('lastActive', Date.now())
    }
    // if existingLastActive exists → keep it as is
    // don't reset it on every mount!
  
    const updateActivity = () => {
      const now = Date.now()
      if (now - lastUpdate > 5000) {
        localStorage.setItem('lastActive', now)
        lastUpdate = now
      }
    }
  
    const checkActivity = () => {
      if (!active) return
      const lastActive = parseInt(localStorage.getItem('lastActive') || '0')
      if (Date.now() - lastActive > ACTIVITY_TIMEOUT) {
        cleanup()
        localStorage.removeItem('LoginToken')
        localStorage.removeItem('lastRoute')
        localStorage.removeItem('lastActive')
        navigate('/login')
      }
    }
  
    const events = ['click', 'mousemove', 'mousedown', 'scroll', 'keydown']
    events.forEach(e => window.addEventListener(e, updateActivity))
    const interval = setInterval(checkActivity, CHECK_INTERVAL)
  
    const cleanup = () => {
      active = false
      clearInterval(interval)
      events.forEach(e => window.removeEventListener(e, updateActivity))
    }
  
    return cleanup
  }, [navigate])



  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/'       element={<Public><Home/></Public>}/>
        <Route path='/signup' element={<Public><Signup/></Public>}/>
        <Route path='/login'  element={<Public><Login/></Public>}/>
        <Route path='/chat'   element={<Access><Chat/></Access>}/>
        <Route path='/forgot' element={<Public><Forgot/></Public>}/>
        <Route path='/otp'    element={<Protected><Otp/></Protected>}/>
        <Route path='/reset'  element={<Forbidden><Reset/></Forbidden>}/>
      
        <Route path='*'    element={<ErrorRoute><NotFound/> </ErrorRoute>}/>
        
      </Routes>
    </>
  )
  
}