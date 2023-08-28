const defaultFunction = require('../core/responser');
const { addCommunityTopic,updateCommunityTopic,getAllCommunityTopicsByCategory,getAllCommunityTopics } = require("../controller/communityTopic");
const logger = require('../core/logger');
const coreDB = require("../core/db");



module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done",event);
  try {
    switch (true) {
      case event.path === '/communityTopic' && event.httpMethod === "POST":
        return await addCommunityTopic(JSON.parse(event.body));
      case event.path === '/communityTopic' && event.httpMethod === "PUT":
        return await updateCommunityTopic(JSON.parse(event.body));    
      case event.path === '/communityTopic/getAllCommunitiesTopics' && event.httpMethod === "GET":
        return await getAllCommunityTopics(event.queryStringParameters);
      case event.path === '/communityTopic/getAllCommunitiesTopicsByCategory' && event.httpMethod === "GET":
            return await getAllCommunityTopicsByCategory(event.queryStringParameters);
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