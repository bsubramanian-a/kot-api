var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userModel = require("./user");
const orgnizationModel = require("./organization");

const documentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  report: { type: String, required: true },
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "organization",required: true },
  status: { type: Number, enum: [0, 1], required: true, default: 1 },
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.document || mongoose.model("document", documentSchema);
