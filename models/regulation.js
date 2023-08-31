let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const regulationSchema = new Schema({
  title: { type: String },
  description: { type: String, required: true },
},
  {
    strictPopulate: false,
    timestamps: true
  });

module.exports = mongoose.models.regulation || mongoose.model("regulation", regulationSchema);
