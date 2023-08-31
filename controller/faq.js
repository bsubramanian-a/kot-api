const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const faqService = require("../services/faq");

const action = {};

action.addFAQ = async (data) => {
  logger.info("Adding new FAQ", data);
  try {
    const faqData = await faqService.addFAQ(data);
    return defaultFunction.success({
      response: faqData,
      message: "FAQ added successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while adding FAQ", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while adding FAQ",
    });
  }
};

action.updateFAQ = async (data) => {
  logger.info("Updating FAQ", data);
  try {
    let query = {
      _id: data._id,
    };
    const faqData = await faqService.updateFAQ(query, data);
    return defaultFunction.success({
      response: null,
      message: "FAQ updated successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while updating FAQ", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while updating FAQ",
    });
  }
};

action.getFAQDetail = async (query) => {
  try {
    if (!query || !query.faqId) {
      throw "faqId cannot be null";
    }
    let userQuery = {
      _id: query.faqId,
    };
    const faqDetail = await faqService.getFAQDetail(userQuery);
    return defaultFunction.success({
      response: faqDetail,
      message: faqDetail
        ? "FAQ detail fetched successfully"
        : "FAQ Detail not found",
    });
  } catch (error) {
    logger.error("Failed to get FAQ details", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listFAQs = async (query) => {
  try {
    let queryData = {
      // Additional query parameters if needed
    };

    const faqDetails = await faqService.listFAQs(queryData);

    return defaultFunction.success({
      response: faqDetails,
      message: "FAQs listed successfully",
      total: faqDetails.length,
    });
  } catch (error) {
    logger.error("Failed while listing FAQs", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

module.exports = action;
