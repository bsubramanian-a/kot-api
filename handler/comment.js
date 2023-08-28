const defaultFunction = require('../core/responser');
const { createComment, createReply, likeComment } = require("../controller/comment");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done", event);
  
  try {
    switch (true) {
      case event.path === '/comment' && event.httpMethod === "POST":
        return await createComment(JSON.parse(event.body));
      case event.path === '/comment/reply' && event.httpMethod === "POST":
        return await createReply(JSON.parse(event.body));
      case event.path === '/comment/like' && event.httpMethod === "POST":
        return await likeComment(JSON.parse(event.body));
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      event: event,
      handler: "comment",
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
