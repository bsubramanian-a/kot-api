const defaultFunction = require("../core/responser");
const {
  addLicense,
  updateLicense,
  getLicenseDetail,
  listLicenses,
} = require("../controller/license"); // Import license controller functions
const logger = require("../core/logger");
const coreDB = require("../core/db");

module.exports.init = async (req, res) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters", req.query);
  console.log("req.url", req.url);
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname", pathname);
  logger.data("db done");
  try {
    console.log("license handler");
    switch (true) {
      case pathname === "/add-license" && req.method === "POST":
        return await addLicense(req.body);
      case pathname === "/update-license" && req.method === "PUT":
        return await updateLicense(req.body);
      case pathname === "/get-license-detail" && req.method === "GET":
        return await getLicenseDetail(req.query);
      case pathname === "/all-licenses" && req.method === "GET":
        return await listLicenses(req.query);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: "license",
      messageCode: "L001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
