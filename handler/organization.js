const defaultFunction = require('../core/responser');
const { addOrganization } = require("../controller/organization");
const { addUser } = require("../controller/user");
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
      case pathname === '/add' && req.method === "POST":
        return await addOrganization(req.body);
      case pathname === '/add/user' && req.method === "POST":
        return await addUser(req.body);
      // case pathname === '/auth/login':
      //   return await login(event, cb);
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