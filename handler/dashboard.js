const defaultFunction = require('../core/responser');
const { addDashboardConfig, getDashboardConfig, updateDashboardConfig } = require("../controller/dashboard");
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
    switch (true) {
      case pathname === '/add-config' && req.method === "POST":
        return await addDashboardConfig(req.body);
      case pathname === '/get-config' && req.method === "GET":
        return await getDashboardConfig(req.query);
      case pathname === "/update-config" && req.method === "PATCH":
        return await updateDashboardConfig(req.body);
      // case pathname === '/auth/login':
      //   return await login(req, cb);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
        error: error,
        req: req,
        handler: "auth",
        messageCode: "S001",
      };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};