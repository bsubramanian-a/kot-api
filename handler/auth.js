const defaultFunction = require('../core/responser');
const { loginByPhone, loginByEmail, verifyPhoneOTP, verifyEmailOTP, resendPhoneOTP, resendEmailOTP } = require("../controller/auth");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (req,res) => {
  const db = await coreDB.openDBConnection();
  //logger.data("db done");
  console.log("req",req.url,req.method, req.body);
  try {
    switch (true) {
      case req.url === '/phone-login' && req.method === "POST":
        return await loginByPhone(req.body);
      case req.url === '/email-login' && req.method === "POST":
        return await loginByEmail(req.body);
      case req.url === '/verify-phone-otp' && req.method === "POST":
        return await verifyPhoneOTP(req.body);
      case req.url === '/verify-email-otp' && req.method === "POST":
        return await verifyEmailOTP(req.body);
      case req.url === '/resend-phone-otp' && req.method === "POST":
        return await resendPhoneOTP(req.body);
      case req.url === '/resend-email-otp' && req.method === "POST":
        return await resendEmailOTP(req.body);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: "auth",
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};