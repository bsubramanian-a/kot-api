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
    return await dealModel.findOne(query).populate("product_id");
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
    return await dealModel.find(query).populate("product_id");
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

// action.getDailyDealsProducts = async () => {
//   try {
//     const currentDate = new Date();

//     // Extract the date part from currentDate
//     const currentDateOnly = new Date(currentDate.toISOString().split('T')[0]);

//     const dailyDealsProducts = await dealModel.find({
//       startDate: { $lte: currentDateOnly }, // Start date is less than or equal to today
//       endDate: { $gte: currentDateOnly },   // End date is greater than or equal to today
//     }).populate("product_id");
//     return dailyDealsProducts;
//   } catch (error) {
//     throw error;
//   }
// };

action.getDailyDealsProducts = async () => {
  try {
    const currentDate = new Date();
    const currentDateOnly = new Date(currentDate.toISOString().split('T')[0]);

    const categoriesWithDeals = await dealModel.aggregate([
      {
        $match: {
          startDate: { $lte: currentDateOnly },
          endDate: { $gte: currentDateOnly }
        }
      },
      {
        $lookup: {
          from: "products", // Assuming the products collection name is "products"
          localField: "product_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: "$product"
      },
      {
        $group: {
          _id: "$product.category_id", // Group by category_id field
          count: { $sum: 1 }        // Count the number of deals per category
        }
      },
      {
        $lookup: {
          from: "productcategories", // Assuming the categories collection name is "productcategories"
          localField: "_id",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: "$category"
      },
      {
        $project: {
          id: "$category._id",
          categoryName: "$category.name",
          image: "$category.image",
          _id: 0
        }
      }
    ]);

    return categoriesWithDeals;
  } catch (error) {
    throw error;
  }
};

action.getBestDeals = async () => {
  try {
    const bestDeals = await dealModel.find({
      discountPercentage: { $gte: 60 }
    }).populate("product_id");
    return bestDeals;
  } catch (error) {
    throw error;
  }
};

action.searchDealProducts = async (searchString) => {
  // console.log("searchString...", searchString);
  try {
    const bestDeals = await dealModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: "$product"
      },
      {
        $match: {
          "product.name": { $regex: searchString, $options: "i" }
        }
      }
    ]);

    console.log("bestDeals", bestDeals);

    return bestDeals;
  } catch (error) {
    throw error;
  }
};


module.exports = action;
