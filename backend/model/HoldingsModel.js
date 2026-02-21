const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    avg: { type: Number, required: true },
    price: { type: Number, required: true },
    net: { type: String, default: "0%" },
    day: { type: String, default: "0%" },
    isLoss: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const HoldingsModel =
  mongoose.models.Holding || mongoose.model("Holding", HoldingsSchema);

module.exports = { HoldingsModel };