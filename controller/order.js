const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const orderService = require("../services/order");

const action = {};

action.createOrder = async (data) => {
  try {
    const orderData = await orderService.createOrder(data);
    return defaultFunction.success({
      response: orderData,
      message: "Order created successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while creating order", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while creating order",
    });
  }
};

action.updateOrder = async (data) => {
    try {
        let query = {
            _id: data._id,
        };

        const updatedOrder = await orderService.updateOrder(query, data);

        if (updatedOrder) {
            return defaultFunction.success({
                response: updatedOrder,
                message: "Order updated successfully!",
                total: 1,
            });
        } else {
            return defaultFunction.failure({
                message: "Order not found or could not be updated.",
            });
        }
    } catch (error) {
        logger.error("Failed while updating order", error);

        return defaultFunction.somethingWentWrong({
            error: error,
            message: "Failed while updating order",
        });
    }
};

action.getOrderHistory = async (userId) => {
    try {
      const orderHistory = await orderService.getOrderHistory(userId);

      return defaultFunction.success({
        response: orderHistory,
        message: "Order history fetched successfully!",
        total: orderHistory.length,
      });
    } catch (error) {
      logger.error("Failed while fetching order history", error);

      return defaultFunction.somethingWentWrong({
        error: error,
        message: "Failed while fetching order history",
      });
    }
};

action.getOrderHistoryById = async (orderId) => {
    try {
      const orderHistory = await orderService.getOrderHistoryById(orderId);

      return defaultFunction.success({
        response: orderHistory,
        message: "Order history fetched successfully!",
        total: orderHistory.length,
      });
    } catch (error) {
      logger.error("Failed while fetching order history", error);
      
      return defaultFunction.somethingWentWrong({
        error: error,
        message: "Failed while fetching order history",
      });
    }
};

module.exports = action;
