const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const ratingService = require("../services/productRating");

const action = {};

action.createRating = async (data) => {
  try {
    const ratingData = await ratingService.createRating(data);
    return defaultFunction.success({
      response: ratingData,
      message: "Rating created successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while creating rating", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while creating rating",
    });
  }
};

// Add other action methods for managing ratings

module.exports = action;
