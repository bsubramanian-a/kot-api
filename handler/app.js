const defaultFunction = require('../core/responser');
const { listBoatType } = require("../controller/boatType");
const { listBoat, searchBoat, bookBoat, listMyBooking, listBoatByType, getBoatDetails, updateBoatBooking } = require("../controller/boat");
const { addPost, listMyPost, updatePost, deletePost,likePost } = require("../controller/post");
const { addReport } = require("../controller/report");
const { listFishType } = require("../controller/fishType");
const logger = require('../core/logger');
const coreDB = require("../core/db");



module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  try {
    switch (true) {
      case event.path === '/app/list-boat-type' && event.httpMethod === "GET":
        return await listBoatType(event.queryStringParameters);
      case event.path === '/app/list-fish-type' && event.httpMethod === "GET":
        return await listFishType(event.queryStringParameters);
      case event.path === '/app/list-boat' && event.httpMethod === "GET":
        return await listBoat(event.queryStringParameters);
      case event.path === '/app/list-boat-by-type' && event.httpMethod === "GET":
          return await listBoatByType(event.queryStringParameters);
      case event.path === '/app/get-boat-details' && event.httpMethod === "GET":
          return await getBoatDetails(event.queryStringParameters);          
      case event.path === '/app/search-boat' && event.httpMethod === "GET":
        return await searchBoat(event.queryStringParameters);
      case event.path === '/app/book-boat' && event.httpMethod === "POST":
        return await bookBoat(JSON.parse(event.body));
      case event.path === '/app/book-boat' && event.httpMethod === "PUT":
        return await updateBoatBooking(JSON.parse(event.body));
      case event.path === '/app/list-my-booking' && event.httpMethod === "GET":
        return await listMyBooking(event.queryStringParameters);
      case event.path === '/app/add-post' && event.httpMethod === "POST":
        return await addPost(JSON.parse(event.body));
      case event.path === '/app/like-post' && event.httpMethod === "POST":
          return await likePost(JSON.parse(event.body));
      case event.path === '/app/list-my-post' && event.httpMethod === "GET":
        return await listMyPost(event.queryStringParameters);
      case event.path === '/app/update-post' && event.httpMethod === "PUT":
        return await updatePost(JSON.parse(event.body));
      case event.path === '/app/delete-post' && event.httpMethod === 'DELETE':
        return await deletePost(event.queryStringParameters);
      case event.path === '/app/add-report' && event.httpMethod === "POST":
        return await addReport(JSON.parse(event.body));
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