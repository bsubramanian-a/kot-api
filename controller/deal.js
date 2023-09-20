const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const productService = require("../services/product");
const dealService = require("../services/deal"); // Import the dealService module

const action = {};

action.addDeal = async (data) => {
  logger.info("Adding new Deal", data);
  try {
    const dealData = await dealService.addDeal(data);
    return defaultFunction.success({
      response: dealData,
      message: "Deal added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding deal", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding deal" });
  }
};

action.updateDeal = async (data) => {
  logger.info("Updating deal", data);
  try {
    let query = {
      _id: data._id
    };
    const dealData = await dealService.updateDeal(query, data);
    return defaultFunction.success({
      response: null,
      message: "Deal updated successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating deal", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating deal" });
  }
};

action.getDealDetail = async (query) => {
  try {
    if (!query || !query.dealId) {
      throw "dealId cannot be null";
    }
    let userQuery = {
      _id: query.dealId
    };
    const dealDetail = await dealService.getDealDetail(userQuery);
    return defaultFunction.success({
      response: dealDetail,
      message: dealDetail ? "Deal detail fetched successfully" : "Deal Detail not found",
    });
  } catch (error) {
    logger.error("Failed to get deal details", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listDeals = async (query) => {
  try {
    let queryData = {
      // Additional query parameters if needed
    };

    const dealDetail = await dealService.listDeals(queryData);

    return defaultFunction.success({
      response: dealDetail,
      message: "Deals listed successfully",
      total: dealDetail.length
    });

  } catch (error) {
    logger.error("Failed while listing deals", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.getProductsInCategoryWithDeals = async (query) => {
    try {
      if (!query || !query.categoryId) {
        throw "categoryId cannot be null";
      }
      const productsWithDeals = await productService.getProductsInCategoryWithDeals(query.categoryId);
      return defaultFunction.success({
        response: productsWithDeals,
        message: "Products with deals in the category fetched successfully",
        total: productsWithDeals.length
      });
    } catch (error) {
      logger.error("Failed to fetch products with deals in the category", error);
      return defaultFunction.somethingWentWrong({ error });
    }
};

action.getDailyDealsProducts = async () => {
  try {
    const dailyDealsProducts = await dealService.getDailyDealsProducts();
    return defaultFunction.success({
      response: dailyDealsProducts,
      message: "Daily deals fetched successfully",
    });
  } catch (error) {
    logger.error("Failed to fetch daily deals products", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.getBestDeals = async () => {
  try {
    const dailyDealsProducts = await dealService.getBestDeals();
    return defaultFunction.success({
      response: dailyDealsProducts,
      message: "Best deals products fetched successfully",
      total: dailyDealsProducts.length
    });
  } catch (error) {
    logger.error("Failed to fetch daily deals products", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.searchDealProducts = async (query) => {
  try {
    const searchString = query?.searchString;
    let dealProducts = [];

    if(searchString){
      dealProducts = await dealService.searchDealProducts(searchString);
    }
    
    return defaultFunction.success({
      response: dealProducts,
      message: "Products fetched successfully",
      total: dealProducts.length
    });
  } catch (error) {
    logger.error("Failed to fetch daily deals products", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

module.exports = action;
