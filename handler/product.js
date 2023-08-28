const defaultFunction = require('../core/responser');
const { addProduct, updateProduct, getProductDetail, listProduct } = require("../controller/product");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done 1",event.path);
  try {
    console.log("product cat handler");
    switch (true) {
      case event.path === '/product/add-product' && event.httpMethod === "POST":
        return await addProduct(JSON.parse(event.body));
      case event.path === '/product/update-product' && event.httpMethod === "PUT":
        return await updateProduct(JSON.parse(event.body));
      case event.path === '/product/get-product-detail' && event.httpMethod === "GET":
        return await getProductDetail(event.queryStringParameters);
      case event.path === '/product/all-products' && event.httpMethod === "GET":
        return await listProduct(event.queryStringParameters);
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