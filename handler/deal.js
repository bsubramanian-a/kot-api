const defaultFunction = require('../core/responser');
const { addDeal, updateDeal, getDealDetail, listDeals, getProductsInCategoryWithDeals, getDailyDealsProducts } = require("../controller/deal"); // Import deal controller functions
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done 1", event.path);
  try {
    console.log("deal handler");
    switch (true) {
        case event.path === '/deal/add-deal' && event.httpMethod === "POST":
            return await addDeal(JSON.parse(event.body));
        case event.path === '/deal/update-deal' && event.httpMethod === "PUT":
            return await updateDeal(JSON.parse(event.body));
        case event.path === '/deal/get-deal-detail' && event.httpMethod === "GET":
            return await getDealDetail(event.queryStringParameters);
        case event.path === '/deal/all-deals' && event.httpMethod === "GET":
            return await listDeals(event.queryStringParameters);
        case event.path === '/deal/products-in-category-with-deals' && event.httpMethod === "GET":
            return await getProductsInCategoryWithDeals(event.queryStringParameters);
        case event.path === '/deal/daily-deals-products' && event.httpMethod === "GET":
            return await getDailyDealsProducts();
        default:
            return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      event: event,
      handler: "deal", // Change the handler name to 'deal'
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
