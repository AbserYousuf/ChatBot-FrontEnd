import React, { useContext, useState, useEffect ,lazy, Suspense} from 'react'
import { Link } from 'react-router-dom'
import LogContext from '../Contexts/LogContext'
const Spline = lazy(() => import('@splinetool/react-spline'));
const LoadingScreenSignup = () => {
  const [dots, setDots] = useState('')
  const [step, setStep] = useState(0)
  const [arrived, setArrived] = useState(false)

  const steps = [
    'Creating your account',
    'Setting up your workspace',
    'Finishing up your account',
    'Almost there',
  ]

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)
    const stepInterval = setInterval(() => {
      setStep(s => (s + 1) % steps.length)
    }, 1800)
    // Mark robot as arrived after walk-in duration
    const arriveTimer = setTimeout(() => setArrived(true), 1700)
    return () => {
      clearInterval(dotsInterval)
      clearInterval(stepInterval)
      clearTimeout(arriveTimer)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'radial-gradient(ellipse at 40% 35%, #12102a 0%, #0a0915 50%, #060510 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Sora', sans-serif",
      overflow: 'hidden',
    }}>

      {/* Stars */}
      {[...Array(60)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${(i * 13.7 + 2) % 100}%`,
          top: `${(i * 17.3 + 5) % 100}%`,
          width: `${1 + (i % 3) * 0.6}px`,
          height: `${1 + (i % 3) * 0.6}px`,
          borderRadius: '50%', background: 'white',
          opacity: 0.15 + (i % 5) * 0.08,
          animation: `tw ${2 + (i % 4)}s ease-in-out ${(i * 0.3) % 3}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Purple glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -60%)',
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Spline robot — wrapped in walking + arrived container */}
      <div style={{
        width: '380px', height: '380px',
        position: 'relative',
        marginTop: '-30px',
        animation: arrived
          ? 'bobFloat 3s ease-in-out infinite'
          : 'walkIn 1.6s cubic-bezier(0.22,1,0.36,1) forwards',
      }}>
        <Suspense fallback={null}>
          <Spline scene="https://prod.spline.design/jSIVporezCGG3feC/scene.splinecode" />
        </Suspense>
      </div>

      {/* Brand */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '18px', marginTop: '-10px',
        animation: 'fadeUp 0.6s ease 1.8s both',
        zIndex: 2,
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 18px rgba(99,102,241,0.55)',
        }}>
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
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.4px', color: 'white' }}>Serabo</div>
          <div style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '3px', color: '#a78bfa', textTransform: 'uppercase', marginTop: '1px' }}>AI</div>
        </div>
      </div>

      {/* Status text + progress bar */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <p style={{
          fontSize: '13.5px', fontWeight: '500',
          color: 'rgba(167,139,250,0.9)',
          margin: '0 0 14px', minHeight: '22px', letterSpacing: '0.2px',
        }}>
          {steps[step]}{dots}
        </p>
        <div style={{
          width: '200px', height: '2.5px',
          background: 'rgba(139,92,246,0.15)',
          borderRadius: '99px', overflow: 'hidden', margin: '0 auto',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)',
            borderRadius: '99px',
            animation: 'progressBar 3.6s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
      
        @keyframes tw {
          0%,100% { opacity:0.1; transform:scale(1); }
          50%      { opacity:0.7; transform:scale(1.4); }
        }
        @keyframes walkIn {
          0%   { transform: translateX(-480px); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateX(0px);   opacity: 1; }
        }
        @keyframes bobFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-8px); }
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
const SignupLoadingStatus = () => {
  const [dots, setDots] = useState('')
  const [step, setStep] = useState(0)
  const steps = ['Authenticating your credentials', 'Setting up your workspace', 'Loading Serabo AI', 'Almost there']
  useEffect(() => {
    const d = setInterval(() => setDots(v => v.length >= 3 ? '' : v + '.'), 400)
    const s = setInterval(() => setStep(v => (v + 1) % steps.length), 1800)
    return () => { clearInterval(d); clearInterval(s) }
  }, [])
  return (
    <div style={{ textAlign:'center', zIndex:2 }}>
      <p style={{ fontSize:'13.5px', fontWeight:'500', color:'rgba(167,139,250,0.9)', margin:'0 0 14px', minHeight:'22px', letterSpacing:'0.2px' }}>
        {steps[step]}{dots}
      </p>
      <div style={{ width:'200px', height:'2.5px', background:'rgba(139,92,246,0.15)', borderRadius:'99px', overflow:'hidden', margin:'0 auto' }}>
        <div style={{ height:'100%', background:'linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)', borderRadius:'99px', animation:'progressBar 3.6s ease-in-out infinite' }}/>
      </div>
    </div>
  )
}
/* ── Serabo Logo ── */
const SeraboLogo = () => (
  <div style={{ display:'flex', alignItems:'center', gap:'10px', justifyContent:'center', marginBottom:'28px' }}>
    <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:'linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 15px rgba(99,102,241,0.4)' }}>
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
    <div style={{ display:'flex', flexDirection:'column', lineHeight:1 }}>
      <span style={{ fontFamily:"'Sora',sans-serif", fontSize:'22px', fontWeight:'700', letterSpacing:'-0.5px', background:'linear-gradient(135deg,#1e1b4b,#4338ca)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Serabo</span>
      <span style={{ fontFamily:"'Sora',sans-serif", fontSize:'11px', fontWeight:'500', letterSpacing:'3px', color:'#8b5cf6', textTransform:'uppercase', marginTop:'1px' }}>AI</span>
    </div>
  </div>
)

/* ── ProAlert ── */
const ALERT_CONFIG = {
  error:   { bg:'#fff1f2', border:'#fda4af', bar:'#f43f5e', icon:'#f43f5e', text:'#9f1239' },
  info:    { bg:'#f0f4ff', border:'#a5b4fc', bar:'#6366f1', icon:'#6366f1', text:'#3730a3' },
  success: { bg:'#f0fdf4', border:'#86efac', bar:'#22c55e', icon:'#22c55e', text:'#14532d' },
}
const AlertIcon = ({ type }) => {
  if (type === 'success') return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
  if (type === 'error')   return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/></svg>
}
const ProAlert = ({ role, msg, onClose }) => {
  const [mounted, setMounted] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const type = ['error','success'].includes(role) ? role : 'info'
  const c = ALERT_CONFIG[type]
  useEffect(() => { const t = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(t) }, [])
  const dismiss = () => { setLeaving(true); setTimeout(onClose, 320) }
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'11px', background:c.bg, border:`1px solid ${c.border}`, borderLeft:`4px solid ${c.bar}`, borderRadius:'12px', padding:'13px 13px 13px 14px', marginBottom:'20px', opacity:mounted&&!leaving?1:0, transform:mounted&&!leaving?'translateY(0) scale(1)':'translateY(-10px) scale(0.96)', transition:'opacity 0.3s ease,transform 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>
      <span style={{ color:c.icon, flexShrink:0, marginTop:'1px' }}><AlertIcon type={type}/></span>
      <span style={{ fontSize:'13px', color:c.text, fontWeight:'500', flex:1, lineHeight:'1.55', fontFamily:"'Sora',sans-serif" }}>{msg}</span>
      <button onClick={dismiss} style={{ background:'none', border:'none', cursor:'pointer', color:c.icon, opacity:0.55, padding:'2px', borderRadius:'6px', display:'flex', alignItems:'center' }}
        onMouseEnter={e=>e.currentTarget.style.opacity='1'} onMouseLeave={e=>e.currentTarget.style.opacity='0.55'}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  )
}

/* ── Password strength ── */
const getStrength = (pw) => {
  if (!pw) return { score:0, label:'', color:'' }
  let s = 0
  if (pw.length >= 8)           s++
  if (/[A-Z]/.test(pw))        s++
  if (/[a-z]/.test(pw))        s++
  if (/[0-9]/.test(pw))        s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  const map = [
    { label:'Too short',  color:'#f43f5e' },
    { label:'Weak',       color:'#f97316' },
    { label:'Fair',       color:'#eab308' },
    { label:'Good',       color:'#22c55e' },
    { label:'Strong',     color:'#22c55e' },
    { label:'Strong 💪',  color:'#8b5cf6' },
  ]
  return { score:s, ...map[s] }
}

/* ── Eye toggle ── */
const CartoonEyes = ({ show }) => {
  const bx = show ? 3.5 : -3.5, by = show ? 1 : 0
  return (
    <svg viewBox="0 0 64 36" fill="none" style={{ width:'34px', height:'20px', display:'block' }}>
      <path d="M4 30 Q4 2 18 2 Q28 2 28 14 Q28 30 18 32 Q8 34 4 30Z" fill="white" stroke="#1e1b4b" strokeWidth="2.2" strokeLinejoin="round"/>
      <circle cx={14+bx} cy={17+by} r="6.5" fill="#1e1b4b" style={{ transition:'cx 0.35s cubic-bezier(0.34,1.56,0.64,1),cy 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}/>
      <circle cx={16.5+bx} cy={14.5+by} r="2" fill="white" style={{ transition:'cx 0.35s cubic-bezier(0.34,1.56,0.64,1),cy 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}/>
      <path d="M60 30 Q60 2 46 2 Q36 2 36 14 Q36 30 46 32 Q56 34 60 30Z" fill="white" stroke="#1e1b4b" strokeWidth="2.2" strokeLinejoin="round"/>
      <circle cx={50+bx} cy={17+by} r="6.5" fill="#1e1b4b" style={{ transition:'cx 0.35s cubic-bezier(0.34,1.56,0.64,1),cy 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}/>
      <circle cx={52.5+bx} cy={14.5+by} r="2" fill="white" style={{ transition:'cx 0.35s cubic-bezier(0.34,1.56,0.64,1),cy 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}/>
    </svg>
  )
}

export default function Signup() {
  console.log("Signup component mounted / re-rendered at:", new Date().toLocaleTimeString());
  const context = useContext(LogContext)
  const { alert, setalert, Signup ,loading} = context

  const [details, setDetails] = useState({ name:'', email:'', username:'', password:'' })
  const [confirm, setConfirm] = useState({ ConfirmPassword:'' })
  const [showPw,  setShowPw]  = useState(false)
  const [showCf,  setShowCf]  = useState(false)

  const strength = getStrength(details.password)
  const pwMatch  = confirm.ConfirmPassword.length > 0 && confirm.ConfirmPassword === details.password

  const handleChange  = (e) => setDetails({ ...details,  [e.target.name]: e.target.value })
  const confirmChange = (e) => setConfirm({ ...confirm,  [e.target.name]: e.target.value })

  const SendToSignup = () => {
    const errorset =
      details.name.trim().length < 3
        ? "Name must be at least 3 characters."
        : !/[A-Z]/.test(details.password)
        ? "Password must contain at least one uppercase letter."
        : !/[a-z]/.test(details.password)
        ? "Password must contain at least one lowercase letter."
        : !/[0-9]/.test(details.password)
        ? "Password must contain at least one number."
        : !/[^A-Za-z0-9]/.test(details.password)
        ? "Password must contain at least one special character (!@#$...)."
        : details.password !== confirm.ConfirmPassword
        ? "Passwords do not match."
        : false

    const EmailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email) ? false : "Enter a valid email address."
    const UserNameError = details.username.length < 3 ? "Username must be at least 3 characters." : details.username.length > 16 ? "Username must be at most 16 characters." : false

    const message = errorset || EmailError || UserNameError
    if (message) { setalert({ role:'error', msg:message }); return }

    Signup({ name:details.name, email:details.email, password:details.password, username:details.username })
  }

  const isDisabled = !details.name || !details.email || !details.password || !details.username || !confirm.ConfirmPassword || confirm.ConfirmPassword !== details.password

  return (
    <>
  {loading && (
  <LoadingScreenSignup />
)}
      <style>{`
    
        .signup-root {
          min-height: 100vh;
          background: #f0edff;
          background-image:
            radial-gradient(ellipse at 15% 25%, rgba(139,92,246,0.16) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 75%, rgba(99,102,241,0.13) 0%, transparent 55%);
          display: flex; align-items: center; justify-content: center;
          padding: 32px 16px; font-family: 'Sora', sans-serif;
        }
        .signup-card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 24px; padding: 40px 40px;
          width: 100%; max-width: 680px;
          box-shadow: 0 4px 6px rgba(99,102,241,0.04), 0 20px 60px rgba(99,102,241,0.11);
          animation: cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes cardIn {
          from { opacity:0; transform: translateY(24px) scale(0.97); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        .field-label { font-size:12.5px; font-weight:600; color:#475569; margin-bottom:7px; display:block; letter-spacing:0.3px; }
        .signup-input {
          width:100%; font-family:'Sora',sans-serif; font-size:14px;
          color:#1e1b4b; background:#faf9ff;
          border:1.5px solid #e2e0f0; padding:12px 44px 12px 16px;
          border-radius:12px; outline:none; box-sizing:border-box;
          transition:border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .signup-input:focus { border-color:#8b5cf6; background:#fff; box-shadow:0 0 0 3.5px rgba(139,92,246,0.12); }
        .signup-input::placeholder { color:#c4c0db; }
        .signup-input.match   { border-color:#22c55e; }
        .signup-input.nomatch { border-color:#f43f5e; }
        .eye-btn {
          position:absolute; right:11px; background:none; border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          padding:5px; border-radius:8px; transition:background 0.2s, transform 0.15s;
        }
        .eye-btn:hover { background:rgba(139,92,246,0.08); }
        .eye-btn:active { transform:scale(0.88); }
        .field-icon {
          position:absolute; right:14px; color:#c4c0db;
          display:flex; align-items:center; pointer-events:none;
        }
        .strength-bar { flex:1; height:4px; border-radius:99px; background:#e2e0f0; transition:background 0.3s ease; }
        .signup-btn {
          width:100%; padding:14px; font-family:'Sora',sans-serif;
          font-size:15px; font-weight:600; color:white; letter-spacing:0.3px;
          background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);
          border:none; border-radius:12px; cursor:pointer; margin-top:8px;
          transition:transform 0.15s, box-shadow 0.15s, filter 0.15s, opacity 0.2s;
          box-shadow:0 4px 15px rgba(99,102,241,0.35);
        }
        .signup-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 25px rgba(99,102,241,0.45); filter:brightness(1.05); }
        .signup-btn:active:not(:disabled) { transform:translateY(0); }
        .signup-btn:disabled { opacity:0.45; cursor:not-allowed; }
        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        @media(max-width:580px) { .form-grid { grid-template-columns:1fr; } .signup-card { padding:32px 24px; } }
      `}</style>

      <div className="signup-root">
        <div className="signup-card">
          <SeraboLogo/>

          {alert?.msg && (
            <ProAlert role={alert.role} msg={alert.msg} onClose={() => setalert({ role:'', msg:'' })}/>
          )}

          <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#1e1b4b', textAlign:'center', letterSpacing:'-0.4px', margin:'0 0 6px' }}>
            Create your account
          </h1>
          <p style={{ fontSize:'13.5px', color:'#94a3b8', textAlign:'center', margin:'0 0 28px', lineHeight:'1.6' }}>
            Join Serabo AI and start thinking smarter today.
          </p>

          <div className="form-grid">
            {/* Name */}
            <div>
              <label className="field-label">Full Name</label>
              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                <input name="name" type="text" value={details.name} onChange={handleChange}
                  className="signup-input" placeholder="Enter your name" autoComplete="name"/>
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                </span>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="field-label">Username</label>
              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                <input name="username" type="text" value={details.username} onChange={handleChange}
                  className="signup-input" placeholder="e.g. serabo_dev" autoComplete="username"/>
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
              </div>
            </div>

            {/* Email — full width */}
            <div style={{ gridColumn:'1 / -1' }}>
              <label className="field-label">Email Address</label>
              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                <input name="email" type="email" value={details.email} onChange={handleChange}
                  className="signup-input" placeholder="you@example.com" autoComplete="email"/>
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="field-label">Password</label>
              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                <input name="password" type={showPw ? 'text' : 'password'} value={details.password} onChange={handleChange}
                  className="signup-input" placeholder="Create a password" autoComplete="new-password"/>
                <button className="eye-btn" type="button" onClick={() => setShowPw(p => !p)} tabIndex={-1}>
                  <CartoonEyes show={showPw}/>
                </button>
              </div>
              {/* Strength bars */}
              {details.password.length > 0 && (
                <>
                  <div style={{ display:'flex', gap:'5px', marginTop:'8px' }}>
                    {[0,1,2,3,4].map(i => (
                      <div key={i} className="strength-bar" style={{ background: i < strength.score ? strength.color : '#e2e0f0' }}/>
                    ))}
                  </div>
                  <p style={{ fontSize:'11.5px', fontWeight:'600', color:strength.color, marginTop:'4px', fontFamily:"'Sora',sans-serif" }}>{strength.label}</p>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="field-label">Confirm Password</label>
              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                <input name="ConfirmPassword" type={showCf ? 'text' : 'password'} value={confirm.ConfirmPassword} onChange={confirmChange}
                  className={`signup-input${confirm.ConfirmPassword.length > 0 ? (pwMatch ? ' match' : ' nomatch') : ''}`}
                  placeholder="Repeat your password" autoComplete="new-password"
                  onKeyDown={e => e.key === 'Enter' && !isDisabled && SendToSignup()}/>
                <button className="eye-btn" type="button" onClick={() => setShowCf(p => !p)} tabIndex={-1}>
                  <CartoonEyes show={showCf}/>
                </button>
              </div>
              {confirm.ConfirmPassword.length > 0 && (
                <p style={{ fontSize:'11.5px', fontWeight:'600', marginTop:'4px', fontFamily:"'Sora',sans-serif", color: pwMatch ? '#22c55e' : '#f43f5e' }}>
                  {pwMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>
          </div>

          {/* Password rules checklist */}
          {details.password.length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px 20px', marginTop:'14px', padding:'14px 16px', background:'#f8f7ff', borderRadius:'12px', border:'1px solid rgba(139,92,246,0.1)' }}>
              {[
                { rule: details.password.length >= 8,           label:'8+ characters' },
                { rule: /[A-Z]/.test(details.password),         label:'Uppercase' },
                { rule: /[a-z]/.test(details.password),         label:'Lowercase' },
                { rule: /[0-9]/.test(details.password),         label:'Number' },
                { rule: /[^A-Za-z0-9]/.test(details.password),  label:'Special char' },
              ].map(({ rule, label }) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                  <span style={{ fontSize:'13px', color: rule ? '#22c55e' : '#c4c0db' }}>{rule ? '✓' : '○'}</span>
                  <span style={{ fontSize:'12px', fontFamily:"'Sora',sans-serif", color: rule ? '#22c55e' : '#94a3b8', fontWeight: rule ? '600' : '400', transition:'color 0.2s' }}>{label}</span>
                </div>
              ))}
            </div>
          )}

          <button type="button" className="signup-btn" onClick={SendToSignup} disabled={isDisabled} style={{ marginTop:'24px' }}>
            Create account →
          </button>

          <div style={{ display:'flex', alignItems:'center', gap:'12px', margin:'20px 0 0' }}>
            <div style={{ flex:1, height:'1px', background:'#ede9fe' }}/>
            <span style={{ fontSize:'11.5px', color:'#c4c0db', fontFamily:"'Sora',sans-serif", fontWeight:'500', letterSpacing:'0.5px' }}>ALREADY HAVE AN ACCOUNT?</span>
            <div style={{ flex:1, height:'1px', background:'#ede9fe' }}/>
          </div>

          <Link to="/login" style={{
            display:'flex', alignItems:'center', justifyContent:'center', gap:'6px',
            marginTop:'16px', padding:'12px',
            borderRadius:'12px', border:'1.5px solid rgba(99,102,241,0.22)',
            fontFamily:"'Sora',sans-serif", fontSize:'14px', fontWeight:'600',
            color:'#4338ca', textDecoration:'none',
            background:'rgba(99,102,241,0.05)',
            transition:'background 0.18s, border-color 0.18s',
          }}
            onMouseEnter={e=>{ e.currentTarget.style.background='rgba(99,102,241,0.1)'; e.currentTarget.style.borderColor='rgba(99,102,241,0.4)' }}
            onMouseLeave={e=>{ e.currentTarget.style.background='rgba(99,102,241,0.05)'; e.currentTarget.style.borderColor='rgba(99,102,241,0.22)' }}
          >
            Sign in instead
          </Link>
        </div>
      </div>
    </>
  )
}