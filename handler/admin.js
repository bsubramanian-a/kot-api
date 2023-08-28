const defaultFunction = require('../core/responser');
const { addUser, getUser, listBooking } = require("../controller/admin");
const { addBoatType } = require("../controller/boatType");
const { addFishType } = require("../controller/fishType");
const { addboat, getBoatDetail,getAllBoats, updateBoat, updateBoatStatus } = require("../controller/boat");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done");
  try {
    switch (true) {
      case event.path === '/admin/add-user' && event.httpMethod === "POST":
        return await addUser(JSON.parse(event.body));
      case event.path === '/admin/get-user' && event.httpMethod === "GET":
        return await getUser();
      case event.path === '/admin/add-boat-type' && event.httpMethod === "POST":
        return await addBoatType(JSON.parse(event.body));
      case event.path === '/admin/add-fish-type' && event.httpMethod === "POST":
        return await addFishType(JSON.parse(event.body));
      case event.path === '/admin/add-boat' && event.httpMethod === "POST":
        return await addboat(JSON.parse(event.body));
      case event.path === '/admin/get-boat-detail' && event.httpMethod === "GET":
        return await getBoatDetail(event.queryStringParameters);
      case event.path === '/admin/update-boat' && event.httpMethod === "PUT":
        return await updateBoat(JSON.parse(event.body));
      case event.path === '/admin/list-booking' && event.httpMethod === "GET":
        return await listBooking(event.queryStringParameters);
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