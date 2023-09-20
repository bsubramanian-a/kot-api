const defaultFunction = require('../core/responser');
const { addDeal, updateDeal, getDealDetail, listDeals, getProductsInCategoryWithDeals, getDailyDealsProducts, getBestDeals, searchDealProducts } = require("../controller/deal"); // Import deal controller functions
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
    console.log("deal handler");
    switch (true) {
        case pathname === '/add-deal' && req.method === "POST":
            return await addDeal(req.body);
        case pathname === '/update-deal' && req.method === "PUT":
            return await updateDeal(req.body);
        case pathname === '/get-deal-detail' && req.method === "GET":
            return await getDealDetail(req.query);
        case pathname === '/all-deals' && req.method === "GET":
            return await listDeals(req.query);
        case pathname === '/products-in-category-with-deals' && req.method === "GET":
            return await getProductsInCategoryWithDeals(req.query);
        case pathname === '/daily-deals-products' && req.method === "GET":
            return await getDailyDealsProducts();
        case pathname === '/best-deals' && req.method === "GET":
          return await getBestDeals();
        case pathname === '/search-deals' && req.method === "GET":
          return await searchDealProducts(req.query);
        default:
            return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      event: req,
      handler: "deal", // Change the handler name to 'deal'
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
