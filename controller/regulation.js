const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const regulationService = require("../services/regulation");

const action = {};

action.addRegulation = async (data) => {
  logger.info("Adding new Regulation", data);
  try {
    const regulationData = await regulationService.addRegulation(data);
    return defaultFunction.success({
      response: regulationData,
      message: "Regulation added successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while adding regulation", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while adding regulation",
    });
  }
};

action.updateRegulation = async (data) => {
  logger.info("Updating regulation", data);
  try {
    let query = {
      _id: data._id,
    };
    const regulationData = await regulationService.updateRegulation(
      query,
      data
    );
    return defaultFunction.success({
      response: null,
      message: "Regulation updated successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while updating regulation", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while updating regulation",
    });
  }
};

action.getRegulationDetail = async (query) => {
  try {
    if (!query || !query.regulationId) {
      throw "regulationId cannot be null";
    }
    let userQuery = {
      _id: query.regulationId,
    };
    const regulationDetail = await regulationService.getRegulationDetail(
      userQuery
    );
    return defaultFunction.success({
      response: regulationDetail,
      message: regulationDetail
        ? "Regulation detail fetched successfully"
        : "Regulation Detail not found",
    });
  } catch (error) {
    logger.error("Failed to get regulation details", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listRegulations = async (query) => {
  try {
    let queryData = {
      // Additional query parameters if needed
    };

    const regulationDetails = await regulationService.listRegulations(
      queryData
    );

    return defaultFunction.success({
      response: regulationDetails,
      message: "Regulations listed successfully",
      total: regulationDetails.length,
    });
  } catch (error) {
    logger.error("Failed while listing regulations", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

module.exports = action;
