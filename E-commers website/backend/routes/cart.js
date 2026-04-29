const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ➕ Add to cart
router.post("/cart/add", async (req, res) => {
  try {
    const { userId, product } = req.body;

    if (!userId || !product) {
      return res.status(400).json({ message: "Missing data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart.push({ ...product, qty: product.qty || 1 });

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔄 Update quantity
router.post("/cart/update", async (req, res) => {
  try {
    const { userId, index, qty } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.cart[index]) {
      return res.status(400).json({ message: "Invalid item index" });
    }

    user.cart[index].qty = qty;

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 📥 Get cart
router.get("/cart/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ❌ Remove item
router.post("/cart/remove", async (req, res) => {
  try {
    const { userId, index } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.cart[index]) {
      return res.status(400).json({ message: "Invalid item index" });
    }

    user.cart.splice(index, 1);

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;