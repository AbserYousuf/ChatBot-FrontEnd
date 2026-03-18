import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import LogContext from '../Contexts/LogContext'
import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

const SeraboLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '32px' }}>
    <div style={{
      width: '42px', height: '42px', borderRadius: '12px',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/>
        <circle cx="12" cy="4"  r="2" fill="white" opacity="0.6"/>
        <circle cx="12" cy="20" r="2" fill="white" opacity="0.6"/>
        <circle cx="4"  cy="12" r="2" fill="white" opacity="0.6"/>
        <circle cx="20" cy="12" r="2" fill="white" opacity="0.6"/>
        <line x1="12" y1="6"  x2="12" y2="9"  stroke="white" strokeWidth="1.5" opacity="0.7"/>
        <line x1="12" y1="15" x2="12" y2="18" stroke="white" strokeWidth="1.5" opacity="0.7"/>
        <line x1="6"  y1="12" x2="9"  y2="12" stroke="white" strokeWidth="1.5" opacity="0.7"/>
        <line x1="15" y1="12" x2="18" y2="12" stroke="white" strokeWidth="1.5" opacity="0.7"/>
      </svg>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <span style={{
        fontFamily: "'Sora', sans-serif", fontSize: '22px', fontWeight: '700',
        letterSpacing: '-0.5px',
        background: 'linear-gradient(135deg, #1e1b4b, #4338ca)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>Serabo</span>
      <span style={{
        fontFamily: "'Sora', sans-serif", fontSize: '11px', fontWeight: '500',
        letterSpacing: '3px', color: '#8b5cf6', textTransform: 'uppercase', marginTop: '1px'
      }}>AI</span>
    </div>
  </div>
)

const CartoonEyes = ({ show }) => {
  const ballX = show ? 3.5 : -3.5
  const ballY = show ? 1   : 0
  return (
    <svg viewBox="0 0 64 36" fill="none" style={{ width: '36px', height: '22px', display: 'block' }}>
      <path d="M4 30 Q4 2 18 2 Q28 2 28 14 Q28 30 18 32 Q8 34 4 30Z" fill="white" stroke="#1e1b4b" strokeWidth="2.2" strokeLinejoin="round"/>
      <circle cx={14 + ballX} cy={17 + ballY} r="6.5" fill="#1e1b4b" style={{ transition: 'cx 0.35s cubic-bezier(0.34,1.56,0.64,1), cy 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}/>
      <circle cx={16.5 + ballX} cy={14.5 + ballY} r="2" fill="white" style={{ transition: 'cx 0.35s cubic-bezier(0.34,1.56,0.64,1), cy 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}/>
      <circle cx={12.5 + ballX} cy={20 + ballY} r="1" fill="white" opacity="0.6" style={{ transition: 'cx 0.35s cubic-bezier(0.34,1.56,0.64,1), cy 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}/>
      <path d="M60 30 Q60 2 46 2 Q36 2 36 14 Q36 30 46 32 Q56 34 60 30Z" fill="white" stroke="#1e1b4b" strokeWidth="2.2" strokeLinejoin="round"/>
      <circle cx={50 + ballX} cy={17 + ballY} r="6.5" fill="#1e1b4b" style={{ transition: 'cx 0.35s cubic-bezier(0.34,1.56,0.64,1), cy 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}/>
      <circle cx={52.5 + ballX} cy={14.5 + ballY} r="2" fill="white" style={{ transition: 'cx 0.35s cubic-bezier(0.34,1.56,0.64,1), cy 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}/>
      <circle cx={48.5 + ballX} cy={20 + ballY} r="1" fill="white" opacity="0.6" style={{ transition: 'cx 0.35s cubic-bezier(0.34,1.56,0.64,1), cy 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}/>
    </svg>
  )
}

const ALERT_CONFIG = {
  error:   { bg: '#fff1f2', border: '#fda4af', bar: '#f43f5e', icon: '#f43f5e', text: '#9f1239' },
  info:    { bg: '#f0f4ff', border: '#a5b4fc', bar: '#6366f1', icon: '#6366f1', text: '#3730a3' },
  success: { bg: '#f0fdf4', border: '#86efac', bar: '#22c55e', icon: '#22c55e', text: '#14532d' },
  warning: { bg: '#fffbeb', border: '#fcd34d', bar: '#f59e0b', icon: '#f59e0b', text: '#78350f' },
}
const AlertIcon = ({ type }) => {
  if (type === 'success') return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
  if (type === 'error')   return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
  if (type === 'warning') return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/></svg>
}
const ProAlert = ({ role, msg, onClose }) => {
  const [mounted, setMounted] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const type = ['error','success','warning'].includes(role) ? role : 'info'
  const c = ALERT_CONFIG[type]
  useEffect(() => { const t = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(t) }, [])
  const dismiss = () => { setLeaving(true); setTimeout(onClose, 320) }
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'11px', background:c.bg, border:`1px solid ${c.border}`, borderLeft:`4px solid ${c.bar}`, borderRadius:'12px', padding:'13px 13px 13px 14px', marginBottom:'20px', fontFamily:"'Sora',sans-serif", opacity:mounted&&!leaving?1:0, transform:mounted&&!leaving?'translateY(0) scale(1)':'translateY(-10px) scale(0.96)', transition:'opacity 0.3s ease,transform 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>
      <span style={{ color:c.icon, flexShrink:0, marginTop:'1px' }}><AlertIcon type={type}/></span>
      <span style={{ fontSize:'13px', color:c.text, fontWeight:'500', flex:1, lineHeight:'1.55' }}>{msg}</span>
      <button onClick={dismiss} style={{ background:'none', border:'none', cursor:'pointer', color:c.icon, opacity:0.55, padding:'2px', borderRadius:'6px', display:'flex', alignItems:'center', flexShrink:0, transition:'opacity 0.15s,transform 0.15s' }}
        onMouseEnter={e=>{ e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='scale(1.1)' }}
        onMouseLeave={e=>{ e.currentTarget.style.opacity='0.55'; e.currentTarget.style.transform='scale(1)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  )
}

/* ── Professional Loading Screen ── */
const LoadingScreen = () => {
  const [dots, setDots] = useState('')
  const [step, setStep] = useState(0)

  const steps = [
    'Authenticating your credentials',
    'Setting up your workspace',
    'Loading Serabo AI',
    'Almost there',
  ]

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)
    const stepInterval = setInterval(() => {
      setStep(s => (s + 1) % steps.length)
    }, 1800)
    return () => { clearInterval(dotsInterval); clearInterval(stepInterval) }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'radial-gradient(ellipse at 40% 35%, #12102a 0%, #0a0915 50%, #060510 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Sora', sans-serif",
      overflow: 'hidden',
    }}>
      {/* Star dots — matching space feel of cat bg */}
      {[...Array(60)].map((_,i) => (
        <div key={i} style={{
          position:'absolute',
          left:`${(i*13.7+2)%100}%`,
          top:`${(i*17.3+5)%100}%`,
          width:`${1+(i%3)*0.6}px`, height:`${1+(i%3)*0.6}px`,
          borderRadius:'50%', background:'white',
          opacity: 0.15+(i%5)*0.08,
          animation:`tw ${2+(i%4)}s ease-in-out ${(i*0.3)%3}s infinite`,
          pointerEvents:'none',
        }}/>
      ))}

      {/* Purple glow behind cat */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-60%)', width:'520px', height:'520px', borderRadius:'50%', background:'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)', pointerEvents:'none' }}/>

      {/* Spline 3D robot cat — larger */}
      <div style={{
        width: '520px', height: '520px',
        position: 'relative',
        marginTop: '-40px',
        animation: 'floatIn 0.9s cubic-bezier(0.34,1.56,0.64,1) both',
      }}>
        <Spline scene="https://prod.spline.design/R6-AopCWBZPD8x-V/scene.splinecode" />
      </div>

      {/* Brand */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'18px', marginTop:'-20px', animation:'fadeUp 0.6s ease 0.3s both' }}>
        <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 18px rgba(99,102,241,0.55)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/>
            <circle cx="12" cy="4" r="1.8" fill="white" opacity="0.6"/>
            <circle cx="12" cy="20" r="1.8" fill="white" opacity="0.6"/>
            <circle cx="4" cy="12" r="1.8" fill="white" opacity="0.6"/>
            <circle cx="20" cy="12" r="1.8" fill="white" opacity="0.6"/>
            <line x1="12" y1="5.8" x2="12" y2="9" stroke="white" strokeWidth="1.3" opacity="0.7"/>
            <line x1="12" y1="15" x2="12" y2="18.2" stroke="white" strokeWidth="1.3" opacity="0.7"/>
            <line x1="5.8" y1="12" x2="9" y2="12" stroke="white" strokeWidth="1.3" opacity="0.7"/>
            <line x1="15" y1="12" x2="18.2" y2="12" stroke="white" strokeWidth="1.3" opacity="0.7"/>
          </svg>
        </div>
        <div style={{ lineHeight:1 }}>
          <div style={{ fontSize:'20px', fontWeight:'700', letterSpacing:'-0.4px', color:'white' }}>Serabo</div>
          <div style={{ fontSize:'9px', fontWeight:'600', letterSpacing:'3px', color:'#a78bfa', textTransform:'uppercase', marginTop:'1px' }}>AI</div>
        </div>
      </div>

      {/* Status text */}
      <div style={{ textAlign:'center', animation:'fadeUp 0.6s ease 0.5s both' }}>
        <p style={{ fontSize:'13.5px', fontWeight:'500', color:'rgba(167,139,250,0.9)', margin:'0 0 14px', minHeight:'22px', letterSpacing:'0.2px' }}>
          {steps[step]}{dots}
        </p>

        {/* Progress bar */}
        <div style={{ width:'200px', height:'2.5px', background:'rgba(139,92,246,0.15)', borderRadius:'99px', overflow:'hidden', margin:'0 auto' }}>
          <div style={{ height:'100%', background:'linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)', borderRadius:'99px', animation:'progressBar 3.6s ease-in-out infinite' }}/>
        </div>
      </div>

      <style>{`
  
        @keyframes tw { 0%,100%{opacity:0.1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.4)} }
        @keyframes floatIn {
          from { opacity:0; transform: translateY(40px) scale(0.88); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(16px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes progressBar {
          0%   { width: 0%;  margin-left: 0; }
          50%  { width: 70%; margin-left: 15%; }
          100% { width: 0%;  margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}

export default function Login() {
  const context = useContext(LogContext)
  const [show, setShow] = useState(false)
  const { login, alert, setalert, loading } = context
  const [payload, setpayload] = useState({ EmOrUser: '', password: '' })

  const HandleLogin = (e) => setpayload({ ...payload, [e.target.name]: e.target.value })

  const sendToLogin = () => {
    if (!payload.EmOrUser || !payload.password) {
      setalert({ role: 'info', msg: 'Please fill in all fields to continue.' })
      return
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.EmOrUser)
    const loginpayload = isEmail
      ? { email: payload.EmOrUser, password: payload.password }
      : { username: payload.EmOrUser, password: payload.password }
    login(loginpayload)
  }

  /* Show loading screen while logging in */
  if (loading) return <LoadingScreen />

  return (
    <>
      <style>{`
      
        .login-root {
          min-height: 100vh;
          background: #f5f3ff;
          background-image:
            radial-gradient(ellipse at 20% 20%, rgba(139,92,246,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(99,102,241,0.10) 0%, transparent 60%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 24px 16px; font-family: 'Sora', sans-serif;
        }
        .login-card {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 24px; padding: 40px 36px;
          width: 100%; max-width: 440px;
          box-shadow: 0 4px 6px rgba(99,102,241,0.04), 0 20px 60px rgba(99,102,241,0.10);
          animation: cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes cardIn {
          from { opacity:0; transform: translateY(24px) scale(0.97); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        .field-label { font-size: 12.5px; font-weight: 600; color: #475569; margin-bottom: 7px; display: block; letter-spacing: 0.3px; }
        .login-input {
          width: 100%; font-family: 'Sora', sans-serif; font-size: 14px;
          color: #1e1b4b; background: #faf9ff;
          border: 1.5px solid #e2e0f0; padding: 12px 52px 12px 16px;
          border-radius: 12px; outline: none; box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .login-input:focus { border-color: #8b5cf6; background: #fff; box-shadow: 0 0 0 3.5px rgba(139,92,246,0.12); }
        .login-input::placeholder { color: #c4c0db; }
        .eye-btn {
          position: absolute; right: 10px; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          padding: 5px; border-radius: 8px; transition: background 0.2s, transform 0.15s;
        }
        .eye-btn:hover { background: rgba(139,92,246,0.08); }
        .eye-btn:active { transform: scale(0.88); }
        .signin-btn {
          width: 100%; padding: 13px; font-family: 'Sora', sans-serif;
          font-size: 14.5px; font-weight: 600; color: white; letter-spacing: 0.3px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none; border-radius: 12px; cursor: pointer; margin-top: 24px;
          transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
          box-shadow: 0 4px 15px rgba(99,102,241,0.35);
        }
        .signin-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(99,102,241,0.45); filter: brightness(1.05); }
        .signin-btn:active { transform: translateY(0); }
        .forgot-link { font-size: 12.5px; font-weight: 600; color: #8b5cf6; text-decoration: none; transition: color 0.2s; }
        .forgot-link:hover { color: #6d28d9; }
        .register-text { font-size: 13px; color: #94a3b8; text-align: center; margin-top: 20px; }
        .register-text a { color: #8b5cf6; font-weight: 600; text-decoration: none; }
        .register-text a:hover { color: #6d28d9; text-decoration: underline; }
        .divider { display: flex; align-items: center; gap: 12px; margin: 24px 0 0; }
        .divider-line { flex: 1; height: 1px; background: #ede9fe; }
        .divider-text { font-size: 11.5px; color: #c4c0db; font-weight: 500; letter-spacing: 0.5px; }
      `}</style>

      <div className="login-root">
        <div className="login-card">
          <SeraboLogo />

          {alert?.msg && (
            <ProAlert role={alert.role} msg={alert.msg} onClose={() => setalert({ role:'', msg:'' })}/>
          )}

          <h1 style={{ fontSize:'26px', fontWeight:'700', color:'#1e1b4b', textAlign:'center', letterSpacing:'-0.5px', margin:'0 0 6px' }}>
            Welcome back
          </h1>
          <p style={{ fontSize:'13px', color:'#94a3b8', textAlign:'center', margin:'0 0 32px' }}>
            Sign in to your Serabo AI account
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
            <div>
              <label className="field-label">Email or Username</label>
              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                <input name="EmOrUser" type="text" required value={payload.EmOrUser} onChange={HandleLogin}
                  className="login-input" placeholder="Enter email or username" autoComplete="username"/>
                <span style={{ position:'absolute', right:'14px', color:'#c4c0db', display:'flex', pointerEvents:'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                </span>
              </div>
            </div>

            <div>
              <label className="field-label">Password</label>
              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                <input name="password" value={payload.password} onChange={HandleLogin}
                  type={show?'text':'password'} required className="login-input"
                  placeholder="Enter your password" autoComplete="current-password"/>
                <button className="eye-btn" type="button" onClick={() => setShow(p=>!p)} tabIndex={-1}>
                  <CartoonEyes show={show}/>
                </button>
              </div>
            </div>
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'10px' }}>
            <Link className="forgot-link" to='/forgot'>Forgot password?</Link>
          </div>

          <button type="button" className="signin-btn" onClick={sendToLogin}>
            Sign in →
          </button>

          <div className="divider">
            <div className="divider-line"/>
            <span className="divider-text">NEW HERE?</span>
            <div className="divider-line"/>
          </div>

          <p className="register-text">
            Don't have an account? <Link to='/signup'>Create one free</Link>
          </p>
        </div>
      </div>
    </>
  )
}