import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LogContext from '../Contexts/LogContext'

/* ── Serabo Logo ── */
const SeraboLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '28px' }}>
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

/* ── ProAlert ── */
const ALERT_CONFIG = {
  error:   { bg: '#fff1f2', border: '#fda4af', bar: '#f43f5e', icon: '#f43f5e', text: '#9f1239' },
  info:    { bg: '#f0f4ff', border: '#a5b4fc', bar: '#6366f1', icon: '#6366f1', text: '#3730a3' },
  success: { bg: '#f0fdf4', border: '#86efac', bar: '#22c55e', icon: '#22c55e', text: '#14532d' },
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
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '11px',
      background: c.bg, border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.bar}`, borderRadius: '12px',
      padding: '13px 13px 13px 14px', marginBottom: '20px',
      opacity: mounted && !leaving ? 1 : 0,
      transform: mounted && !leaving ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.96)',
      transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      <span style={{ color: c.icon, flexShrink: 0, marginTop: '1px' }}><AlertIcon type={type}/></span>
      <span style={{ fontSize: '13px', color: c.text, fontWeight: '500', flex: 1, lineHeight: '1.55' }}>{msg}</span>
      <button onClick={dismiss} style={{ background:'none', border:'none', cursor:'pointer', color:c.icon, opacity:0.55, padding:'2px', borderRadius:'6px', display:'flex', alignItems:'center' }}
        onMouseEnter={e=>e.currentTarget.style.opacity='1'} onMouseLeave={e=>e.currentTarget.style.opacity='0.55'}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  )
}

/* ── Cartoon Eyes for password toggle ── */
const CartoonEyes = ({ show }) => {
  const ballX = show ? 3.5 : -3.5
  const ballY = show ? 1 : 0
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

/* ── Password strength checker ── */
const getStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' }
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const map = [
    { label: 'Too short',  color: '#f43f5e' },
    { label: 'Weak',       color: '#f97316' },
    { label: 'Fair',       color: '#eab308' },
    { label: 'Good',       color: '#22c55e' },
    { label: 'Strong 💪',  color: '#8b5cf6' },
  ]
  return { score, ...map[score] }
}

export default function Reset() {
  const context = useContext(LogContext)
  const { alert, setalert, resetpassword ,start} = context
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [showCf, setShowCf]     = useState(false)
  const strength = getStrength(password)
  const match = confirm.length > 0 && password === confirm

  const Send = () => {
    if (!password.trim()) {
      setalert({ role: 'info', msg: 'Please enter a new password.' })
      return
    }
    const isvalidpassword = password.length<8?
    "Password must be at least 8 characters.":
    !/[A-Z]/.test(password)?"Password must contain at least one uppercase letter." :
     !/[a-z]/.test(password)?"Password must contain at least one lowercase letter.":
    !/[^A-Za-z0-9]/.test(password)?"Password must contain at least one special character (!@#$...).":(password !== confirm)?"Passwords do not match" :false
    if(isvalidpassword){
        setalert({
            role:"error",
            msg:isvalidpassword
        })
        return
    }
    resetpassword(password)
  }

  return (
    <>
      <style>{`
     
        .reset-root {
          min-height: 100vh;
          background: #f0edff;
          background-image:
            radial-gradient(ellipse at 15% 25%, rgba(139,92,246,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 75%, rgba(99,102,241,0.15) 0%, transparent 55%);
          display: flex; align-items: center; justify-content: center;
          padding: 24px 16px; font-family: 'Sora', sans-serif;
        }
        .reset-card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 24px; padding: 40px 36px;
          width: 100%; max-width: 420px;
          box-shadow: 0 4px 6px rgba(99,102,241,0.04), 0 20px 60px rgba(99,102,241,0.12);
          animation: cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes cardIn {
          from { opacity:0; transform: translateY(24px) scale(0.97); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        .field-label { font-size: 12.5px; font-weight: 600; color: #475569; margin-bottom: 7px; display: block; letter-spacing: 0.3px; }
        .reset-input {
          width: 100%; font-family: 'Sora', sans-serif; font-size: 14px;
          color: #1e1b4b; background: #faf9ff;
          border: 1.5px solid #e2e0f0; padding: 12px 52px 12px 16px;
          border-radius: 12px; outline: none; box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .reset-input:focus { border-color: #8b5cf6; background: #fff; box-shadow: 0 0 0 3.5px rgba(139,92,246,0.12); }
        .reset-input::placeholder { color: #c4c0db; }
        .reset-input.match  { border-color: #22c55e; }
        .reset-input.nomatch { border-color: #f43f5e; }

        .eye-btn {
          position: absolute; right: 11px; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          padding: 5px; border-radius: 8px; transition: background 0.2s, transform 0.15s;
        }
        .eye-btn:hover { background: rgba(139,92,246,0.08); }
        .eye-btn:active { transform: scale(0.88); }

        /* strength bars */
        .strength-bars { display: flex; gap: 5px; margin-top: 10px; }
        .strength-bar {
          flex: 1; height: 4px; border-radius: 99px;
          background: #e2e0f0;
          transition: background 0.3s ease;
        }

        .reset-btn {
          width: 100%; padding: 13px; font-family: 'Sora', sans-serif;
          font-size: 14.5px; font-weight: 600; color: white; letter-spacing: 0.3px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none; border-radius: 12px; cursor: pointer; margin-top: 24px;
          transition: transform 0.15s, box-shadow 0.15s, filter 0.15s, opacity 0.2s;
          box-shadow: 0 4px 15px rgba(99,102,241,0.35);
        }
        .reset-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(99,102,241,0.45); filter: brightness(1.05); }
        .reset-btn:active:not(:disabled) { transform: translateY(0); }
        .reset-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .back-link {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          font-size: 13px; font-weight: 500; color: #8b5cf6; text-decoration: none;
          margin-top: 20px; transition: color 0.18s, gap 0.2s;
        }
        .back-link:hover { color: #6d28d9; gap: 10px; }

        .key-wrap {
          width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 20px;
          background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.14));
          border: 1.5px solid rgba(139,92,246,0.22);
          display: flex; align-items: center; justify-content: center;
        }
      `}</style>

      <div className="reset-root">
        <div className="reset-card">
          <SeraboLogo />

          {alert?.msg && (
            <ProAlert
              role={alert.role}
              msg={alert.msg}
              onClose={() => setalert({ role: '', msg: '' })}
            />
          )}

          {/* Header icon */}
          <div className="key-wrap">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e1b4b', textAlign: 'center', letterSpacing: '-0.4px', margin: '0 0 8px' }}>
            Reset your password
          </h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', textAlign: 'center', margin: '0 0 28px', lineHeight: '1.6' }}>
            Choose a strong new password for your account.
          </p>

          {/* New password */}
          <div style={{ marginBottom: '18px' }}>
            <label className="field-label">New Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="reset-input"
                placeholder="Enter new password"
                autoComplete="new-password"
              />
              <button className="eye-btn" type="button" onClick={() => setShowPw(p => !p)} tabIndex={-1} >
                <CartoonEyes show={showPw} />
              </button>
            </div>

            {/* Strength bars */}
            {password.length > 0 && (
              <>
                <div className="strength-bars">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="strength-bar" style={{
                      background: i < strength.score ? strength.color : '#e2e0f0'
                    }}/>
                  ))}
                </div>
                <p style={{ fontSize: '11.5px', fontWeight: '600', color: strength.color, marginTop: '5px', letterSpacing: '0.2px' }}>
                  {strength.label}
                </p>
              </>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="field-label">Confirm Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showCf ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className={`reset-input${confirm.length > 0 ? (match ? ' match' : ' nomatch') : ''}`}
                placeholder="Confirm new password"
                autoComplete="new-password"
                onKeyDown={e => e.key === 'Enter' && Send()}
              />
              <button className="eye-btn" type="button" onClick={() => setShowCf(p => !p)} tabIndex={-1}>
                <CartoonEyes show={showCf} />
              </button>
            </div>
            {confirm.length > 0 && (
              <p style={{ fontSize: '11.5px', fontWeight: '600', marginTop: '5px',
                color: match ? '#22c55e' : '#f43f5e' }}>
                {match ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}
          </div>

          <button
            type="button"
            className="reset-btn"
            onClick={Send}
            disabled={!password || !confirm || !match || strength.score < 1}
          >
           {!start?" Reset password →":"Please Wait..."}
          </button>

          <Link to="/login" className="back-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Sign in
          </Link>
        </div>
      </div>
    </>
  )
}