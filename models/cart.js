const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productModel = require("../models/product");

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.cart || mongoose.model("cart", cartSchema);
