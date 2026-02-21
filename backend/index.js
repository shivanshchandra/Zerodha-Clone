require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const User = require("./model/UserModel");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://zerodha-frontend-ybnv.onrender.com",
  "https://zerodha-dashboard-43bw.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// auth
app.use("/auth", authRoutes);

// ✅ get logged in user info
app.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to load user" });
  }
});

// ✅ per-user holdings
app.get("/allHoldings", authMiddleware, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({ userId: req.user.id });
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch holdings" });
  }
});

// ✅ per-user positions
app.get("/allPositions", authMiddleware, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({ userId: req.user.id });
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch positions" });
  }
});

// ✅ per-user orders
app.get("/allOrders", authMiddleware, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({ userId: req.user.id }).sort({ _id: -1 });
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const q = Number(qty);
    const p = Number(price);

    if (!name || !q || !p || !mode) {
      return res.status(400).json({ message: "name, qty, price, mode are required" });
    }

    if (q <= 0 || p <= 0) {
      return res.status(400).json({ message: "qty and price must be > 0" });
    }

    // ✅ SELL: user must already own this stock in holdings with enough qty
    if (mode === "SELL") {
      const holding = await HoldingsModel.findOne({ userId: req.user.id, name });

      if (!holding || holding.qty < q) {
        return res.status(400).json({
          message: "You cannot sell this stock (not enough quantity in holdings).",
        });
      }
    }

    // 1) Save order history (always)
    const newOrder = await OrdersModel.create({
      userId: req.user.id,
      name,
      qty: q,
      price: p,
      mode,
    });

    // 2) Update Holdings + Positions
    if (mode === "BUY") {
      // holdings upsert
      const h = await HoldingsModel.findOne({ userId: req.user.id, name });
      if (h) {
        const newQty = h.qty + q;
        const newAvg = (h.avg * h.qty + p * q) / newQty;
        h.qty = newQty;
        h.avg = newAvg;
        h.price = p;
        await h.save();
      } else {
        await HoldingsModel.create({
          userId: req.user.id,
          name,
          qty: q,
          avg: p,
          price: p,
          net: "0%",
          day: "0%",
          isLoss: false,
        });
      }

      // positions upsert (same logic)
      const pos = await PositionsModel.findOne({ userId: req.user.id, name });
      if (pos) {
        const newQty = pos.qty + q;
        const newAvg = (pos.avg * pos.qty + p * q) / newQty;
        pos.qty = newQty;
        pos.avg = newAvg;
        pos.price = p;
        await pos.save();
      } else {
        await PositionsModel.create({
          userId: req.user.id,
          product: "CNC",
          name,
          qty: q,
          avg: p,
          price: p,
          net: "0%",
          day: "0%",
          isLoss: false,
        });
      }
    }

    if (mode === "SELL") {
      // holdings reduce
      const h = await HoldingsModel.findOne({ userId: req.user.id, name });
      h.qty = h.qty - q;
      h.price = p;

      // if qty becomes 0 remove it
      if (h.qty <= 0) await HoldingsModel.deleteOne({ _id: h._id });
      else await h.save();

      // positions reduce (same)
      const pos = await PositionsModel.findOne({ userId: req.user.id, name });
      if (pos) {
        pos.qty = pos.qty - q;
        pos.price = p;

        if (pos.qty <= 0) await PositionsModel.deleteOne({ _id: pos._id });
        else await pos.save();
      }
    }

    return res.json({ message: "Order saved!", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save order" });
  }
});

// connect + start once
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected DB:", mongoose.connection.name);
    console.log("Connected host:", mongoose.connection.host);
    app.listen(PORT, () => console.log("Server running on", PORT));
  })
  .catch((err) => console.error("DB connection error:", err));