let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userDetailModel = require("./userDetail");
const interest = require("./interest")

const tournamentSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    prices: [
      { type: Number, required: true }
    ],  
    status: { type: Number, enum: [0, 1, 2], required: true, default: 0 }, //0=upcoming, 1=live, 2=completed
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "userdetail", required: true }
  },
  {
    strictPopulate: false,
    timestamps: true
});

module.exports = mongoose.models.tournament || mongoose.model("tournament", tournamentSchema);
