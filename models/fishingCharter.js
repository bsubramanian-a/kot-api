let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userDetailModel = require("./userDetail");
const interest = require("./interest");
const speciesModel = require('../models/species');
const fishTypeModel = require('../models/species');

const fishingCharterSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, },
    price: { type: Number },
    species: { type: mongoose.Schema.Types.ObjectId, ref: 'species' },
    type: { type: String, enum: ["inland", "inshore", "nearshore", "offshore"] },
    boat: { type: mongoose.Schema.Types.ObjectId, ref: "boat" },
  },
  {
    strictPopulate: false,
    timestamps: true
});

module.exports = mongoose.models.fishingCharterSchema || mongoose.model("fishingCharter", fishingCharterSchema);
