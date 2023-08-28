let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userDetailModel = require("./userDetail");

const reportSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userdetail", required: true },
  type: { type: String, enum: ["CATCH", "BOAT", "SPAM", "OTHER", "LANGUAGE"], required: true, default: "OTHER" }, //0=deleted, 1=active
  message: { type: String },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.report || mongoose.model("report", reportSchema);
