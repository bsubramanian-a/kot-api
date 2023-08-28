var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const equipmentConfigSchema = new Schema({
  fleetName: { type: String },
  icon: { type: String },
  columns: { type: Schema.Types.Mixed },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.equipmentConfig || mongoose.model("equipmentConfig", equipmentConfigSchema);
