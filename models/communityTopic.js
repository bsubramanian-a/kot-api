let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const communityTopicSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityTopicCategory' },
}, {
  timestamps: true,
});
module.exports = mongoose.models.communityTopic || mongoose.model("communityTopic", communityTopicSchema);