const logger = require("../core/logger");
const boatModel = require("../models/boat");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addBoat = async data => {
  try {
    const boat = new boatModel(data);
    return await boat.save();
  } catch (error) {
    logger.error('Error while adding boat', error);
    throw error
  }
}


/**
 * 
 * @param {*} data 
 * @returns 
 */
action.updateBoat = async(query, updateData)=> {
  try {
    return await boatModel.findOneAndUpdate(query, updateData)
  } catch (error) {
    logger.error('Error while updating boat', error);
    throw error
  }
}



/**
 * Get boat id wise detail
 * @param {*} data
 * @returns
 */
action.getBoatDetail = async (query) => {
  try {
    return await boatModel.findOne(query).populate("boatType");
  } catch (error) {
    logger.error('Error while fetching boat detail', error);
    throw error
  }
}

/**
 * Get boat  detail
 * @param {*} data
 * @returns
 */
action.listBoat = async (query) => {
  try {
    return await boatModel.find(query);
  } catch (error) {
    logger.error('Error while fetching boat list', error);
    throw error
  }
}

action.searchBoat = async (query) => {
  try {
    return await boatModel.find(query);
  } catch (error) {
    logger.error('Error while fetching boat list', error);
    throw error
  }
}


  /**
   * Get delete boat detail
   * @param {*} data
   * @returns
   */
  action.updateBoatStatus = async (query,updateStatus) => {
    try {
      return await boatModel.findOneAndUpdate(query,updateStatus);
    } catch (error) {
      logger.error('Error while deleting boat detail', error);
      throw error
    }
  }



module.exports = action;