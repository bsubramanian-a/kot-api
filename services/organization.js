const logger = require("../core/logger");
const orgModel = require("../models/organization");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addOrganization = async data => {
  try {
    const organization = new orgModel(data);
    return await organization.save();
  } catch (error) {
    logger.error('Error while adding organization', error);
    throw error
  }
}

module.exports = action;