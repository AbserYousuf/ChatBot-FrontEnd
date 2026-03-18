import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import LogContext from '../Contexts/LogContext'

/* ── Floating ??? Background ── */
const FloatingQmarks = () => {
  const marks = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 17.3) % 90}%`,
    top: `${5 + (i * 23.7) % 88}%`,
    size: 18 + (i * 7) % 38,
    delay: (i * 0.47) % 5,
    duration: 5 + (i * 1.3) % 6,
    opacity: 0.07 + (i * 0.018) % 0.11,
    rotate: (i * 37) % 360,
  }))

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {marks.map(m => (
        <div
          key={m.id}
          style={{
            position: 'absolute',
            left: m.left, top: m.top,
            fontSize: `${m.size}px`,
            fontFamily: "'Sora', sans-serif",
            fontWeight: '700',
            color: '#6366f1',
            opacity: m.opacity,
            animation: `floatQ ${m.duration}s ease-in-out ${m.delay}s infinite`,
            transform: `rotate(${m.rotate}deg)`,
            userSelect: 'none',
          }}
        >?</div>
      ))}
      <style>{`
        @keyframes floatQ {
          0%   { transform: translateY(0px)   rotate(var(--r, 0deg)) scale(1); }
          33%  { transform: translateY(-18px) rotate(calc(var(--r, 0deg) + 8deg)) scale(1.05); }
          66%  { transform: translateY(-8px)  rotate(calc(var(--r, 0deg) - 5deg)) scale(0.97); }
          100% { transform: translateY(0px)   rotate(var(--r, 0deg)) scale(1); }
        }
      `}</style>
    </div>
  )
}

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

/* ── Shatter pieces config ── */
// 12 irregular polygon pieces that tile the card area
const PIECES = [
  { id:0,  clip:'polygon(0% 0%, 42% 0%, 35% 28%, 0% 22%)',          tx:-160, ty:-130, r:-28 },
  { id:1,  clip:'polygon(42% 0%, 75% 0%, 68% 32%, 35% 28%)',         tx:20,   ty:-170, r:15  },
  { id:2,  clip:'polygon(75% 0%, 100% 0%, 100% 18%, 68% 32%)',        tx:180,  ty:-120, r:32  },
  { id:3,  clip:'polygon(0% 22%, 35% 28%, 28% 55%, 0% 50%)',          tx:-200, ty:-20,  r:-40 },
  { id:4,  clip:'polygon(35% 28%, 68% 32%, 60% 58%, 28% 55%)',        tx:-15,  ty:-60,  r:10  },
  { id:5,  clip:'polygon(68% 32%, 100% 18%, 100% 52%, 60% 58%)',      tx:210,  ty:10,   r:35  },
  { id:6,  clip:'polygon(0% 50%, 28% 55%, 22% 78%, 0% 75%)',          tx:-185, ty:80,   r:-25 },
  { id:7,  clip:'polygon(28% 55%, 60% 58%, 52% 82%, 22% 78%)',        tx:-10,  ty:90,   r:-8  },
  { id:8,  clip:'polygon(60% 58%, 100% 52%, 100% 78%, 52% 82%)',      tx:195,  ty:70,   r:42  },
  { id:9,  clip:'polygon(0% 75%, 22% 78%, 18% 100%, 0% 100%)',        tx:-150, ty:160,  r:-35 },
  { id:10, clip:'polygon(22% 78%, 52% 82%, 48% 100%, 18% 100%)',      tx:-30,  ty:175,  r:12  },
  { id:11, clip:'polygon(52% 82%, 100% 78%, 100% 100%, 48% 100%)',    tx:160,  ty:155,  r:30  },
]

export default function Forgot() {
  const [email, setEmail] = useState('')
 
  const [shatter, setShatter] = useState(false)   // exploding
  const [rebuild, setRebuild] = useState(false)   // reassembling
  const [hidden, setHidden]   = useState(false)   // fully gone mid-animation
  const context = useContext(LogContext)
  const { alert, setalert, forgotPassword,start} = context
  const cardRef = useRef(null)

  const triggerShatter = () => {
    setShatter(true)
    // Hide the real card after pieces fly away
    setTimeout(() => setHidden(true), 600)
    // Start rebuild after 3s total
    setTimeout(() => {
      setHidden(false)
      setShatter(false)
      setRebuild(true)
      setTimeout(() => setRebuild(false), 900)
    }, 3000)
  }

  const SendToForgot = () => {
    if (!email.trim()) {
      triggerShatter()
      setalert({ role: 'error', msg: 'Please enter your email — the form broke from emptiness! 😅' })
      return
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValid) {
      setalert({ role: 'error', msg: 'Please enter a valid email address.' })
      return
    }
    forgotPassword(email)
  
  }

  const cardVisible = !hidden

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .forgot-root {
          min-height: 100vh;
          background: #f0edff;
          background-image:
            radial-gradient(ellipse at 15% 25%, rgba(139,92,246,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 75%, rgba(99,102,241,0.15) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.08) 0%, transparent 70%);
          display: flex; align-items: center; justify-content: center;
          padding: 24px 16px; font-family: 'Sora', sans-serif;
          position: relative; overflow: hidden;
        }

        /* ── card base ── */
        .forgot-card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.18);
          border-radius: 24px; padding: 40px 36px;
          width: 100%; max-width: 420px;
          box-shadow: 0 4px 6px rgba(99,102,241,0.04), 0 20px 60px rgba(99,102,241,0.12);
          position: relative; z-index: 2;
          transition: opacity 0.15s ease;
        }

        /* normal card-in */
        .forgot-card.enter {
          animation: cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes cardIn {
          from { opacity:0; transform: translateY(24px) scale(0.97); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }

        /* rebuild animation */
        .forgot-card.rebuild {
          animation: cardRebuild 0.9s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes cardRebuild {
          0%   { opacity:0; transform: scale(0.6) rotate(-4deg); filter: blur(8px); }
          60%  { opacity:1; transform: scale(1.04) rotate(1deg); filter: blur(0px); }
          100% { opacity:1; transform: scale(1) rotate(0deg); filter: blur(0px); }
        }

        /* ── shatter piece ── */
        .shard {
          position: absolute; inset: 0;
          border-radius: 24px;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(139,92,246,0.18);
          pointer-events: none;
          transform-origin: center center;
          opacity: 0;
          z-index: 10;
        }
        .shard.explode {
          animation: shardFly 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }

        @keyframes floatQ {
          0%   { transform: translateY(0px)   scale(1)    rotate(0deg); }
          30%  { transform: translateY(-22px) scale(1.08) rotate(6deg); }
          65%  { transform: translateY(-10px) scale(0.96) rotate(-4deg); }
          100% { transform: translateY(0px)   scale(1)    rotate(0deg); }
        }

        .field-label { font-size: 12.5px; font-weight: 600; color: #475569; margin-bottom: 7px; display: block; letter-spacing: 0.3px; }
        .forgot-input {
          width: 100%; font-family: 'Sora', sans-serif; font-size: 14px;
          color: #1e1b4b; background: #faf9ff;
          border: 1.5px solid #e2e0f0; padding: 12px 16px;
          border-radius: 12px; outline: none; box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .forgot-input:focus { border-color: #8b5cf6; background: #fff; box-shadow: 0 0 0 3.5px rgba(139,92,246,0.12); }
        .forgot-input::placeholder { color: #c4c0db; }

        .send-btn {
          width: 100%; padding: 13px; font-family: 'Sora', sans-serif;
          font-size: 14.5px; font-weight: 600; color: white; letter-spacing: 0.3px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none; border-radius: 12px; cursor: pointer; margin-top: 16px;
          transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
          box-shadow: 0 4px 15px rgba(99,102,241,0.35);
        }
        .send-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(99,102,241,0.45); filter: brightness(1.05); }
        .send-btn:active:not(:disabled) { transform: translateY(0); }
        .send-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .back-link {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          font-size: 13px; font-weight: 500; color: #8b5cf6; text-decoration: none;
          margin-top: 20px; transition: color 0.18s, gap 0.2s;
        }
        .back-link:hover { color: #6d28d9; gap: 10px; }

        .success-icon {
          width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 20px;
          background: linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.2));
          border: 1.5px solid rgba(34,197,94,0.28);
          display: flex; align-items: center; justify-content: center;
          animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes popIn {
          from { transform: scale(0.4); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        .resend-btn {
          background: none; border: none; font-family: 'Sora', sans-serif;
          font-size: 13px; font-weight: 600; color: #8b5cf6; cursor: pointer;
          text-decoration: underline; padding: 0;
        }
        .resend-btn:hover { color: #6d28d9; }

        /* lock icon */
        .lock-wrap {
          width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 20px;
          background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.14));
          border: 1.5px solid rgba(139,92,246,0.22);
          display: flex; align-items: center; justify-content: center;
        }
      `}</style>

      <div className="forgot-root">
        {/* Floating ??? background */}
        <FloatingQmarks />

        {/* Shatter pieces — rendered on top, clipped to card shape */}
        {shatter && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{ position: 'relative', width: '420px', maxWidth: '90vw', height: cardRef.current?.offsetHeight || 480 }}>
              {PIECES.map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '24px',
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(139,92,246,0.18)',
                    boxShadow: '0 4px 6px rgba(99,102,241,0.04), 0 20px 60px rgba(99,102,241,0.12)',
                    clipPath: p.clip,
                    WebkitClipPath: p.clip,
                    animation: `none`,
                    transform: 'translate(0,0) rotate(0deg)',
                    opacity: 1,
                    transition: `transform 0.65s cubic-bezier(0.55,0,1,0.45) ${i * 0.03}s, opacity 0.5s ease ${i * 0.03 + 0.1}s`,
                    ...(shatter && !hidden ? {
                      transform: `translate(${p.tx}px, ${p.ty}px) rotate(${p.r}deg) scale(0.7)`,
                      opacity: 0,
                    } : {}),
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main card */}
        <div
          ref={cardRef}
          className={`forgot-card ${rebuild ? 'rebuild' : 'enter'}`}
          style={{
            opacity: hidden ? 0 : 1,
            pointerEvents: shatter || hidden ? 'none' : 'all',
            position: 'relative', zIndex: 2,
          }}
        >
          <SeraboLogo />

          {alert?.msg && (
            <ProAlert
              role={alert.role}
              msg={alert.msg}
              onClose={() => setalert({ role: '', msg: '' })}
            />
          )}

          
            <>
              <div className="lock-wrap">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="3" ry="3"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  <circle cx="12" cy="16" r="1" fill="#8b5cf6"/>
                </svg>
              </div>

              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e1b4b', textAlign: 'center', letterSpacing: '-0.4px', margin: '0 0 8px' }}>
                Forgot your password?
              </h1>
              <p style={{ fontSize: '13.5px', color: '#94a3b8', textAlign: 'center', margin: '0 0 26px', lineHeight: '1.6' }}>
                No worries — enter your email and we'll send you a reset link.
              </p>

              <label className="field-label" htmlFor="forgot-email">Email address</label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="forgot-input"
                placeholder="you@example.com"
                autoComplete="email"
                onKeyDown={e => e.key === 'Enter' && SendToForgot()}
              />

              <button
                type="button"
                className="send-btn"
                onClick={SendToForgot}
                disabled={shatter || hidden}
              >
              {!start?"  Send reset link →":"Please Wait..."}
              </button>

              <Link to="/login" className="back-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                Back to Sign in
              </Link>
            </>
           
        </div>
      </div>
    </>
  )
}