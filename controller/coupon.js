const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const couponService = require("../services/coupon"); // Replace with the actual coupon service

const action = {};

action.createCoupon = async (data) => {
  try {
    const couponData = await couponService.createCoupon(data);
    return defaultFunction.success({
      response: couponData,
      message: "Coupon created successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while creating coupon", error);

    if (error.code === 11000 && error.keyPattern && error.keyPattern.code === 1) {
      // Handle the unique constraint violation for the 'code' field
      return defaultFunction.somethingWentWrong({
        message: "Coupon with the same code already exists.",
      });
    } else {
      logger.error("Failed while creating coupon", error);
      return defaultFunction.somethingWentWrong({
        message: "Failed while creating coupon",
        error: error,
      });
    }
  }
};

action.updateCoupon = async (data) => {
  try {
    const couponData = await couponService.updateCoupon(data);
    return defaultFunction.success({
      response: couponData,
      message: "Coupon updated successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while updating coupon", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while updating coupon",
    });
  }
};

action.getCouponById = async (couponId) => {
  try {
    const couponData = await couponService.getCouponById(couponId);
    return defaultFunction.success({
      response: couponData,
      message: "Coupon fetched successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while fetching coupon", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while fetching coupon",
    });
  }
};

action.getCouponList = async () => {
  try {
    const couponList = await couponService.getCouponList();
    return defaultFunction.success({
      response: couponList,
      message: "Coupon list fetched successfully!",
      total: couponList.length,
    });
  } catch (error) {
    logger.error("Failed while fetching coupon list", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while fetching coupon list",
    });
  }
};

action.deleteCoupon = async (couponId) => {
  try {
    const deletedCoupon = await couponService.deleteCoupon(couponId);
    return defaultFunction.success({
      response: deletedCoupon,
      message: "Coupon deleted successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while deleting coupon", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while deleting coupon",
    });
  }
};

action.applyCoupon = async (data) => {
  try {
    const validityResult = await couponService.applyCoupon(data.code);

    if (validityResult.isValid) {
      return defaultFunction.success({
        response: validityResult?.coupon,
        message: "Coupon fetched successfully!"
      });
    } else {
      return defaultFunction.somethingWentWrong({
        message: validityResult.message,
      });
    }
  } catch (error) {
    logger.error("Failed while checking coupon validity", error);

    return defaultFunction.somethingWentWrong({
      message: "Failed to check coupon validity",
      error: error.message,
    });
  }
};

module.exports = action;
