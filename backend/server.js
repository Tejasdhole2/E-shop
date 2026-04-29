const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// CSP FIX
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' data: blob:; media-src 'self' data: blob:"
  );
  next();
});

// MongoDB connect (RENDER SAFE)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/cart"));
app.use("/", require("./routes/order"));
app.use("/", require("./routes/product"));

// Static files
app.use("/uploads", express.static("uploads"));

// Root route
app.get("/", (req, res) => {
  res.send("QuantumShop API is running 🚀");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
