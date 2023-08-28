const defaultFunction = require('../core/responser');
const { createOrder, updateOrder, getOrderHistory, getOrderHistoryById } = require("../controller/order");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done", event);
  try {
    switch (true) {
      case event.path === '/order' && event.httpMethod === "POST":
        return await createOrder(JSON.parse(event.body));
      case event.path === '/order' && event.httpMethod === "PUT":
        return await updateOrder(JSON.parse(event.body));
      case event.path === '/order/history' && event.httpMethod === "GET":
        return await getOrderHistory(event.queryStringParameters.userId);
      case event.path === '/order/historyById' && event.httpMethod === "GET":
        return await getOrderHistoryById(event.queryStringParameters.orderId);
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
