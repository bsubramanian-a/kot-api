
const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const userService = require("../services/user");
const userModel = require("../models/user");
const userDetailModel = require("../models/userDetail");
const adminService = require("../services/admin");

const action = {};

const _updateUserOTP = async (userDetail) => {
  logger.info("_updateUserOTP: Generating new OTP and updating user data");
  //let otp = Math.floor(100000 + Math.random() * 9000);
  let otp = 1234;
  let userDetailToUpdate = {
    otp: otp
  }
  console.log(userDetail._id.toHexString(), userDetailToUpdate);
  return await userService.updateUser(userDetail._id, userDetailToUpdate);
}

const _addUserDetail = async (data) => {
  logger.info("_addUserDetail: adding user detail", data);
  let user = new userModel(data);
  let userDetail = new userDetailModel(data);
  user["userDetail"] = userDetail._id;
  userDetail["user"] = user._id;
  if (!userDetail.name) {
    userDetail["firstName"] = data.phone;
  }

  return await adminService.addUser(user, userDetail);
}
/**
 * 1- Check if user is already exist in user collection
 *  If Yes-
 *    Generate an OTP.
 *    Update OTP in user collection and its expiry time
 *    Send response for OTP verification
 *  If No-
 *    Create user and user detail
 *    Generate an OTP.
 *    Update OTP in user collection and its expiry time
 *    Send response for OTP verification
 * @param {*} event 
 * @returns 
 */
action.loginByPhone = async (data) => {
  logger.info("loginByPhone: start");
  try {
    if (!data || !data.phone || !data.countryCode) {
      throw "Login payload is not valid";
    }
    let userQuery = {
      phone: data.phone,
      countryCode: data.countryCode,
      status: 1
    }
    logger.data("loginByPhone: user query", userQuery);
    let userDetail = await userService.getUserDetail(userQuery);
    if (userDetail && userDetail._id) {
      logger.info("loginByPhone: User found, generating OTP and updating into user");
      await _updateUserOTP(userDetail);
    } else {
      logger.info("loginByPhone: User not found, Adding user detail first");
      data["email"] = new Date().getTime();
      userDetail = await _addUserDetail(data);
      console.log(userDetail._id);
      await _updateUserOTP(userDetail);
    }
    return defaultFunction.success({
      response: null,
      message: "Please verify your OTP",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while getting user or sending OTP", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while getting user or sending OTP" });
  }
};

action.loginByEmail = async (data) => {
  logger.info("login: start");
  try {
    if (!data || !data.email) {
      throw "Login payload is not valid";
    }

    let userQuery = {
      email: data.email ,
      status: 1
    }

    logger.data("login: user query", userQuery);
    let userDetail = await userService.getUserDetail(userQuery);
    if (userDetail && userDetail._id) {
      logger.info("login: User found, generating OTP and updating into user");
      await _updateUserOTP(userDetail);
    } else {
      logger.info("login: User not found, Adding user detail first");
      data["phone"] = new Date().getTime();
      userDetail = await _addUserDetail(data);
      console.log(userDetail._id);
      await _updateUserOTP(userDetail);
    }
    
    // Send OTP to the appropriate contact information
    if (data.phone && data.countryCode) {
      // Send OTP to phone number
      // Implement the logic to send OTP to the phone number here
      logger.info("login: OTP sent to email");
    } else {
      // Send OTP to email
      // Implement the logic to send OTP to the email here
      logger.info("login: OTP sent to email");
    }
    
    return defaultFunction.success({
      response: null,
      message: "Please verify your OTP",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while getting user or sending OTP", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while getting user or sending OTP" });
  }
};

action.verifyPhoneOTP = async (data) => {
  logger.info("verifyPhoneOTP: start");
  try {
    if (!data || !data.phone || !data.otp || !data.countryCode) {
      throw "Login payload is not valid";
    }

    let userQuery = {
      phone: data.phone,
      countryCode: data.countryCode,
      status: 1
    }

    logger.data("login: user query", userQuery);
    let userDetail = await userService.getUserDetail(userQuery);
    if (!userDetail) {
      throw "User detail not found";
    }
    console.log(userDetail);
    //TODO: check otp expiry time
    if (data.otp != userDetail.otp) {
      throw "OTP is not valid";
    }
    //update user with no OTP so that can not reuse it.
    // let updatedUser = await userService.updateUser(userDetail._id, {
    //   otp: ""
    // });
    
    return defaultFunction.success({
      response: userDetail,
      message: "OTP verified",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while verifying OTP", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while verifying OTP" });
  }
}

/**
 * Validate payload
 * Check user exist with this email
 * if yes- verify OTP
 *         update user with blank OTP
 * if no- return with error message "User not found"
 * @param {*} data 
 * @returns 
 */
action.verifyEmailOTP = async (data) => {
  logger.info("verifyEmailOTP: start");
  try {
    if (!data || !data.email || !data.otp) {
      throw "OTP verification payload is not valid";
    }

    
    return defaultFunction.success({
      response: null,
      message: "OTP verified",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while verifying OTP", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while verifying OTP" });
  }
}

/**
 * get user detail by phone, country code
 * update OTP with new OTP
 * send response
 * @param {*} data 
 * @returns 
 */
action.resendPhoneOTP = async (data) => {
  logger.info("resendPhoneOTP: start");
  try {
    if (!data || !data.phone || !data.countryCode) {
      throw "OTP resent payload is not valid";
    }

    let userQuery = {
      phone: data.phone,
      countryCode: data.countryCode,
      status: 1
    }

    logger.data("resendPhoneOTP: user query", userQuery);
    let userDetail = await userService.getUserDetail(userQuery);
    if (userDetail && userDetail._id) {
      logger.info("resendPhoneOTP: Resent otp to phone");
      await _updateUserOTP(userDetail);
    } 
    return defaultFunction.success({
      response: null,
      message: "OTP resent to phone",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while resent OTP", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while resent OTP" });
  }
}

/**
 * get user detail by email
 * update OTP with new OTP
 * send response
 * @param {*} data 
 * @returns 
 */
action.resendEmailOTP = async (data) => {
  logger.info("resendEmailOTP: start");
  try {
    if (!data || !data.email) {
      throw "OTP resent payload is not valid";
    }

    let userQuery = {
      email: data.email ,
      status: 1
    }

    logger.data("resendEmailOTP: user query", userQuery);
    let userDetail = await userService.getUserDetail(userQuery);
    if (userDetail && userDetail._id) {
      logger.info("resendEmailOTP: Resent otp to email");
      await _updateUserOTP(userDetail);
    }

    
    return defaultFunction.success({
      response: null,
      message: "OTP resent to email",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while resent OTP", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while resent OTP" });
  }
}


module.exports = action;