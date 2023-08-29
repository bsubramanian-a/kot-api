const defaultFunction = require('../core/responser');
const cartController = require("../controller/cart"); // Make sure to import the correct path to your cart controller
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (req, res) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters",req.query);
  console.log("req.url",req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname",pathname);
  logger.data("db done");
  try {
    switch (true) {
      case pathname === '/addToCart' && req.method === "POST":
        return await cartController.addToCart(req.body);
      case pathname === '/updateCartItemQuantity' && req.method === "PUT":
        return await cartController.updateCartItemQuantity(req.body);
      case pathname === '/getCartByUser' && req.method === "GET":
        const userId = req.query.userId;
        return await cartController.getCartByUser(userId);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: "cart",
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
