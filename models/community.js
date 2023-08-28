let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userDetailModel = require("./userDetail");

const communitySchema = new Schema({
  name: { type: String, required: true },
  coverPhoto: { type: String },
  description: { type: String, default: '' },
  location: {
    type: Object,
    properties: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String },
    },
  },
  topic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'communityTopic' }],
  people: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  follow: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  privacy: { type: Boolean, default: true },
  follow: [
    { type: mongoose.Schema.Types.ObjectId, ref: "userdetail" }
  ],  
},
  {
    timestamps: true
  });

module.exports = mongoose.models.community || mongoose.model("community", communitySchema);
