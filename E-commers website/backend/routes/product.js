const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const multer = require("multer");

// storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ADD PRODUCT
router.post("/product/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, desc } = req.body;

    const product = new Product({
      name,
      price,
      desc,
      image: req.file ? req.file.filename : ""
    });

    await product.save();

    res.json({ message: "Product Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/product/:id", async (req, res) => {
  try {
    const { name, price, desc } = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      desc
    });

    res.json({ message: "Product Updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET PRODUCTS
router.get("/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

module.exports = router;