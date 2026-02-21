import React, { useState, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const { closeBuyWindow } = useContext(GeneralContext);

  const handleSubmit = async () => {
    try {
      await api.post("/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode,
      });

      closeBuyWindow();            // ✅ correct
      window.location.reload();    // (later we can remove reload)
    } catch (err) {
      console.error("Order failed:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Order failed");
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow(); // ✅ correct
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h5 style={{ marginBottom: 10 }}>
          {mode} {uid}
        </h5>

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min={1}
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min={0}
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

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
  );
};

export default BuyActionWindow;