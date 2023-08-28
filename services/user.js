const logger = require("../core/logger");
const userModel = require("../models/user");
const interest = require("../models/interest");
const userdetail = require("../models/userDetail");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
// action.addUser = async data => {
//   try {
//     const user = new userModel(data);
//     return await user.save();
//   } catch (error) {
//     logger.error('Error while adding organization', error);
//     throw error
//   }
// }

/**
 * Get user detail
 * @param {*} data
 * @returns
 */
action.getUserDetail = async (query) => {
  try {
    return await userModel.findOne(query).populate('interest').populate('userdetail');
  } catch (error) {
    logger.error('Error while fetching user detail', error);
    throw error
  }
}

action.updateUser = async (userId, userToUpdate) => {
  try {
    return await userModel.findByIdAndUpdate(userId, userToUpdate, {
      new: true
    });
  } catch (error) {
    logger.error('Error while updating user', error);
    throw error
  }
}


module.exports = action;