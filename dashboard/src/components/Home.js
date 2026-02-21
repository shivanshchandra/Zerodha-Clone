import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext";

const FRONTEND_AUTH_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/auth"
    : "https://zerodha-frontend-ybnv.onrender.com/auth";

const Home = () => {
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) window.location.href = FRONTEND_AUTH_URL;
  }, []);

  return (
    <GeneralContextProvider>
      <TopBar />
      <Dashboard />
    </GeneralContextProvider>
  );
};

export default Home;