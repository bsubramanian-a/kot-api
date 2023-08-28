const defaultFunction = require('../core/responser');
const { addCommunity,updateCommunity,getAllCommunities,addCommunityPost,getCommunityFeed, followOrUnfollowCommunity, getAllRecommendedCommunities } = require("../controller/community");
const logger = require('../core/logger');
const coreDB = require("../core/db");



module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done",event);
  try {
    switch (true) {
      case event.path === '/community' && event.httpMethod === "POST":
        return await addCommunity(JSON.parse(event.body));
      case event.path === '/community' && event.httpMethod === "PUT":
        return await updateCommunity(JSON.parse(event.body));    
      case event.path === '/community/getAllCommunities' && event.httpMethod === "GET":
        return await getAllCommunities(event.queryStringParameters);
      case event.path === '/community/getAllRecommendedCommunities' && event.httpMethod === "GET":
          return await getAllRecommendedCommunities(event.queryStringParameters);
      case event.path === '/community/addPost' && event.httpMethod === "POST":
        return await addCommunityPost(JSON.parse(event.body));
      case event.path === '/community/addFishCatch' && event.httpMethod === "POST":
        return await addCommunityPost(JSON.parse(event.body));
      case event.path === '/community/follow-or-unfollow' && event.httpMethod === "POST":
        return await followOrUnfollowCommunity(JSON.parse(event.body));
      case event.path === '/community/communityFeed' && event.httpMethod === "GET":
        return await getCommunityFeed(event.queryStringParameters);          
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