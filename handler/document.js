const defaultFunction = require('../core/responser');
const { addDocument, getDocument } = require("../controller/document");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done");
  try {
    switch (true) {
      case event.path === '/document' && event.httpMethod === "POST":
        return await addDocument(JSON.parse(event.body));
      case event.path === '/document' && event.httpMethod === "GET":
        return await getDocument(event.queryStringParameters);
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