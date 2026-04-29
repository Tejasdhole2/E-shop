const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// 🔒 FIX: CSP (for audio / base64 issues)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' data: blob:; media-src 'self' data: blob:"
  );
  next();
});

// 🔗 MongoDB connect (LOCAL - change for production)
mongoose
  mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 📌 API Routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/cart"));
app.use("/", require("./routes/order"));
app.use("/", require("./routes/product"));

// 📸 Static files (images)
app.use("/uploads", express.static("uploads"));

// ✅ ROOT ROUTE FIX (IMPORTANT)
app.get("/", (req, res) => {
  res.send("QuantumShop API is running 🚀");
});

// 🚀 Server start
app.listen(5000, () => console.log("Server running on port 5000"));
