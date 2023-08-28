const defaultFunction = require('../core/responser');
const { addDashboardConfig, getDashboardConfig, updateDashboardConfig } = require("../controller/dashboard");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done");
  try {
    switch (true) {
      case event.path === '/dashboard/add-config' && event.httpMethod === "POST":
        return await addDashboardConfig(JSON.parse(event.body));
      case event.path === '/dashboard/get-config' && event.httpMethod === "GET":
        return await getDashboardConfig(event.queryStringParameters);
      case event.path === "/dashboard/update-config" && event.httpMethod === "PATCH":
        return await updateDashboardConfig(JSON.parse(event.body));
      // case event.path === '/auth/login':
      //   return await login(event, cb);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
        error: error,
        event: event,
        handler: "auth",
        messageCode: "S001",
      };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};