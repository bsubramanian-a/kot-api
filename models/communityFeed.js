let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const communityFeedSchema = new Schema({
  isPost: { type: Boolean, default: true },
  post:{ type: mongoose.Schema.Types.ObjectId, ref: 'post' },
  fishCatch:{ type: mongoose.Schema.Types.ObjectId, ref: 'fishCatch' },
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'community' },
}, {
  timestamps: true,
});
module.exports = mongoose.models.communityFeed || mongoose.model("communityFeed", communityFeedSchema);