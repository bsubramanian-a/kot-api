const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const communityTopicCategoryService = require("../services/communityTopicCategory");

const action = {};
 
action.addCommunityTopicCategory = async (data) => {
  logger.info("Adding new Community Topic Category", data);
  try {
    const communityTopicCategoryData = await communityTopicCategoryService.addCommunityTopicCategory(data);
    return defaultFunction.success({
      response: communityTopicCategoryData,
      message: "Community Topic added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding community topic", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding community topic" });
  }
};

action.updateCommunityTopicCategory = async (data) => {
  logger.info("updating new Community Topic Category", data);
  try {
    let query = {
      _id: data._id
    }
    const communityTopicData = await communityTopicCategoryService.updateCommunityTopicCategory(query, data);
    return defaultFunction.success({
      response: null,
      message: "Community Topic Category updated successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating community topic category", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating community topic category" });
  }
};



action.getAllCommunityTopicCategoriesAndItsTopics = async (query) => {
    try {
      let queryData={}
  
      const communityTopicsDetail = await communityTopicCategoryService.getAllCommunityTopicCategoriesAndItsTopics(queryData);
      
      return defaultFunction.success({
        response: communityTopicsDetail,
        message: "Community Topics listed successfully",
        total: communityTopicsDetail.length
      });
  
    } catch (error) {
      logger.error("Failed while listing community topics", error);
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