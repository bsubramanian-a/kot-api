const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const productService = require("../services/product");

const action = {};
 
action.addProduct = async (data) => {
  logger.info("Adding new Product", data);
  try {
    const productData = await productService.addProduct(data);
    return defaultFunction.success({
      response: productData,
      message: "Product added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding product", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding product" });
  }
};

action.updateProduct = async (data) => {
  logger.info("updating new product", data);
  try {
    let query = {
      _id: data._id
    }
    const productData = await productService.updateProduct(query, data);
    return defaultFunction.success({
      response: null,
      message: "Product updated successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating product", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating product" });
  }
};

action.getProductDetail = async (query) => {
  try {
    if (!query || !query.productId) {
      throw "productId can not be null";
    }
    let userQuery = {
      _id: query.productId
    };
    const productDetail = await productService.getProductDetail(userQuery);
    return defaultFunction.success({
      response: productDetail,
      message: productDetail ? "Product detail fetched successfully" : "Product Detail not found",
    });
  } catch (error) {
    logger.error("Failed getLocations", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listProduct = async (query) => {
  try {
    let queryData={
      status:1,
    }

    const productDetail = await productService.listProduct(queryData);
    
    return defaultFunction.success({
      response: productDetail,
      message: "Product listed successfully",
      total: productDetail.length
    });

  } catch (error) {
    logger.error("Failed while listing product", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

module.exports = action;