const logger = require("../core/logger");
const orderModal = require("../models/order");
const productRating = require("../models/productRating");
const productModel = require("../models/product");

const action = {};

action.createOrder = async (data) => {
  try {
    const newOrder = new orderModal({
      user: data.user,
      items: data.items,
      totalAmount: data.totalAmount
    });
    return await newOrder.save();
  } catch (error) {
    logger.error("Error while creating order", error);
    throw error;
  }
};

action.updateOrder = async (query, updateData) => {
    console.log("updateOrder service", query, updateData);
    try {
      return await orderModal.findOneAndUpdate(query, updateData);
    } catch (error) {
      logger.error('Error while updating Fish Catch', error);
      throw error;
    }
}; 

// action.getOrderHistory = async (userId) => {
//     try {
//       const orderHistory = await orderModal.find({ user: userId, status: "Completed" }).populate("items.product");
      
//       const populatedProduct = await Promise.all(orderHistory.map(async oh => {
//         oh?.items?.map(async (product) => {
//             const populatedRating = await product.populate("people");
//         })

//         return populateTopicCommunity;
//       }));
      
  
//     //   const productIds = orderHistory.flatMap(order => order.items.map(item => item.product));
      
//     //   const productsWithRatings = await productModel.find({ _id: { $in: productIds } }).populate("productRating");
  
//     //   // Build a map of product IDs to their ratings
//     //   const productRatingsMap = new Map();
//     //   productsWithRatings.forEach(product => {
//     //     productRatingsMap.set(product._id.toString(), product.productRating);
//     //   });
  
//     //   // Map order history items to include product ratings
//     //   const orderHistoryWithRatings = orderHistory.map(order => ({
//     //     ...order.toObject(),
//     //     items: order.items.map(item => ({
//     //       ...item.toObject(),
//     //       productRating: productRatingsMap.get(item.product.toString()) || null,
//     //     })),
//     //   }));
  
//       return orderHistory;
//     } catch (error) {
//       logger.error("Error while fetching order history", error);
//       throw error;
//     }
// };

action.getOrderHistory = async (userId) => {
    try {
      const orderHistory = await orderModal.find({ user: userId, status: "Completed" }).populate("items.product");
  
      const populatedProduct = await Promise.all(orderHistory.map(async oh => {
            const populatedItems = await Promise.all(oh.items.map(async (item) => {
                console.log("item++++++++", item);
                const productRatings = await productRating.find({ product: item.product._id })
                console.log("productRating", productRatings);
                const averageRating = productRatings.reduce((sum, rating) => sum + rating.rating, 0) / productRatings.length;
                
                return {
                    ...item.toObject(),
                    averageRating: isNaN(averageRating) ? 0 : averageRating,
                };
            }));
    
            return {
                ...oh.toObject(),
                items: populatedItems,
            };
      }));
  
      return populatedProduct;
    } catch (error) {
      logger.error("Error while fetching order history", error);
      throw error;
    }
};

action.getOrderHistoryById = async (orderId) => {
    try {
        const order = await orderModal.findOne({ _id: orderId, status: "Delivered" }).populate("items.product");
  
        if (!order) {
            throw new Error("Order not found");
        }
        
        const populatedItems = await Promise.all(order.items.map(async (item) => {
        const productRatings = await productRating.find({ product: item.product._id });
        const averageRating = productRatings.reduce((sum, rating) => sum + rating.rating, 0) / productRatings.length;
        
        return {
            ...item.toObject(),
                product: {
                    ...item.product.toObject(),
                averageRating: isNaN(averageRating) ? 0 : averageRating,
                },
            };
        }));
        
        return {
            ...order.toObject(),
            items: populatedItems,
        };
    } catch (error) {
      logger.error("Error while fetching order history", error);
      return {
        items: [],
    };
    }
};

module.exports = action;
