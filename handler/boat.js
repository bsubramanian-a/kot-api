const defaultFunction = require('../core/responser');
const { addboat, getBoatDetail,getAllBoats, updateBoat, updateBoatStatus } = require("../controller/boat");
const logger = require('../core/logger');
const coreDB = require("../core/db");



module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done",event);
  try {
    switch (true) {
      // case event.path === '/boat' && event.httpMethod === "POST":
      //   return await addboat(JSON.parse(event.body));
      // case event.path === '/boat' && event.httpMethod === "PUT":
      //   return await updateBoat(JSON.parse(event.body));
      case event.path === '/boat/updateBoatStatus' && event.httpMethod === "PUT":
        return await updateBoatStatus(event.queryStringParameters);
      // case event.path === '/boat' && event.httpMethod === "GET":
      //   return await getBoatDetail(event.queryStringParameters);
      case event.path === '/boat/getAllBoats' && event.httpMethod === "GET":
        return await getAllBoats(event.queryStringParameters);
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