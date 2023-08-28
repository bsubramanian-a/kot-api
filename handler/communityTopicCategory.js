const defaultFunction = require('../core/responser');
const { addCommunityTopicCategory,updateCommunityTopicCategory,getAllCommunityTopicCategoriesAndItsTopics } = require("../controller/communityTopicCategory");
const logger = require('../core/logger');
const coreDB = require("../core/db");



module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done",event);
  try {
    switch (true) {
      case event.path === '/communityTopicCategory' && event.httpMethod === "POST":
        return await addCommunityTopicCategory(JSON.parse(event.body));
      case event.path === '/communityTopicCategory' && event.httpMethod === "PUT":
        return await updateCommunityTopicCategory(JSON.parse(event.body));
      case event.path === '/communityTopicCategory/getAllCommunityTopicCategoriesAndItsTopics' && event.httpMethod === "GET":
            return await getAllCommunityTopicCategoriesAndItsTopics(event.queryStringParameters);      
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