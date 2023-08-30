const defaultFunction = require('../core/responser');
const { addCategory, updateCategory, getCategoryDetail, listCategory,getProductsByCategory } = require("../controller/productCategory");
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
      case pathname === '/add-product-category' && req.method === "POST":
        return await addCategory(req.body);
      case pathname === '/update-product-category' && req.method === "PUT":
        return await updateCategory(req.body);
      case pathname === '/get-category-detail' && req.method === "GET":
        return await getCategoryDetail(req.query);
      case pathname === '/all-product-categories' && req.method === "GET":
        return await listCategory(req.query);
      case pathname === '/all-products-by-category' && req.method === "GET":
        return await getProductsByCategory(req.query);
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