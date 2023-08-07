// const { isUtf8 } = require("buffer");
// const lib = require("./code");
// const fs = require("fs");

// const txt = fs.readFile("demo.txt", "utf8", (error, txt) => {
//   console.log(txt);
// });

// console.log(lib.sum(5, 9), lib.diff(9, 5));
// console.log("my node me");
// index.js

// Get the command line arguments (excluding the first two elements)

// const arguments = process.argv;
// console.log(arguments[2]);
// console.log(arguments[3]);

// console.log(arguments.slice(0, 2));

// const os = require("./os");
// const write = require("./write");
// const server = require("./server");

// const server = require("./expressServer");
// const api = require("./productApi");
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGO_URL);
// }

// const server = express();
// const productRouter = require("./routes/product");
// const userRouter = require("./routes/user");
// server.use(express.json());
// server.use("/products", productRouter.routes);
// server.use("/user", userRouter.routes);

// server.listen(process.env.PORT, () => {
//   console.log("server is listening on port 8000");
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
var jwt = require("jsonwebtoken");

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    console.log(token);
    var decoded = jwt.verify(token, process.env.SECRET);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(401);
  }
};
server.use(express.json());
server.use("/auth", authRouter.router);
server.use("/products", auth, productRouter.router);
server.use("/users", auth, userRouter.router);
server.listen(process.env.PORT, () => {
  console.log("server started");
});
