const logger = require('../core/logger');
const interestModel = require('../models/interest');

const service = {};

service.addInterest = async (data) => {
  try {
    const interest = new interestModel(data);
    return await interest.save();
  } catch (error) {
    logger.error('Error while adding interest', error);
    throw error;
  }
};

service.updateInterest = async (query, updateData) => {
  try {
    return await interestModel.findOneAndUpdate(query, updateData);
  } catch (error) {
    logger.error('Error while updating interest', error);
    throw error;
  }
};

service.getInterestDetail = async (query) => {
  try {
    return await interestModel.findOne(query);
  } catch (error) {
    logger.error('Error while fetching interest detail', error);
    throw error;
  }
};

service.listInterests = async (query) => {
  try {
    return await interestModel.find(query);
  } catch (error) {
    logger.error('Error while fetching interest list', error);
    throw error;
  }
};

module.exports = service;
