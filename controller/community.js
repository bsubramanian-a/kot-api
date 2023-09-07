const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
// const boatService = require("../services/boat");
const communityService = require("../services/community");
// const boatModel = require("../models/boat");
// const userDetailModel = require("../models/userDetail");

const action = {};



action.getCommunityFeed = async (query) => {
  try {
    if (!query || !query.community) {
      throw "Invalid URL, provide user id";
    }
    let queryData={
      community: query.community
    }

    const communityFeed = await communityService.getCommunityFeed(queryData);
    
    return defaultFunction.success({
      response: communityFeed,
      message: "Community Feed listed successfully",
      total: communityFeed.length
    });

  } catch (error) {
    logger.error("Failed while listing community feed", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.addCommunityPost = async (data) => {
  logger.info("Adding new Community Post", data);
  try {
    const communityPostData = await communityService.addCommunityPost(data);
    return defaultFunction.success({
      response: communityPostData,
      message: "Community Post added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding community post", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding community post" });
  }
};

action.followOrUnfollowCommunity = async (data) => {
  logger.data("Follow or unfollow community", data);
  try {
    let query = {
      _id: data._id
    }
    const postData = await communityService.followOrUnfollowCommunity(query, data);
    return defaultFunction.success({
      response: postData,
      message: "Community followed/unfollowed successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while following/unfollowing community", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while following/unfollowing community" });
  }
};
 
action.addCommunity = async (data) => {
  logger.info("Adding new Community", data);
  try {
    const communityData = await communityService.addCommunity(data);
    return defaultFunction.success({
      response: communityData,
      message: "Community added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding community", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding community" });
  }
};

action.updateCommunity = async (data) => {
  logger.info("updating new Community", data);
  try {
    let query = {
      _id: data._id
    }
    const communityData = await communityService.updateCommunity(query, data);
    return defaultFunction.success({
      response: null,
      message: "Community updated successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating community", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating community" });
  }
};

action.getAllRecommendedCommunities = async (query) => {
  try {
    let queryData={_id: query.user}

    const communityDetail = await communityService.getAllRecommendedCommunities(queryData);
    
    return defaultFunction.success({
      response: communityDetail,
      message: "Recommended Communities listed successfully",
      total: communityDetail.length
    });

  } catch (error) {
    logger.error("Failed while listing Recommended Communities", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.getAllCommunities = async (query) => {
  try {
    let queryData={}

    const communityDetail = await communityService.getAllCommunities(queryData);
    
    return defaultFunction.success({
      response: communityDetail,
      message: "Community listed successfully",
      total: communityDetail.length
    });

  } catch (error) {
    logger.error("Failed while listing community", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.getNearByCommunities = async (query) => {
  try {
    let queryData={_id: query.user}

    const nearbyCommunities = await communityService.getNearByCommunities(queryData);
    
    return defaultFunction.success({
      response: nearbyCommunities,
      message: "Nearby Communities listed successfully",
    });

  } catch (error) {
    logger.error("Failed while listing Recommended Communities", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

// action.getBoatDetail = async (query) => {
//   try {
//     if (!query || !query.boatId) {
//       throw "boatId can not be null";
//     }
//     let userQuery = {
//       _id: query.boatId
//     };
//     const boatDetail = await boatService.getBoatDetail(userQuery);
//     return defaultFunction.success({
//       response: boatDetail,
//       message: boatDetail ? "Boat detail fetched successfully" : "Boat Detail not found",
//     });
//   } catch (error) {
//     logger.error("Failed getLocations", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };

// action.getBoatDetails = async (query) => {
//   try {

//     let queryData={
//       status:1,
//     }
    
//     if (!query || !query.boatId) {
//       throw "boatType can not be null";
//     }
    
//     let searchQuery = [];
//     if (query && query.boatId) {
//       searchQuery.push(
//         {
//           _id: query.boatId,
//         }
//       )
//     }

//     if (searchQuery && searchQuery.length > 0) {
//       queryData["$or"] = searchQuery
//     }

//     console.log("queryData", queryData);

//     const boatDetail = await boatService.listBoat(queryData);
    
//     return defaultFunction.success({
//       response: boatDetail,
//       message: "Boat details fetched successfully",
//       total: boatDetail.length
//     });

//   } catch (error) {
//     logger.error("Failed getting boat details.", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };

// action.listBoatByType = async (query) => {
//   try {

//     let queryData={
//       status:1,
//     }

    
//     if (!query || !query.boatType) {
//       throw "boatType can not be null";
//     }
    
//     let searchQuery = [];
//     if (query && query.boatType) {
//       searchQuery.push(
//         {
//           boatType: query.boatType,
//         }
//       )
//     }

//     if (searchQuery && searchQuery.length > 0) {
//       queryData["$or"] = searchQuery
//     }

//     console.log("queryData", queryData);

//     const boatDetail = await boatService.listBoat(queryData);
    
//     return defaultFunction.success({
//       response: boatDetail,
//       message: "Boat list by type successfully",
//       total: boatDetail.length
//     });

//   } catch (error) {
//     logger.error("Failed while listing boat by boat type.", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };




// action.searchBoat = async (query) => {
//   console.log(query);
//   try {
//     let queryData={
//       "status":1
//     }
    
//     let searchQuery = [];
//     if (query && query.boatType) {
//       searchQuery.push(
//         {
//           boatType: query.boatType,
//         }
//       )
//     }
//     if (query && query.pricePerDay) {
//       let ppd = query.pricePerDay;
//       let minPrice = query.pricePerDay.split("-")[0];
//       let maxPrice = query.pricePerDay.split("-")[1];
//       let pricePerDay = { $gte: +minPrice, $lte: +maxPrice }
//       console.log("pricePerDay", pricePerDay);
//       searchQuery.push({
//         pricePerDay
//       });
//     }
//     if (searchQuery && searchQuery.length > 0) {
//       queryData["$or"] = searchQuery
//     }
      
//     console.log("queryData", queryData);

//     const boatDetail = await boatService.listBoat(queryData);
    
//     return defaultFunction.success({
//       response: boatDetail,
//       message: "Boat listed successfully",
//       total: boatDetail.length
//     });

//   } catch (error) {
//     logger.error("Failed while listing boat", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };

// action.updateBoatStatus = async (query) => {
//   try {
//     if (!query || !query.boatId) {
//       throw "Location id can not be null";
//     }
//     let userQuery = {
//       _id: query.boatId
//     };
//     let data={
//       status:0
//     }
//     const boatDetail = await boatService.updateBoatStatus(userQuery,data);
//     if(boatDetail){
//       return defaultFunction.success({
//         flag: true,
//         message: "Boat detail deleted successfully",
//       });
//     }
//     else{
//       return defaultFunction.success({
//         flag: false,
//         message: "Boat details not found or already deleted",
//       });
//     }
   
//   } catch (error) {
//     logger.error("Failed getLocations", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };

// //Booking contoller
// action.bookBoat = async (data) => {
//   logger.info("Adding new booking", data);
//   try {
//     const boatData = await bookingService.addBooking(data);
//     return defaultFunction.success({
//       response: boatData,
//       message: "booking added successfully!",
//       total: 1
//     });
//   } catch (error) {
//     logger.error("Failed while adding booking", error);
//     return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding booking" });
//   }
// };

// action.listMyBooking = async (query) => {
//   if (!query || !query.user) {
//     throw "Invalid URL, provide user id";
//   }
//   try {
//     let queryData={
//       status:1,
//       user: query.user
//     }

//     const myBooking = await bookingService.getBookings(queryData);
    
//     return defaultFunction.success({
//       response: myBooking,
//       message: "Boat listed successfully",
//       total: myBooking.length
//     });

//   } catch (error) {
//     logger.error("Failed while listing my booking", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };

module.exports = action;