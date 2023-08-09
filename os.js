var os = require("os");
// console.log("plateform", os.platform);
// console.log(os.cpus());
// console.log(os.totalmem());
console.log(os.freemem());
console.log(os.hostname());
console.log(os.platform());
console.log(os.type());
console.log(os.uptime());
console.log(os.release());
console.log(os.userInfo());
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
