const logger = require("../core/logger");
const communityTopicModel = require("../models/communityTopic");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addCommunityTopic = async data => {
  try {
    const communityTopic = new communityTopicModel(data);
    return await communityTopic.save();
  } catch (error) {
    logger.error('Error while adding community topic', error);
    throw error
  }
}


/**
 * 
 * @param {*} data 
 * @returns 
 */
action.updateCommunityTopic = async(query, updateData)=> {
  try {
    return await communityTopicModel.findOneAndUpdate(query, updateData)
  } catch (error) {
    logger.error('Error while updating community topic', error);
    throw error
  }
}

/**
 * Get boat  detail
 * @param {*} data
 * @returns
 */
action.getAllCommunitiesTopics = async (query) => {
  try {
     return await communityTopicModel.find(query);
   } catch (error) {
     logger.error('Error while fetching community list', error);
     throw error
   }
}

/**
 * Get boat  detail
 * @param {*} data
 * @returns
 */
action.getAllCommunityTopicsByCategory = async (query) => {
    try {
       return await communityTopicModel.find(query);
     } catch (error) {
       logger.error('Error while fetching community list', error);
       throw error
     }
}
  

//   /**
//    * Get delete boat detail
//    * @param {*} data
//    * @returns
//    */
//   action.updateBoatStatus = async (query,updateStatus) => {
//     try {
//       return await boatModel.findOneAndUpdate(query,updateStatus);
//     } catch (error) {
//       logger.error('Error while deleting boat detail', error);
//       throw error
//     }
//   }



module.exports = action;