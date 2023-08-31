let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const licenseSchema = new Schema({
  title: { type: String },
  description: { type: String, required: true },
},
  {
    strictPopulate: false,
    timestamps: true
  });

module.exports = mongoose.models.license || mongoose.model("license", licenseSchema);
