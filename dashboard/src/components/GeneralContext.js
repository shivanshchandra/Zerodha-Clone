import React, { useEffect, useState } from "react";
import api from "../api";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  user: null,
  logout: () => {},
  openBuyWindow: (uid) => {},
  openSellWindow: (uid) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const [isActionWindowOpen, setIsActionWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [mode, setMode] = useState("BUY"); // BUY or SELL

  // ✅ load logged-in user once
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/me"); // backend route
        setUser(res.data);
      } catch (err) {
        console.log("Failed to load user:", err?.response?.data || err.message);
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const handleOpenBuyWindow = (uid) => {
    setMode("BUY");
    setSelectedStockUID(uid);
    setIsActionWindowOpen(true);
  };

  const handleOpenSellWindow = (uid) => {
    setMode("SELL");
    setSelectedStockUID(uid);
    setIsActionWindowOpen(true);
  };

  const handleCloseWindow = () => {
    setIsActionWindowOpen(false);
    setSelectedStockUID("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/auth"; // landing frontend auth page
  };

  return (
    <GeneralContext.Provider
      value={{
        user,
        logout,
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeBuyWindow: handleCloseWindow,
      }}
    >
      {props.children}

      {isActionWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} mode={mode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;