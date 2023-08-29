const defaultFunction = require('../core/responser');
const { addUser, getUserDetail, updatetUserDetail,updatetUser } = require("../controller/user");
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
      case pathname === '/' && req.method === "POST":
        return await addUser(req.body);
      case pathname === '/' && req.method === "GET":
        console.log(req.query);
        return await getUserDetail(req.query);
      case pathname === '/update' && req.method === "PATCH":
        return await updatetUser(req.body);
      case pathname === '/update-detail' && req.method === "PATCH":
        return await updatetUserDetail(req.body);
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