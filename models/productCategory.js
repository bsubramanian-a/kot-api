let mongoose = require("mongoose");
let Schema = mongoose.Schema;


const productCategorySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, },
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.productCategory || mongoose.model("productCategory", productCategorySchema);
