import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ══════════════════════════════════════════════
   EARTH INTRO — animated photo, no Three.js
══════════════════════════════════════════════ */
const Earth3D = ({ onEnter }) => {
  const [clicked, setClicked] = useState(false)
  const [hint,    setHint]    = useState(false)
  const imgRef = useRef(null)

  useEffect(() => { setTimeout(() => setHint(true), 1000) }, [])

  // Subtle parallax on mouse move
  useEffect(() => {
    const onMove = (e) => {
      if (clicked || !imgRef.current) return
      const xPct = (e.clientX / window.innerWidth  - 0.5) * 12
      const yPct = (e.clientY / window.innerHeight - 0.5) * 8
      imgRef.current.style.transform = `scale(1.08) translate(${xPct}px, ${yPct}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [clicked])

  const handleClick = () => {
    if (clicked) return
    setClicked(true)
    setTimeout(onEnter, 1800)
  }

  return (
    <div onClick={handleClick} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      cursor: clicked ? 'default' : 'pointer',
      overflow: 'hidden', background: '#000',
    }}>

      {/* ── Earth photo — slow drift + mouse parallax ── */}
      <div
        ref={imgRef}
        style={{
          position: 'absolute', inset: '-8%',
          backgroundImage: "url('/Earth.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.08)',
          transition: clicked
            ? 'transform 2.8s cubic-bezier(0.4,0,0.2,1)'
            : 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          animation: clicked ? 'earthSpin 1.8s cubic-bezier(0.4,0,0.2,1) forwards' : 'earthDrift 18s ease-in-out infinite alternate',
        }}
      />

      {/* Vignette — deepens edges like space */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 65% 45%, transparent 30%, rgba(0,0,5,0.55) 75%, rgba(0,0,10,0.88) 100%)',
      }}/>

      {/* Subtle animated light sweep */}
      {!clicked && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%)',
          animation: 'lightSweep 6s ease-in-out infinite',
        }}/>
      )}

      {/* Serabo brand top-center */}
      <div style={{
        position: 'absolute', top: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: '11px', zIndex: 10,
        animation: 'fadeDown 0.9s ease 0.3s both',
      }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '11px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 28px rgba(139,92,246,0.7)',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/>
            <circle cx="12" cy="4"  r="1.8" fill="white" opacity="0.6"/>
            <circle cx="12" cy="20" r="1.8" fill="white" opacity="0.6"/>
            <circle cx="4"  cy="12" r="1.8" fill="white" opacity="0.6"/>
            <circle cx="20" cy="12" r="1.8" fill="white" opacity="0.6"/>
            <line x1="12" y1="5.8" x2="12" y2="9"    stroke="white" strokeWidth="1.3" opacity="0.7"/>
            <line x1="12" y1="15"  x2="12" y2="18.2"  stroke="white" strokeWidth="1.3" opacity="0.7"/>
            <line x1="5.8" y1="12" x2="9"  y2="12"    stroke="white" strokeWidth="1.3" opacity="0.7"/>
            <line x1="15"  y1="12" x2="18.2" y2="12"  stroke="white" strokeWidth="1.3" opacity="0.7"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:'21px', fontWeight:'700', color:'white', letterSpacing:'-0.3px', textShadow:'0 2px 12px rgba(0,0,0,0.5)' }}>Serabo</div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:'10px', fontWeight:'600', color:'#a78bfa', letterSpacing:'4px', textTransform:'uppercase' }}>AI</div>
        </div>
      </div>

      {/* Center tagline */}
      {!clicked && hint && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', zIndex: 10,
          animation: 'fadeUp 0.9s ease both',
          pointerEvents: 'none',
        }}>
          <p style={{
            fontFamily:"'Sora',sans-serif", fontSize:'clamp(11px,1.2vw,13px)',
            color: 'rgba(200,225,255,0.5)', letterSpacing: '5px',
            textTransform: 'uppercase', fontWeight: '500', margin: '0 0 8px',
          }}>Welcome to</p>
          <h1 style={{
            fontFamily:"'Sora',sans-serif",
            fontSize: 'clamp(36px,6vw,72px)',
            fontWeight: '800', color: 'white',
            letterSpacing: '-2px', lineHeight: 1.1,
            margin: '0 0 12px',
            textShadow: '0 4px 32px rgba(0,0,0,0.6)',
          }}>
            Serabo <span style={{ background:'linear-gradient(135deg,#a78bfa,#6366f1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>AI</span>
          </h1>
          <p style={{
            fontFamily:"'Sora',sans-serif", fontSize:'clamp(13px,1.4vw,15px)',
            color: 'rgba(200,225,255,0.55)', letterSpacing: '0.3px',
            maxWidth: '380px', lineHeight: '1.6', margin: '0 auto',
          }}>Intelligence for a connected world</p>
        </div>
      )}

      {/* Click hint — bottom */}
      {!clicked && hint && (
        <div style={{
          position: 'absolute', bottom: '44px', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center', zIndex: 10,
          animation: 'fadeUp 0.8s ease 0.4s both',
        }}>
          <p style={{
            fontFamily:"'Sora',sans-serif", fontSize:'11px',
            color: 'rgba(200,225,255,0.55)', letterSpacing: '4px',
            textTransform: 'uppercase', fontWeight: '500', margin: '0 0 10px',
            animation: 'br 2.5s ease-in-out infinite',
          }}>Click to enter</p>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="rgba(160,200,255,0.55)" strokeWidth="2" strokeLinecap="round"
            style={{ animation:'bou 1.8s ease-in-out infinite', display:'block', margin:'0 auto' }}>
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      )}

      {/* Fade to white on click */}
      {clicked && (
        <div style={{
          position:'absolute', inset:0, zIndex:20, pointerEvents:'none',
          background:'white',
          animation:'fadeWhite 1.8s ease forwards',
        }}/>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

        @keyframes earthDrift {
          0%   { transform: scale(1.08) translate(0px, 0px) rotate(0deg); }
          25%  { transform: scale(1.1)  translate(-6px, -4px) rotate(0.3deg); }
          50%  { transform: scale(1.09) translate(4px, -6px) rotate(-0.2deg); }
          75%  { transform: scale(1.11) translate(-3px, 4px) rotate(0.2deg); }
          100% { transform: scale(1.08) translate(5px, 2px) rotate(-0.1deg); }
        }

        @keyframes lightSweep {
          0%,100% { opacity: 0; transform: translateX(-100%); }
          30%,70% { opacity: 1; }
          50%     { transform: translateX(100%); }
        }

        @keyframes fadeDown {
          from { opacity:0; transform: translateX(-50%) translateY(-14px); }
          to   { opacity:1; transform: translateX(-50%) translateY(0); }
        }

        @keyframes fadeUp {
          from { opacity:0; transform: translate(-50%,-50%) translateY(16px); }
          to   { opacity:1; transform: translate(-50%,-50%) translateY(0); }
        }

        @keyframes br  { 0%,100%{opacity:0.45} 50%{opacity:0.9} }
        @keyframes bou { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }

        @keyframes earthSpin {
          0%   { transform: scale(1.08) rotate(0deg) translate(0,0); filter: brightness(1); }
          40%  { transform: scale(1.6)  rotate(8deg)  translate(-2%, 1%); filter: brightness(1.3); }
          80%  { transform: scale(3.5)  rotate(18deg) translate(-5%, 3%); filter: brightness(1.8); }
          100% { transform: scale(6)    rotate(25deg) translate(-8%, 5%); filter: brightness(3); }
        }
        @keyframes fadeWhite {
          0%   { opacity: 0; }
          55%  { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════════════ */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, vis]
}

/* ══════════════════════════════════════════════
   CHATBOT HOUSE BACKGROUND
══════════════════════════════════════════════ */
const ChatbotHouseBg = () => (
  <svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg"
    style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.055 }}
    preserveAspectRatio="xMidYMid slice">
    <polygon points="600,55 940,305 260,305" fill="#6366f1"/>
    <rect x="310" y="305" width="580" height="370" fill="#4338ca"/>
    <rect x="505" y="415" width="190" height="260" rx="95" fill="#1e1b4b"/>
    <rect x="355" y="335" width="125" height="125" rx="14" fill="#1e1b4b"/>
    <rect x="720" y="335" width="125" height="125" rx="14" fill="#1e1b4b"/>
    <circle cx="600" cy="498" r="58" fill="#6366f1"/>
    <rect x="573" y="480" width="23" height="23" rx="5" fill="white"/>
    <rect x="604" y="480" width="23" height="23" rx="5" fill="white"/>
    <path d="M576 520 Q600 540 624 520" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <line x1="600" y1="440" x2="600" y2="408" stroke="#a78bfa" strokeWidth="3.5"/>
    <circle cx="600" cy="401" r="9" fill="#a78bfa"/>
    <ellipse cx="155" cy="488" rx="78" ry="98" fill="#2e7d32" opacity="0.82"/>
    <rect x="143" y="558" width="24" height="118" fill="#5d4037"/>
    <ellipse cx="1045" cy="488" rx="78" ry="98" fill="#2e7d32" opacity="0.82"/>
    <rect x="1033" y="558" width="24" height="118" fill="#5d4037"/>
    <ellipse cx="600" cy="685" rx="510" ry="26" fill="#388e3c" opacity="0.4"/>
    <ellipse cx="195" cy="148" rx="92" ry="39" fill="#dde9ff" opacity="0.6"/>
    <ellipse cx="244" cy="134" rx="66" ry="33" fill="#dde9ff" opacity="0.6"/>
    <ellipse cx="148" cy="143" rx="59" ry="31" fill="#dde9ff" opacity="0.6"/>
    <ellipse cx="965" cy="118" rx="92" ry="39" fill="#dde9ff" opacity="0.6"/>
    <ellipse cx="1014" cy="104" rx="66" ry="33" fill="#dde9ff" opacity="0.6"/>
    <ellipse cx="918" cy="113" rx="59" ry="31" fill="#dde9ff" opacity="0.6"/>
  </svg>
)

/* ══════════════════════════════════════════════
   HOMEPAGE
══════════════════════════════════════════════ */
const HomePage = () => {
  const [heroRef, heroV] = useReveal(0.05)
  const [mainRef, mainV] = useReveal()
  const [featRef, featV] = useReveal()
  const [ctaRef,  ctaV]  = useReveal()
  const [footRef, footV] = useReveal()

  const features = [
    { icon:'🧠', title:'Smart Conversations', desc:'Serabo AI understands context deeply and responds like a true thinking partner.' },
    { icon:'⚡', title:'Lightning Fast',       desc:'Get answers in milliseconds. Built for speed without sacrificing quality.' },
    { icon:'🔒', title:'Private & Secure',     desc:'Your conversations are encrypted end-to-end. We never sell your data.' },
    { icon:'🌍', title:'Works Everywhere',     desc:'Access Serabo AI from any device, anywhere in the world.' },
    { icon:'🎨', title:'Creative Partner',     desc:'From writing to code to design ideas — Serabo helps you create.' },
    { icon:'📚', title:'Always Learning',      desc:'Continuously updated with the latest knowledge and capabilities.' },
  ]

  return (
    <div style={{ fontFamily:"'Sora',sans-serif", overflowX:'hidden' }}>

      {/* HERO */}
      <section style={{ minHeight:'100vh', position:'relative', background:'linear-gradient(155deg,#f0edff 0%,#e8f0ff 50%,#f5f3ff 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', overflow:'hidden', padding:'90px 24px 70px' }}>
        <ChatbotHouseBg/>
        <div style={{ position:'absolute', top:'12%', left:'6%', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,0.14),transparent)', animation:'orb 7s ease-in-out infinite' }}/>
        <div style={{ position:'absolute', bottom:'18%', right:'8%', width:'240px', height:'240px', borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,0.11),transparent)', animation:'orb 9s ease-in-out 3s infinite' }}/>

        <div ref={heroRef} style={{ position:'relative', zIndex:2, textAlign:'center', maxWidth:'800px', opacity:heroV?1:0, transform:heroV?'translateY(0)':'translateY(48px)', transition:'opacity 1.1s ease,transform 1.1s ease' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.2)', borderRadius:'99px', padding:'6px 18px', marginBottom:'28px', animation:heroV?'fadeUp2 0.8s ease 0.2s both':'none' }}>
            <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 8px #22c55e', display:'block', flexShrink:0, animation:'pulse 2s infinite' }}/>
            <span style={{ fontSize:'12.5px', fontWeight:'600', color:'#4338ca', letterSpacing:'0.2px' }}>Now Live — Serabo AI v2.0</span>
          </div>
          <h1 style={{ fontSize:'clamp(40px,6.5vw,76px)', fontWeight:'800', color:'#1e1b4b', letterSpacing:'-2.5px', lineHeight:'1.08', margin:'0 0 22px', animation:heroV?'fadeUp2 0.8s ease 0.35s both':'none' }}>
            The AI that thinks<br/>
            <span style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>with&nbsp;you</span>
          </h1>
          <p style={{ fontSize:'clamp(15px,2vw,19px)', color:'#64748b', lineHeight:'1.72', margin:'0 auto 40px', maxWidth:'560px', animation:heroV?'fadeUp2 0.8s ease 0.5s both':'none' }}>
            Serabo AI is your intelligent companion for conversations, creativity, and problem-solving. Powered by cutting-edge intelligence, built for humans.
          </p>
          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap', animation:heroV?'fadeUp2 0.8s ease 0.65s both':'none' }}>
            <Link to="/login" style={{ padding:'14px 34px', borderRadius:'12px', fontFamily:"'Sora',sans-serif", fontSize:'15px', fontWeight:'600', color:'white', textDecoration:'none', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow:'0 4px 22px rgba(99,102,241,0.42)', transition:'transform 0.15s,box-shadow 0.15s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(99,102,241,0.55)' }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 22px rgba(99,102,241,0.42)' }}>Start for free →</Link>
            <a href="#features" style={{ padding:'14px 34px', borderRadius:'12px', fontFamily:"'Sora',sans-serif", fontSize:'15px', fontWeight:'600', color:'#4338ca', textDecoration:'none', background:'rgba(99,102,241,0.08)', border:'1.5px solid rgba(99,102,241,0.22)', transition:'background 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(99,102,241,0.14)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(99,102,241,0.08)'}>See how it works</a>
          </div>
        </div>
        <div style={{ position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)', opacity:0.4, animation:'bou2 2s ease-in-out infinite' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding:'110px 24px', background:'linear-gradient(180deg,#f5f3ff 0%,#fff 100%)', position:'relative', overflow:'hidden' }}>
        <div ref={mainRef} style={{ maxWidth:'860px', margin:'0 auto 64px', textAlign:'center', opacity:mainV?1:0, transform:mainV?'translateY(0)':'translateY(50px)', transition:'opacity 0.9s ease,transform 0.9s ease' }}>
          <h2 style={{ fontSize:'clamp(28px,4.5vw,52px)', fontWeight:'800', color:'#1e1b4b', letterSpacing:'-1.8px', margin:'0 0 16px' }}>
            Everything you need,<br/>
            <span style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>nothing you don't</span>
          </h2>
          <p style={{ fontSize:'17px', color:'#64748b', lineHeight:'1.7', maxWidth:'520px', margin:'0 auto' }}>Serabo AI is designed to be the most useful assistant you've ever used. Simple, powerful, always on your side.</p>
        </div>
        <div ref={featRef} style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'20px' }}>
          {features.map((f,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.85)', border:'1px solid rgba(139,92,246,0.11)', borderRadius:'20px', padding:'28px 24px', backdropFilter:'blur(10px)', boxShadow:'0 2px 20px rgba(99,102,241,0.06)', opacity:featV?1:0, transform:featV?'translateY(0)':'translateY(40px)', transition:`opacity 0.7s ease ${i*0.09}s,transform 0.7s ease ${i*0.09}s,box-shadow 0.2s`, cursor:'default' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(99,102,241,0.14)' }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 20px rgba(99,102,241,0.06)' }}>
              <div style={{ fontSize:'34px', marginBottom:'14px' }}>{f.icon}</div>
              <h3 style={{ fontSize:'17px', fontWeight:'700', color:'#1e1b4b', margin:'0 0 9px', letterSpacing:'-0.3px' }}>{f.title}</h3>
              <p style={{ fontSize:'13.5px', color:'#64748b', lineHeight:'1.65', margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={{ padding:'90px 24px', background:'linear-gradient(135deg,#6366f1 0%,#7c3aed 100%)', textAlign:'center', position:'relative', overflow:'hidden', opacity:ctaV?1:0, transform:ctaV?'translateY(0)':'translateY(40px)', transition:'opacity 0.9s ease,transform 0.9s ease' }}>
        <div style={{ position:'absolute', top:'-80px', left:'-80px', width:'260px', height:'260px', borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>
        <div style={{ position:'absolute', bottom:'-90px', right:'-50px', width:'300px', height:'300px', borderRadius:'50%', background:'rgba(255,255,255,0.05)' }}/>
        <h2 style={{ fontSize:'clamp(26px,4vw,46px)', fontWeight:'800', color:'white', margin:'0 0 16px', letterSpacing:'-1px', position:'relative' }}>Ready to think smarter?</h2>
        <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.72)', margin:'0 0 38px', position:'relative' }}>Join thousands of people already using Serabo AI every day.</p>
        <Link to="/login" style={{ display:'inline-block', padding:'15px 44px', borderRadius:'12px', fontFamily:"'Sora',sans-serif", fontSize:'15px', fontWeight:'700', color:'#4338ca', background:'white', textDecoration:'none', boxShadow:'0 4px 24px rgba(0,0,0,0.18)', transition:'transform 0.15s,box-shadow 0.15s', position:'relative' }}
          onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 36px rgba(0,0,0,0.24)' }}
          onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,0.18)' }}>Get started free →</Link>
      </section>

      {/* FOOTER */}
      <footer ref={footRef} style={{ padding:'60px 24px 40px', background:'#0a0914', opacity:footV?1:0, transform:footV?'translateY(0)':'translateY(30px)', transition:'opacity 0.9s ease,transform 0.9s ease' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'24px', marginBottom:'40px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/>
                  <circle cx="12" cy="4" r="1.8" fill="white" opacity="0.6"/>
                  <circle cx="12" cy="20" r="1.8" fill="white" opacity="0.6"/>
                  <circle cx="4" cy="12" r="1.8" fill="white" opacity="0.6"/>
                  <circle cx="20" cy="12" r="1.8" fill="white" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:'18px', fontWeight:'700', color:'white' }}>Serabo</div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:'9px', fontWeight:'600', color:'#8b5cf6', letterSpacing:'3px', textTransform:'uppercase' }}>AI</div>
              </div>
            </div>
            <div style={{ display:'flex', gap:'28px', flexWrap:'wrap' }}>
              {['Privacy','Terms','Docs','Blog','Contact'].map(l => (
                <a key={l} href="#" style={{ fontFamily:"'Sora',sans-serif", fontSize:'13.5px', color:'rgba(255,255,255,0.38)', textDecoration:'none', transition:'color 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.88)'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.38)'}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'26px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'10px' }}>
            <p style={{ fontFamily:"'Sora',sans-serif", fontSize:'13px', color:'rgba(255,255,255,0.25)', margin:0 }}>© 2026 Serabo AI. All rights reserved.</p>
            <p style={{ fontFamily:"'Sora',sans-serif", fontSize:'13px', color:'rgba(255,255,255,0.25)', margin:0 }}>Built with 💜 for the future</p>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes orb    { 0%,100%{transform:translateY(0) scale(1)}  50%{transform:translateY(-28px) scale(1.05)} }
        @keyframes fadeUp2{ from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bou2   { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes pulse  { 0%,100%{opacity:1;box-shadow:0 0 8px #22c55e} 50%{opacity:0.6;box-shadow:0 0 4px #22c55e} }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════ */
export default function Home() {
  const [phase, setPhase] = useState('earth')
  return (
    <>
      {phase === 'earth' && <Earth3D onEnter={() => setPhase('home')} />}
      {phase === 'home'  && <HomePage />}
    </>
  )
}