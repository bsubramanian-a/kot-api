const logger = require('../core/logger');
const fishingCharterModel = require('../models/fishingCharter');

const action = {};

action.addFishingCharter = async (data) => {
  try {
    const fishingCharter = new fishingCharterModel(data);
    return await fishingCharter.save();
  } catch (error) {
    logger.error('Error while adding fishingCharter', error);
    throw error;
  }
};

action.updateFishingCharter = async (query, updateData) => {
  try {
    return await fishingCharterModel.findOneAndUpdate(query, updateData);
  } catch (error) {
    logger.error('Error while updating fishingCharter', error);
    throw error;
  }
};

action.getFishingCharterDetail = async (query) => {
  try {
    return await fishingCharterModel.findOne(query).populate('boat');
  } catch (error) {
    logger.error('Error while fetching fishingCharter detail', error);
    throw error;
  }
};

action.listFishingCharters = async (query) => {
  try {
    return await fishingCharterModel.find(query);
  } catch (error) {
    logger.error('Error while fetching fishingCharter list', error);
    throw error;
  }
};

module.exports = action;
