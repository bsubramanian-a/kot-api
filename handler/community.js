const defaultFunction = require('../core/responser');
const { addCommunity,updateCommunity,getAllCommunities,addCommunityPost,getCommunityFeed, followOrUnfollowCommunity, getAllRecommendedCommunities, getNearByCommunities } = require("../controller/community");
const logger = require('../core/logger');
const coreDB = require("../core/db");
const url = require("url");



module.exports.init = async (req, res) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters",req.query);
  console.log("req.url",req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname",pathname);
  try {
    
    switch (true) {
      case pathname === '/' && req.method === "POST":
        return await addCommunity(req.body);
      case pathname === '/' && req.method === "PUT":
        return await updateCommunity(req.body);    
      case pathname === '/getAllCommunities' && req.method === "GET":
        return await getAllCommunities(req.query);
      case pathname === '/getAllRecommendedCommunities' && req.method === "GET":
          return await getAllRecommendedCommunities(req.query);
      case pathname === '/addPost' && req.method === "POST":
        return await addCommunityPost(req.body);
      case pathname === '/addFishCatch' && req.method === "POST":
        return await addCommunityPost(req.body);
      case pathname === '/follow-or-unfollow' && req.method === "POST":
        return await followOrUnfollowCommunity(req.body);
      case pathname === '/communityFeed' && req.method === "GET":
        return await getCommunityFeed(req.query);    
      case pathname === '/near-by-communities' && req.method === "GET":
        return await getNearByCommunities(req.query);          
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