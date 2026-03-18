import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => {
      const wrap = document.getElementById('catWrap404')
      if (wrap) wrap.classList.add('arrived404')
    }, 3700)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        .scene404 {
          width:100vw; height:100vh; position:relative; overflow:hidden;
          background: url('https://www.techexplorist.com/wp-content/uploads/2024/08/earth-from-moon.jpg.webp') center/cover no-repeat;
          font-family: 'Sora', system-ui, sans-serif;
        }
        .scene404::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(to bottom, rgba(0,0,10,0.2) 0%, rgba(0,0,10,0.05) 40%, rgba(0,0,10,0.65) 100%);
          z-index:1;
        }
        .stars404 { position:absolute; inset:0; z-index:2; pointer-events:none; }
        .star404 { position:absolute; border-radius:50%; background:white; animation:twinkle404 var(--d) ease-in-out var(--dl) infinite; }
        @keyframes twinkle404 { 0%,100%{opacity:0.08;transform:scale(1)} 50%{opacity:0.9;transform:scale(1.5)} }

        .moon-dust404 {
          position:absolute; bottom:0; left:0; right:0; height:180px; z-index:3;
          background:linear-gradient(180deg,transparent 0%,rgba(160,148,120,0.1) 40%,rgba(130,118,94,0.28) 100%);
        }

        /* Paw trail */
        .paw-trail404 {
          position:absolute; bottom:90px; z-index:4;
          opacity:0; animation:trailFade404 0.5s ease var(--pt) forwards;
        }
        @keyframes trailFade404 { 0%{opacity:0} 30%{opacity:0.55} 100%{opacity:0.22} }

        /* Cat walks from left to center */
        .cat-wrap404 {
          position:absolute; bottom:80px; left:-160px; z-index:5;
          animation: catWalk404 3.2s cubic-bezier(0.4,0,0.2,1) 0.5s forwards;
        }
        @keyframes catWalk404 {
          0%   { left:-160px; }
          85%  { left:calc(50% - 80px); }
          92%  { left:calc(50% - 72px); }
          100% { left:calc(50% - 78px); }
        }

        /* Facing left while walking, flips to face right (center) on arrive */
        .cat-svg404 { display:block; transform:scaleX(-1); animation:catFlip404 0s 3.85s forwards; }
        @keyframes catFlip404 { to { transform:scaleX(1); } }

        /* Walking legs */
        .leg-fl404 { transform-origin:18px 0; animation:legW404 0.38s ease-in-out 0.5s infinite alternate; }
        .leg-rl404 { transform-origin:18px 0; animation:legW404 0.38s ease-in-out 0.5s infinite alternate-reverse; }
        .leg-fr404 { transform-origin:18px 0; animation:legW404 0.38s ease-in-out 0.69s infinite alternate; }
        .leg-rr404 { transform-origin:18px 0; animation:legW404 0.38s ease-in-out 0.69s infinite alternate-reverse; }
        @keyframes legW404 { 0%{transform:rotate(-22deg)} 100%{transform:rotate(22deg)} }

        /* Stop legs on arrival */
        .arrived404 .leg-fl404,
        .arrived404 .leg-rl404,
        .arrived404 .leg-fr404,
        .arrived404 .leg-rr404 { animation:none; transform:rotate(0deg); }

        /* Tail wag after arrival */
        .cat-tail404 { transform-origin:10px 4px; animation:tailWag404 1.4s ease-in-out 3.95s infinite alternate; }
        @keyframes tailWag404 { 0%{transform:rotate(-32deg)} 100%{transform:rotate(32deg)} }

        /* Body idle bob after arrival */
        .cat-body404 { animation:catBob404 2.2s ease-in-out 4.0s infinite; }
        @keyframes catBob404 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        /* Popup overlay */
        .paw-overlay404 {
          position:absolute; inset:0; z-index:20;
          display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,14,0.72);
          opacity:0; pointer-events:none;
          animation:fadeOv404 0.6s ease 4.6s forwards;
        }
        @keyframes fadeOv404 { to { opacity:1; pointer-events:all; } }

        .paw-card404 {
          background:rgba(6,4,22,0.96);
          border:1px solid rgba(139,92,246,0.45);
          border-radius:28px; padding:44px 52px 40px;
          text-align:center; max-width:410px; width:90%;
          backdrop-filter:blur(28px);
          transform:scale(0.6) translateY(40px); opacity:0;
          animation:cardPop404 0.68s cubic-bezier(0.34,1.56,0.64,1) 4.8s forwards;
          box-shadow:0 0 80px rgba(99,102,241,0.2), 0 24px 80px rgba(0,0,0,0.7);
        }
        @keyframes cardPop404 { to { transform:scale(1) translateY(0); opacity:1; } }

        .err-pill404 {
          display:inline-flex; align-items:center; gap:6px;
          padding:4px 14px; border-radius:99px; margin-bottom:14px;
          background:rgba(244,63,94,0.12); border:1px solid rgba(244,63,94,0.4);
        }
        .err-dot404 { width:7px; height:7px; border-radius:50%; background:#f43f5e; box-shadow:0 0 8px #f43f5e; animation:dp404 1.6s ease-in-out infinite; }
        @keyframes dp404 { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .err-pill404 span { font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#f43f5e; }

        .err-num404 {
          font-size:84px; font-weight:800; line-height:1; letter-spacing:-4px;
          background:linear-gradient(135deg,#f43f5e,#f97316,#fbbf24);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          margin-bottom:4px;
        }
        .err-title404 { font-size:21px; font-weight:700; color:white; letter-spacing:-0.4px; margin-bottom:8px; }
        .err-msg404 { font-size:13.5px; color:rgba(167,139,250,0.85); line-height:1.7; margin-bottom:28px; max-width:295px; margin-left:auto; margin-right:auto; }

        .home-btn404 {
          display:inline-flex; align-items:center; gap:9px;
          padding:13px 34px; border-radius:14px; border:none;
          background:linear-gradient(135deg,#6366f1,#8b5cf6);
          color:white; font-size:14.5px; font-weight:600; cursor:pointer;
          letter-spacing:0.2px; font-family:'Sora',system-ui,sans-serif;
          box-shadow:0 4px 28px rgba(99,102,241,0.45);
          transition:transform 0.15s, box-shadow 0.15s;
        }
        .home-btn404:hover { transform:translateY(-2px); box-shadow:0 8px 36px rgba(99,102,241,0.62); }
        .home-btn404:active { transform:translateY(0); }

        .brand-row404 {
          display:flex; align-items:center; justify-content:center;
          gap:7px; margin-top:22px; opacity:0.4;
        }
        .brand-icon404 { width:20px; height:20px; border-radius:6px; background:linear-gradient(135deg,#6366f1,#8b5cf6); display:flex; align-items:center; justify-content:center; }
        .brand-row404 span { font-size:12px; font-weight:600; color:rgba(167,139,250,0.8); }
      `}</style>

      <div className="scene404">

        {/* Stars */}
        <div className="stars404">
          {[...Array(65)].map((_,i) => (
            <div key={i} className="star404" style={{
              left:`${(i*13.7+2)%100}%`,
              top:`${(i*17.3+5)%78}%`,
              width:`${1+(i%3)*0.5}px`,
              height:`${1+(i%3)*0.5}px`,
              '--d':`${2+(i%4)}s`,
              '--dl':`${(i*0.28)%3}s`,
            }}/>
          ))}
        </div>

        <div className="moon-dust404"/>

        {/* Paw trail prints */}
        {['8%','17%','27%','37%'].map((left,i) => (
          <div key={i} className="paw-trail404" style={{ left, '--pt':`${1.0+i*0.5}s` }}>
            <svg width="22" height="22" viewBox="0 0 64 64" fill="rgba(220,210,190,0.8)">
              <ellipse cx="32" cy="46" rx="16" ry="12"/>
              <ellipse cx="16" cy="28" rx="7" ry="9"/>
              <ellipse cx="32" cy="22" rx="7" ry="9"/>
              <ellipse cx="48" cy="28" rx="7" ry="9"/>
            </svg>
          </div>
        ))}

        {/* Cat */}
        <div className="cat-wrap404" id="catWrap404">
          <svg className="cat-svg404" width="160" height="165" viewBox="0 0 160 165" fill="none">

            {/* Tail */}
            <g className="cat-tail404">
              <path d="M108 118 Q148 100 152 72 Q156 50 140 44" stroke="#c4a882" strokeWidth="10" strokeLinecap="round" fill="none"/>
              <path d="M108 118 Q148 100 152 72 Q156 50 140 44" stroke="#e8d4b8" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.5"/>
              <circle cx="140" cy="44" r="7" fill="#c4a882"/>
              <circle cx="140" cy="44" r="4" fill="#f0e0c8"/>
            </g>

            {/* Body group */}
            <g className="cat-body404">
              <ellipse cx="80" cy="118" rx="42" ry="32" fill="#c4a882"/>
              <ellipse cx="80" cy="112" rx="40" ry="30" fill="#d4b896"/>
              <ellipse cx="80" cy="120" rx="22" ry="18" fill="#f0e0c8" opacity="0.8"/>

              {/* Back legs */}
              <g className="leg-rl404"><rect x="48" y="138" width="16" height="22" rx="8" fill="#c4a882"/><ellipse cx="56" cy="160" rx="10" ry="5" fill="#b09070"/></g>
              <g className="leg-rr404"><rect x="96" y="138" width="16" height="22" rx="8" fill="#c4a882"/><ellipse cx="104" cy="160" rx="10" ry="5" fill="#b09070"/></g>

              {/* Head */}
              <circle cx="80" cy="80" r="32" fill="#d4b896"/>
              <circle cx="80" cy="80" r="30" fill="#dcbc9e"/>

              {/* Ears */}
              <polygon points="52,58 42,28 66,50" fill="#d4b896"/>
              <polygon points="52,58 46,36 64,52" fill="#e8a0a0" opacity="0.7"/>
              <polygon points="108,58 118,28 94,50" fill="#d4b896"/>
              <polygon points="108,58 114,36 96,52" fill="#e8a0a0" opacity="0.7"/>

              {/* Eyes */}
              <circle cx="67" cy="78" r="10" fill="white"/>
              <circle cx="93" cy="78" r="10" fill="white"/>
              <circle cx="67" cy="78" r="6" fill="#2d1a0e"/>
              <circle cx="93" cy="78" r="6" fill="#2d1a0e"/>
              <circle cx="69" cy="76" r="2.5" fill="white"/>
              <circle cx="95" cy="76" r="2.5" fill="white"/>
              <circle cx="64" cy="80" r="1" fill="white" opacity="0.5"/>
              <circle cx="90" cy="80" r="1" fill="white" opacity="0.5"/>

              {/* Face */}
              <ellipse cx="80" cy="88" rx="4" ry="3" fill="#e88080"/>
              <path d="M76 91 Q80 95 84 91" stroke="#c06060" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <line x1="44" y1="86" x2="72" y2="88" stroke="#8a7a6a" strokeWidth="1.2" opacity="0.7"/>
              <line x1="44" y1="90" x2="72" y2="90" stroke="#8a7a6a" strokeWidth="1.2" opacity="0.7"/>
              <line x1="46" y1="94" x2="72" y2="92" stroke="#8a7a6a" strokeWidth="1.2" opacity="0.7"/>
              <line x1="116" y1="86" x2="88" y2="88" stroke="#8a7a6a" strokeWidth="1.2" opacity="0.7"/>
              <line x1="116" y1="90" x2="88" y2="90" stroke="#8a7a6a" strokeWidth="1.2" opacity="0.7"/>
              <line x1="114" y1="94" x2="88" y2="92" stroke="#8a7a6a" strokeWidth="1.2" opacity="0.7"/>
              <path d="M74 56 Q80 50 86 56" stroke="#b89070" strokeWidth="2" fill="none" opacity="0.5"/>

              {/* Front legs */}
              <g className="leg-fl404">
                <rect x="54" y="138" width="15" height="20" rx="7" fill="#d4b896"/>
                <ellipse cx="62" cy="158" rx="9" ry="5" fill="#c4a882"/>
                <circle cx="57" cy="160" r="3" fill="#b09070"/>
                <circle cx="62" cy="162" r="3" fill="#b09070"/>
                <circle cx="67" cy="160" r="3" fill="#b09070"/>
              </g>
              <g className="leg-fr404">
                <rect x="91" y="138" width="15" height="20" rx="7" fill="#d4b896"/>
                <ellipse cx="98" cy="158" rx="9" ry="5" fill="#c4a882"/>
                <circle cx="93" cy="160" r="3" fill="#b09070"/>
                <circle cx="98" cy="162" r="3" fill="#b09070"/>
                <circle cx="103" cy="160" r="3" fill="#b09070"/>
              </g>

              {/* Space helmet */}
              <circle cx="80" cy="80" r="34" stroke="rgba(180,220,255,0.3)" strokeWidth="3" fill="none"/>
              <circle cx="80" cy="80" r="34" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
              <path d="M58 56 Q64 50 74 52" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </g>
          </svg>
        </div>

        {/* Paw 404 popup */}
        <div className="paw-overlay404">
          <div className="paw-card404">

            {/* Big paw icon */}
            <svg style={{display:'block',margin:'0 auto 18px'}} width="64" height="64" viewBox="0 0 64 64" fill="none">
              <ellipse cx="32" cy="46" rx="18" ry="14" fill="#8b5cf6" opacity="0.9"/>
              <ellipse cx="32" cy="42" rx="16" ry="12" fill="#a78bfa"/>
              <ellipse cx="16" cy="28" rx="7" ry="9" fill="#8b5cf6" opacity="0.9"/>
              <ellipse cx="32" cy="22" rx="7" ry="9" fill="#8b5cf6" opacity="0.9"/>
              <ellipse cx="48" cy="28" rx="7" ry="9" fill="#8b5cf6" opacity="0.9"/>
              <ellipse cx="16" cy="28" rx="5" ry="7" fill="#c4b5fd"/>
              <ellipse cx="32" cy="22" rx="5" ry="7" fill="#c4b5fd"/>
              <ellipse cx="48" cy="28" rx="5" ry="7" fill="#c4b5fd"/>
              <ellipse cx="32" cy="44" rx="12" ry="9" fill="#c4b5fd"/>
              <ellipse cx="26" cy="38" rx="4" ry="3" fill="white" opacity="0.2"/>
            </svg>

            <div className="err-pill404">
              <div className="err-dot404"/>
              <span>Meow</span>
            </div>

            <div className="err-num404">404</div>
            <div className="err-title404">Wrong planet, human!</div>
            <p className="err-msg404">
              This lunar explorer sniffed every crater but couldn't find your page. It drifted off into the cosmos.
            </p>

            <button className="home-btn404" onClick={() => navigate('/')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Return to Earth
            </button>

            <div className="brand-row404">
              <div className="brand-icon404">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/>
                  <circle cx="12" cy="4" r="1.8" fill="white" opacity="0.6"/>
                  <circle cx="12" cy="20" r="1.8" fill="white" opacity="0.6"/>
                  <circle cx="4" cy="12" r="1.8" fill="white" opacity="0.6"/>
                  <circle cx="20" cy="12" r="1.8" fill="white" opacity="0.6"/>
                </svg>
              </div>
              <span>Serabo AI</span>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}