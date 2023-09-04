const logger = require('../core/logger');
const fishCatchModel = require('../models/fishCatch');
const commentModel = require('../models/fishCatchComment');

const action = {};

action.addFishCatch = async (data) => {
  try {
    const fishCatch = new fishCatchModel(data);
    return await fishCatch.save();
  } catch (error) {
    logger.error('Error while adding Fish Catch', error);
    throw error;
  }
};

action.updateFishCatch = async (query, updateData) => {
  try {
    return await fishCatchModel.findOneAndUpdate(query, updateData);
  } catch (error) {
    logger.error('Error while updating Fish Catch', error);
    throw error;
  }
};

action.getFishCatchDetail = async (query) => {
  try {
    return await fishCatchModel.findOne(query).populate('species');
  } catch (error) {
    logger.error('Error while fetching Fish Catch detail', error);
    throw error;
  }
};

const populateReplies = async (commentId) => {
  let comments = await commentModel.find({ reply: commentId }).populate("user");
  console.log("reply", comments);

  if (!comments) {
    return null;
  }

  const populatedComments = await Promise.all(
    comments.map(async (reply) => {
      const populatedReply = reply;
      const replies = await populateReplies(reply._id);
      //console.log("reply",reply)
      populatedReply.replies = replies;

      return populatedReply;
    })
  );

  return populatedComments;
};

const listCommentsWithReplies = async (fishCatchId) => {
  let comments = await commentModel.find({ fishCatch: fishCatchId, depth: 0 }).populate("user");

  const commentsWithReplies = await Promise.all(
    comments.map(async (comment) => {
      console.log("each comment", comment);
      const replies = await populateReplies(comment._id);
      console.log("replies+++++++++", replies);
      comment.replies = replies;
      return comment;
    })
  );

  return commentsWithReplies;
};

action.listFishCatches = async (query) => {
  try {
    const fishCatches =  await fishCatchModel.find(query).populate('species');

    const populatedFishCatches = await Promise.all(
      fishCatches.map(async (fishCatch) => {
        const populatedFishCatch = fishCatch.toObject();
        
        const commentsWithReplies = await listCommentsWithReplies(fishCatch._id);
        console.log("commentsWithReplies", commentsWithReplies);
        populatedFishCatch.comments = commentsWithReplies;
        console.log("populatedFishCatch", populatedFishCatch);

        return populatedFishCatch;
      })
    );

    return populatedFishCatches;
  } catch (error) {
      logger.error('Error while fetching Fish Catch list', error);
      throw error;
  }
};

action.likeFishCatch = async (query, data) => {
    try {
      const fishCatch = await fishCatchModel.find(query);
  
      if (query.doLike) {
        if (!fishCatch[0].likes.includes(query.user)) {
          fishCatch[0].likes.push(query.user);
          fishCatch[0].save();
        }
      } else {
        const index = fishCatch[0].likes.indexOf(query.user);
        if (index > -1) {
          fishCatch[0].likes.splice(index, 1);
          fishCatch[0].save();
        }
      }
  
      return fishCatch;
    } catch (error) {
      logger.error('Error while updating Fish Catch', error);
      throw error;
    }
};
  
action.deleteFishCatch = async (query) => {
    try {
      const deletedFishCatch = await fishCatchModel.findOneAndDelete(query);
      return deletedFishCatch;
    } catch (error) {
      logger.error('Error while deleting Fish Catch', error);
      throw error;
    }
};

module.exports = action;
