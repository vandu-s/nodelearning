const express = require("express");
const fs = require("fs");
const { nextTick } = require("process");
const server = express();
const port = 8000;
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
let products = data.products;
server.use((req, res, next) => {
  console.log(
    req.get("User-Agent"),
    new Date(),
    req.method,
    req.ip,
    req.hostname
  );
  next();
});
server.use(express.json());
// server.use(express.urlencoded());
server.use(express.static("public"));

const auth = (req, res, next) => {
  //   console.log(req.query);
  if (req.body.password === "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};
// server.use(auth);

server.get("/product/:id", (req, res) => {
  console.log(req.params);
  res.json({ type: "get" });
});
server.post("/", auth, (req, res) => {
  res.json({ type: "post" });
});
server.put("/", (req, res) => {
  res.json({ type: "put" });
});
server.delete("/", (req, res) => {
  res.json({ type: "delete" });
});
server.patch("/", (req, res) => {
  res.json({ type: "patch" });
});

//   res.json(products);
//   res.sendStatus(404);
//   res.sendFile("/home/vandana/Documents/Node Learning/index.html");
//   res.status(201).send("test");

server.listen(port, () => {
  console.log("server is listening on port 8000");
});
