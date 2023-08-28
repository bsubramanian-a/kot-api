const logger = require("../core/logger");
const communityModel = require("../models/community");
const communityFeedModel = require("../models/communityFeed");
const postSchema = require("../models/post");
const fishCatchModel = require("../models/fishCatch");
const userModel = require("../models/user");
const communityTopic = require("../models/communityTopic")
const interest = require("../models/interest")
const action = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
action.addCommunityPost = async data => {
  try {
    const communityPost = new communityFeedModel(data);
    if(data?.isPost){
      const updateData = {
        _id: data?.post,
      };

      await postSchema.findOneAndUpdate(updateData, { isCommunityPost: true });
    }else{
      const updateData = {
        _id: data?.fishCatch,
      };

      await fishCatchModel.findOneAndUpdate(updateData, { isCommunityFishCatch: true });
    }
    return await communityPost.save();
  } catch (error) {
    logger.error('Error while adding community post', error);
    throw error
  }
}

/**
 * 
 * @param {*} data  
 * @returns 
 */
action.addCommunity = async data => {
  try {
    const community = new communityModel(data);
    return await community.save();
  } catch (error) {
    logger.error('Error while adding community', error);
    throw error
  }
}


/**
 * 
 * @param {*} data 
 * @returns 
 */
action.updateCommunity = async(query, updateData)=> {
  try {
    return await communityModel.findOneAndUpdate(query, updateData)
  } catch (error) {
    logger.error('Error while updating community', error);
    throw error
  }
}



/**
 * Get boat  detail
 * @param {*} data
 * @returns
 */
action.getAllCommunities = async (query) => {
  try {
      const communities = await communityModel.find();
      // Populate the "people" field for each community
      const populatedCommunities = await Promise.all(communities.map(async community => {
        const populatedCommunity = await community.populate("people");
        const populateTopicCommunity = await populatedCommunity.populate('topic');
        return populateTopicCommunity;
      }));

      return populatedCommunities;
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
action.getAllRecommendedCommunities = async (query) => {
  try {
    const user = await userModel.findOne(query).populate("interests");

    const interests = user.interests.map(interest => interest.name);



    console.log("interests",interests);

    //Find all communities that are related to the user's interests.
    const communities = await communityModel.find({
      $or: [
        { "interests.name": { $in: interests } },
        { "topic.name": { $in: interests } }
      ]
    });
    const populatedCommunities = await Promise.all(communities.map(async community => {
      const populatedCommunity = await community.populate("people");
      const populateTopicCommunity = await populatedCommunity.populate('topic');
      return populateTopicCommunity;
    }));

    // Return the user's interests and recommended communities.
    return {
      interests: interests,
      recommendedCommunities: populatedCommunities
    };
  } catch (error) {
    logger.error('Error while fetching recommended communities', error);
    throw error;
  }
};


action.followOrUnfollowCommunity = async(query, data)=> {
  // console.log(query, data);
  try {
    const community = await communityModel.find(query);

    if (data.doFollow) {
      if (!community[0].follow.includes(data.user)) {
        community[0].follow.push(data.user);
        community[0].save();
      }
    } else {
      const index = community[0].follow.indexOf(data.user);
      if (index > -1) {
        community[0].follow.splice(index, 1);
        community[0].save();
      }
    }
    
    return community;
  } catch (error) {
    logger.error('Error while updating post', error);
    throw error
  }
}

/**
 * Get boat  detail
 * @param {*} data
 * @returns
 */
action.getCommunityFeed = async (query) => {
  try {
     return await communityFeedModel.find(query).populate("post").populate("community").populate('fishCatch');
   } catch (error) {
     logger.error('Error while fetching community feed', error);
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