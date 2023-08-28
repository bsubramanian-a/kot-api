const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  rating: { type: Number, required: true }
});

module.exports = mongoose.models.productRating || mongoose.model("productRating", ratingSchema);
