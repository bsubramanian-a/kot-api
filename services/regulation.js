const logger = require('../core/logger');
const regulationModel = require('../models/regulation');

const action = {};

action.addRegulation = async (data) => {
  try {
    const regulation = new regulationModel(data);
    return await regulation.save();
  } catch (error) {
    logger.error('Error while adding regulation', error);
    throw error;
  }
};

action.updateRegulation = async (query, updateData) => {
  try {
    return await regulationModel.findOneAndUpdate(query, updateData);
  } catch (error) {
    logger.error('Error while updating regulation', error);
    throw error;
  }
};

action.getRegulationDetail = async (query) => {
  try {
    return await regulationModel.findOne(query);
  } catch (error) {
    logger.error('Error while fetching regulation detail', error);
    throw error;
  }
};

action.listRegulations = async (query) => {
  try {
    return await regulationModel.find(query);
  } catch (error) {
    logger.error('Error while fetching regulation list', error);
    throw error;
  }
};

module.exports = action;