let mongoose = require("mongoose");
let Schema = mongoose.Schema;


const boatSchema = new Schema({
  name: { type: String, required: true },
  image: { type: [String], },
  boatType: { type: mongoose.Schema.Types.ObjectId, ref: "boattype", required: true },
  pricePerDay: { type: Number },
  length: { type: Number },
  cabins: { type: Number },
  capacity: { type: Number },
  birth: { type: Number },
  kitchen: { type: Number },
  bathroom: { type: Number },
  shower: { type: Boolean },
  motorPower: { type: Number },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  superOwner: { type: Boolean, default: false },
  hasCaptain: { type: Boolean, default: false },
  location: { type: String },
  bookingCondition: { type: String },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userdetail", required: true },
  video: { type: String },
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.boat || mongoose.model("boat", boatSchema);
