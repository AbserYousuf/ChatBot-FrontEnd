// REPLACE the empty state section (the !activeSessionId block) in your Chat.jsx
// Find this block and replace it entirely:

// ── Empty state: Robot ──
{!activeSessionId && (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    overflow: "hidden",           // ← prevent bleed-through
    animation: "fadeSlideUp 0.4s ease both",
  }}>

    {/* Spline robot — flex:1 so it fills available space, never overflows */}
    <div style={{
      width: "100%",
      flex: 1,                    // ← KEY FIX: grow to fill, don't use calc()
      minHeight: 0,               // ← allows flex child to shrink below content size
      position: "relative",
    }}>

      {/* Name tag */}
      <div style={{
        position: "absolute", top: 16, left: "50%",
        transform: "translateX(-50%)", zIndex: 5,
        display: "flex", alignItems: "center", gap: 7,
        background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)",
        border: `1px solid rgba(139,92,246,0.2)`, borderRadius: 99,
        padding: "5px 14px 5px 10px",
        boxShadow: "0 4px 20px rgba(99,102,241,0.12)", whiteSpace: "nowrap",
      }}>
        <div style={{
          width: 7, height: 7, borderRadius: "50%",
          background: T.green, boxShadow: `0 0 7px ${T.green}`,
          animation: "statusPulse 2s ease-in-out infinite",
        }}/>
        <p style={{
          margin: 0, fontSize: 12, fontWeight: 600, color: T.text1,
          fontFamily: "'Sora',sans-serif", letterSpacing: "0.2px",
        }}>Serabo AI · Online</p>
      </div>

      {/* Drag hint */}
      <div style={{
        position: "absolute", bottom: 14, left: "50%",
        transform: "translateX(-50%)", zIndex: 5,
        whiteSpace: "nowrap",
        background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)",
        border: `1px solid rgba(139,92,246,0.15)`, borderRadius: 99,
        padding: "4px 12px", display: "flex", alignItems: "center", gap: 6,
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round">
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0m-4 8V6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v2m-2 6v-1a1 1 0 0 1 1-1h1a3 3 0 0 1 3 3 0 0 1 0 6H9a9 9 0 0 1-3-2.2L3 14"/>
        </svg>
        <p style={{
          margin: 0, fontSize: 10.5, color: "#8b5cf6",
          fontWeight: 500, fontFamily: "'Sora',sans-serif",
        }}>Drag & interact</p>
      </div>

      <Suspense fallback={
        <div style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center",
          justifyContent: "center", flexDirection: "column", gap: 14,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `linear-gradient(135deg,${T.accent},${T.accentMid})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "statusPulse 1.6s ease-in-out infinite",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/>
              <circle cx="12" cy="4"  r="1.8" fill="white" opacity="0.6"/>
              <circle cx="12" cy="20" r="1.8" fill="white" opacity="0.6"/>
              <circle cx="4"  cy="12" r="1.8" fill="white" opacity="0.6"/>
              <circle cx="20" cy="12" r="1.8" fill="white" opacity="0.6"/>
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: 12, color: T.text3, fontFamily: "'Sora',sans-serif" }}>
            Loading Serabo AI…
          </p>
          <div style={{
            width: 100, height: 2.5, borderRadius: 99,
            background: "rgba(139,92,246,0.12)", overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              background: `linear-gradient(90deg,${T.accent},${T.accentMid},#a78bfa)`,
              borderRadius: 99, animation: "progressBar 2.4s ease-in-out infinite",
            }}/>
          </div>
        </div>
      }>
        <Spline
          scene="https://prod.spline.design/cJKHQFEmHtIvACtt/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
    </div>

    {/* CTA — fixed height, never pushed off screen */}
    <div style={{
      flexShrink: 0,                // ← KEY FIX: never shrink the CTA
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: 12,
      padding: isMobile ? "14px 20px 20px" : "18px 20px 24px",
      width: "100%",
      animation: "fadeSlideUp 0.5s ease 0.2s both",
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontSize: isMobile ? 15 : 17, fontWeight: 700,
          color: T.text1, margin: "0 0 5px", letterSpacing: "-0.4px",
        }}>Meet Serabo AI</p>
        <p style={{
          fontSize: 13, color: T.text3, margin: 0,
          lineHeight: "1.6", maxWidth: "280px",
        }}>Start a new chat or pick a conversation from the sidebar</p>
      </div>
      <button
        onClick={async () => {
          setInput("");
          setActiveConv(null);
          const newId = await newchat();
          if (newId) setActiveSessionId(newId);
        }}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "11px 28px", borderRadius: 12,
          border: `1px solid rgba(99,102,241,0.3)`,
          background: T.accentDim, color: T.accent,
          fontSize: 13.5, fontWeight: 600, cursor: "pointer",
          fontFamily: "'Sora',sans-serif", transition: "all 0.15s",
          boxShadow: `0 4px 14px rgba(99,102,241,0.12)`,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = T.accentDimHov;
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = `0 6px 20px rgba(99,102,241,0.22)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = T.accentDim;
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = `0 4px 14px rgba(99,102,241,0.12)`;
        }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Start new chat
      </button>
    </div>
  </div>
)}
