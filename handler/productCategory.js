const defaultFunction = require('../core/responser');
const { addCategory, updateCategory, getCategoryDetail, listCategory,getProductsByCategory } = require("../controller/productcategory");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done 1",event.path);
  try {
    console.log("product cat handler");
    switch (true) {
      case event.path === '/productCategory/add-product-category' && event.httpMethod === "POST":
        return await addCategory(JSON.parse(event.body));
      case event.path === '/productCategory/update-product-category' && event.httpMethod === "PUT":
        return await updateCategory(JSON.parse(event.body));
      case event.path === '/productCategory/get-category-detail' && event.httpMethod === "GET":
        return await getCategoryDetail(event.queryStringParameters);
      case event.path === '/productCategory/all-product-categories' && event.httpMethod === "GET":
        return await listCategory(event.queryStringParameters);
      case event.path === '/productCategory/all-products-by-category' && event.httpMethod === "GET":
        return await getProductsByCategory(event.queryStringParameters);
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