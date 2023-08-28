const defaultFunction = require('../core/responser');
const { createRating } = require("../controller/productRating");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done", event);
  try {
    switch (true) {
      case event.path === '/productRating/create' && event.httpMethod === "POST":
        return await createRating(JSON.parse(event.body));
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      event: event,
      handler: "rating",
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
