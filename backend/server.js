const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/quantumshop")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 📌 Routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/cart"));
app.use("/", require("./routes/order"));
app.use("/", require("./routes/product")); // ✅ ADD THIS

// 📸 Image access
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Server running on port 5000"));