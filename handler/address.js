const defaultFunction = require('../core/responser');
const { createAddress, updateAddress, getAddressById, deleteAddress, getAddressListByUserId } = require("../controller/address");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data("db done", event);

  try {
    switch (true) {
      case event.path === '/address' && event.httpMethod === "POST":
        return await createAddress(JSON.parse(event.body));
      case event.path === '/address' && event.httpMethod === "PUT":
        return await updateAddress(JSON.parse(event.body));
      case event.path === '/address/getaddressbyid' && event.httpMethod === "GET":
        const addressId = event.queryStringParameters.addressId;
        return await getAddressById(addressId);
      case event.path === '/address/getbyuserid' && event.httpMethod === "GET":
        return await getAddressListByUserId(event.queryStringParameters.user);
      case event.path === '/address/delete' && event.httpMethod === "DELETE":
        const deleteAddressId = event.queryStringParameters.addressId;
        return await deleteAddress(deleteAddressId);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      event: event,
      handler: "address",
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
