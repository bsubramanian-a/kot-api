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
    species: { type: mongoose.Schema.Types.ObjectId, ref: 'species', required: true },
  },
  {
    strictPopulate: false,
    timestamps: true
});

module.exports = mongoose.models.fishingCharterSchema || mongoose.model("fishingCharter", fishingCharterSchema);
