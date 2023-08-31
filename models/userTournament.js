let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userDetailModel = require("./userDetail");
const tournament = require("./tournament")

const tournamentuserSchema = new Schema({
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: "tournament", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "userdetail", required: true },
    status: { type: Number, enum: [0, 1, 2], required: true, default: 0 }, //0=pending, 1=accepted, 2=rejected
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    species: { type: mongoose.Schema.Types.ObjectId, ref: 'species', required: true },
    weight: { type: Number },
    length: { type: Number },
    description: { type: String },
    price: { type: Number }
  },
  {
    strictPopulate: false,
    timestamps: true
});

module.exports = mongoose.models.tournamentuser || mongoose.model("tournamentuser", tournamentuserSchema);
