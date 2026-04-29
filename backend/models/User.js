const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  mobile: String,
  address: String,

  cart: [
    {
      name: String,
      price: Number,
      qty: Number
    }
  ]
});

module.exports = mongoose.model("User", userSchema);