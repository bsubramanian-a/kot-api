const logger = require("../core/logger");
const boatTypeModel = require("../models/boatType");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addBoatType = async data => {
  try {
    const boatType = new boatTypeModel(data);
    return await boatType.save();
  } catch (error) {
    logger.error('Error while adding boat type', error);
    throw error
  }
}

  /**
   * List boat type
   * @param {*} data
   * @returns
   */
  action.listBoatType = async (query) => {
    try {
      return await boatTypeModel.find(query);
    } catch (error) {
      logger.error('Error while listing boat type', error);
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