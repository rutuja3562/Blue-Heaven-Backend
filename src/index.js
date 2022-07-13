const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");
const app = express();

const port = process.env.PORT || 5005;

app.use(express.json());
app.use(cors());

const productController = require("./controller/product.controller");
const productCartController = require("./controller/productcart.controller");
app.use("/products", productController);
app.use("/productcart", productCartController);

app.listen(port, async () => {
  try {
    await connect();
    console.log("listing on port 5005");
  } catch (err) {
    console.log(err.message);
  }
});
