import React, { useState, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState("");

  const { closeBuyWindow } = useContext(GeneralContext);

  const handleSubmit = async () => {
    try {
      await api.post("/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice || 0), // if empty -> 0
        mode,
      });

      closeBuyWindow();
      window.location.reload();
    } catch (err) {
      console.error("Order failed:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Order failed");
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="action-overlay" onClick={handleCancelClick}>
      <div
        className={`container action-modal ${mode === "BUY" ? "buy" : "sell"}`}
        id="buy-window"
        draggable="true"
        onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside
      >
        {/* Header */}
        <div className="header">
          <h3>
            {mode} {uid}  x {stockQuantity} Qty
          </h3>

          <div className="market-options">
            <label>
              <input type="radio" name="ex" defaultChecked />
              BSE ₹212.75
            </label>
            <label>
              <input type="radio" name="ex" />
              NSE ₹212.70
            </label>
          </div>
        </div>

        {/* Simple Tab (only UI look) */}
        <div className="tab">
          <button>Regular</button>
        </div>

        {/* Body */}
        <div className="regular-order">
          <div className="inputs">
            <fieldset>
              <legend>Qty.</legend>
              <input
                type="number"
                min={1}
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />
            </fieldset>

            <fieldset>
              <legend>Price</legend>
              <input
                type="number"
                step="0.05"
                min={0}
                value={stockPrice}
                placeholder="0"
                onChange={(e) => setStockPrice(e.target.value)}
              />
            </fieldset>
          </div>
        </div>

        {/* Footer */}
        <div className="buttons">
          <span>Margin required ₹140.65</span>
          <div>
            <button className="btn btn-blue" onClick={handleSubmit}>
              {mode === "BUY" ? "Buy" : "Sell"}
            </button>

            <button className="btn btn-grey" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;