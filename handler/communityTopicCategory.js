const defaultFunction = require('../core/responser');
const { addCommunityTopicCategory,updateCommunityTopicCategory,getAllCommunityTopicCategoriesAndItsTopics } = require("../controller/communityTopicCategory");
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
        return await addCommunityTopicCategory(req.body);
      case pathname === '/' && req.method === "PUT":
        return await updateCommunityTopicCategory(req.body);
      case pathname === '/getAllCommunityTopicCategoriesAndItsTopics' && req.method === "GET":
            return await getAllCommunityTopicCategoriesAndItsTopics(req.query);      
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
        error: error,
        req: req,
        handler: "auth",
        messageCode: "S001",
      };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};