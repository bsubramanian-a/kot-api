let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userDetailModel = require("./userDetail");
const interest = require("./interest")

const userSchema = new Schema({
  phone: { type: String, unique: true },
  countryCode: { type: String },
  email: { type: String, unique: true },
  otp: { type: String },
  interests: [{type: Schema.Types.ObjectId, ref: "interest"}],
  userDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdetail",
    required: true,
    unique: true
  },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    strictPopulate: false,
    timestamps: true
  });

module.exports = mongoose.models.user || mongoose.model("user", userSchema);
