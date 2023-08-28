const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const cartService = require("../services/cart");

const action = {};

action.addToCart = async (data) => {
  try {
    const cartData = await cartService.addToCart(data);
    return defaultFunction.success({
      response: cartData,
      message: "Item added to cart successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while adding item to cart", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while adding item to cart",
    });
  }
};

action.updateCartItemQuantity = async (data) => {
  console.log("data", data);
  try {
    const updatedCartData = await cartService.updateCartItemQuantity(data);

    // Check if the new quantity is 0, and remove the cart item if it is
    if (data.quantity === 0) {
      await cartService.removeCartItem(data);

      return defaultFunction.success({
        response: updatedCartData,
        message: "Cart item removed successfully!",
      });
    }

    return defaultFunction.success({
      response: updatedCartData,
      message: "Cart item quantity updated successfully!",
    });
  } catch (error) {
    logger.error("Failed while updating cart item quantity", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while updating cart item quantity",
    });
  }
};

action.getCartByUser = async (userId) => {
  try {
    const cartData = await cartService.getCartByUser(userId);
    return defaultFunction.success({
      response: cartData,
      message: "Cart fetched successfully!",
      total: 1,
    });
  } catch (error) {
    logger.error("Failed while fetching cart", error);
    return defaultFunction.somethingWentWrong({
      error: error,
      message: "Failed while fetching cart",
    });
  }
};

module.exports = action;
