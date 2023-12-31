let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userDetailModel = require("./userDetail");
const speciesModel = require('../models/species');
const fishingCharter = require('../models/fishingCharter');

const bookingSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userdetail", required: true },
  boat: { type: mongoose.Schema.Types.ObjectId, ref: "boattype", required: true },
  from: { type: Date },
  to: { type: Date },
  bookingStatus: { type: Number, enum: [0, 1, 2, 3], required: true, default: 1 }, //1=pending, 2=confirm, 3=declined
  status: { type: Number, enum: [0, 1, 2], required: true, default: 1 }, //0=deleted, 1=active, 2=completed
  howLongOnWater: { type: String },
  needCaptain: { type: Boolean },
  isFlexible: { type: Boolean, default: false },
  planType: { type: String, enum: ["affordable", "luxury"], default: "affordable" },
  isSameDay: { type: Boolean, default: false },
  returnTime: { type: String },
  adult: { type: Number },
  children: { type: Number },
  senior: { type: Number },
  infants: { type: Number },
  createdBy: { type: String },
  modifiedBy: { type: String },
  comments: { type: String },
  departTime: { type: String },
  rating: { type: Number, enum: [1, 2, 3, 4, 5] },
  bookingTime: { type: String },
  bookingEndTime: { type: String },
  isMultiDay: { type: Boolean },
  overnightHours: { type: String },
  type: { type: String, enum: [ "boat", "fishingcharter" ], default: "boat" },
  groupSize: { type: Number },
  startTime: { type: Date },
  fishingCharter: { type: mongoose.Schema.Types.ObjectId, ref: 'fishingCharter', required: true },
  price : { type: String },
  cancellationTime: { type: String }
},
  {
    timestamps: true
  });

module.exports = mongoose.models.booking || mongoose.model("booking", bookingSchema);
