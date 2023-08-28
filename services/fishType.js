const logger = require("../core/logger");
const fishTypeModel = require("../models/fishType");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addFishType = async data => {
  try {
    const fishType = new fishTypeModel(data);
    return await fishType.save();
  } catch (error) {
    logger.error('Error while adding fish type', error);
    throw error
  }
}

  /**
   * List fish type
   * @param {*} data
   * @returns
   */
  action.listFishType = async (query) => {
    try {
      return await fishTypeModel.find(query);
    } catch (error) {
      logger.error('Error while listing fish type', error);
      throw error
    }
  }

// /**
//  * 
//  * @param {*} data 
//  * @returns 
//  */
// action.updateBoat = async(query, updateData)=> {
//   try {
//     return await boatModel.findOneAndUpdate(query, updateData)
//   } catch (error) {
//     logger.error('Error while updating boat', error);
//     throw error
//   }
// }



// /**
//  * Get boat id wise detail
//  * @param {*} data
//  * @returns
//  */
// action.getBoatDetail = async (query) => {
//   try {
//     return await boatModel.findOne(query);
//   } catch (error) {
//     logger.error('Error while fetching boat detail', error);
//     throw error
//   }
// }

// /**
//  * Get boat  detail
//  * @param {*} data
//  * @returns
//  */
// action.getAllBoats = async (query) => {
//   try {
//     return await boatModel.find(query);
//   } catch (error) {
//     logger.error('Error while fetching boat detail', error);
//     throw error
//   }
// }



module.exports = action;