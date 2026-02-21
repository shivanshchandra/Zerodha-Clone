const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: String, default: "CNC" },
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

const PositionsModel =
  mongoose.models.Position || mongoose.model("Position", PositionsSchema);

module.exports = { PositionsModel };