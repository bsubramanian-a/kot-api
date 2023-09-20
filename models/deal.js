const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productModel = require("./product");

const dealSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "product", required: true },
  discountPercentage: { type: Number, required: true },
  image: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

module.exports = mongoose.models.deal || mongoose.model("deal", dealSchema);
