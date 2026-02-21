const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    mode: { type: String, enum: ["BUY", "SELL"], required: true },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError in dev/hot reload
const OrdersModel = mongoose.models.Order || mongoose.model("Order", OrdersSchema);

module.exports = { OrdersModel };