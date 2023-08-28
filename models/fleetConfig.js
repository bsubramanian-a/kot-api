var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const fleetConfigSchema = new Schema({
  columns: { type: Schema.Types.Mixed },
  assetDetails: { type: Schema.Types.Mixed },
  equipmentDetails: { type: Schema.Types.Mixed },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.fleetConfig || mongoose.model("fleetConfig", fleetConfigSchema);
