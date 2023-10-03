const logger = require("../core/logger");
const Coupon = require("../models/coupon"); // Replace with the actual Coupon model

const action = {};

action.createCoupon = async (data) => {
  try {
    const newCoupon = new Coupon(data);
    return await newCoupon.save();
  } catch (error) {
    logger.error("Error while creating coupon", error);
    throw error;
  }
};

action.updateCoupon = async (data) => {
  try {
    return await Coupon.findByIdAndUpdate(data._id, data, { new: true });
  } catch (error) {
    logger.error("Error while updating coupon", error);
    return error;
  }
};

action.getCouponById = async (couponId) => {
  try {
    return await Coupon.findById(couponId);
  } catch (error) {
    logger.error("Error while fetching coupon by ID", error);
    throw error;
  }
};

action.getCouponList = async () => {
    try {
      const couponList = await Coupon.find();
      return couponList;
    } catch (error) {
      logger.error("Error while fetching coupon list by user ID", error);
      throw error;
    }
};

action.deleteCoupon = async (couponId) => {
  try {
    return await Coupon.findByIdAndDelete(couponId);
  } catch (error) {
    logger.error("Error while deleting coupon", error);
    throw error;
  }
};

action.applyCoupon = async (couponCode) => {
  try {
    // Find the coupon by code
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return { isValid: false, message: "Coupon not found" };
    }

    if (coupon.count <= 0) {
      return { isValid: false, message: "Coupon has been exhausted" };
    }

    const currentDate = new Date();
    if (coupon.from && currentDate < coupon.from) {
      return { isValid: false, message: "Coupon is not yet valid" };
    }

    if (coupon.to && currentDate > coupon.to) {
      return { isValid: false, message: "Coupon has expired" };
    }

    return { isValid: true, coupon};
  } catch (error) {
    logger.error("Error while checking coupon validity", error);
    throw error;
  }
};

module.exports = action;
