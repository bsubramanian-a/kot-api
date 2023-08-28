
const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const boatTypeService = require("../services/boatType");

const action = {};
 
action.addBoatType = async (data) => {
  logger.info("Adding new Boat type", data);
  try {
    const boatData = await boatTypeService.addBoatType(data);
    return defaultFunction.success({
      response: boatData,
      message: "Boat type added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding boat", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding boat type" });
  }
};

action.listBoatType = async (query) => {
  try {
    let queryBoatType={
      status:1,
    }

    const boatTypes = await boatTypeService.listBoatType(queryBoatType);
    
    return defaultFunction.success({
      response: boatTypes,
      message: "Boat type listed successfully",
    });

  } catch (error) {
    logger.error("Failed listBoatType", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

// action.updateBoat = async (data) => {
//   logger.info("Adding new Boat",data);
//   try {
//     let query = {
//       _id:data.boatId
//     }
//     const boatData = await boatService.updateBoat(query,data);
//     return defaultFunction.success({
//       response: boatData,
//       message: "Boat updated successfully!",
//       total: 1
//     });
//   } catch (error) {
//     logger.error("Failed while updating boat", error);
//     return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating boat" });
//   }
// };

// action.getBoatDetail = async (query) => {
//   try {
//     if (!query || !query.boatId) {
//       throw "Location id can not be null";
//     }
//     let userQuery = {
//       _id: query.boatId
//     };
//     const boatDetail = await boatService.getBoatDetail(userQuery);
//     return defaultFunction.success({
//       response: boatDetail,
//       message: "Boat detail fetched successfully",
//     });
//   } catch (error) {
//     logger.error("Failed getLocations", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };

// action.getAllBoats = async (query) => {
//   try {

//     let queryData={
//       status:1,
//     }

//     if (query?.searchText) {
//       const searchText = query.searchText;
//       queryData["$or"] = [
//         {
//           boatType: new RegExp(searchText,"i"),
//         },
//       ];
//     }

//     const boatDetail = await boatService.getAllBoats(queryData);
    
//     return defaultFunction.success({
//       response: boatDetail,
//       message: "Boat detail fetched successfully",
//     });

//   } catch (error) {
//     logger.error("Failed getLocations", error);
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

module.exports = action;