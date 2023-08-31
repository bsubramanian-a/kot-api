let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const faqSchema = new Schema({
  title: { type: String },
  description: { type: String, required: true },
},
  {
    strictPopulate: false,
    timestamps: true
  });

module.exports = mongoose.models.faq || mongoose.model("faq", faqSchema);
