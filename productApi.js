require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
}

const server = express();
const productRouter = require("./routes/product");
server.use(express.json());
server.use("/products", productRouter.routes);

server.listen(process.env.PORT, () => {
  console.log("server is listening on port 8000");
});
