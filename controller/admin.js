
const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const adminService = require("../services/admin");
const bookingService = require("../services/booking");
const userModel = require("../models/user");
const userDetailModel = require("../models/userDetail");

const action = {};
 
action.addUser = async (data) => {
  logger.info("Adding new user", data);
  try {
    let user = new userModel(data);
    let userDetail = new userDetailModel(data);
    user["userDetail"] = userDetail._id;
    userDetail["user"] = user._id;
    
    const addedUser = await adminService.addUser(user, userDetail);
    return defaultFunction.success({
      response: addedUser,
      message: "User added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding user", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding user" });
  }
};

action.getUser = async () => {
  try {
    const userDetail = await adminService.getUser();
    return defaultFunction.success({
      response: userDetail,
      message: "User list fetched successfully",
    });
  } catch (error) {
    logger.error("Failed getLocations", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listBooking = async () => {
  try {
    let queryData={
      status:1,
    }
    const bookings = await bookingService.getBookings(queryData);
    return defaultFunction.success({
      response: bookings,
      message: "Booking list fetched successfully",
      total: bookings.length
    });
  } catch (error) {
    logger.error("Failed getLocations", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};


module.exports = action;