const defaultFunction = require('../core/responser');
const { addUser, getUserDetail, updatetUserDetail,updatetUser } = require("../controller/user");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done");
  try {
    switch (true) {
      case event.path === '/user' && event.httpMethod === "POST":
        return await addUser(JSON.parse(event.body));
      case event.path === '/user' && event.httpMethod === "GET":
        console.log(event.queryStringParameters);
        return await getUserDetail(event.queryStringParameters);
      case event.path === '/user/update' && event.httpMethod === "PATCH":
        return await updatetUser(JSON.parse(event.body));
      case event.path === '/user/update-detail' && event.httpMethod === "PATCH":
        return await updatetUserDetail(JSON.parse(event.body));
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