const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  discountPercentage: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

module.exports = mongoose.models.deal || mongoose.model("deal", dealSchema);
