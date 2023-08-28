const logger = require("../core/logger");
const cartModel = require("../models/cart");

const action = {};

action.addToCart = async (data) => {
    try {
      let cart = await cartModel.findOne({ user: data.user });
  
      if (!cart) {
        // If no cart exists for the user, create a new one
        const newCart = new cartModel({
          user: data.user,
          items: [{ product: data.product, quantity: data.quantity }],
        });
        return await newCart.save();
      }
  
      // Check if the product already exists in the cart items
      const existingProduct = cart.items.find(item => item.product === data.product);
  
      if (existingProduct) {
        // If the product exists, increment its quantity
        existingProduct.quantity += data.quantity;
      } else {
        // If the product doesn't exist, add it to the items array
        cart.items.push({ product: data.product, quantity: data.quantity });
      }
  
      // Save the updated cart
      return await cart.save();
    } catch (error) {
      logger.error("Error while adding item to cart", error);
      throw error;
    }
};  

action.updateCartItemQuantity = async (data) => {
  try {
    return await cartModel.findOneAndUpdate(
      { user: data.user, "items.product": data.product },
      { $set: { "items.$.quantity": data.quantity } },
      { new: true }
    );
  } catch (error) {
    logger.error("Error while updating cart item quantity", error);
    throw error;
  }
};

action.removeCartItem = async (data) => {
    console.log("Removing item from cart: user =", data.user, "product =", data.product);
    try {
      const cart = await cartModel.findOneAndUpdate(
        { user: data.user },
        { $pull: { items: { product: data.product } } },
        { new: true }
      );

      if (cart && cart.items.length === 0) {
        await cartModel.findOneAndRemove({ user: data.user });
      }
      
      return cart;
    } catch (error) {
      logger.error("Error while removing cart item", error);
      throw error;
    }
};  

action.getCartByUser = async (userId) => {
  try {
    return await cartModel.findOne({ user: userId }).populate("items.product");
  } catch (error) {
    logger.error("Error while fetching cart", error);
    throw error;
  }
};

module.exports = action;
