const express = require("express");
const Product = require("../models/product.module");
const router = express.Router();
const path=require("path");

router.get("", async (req, res) => {
    try {
        const product = await Product.find().lean().exec();
        return res.send(product);
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});
// router.get("/:price", async (req, res) => {
//   try {
//     // db.student.find().sort({ age: 1 });
//     const products = await Product.find().sort({ price: 1 });
//     return res.send(products);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });

// router.get("/:title", async (req, res) => {
//   try {
//     // db.student.find().sort({ age: 1 });
//     const product = await Product.find().sort({ title: 1 });
//     return res.send(product);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });

router.post("", async (req, res) => {
    
    try {
        const product = await Product.create(req.body);
        return res.send(product);
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});
 
router.get("/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).lean().exec();
  
      if (product) {
        return res.send(product);
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
      const product= await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      res.status(201).send(product);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // met + route => delete /users/${variable} and the name of variable is id
  router.delete("/:id", async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
  
      res.send(product);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
module.exports = router;
