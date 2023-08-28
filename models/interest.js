const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interestSchema = new Schema({
  name: { type: String },
  createdBy: { type: String },
  modifiedBy: { type: String },
},
{
  timestamps: true
});

module.exports = mongoose.models.interest || mongoose.model("interest", interestSchema);
