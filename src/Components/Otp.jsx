import React, { useContext, useRef, useState, useEffect } from 'react'
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

/* ── Resend countdown hook ── */
const useCountdown = (initial = 30) => {
  const [seconds, setSeconds] = useState(initial)
  const [running, setRunning] = useState(true)
  useEffect(() => {
    if (!running) return
    if (seconds <= 0) { setRunning(false); return }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds, running])
  const reset = () => { setSeconds(initial); setRunning(true) }
  return { seconds, canResend: !running, reset }
}

export default function Otp() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRef = useRef([])
  const context = useContext(LogContext)
  const { otpverify, alert, setalert, forgotPassword, email ,start} = context
  const { seconds, canResend, reset } = useCountdown(60)

  const handlechange = (value, index) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) otpRef.current[index + 1].focus()
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRef.current[index - 1].focus()
    }
  }

  // handle paste — fill all boxes at once
  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const newOtp = [...otp]
    pasted.split('').forEach((char, i) => { newOtp[i] = char })
    setOtp(newOtp)
    const nextEmpty = Math.min(pasted.length, 5)
    otpRef.current[nextEmpty]?.focus()
  }

  const ResendOtp = () => {
    if (!canResend) return
    forgotPassword(email)
    reset()
  }

  const handleVerify = () => {
    const finalOtp = otp.join('')
    if (finalOtp.length === 0) {
      setalert({ role: 'info', msg: 'Please enter the OTP sent to your email.' })
      return
    }
    if (finalOtp.length < 6) {
      setalert({ role: 'info', msg: 'Please enter all 6 digits of the OTP.' })
      return
    }
    otpverify(finalOtp)
  }

  const filled = otp.filter(d => d !== '').length

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .otp-root {
          min-height: 100vh;
          background: #f0edff;
          background-image:
            radial-gradient(ellipse at 15% 25%, rgba(139,92,246,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 75%, rgba(99,102,241,0.15) 0%, transparent 55%);
          display: flex; align-items: center; justify-content: center;
          padding: 24px 16px; font-family: 'Sora', sans-serif;
        }

        .otp-card {
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

        /* OTP input box */
        .otp-box {
          width: 52px; height: 58px;
          text-align: center; font-size: 22px; font-weight: 700;
          font-family: 'Sora', sans-serif;
          color: #1e1b4b;
          background: #faf9ff;
          border: 2px solid #e2e0f0;
          border-radius: 14px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s, transform 0.15s;
          caret-color: #8b5cf6;
        }
        .otp-box:focus {
          border-color: #8b5cf6;
          background: #fff;
          box-shadow: 0 0 0 3.5px rgba(139,92,246,0.14);
          transform: scale(1.06);
        }
        .otp-box.filled {
          border-color: #a78bfa;
          background: #faf9ff;
          color: #4338ca;
        }

        /* progress bar */
        .otp-progress-track {
          height: 3px; background: #ede9fe; border-radius: 99px;
          margin: 18px 0 24px; overflow: hidden;
        }
        .otp-progress-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          transition: width 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        /* verify button */
        .verify-btn {
          width: 100%; padding: 13px; font-family: 'Sora', sans-serif;
          font-size: 14.5px; font-weight: 600; color: white; letter-spacing: 0.3px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none; border-radius: 12px; cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s, filter 0.15s, opacity 0.2s;
          box-shadow: 0 4px 15px rgba(99,102,241,0.35);
        }
        .verify-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(99,102,241,0.45); filter: brightness(1.05); }
        .verify-btn:active:not(:disabled) { transform: translateY(0); }
        .verify-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* resend */
        .resend-btn {
          background: none; border: none; font-family: 'Sora', sans-serif;
          font-size: 13px; font-weight: 600; color: #8b5cf6;
          cursor: pointer; padding: 0; text-decoration: underline;
          transition: color 0.15s;
        }
        .resend-btn:disabled { color: #c4c0db; cursor: not-allowed; text-decoration: none; }
        .resend-btn:not(:disabled):hover { color: #6d28d9; }

        .back-link {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          font-size: 13px; font-weight: 500; color: #8b5cf6; text-decoration: none;
          margin-top: 20px; transition: color 0.18s, gap 0.2s;
        }
        .back-link:hover { color: #6d28d9; gap: 10px; }

        /* mail icon header */
        .mail-wrap {
          width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 20px;
          background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.14));
          border: 1.5px solid rgba(139,92,246,0.22);
          display: flex; align-items: center; justify-content: center;
        }
      `}</style>

      <div className="otp-root">
        <div className="otp-card">
          <SeraboLogo />

          {alert?.msg && (
            <ProAlert
              role={alert.role}
              msg={alert.msg}
              onClose={() => setalert({ role: '', msg: '' })}
            />
          )}

          {/* Header icon */}
          <div className="mail-wrap">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="3"/>
              <path d="M2 7l10 7 10-7"/>
            </svg>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e1b4b', textAlign: 'center', letterSpacing: '-0.4px', margin: '0 0 8px' }}>
            Check your email
          </h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', textAlign: 'center', margin: '0 0 4px', lineHeight: '1.6' }}>
            We sent a 6-digit code to
          </p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#4338ca', textAlign: 'center', margin: '0 0 24px' }}>
          {email || 'your email'}
         </p>
          <p style={{ fontSize: '12.5px', color: '#94a3b8', textAlign: 'center', margin: '-16px 0 24px', lineHeight: '1.7', background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(139,92,246,0.12)', borderRadius: '10px', padding: '10px 14px' }}>
            Can't find it? Check your <strong style={{ color: '#6366f1' }}>spam folder</strong> or wait <strong style={{ color: '#6366f1' }}>1–2 minutes</strong> then click resend.
</p>
          {/* OTP boxes */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                ref={(el) => (otpRef.current[index] = el)}
                onChange={(e) => handlechange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`otp-box${digit ? ' filled' : ''}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="otp-progress-track">
            <div className="otp-progress-fill" style={{ width: `${(filled / 6) * 100}%` }} />
          </div>

          <button
            type="button"
            className="verify-btn"
            onClick={handleVerify}
            disabled={filled < 6 || start}
          >
            {filled < 6 ? `Enter ${6 - filled} more digit${6 - filled !== 1 ? 's' : ''}` :!start? 'Verify OTP →':"Please Wait..."}
          </button>

          {/* Resend */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '18px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Didn't receive it?</span>
            <button
              className="resend-btn"
              onClick={ResendOtp}
              disabled={!canResend || start}
            >
              {start?"Please Wait...":canResend?"Resend OTP":`Resend in ${seconds}s`}
            </button>
          </div>
          <Link to="/forgot" className="back-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </Link>
        </div>
      </div>
    </>
  )
}