const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const fishingCharterService = require("../services/fishingCharter");

const action = {};

action.addFishingCharter = async (data) => {
  logger.info("Adding new fishingCharter", data);
  try {
    const fishingCharterData = await fishingCharterService.addFishingCharter(data);
    return defaultFunction.success({
      response: fishingCharterData,
      message: "FishingCharter added successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while adding fishingCharter", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while adding fishingCharter",
    });
  }
};

action.updateFishingCharter = async (data) => {
  logger.info("Updating fishingCharter", data);
  try {
    let query = {
      _id: data._id,
    };
    const fishingCharterData = await fishingCharterService.updateFishingCharter(query, data);
    return defaultFunction.success({
      response: null,
      message: "FishingCharter updated successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while updating fishingCharter", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while updating fishingCharter",
    });
  }
};

action.getFishingCharterDetail = async (query) => {
  try {
    if (!query || !query.fishingCharterId) {
      throw "fishingCharterId cannot be null";
    }
    let userQuery = {
      _id: query.fishingCharterId,
    };
    const fishingCharterDetail = await fishingCharterService.getFishingCharterDetail(userQuery);
    return defaultFunction.success({
      response: fishingCharterDetail,
      message: fishingCharterDetail
        ? "fishingCharter detail fetched successfully"
        : "fishingCharter Detail not found",
    });
  } catch (error) {
    logger.error("Failed to get fishingCharter details", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listFishingCharters = async (query) => {
  try {
    let queryData = {
      // Additional query parameters if needed
    };

    const fishingCharterDetails = await fishingCharterService.listFishingCharters(queryData);

    return defaultFunction.success({
      response: fishingCharterDetails,
      message: "fishingCharters listed successfully",
      total: fishingCharterDetails.length,
    });
  } catch (error) {
    logger.error("Failed while listing fishingCharters", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

module.exports = action;
