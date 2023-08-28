const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const boatService = require("../services/boat");
const bookingService = require("../services/booking");
const boatModel = require("../models/boat");
const bookingModel = require("../models/booking");
// const userDetailModel = require("../models/userDetail");

const action = {};
 
action.addboat = async (data) => {
  logger.info("Adding new Boat", data);
  try {
    const boatData = await boatService.addBoat(data);
    return defaultFunction.success({
      response: boatData,
      message: "Boat added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding boat", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding boat" });
  }
};

action.updateBoat = async (data) => {
  logger.info("updating new Boat", data);
  try {
    let query = {
      _id: data._id
    }
    const boatData = await boatService.updateBoat(query, data);
    return defaultFunction.success({
      response: null,
      message: "Boat updated successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating boat", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating boat" });
  }
};

action.getBoatDetail = async (query) => {
  try {
    if (!query || !query.boatId) {
      throw "boatId can not be null";
    }
    let userQuery = {
      _id: query.boatId
    };
    const boatDetail = await boatService.getBoatDetail(userQuery);
    return defaultFunction.success({
      response: boatDetail,
      message: boatDetail ? "Boat detail fetched successfully" : "Boat Detail not found",
    });
  } catch (error) {
    logger.error("Failed getLocations", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.getBoatDetails = async (query) => {
  try {

    let queryData={
      status:1,
    }
    
    if (!query || !query.boatId) {
      throw "boatType can not be null";
    }
    
    let searchQuery = [];
    if (query && query.boatId) {
      searchQuery.push(
        {
          _id: query.boatId,
        }
      )
    }

    if (searchQuery && searchQuery.length > 0) {
      queryData["$or"] = searchQuery
    }

    console.log("queryData", queryData);

    const boatDetail = await boatService.listBoat(queryData);
    
    return defaultFunction.success({
      response: boatDetail,
      message: "Boat details fetched successfully",
      total: boatDetail.length
    });

  } catch (error) {
    logger.error("Failed getting boat details.", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listBoatByType = async (query) => {
  try {

    let queryData={
      status:1,
    }

    
    if (!query || !query.boatType) {
      throw "boatType can not be null";
    }
    
    let searchQuery = [];
    if (query && query.boatType) {
      searchQuery.push(
        {
          boatType: query.boatType,
        }
      )
    }

    if (searchQuery && searchQuery.length > 0) {
      queryData["$or"] = searchQuery
    }

    console.log("queryData", queryData);

    const boatDetail = await boatService.listBoat(queryData);
    
    return defaultFunction.success({
      response: boatDetail,
      message: "Boat list by type successfully",
      total: boatDetail.length
    });

  } catch (error) {
    logger.error("Failed while listing boat by boat type.", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};


action.listBoat = async (query) => {
  try {
    let queryData={
      status:1,
    }

    const boatDetail = await boatService.listBoat(queryData);
    
    return defaultFunction.success({
      response: boatDetail,
      message: "Boat listed successfully",
      total: boatDetail.length
    });

  } catch (error) {
    logger.error("Failed while listing boat", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

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

action.searchBoat = async (query) => {
  try {
    const queryData = {
      status: 1,
    };

    if(query?.fromDate && query?.toDate){
      const fromDate = new Date(query.fromDate);
      const toDate = new Date(query.toDate);

      // Get a list of booked boat IDs within the given date range
      const bookedBoats = await bookingModel.distinct("boat", {
        $and: [
          { from: { $lte: toDate } },
          { to: { $gte: fromDate } },
        ],
      });

      // Exclude booked boats from the query results
      queryData["_id"] = { $nin: bookedBoats };
    }

    for (const paramName in query) {
      if (paramName !== "status") {
        if (paramName === "pricePerDay") {
          const [minPrice, maxPrice] = query[paramName].split("-").map(Number);
          queryData[paramName] = { $gte: minPrice, $lte: maxPrice };
        } else if (paramName === "shower" || paramName === "hasCaptain" || paramName === "superOwner") {
          if (query[paramName] === "true" || query[paramName] === "false") {
            queryData[paramName] = query[paramName] === "true";
          }
        } else if (paramName === "boatType") {
          queryData[paramName] =  query.boatType;
        } else if (paramName === "length" || paramName === "motorPower") {
          const maxRange = +query[paramName];
          queryData[paramName] = { $gte: 0, $lte: maxRange };
        } else {
          queryData[paramName] = +query[paramName];
        }
      }
    }

    const boatDetail = await boatService.listBoat(queryData);

    const boatsWithRatingsAndBookings = await Promise.all(boatDetail.map(async boat => {
      const boatId = boat._id;

      const ratings = await bookingModel.find({ boat: boatId, rating: { $exists: true } });
      const totalRatings = ratings.reduce((sum, booking) => sum + booking.rating, 0);
      const averageRating = ratings.length > 0 ? totalRatings / ratings.length : 0;

      const bookingCount = await bookingModel.countDocuments({ boat: boatId });

      const personsRatedCount = ratings.length;

      return {
        ...boat.toObject(),
        averageRating,
        bookingCount,
        personsRatedCount
      };
    }));

    return defaultFunction.success({
      response: boatsWithRatingsAndBookings,
      message: "Boat listed successfully",
      total: boatsWithRatingsAndBookings.length,
    });
  } catch (error) {
    logger.error("Failed while listing boat", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.updateBoatStatus = async (query) => {
  try {
    if (!query || !query.boatId) {
      throw "Location id can not be null";
    }
    let userQuery = {
      _id: query.boatId
    };
    let data={
      status:0
    }
    const boatDetail = await boatService.updateBoatStatus(userQuery,data);
    if(boatDetail){
      return defaultFunction.success({
        flag: true,
        message: "Boat detail deleted successfully",
      });
    }
    else{
      return defaultFunction.success({
        flag: false,
        message: "Boat details not found or already deleted",
      });
    }
   
  } catch (error) {
    logger.error("Failed getLocations", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

//Booking contoller
action.bookBoat = async (data) => {
  logger.info("Adding new booking", data);
  try {
    const boatData = await bookingService.addBooking(data);
    return defaultFunction.success({
      response: boatData,
      message: "booking added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding booking", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding booking" });
  }
};

action.updateBoatBooking = async (data) => {
  logger.info("Updating boat booking", data);
  try {
    let query = {
      _id: data._id
    };
    const dealData = await bookingService.updateBoatBooking(query, data);
    return defaultFunction.success({
      response: null,
      message: "Boat booking updated successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating boat booking", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating boat booking" });
  }
};

action.listMyBooking = async (query) => {
  if (!query || !query.user) {
    throw "Invalid URL, provide user id";
  }
  try {
    let queryData={
      status:1,
      user: query.user
    }

    const myBooking = await bookingService.getBookings(queryData);
    
    // Add average rating, rating count, and booking count to each booking
    const bookingsWithBoatInfo = await Promise.all(myBooking.map(async booking => {
      const boatId = booking.boat;

      // Calculate average rating for the boat (from the booking table)
      const ratings = await bookingModel.find({ boat: boatId, rating: { $exists: true } });
      const totalRatings = ratings.reduce((sum, booking) => sum + booking.rating, 0);
      const averageRating = ratings.length > 0 ? totalRatings / ratings.length : 0;

      // Count the number of bookings for the boat
      const bookingCount = await bookingModel.countDocuments({ boat: boatId });

      // Count the number of persons who have rated the boat
      const personsRatedCount = ratings.length;

      // Add average rating, booking count, and persons rated count to the booking object
      return {
        ...booking.toObject(),
        averageRating,
        bookingCount,
        personsRatedCount,
      };
    }));

    return defaultFunction.success({
      response: bookingsWithBoatInfo,
      message: "Boat listed successfully",
      total: bookingsWithBoatInfo.length,
    });

  } catch (error) {
    logger.error("Failed while listing my booking", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

module.exports = action;