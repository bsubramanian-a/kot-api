var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  dateFormat: { type: String },
  assetType: { type: String },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.organization || mongoose.model("organization", organizationSchema);
