const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [0, "min discount shoule be greater than 0"],
    max: [50, ",max discount shoule be greater than 5"],
  },
  rating: {
    type: Number,
    required: true,
    min: [0, "min rating shoule be greater than 0"],
    max: [5, ",max rating shoule be greater than 5"],
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

exports.Product = mongoose.model("Product", productSchema);
