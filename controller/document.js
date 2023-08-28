
const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const documentdervice = require("../services/document");

const action = {};
 
action.addDocument = async (data) => {
  logger.info("Adding new document", data);
  try {
    const client = await documentdervice.addDocument(data);
    return defaultFunction.success({
      response: client,
      message: "Document added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding document", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding document" });
  }
};

action.getDocument = async (query) => {
  logger.info("List document", query);
  if (!query || !query.organization) {
    throw "Organization can not be null";
  }
  try {
    let dashboardQuery = {
      filter: {
        organization: query.organization
      },
      projection: "",
      option: {},
      populate: [],
    };
    const document = await documentdervice.getDocument(dashboardQuery);
    return defaultFunction.success({
      response: document,
      message: "Document listed successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while listing document", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while listing document" });
  }
};

// action.updateDashboardConfig = async (dashboardConfig) => {
//   try {
//     if (!dashboardConfig || !dashboardConfig._id) {
//       throw "Dashboard config update payload is not valid";
//     }
//     let updatedDashboard = await documentdervice.updateDashboardConfig(dashboardConfig._id, dashboardConfig);
//     return defaultFunction.success({
//       response: updatedDashboard,
//       message: "Success",
//       total: 1
//     });
//   } catch (error) {
//     logger.error("Failed while updating dashboard detail", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };


module.exports = action;