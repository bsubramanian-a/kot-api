
const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const orgService = require("../services/organization");

const action = {};
 
action.addOrganization = async (data) => {
  logger.info("Adding new Organization", data);
  try {
    logger.info("Adding new Organization");
    const client = await orgService.addOrganization(data);
    return defaultFunction.success({
      response: client,
      message: "Organization added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding Organization", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding Organization" });
  }
};


module.exports = action;