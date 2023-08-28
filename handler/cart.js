const defaultFunction = require('../core/responser');
const cartController = require("../controller/cart"); // Make sure to import the correct path to your cart controller
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done", event.path);
  try {
    switch (true) {
      case event.path === '/cart/addToCart' && event.httpMethod === "POST":
        return await cartController.addToCart(JSON.parse(event.body));
      case event.path === '/cart/updateCartItemQuantity' && event.httpMethod === "PUT":
        return await cartController.updateCartItemQuantity(JSON.parse(event.body));
      case event.path === '/cart/getCartByUser' && event.httpMethod === "GET":
        const userId = event.queryStringParameters.userId;
        return await cartController.getCartByUser(userId);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      event: event,
      handler: "cart",
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
