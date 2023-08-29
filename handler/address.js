const defaultFunction = require('../core/responser');
const { createAddress, updateAddress, getAddressById, deleteAddress, getAddressListByUserId } = require("../controller/address");
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
        return await createAddress(req.body);
      case pathname === '/' && req.method === "PUT":
        return await updateAddress(req.body);
      case pathname === '/getaddressbyid' && req.method === "GET":
        const addressId = req.query.addressId;
        return await getAddressById(addressId);
      case pathname === '/getbyuserid' && req.method === "GET":
        return await getAddressListByUserId(req.query.user);
      case pathname === '/delete' && req.method === "DELETE":
        const deleteAddressId = req.query.addressId;
        return await deleteAddress(deleteAddressId);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: "address",
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
