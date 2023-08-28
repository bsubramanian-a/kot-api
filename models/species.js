let mongoose = require("mongoose");
let Schema = mongoose.Schema;


const speciesSchema = new Schema({
  name: { type: String, },
  image: { type: String },
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.species || mongoose.model("species", speciesSchema);
