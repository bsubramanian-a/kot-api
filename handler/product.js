const defaultFunction = require('../core/responser');
const { addProduct, updateProduct, getProductDetail, listProduct } = require("../controller/product");
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
    console.log("product cat handler");
    switch (true) {
      case pathname === '/add-product' && req.method === "POST":
        return await addProduct(req.body);
      case pathname === '/update-product' && req.method === "PUT":
        return await updateProduct(req.body);
      case pathname === '/get-product-detail' && req.method === "GET":
        return await getProductDetail(req.query);
      case pathname === '/all-products' && req.method === "GET":
        return await listProduct(req.query);
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