const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
let products = data.products;

exports.createProduct = (req, res) => {
  products.push(req.body);
  res.status(201).json({
    data: req.body,
    message: "Product added successfully",
  });
};

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.getProduct = (req, res) => {
  const id = +req.params.id;
  console.log(typeof id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: `Product not found with ${id} id` });
  }
  res.json(product);
};

exports.replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { id: id, ...req.body });

  res.json({
    data: {
      id: id,
      ...req.body,
    },
    message: "product updated sucessfully",
  });
};
exports.updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });

  res.json({
    data: { ...product, ...req.body },
    message: "product updated sucessfully",
  });
};
exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1);

  res.json({
    data: { product },
    message: "product deleted sucessfully",
  });
};
