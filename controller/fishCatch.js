const logger = require('../core/logger');
const fishCatchService = require('../services/fishCatch');
const defaultFunction = require('../core/responser');

const action = {};

action.addFishCatch = async (data) => {
  logger.info('Adding new Fish Catch', data);
  try {
    const fishCatchData = await fishCatchService.addFishCatch(data);
    return defaultFunction.success({
        response: fishCatchData,
        message: 'Fish Catch added successfully!',
        total: 1,
    });
  } catch (error) {
    logger.error('Failed while adding Fish Catch', error);
    throw error;
  }
};

action.updateFishCatch = async (data) => {
  logger.info('Updating Fish Catch', data);
  try {
    let query = {
      _id: data._id,
    };
    const fishCatchData = await fishCatchService.updateFishCatch(query, data);
    return defaultFunction.success({
        response: null,
        message: 'Fish Catch updated successfully!',
        total: 1,
    });
  } catch (error) {
    logger.error('Failed while updating Fish Catch', error);
    throw error;
  }
};

action.getFishCatchDetail = async (query) => {
  try {
    if (!query || !query.fishCatchId) {
      throw 'fishCatchId cannot be null';
    }
    let userQuery = {
      _id: query.fishCatchId,
    };
    const fishCatchDetail = await fishCatchService.getFishCatchDetail(userQuery);
    return defaultFunction.success({
        response: fishCatchDetail,
        message: fishCatchDetail ? 'Fish catch detail fetched successfully' : 'Fish catch detail not found',
    });
  } catch (error) {
    logger.error('Failed to get Fish Catch details', error);
    throw error;
  }
};

action.listFishCatches = async (query) => {
    try {
        // Additional query parameters if needed
        const fishCatches = await fishCatchService.listFishCatches(query);
        return defaultFunction.success({
            response: fishCatches,
            message: 'Fish catch listed successfully',
            total: fishCatches.length,
        });
    } catch (error) {
        logger.error('Failed while listing Fish Catches', error);
        throw error;
    }
};

action.likeFishCatch = async (query, data) => {
    try {
      const fishCatch = await fishCatchService.likeFishCatch(query, data);
      return defaultFunction.success({
        response: fishCatch,
        message: "Fish catch liked/unliked successfully!",
        total: 1
      });
    } catch (error) {
      logger.error('Error while updating Fish Catch', error);
      throw error;
    }
};
  
action.deleteFishCatch = async (query) => {
    try {
      const deletedFishCatch = await fishCatchService.deleteFishCatch(query);
      return defaultFunction.success({
        response: deletedFishCatch,
        message: "Fish catch deleted successfully!",
        total: 1
      });
    } catch (error) {
      logger.error('Error while deleting Fish Catch', error);
      throw error;
    }
};  

module.exports = action;
