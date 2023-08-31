let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userModel = require("./user");

const userDetailSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  dob: { type: Date },
  address: { type: String },
  zip: { type: String },
  city: { type: String },
  photo: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true
  },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  auto_play: { type: Boolean, default: false },
  mobile_data: { type: Boolean, default: false },
  wifi: { type: Boolean, default: false },
  push: { type: Boolean, default: false },
  mail: { type: Boolean, default: false },
  sms: { type: Boolean, default: false },
  community_notifications: { type: Boolean, default: false },
  daily_briefing: { type: Boolean, default: false },
  notify_nearby_hotspots: { type: Boolean, default: false },
  notification_from_followers: { type: Boolean, default: false },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.userdetail || mongoose.model("userdetail", userDetailSchema);
