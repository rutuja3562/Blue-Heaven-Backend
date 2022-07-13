const express = require("express");
const Products = require("../models/product.module");
const router = express.Router();
const path = require("path");

router.get("", async (req, res) => {
  try {
    const vegetables = await Products.find().lean().exec();
    return res.send(vegetables);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", async (req, res) => {
  try {
    const vegetables = await Products.create(req.body);
    return res.send(vegetables);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vegetables = await Products.findById(req.params.id).lean().exec();

    if (vegetables) {
      return res.send(vegetables);
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// met + route => patch /users/${variable} and the name of variable is id
router.patch("/:id", async (req, res) => {
  try {
    const vegetable = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    res.status(201).send(vegetable);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// met + route => delete /users/${variable} and the name of variable is id
router.delete("/:id", async (req, res) => {
  try {
    const vegetables = await Products.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    res.send(vegetables);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
