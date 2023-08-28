var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const notificationConfigSchema = new Schema({
  columns: { type: Schema.Types.Mixed },
  details: { type: Schema.Types.Mixed },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.notificationConfig || mongoose.model("notificationConfig", notificationConfigSchema);
