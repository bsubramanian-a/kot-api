let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userDetailModel = require("./userDetail");
const tournament = require("./tournament")

const tournamentPointsSchema = new Schema({
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: "tournament" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "userdetail" },
    fishCatch: { type: Number },
    points: { type: Number },
    createdBy: { type: String },
    modifiedBy: { type: String },
  },
  {
    strictPopulate: false,
    timestamps: true
});

module.exports = mongoose.models.tournamentpoints || mongoose.model("tournamentpoints", tournamentPointsSchema);
