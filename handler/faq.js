const defaultFunction = require('../core/responser');
const {
  addFAQ,
  updateFAQ,
  getFAQDetail,
  listFAQs,
} = require('../controller/faq'); // Import FAQ controller functions
const logger = require('../core/logger');
const coreDB = require('../core/db');

module.exports.init = async (req, res) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters", req.query);
  console.log("req.url", req.url);
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname", pathname);
  logger.data("db done");
  try {
    console.log("faq handler");
    switch (true) {
      case pathname === "/add-faq" && req.method === "POST":
        return await addFAQ(req.body);
      case pathname === "/update-faq" && req.method === "PUT":
        return await updateFAQ(req.body);
      case pathname === "/get-faq-detail" && req.method === "GET":
        return await getFAQDetail(req.query);
      case pathname === "/all-faqs" && req.method === "GET":
        return await listFAQs(req.query);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: "faq",
      messageCode: "F001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};