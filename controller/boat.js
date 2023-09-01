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

const checkSlotAvailability = async (boat, fromDate, toDate, howLonginWater) => {
  // console.log("checkSlotAvailability", boat);
  // console.log("fromDate", fromDate);
  // console.log("toDate", toDate);
  // console.log("howLonginWater", howLonginWater);

  const existingBookings = await bookingService.getExistingBookingsForBoat(boat, fromDate, toDate);

  // console.log("existingBookings", existingBookings);

  const availableTimeSlots = calculateAvailableTimeSlots(existingBookings, howLonginWater, fromDate, toDate);

  // console.log("availableTimeSlots", availableTimeSlots);

  const bookingDurationMs = calculateBookingDurationMilliseconds(howLonginWater);
  const suitableTimeSlot = findSuitableTimeSlot(availableTimeSlots, bookingDurationMs);

  if (suitableTimeSlot) {
    const bookingEndTime = new Date(suitableTimeSlot);
    bookingEndTime.setMilliseconds(bookingEndTime.getMilliseconds() + bookingDurationMs);

    const lastAvailableTimeSlot = availableTimeSlots[availableTimeSlots.length - 1];

    if (bookingEndTime <= lastAvailableTimeSlot) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

action.searchBoat = async (query) => {
  try {
    let queryData = {
      status: 1,
    };

    // console.log("queryData before", queryData);

    if(query?.fromDate && query?.toDate){
      const fromDate = new Date(query.fromDate);
      const toDate = new Date(query.toDate);

      // Step 1: Get all bookingList within the given from, to
      const bookingsWithinDateRange = await bookingModel.find({
        from: { $lte: toDate },
        to: { $gte: fromDate },
      });

      // console.log(":bookingsWithinDateRange", bookingsWithinDateRange);

      const boatIdsWithinDateRange = new Set();

      // Iterate through the bookingsWithinDateRange and add unique boat IDs to the Set
      for (const booking of bookingsWithinDateRange) {
        boatIdsWithinDateRange.add(booking.boat.toString()); // Convert ObjectId to string
      }
      
      // Convert the Set back to an array if needed
      const uniqueBoatIdsWithinDateRange = [...boatIdsWithinDateRange];

      // console.log("uniqueBoatIdsWithinDateRange", uniqueBoatIdsWithinDateRange);

      // Step 2: Get list of boats that don't satisfy howLonginWater slot
      const boatsWithShortSlots = uniqueBoatIdsWithinDateRange
        .filter((boatId) => {
          return checkSlotAvailability(boatId, fromDate, toDate, query.howLonginWater);
        });

      console.log("boatsWithShortSlots", boatsWithShortSlots);

      // // Step 3: Get the boatIds of boats with short slots
      // const boatIdsWithShortSlots = [...new Set(boatsWithShortSlots)];

      // Step 4: Find boats that meet the specified filters and don't have short slots
      queryData = {
        status: 1,
        _id: { $nin: boatsWithShortSlots },
      };

      // // Get a list of booked boat IDs within the given date range
      // const bookedBoats = await bookingModel.distinct("boat", {
      //   $and: [
      //     { from: { $lte: toDate } },
      //     { to: { $gte: fromDate } },
      //   ],
      // });

      // // Exclude booked boats from the query results
      // queryData["_id"] = { $nin: bookedBoats };
    }

    // console.log("queryData after", queryData);

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

    // console.log("query luxury", query.isLuxury, query.isLuxury === "true");

    const boatDetail = await boatService.listBoat(queryData);

    const boatsWithRatingsAndBookings = await Promise.all(boatDetail.map(async boat => {
      const boatId = boat._id;

      const ratings = await bookingModel.find({ boat: boatId, rating: { $exists: true } });
      const totalRatings = ratings.reduce((sum, booking) => sum + booking.rating, 0);
      const averageRating = ratings.length > 0 ? totalRatings / ratings.length : 0;

      const bookingCount = await bookingModel.countDocuments({ boat: boatId });

      const personsRatedCount = ratings.length;

      if(query.isLuxury == "true"){
        if(boat.pricePerDay >= 1000){
          return {
            ...boat.toObject(),
            averageRating,
            bookingCount,
            personsRatedCount
          };
        }
      }else{
        if(boat.pricePerDay < 1000){
          return {
            ...boat.toObject(),
            averageRating,
            bookingCount,
            personsRatedCount
          };
        }
      }
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

// action.updateBoatBooking = async (data) => {
//   logger.info("Updating boat booking", data);
//   try {
//     let query = {
//       _id: data._id
//     };
//     const dealData = await bookingService.updateBoatBooking(query, data);
//     return defaultFunction.success({
//       response: null,
//       message: "Boat booking updated successfully!",
//       total: 1
//     });
//   } catch (error) {
//     logger.error("Failed while updating boat booking", error);
//     return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating boat booking" });
//   }
// };

// Function to calculate booking duration in milliseconds
function calculateBookingDurationMilliseconds(bookingDuration) {
  if (!isNaN(bookingDuration) && typeof bookingDuration === 'number') {
    // Handle "multi_day" as a special case where the user specifies the number of days
    // For example, if the user enters 2, the duration will be 2 days (48 hours)
    return 24 * bookingDuration * 60 * 60 * 1000;
  } else {
    // Handle other booking durations as before
    const durationMap = {
      "1 - 2 Hours": 2 * 60 * 60 * 1000,
      "2 - 4 Hours": 4 * 60 * 60 * 1000,
      "4 - 8 Hours": 8 * 60 * 60 * 1000,
      "8 - 12 Hours": 12 * 60 * 60 * 1000,
    };
    return durationMap[bookingDuration] || 0;
  }
}

// Function to generate time slots between 'from' and 'to' dates
function generateTimeSlots(from, to, intervalInMinutes) {
  const timeSlots = [];
  const currentTime = new Date(from);
  currentTime.setUTCHours(9, 0, 0, 0);
  const toTime = new Date(to);
  toTime.setUTCHours(18, 0, 0, 0);

  // console.log("currentTime", currentTime);
  // console.log("to", toTime);
  // console.log("currentTime < to", currentTime < toTime);

  while (currentTime <= toTime) {
    // console.log("inside while");
    timeSlots.push(new Date(currentTime));
    currentTime.setMinutes(currentTime.getMinutes() + intervalInMinutes);
  }
  return timeSlots;
}

function isOverlap(slot1, slot2, bookingDurationMs) {
  // console.log("isOverlap.........");
  // console.log("slot1.........", slot1);
  // console.log("slot2.........", slot2);
  // console.log("bookingDurationMs.........", bookingDurationMs);
  
  // Convert the date-time strings to Date objects
  const slot1Start = new Date(slot1);
  const slot1End = new Date(slot1Start);
  slot1End.setMilliseconds(slot1End.getMilliseconds() + bookingDurationMs);

  // console.log("slot1Start", slot1Start);
  // console.log("slot1End", slot1End);

  // Convert slot2's bookingTime and bookingEndTime to Date objects
  const slot2Start = new Date(slot2.bookingTime);
  const slot2End = new Date(slot2.bookingEndTime);

  // console.log("slot2Start", slot2Start);
  // console.log("slot2End", slot2End);

  // Check if the end of slot1 is after the start of slot2, and the start of slot1 is before the end of slot2
  const overlapCondition1 = slot1Start < slot2Start && slot1End > slot2Start;
  
  // Check if the end of slot2 is after the start of slot1, and the start of slot2 is before the end of slot1
  const overlapCondition2 = slot2Start <= slot1Start && slot2End > slot1Start;

  // console.log("isOverlap+++++++++++++++++++++", overlapCondition1 || overlapCondition2);

  // Check if the overlap conditions are met
  return overlapCondition1 || overlapCondition2;
  // return (overlapCondition1 || overlapCondition2) && (bookingDurationMs <= (slot1End - slot1Start));
}

// Function to find a suitable time slot for booking
function findSuitableTimeSlot(availableTimeSlots, bookingDuration) {
  // console.log("findSuitableTimeSlot+++++++");
  // console.log("bookingDuration", bookingDuration);

  for (const slot of availableTimeSlots) {
    const dateTime = new Date(slot);
    const dateTimeInMilliSeconds = dateTime.getTime();

    // console.log("slot.duration", dateTimeInMilliSeconds);
    // console.log("bookingDuration", bookingDuration);

    if (dateTimeInMilliSeconds >= bookingDuration) {
      return slot;
    }
  }
  return null; // No suitable slot found
}

// Function to calculate available time slots
function calculateAvailableTimeSlots(existingBookings, bookingDuration, from, to) {
  // console.log("existingBookings", existingBookings, bookingDuration, from, to);
  const bookingDurationMs = calculateBookingDurationMilliseconds(bookingDuration);
  // console.log("bookingDurationMs", bookingDurationMs);
  const timeSlots = generateTimeSlots(from, to, 30);
  console.log("timeSlots", timeSlots);

  const availableTimeSlots = timeSlots.filter((slot) =>
    !existingBookings.some((booking) => isOverlap(slot, booking, bookingDurationMs))
  );

  return availableTimeSlots;
}

action.updateBoatBooking = async (data) => {
  logger.info("Updating boat booking", data);
  try {
    let query = {
      _id: data._id
    };

    const booking = await bookingModel.findOne(query);

    console.log("data._id", data._id);

    const existingBookings = await bookingService.getExistingBookings(booking.boat, data.from, data.to, data._id);

    console.log("existingBookings", existingBookings);

    const availableTimeSlots = calculateAvailableTimeSlots(existingBookings, data.howLongOnWater, data.from, data.to);

    console.log("availableTimeSlots", availableTimeSlots);

    const bookingDurationMs = calculateBookingDurationMilliseconds(data.howLongOnWater);
    const suitableTimeSlot = findSuitableTimeSlot(availableTimeSlots, bookingDurationMs);

    console.log("suitableTimeSlot", suitableTimeSlot);

    if (suitableTimeSlot) {
      const bookingEndTime = new Date(suitableTimeSlot);
      bookingEndTime.setMilliseconds(bookingEndTime.getMilliseconds() + bookingDurationMs);

      const lastAvailableTimeSlot = availableTimeSlots[availableTimeSlots.length - 1];

      if (bookingEndTime <= lastAvailableTimeSlot) {
        data.bookingTime = suitableTimeSlot;
        data.bookingEndTime = bookingEndTime;

        const dealData = await bookingService.updateBoatBooking(query, data);
        return defaultFunction.success({
          response: null,
          message: "Boat booking updated successfully!",
          total: 1
        });
      } else {
        return defaultFunction.somethingWentWrong({ message: "No available time slots for booking" });
      }
    } else {
      return defaultFunction.somethingWentWrong({ message: "No available time slots for booking" });
    }
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