const logger = require("../core/logger");
const dealModel = require("../models/deal"); // Import the Deal model

const action = {};

/**
 * Add a new deal
 * @param {*} data
 * @returns
 */
action.addDeal = async (data) => {
  try {
    const deal = new dealModel(data);
    return await deal.save();
  } catch (error) {
    logger.error('Error while adding deal', error);
    throw error;
  }
};

/**
 * Update a deal
 * @param {*} query
 * @param {*} updateData
 * @returns
 */
action.updateDeal = async (query, updateData) => {
  try {
    return await dealModel.findOneAndUpdate(query, updateData);
  } catch (error) {
    logger.error('Error while updating deal', error);
    throw error;
  }
};

/**
 * Get deal by ID
 * @param {*} query
 * @returns
 */
action.getDealDetail = async (query) => {
  try {
    return await dealModel.findOne(query);
  } catch (error) {
    logger.error('Error while fetching deal detail', error);
    throw error;
  }
};

/**
 * Get list of deals
 * @param {*} query
 * @returns
 */
action.listDeals = async (query) => {
  try {
    return await dealModel.find(query);
  } catch (error) {
    logger.error('Error while fetching deals list', error);
    throw error;
  }
};

action.getDealsForProducts = async (productIds) => {
  try {
    const dealsForProducts = await dealModel.find({ product_id: { $in: productIds } });
    return dealsForProducts;
  } catch (error) {
    throw error;
  }
};

action.getDailyDealsProducts = async () => {
  try {
    const currentDate = new Date();
    console.log("currentDate", currentDate);

    // Extract the date part from currentDate
    const currentDateOnly = new Date(currentDate.toISOString().split('T')[0]);

    const dailyDealsProducts = await dealModel.find({
      endDate: currentDateOnly,
    });
    return dailyDealsProducts;
  } catch (error) {
    throw error;
  }
};

module.exports = action;
