import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',      to: '/'         },
]

const SeraboLogo = () => (
  <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
    <div style={{
      width: '38px', height: '38px', borderRadius: '11px',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 55%, #a78bfa 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 3px 12px rgba(99,102,241,0.45)',
      flexShrink: 0,
      transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='scale(1.08)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(99,102,241,0.55)' }}
      onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 3px 12px rgba(99,102,241,0.45)' }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="white" opacity="0.95"/>
        <circle cx="12" cy="4"  r="1.8" fill="white" opacity="0.6"/>
        <circle cx="12" cy="20" r="1.8" fill="white" opacity="0.6"/>
        <circle cx="4"  cy="12" r="1.8" fill="white" opacity="0.6"/>
        <circle cx="20" cy="12" r="1.8" fill="white" opacity="0.6"/>
        <line x1="12" y1="5.8"  x2="12" y2="9"  stroke="white" strokeWidth="1.4" opacity="0.7"/>
        <line x1="12" y1="15"   x2="12" y2="18.2" stroke="white" strokeWidth="1.4" opacity="0.7"/>
        <line x1="5.8" y1="12"  x2="9"  y2="12" stroke="white" strokeWidth="1.4" opacity="0.7"/>
        <line x1="15"  y1="12"  x2="18.2" y2="12" stroke="white" strokeWidth="1.4" opacity="0.7"/>
      </svg>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <span style={{
        fontFamily: "'Sora', sans-serif", fontSize: '19px', fontWeight: '700',
        letterSpacing: '-0.4px',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>Serabo</span>
      <span style={{
        fontFamily: "'Sora', sans-serif", fontSize: '9.5px', fontWeight: '600',
        letterSpacing: '3.5px', color: '#8b5cf6', textTransform: 'uppercase', marginTop: '0px',
      }}>AI</span>
    </div>
  </Link>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const isActive = (to) => location.pathname === to

  return (
  <>
{location.pathname!=='/chat'&&(
  
<>
  <nav className={`nb-root ${scrolled ? 'scrolled' : 'top'}`}>
     
        <div className="nb-accent-line" />

        <div className="nb-inner">
      
          <SeraboLogo />

     
          <ul className="nb-links">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className={`nb-link${isActive(to) ? ' active' : ''}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

     
          <div className="nb-actions">
            <Link to="/login" className="nb-btn-ghost">Sign in</Link>
            <Link to="/signup" className="nb-btn-solid">Get started →</Link>
          </div>

          
          <button
            className={`nb-hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(p => !p)}
            aria-label="Toggle menu"
            >
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      
      <div className={`nb-mobile${mobileOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ label, to }) => (
          <Link key={to} to={to} className={`nb-mobile-link${isActive(to) ? ' active' : ''}`}>
            {label}
          </Link>
        ))}
        <div className="nb-mobile-actions">
          <Link to="/login" className="nb-btn-ghost">Sign in</Link>
          <Link to="/signup" className="nb-btn-solid">Get started →</Link>
        </div>
      </div>
      </>
)}
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
  
  .nb-root {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    font-family: 'Sora', sans-serif;
    transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
    }
    .nb-root.scrolled {
      background: rgba(255,255,255,0.82);
      backdrop-filter: blur(18px);
      box-shadow: 0 1px 0 rgba(139,92,246,0.10), 0 4px 24px rgba(99,102,241,0.07);
      }
      .nb-root.top {
        background: transparent;
        }
        
        .nb-inner {
          max-width: 1180px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 28px; height: 64px;
          }
          
          /* Desktop nav links */
          .nb-links {
            display: flex; align-items: center; gap: 4px;
            list-style: none; margin: 0; padding: 0;
            }
            .nb-link {
              text-decoration: none;
              font-size: 13.5px; font-weight: 500;
              color: #64748b;
              padding: 7px 13px; border-radius: 9px;
              transition: color 0.18s, background 0.18s;
              position: relative;
              letter-spacing: 0.1px;
              }
              .nb-link:hover { color: #4338ca; background: rgba(99,102,241,0.07); }
              .nb-link.active {
                color: #4338ca; font-weight: 600;
                background: rgba(99,102,241,0.09);
                }
                .nb-link.active::after {
                  content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%);
                  width: 18px; height: 2.5px; border-radius: 99px;
                  background: linear-gradient(90deg, #6366f1, #8b5cf6);
                  }
                  
                  /* CTA buttons */
                  .nb-actions { display: flex; align-items: center; gap: 10px; }
                  
                  .nb-btn-ghost {
                    font-family: 'Sora', sans-serif; font-size: 13.5px; font-weight: 500;
                    color: #4338ca; background: none; border: 1.5px solid rgba(99,102,241,0.25);
                    padding: 8px 18px; border-radius: 10px; cursor: pointer; text-decoration: none;
                    transition: border-color 0.18s, background 0.18s, color 0.18s;
                    white-space: nowrap;
                    }
                    .nb-btn-ghost:hover { border-color: #6366f1; background: rgba(99,102,241,0.06); }
                    
                    .nb-btn-solid {
                      font-family: 'Sora', sans-serif; font-size: 13.5px; font-weight: 600;
                      color: white;
                      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                      border: none; padding: 9px 20px; border-radius: 10px; cursor: pointer;
                      text-decoration: none; white-space: nowrap;
                      box-shadow: 0 3px 12px rgba(99,102,241,0.35);
                      transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
                      }
                      .nb-btn-solid:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.45); filter: brightness(1.05); }
                      .nb-btn-solid:active { transform: translateY(0); }

                      /* Hamburger */
                      .nb-hamburger {
                        display: none; flex-direction: column; gap: 5px;
                        background: none; border: none; cursor: pointer; padding: 6px;
                        border-radius: 8px; transition: background 0.18s;
                        }
                        .nb-hamburger:hover { background: rgba(99,102,241,0.08); }
                        .nb-hamburger span {
                          display: block; width: 22px; height: 2px;
                          background: #4338ca; border-radius: 99px;
                          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
                          transform-origin: center;
                          }
                          .nb-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
                          .nb-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
                          .nb-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
                          
                          /* Mobile drawer */
                          .nb-mobile {
                            position: fixed; top: 64px; left: 0; right: 0;
                            background: rgba(255,255,255,0.96);
                            backdrop-filter: blur(20px);
                            border-bottom: 1px solid rgba(139,92,246,0.12);
                            box-shadow: 0 8px 32px rgba(99,102,241,0.10);
                            padding: 16px 20px 24px;
                            transform: translateY(-10px);
                            opacity: 0; pointer-events: none;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
    z-index: 999;
    }
    .nb-mobile.open { transform: translateY(0); opacity: 1; pointer-events: all; }
    
    .nb-mobile-link {
      display: block; text-decoration: none;
      font-size: 15px; font-weight: 500; color: #475569;
      padding: 12px 14px; border-radius: 10px;
      transition: color 0.15s, background 0.15s;
      border-bottom: 1px solid rgba(139,92,246,0.06);
      }
      .nb-mobile-link:last-of-type { border-bottom: none; }
      .nb-mobile-link:hover { color: #4338ca; background: rgba(99,102,241,0.06); }
      .nb-mobile-link.active { color: #4338ca; font-weight: 600; background: rgba(99,102,241,0.08); }
      
      .nb-mobile-actions {
        display: flex; flex-direction: column; gap: 10px; margin-top: 16px;
        padding-top: 16px; border-top: 1px solid rgba(139,92,246,0.10);
        }
        .nb-mobile-actions .nb-btn-ghost,
        .nb-mobile-actions .nb-btn-solid { text-align: center; width: 100%; padding: 11px; font-size: 14.5px; }
        
        /* Responsive */
        @media (max-width: 768px) {
          .nb-links, .nb-actions { display: none !important; }
          .nb-hamburger { display: flex !important; }
          .nb-inner { padding: 0 20px; }
          }
          
          /* Thin accent line at very top */
          .nb-accent-line {
            height: 2.5px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #6366f1);
            background-size: 200% 100%;
            animation: shimmer 3s linear infinite;
            }
            @keyframes shimmer {
              0%   { background-position: 0% 0%; }
              100% { background-position: 200% 0%; }
              }
              `}</style>
              </>
  )
}