const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ env support

const app = express();

// ✅ CORS (allow frontend)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// 🔗 MongoDB connect (ENV based)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// 📌 Routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/cart"));
app.use("/", require("./routes/order"));
app.use("/", require("./routes/product"));

// 📸 Image access
app.use("/uploads", express.static("uploads"));

// 🌐 PORT FIX (IMPORTANT FOR HOSTING)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});