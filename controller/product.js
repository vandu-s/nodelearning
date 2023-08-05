const fs = require("fs");
const model = require("../model/product");
const Product = model.Product;

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    console.log(savedProduct); // Log the saved product if needed
    res.status(201).json({
      data: req.body,
      message: "Product added successfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      message: err,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  try {
    res.status(200).json({
      data: product,
      message: "Product fetched",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      message: err,
    });
  }
};

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOneAndReplace({ _id: id }, req.body, {
    new: true,
  });
  try {
    res.json({
      data: product,
      message: "product replaced sucessfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      message: err,
    });
  }
};
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  try {
    res.json({
      data: product,
      message: "product updated sucessfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      message: err,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  const doc = await Product.findOneAndDelete({ _id: id });
  try {
    res.json({
      data: doc,
      message: "product deleted sucessfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      message: err,
    });
  }
};
