import React from "react";
import "./Popup.css";

export default function Popup({ open, title = "Message", message, onClose }) {
  if (!open) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="popup-head">
          <h4>{title}</h4>
        </div>

        <div className="popup-body">
          <p>{message}</p>
        </div>

        <div className="popup-footer">
          <button className="popup-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}