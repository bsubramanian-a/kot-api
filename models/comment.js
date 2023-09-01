const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./userDetail");

const commentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  content: { type: String, required: true },
  reply: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  depth: { type: Number, default: 0 },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "userdetail" }
  ],  
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
}, { strictPopulate:false, timestamps: true });

module.exports = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
