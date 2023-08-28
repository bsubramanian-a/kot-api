const logger = require('../core/logger');
const speciesModel = require('../models/species');

const action = {};

action.addSpecies = async (data) => {
  try {
    const species = new speciesModel(data);
    return await species.save();
  } catch (error) {
    logger.error('Error while adding species', error);
    throw error;
  }
};

action.updateSpecies = async (query, updateData) => {
  try {
    return await speciesModel.findOneAndUpdate(query, updateData);
  } catch (error) {
    logger.error('Error while updating species', error);
    throw error;
  }
};

action.getSpeciesDetail = async (query) => {
  try {
    return await speciesModel.findOne(query);
  } catch (error) {
    logger.error('Error while fetching species detail', error);
    throw error;
  }
};

action.listSpecies = async (query) => {
  try {
    return await speciesModel.find(query);
  } catch (error) {
    logger.error('Error while fetching species list', error);
    throw error;
  }
};

module.exports = action;
