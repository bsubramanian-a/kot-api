const logger = require("../core/logger");
const Address = require("../models/address");

const action = {};

action.createAddress = async (data) => {
  try {
    const newAddress = new Address(data);
    return await newAddress.save();
  } catch (error) {
    logger.error("Error while creating address", error);
    throw error;
  }
};

action.updateAddress = async (data) => {
  try {
    return await Address.findByIdAndUpdate(data._id, data, { new: true });
  } catch (error) {
    logger.error("Error while updating address", error);
    throw error;
  }
};

action.getAddressById = async (addressId) => {
  try {
    return await Address.findById(addressId);
  } catch (error) {
    logger.error("Error while fetching address by ID", error);
    throw error;
  }
};

action.getAddressListByUserId = async (userId) => {
    try {
      const addressList = await Address.find({ user: userId });
      return addressList;
    } catch (error) {
      logger.error("Error while fetching address list by user ID", error);
      throw error;
    }
};

action.deleteAddress = async (addressId) => {
  try {
    return await Address.findByIdAndDelete(addressId);
  } catch (error) {
    logger.error("Error while deleting address", error);
    throw error;
  }
};

module.exports = action;
