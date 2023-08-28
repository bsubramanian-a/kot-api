const logger = require("../core/logger");
const productCategoryModel = require("../models/productCategory");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addCategory = async data => {
  try {
    const category = new productCategoryModel(data);
    return await category.save();
  } catch (error) {
    logger.error('Error while adding category', error);
    throw error
  }
}


/**
 * 
 * @param {*} data 
 * @returns 
 */
action.updateCategory = async(query, updateData)=> {
  try {
    return await productCategoryModel.findOneAndUpdate(query, updateData)
  } catch (error) {
    logger.error('Error while updating category', error);
    throw error
  }
}



/**
 * Get category id wise detail
 * @param {*} data
 * @returns
 */
action.getCategoryDetail = async (query) => {
  try {
    return await productCategoryModel.findOne(query).populate("name");
  } catch (error) {
    logger.error('Error while fetching category detail', error);
    throw error
  }
}

/**
 * Get category  detail
 * @param {*} data
 * @returns
 */
action.listCategory = async (query) => {
  try {
    return await productCategoryModel.find(query);
  } catch (error) {
    logger.error('Error while fetching category list', error);
    throw error
  }
}


module.exports = action;