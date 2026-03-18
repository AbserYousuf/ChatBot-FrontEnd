import { useContext, useState, useRef, useEffect, lazy, Suspense } from "react";
import ChatContext from "../Chcontext/CHContext";

const Spline = lazy(() => import('@splinetool/react-spline'))

const T = {
  bg:           "#f0edff",
  bgGrad:       "linear-gradient(155deg,#f0edff 0%,#e8f0ff 50%,#f5f3ff 100%)",
  surface:      "rgba(255,255,255,0.88)",
  surfaceHov:   "rgba(255,255,255,0.96)",
  border:       "rgba(139,92,246,0.15)",
  borderSub:    "rgba(139,92,246,0.08)",
  borderHov:    "rgba(139,92,246,0.35)",
  accent:       "#6366f1",
  accentMid:    "#8b5cf6",
  accentDim:    "rgba(99,102,241,0.12)",
  accentDimHov: "rgba(99,102,241,0.2)",
  text1:        "#1e1b4b",
  text2:        "#475569",
  text3:        "#94a3b8",
  text4:        "#c4c0db",
  green:        "#22c55e",
  amber:        "#f59e0b",
  red:          "#f43f5e",
  shadow:       "0 4px 6px rgba(99,102,241,0.04), 0 20px 60px rgba(99,102,241,0.10)",
};

const TypingDots = () => (
  <div style={{ display:"flex", alignItems:"center", gap:5, padding:"2px 0" }}>
    {[0,1,2].map(i => (
      <div key={i} style={{
        width:6, height:6, borderRadius:"50%",
        background:`linear-gradient(135deg,${T.accent},${T.accentMid})`,
        animation:`typingBounce 1.4s ease-in-out ${i*0.2}s infinite`,
        opacity:0.8,
      }}/>
    ))}
  </div>
);

const AIMessage = ({ msg, isNew, isMobile }) => (
  <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:22, animation:isNew?"fadeSlideUp 0.3s ease both":"none" }}>
    <div style={{
      width:32, height:32, borderRadius:10, flexShrink:0, marginTop:2,
      background:`linear-gradient(135deg,${T.accent},${T.accentMid})`,
      display:"flex", alignItems:"center", justifyContent:"center",
      boxShadow:`0 4px 12px rgba(99,102,241,0.35)`,
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
    <div style={{ maxWidth: isMobile ? "85%" : "72%", minWidth:0 }}>
      <div style={{
        padding:"12px 16px", borderRadius:"4px 14px 14px 14px",
        background:T.surface, border:`1px solid ${T.border}`,
        color:T.text1, fontSize: isMobile ? 14 : 14.5, lineHeight:"1.75",
        fontFamily:"'Sora',sans-serif", letterSpacing:"0.01em",
        wordBreak:"break-word", boxShadow:`0 2px 16px rgba(99,102,241,0.07)`,
        backdropFilter:"blur(10px)",
      }}>
        {msg.text}
      </div>
      <p style={{ fontSize:10.5, marginTop:5, marginLeft:2, color:T.text4, fontFamily:"'Sora',sans-serif", letterSpacing:"0.05em" }}>
        Serabo AI · {msg.time}
      </p>
    </div>
  </div>
);

const UserMessage = ({ msg, isNew, initials, isMobile }) => (
  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"flex-end", gap:10, marginBottom:22, animation:isNew?"fadeSlideUp 0.3s ease both":"none" }}>
    <div style={{ maxWidth: isMobile ? "85%" : "72%", minWidth:0 }}>
      <div style={{
        padding:"12px 16px", borderRadius:"14px 4px 14px 14px",
        background:"linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.1))",
        border:`1px solid rgba(99,102,241,0.25)`, color:T.text1,
        fontSize: isMobile ? 14 : 14.5, lineHeight:"1.75",
        fontFamily:"'Sora',sans-serif", letterSpacing:"0.01em",
        wordBreak:"break-word", boxShadow:`0 2px 16px rgba(99,102,241,0.07)`,
      }}>
        {msg.text}
      </div>
      <p style={{ fontSize:10.5, marginTop:5, textAlign:"right", marginRight:2, color:T.text4, fontFamily:"'Sora',sans-serif", letterSpacing:"0.05em" }}>
        You · {msg.time}
      </p>
    </div>
    <div style={{
      width:32, height:32, borderRadius:10, flexShrink:0, marginTop:2,
      background:T.accentDim, border:`1px solid rgba(99,102,241,0.25)`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:11, fontWeight:700, color:T.accent, fontFamily:"'Sora',sans-serif",
    }}>
      {initials}
    </div>
  </div>
);

export default function Chat() {
  const [collapsed,       setCollapsed]       = useState(false);
  const [activeConv,      setActiveConv]       = useState(null);
  const [hoveredConv,     setHoveredConv]      = useState(null);
  const [openMenu,        setOpenMenu]         = useState(null);
  const [chatid,          setchatid]           = useState(null);
  const [showLogout,      setShowLogout]       = useState(false);
  const [isMobile,        setIsMobile]         = useState(false);

  const chatCtx = useContext(ChatContext);
  const {
    history, logout, sendchat, ai, getsession, update,
    deleteAllChats, deletesession, newsession, notify,
    longmessage, setLongMessage, stop, isTyping, setIsTyping, user
  } = chatCtx;

  const [messages,        setMessages]         = useState([]);
  const [input,           setInput]            = useState("");
  const [newIds,          setNewIds]           = useState(new Set());
  const [activeSessionId, setActiveSessionId]  = useState(null);
  const [editingConvId,   setEditingConvId]    = useState(null);
  const [title,           settitle]            = useState("");

  const bottomRef      = useRef(null);
  const textareaRef    = useRef(null);
  const renameInputRef = useRef(null);
  const idCounter      = useRef(0);

  const nextId   = () => { idCounter.current += 1; return idCounter.current; };
  const now      = () => new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
  const initials = user?.username ? user.username.slice(0,2).toUpperCase() : "ME";

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const initId = nextId();
    setMessages([{ id:initId, role:"ai", text:"Welcome to Serabo AI. I'm ready to assist with research, analysis, or any question you have.", time:now() }]);
    setNewIds(new Set([initId]));
  }, []);

  useEffect(() => {
    if (!ai) return;
    const aiId = nextId();
    setMessages(prev => [...prev, { id:aiId, role:"ai", text:ai, time:now() }]);
    setNewIds(prev => new Set([...prev, aiId]));
    setIsTyping(false);
  }, [ai]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, isTyping]);

  useEffect(() => {
    if (editingConvId && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [editingConvId]);

  const handleLogout = async () => logout();
  const newchat = async () => await newsession();

  const handleSessionClick = async (conv) => {
    if (editingConvId === conv._id) return;
    setActiveConv(conv._id);
    setActiveSessionId(conv.sessionId);
    setchatid(conv.sessionId);
    setMessages([]);
    setIsTyping(false);
    if (isMobile) setCollapsed(true);
    const sessionData = await getsession(conv.sessionId);
    if (Array.isArray(sessionData) && sessionData.length > 0) {
      setMessages(sessionData.map(msg => ({
        id:   msg._id,
        role: msg.role === "assistant" ? "ai" : "user",
        text: msg.content || msg.text || "",
        time: msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) : now(),
      })));
    } else {
      const emptyId = nextId();
      setMessages([{ id:emptyId, role:"ai", text:"This session has no messages yet. Begin whenever you're ready.", time:now() }]);
      setNewIds(new Set([emptyId]));
    }
  };

  const edit               = (conv) => { setEditingConvId(conv._id); settitle(conv.title||""); setOpenMenu(null); };
  const handleRenameSubmit = (id)   => { if (title.trim()) update(id, title.trim()); setEditingConvId(null); settitle(""); };
  const handleRenameCancel = ()     => { setEditingConvId(null); settitle(""); };
  const handleRenameKey    = (e,id) => { if (e.key==="Enter") handleRenameSubmit(id); if (e.key==="Escape") handleRenameCancel(); };
  const removeChats        = ()     => { deleteAllChats(chatid); setMessages([]); };
  const removesession      = (id)   => deletesession(id);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isTyping) return;
    if (input.length >= 700) { setLongMessage({ role:"error", msg:"Message exceeds the character limit" }); return; }
    const userId = nextId();
    setMessages(prev => [...prev, { id:userId, role:"user", text, time:now() }]);
    setNewIds(prev => new Set([...prev, userId]));
    setInput("");
    if (textareaRef.current) { textareaRef.current.value=""; textareaRef.current.style.height="auto"; }
    sendchat(text, activeSessionId);
  };

  const handleKey = (e) => {
    if (e.key==="Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.length >= 700) { setLongMessage({ role:"error", msg:"Message exceeds the character limit" }); return; }
      sendMessage();
    }
  };

  const handleInput = (e) => {
    if (e.target.value.length >= 700) { setLongMessage({ role:"info", msg:"Character limit reached" }); return; }
    setInput(e.target.value);
    const ta = textareaRef.current;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 140) + "px";
  };

  const sidebarPosition = isMobile ? "fixed" : "relative";
  const sidebarZIndex   = isMobile ? 100 : 2;

  return (
    <div style={{
      display:"flex", height:"100vh",
      background:T.bgGrad,
      fontFamily:"'Sora',sans-serif",
      position:"relative", overflow:"hidden",
    }}>
      {/* Ambient orbs */}
      <div style={{ position:"fixed", top:"8%", left:"4%", width:"320px", height:"320px", borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.1),transparent)", pointerEvents:"none", zIndex:0 }}/>
      <div style={{ position:"fixed", bottom:"12%", right:"6%", width:"260px", height:"260px", borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.08),transparent)", pointerEvents:"none", zIndex:0 }}/>

      {/* Mobile backdrop */}
      {isMobile && !collapsed && (
        <div onClick={() => setCollapsed(true)} style={{ position:"fixed", inset:0, zIndex:99, background:"rgba(15,10,40,0.45)", backdropFilter:"blur(2px)", animation:"fadeIn 0.2s ease both" }}/>
      )}

      {/* ══════════════════════ SIDEBAR ══════════════════════ */}
      <div style={{
        width: collapsed ? 62 : 260,
        height:"100vh", top:0, left:0,
        transition:"width 0.28s cubic-bezier(0.4,0,0.2,1)",
        display:"flex", flexDirection:"column",
        background: isMobile ? "rgba(245,243,255,0.98)" : T.surface,
        backdropFilter:"blur(20px)",
        borderRight:`1px solid ${T.border}`,
        flexShrink:0, overflow:"hidden",
        position: sidebarPosition, zIndex: sidebarZIndex,
        boxShadow: isMobile && !collapsed ? `8px 0 40px rgba(99,102,241,0.18)` : `4px 0 24px rgba(99,102,241,0.06)`,
      }}>

        {/* Brand */}
        <div style={{ padding: collapsed ? "18px 0" : "16px 18px", display:"flex", alignItems:"center", justifyContent: collapsed ? "center" : "space-between", borderBottom:`1px solid ${T.borderSub}`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:10, flexShrink:0, background:`linear-gradient(135deg,${T.accent},${T.accentMid})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 12px rgba(99,102,241,0.4)` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
            {!collapsed && (
              <div style={{ lineHeight:1 }}>
                <p style={{ fontSize:17, fontWeight:700, color:T.text1, letterSpacing:"-0.4px", margin:0, background:`linear-gradient(135deg,${T.text1},${T.accent})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Serabo</p>
                <p style={{ fontSize:9, color:T.accentMid, margin:0, letterSpacing:"3px", textTransform:"uppercase", fontWeight:600 }}>AI</p>
              </div>
            )}
          </div>
          {!collapsed ? (
            <button onClick={() => setCollapsed(true)} style={{ width:26, height:26, borderRadius:7, border:`1px solid ${T.borderSub}`, background:"transparent", cursor:"pointer", color:T.text3, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s", flexShrink:0 }}
              onMouseEnter={e=>{ e.currentTarget.style.background=T.accentDim; e.currentTarget.style.color=T.accent; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=T.text3; }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          ) : (
            <button onClick={() => setCollapsed(false)} style={{ marginTop:8, width:26, height:26, borderRadius:7, border:`1px solid ${T.borderSub}`, background:"transparent", cursor:"pointer", color:T.text3, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background=T.accentDim; e.currentTarget.style.color=T.accent; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=T.text3; }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          )}
        </div>

        {/* New Session */}
        <div style={{ padding:"10px 10px 4px", flexShrink:0 }}>
          <button onClick={async () => {
            setActiveConv(null); setActiveSessionId(null); setInput("");
            const newId = await newchat();
            if (newId) setActiveSessionId(newId);
            const initId = nextId();
            setMessages([{ id:initId, role:"ai", text:"New session started. How can I help you today?", time:now() }]);
            setNewIds(new Set([initId]));
            if (isMobile) setCollapsed(true);
          }} style={{
            width:"100%", display:"flex", alignItems:"center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap:8, padding: collapsed ? "8px 0" : "9px 13px",
            borderRadius:10, border:`1px solid rgba(99,102,241,0.3)`,
            background:T.accentDim, color:T.accent,
            fontSize:12, fontWeight:600, cursor:"pointer",
            letterSpacing:"0.2px", fontFamily:"'Sora',sans-serif",
            transition:"all 0.15s", boxShadow:`0 2px 8px rgba(99,102,241,0.1)`,
          }}
            onMouseEnter={e=>{ e.currentTarget.style.background=T.accentDimHov; e.currentTarget.style.borderColor=T.accent; }}
            onMouseLeave={e=>{ e.currentTarget.style.background=T.accentDim; e.currentTarget.style.borderColor="rgba(99,102,241,0.3)"; }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            {!collapsed && <span>New Chat</span>}
          </button>
        </div>

        {/* History label */}
        {!collapsed && (
          <p style={{ padding:"12px 14px 5px", fontSize:10, fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase", color:T.text4, margin:0, flexShrink:0 }}>History</p>
        )}

        {/* Conversation list */}
        <div style={{ flex:1, overflowY:"auto", padding:"2px 8px", scrollbarWidth:"none" }}>
          {history.map(conv => (
            <div key={conv._id} style={{ position:"relative", marginBottom:2 }}
              onMouseEnter={() => setHoveredConv(conv._id)}
              onMouseLeave={() => { setHoveredConv(null); setOpenMenu(null); }}
              onClick={() => handleSessionClick(conv)}>

              {editingConvId === conv._id && !collapsed ? (
                <div style={{ margin:"2px 0", padding:"12px 14px", borderRadius:10, background:T.surfaceHov, border:`1px solid ${T.border}`, animation:"fadeSlideUp 0.16s ease both" }} onClick={e=>e.stopPropagation()}>
                  <p style={{ fontSize:10, fontWeight:600, letterSpacing:"1px", textTransform:"uppercase", color:T.text3, margin:"0 0 8px" }}>Rename</p>
                  <input ref={renameInputRef} type="text" value={title}
                    onChange={e=>settitle(e.target.value)} onKeyDown={e=>handleRenameKey(e,conv.sessionId)}
                    placeholder="New name…"
                    style={{ width:"100%", padding:"8px 10px", borderRadius:8, border:`1.5px solid ${T.border}`, background:"rgba(255,255,255,0.6)", color:T.text1, fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"'Sora',sans-serif" }}
                    onFocus={e=>{ e.target.style.borderColor=T.accent; e.target.style.boxShadow=`0 0 0 3px rgba(99,102,241,0.1)`; }}
                    onBlur={e=>{ e.target.style.borderColor=T.border; e.target.style.boxShadow="none"; }}/>
                  <div style={{ display:"flex", gap:6, marginTop:8 }}>
                    <button onClick={handleRenameCancel} style={{ flex:1, padding:"6px 0", borderRadius:7, border:`1px solid ${T.borderSub}`, background:"transparent", color:T.text3, fontSize:12, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}
                      onMouseEnter={e=>e.currentTarget.style.color=T.text2}
                      onMouseLeave={e=>e.currentTarget.style.color=T.text3}>Cancel</button>
                    <button onClick={()=>handleRenameSubmit(conv.sessionId)} disabled={!title.trim()}
                      style={{ flex:1, padding:"6px 0", borderRadius:7, border:"none", background:title.trim()?`linear-gradient(135deg,${T.accent},${T.accentMid})`:"transparent", color:title.trim()?"white":T.text4, fontSize:12, cursor:title.trim()?"pointer":"not-allowed", fontFamily:"'Sora',sans-serif" }}>Save</button>
                  </div>
                </div>
              ) : (
                <>
                  <button style={{
                    width:"100%", display:"flex", alignItems:"center",
                    gap:9, padding: collapsed ? "8px 0" : "8px 11px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius:10,
                    border: activeConv===conv._id ? `1px solid ${T.border}` : "1px solid transparent",
                    background: activeConv===conv._id ? T.surfaceHov : hoveredConv===conv._id ? "rgba(255,255,255,0.5)" : "transparent",
                    cursor:"pointer", textAlign:"left", position:"relative", transition:"all 0.12s",
                  }}>
                    {activeConv===conv._id && (
                      <div style={{ position:"absolute", left:0, top:"50%", transform:"translateY(-50%)", width:3, height:16, borderRadius:2, background:`linear-gradient(${T.accent},${T.accentMid})` }}/>
                    )}
                    <div style={{ width:26, height:26, borderRadius:8, flexShrink:0, background: activeConv===conv._id ? T.accentDim : "rgba(99,102,241,0.05)", border:`1px solid ${activeConv===conv._id ? "rgba(99,102,241,0.3)" : T.borderSub}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={activeConv===conv._id ? T.accent : T.text4} strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    {!collapsed && (
                      <p style={{ flex:1, minWidth:0, fontSize:13, color:activeConv===conv._id?T.text1:T.text2, fontWeight:activeConv===conv._id?600:400, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", margin:0, paddingRight:22, letterSpacing:"-0.1px" }}>
                        {conv.title}
                      </p>
                    )}
                  </button>

                  {!collapsed && (hoveredConv===conv._id || openMenu===conv._id) && (
                    <button onClick={e=>{ e.stopPropagation(); setOpenMenu(openMenu===conv._id?null:conv._id); }}
                      style={{ position:"absolute", right:6, top:"50%", transform:"translateY(-50%)", width:22, height:22, borderRadius:6, border:`1px solid ${T.borderSub}`, background:openMenu===conv._id?T.accentDim:"rgba(255,255,255,0.6)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.text3, zIndex:10, transition:"all 0.12s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.color=T.accent; e.currentTarget.style.borderColor=T.border; }}
                      onMouseLeave={e=>{ if(openMenu!==conv._id){e.currentTarget.style.color=T.text3; e.currentTarget.style.borderColor=T.borderSub;} }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                    </button>
                  )}

                  {openMenu===conv._id && (
                    <div style={{ position:"absolute", right:5, top:"calc(100% + 3px)", background:T.surfaceHov, border:`1px solid ${T.border}`, borderRadius:12, overflow:"hidden", zIndex:50, minWidth:140, boxShadow:`0 8px 32px rgba(99,102,241,0.15)`, animation:"fadeSlideUp 0.14s ease both", backdropFilter:"blur(16px)" }}>
                      <button onClick={e=>{ e.stopPropagation(); edit(conv); }}
                        style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"10px 14px", border:"none", background:"transparent", color:T.text2, fontSize:13, cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.1s" }}
                        onMouseEnter={e=>{ e.currentTarget.style.background=T.accentDim; e.currentTarget.style.color=T.accent; }}
                        onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=T.text2; }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Rename
                      </button>
                      <div style={{ height:1, background:T.borderSub, margin:"0 12px" }}/>
                      <button onClick={e=>{ e.stopPropagation(); setOpenMenu(null); removesession(conv.sessionId); }}
                        style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"10px 14px", border:"none", background:"transparent", color:"#f43f5e99", fontSize:13, cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.1s" }}
                        onMouseEnter={e=>{ e.currentTarget.style.background="rgba(244,63,94,0.06)"; e.currentTarget.style.color=T.red; }}
                        onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#f43f5e99"; }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Clear All */}
        {!collapsed && (
          <div style={{ padding:"4px 10px 6px", flexShrink:0 }}>
            <button onClick={removeChats}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:6, padding:"7px 13px", borderRadius:8, border:"1px solid rgba(244,63,94,0.12)", background:"transparent", color:"rgba(244,63,94,0.5)", fontSize:11.5, cursor:"pointer", letterSpacing:"0.3px", fontFamily:"'Sora',sans-serif", transition:"all 0.15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(244,63,94,0.06)"; e.currentTarget.style.borderColor="rgba(244,63,94,0.3)"; e.currentTarget.style.color=T.red; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(244,63,94,0.12)"; e.currentTarget.style.color="rgba(244,63,94,0.5)"; }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
              Clear All
            </button>
          </div>
        )}

        <div style={{ height:1, background:T.borderSub, margin:"0 12px", flexShrink:0 }}/>

        {/* User profile */}
        <div style={{ padding:"8px 10px 14px", flexShrink:0 }}>
          <div style={{ position:"relative" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, padding: collapsed ? "8px 0" : "9px 12px", justifyContent: collapsed ? "center" : "flex-start", borderRadius:10, border:`1px solid ${T.borderSub}`, background:"rgba(255,255,255,0.5)", cursor:"pointer", transition:"all 0.12s" }}
              onClick={() => !collapsed && setShowLogout(p=>!p)}
              onMouseEnter={e=>{ e.currentTarget.style.background=T.surface; e.currentTarget.style.borderColor=T.border; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor=T.borderSub; }}>
              <div style={{ width:32, height:32, borderRadius:10, flexShrink:0, background:`linear-gradient(135deg,${T.accent},${T.accentMid})`, border:`1px solid rgba(99,102,241,0.3)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"white", fontFamily:"'Sora',sans-serif", boxShadow:`0 3px 10px rgba(99,102,241,0.3)` }}>
                {initials}
              </div>
              {!collapsed && (
                <>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13, fontWeight:600, color:T.text1, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", letterSpacing:"-0.2px" }}>{user?.name || "User"}</p>
                    <p style={{ fontSize:10.5, color:T.text3, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.email || "Serabo AI"}</p>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.text3} strokeWidth="2" strokeLinecap="round" style={{ transform: showLogout?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s", flexShrink:0 }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </>
              )}
            </div>

            {showLogout && !collapsed && (
              <div style={{ position:"absolute", bottom:"calc(100% + 8px)", left:0, right:0, background:T.surfaceHov, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden", boxShadow:`0 12px 40px rgba(99,102,241,0.18)`, backdropFilter:"blur(20px)", animation:"fadeSlideUp 0.2s ease both", zIndex:50 }}>
                <div style={{ padding:"16px 16px 12px", borderBottom:`1px solid ${T.borderSub}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                    <div style={{ width:44, height:44, borderRadius:13, flexShrink:0, background:`linear-gradient(135deg,${T.accent},${T.accentMid})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"white", fontFamily:"'Sora',sans-serif", boxShadow:`0 4px 14px rgba(99,102,241,0.4)` }}>{initials}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:14, fontWeight:700, color:T.text1, margin:0, letterSpacing:"-0.3px" }}>{user?.name || user?.username || "User"}</p>
                      <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:T.green, boxShadow:`0 0 6px ${T.green}` }}/>
                        <p style={{ fontSize:10.5, color:T.green, margin:0, fontWeight:600 }}>Active</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                    {[
                      { icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>, label:"Name",     value: user?.name     || "—" },
                      { icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label:"Username", value:`@${user?.username||"—"}` },
                      { icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg>, label:"Email",    value: user?.email    || "—" },
                    ].map(({ icon, label, value }) => (
                      <div key={label} style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 10px", borderRadius:9, background:"rgba(99,102,241,0.04)", border:`1px solid ${T.borderSub}` }}>
                        <span style={{ flexShrink:0 }}>{icon}</span>
                        <div style={{ flex:1, minWidth:0 }}>
                          <p style={{ fontSize:9.5, fontWeight:600, color:T.text4, margin:0, letterSpacing:"1px", textTransform:"uppercase" }}>{label}</p>
                          <p style={{ fontSize:12.5, fontWeight:500, color:T.text1, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={handleLogout} style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"12px 16px", border:"none", background:"transparent", color:T.red, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.12s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(244,63,94,0.07)"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{ width:28, height:28, borderRadius:8, background:"rgba(244,63,94,0.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.red} strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  </div>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════ MAIN CHAT ══════════════════════ */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", background:"transparent", position:"relative", zIndex:1, width: isMobile ? "100%" : "auto", minWidth:0 }}>

        {/* Topbar */}
        <div style={{ borderBottom:`1px solid ${T.borderSub}`, flexShrink:0, background:T.surface, backdropFilter:"blur(16px)" }}>
          <div style={{ padding: isMobile ? "12px 16px" : "14px 26px", display:"flex", alignItems:"center", gap:12 }}>
            {isMobile && collapsed && (
              <button onClick={() => setCollapsed(false)} style={{ width:34, height:34, borderRadius:10, border:`1px solid ${T.borderSub}`, background:T.accentDim, cursor:"pointer", color:T.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            )}
            <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,${T.accent},${T.accentMid})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 12px rgba(99,102,241,0.35)`, flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/>
                <circle cx="12" cy="4" r="1.8" fill="white" opacity="0.6"/>
                <circle cx="12" cy="20" r="1.8" fill="white" opacity="0.6"/>
                <circle cx="4" cy="12" r="1.8" fill="white" opacity="0.6"/>
                <circle cx="20" cy="12" r="1.8" fill="white" opacity="0.6"/>
              </svg>
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize: isMobile ? 14 : 15, fontWeight:700, color:T.text1, margin:0, letterSpacing:"-0.3px" }}>Serabo AI</p>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:2 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:isTyping?T.amber:T.green, animation:"statusPulse 3s ease-in-out infinite", transition:"background 0.4s", boxShadow:isTyping?`0 0 6px ${T.amber}`:`0 0 6px ${T.green}` }}/>
                <p style={{ fontSize:11.5, color:T.text3, margin:0 }}>{isTyping?"Thinking…":"Ready"}</p>
              </div>
            </div>
          </div>
          {notify?.msg && (
            <div style={{ margin:"0 18px 10px", padding:"9px 14px", borderRadius:10, background:notify.role==="error"?"rgba(244,63,94,0.06)":T.accentDim, border:`1px solid ${notify.role==="error"?"rgba(244,63,94,0.2)":"rgba(99,102,241,0.2)"}`, backdropFilter:"blur(12px)", display:"flex", alignItems:"center", gap:9, animation:"fadeSlideUp 0.2s ease both" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={notify.role==="error"?T.red:T.accent} strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p style={{ fontSize:12.5, color:notify.role==="error"?T.red:T.accent, margin:0, fontFamily:"'Sora',sans-serif" }}>{notify.msg}</p>
            </div>
          )}
        </div>

        {/* Messages area */}
        <div style={{ flex:1, overflowY:"auto", padding: activeSessionId ? (isMobile ? "20px 16px 12px" : "28px 36px 12px") : "0", scrollbarWidth:"none" }}>

          {/* ── Empty state: Robot ── */}
          {!activeSessionId && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", height:"100%", animation:"fadeSlideUp 0.4s ease both" }}>

              {/* Spline robot */}
              <div style={{ width:"100%", height: isMobile ? "calc(100vh - 320px)" : "calc(100vh - 130px)", position:"relative", flexShrink:0 }}>

                {/* Name tag */}
                <div style={{ position:"absolute", top:16, left:"50%", transform:"translateX(-50%)", zIndex:5, display:"flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.88)", backdropFilter:"blur(12px)", border:`1px solid rgba(139,92,246,0.2)`, borderRadius:99, padding:"5px 14px 5px 10px", boxShadow:"0 4px 20px rgba(99,102,241,0.12)", whiteSpace:"nowrap" }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:T.green, boxShadow:`0 0 7px ${T.green}`, animation:"statusPulse 2s ease-in-out infinite" }}/>
                  <p style={{ margin:0, fontSize:12, fontWeight:600, color:T.text1, fontFamily:"'Sora',sans-serif", letterSpacing:"0.2px" }}>Serabo AI · Online</p>
                </div>

                {/* Drag hint */}
                <div style={{ position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", zIndex:5, whiteSpace:"nowrap", background:"rgba(255,255,255,0.82)", backdropFilter:"blur(10px)", border:`1px solid rgba(139,92,246,0.15)`, borderRadius:99, padding:"4px 12px", display:"flex", alignItems:"center", gap:6 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0m-4 8V6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v2m-2 6v-1a1 1 0 0 1 1-1h1a3 3 0 0 1 3 3 0 0 1 0 6H9a9 9 0 0 1-3-2.2L3 14"/>
                  </svg>
                  <p style={{ margin:0, fontSize:10.5, color:"#8b5cf6", fontWeight:500, fontFamily:"'Sora',sans-serif" }}>Drag & interact</p>
                </div>

                <Suspense fallback={
                  <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:14 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg,${T.accent},${T.accentMid})`, display:"flex", alignItems:"center", justifyContent:"center", animation:"statusPulse 1.6s ease-in-out infinite" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/><circle cx="12" cy="4" r="1.8" fill="white" opacity="0.6"/><circle cx="12" cy="20" r="1.8" fill="white" opacity="0.6"/><circle cx="4" cy="12" r="1.8" fill="white" opacity="0.6"/><circle cx="20" cy="12" r="1.8" fill="white" opacity="0.6"/></svg>
                    </div>
                    <p style={{ margin:0, fontSize:12, color:T.text3, fontFamily:"'Sora',sans-serif" }}>Loading Serabo AI…</p>
                    <div style={{ width:100, height:2.5, borderRadius:99, background:"rgba(139,92,246,0.12)", overflow:"hidden" }}>
                      <div style={{ height:"100%", background:`linear-gradient(90deg,${T.accent},${T.accentMid},#a78bfa)`, borderRadius:99, animation:"progressBar 2.4s ease-in-out infinite" }}/>
                    </div>
                  </div>
                }>
                  <Spline
                    scene="https://prod.spline.design/cJKHQFEmHtIvACtt/scene.splinecode"
                    style={{ width:"100%", height:"100%" }}
                  />
                </Suspense>
              </div>

              {/* CTA */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, paddingTop:6, animation:"fadeSlideUp 0.5s ease 0.2s both" }}>
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontSize: isMobile ? 15 : 17, fontWeight:700, color:T.text1, margin:"0 0 5px", letterSpacing:"-0.4px" }}>Meet Serabo AI</p>
                  <p style={{ fontSize:13, color:T.text3, margin:0, lineHeight:"1.6", maxWidth:"280px" }}>Start a new chat or pick a conversation from the sidebar</p>
                </div>
                <button
                  onClick={async () => { setInput(""); setActiveConv(null); const newId = await newchat(); if (newId) setActiveSessionId(newId); }}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 28px", borderRadius:12, border:`1px solid rgba(99,102,241,0.3)`, background:T.accentDim, color:T.accent, fontSize:13.5, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.15s", boxShadow:`0 4px 14px rgba(99,102,241,0.12)` }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=T.accentDimHov; e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow=`0 6px 20px rgba(99,102,241,0.22)`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background=T.accentDim; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 14px rgba(99,102,241,0.12)`; }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Start new chat
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map(msg =>
            msg.role==="ai"
              ? <AIMessage key={msg.id} msg={msg} isNew={newIds.has(msg.id)} isMobile={isMobile}/>
              : <UserMessage key={msg.id} msg={msg} isNew={newIds.has(msg.id)} initials={initials} isMobile={isMobile}/>
          )}

          {!stop && isTyping && (
            <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:16, animation:"fadeSlideUp 0.22s ease both" }}>
              <div style={{ width:32, height:32, borderRadius:10, background:`linear-gradient(135deg,${T.accent},${T.accentMid})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2, boxShadow:`0 4px 12px rgba(99,102,241,0.35)` }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/><circle cx="12" cy="4" r="1.8" fill="white" opacity="0.6"/><circle cx="12" cy="20" r="1.8" fill="white" opacity="0.6"/><circle cx="4" cy="12" r="1.8" fill="white" opacity="0.6"/><circle cx="20" cy="12" r="1.8" fill="white" opacity="0.6"/></svg>
              </div>
              <div style={{ padding:"12px 16px", borderRadius:"4px 14px 14px 14px", background:T.surface, border:`1px solid ${T.border}`, marginTop:2, boxShadow:`0 2px 16px rgba(99,102,241,0.07)`, backdropFilter:"blur(10px)" }}>
                <TypingDots/>
              </div>
            </div>
          )}

          <div ref={bottomRef}/>
        </div>

        {/* Input area */}
        <div style={{ padding: isMobile ? "8px 12px 14px" : "8px 24px 16px", flexShrink:0, borderTop:`1px solid ${T.borderSub}`, background:T.surface, backdropFilter:"blur(16px)" }}>
          {activeSessionId && (
            <>
              <div style={{ position:"relative" }}>
                {longmessage?.msg && (
                  <div style={{ position:"absolute", bottom:"calc(100% + 10px)", left:"50%", transform:"translateX(-50%)", whiteSpace:"nowrap", padding:"8px 14px", borderRadius:10, background:"rgba(244,63,94,0.08)", border:"1px solid rgba(244,63,94,0.25)", backdropFilter:"blur(16px)", display:"flex", alignItems:"center", gap:8, animation:"fadeSlideUp 0.18s ease both", zIndex:20 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.red} strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0 }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <p style={{ fontSize:12.5, color:T.red, margin:0, fontFamily:"'Sora',sans-serif" }}>{longmessage.msg}</p>
                  </div>
                )}
                <div style={{ display:"flex", alignItems:"flex-end", gap:8, padding:"10px 12px", borderRadius:14, border:input?`1.5px solid rgba(99,102,241,0.35)`:`1px solid ${T.border}`, background:"rgba(255,255,255,0.7)", backdropFilter:"blur(10px)", transition:"all 0.2s", boxShadow:input?`0 0 0 3.5px rgba(99,102,241,0.08)`:`0 2px 12px rgba(99,102,241,0.05)` }}>
                  {!isMobile && (
                    <button style={{ width:28, height:28, borderRadius:7, border:"none", background:"transparent", cursor:"pointer", color:T.text4, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginBottom:1 }}
                      onMouseEnter={e=>e.currentTarget.style.color=T.text3}
                      onMouseLeave={e=>e.currentTarget.style.color=T.text4}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                    </button>
                  )}
                  <textarea ref={textareaRef} value={input} onChange={handleInput} onKeyDown={handleKey}
                    placeholder="Ask Serabo AI anything…" rows={1}
                    style={{ flex:1, background:"transparent", border:"none", outline:"none", resize:"none", fontSize: isMobile ? 14 : 14.5, lineHeight:"1.65", color:T.text1, caretColor:T.accent, fontFamily:"'Sora',sans-serif", maxHeight:140, overflowY:"auto", scrollbarWidth:"none" }}/>
                  <button onClick={sendMessage} disabled={!input.trim() || isTyping || input.trim().length>=700}
                    style={{ width:34, height:34, borderRadius:10, border:"none", background:input.trim()&&!isTyping?`linear-gradient(135deg,${T.accent},${T.accentMid})`:"rgba(99,102,241,0.08)", color:input.trim()&&!isTyping?"white":T.text4, cursor:input.trim()&&!isTyping?"pointer":"not-allowed", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s", boxShadow:input.trim()&&!isTyping?`0 4px 12px rgba(99,102,241,0.35)`:"none" }}
                    onMouseEnter={e=>{ if(input.trim()&&!isTyping){e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow=`0 6px 18px rgba(99,102,241,0.45)`;} }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
              </div>
              {!isMobile && (
                <p style={{ textAlign:"center", fontSize:10.5, color:T.text4, marginTop:8, fontFamily:"'Sora',sans-serif" }}>
                  <kbd style={{ background:"rgba(99,102,241,0.06)", border:`1px solid ${T.borderSub}`, padding:"1px 6px", borderRadius:4, fontSize:10, color:T.text3, fontFamily:"'Sora',sans-serif" }}>Enter</kbd>
                  {" "}to send ·{" "}
                  <kbd style={{ background:"rgba(99,102,241,0.06)", border:`1px solid ${T.borderSub}`, padding:"1px 6px", borderRadius:4, fontSize:10, color:T.text3, fontFamily:"'Sora',sans-serif" }}>Shift+Enter</kbd>
                  {" "}for new line
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes typingBounce { 0%,80%,100%{transform:translateY(0);opacity:0.3} 40%{transform:translateY(-5px);opacity:1} }
        @keyframes statusPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes progressBar { 0%{width:0%;margin-left:0} 50%{width:70%;margin-left:15%} 100%{width:0%;margin-left:100%} }
        textarea::placeholder { color:${T.text4}; font-family:'Sora',sans-serif; font-size:13px; }
        input::placeholder { color:${T.text4}; font-family:'Sora',sans-serif; }
      `}</style>
    </div>
  );
}