const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const boatService = require("../services/boat");
const bookingService = require("../services/booking");
const boatModel = require("../models/boat");
const bookingModel = require("../models/booking");
const moment = require('moment');
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

    // console.log("queryData", queryData);

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

    // console.log("queryData", queryData);

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
//   // console.log(query);
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
//       // console.log("pricePerDay", pricePerDay);
//       searchQuery.push({
//         pricePerDay
//       });
//     }
//     if (searchQuery && searchQuery.length > 0) {
//       queryData["$or"] = searchQuery
//     }
      
//     // console.log("queryData", queryData);

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

// const checkSlotAvailability = async (boat, fromDate, toDate, howLonginWater) => {
//   // // console.log("checkSlotAvailability", boat);
//   // // console.log("fromDate", fromDate);
//   // // console.log("toDate", toDate);
//   // // console.log("howLonginWater", howLonginWater);

//   const existingBookings = await bookingService.getExistingBookingsForBoat(boat, fromDate, toDate);

//   // // console.log("existingBookings", existingBookings);

//   const availableTimeSlots = calculateAvailableTimeSlots(existingBookings, howLonginWater, fromDate, toDate);

//   // // console.log("availableTimeSlots", availableTimeSlots);

//   const bookingDurationMs = calculateBookingDurationMilliseconds(howLonginWater);
//   const suitableTimeSlot = findSuitableTimeSlot(availableTimeSlots, bookingDurationMs);

//   if (suitableTimeSlot) {
//     const bookingEndTime = new Date(suitableTimeSlot);
//     bookingEndTime.setMilliseconds(bookingEndTime.getMilliseconds() + bookingDurationMs);

//     const lastAvailableTimeSlot = availableTimeSlots[availableTimeSlots.length - 1];

//     if (bookingEndTime <= lastAvailableTimeSlot) {
//       return false;
//     } else {
//       return true;
//     }
//   } else {
//     return true;
//   }
// }

// const checkSlotAvailability = (boat, fromDate, toDate, howLonginWater) => {
//   return new Promise(async (resolve, reject) => {
//     const existingBookings = await bookingService.getExistingBookingsForBoat(boat, fromDate, toDate);

//     // // console.log("existingBookings", existingBookings);

//     const howLonginWaterConverted = parseHowLongInWater(howLonginWater);

//     const availableTimeSlots = calculateAvailableTimeSlots(existingBookings, howLonginWaterConverted, fromDate, toDate);

//     // console.log("availableTimeSlots", availableTimeSlots);

//     const bookingDurationMs = calculateBookingDurationMilliseconds(howLonginWaterConverted);
//     const suitableTimeSlot = findSuitableTimeSlot(availableTimeSlots, bookingDurationMs);

//     // At the end, resolve or reject based on your conditions
//     if (suitableTimeSlot) {
//       const bookingEndTime = new Date(suitableTimeSlot);
//       bookingEndTime.setMilliseconds(bookingEndTime.getMilliseconds() + bookingDurationMs);

//       const lastAvailableTimeSlot = availableTimeSlots[availableTimeSlots.length - 1];

//       if (bookingEndTime <= lastAvailableTimeSlot) {
//         resolve(false);
//       } else {
//         resolve(true);
//       }
//     } else {
//       resolve(true);
//     }
//   });
// };

// Function to generate time slots between 9 AM and 6 PM
// function generateTimeSlots(fromDate, toDate, howLongInWater) {
//   console.log("generateTimeSlots.............");
//   console.log("fromDate", fromDate);
//   console.log("toDate", toDate);
//   console.log("howLongInWater", howLongInWater);
//   //console.log("coming inside generateTimeSlots");
//   const start = moment(fromDate).hour(9).minute(0).second(0);
//   const end = moment(toDate).hour(18).minute(0).second(0); // Assuming you want slots until 8 PM

//   const duration = moment.duration(howLongInWater, 'hours');
//   const slots = [];
//   //console.log("slots",slots);
//   while (start.isBefore(end)) {
//     //console.log("coming inside isBefore");
//     //console.log("start.clone()",start.clone());
//     slots.push(start.clone());
//     start.add(duration); // Move to the next slot (2 hours apart)
//     //console.log("start.add(duration)",start.add(duration));
//   }

//   return slots;
// }

function generateTimeSlots(fromDate, toDate, howLongInWater) {
  const startDay = moment(fromDate).startOf('day').hour(9);
  const endDay = moment(fromDate).startOf('day').hour(18);
  const slots = [];

  console.log("generate time slot============");
  console.log("toDate........", toDate);
  console.log("startDay.isSameOrBefore(toDate)???????????", startDay.isSameOrBefore(toDate, 'day'));

  while (startDay.isSameOrBefore(toDate, 'day')) {
    const slotStart = startDay.clone();
    const slotEnd = slotStart.clone().add(howLongInWater, 'hours');
    console.log("slotStart----------", slotStart);
    console.log("slotEnd----------", slotEnd);

    console.log("slotEnd.isAfter(endDay)//////////////", slotEnd.isAfter(endDay));

    if (slotEnd.isAfter(endDay)) {
      // If the slot extends beyond 6 PM, skip to the next day
      startDay.add(1, 'days').hour(9);
      endDay.add(1, 'days').hour(18);

      console.log("startDay.isSameOrBefore(toDate)??????????? inside", startDay.isSameOrBefore(toDate, 'day'));
    } else {
      slots.push(slotStart);
      startDay.add(howLongInWater, 'hours');
    }
  }

  return slots;
}

// function isBeforeOrSame(momentA, momentB) {
//   return momentA.isBefore(momentB) || momentA.isSame(momentB);
// }

// function isAfterOrSame(momentA, momentB) {
//   return momentA.isAfter(momentB) || momentA.isSame(momentB);
// }

action.searchBoat = async (query) => {
  try {
    let queryData = {
      status: 1,
    };

    // // console.log("queryData before", queryData);

    if(query?.fromDate && query?.toDate){
      const fromDate = new Date(query.fromDate);
      const toDate = new Date(query.toDate);
      const boatType = query.boatType;
      const howLonginWater = calculateBookingDurationHours(query.howLonginWater);
      console.log("howLonginWater", howLonginWater);
      const timeSlots = generateTimeSlots(fromDate, toDate, howLonginWater);

      // Step 1 : Find all boats for the boat type

      const boatList = await boatModel.find({
        boatType
      });

      // console.log("boatList", boatList);
      const boatIds = boatList.map(boat => boat.id);
      // console.log("=========");
      // console.log("boatIds", boatIds);

      // console.log("fromDate", fromDate);

      // Step 1: Get all bookingList within the given from, to
      const bookingsWithinDateRange = await bookingModel.find({
        from: { $lte: toDate }, // Convert moment object to Date
        to: { $gte: fromDate },   // Convert moment object to Date
        boat: { $in: boatIds },
        bookingTime: { $exists: true } // Only include bookings that have a bookingTime property
      });

      // console.log("=========");
      // console.log("bookingsWithinDateRange", bookingsWithinDateRange);

      console.log("timeSlots", timeSlots);

      const availableSlots = timeSlots.filter((slot, index) => {
        if(index < timeSlots?.length - 1){
          const slotStart = moment(slot); // Convert to Moment.js object
          const slotEnd = moment(timeSlots[index + 1]); // Convert to Moment.js object
          // console.log("slotStart++++++++++++++++", slotStart);
          // console.log("slotEnd++++++++++++++++", slotEnd);
        
          // Check if there is any booking that clashes with the slot
          const isOverlap = bookingsWithinDateRange.some((booking) => {
            const bookingStart = moment(booking.bookingTime);
            const bookingEnd = moment(booking.bookingEndTime);
            // console.log("bookingStart", bookingStart)
            // console.log("bookingEnd", bookingEnd)

            return (slotStart.isSameOrBefore(bookingStart) && slotEnd.isSameOrAfter(bookingStart)) || (bookingStart.isSameOrBefore(slotStart) && bookingEnd.isAfter(slotStart));
          });

          return !isOverlap;
        }

        return false;
      });

      console.log("availableSlots",availableSlots)

      // Assuming you have already calculated `nextAvailableSlot` as in your code
      if (availableSlots.length > 0) {
        const nextAvailableSlot = availableSlots[0];
        console.log('Next available slot:', nextAvailableSlot);

        // Check if 'from' is a valid moment object
        if (moment.isMoment(nextAvailableSlot)) {
          console.log('Formatted Next available slot:', nextAvailableSlot);

          // Find the available boats for this slot
          const boatsAvailableForSlot = boatList.filter((boat) => {
            // Check if there is any booking that clashes with the slot for this boat
            const isOverlap = bookingsWithinDateRange.some((booking) => {
              const bookingStart = moment(booking.bookingTime);
              const bookingEnd = moment(booking.bookingEndTime);

              // Check for overlap by comparing time ranges
              return (
                (nextAvailableSlot.isBefore(bookingEnd)) &&
                (nextAvailableSlot.isAfter(bookingStart) || nextAvailableSlot.isSame(bookingStart))
              );
            });

            return !isOverlap;
          });

          console.log("boatsAvailableForSlot+++++++", boatsAvailableForSlot);

          // Extract _id values using map
          const boatIds = boatsAvailableForSlot.map((boat) => boat._id);

          queryData["_id"] = { $in: boatIds };

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
              } else if (paramName === "capacity") {
                const minCapacity = +query[paramName];
                queryData[paramName] = { $gte: minCapacity };
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

          // if (boatsAvailableForSlot.length > 0) {
          //   console.log('Boats available for this slot:', boatsAvailableForSlot);
          // } else {
          //   console.log('No boats available for this slot.');
          // }
        } else {
          console.log('Invalid "from" property in nextAvailableSlot:', nextAvailableSlot.from);
        }
      } else {
        console.log('No available slots within the specified time range.');
        return defaultFunction.somethingWentWrong({ error: error, message: "No available slots within the specified time range." });
      }


      // console.log(":bookingsWithinDateRange", bookingsWithinDateRange);

      // const boatIdsWithinDateRange = new Set();

      // Iterate through the bookingsWithinDateRange and add unique boat IDs to the Set
      // for (const booking of bookingsWithinDateRange) {
      //   boatIdsWithinDateRange.add(booking.boat.toString()); // Convert ObjectId to string
      // }
      
      // Convert the Set back to an array if needed
      // const uniqueBoatIdsWithinDateRange = [...boatIdsWithinDateRange];

      // // console.log("uniqueBoatIdsWithinDateRange", uniqueBoatIdsWithinDateRange);

      // Step 2: Get list of boats that don't satisfy howLonginWater slot
      // const boatsWithShortSlots = await Promise.all(uniqueBoatIdsWithinDateRange
      //   .filter((boatId) => {
      //     return checkSlotAvailability(boatId, fromDate, toDate, query.howLonginWater);
      //   }));

      // console.log("boatsWithShortSlots", boatsWithShortSlots);

      // // Step 3: Get the boatIds of boats with short slots
      // const boatIdsWithShortSlots = [...new Set(boatsWithShortSlots)];

      // Step 4: Find boats that meet the specified filters and don't have short slots
      // queryData = {
      //   status: 1,
      //   _id: { $nin: boatsWithShortSlots },
      // };

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

    return defaultFunction.somethingWentWrong({ message: "Enter from and to dates to proceed" });

    // // console.log("queryData after", queryData);

    // for (const paramName in query) {
    //   if (paramName !== "status") {
    //     if (paramName === "pricePerDay") {
    //       const [minPrice, maxPrice] = query[paramName].split("-").map(Number);
    //       queryData[paramName] = { $gte: minPrice, $lte: maxPrice };
    //     } else if (paramName === "shower" || paramName === "hasCaptain" || paramName === "superOwner") {
    //       if (query[paramName] === "true" || query[paramName] === "false") {
    //         queryData[paramName] = query[paramName] === "true";
    //       }
    //     } else if (paramName === "boatType") {
    //       queryData[paramName] =  query.boatType;
    //     } else if (paramName === "length" || paramName === "motorPower") {
    //       const maxRange = +query[paramName];
    //       queryData[paramName] = { $gte: 0, $lte: maxRange };
    //     } else if (paramName === "capacity") {
    //       const minCapacity = +query[paramName];
    //       queryData[paramName] = { $gte: minCapacity };
    //     } else {
    //       queryData[paramName] = +query[paramName];
    //     }
    //   }
    // }

    // // console.log("query luxury", query.isLuxury, query.isLuxury === "true");

    // const boatDetail = await boatService.listBoat(queryData);

    // const boatsWithRatingsAndBookings = await Promise.all(boatDetail.map(async boat => {
    //   const boatId = boat._id;

    //   const ratings = await bookingModel.find({ boat: boatId, rating: { $exists: true } });
    //   const totalRatings = ratings.reduce((sum, booking) => sum + booking.rating, 0);
    //   const averageRating = ratings.length > 0 ? totalRatings / ratings.length : 0;

    //   const bookingCount = await bookingModel.countDocuments({ boat: boatId });

    //   const personsRatedCount = ratings.length;

    //   if(query.isLuxury == "true"){
    //     if(boat.pricePerDay >= 1000){
    //       return {
    //         ...boat.toObject(),
    //         averageRating,
    //         bookingCount,
    //         personsRatedCount
    //       };
    //     }
    //   }else{
    //     if(boat.pricePerDay < 1000){
    //       return {
    //         ...boat.toObject(),
    //         averageRating,
    //         bookingCount,
    //         personsRatedCount
    //       };
    //     }
    //   }
    // }));

    // return defaultFunction.success({
    //   response: boatsWithRatingsAndBookings,
    //   message: "Boat listed successfully",
    //   total: boatsWithRatingsAndBookings.length,
    // });
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

function parseHowLongInWater(howLongParam) {
  const rangeMatch = howLongParam.match(/^(\d+)\s*-\s*(\d+)$/); // Check for a range like "1-2"
  
  if (rangeMatch) {
    // It's a range, return an array with the start and end values
    return [parseInt(rangeMatch[1], 10), parseInt(rangeMatch[2], 10)];
  } else {
    // It's a single number, return it as a parsed integer
    const parsedNumber = parseInt(howLongParam, 10);
    return isNaN(parsedNumber) ? null : parsedNumber; // Return null for non-numeric values
  }
}

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

function calculateBookingDurationHours(bookingDuration) {
  // console.log("calculateBookingDurationMilliseconds", bookingDuration, !isNaN(bookingDuration), typeof bookingDuration);
  if (!isNaN(bookingDuration) && typeof bookingDuration === 'number') {
    // console.log("number")
    // Handle "multi_day" as a special case where the user specifies the number of days
    // For example, if the user enters 2, the duration will be 2 days (48 hours)
    return 24 * bookingDuration;
  } else {
    // Handle other booking durations as before
    const durationMap = {
      "1 - 2 Hours": 2,
      "2 - 4 Hours": 4,
      "4 - 8 Hours": 8,
      "8 - 12 Hours": 12
    };
    return durationMap[bookingDuration] || 0;
  }
}

// Function to calculate booking duration in milliseconds
// function calculateBookingDurationMilliseconds(bookingDuration) {
//   // console.log("calculateBookingDurationMilliseconds", bookingDuration, !isNaN(bookingDuration), typeof bookingDuration);
//   if (!isNaN(bookingDuration) && typeof bookingDuration === 'number') {
//     // console.log("number")
//     // Handle "multi_day" as a special case where the user specifies the number of days
//     // For example, if the user enters 2, the duration will be 2 days (48 hours)
//     return 24 * bookingDuration * 60 * 60 * 1000;
//   } else {
//     // Handle other booking durations as before
//     const durationMap = {
//       "1 - 2 Hours": 2 * 60 * 60 * 1000,
//       "2 - 4 Hours": 4 * 60 * 60 * 1000,
//       "4 - 8 Hours": 8 * 60 * 60 * 1000,
//       "8 - 12 Hours": 12 * 60 * 60 * 1000,
//     };
//     return durationMap[bookingDuration] || 0;
//   }
// }

// Function to generate time slots between 'from' and 'to' dates
// function generateTimeSlots(from, to, intervalInMinutes) {
//   const timeSlots = [];
//   const currentTime = new Date(from);
//   currentTime.setUTCHours(9, 0, 0, 0);
//   const toTime = new Date(to);
//   toTime.setUTCHours(18, 0, 0, 0);

//   // // console.log("currentTime", currentTime);
//   // // console.log("to", toTime);
//   // // console.log("currentTime < to", currentTime < toTime);

//   while (currentTime <= toTime) {
//     // // console.log("inside while");
//     timeSlots.push(new Date(currentTime));
//     currentTime.setMinutes(currentTime.getMinutes() + intervalInMinutes);
//   }
//   return timeSlots;
// }

function isOverlap(slot1, slot2, bookingDurationMs) {
  // // console.log("isOverlap.........");
  // // console.log("slot1.........", slot1);
  // // console.log("slot2.........", slot2);
  // // console.log("isOverlap bookingDurationMs.........", bookingDurationMs);
  
  // Convert the date-time strings to Date objects
  const slot1Start = new Date(slot1);
  const slot1End = new Date(slot1Start);
  slot1End.setMilliseconds(slot1End.getMilliseconds() + bookingDurationMs);

  // // console.log("slot1Start", slot1Start);
  // // console.log("slot1End", slot1End);

  // Convert slot2's bookingTime and bookingEndTime to Date objects
  const slot2Start = new Date(slot2.bookingTime);
  const slot2End = new Date(slot2.bookingEndTime);

  // // console.log("slot2Start", slot2Start);
  // // console.log("slot2End", slot2End);

  // Check if the end of slot1 is after the start of slot2, and the start of slot1 is before the end of slot2
  const overlapCondition1 = slot1Start <= slot2Start && slot1End >= slot2Start;
  
  // Check if the end of slot2 is after the start of slot1, and the start of slot2 is before the end of slot1
  const overlapCondition2 = slot2Start <= slot1Start && slot2End >= slot1Start;

  //// console.log("isOverlap+++++++++++++++++++++", overlapCondition1 || overlapCondition2);

  // Check if the overlap conditions are met
  return overlapCondition1 || overlapCondition2;
  // return (overlapCondition1 || overlapCondition2) && (bookingDurationMs <= (slot1End - slot1Start));
}

// Function to find a suitable time slot for booking
function findSuitableTimeSlot(availableTimeSlots, bookingDuration) {
  // // console.log("findSuitableTimeSlot+++++++");
  // // console.log("bookingDuration", bookingDuration);

  for (const slot of availableTimeSlots) {
    const dateTime = new Date(slot);
    const dateTimeInMilliSeconds = dateTime.getTime();

    // // console.log("slot.duration", dateTimeInMilliSeconds);
    // // console.log("bookingDuration", bookingDuration);

    if (dateTimeInMilliSeconds >= bookingDuration) {
      return slot;
    }
  }
  return null; // No suitable slot found
}

// Function to calculate available time slots
function calculateAvailableTimeSlots(existingBookings, bookingDuration, from, to) {
  // // console.log("existingBookings", existingBookings, bookingDuration, from, to);
  const bookingDurationMs = calculateBookingDurationMilliseconds(bookingDuration);
  // // console.log("calculateAvailableTimeSlots bookingDurationMs", bookingDurationMs);
  const timeSlots = generateTimeSlots(from, to, 30);
  // // console.log("timeSlots", timeSlots);

  const availableTimeSlots = timeSlots.filter((slot) =>
    !existingBookings.some((booking) => {
      // // console.log("slot", slot);
      // // console.log("booking", booking);
      // // console.log("bookingDurationMs", bookingDurationMs);
      return isOverlap(slot, booking, bookingDurationMs)
    })
  );

  return availableTimeSlots;
}

action.updateBoatBooking = async (data) => {
  logger.info("Updating boat booking", data);
  try {
    let query = {
      _id: data._id
    };

    const howLongOnWater = calculateBookingDurationHours(data?.howLongOnWater);
    const booking = await bookingModel.findOne(query);

    const fromDate = moment(booking.from);
    const toDate = moment(booking.to);
    const timeSlots = generateTimeSlots(fromDate, toDate, howLongOnWater);

    console.log("timeslots", timeSlots);

    // console.log("data._id", data._id);

    const existingBookings = await bookingService.getExistingBookings(booking.boat, data.from, data.to, data._id);

    const boatList = await boatModel.find({
      _id: booking.boat
    });

    const availableSlots = timeSlots.filter((slot, index) => {
      if(index < timeSlots?.length - 1){
        const slotStart = moment(slot); // Convert to Moment.js object
        const slotEnd = moment(timeSlots[index + 1]); // Convert to Moment.js object
      
        // Check if there is any booking that clashes with the slot
        const isOverlap = existingBookings.some((booking) => {
          const bookingStart = moment(booking.bookingTime);
          const bookingEnd = moment(booking.bookingEndTime);
          // const sameDay = slotStart.isSame(slotEnd, 'day');

          return ((slotStart.isSameOrBefore(bookingStart) && slotEnd.isSameOrAfter(bookingStart)) || (bookingStart.isSameOrBefore(slotStart) && bookingEnd.isAfter(slotStart)));
        });
        return !isOverlap;
      }

      return false;
    });

    console.log("availableSlots", availableSlots);

    if (availableSlots.length > 0) {
      const nextAvailableSlot = availableSlots[0];
      console.log('Next available slot:', nextAvailableSlot);

      // Check if 'from' is a valid moment object
      if (moment.isMoment(nextAvailableSlot)) {
        console.log('Formatted Next available slot:', nextAvailableSlot);

        // Find the available boats for this slot
        const boatsAvailableForSlot = boatList.filter((boat) => {
          // Check if there is any booking that clashes with the slot for this boat
          const isOverlap = existingBookings.some((booking) => {
            const bookingStart = moment(booking.bookingTime);
            const bookingEnd = moment(booking.bookingEndTime);

            // Check for overlap by comparing time ranges
            return (
              (nextAvailableSlot.isBefore(bookingEnd)) &&
              (nextAvailableSlot.isAfter(bookingStart) || nextAvailableSlot.isSame(bookingStart))
            );
          });

          return !isOverlap;
        });

        console.log("boatsAvailableForSlot+++++++", boatsAvailableForSlot);

        if (boatsAvailableForSlot.length > 0) {
          console.log('Boats available for this slot:', boatsAvailableForSlot);
          console.log("nextAvailableSlot", nextAvailableSlot);

          // console.log("availableSlots[0]", nextAvailableSlot, availableSlots[0], new Date(availableSlots[0].format()).toISOString())

          data.bookingTime = availableSlots[0]?.format('YYYY-MM-DD HH:mm:ss');
          data.bookingEndTime = availableSlots[0]?.clone().add(howLongOnWater, 'hours').format('YYYY-MM-DD HH:mm:ss');

          await bookingService.updateBoatBooking(query, data);

          return defaultFunction.success({
            response: null,
            message: "Boat booking updated successfully!",
            total: 1
          });
        } else {
          return defaultFunction.somethingWentWrong({ message: "No available time slots for booking" });
        }
      } else {
        console.log('Invalid "from" property in nextAvailableSlot:', nextAvailableSlot.from);
      }
    } else {
      console.log('No available slots within the specified time range.');
      return defaultFunction.somethingWentWrong({ message: "No available slots within the specified time range." });
    }

    // console.log("existingBookings", existingBookings);

    // const availableTimeSlots = calculateAvailableTimeSlots(existingBookings, data.howLongOnWater, data.from, data.to);

    // // console.log("availableTimeSlots", availableTimeSlots);

    // const bookingDurationMs = calculateBookingDurationMilliseconds(data.howLongOnWater);
    // const suitableTimeSlot = findSuitableTimeSlot(availableTimeSlots, bookingDurationMs);

    // // console.log("suitableTimeSlot", suitableTimeSlot);

    // if (suitableTimeSlot) {
    //   const bookingEndTime = new Date(suitableTimeSlot);
    //   bookingEndTime.setMilliseconds(bookingEndTime.getMilliseconds() + bookingDurationMs);

    //   const lastAvailableTimeSlot = availableTimeSlots[availableTimeSlots.length - 1];

    //   if (bookingEndTime <= lastAvailableTimeSlot) {
    //     data.bookingTime = suitableTimeSlot;
    //     data.bookingEndTime = bookingEndTime;

    //     const dealData = await bookingService.updateBoatBooking(query, data);
    //     return defaultFunction.success({
    //       response: null,
    //       message: "Boat booking updated successfully!",
    //       total: 1
    //     });
    //   } else {
    //     return defaultFunction.somethingWentWrong({ message: "No available time slots for booking" });
    //   }
    // } else {
    //   return defaultFunction.somethingWentWrong({ message: "No available time slots for booking" });
    // }
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

action.searchFishingCharter = async (query) => {
  try {
    let queryData = {
      status: 1,
    };

    // // console.log("queryData before", queryData);

    if(query?.fromDate && query?.toDate){
      const fromDate = new Date(query.fromDate);
      const toDate = new Date(query.toDate);
      const boatType = query.boatType;
      const howLonginWater = calculateBookingDurationHours(query.howLonginWater);
      console.log("howLonginWater", howLonginWater);
      const timeSlots = generateTimeSlots(fromDate, toDate, howLonginWater);

      // Step 1 : Find all boats for the boat type

      const boatList = await boatModel.find({
        boatType
      });

      // console.log("boatList", boatList);
      const boatIds = boatList.map(boat => boat.id);
      // console.log("=========");
      // console.log("boatIds", boatIds);

      // console.log("fromDate", fromDate);

      // Step 1: Get all bookingList within the given from, to
      const bookingsWithinDateRange = await bookingModel.find({
        from: { $lte: toDate }, // Convert moment object to Date
        to: { $gte: fromDate },   // Convert moment object to Date
        boat: { $in: boatIds },
        bookingTime: { $exists: true } // Only include bookings that have a bookingTime property
      });

      // console.log("=========");
      // console.log("bookingsWithinDateRange", bookingsWithinDateRange);

      console.log("timeSlots", timeSlots);

      const availableSlots = timeSlots.filter((slot, index) => {
        if(index < timeSlots?.length - 1){
          const slotStart = moment(slot); // Convert to Moment.js object
          const slotEnd = moment(timeSlots[index + 1]); // Convert to Moment.js object
          // console.log("slotStart++++++++++++++++", slotStart);
          // console.log("slotEnd++++++++++++++++", slotEnd);
        
          // Check if there is any booking that clashes with the slot
          const isOverlap = bookingsWithinDateRange.some((booking) => {
            const bookingStart = moment(booking.bookingTime);
            const bookingEnd = moment(booking.bookingEndTime);
            // console.log("bookingStart", bookingStart)
            // console.log("bookingEnd", bookingEnd)

            return (slotStart.isSameOrBefore(bookingStart) && slotEnd.isSameOrAfter(bookingStart)) || (bookingStart.isSameOrBefore(slotStart) && bookingEnd.isAfter(slotStart));
          });

          return !isOverlap;
        }

        return false;
      });

      console.log("availableSlots",availableSlots)

      // Assuming you have already calculated `nextAvailableSlot` as in your code
      if (availableSlots.length > 0) {
        const nextAvailableSlot = availableSlots[0];
        console.log('Next available slot:', nextAvailableSlot);

        // Check if 'from' is a valid moment object
        if (moment.isMoment(nextAvailableSlot)) {
          console.log('Formatted Next available slot:', nextAvailableSlot);

          // Find the available boats for this slot
          const boatsAvailableForSlot = boatList.filter((boat) => {
            // Check if there is any booking that clashes with the slot for this boat
            const isOverlap = bookingsWithinDateRange.some((booking) => {
              const bookingStart = moment(booking.bookingTime);
              const bookingEnd = moment(booking.bookingEndTime);

              // Check for overlap by comparing time ranges
              return (
                (nextAvailableSlot.isBefore(bookingEnd)) &&
                (nextAvailableSlot.isAfter(bookingStart) || nextAvailableSlot.isSame(bookingStart))
              );
            });

            return !isOverlap;
          });

          console.log("boatsAvailableForSlot+++++++", boatsAvailableForSlot);

          // Extract _id values using map
          const boatIds = boatsAvailableForSlot.map((boat) => boat._id);

          queryData["_id"] = { $in: boatIds };

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
              } else if (paramName === "capacity") {
                const minCapacity = +query[paramName];
                queryData[paramName] = { $gte: minCapacity };
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
        } else {
          console.log('Invalid "from" property in nextAvailableSlot:', nextAvailableSlot.from);
        }
      } else {
        console.log('No available slots within the specified time range.');
        return defaultFunction.somethingWentWrong({ error: error, message: "No available slots within the specified time range." });
      }
    }

    return defaultFunction.somethingWentWrong({ message: "Enter from and to dates to proceed" });

  } catch (error) {
    logger.error("Failed while listing boat", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.updateFishingCharter = async (data) => {
  logger.info("Updating updateFishingCharter booking", data);
  try {
    let query = {
      _id: data._id
    };

    const howLongOnWater = calculateBookingDurationHours(data?.howLongOnWater);
    const booking = await bookingModel.findOne(query);

    const fromDate = moment(booking.from);
    const toDate = moment(booking.to);
    const timeSlots = generateTimeSlots(fromDate, toDate, howLongOnWater);

    console.log("timeslots", timeSlots);

    // console.log("data._id", data._id);

    const existingBookings = await bookingService.getExistingBookings(booking.boat, data.from, data.to, data._id);

    const boatList = await boatModel.find({
      _id: booking.boat
    });

    const availableSlots = timeSlots.filter((slot, index) => {
      if(index < timeSlots?.length - 1){
        const slotStart = moment(slot); // Convert to Moment.js object
        const slotEnd = moment(timeSlots[index + 1]); // Convert to Moment.js object
      
        // Check if there is any booking that clashes with the slot
        const isOverlap = existingBookings.some((booking) => {
          const bookingStart = moment(booking.bookingTime);
          const bookingEnd = moment(booking.bookingEndTime);
          // const sameDay = slotStart.isSame(slotEnd, 'day');

          return ((slotStart.isSameOrBefore(bookingStart) && slotEnd.isSameOrAfter(bookingStart)) || (bookingStart.isSameOrBefore(slotStart) && bookingEnd.isAfter(slotStart)));
        });
        return !isOverlap;
      }

      return false;
    });

    console.log("availableSlots", availableSlots);

    if (availableSlots.length > 0) {
      const nextAvailableSlot = availableSlots[0];
      console.log('Next available slot:', nextAvailableSlot);

      // Check if 'from' is a valid moment object
      if (moment.isMoment(nextAvailableSlot)) {
        console.log('Formatted Next available slot:', nextAvailableSlot);

        // Find the available boats for this slot
        const boatsAvailableForSlot = boatList.filter((boat) => {
          // Check if there is any booking that clashes with the slot for this boat
          const isOverlap = existingBookings.some((booking) => {
            const bookingStart = moment(booking.bookingTime);
            const bookingEnd = moment(booking.bookingEndTime);

            // Check for overlap by comparing time ranges
            return (
              (nextAvailableSlot.isBefore(bookingEnd)) &&
              (nextAvailableSlot.isAfter(bookingStart) || nextAvailableSlot.isSame(bookingStart))
            );
          });

          return !isOverlap;
        });

        console.log("boatsAvailableForSlot+++++++", boatsAvailableForSlot);

        if (boatsAvailableForSlot.length > 0) {
          console.log('Boats available for this slot:', boatsAvailableForSlot);
          console.log("nextAvailableSlot", nextAvailableSlot);

          // console.log("availableSlots[0]", nextAvailableSlot, availableSlots[0], new Date(availableSlots[0].format()).toISOString())

          data.bookingTime = availableSlots[0]?.format('YYYY-MM-DD HH:mm:ss');
          data.bookingEndTime = availableSlots[0]?.clone().add(howLongOnWater, 'hours').format('YYYY-MM-DD HH:mm:ss');

          await bookingService.updateBoatBooking(query, data);

          return defaultFunction.success({
            response: null,
            message: "Boat booking updated successfully!",
            total: 1
          });
        } else {
          return defaultFunction.somethingWentWrong({ message: "No available time slots for booking" });
        }
      } else {
        console.log('Invalid "from" property in nextAvailableSlot:', nextAvailableSlot.from);
      }
    } else {
      console.log('No available slots within the specified time range.');
      return defaultFunction.somethingWentWrong({ message: "No available slots within the specified time range." });
    }
  } catch (error) {
    logger.error("Failed while updating boat booking", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating boat booking" });
  }
};

module.exports = action;