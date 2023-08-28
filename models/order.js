const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productModel = require("../models/product");

const orderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "address"},
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled", "Packed", "Shipped", "Out for delivery", "Delivered"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
