const defaultFunction = require('../core/responser');
const { addUser, getUser, listBooking } = require("../controller/admin");
const { addBoatType } = require("../controller/boatType");
const { addFishType } = require("../controller/fishType");
const { addboat, getBoatDetail,getAllBoats, updateBoat, updateBoatStatus } = require("../controller/boat");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (req, res) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done");
  console.log("req.url",req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname",pathname);
  try {
    switch (true) {
      case pathname === '/add-user' && req.method === "POST":
        return await addUser(req.body);
      case pathname === '/get-user' && req.method === "GET":
        return await getUser();
      case pathname === '/add-boat-type' && req.method === "POST":
        return await addBoatType(req.body);
      case pathname === '/add-fish-type' && req.method === "POST":
        return await addFishType(req.body);
      case pathname === '/add-boat' && req.method === "POST":
        return await addboat(req.body);
      case pathname === '/get-boat-detail' && req.method === "GET":
        return await getBoatDetail(req.query);
      case pathname === '/update-boat' && req.method === "PUT":
        return await updateBoat(req.body);
      case pathname === '/list-booking' && req.method === "GET":
        return await listBooking(req.query);
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