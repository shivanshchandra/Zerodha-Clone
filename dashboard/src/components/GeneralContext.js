import React, { useEffect, useState } from "react";
import api from "../api";
import BuyActionWindow from "./BuyActionWindow";
import Popup from "./Popup";

const FRONTEND_AUTH_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/auth"
    : "https://zerodha-frontend-ybnv.onrender.com/auth";

const GeneralContext = React.createContext({
  user: null,
  logout: () => {},
  openBuyWindow: (uid) => {},
  openSellWindow: (uid) => {},
  closeBuyWindow: () => {},
  showPopup: (title, message) => {}, // ✅ add
});

export const GeneralContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const [isActionWindowOpen, setIsActionWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [mode, setMode] = useState("BUY"); // BUY or SELL

  // ✅ Popup state
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
  });

  const showPopup = (title, message) => {
    setPopup({ open: true, title, message });
  };

  const closePopup = () => {
    setPopup({ open: false, title: "", message: "" });
  };

  // ✅ load logged-in user once
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/me");
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
    window.location.href = FRONTEND_AUTH_URL;
  };

  return (
    <GeneralContext.Provider
      value={{
        user,
        logout,
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeBuyWindow: handleCloseWindow,
        showPopup, // ✅ expose to all components
      }}
    >
      {props.children}

      {/* ✅ Buy/Sell modal */}
      {isActionWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} mode={mode} />
      )}

      {/* ✅ Center popup for errors/messages */}
      <Popup
        open={popup.open}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
      />
    </GeneralContext.Provider>
  );
};

export default GeneralContext;