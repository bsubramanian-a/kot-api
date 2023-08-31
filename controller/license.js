const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const licenseService = require("../services/license");

const action = {};

action.addLicense = async (data) => {
  logger.info("Adding new License", data);
  try {
    const licenseData = await licenseService.addLicense(data);
    return defaultFunction.success({
      response: licenseData,
      message: "License added successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while adding license", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while adding license",
    });
  }
};

action.updateLicense = async (data) => {
  logger.info("Updating license", data);
  try {
    let query = {
      _id: data._id,
    };
    const licenseData = await licenseService.updateLicense(
      query,
      data
    );
    return defaultFunction.success({
      response: null,
      message: "License updated successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while updating license", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while updating license",
    });
  }
};

action.getLicenseDetail = async (query) => {
  try {
    if (!query || !query.licenseId) {
      throw "licenseId cannot be null";
    }
    let userQuery = {
      _id: query.licenseId,
    };
    const licenseDetail = await licenseService.getLicenseDetail(
      userQuery
    );
    return defaultFunction.success({
      response: licenseDetail,
      message: licenseDetail
        ? "License detail fetched successfully"
        : "License Detail not found",
    });
  } catch (error) {
    logger.error("Failed to get license details", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listLicenses = async (query) => {
  try {
    let queryData = {
      // Additional query parameters if needed
    };

    const licenseDetails = await licenseService.listLicenses(
      queryData
    );

    return defaultFunction.success({
      response: licenseDetails,
      message: "Licenses listed successfully",
      total: licenseDetails.length,
    });
  } catch (error) {
    logger.error("Failed while listing licenses", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

module.exports = action;
