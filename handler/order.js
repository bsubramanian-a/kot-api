const defaultFunction = require('../core/responser');
const { createOrder, updateOrder, getOrderHistory, getOrderHistoryById } = require("../controller/order");
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
      case pathname === '/' && req.method === "POST":
        return await createOrder(req.body);
      case pathname === '/' && req.method === "PUT":
        return await updateOrder(req.body);
      case pathname === '/history' && req.method === "GET":
        return await getOrderHistory(req.query.userId);
      case pathname === '/historyById' && req.method === "GET":
        return await getOrderHistoryById(req.query.orderId);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      event: req,
      handler: "auth",
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
