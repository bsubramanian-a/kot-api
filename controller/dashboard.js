
const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const dashboardervice = require("../services/dashboard");

const action = {};
 
action.addDashboardConfig = async (data) => {
  logger.info("Adding new dashboard config", data);
  try {
    const client = await dashboardervice.addDashboardConfig(data);
    return defaultFunction.success({
      response: client,
      message: "Dashboard config added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding dashboard config", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding dashboard config" });
  }
};

action.getDashboardConfig = async (query) => {
  logger.info("get dashboard config", query);
  if (!query || !query.organization || !query.user) {
    throw "User and organization can not be null";
  }
  try {
    let dashboardQuery = {
      filter: {
        organization: query.organization,
        user: query.user
      },
      projection: "",
      option: {},
      populate: [],
    };
    const client = await dashboardervice.getDashboardConfig(dashboardQuery);
    return defaultFunction.success({
      response: client,
      message: "Dashboard config found successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while getting dashboard config", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while getting dashboard config" });
  }
};

action.updateDashboardConfig = async (dashboardConfig) => {
  try {
    if (!dashboardConfig || !dashboardConfig._id) {
      throw "Dashboard config update payload is not valid";
    }
    let updatedDashboard = await dashboardervice.updateDashboardConfig(dashboardConfig._id, dashboardConfig);
    return defaultFunction.success({
      response: updatedDashboard,
      message: "Success",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating dashboard detail", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};


module.exports = action;