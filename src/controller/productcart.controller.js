const express = require("express");
const Productcart = require("../models/productcart.module");
const router = express.Router();
const path = require("path");

router.get("", async (req, res) => {
  try {
    const productcart = await Productcart.find().lean().exec();
    return res.send(productcart);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", async (req, res) => {
  try {
    const productcart = await Productcart.create(req.body);
    return res.send(productcart);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productcart = await Productcart.findById(req.params.id).lean().exec();

    if (productcart) {
      return res.send(productcart);
    } else {
      return res.status(404).send({ message: "product not found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// met + route => patch /users/${variable} and the name of variable is id
router.patch("/:id", async (req, res) => {
  try {
    const productcart = await Productcart.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    res.status(201).send(productcart);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// met + route => delete /users/${variable} and the name of variable is id
router.delete("/:id", async (req, res) => {
  try {
    const productcart = await Productcart.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    res.send(productcart);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
