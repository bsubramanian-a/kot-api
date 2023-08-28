const logger = require("../core/logger");
const userModel = require("../models/user");
const userDetailModel = require("../models/userDetail");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addUser = async (user, userDetail) => {
  try {
    await userDetail.save();
    return await user.save();
  } catch (error) {
    logger.error('Error while adding user', error);
    throw error
  }
}

/**
 * Get user list
 * @param {*} data
 * @returns
 */
action.getUser = async (query) => {
  try {
    return await userModel.find().populate("userDetail");
  } catch (error) {
    logger.error('Error while fetching user list', error);
    throw error
  }
}

module.exports = action;