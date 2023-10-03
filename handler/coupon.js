const defaultFunction = require('../core/responser');
const { createCoupon, updateCoupon, getCouponById, deleteCoupon, getCouponList, applyCoupon } = require("../controller/coupon");
const logger = require('../core/logger');
const coreDB = require("../core/db");

module.exports.init = async (req) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters",req.query);
  console.log("req.url",req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname",pathname);
  logger.data("db done");

  try {
    switch (true) {
      case pathname === '/' && req.method === "POST":
        return await createCoupon(req.body);
      case pathname === '/' && req.method === "PUT":
        return await updateCoupon(req.body);
      case pathname === '/getcouponbyid' && req.method === "GET":
        const couponId = req.query.couponId;
        return await getCouponById(couponId);
      case pathname === '/getcouponlist' && req.method === "GET":
        return await getCouponList(req.query);
      case pathname === '/delete' && req.method === "DELETE":
        const deleteCouponId = req.query.couponId;
        return await deleteCoupon(deleteCouponId);
      case pathname === '/apply-coupon' && req.method === "POST":
        return await applyCoupon(req.body);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data("Function failed", error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: "coupon",
      messageCode: "S001",
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
