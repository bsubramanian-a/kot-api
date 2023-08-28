const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const addressService = require("../services/address")

const action = {};

action.createAddress = async (data) => {
  try {
    const addressData = await addressService.createAddress(data);
    return defaultFunction.success({
      response: addressData,
      message: "Address created successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while creating address", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while creating address",
    });
  }
};

action.updateAddress = async (data) => {
  try {
    const addressData = await addressService.updateAddress(data);
    return defaultFunction.success({
      response: addressData,
      message: "Address updated successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while updating address", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while updating address",
    });
  }
};

action.getAddressById = async (addressId) => {
  try {
    const addressData = await addressService.getAddressById(addressId);
    return defaultFunction.success({
      response: addressData,
      message: "Address fetched successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while fetching address", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while fetching address",
    });
  }
};

action.getAddressListByUserId = async (userId) => {
    try {
      const addressList = await addressService.getAddressListByUserId(userId);
      return defaultFunction.success({
        response: addressList,
        message: "Address list fetched successfully!",
        total: addressList.length,
      });
    } catch (error) {
      logger.error("Failed while fetching address list", error);
      return defaultFunction.somethingWentWrong({
        error: error,
        message: "Failed while fetching address list",
      });
    }
};

action.deleteAddress = async (addressId) => {
  try {
    const deletedAddress = await addressService.deleteAddress(addressId);
    return defaultFunction.success({
      response: deletedAddress,
      message: "Address deleted successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while deleting address", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while deleting address",
    });
  }
};

module.exports = action;
