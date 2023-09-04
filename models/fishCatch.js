let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const speciesModel = require('../models/species')

const fishCatchSchema = new Schema({
  name: { type: String, },
  dateOfCatch: { type: String },
  timeOfCatch: { type: String },
  weight: { type: String },
  legth: { type: String },
  method: {type: String},
  description: {type: String},
  position: {
    type: Object,
    properties: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String },
    },
  },  
  images: [{ type: String }],
  videos: [{ type: String }],
  species: { type: mongoose.Schema.Types.ObjectId, ref: 'species', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId }],
  isCommunityFishCatch: { type: Boolean },
  createdBy: { type: String },
  modifiedBy: { type: String },
  isCommunityFishCatch: { type: Boolean },
},
{
  timestamps: true
});

module.exports = mongoose.models.fishCatch || mongoose.model("fishCatch", fishCatchSchema);
