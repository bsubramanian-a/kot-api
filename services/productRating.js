const logger = require("../core/logger");
const Rating = require("../models/productRating");

const service = {};

service.createRating = async (data) => {
  try {
    const newRating = new Rating(data);
    return await newRating.save();
  } catch (error) {
    logger.error("Error while creating rating", error);
    throw error;
  }
};

module.exports = service;
