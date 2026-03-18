import React, { useEffect, useState } from "react";
import ChatContext from "./CHContext";
import { useLocation, useNavigate } from "react-router-dom";
import refresh from "../Components/Axios";

export default function HandleChatCon({ children }) {

  const [history, sethistory] = useState([]);
  const [ai, setai] = useState(null);
  const [chat, setchat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [longmessage, setLongMessage] = useState(null);
  const [notify, setNotify] = useState(null);
  const [stop, setStop] = useState(null);
  const [WaitBar, setWaitBar] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

 

  const deleteAllChats = async (id) => {
    try {
      const response = await refresh.delete(`/api/conv/reset/${id}`);

      setNotify({
        role: "success",
        msg: response.data.msg,
      });

    } catch (error) {
      setNotify({
        role: "error",
        msg: error.response?.data?.msg || "Error deleting chats",
      });
    }
  };



  const UserDetails = async () => {
    try {
      const response = await refresh.get("/api/auth/user");

      setUser(response.data.user);

    } catch (error) {
      setNotify({
        role: "error",
        msg: error.response?.data?.msg || "Error fetching user",
      });
    }
  };

  useEffect(() => {
    if (location.pathname === "/chat") {
      UserDetails();
    }
  }, [location]);



  const gethistory = async () => {
    try {
      const response = await refresh.get("/api/session/get");

      const json = response.data;

      const messages = Array.isArray(json)
        ? json
        : json.sessions && Array.isArray(json.sessions)
        ? json.sessions
        : [];

      sethistory(messages);

    } catch (error) {
      console.error(error);
    }
  };

  

  const logout = async () => {
    try {
      await refresh.post("/api/auth/logout");

      localStorage.removeItem("LoginToken");

      setNotify({
        role: "success",
        msg: "Logging you out...",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setNotify({
        role: "error",
        msg: "Logout Failed",
      });
    }
  };

 

  useEffect(() => {
    if (longmessage?.msg) {

      const timer = setTimeout(() => {
        setLongMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [longmessage]);



  useEffect(() => {
    if (location.pathname === "/chat") {
      gethistory();
    }
  }, [location]);



  const deletesession = async (id) => {
    try {

      await refresh.delete(`/api/session/delete/${id}`);

      sethistory((prev) =>
        prev.filter((session) => session.sessionId !== id)
      );

    } catch (error) {
      console.error(error);
    }
  };



  const newsession = async () => {
    try {

      const response = await refresh.post("/api/session/create");

      const json = response.data;

      sethistory((prev) => [
        {
          _id: json._id || json.sessionId,
          sessionId: json.sessionId,
          title: "New Chat",
          icon: "💬",
        },
        ...prev,
      ]);

      return json.sessionId;

    } catch (error) {
      console.error(error);
    }
  };


  const update = async (id, data) => {

    const title = data.trim();

    try {

      await refresh.put(`/api/session/update/${id}`, { title });

      sethistory((prev) =>
        prev.map((session) =>
          session.sessionId === id
            ? { ...session, title }
            : session
        )
      );

    } catch (error) {
      console.error(error);
    }
  };


  const sendchat = async (dm, id) => {

    setWaitBar(true);

    const sessionId = id.trim();
    const message = dm.trim();

    try {

      setIsTyping(true);

      const response = await refresh.post("/api/conv/send", {
        sessionId,
        message,
      });

      const reply = response.data.reply;

      setai(reply ?? null);

    } catch (error) {

      setNotify({
        role: "error",
        msg: error.response?.data?.msg || "Chat Error",
      });

      setStop(true);
      setIsTyping(false);

    } finally {
      setWaitBar(false);
    }
  };



  useEffect(() => {

    if (notify?.msg) {

      const timer = setTimeout(() => {
        setNotify(null);
      }, 5000);

      return () => clearTimeout(timer);
    }

  }, [notify]);



  const getsession = async (sessionId) => {

    setchat([]);

    try {

      const response = await refresh.get(`/api/conv/history/${sessionId}`);

      const json = response.data;

      const Chatinfo = Array.isArray(json)
        ? json
        : json.Chat && Array.isArray(json.Chat)
        ? json.Chat
        : [];

      setchat(Chatinfo);

      return Chatinfo;

    } catch (error) {

      console.error("getsession error:", error);

      return [];
    }
  };

  return (
    <ChatContext.Provider
      value={{
        logout,
        user,
        isTyping,
        setIsTyping,
        stop,
        history,
        gethistory,
        sendchat,
        ai,
        WaitBar,
        getsession,
        chat,
        update,
        newsession,
        deletesession,
        deleteAllChats,
        notify,
        setNotify,
        longmessage,
        setLongMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

