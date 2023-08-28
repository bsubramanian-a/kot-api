const logger = require("../core/logger");
const documentModel = require("../models/document");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addDocument = async data => {
  try {
    const dashboard = new documentModel(data);
    return await dashboard.save();
  } catch (error) {
    logger.error('Error while adding document', error);
    throw error
  }
}

action.getDocument = async ({filter, projection}) => {
  try {
    return await documentModel.find(filter, projection).populate("uploadedBy");
  } catch (error) {
    logger.error('Error while listing documents', error);
    throw error
  }
}


// action.updateDashboardConfig = async (dashboardId, dashboardToUpdate) => {
//   try {
//     return await documentModel.findByIdAndUpdate(dashboardId, dashboardToUpdate, {
//       new: true
//     });
//   } catch (error) {
//     logger.error('Error while updating dashboard detail', error);
//     throw error
//   }
// }

module.exports = action;