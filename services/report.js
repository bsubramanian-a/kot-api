const logger = require("../core/logger");
const reportModel = require("../models/report");

const action = {};

/**
 * @param {*} data 
 * @returns 
 */
action.addReport = async data => {
  try {
    const report = new reportModel(data);
    return await report.save();
  } catch (error) {
    logger.error('Error while adding report', error);
    throw error
  }
}

// /**
//  * List posts
//  * @param {*} data
//  * @returns
//  */
// action.listPost = async (query) => {
//   try {
//     return await reportModel.find(query).populate("user");
//   } catch (error) {
//     logger.error('Error while listing post', error);
//     throw error
//   }
// }

// /**
//  * 
//  * @param {*} data 
//  * @returns 
//  */
// action.updatePost = async(query, updateData)=> {
//   console.log(query, updateData);
//   try {
//     return await reportModel.findOneAndUpdate(query, updateData)
//   } catch (error) {
//     logger.error('Error while updating post', error);
//     throw error
//   }
// }

// action.updatePostById = async (postId, postToUpdate) => {
//   try {
//     return await reportModel.findByIdAndUpdate(postId, postToUpdate, {
//       new: true
//     });
//   } catch (error) {
//     logger.error('Error while updating post', error);
//     throw error
//   }
// }



// /**
//  * Get boat id wise detail
//  * @param {*} data
//  * @returns
//  */
// action.getBoatDetail = async (query) => {
//   try {
//     return await boatModel.findOne(query);
//   } catch (error) {
//     logger.error('Error while fetching boat detail', error);
//     throw error
//   }
// }

// /**
//  * Get boat  detail
//  * @param {*} data
//  * @returns
//  */
// action.getAllBoats = async (query) => {
//   try {
//     return await boatModel.find(query);
//   } catch (error) {
//     logger.error('Error while fetching boat detail', error);
//     throw error
//   }
// }



module.exports = action;