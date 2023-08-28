const logger = require("../core/logger");
const productModel = require("../models/product");
const dealService = require("../services/deal");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addProduct = async data => {
  try {
    const product = new productModel(data);
    return await product.save();
  } catch (error) {
    logger.error('Error while adding product', error);
    throw error
  }
}


/**
 * 
 * @param {*} data 
 * @returns 
 */
action.updateProduct = async(query, updateData)=> {
  try {
    return await productModel.findOneAndUpdate(query, updateData)
  } catch (error) {
    logger.error('Error while updating product', error);
    throw error
  }
}



/**
 * Get product id wise detail
 * @param {*} data
 * @returns
 */
action.getProductDetail = async (query) => {
  try {
    return await productModel.findOne(query).populate("name");
  } catch (error) {
    logger.error('Error while fetching product detail', error);
    throw error
  }
}

/**
 * Get product  detail
 * @param {*} data
 * @returns
 */
action.listProduct = async (query) => {
  try {
    return await productModel.find(query);
  } catch (error) {
    logger.error('Error while fetching product list', error);
    throw error
  }
}

action.getProductsByCategory = async (categoryId) => {
  try {
    const products = await productModel.find({ category_id: categoryId });
    return products;
  } catch (error) {
    throw error;
  }
}

action.getProductsInCategoryWithDeals = async (categoryId) => {
  try {
    // Step 1: Get Product IDs in Category
    const productsInCategory = await productModel.find({ category_id: categoryId });

    // Extract product IDs
    const productIdsInCategory = productsInCategory.map(product => product._id);

    // Step 2: Fetch Deals for Products
    const dealsForProducts = await dealService.getDealsForProducts(productIdsInCategory);

    // Step 3: Combine Deals and Products
    const productsWithDeals = productsInCategory.map(product => {
      const productDeals = dealsForProducts.filter(deal => deal.product_id.equals(product._id));
      return {
        ...product.toObject(),
        deals: productDeals
      };
    });

    return productsWithDeals;
  } catch (error) {
    throw error;
  }
};

module.exports = action;