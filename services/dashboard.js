const logger = require("../core/logger");
const dashboardConfigModel = require("../models/dashboardConfig");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addDashboardConfig = async data => {
  try {
    const dashboardConfig = new dashboardConfigModel(data);
    return await dashboardConfig.save();
  } catch (error) {
    logger.error('Error while adding dashboard config', error);
    throw error
  }
}

action.getDashboardConfig = async ({filter, projection}) => {
  try {
    return await dashboardConfigModel.findOne(filter, projection);
  } catch (error) {
    logger.error('Error while adding dashboard config', error);
    throw error
  }
}


action.updateDashboardConfig = async (dashboardId, dashboardToUpdate) => {
  try {
    return await dashboardConfigModel.findByIdAndUpdate(dashboardId, dashboardToUpdate, {
      new: true
    });
  } catch (error) {
    logger.error('Error while updating dashboard detail', error);
    throw error
  }
}

module.exports = action;