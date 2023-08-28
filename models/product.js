const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productRating = require("../models/productRating");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String }, // You can store a single image URL for simplicity
    category_id: { type: Schema.Types.ObjectId, ref: "productCategory" },
    type: { type: String, enum: ["species", "product"] },
    size: { type: String, enum: ["s", "m", "l", "xl", "xxl"] },
    price: { type: Number, required: true },
    color: { type: String }, // You can store the color name here
    material_type: { type: String },
    productRating: { type: Schema.Types.ObjectId, ref: "productRating" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.product || mongoose.model("product", productSchema);
