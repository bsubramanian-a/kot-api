let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const communityTopicCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' }
}, {
  timestamps: true,
});

module.exports = mongoose.models.communityTopicCategory || mongoose.model("communityTopicCategory", communityTopicCategorySchema);