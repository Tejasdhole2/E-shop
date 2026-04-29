const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 📦 Place order
router.post("/order", async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);

  const order = {
    items: user.cart,
    date: new Date()
  };

  user.cart = []; // clear cart
  await user.save();

  res.json({ message: "Order placed", order });
});

module.exports = router;