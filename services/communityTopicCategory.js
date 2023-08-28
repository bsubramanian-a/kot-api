const logger = require("../core/logger");
const communityTopicCategoryModel = require("../models/communityTopicCategory");
const communityTopicModel = require("../models/communityTopic");

const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addCommunityTopicCategory = async data => {
  try {
    const communityTopicCategory = new communityTopicCategoryModel(data);
    return await communityTopicCategory.save();
  } catch (error) {
    logger.error('Error while adding community topic category', error);
    throw error
  }
}


/**
 * 
 * @param {*} data 
 * @returns 
 */
action.updateCommunityTopicCategory = async(query, updateData)=> {
  try {
    return await communityTopicCategoryModel.findOneAndUpdate(query, updateData)
  } catch (error) {
    logger.error('Error while updating community topic category', error);
    throw error
  }
}


/**
 * Get boat  detail
 * @param {*} data
 * @returns
 */
action.getAllCommunityTopicCategoriesAndItsTopics = async (query) => {
  try {

    const communityTopicCategories = await communityTopicCategoryModel.find(query);

    const communityTopics = [];

    for (const communityTopicCategory of communityTopicCategories) {
    const communityTopicsForCategory = await communityTopicModel.find({
        category: communityTopicCategory._id
    });
    communityTopics.push({
        ...communityTopicCategory,
        communityTopics: communityTopicsForCategory
    });
    }

    return communityTopics;
    
   } catch (error) {
     logger.error('Error while fetching community topic category', error);
     throw error
   }
}

module.exports = action;