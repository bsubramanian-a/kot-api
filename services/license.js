const logger = require('../core/logger');
const licenseModel = require('../models/license');

const action = {};

action.addLicense = async (data) => {
  try {
    const license = new licenseModel(data);
    return await license.save();
  } catch (error) {
    logger.error('Error while adding license', error);
    throw error;
  }
};

action.updateLicense = async (query, updateData) => {
  try {
    return await licenseModel.findOneAndUpdate(query, updateData);
  } catch (error) {
    logger.error('Error while updating license', error);
    throw error;
  }
};

action.getLicenseDetail = async (query) => {
  try {
    return await licenseModel.findOne(query);
  } catch (error) {
    logger.error('Error while fetching license detail', error);
    throw error;
  }
};

action.listLicenses = async (query) => {
  try {
    return await licenseModel.find(query);
  } catch (error) {
    logger.error('Error while fetching license list', error);
    throw error;
  }
};

module.exports = action;