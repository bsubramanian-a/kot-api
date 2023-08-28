const logger = require('../core/logger');
const fishCatchModel = require('../models/fishCatch');

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

action.listFishCatches = async (query) => {
    try {
        return await fishCatchModel.find(query).populate('species');
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
