const express = require("express");
const Productcart = require("../models/productcart.module");
const router = express.Router();
const path = require("path");

router.get("", async (req, res) => {
  try {
    const users = await Productcart.find().lean().exec();
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", async (req, res) => {
  try {
    const users = await Productcart.create(req.body);
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Productcart.findById(req.params.id).lean().exec();

    if (user) {
      return res.send(user);
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
    const user = await Productcart.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      .lean()
      .exec();

    res.status(201).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// met + route => delete /users/${variable} and the name of variable is id
router.delete("/:id", async (req, res) => {
  try {
    const user = await Productcart.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    res.send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
