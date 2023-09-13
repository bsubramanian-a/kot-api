const defaultFunction = require('../core/responser');
const { listBoatType } = require("../controller/boatType");
const { listBoat, searchBoat, bookBoat, listMyBooking, listBoatByType, getBoatDetails, updateBoatBooking, searchFishingCharter, updateFishingCharter } = require("../controller/boat");
const { addPost, listMyPost, updatePost, deletePost,likePost } = require("../controller/post");
const { addReport } = require("../controller/report");
const { listFishType } = require("../controller/fishType");
const logger = require('../core/logger');
const coreDB = require("../core/db");



module.exports.init = async (req,res) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters",req.query);
  console.log("req.url",req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname",pathname);
 
  try {
    switch (true) {
      case pathname === '/list-boat-type' && req.method === "GET":
        return await listBoatType(req.query);
      case pathname === '/list-fish-type' && req.method === "GET":
        return await listFishType(req.query);
      case pathname === '/list-boat' && req.method === "GET":
        return await listBoat(req.query);
      case pathname === '/list-boat-by-type' && req.method === "GET":
          return await listBoatByType(req.query);
      case pathname === '/get-boat-details' && req.method === "GET":
          return await getBoatDetails(req.query);          
      case pathname === '/search-boat' && req.method === "GET":
        return await searchBoat(req.query);
      case pathname === '/book-boat' && req.method === "POST":
        return await bookBoat(req.body);
      case pathname === '/book-boat' && req.method === "PUT":
        return await updateBoatBooking(req.body);
      case pathname === '/list-my-booking' && req.method === "GET":
        return await listMyBooking(req.query);
      case pathname === '/add-post' && req.method === "POST":
        return await addPost(req.body);
      case pathname === '/like-post' && req.method === "POST":
          return await likePost(req.body);
      case pathname === '/list-my-post' && req.method === "GET":
        return await listMyPost(req.query);
      case pathname === '/update-post' && req.method === "PUT":
        return await updatePost(req.body);
      case pathname === '/delete-post' && req.method === 'DELETE':
        return await deletePost(req.query);
      case pathname === '/add-report' && req.method === "POST":
        return await addReport(req.body);
      case pathname === '/search-fishing-charters' && req.method === "GET":
        return await searchFishingCharter(req.query);
      case pathname === '/update-fishing-charter-booking' && req.method === "PUT":
        return await updateFishingCharter(req.body);
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