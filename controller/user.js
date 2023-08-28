
const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const userService = require("../services/user");
const userDetailService = require("../services/userDetail");
const userModel = require("../models/user");
const userDetailModel = require("../models/userDetail");

const action = {};
 
action.addUser = async (data) => {
  logger.info("Adding new user", data);
  try {
    let user = new userModel(data);
    let userDetail = new userModel(data);
    user["userDetail"] = userDetail._id;
    userDetail["user"] = user._id;
    
    const client = await userService.addUser(data);
    return defaultFunction.success({
      response: client,
      message: "user added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding user", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding user" });
  }
};

action.updatetUser = async (userPayload) => {
  try {
    if (!userPayload || !userPayload._id) {
      throw "Update user payload is not valid";
    }
    let updated = await userService.updateUser(userPayload._id, userPayload);
    return defaultFunction.success({
      response: updated,
      message: "User updated successfully",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating user detail", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.updatetUserDetail = async (userPayload) => {
  try {
    if (!userPayload || !userPayload._id) {
      throw "Update user payload is not valid";
    }
    let updated = await userDetailService.updateUserDetail(userPayload._id, userPayload);
    return defaultFunction.success({
      response: updated,
      message: "User Detail updated successfully",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating user detail", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

// action.getUserDetail = async (query) => {
//   try {
//     if (!query || !query.userName) {
//       throw "Location id can not be null";
//     }
//     let userQuery = {
//       userName: query.userName
//     };
//     const userDetail = await userService.getUser(userQuery);
//     return defaultFunction.success({
//       response: userDetail,
//       message: "User detail fetched successfully",
//     });
//   } catch (error) {
//     logger.error("Failed getLocations", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };


module.exports = action;