var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const dashboardConfigSchema = new Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  config: { type: Schema.Types.Mixed },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.dashboardConfig || mongoose.model("dashboardConfig", dashboardConfigSchema);
