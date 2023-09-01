let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userDetailModel = require("./userDetail");

const postSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userdetail", required: true },
  message: { type: String },
  status: { type: Number, enum: [0, 1], required: true, default: 1 }, //0=deleted, 1=active
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "userdetail" }
  ],  
  createdBy: { type: String },
  modifiedBy: { type: String },
  isCommunityPost: { type: Boolean },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
},
  {
    timestamps: true
  });

module.exports = mongoose.models.post || mongoose.model("post", postSchema);
