const defaultFunction = require('../core/responser');
const {
  addFishingCharter,
  updateFishingCharter,
  getFishingCharterDetail,
  listFishingCharters
} = require('../controller/fishingCharter'); // Import fishingCharter controller functions
const logger = require('../core/logger');
const coreDB = require('../core/db');

module.exports.init = async (req, res) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters", req.query);
  console.log("req.url", req.url);
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname", pathname);
  logger.data("db done");
  try {
    console.log("fishingCharter handler");
    switch (true) {
      case pathname === "/add-fishing-charter" && req.method === "POST":
        return await addFishingCharter(req.body);
      case pathname === "/update-fishing-charter" && req.method === "PUT":
        return await updateFishingCharter(req.body);
      case pathname === "/get-fishing-charter-detail" && req.method === "GET":
        return await getFishingCharterDetail(req.query);
      case pathname === "/all-fishing-charters" && req.method === "GET":
        return await listFishingCharters(req.query);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: "fishingCharters",
      messageCode: "F001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};