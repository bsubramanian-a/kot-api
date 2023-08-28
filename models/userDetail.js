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
  createdBy: { type: String },
  modifiedBy: { type: String },
},
  {
    timestamps: true
  });

module.exports = mongoose.models.userdetail || mongoose.model("userdetail", userDetailSchema);
