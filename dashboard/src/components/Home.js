// dashboard/src/components/Home.js
import React, { useEffect } from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
      // If no token, bounce to frontend login
      window.location.href = "http://localhost:3000/login";
    }
  }, []);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
