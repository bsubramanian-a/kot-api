const defaultFunction = require('../core/responser');
const {
  addRegulation,
  updateRegulation,
  getRegulationDetail,
  listRegulations,
} = require('../controller/regulation'); // Import regulation controller functions
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
    console.log("regulation handler");
    switch (true) {
      case pathname === "/add-regulation" && req.method === "POST":
        return await addRegulation(req.body);
      case pathname === "/update-regulation" && req.method === "PUT":
        return await updateRegulation(req.body);
      case pathname === "/get-regulation-detail" && req.method === "GET":
        return await getRegulationDetail(req.query);
      case pathname === "/all-regulations" && req.method === "GET":
        return await listRegulations(req.query);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: "regulation",
      messageCode: "R001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
