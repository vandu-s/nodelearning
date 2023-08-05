require("dotenv").config();
const express = require("express");
const server = express();
const port = 8000;
const productRouter = require("./routes/product");
server.use(express.json());
server.use("/products", productRouter.routes);
console.log(process.env.DB_PASSWORD);
server.listen(process.env.PORT, () => {
  console.log("server is listening on port 8000");
});
