const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./userDetail");

const fishCatchCommentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  fishCatch: { type: mongoose.Schema.Types.ObjectId, ref: "fishCatch" },
  content: { type: String, required: true },
  reply: { type: mongoose.Schema.Types.ObjectId, ref: "fishCatchComment" },
  depth: { type: Number, default: 0 },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "userdetail" }
  ],  
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "fishCatchComment" }]
}, { strictPopulate:false, timestamps: true });

module.exports = mongoose.models.fishCatchComment || mongoose.model("fishCatchComment", fishCatchCommentSchema);
