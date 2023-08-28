const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const categoryService = require("../services/productCategory");
const productService = require("../services/product");

const action = {};
 
action.addCategory = async (data) => {
  logger.info("Adding new Product Category", data);
  try {
    const categoryData = await categoryService.addCategory(data);
    return defaultFunction.success({
      response: categoryData,
      message: "Category added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding category", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding category" });
  }
};

action.updateCategory = async (data) => {
  logger.info("updating new category", data);
  try {
    let query = {
      _id: data._id
    }
    const categoryData = await categoryService.updateCategory(query, data);
    return defaultFunction.success({
      response: null,
      message: "Category updated successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating category", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating category" });
  }
};

action.getCategoryDetail = async (query) => {
  try {
    if (!query || !query.categoryId) {
      throw "categoryId can not be null";
    }
    let userQuery = {
      _id: query.categoryId
    };
    const categoryDetail = await categoryService.getCategoryDetail(userQuery);
    return defaultFunction.success({
      response: categoryDetail,
      message: categoryDetail ? "Category detail fetched successfully" : "Category Detail not found",
    });
  } catch (error) {
    logger.error("Failed getLocations", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listCategory = async (query) => {
  try {
    let queryData={
      status:1,
    }

    const categoryDetail = await categoryService.listCategory(queryData);
    
    return defaultFunction.success({
      response: categoryDetail,
      message: "Category listed successfully",
      total: categoryDetail.length
    });

  } catch (error) {
    logger.error("Failed while listing category", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.getProductsByCategory = async (query) => {
  try {
    const products = await productService.getProductsByCategory(query?.categoryId);
    return defaultFunction.success({
      response: products,
      message: "Products fetched successfully for the given category",
      total: products.length,
    });
  } catch (error) {
    logger.error("Failed to fetch products by category", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

module.exports = action;