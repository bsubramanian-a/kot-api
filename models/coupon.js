const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema({
  title: { type: String, required: true },  
  code: { type: String, required: true, unique: true },
  type: { type: Number, enum: [0, 1], required: true, default: 0 }, //0=percentage, 1=flat
  from: { type: Date },
  to: { type: Date },
  value: { type: Number },
  count: { type: Number }
}, {
  timestamps: true
});

module.exports = mongoose.models.coupon || mongoose.model("coupon", couponSchema);
