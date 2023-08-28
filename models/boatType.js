let mongoose = require("mongoose");
let Schema = mongoose.Schema;


const boatTypeSchema = new Schema({
  image: { type: String, },
  name: { type: String },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.boattype || mongoose.model("boattype", boatTypeSchema);
