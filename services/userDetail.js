const logger = require("../core/logger");
const userDetailModel = require("../models/userDetail");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addUserDetail = async data => {
  try {
    const user = new userDetailModel(data);
    return await user.save();
  } catch (error) {
    logger.error('Error while adding organization', error);
    throw error
  }
}

action.updateUserDetail = async (userId, userToUpdate) => {
  try {
    return await userDetailModel.findByIdAndUpdate(userId, userToUpdate, {
      new: true
    });
  } catch (error) {
    logger.error('Error while updating user detail', error);
    throw error
  }
}

/**
 * Get user detail
 * @param {*} data
 * @returns
 */
// action.getUser = async (query) => {
//   try {
//     return await userDetailModel.findOne(query);
//   } catch (error) {
//     logger.error('Error while fetching user detail', error);
//     throw error
//   }
// }

module.exports = action;