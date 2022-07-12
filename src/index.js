const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");
const app = express();

app.use(express.json())
app.use(cors());

const productController = require("./controller/product.controller")
const vegetableCartController = require("./controller/productcart.Controller")
app.use("/product", productController);
app.use("/productcart", vegetableCartController);


app.listen(5005, async () => {
    try {
        await connect();
        console.log("listing on port 5005")
    } catch (err) {
        console.log(err.message);
    }

})