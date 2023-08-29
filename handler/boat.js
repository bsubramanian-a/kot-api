const defaultFunction = require('../core/responser');
const { addboat, getBoatDetail,getAllBoats, updateBoat, updateBoatStatus } = require("../controller/boat");
const logger = require('../core/logger');
const coreDB = require("../core/db");



module.exports.init = async (req) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters",req.query);
  console.log("req.url",req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname",pathname);
  logger.data("db done");
  try {
    switch (true) {
      // case pathname === '/' && req.method === "POST":
      //   return await addboat(req.body);
      // case pathname === '/' && req.method === "PUT":
      //   return await updateBoat(req.body);
      case pathname === '/updateBoatStatus' && req.method === "PUT":
        return await updateBoatStatus(req.query);
      // case pathname === '/boat' && req.method === "GET":
      //   return await getBoatDetail(req.query);
      case pathname === '/getAllBoats' && req.method === "GET":
        return await getAllBoats(req.query);
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