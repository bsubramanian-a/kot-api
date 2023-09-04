const defaultFunction = require('../core/responser');
const { createComment, createReply, likeComment } = require("../controller/fishCatchComment")
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (req) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters",req.query);
  console.log("req.url",req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname",pathname);
  logger.data("db done");
  
  try {
    switch (true) {
      case pathname === '/' && req.method === "POST":
        return await createComment(req.body);
      case pathname === '/reply' && req.method === "POST":
        return await createReply(req.body);
      case pathname === '/like' && req.method === "POST":
        return await likeComment(req.body);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: "comment",
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
