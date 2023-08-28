const defaultFunction = require('../core/responser');
const { addOrganization } = require("../controller/organization");
const { addUser } = require("../controller/user");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done");
  try {
    switch (true) {
      case event.path === '/organization/add' && event.httpMethod === "POST":
        return await addOrganization(JSON.parse(event.body));
      case event.path === '/organization/add/user' && event.httpMethod === "POST":
        return await addUser(JSON.parse(event.body));
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