const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔒 CSP FIX (for audio/base64 issues)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' data: blob:; media-src 'self' data: blob:"
  );
  next();
});

// 🔗 MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/quantumshop")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 📌 Routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/cart"));
app.use("/", require("./routes/order"));
app.use("/", require("./routes/product"));

// 📸 Image access
app.use("/uploads", express.static("uploads"));

// ✅ ROOT ROUTE FIX
app.get("/", (req, res) => {
  res.send("QuantumShop API is running 🚀");
});

app.listen(5000, () => console.log("Server running on port 5000"));
