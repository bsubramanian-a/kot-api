
const defaultFunction = require("../core/responser");
const logger = require("../core/logger");
const postService = require("../services/post");

const action = {};

action.likePost = async (data) => {
  logger.data("Updating Post", data);
  try {
    let query = {
      _id: data._id
    }
    const postData = await postService.likePost(query, data);
    return defaultFunction.success({
      response: postData,
      message: "Post liked/unliked successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating post", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating post" });
  }
};

action.addPost = async (data) => {
  logger.info("Adding new post", data);
  try {
    const postData = await postService.addPost(data);
    return defaultFunction.success({
      response: postData,
      message: "Post added successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while adding post", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while adding post" });
  }
};

action.listMyPost = async (query) => {
  try {
    if (!query || !query.user) {
      throw "Invalid URL, please provide user id";
    }
    let queryPost = {
      status: 1,
      user: query.user,
      // _id:query.post
    }

    const posts = await postService.listPost(queryPost);

    return defaultFunction.success({
      response: posts,
      message: "Posts listed successfully",
      // total: posts.length
    });

  } catch (error) {
    logger.error("Failed posts", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.updatePost = async (data) => {
  logger.data("Updating Post", data);
  try {
    let query = {
      _id: data._id
    }
    const boatData = await postService.updatePost(query, data);
    return defaultFunction.success({
      response: null,
      message: "Post updated successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while updating post", error);
    return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating post" });
  }
};

action.deletePost = async (data) => {
  try {
    if (!data || !data.id) {
      throw "Post delete payload is not valid";
    }
    let postPayload = {
      status: 2
    }
    let updatedPost = await postService.updatePostById(data.id, postPayload);
    if (!updatedPost) {
      throw "Something went wrong while deleting post";
    }
    return defaultFunction.success({
      response: null,
      message: "Post deleted successfully!",
      total: 1
    });
  } catch (error) {
    logger.error("Failed while deleting user trip", error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

// action.updateBoat = async (data) => {
//   logger.info("Adding new Boat",data);
//   try {
//     let query = {
//       _id:data.boatId
//     }
//     const boatData = await boatService.updateBoat(query,data);
//     return defaultFunction.success({
//       response: boatData,
//       message: "Boat updated successfully!",
//       total: 1
//     });
//   } catch (error) {
//     logger.error("Failed while updating boat", error);
//     return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating boat" });
//   }
// };

// action.getBoatDetail = async (query) => {
//   try {
//     if (!query || !query.boatId) {
//       throw "Location id can not be null";
//     }
//     let userQuery = {
//       _id: query.boatId
//     };
//     const boatDetail = await boatService.getBoatDetail(userQuery);
//     return defaultFunction.success({
//       response: boatDetail,
//       message: "Boat detail fetched successfully",
//     });
//   } catch (error) {
//     logger.error("Failed getLocations", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };

// action.getAllBoats = async (query) => {
//   try {

//     let queryData={
//       status:1,
//     }

//     if (query?.searchText) {
//       const searchText = query.searchText;
//       queryData["$or"] = [
//         {
//           boatType: new RegExp(searchText,"i"),
//         },
//       ];
//     }

//     const boatDetail = await boatService.getAllBoats(queryData);

//     return defaultFunction.success({
//       response: boatDetail,
//       message: "Boat detail fetched successfully",
//     });

//   } catch (error) {
//     logger.error("Failed getLocations", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };





// action.updateBoatStatus = async (query) => {
//   try {
//     if (!query || !query.boatId) {
//       throw "Location id can not be null";
//     }
//     let userQuery = {
//       _id: query.boatId
//     };
//     let data={
//       status:0
//     }
//     const boatDetail = await boatService.updateBoatStatus(userQuery,data);
//     if(boatDetail){
//       return defaultFunction.success({
//         flag: true,
//         message: "Boat detail deleted successfully",
//       });
//     }
//     else{
//       return defaultFunction.success({
//         flag: false,
//         message: "Boat details not found or already deleted",
//       });
//     }

//   } catch (error) {
//     logger.error("Failed getLocations", error);
//     return defaultFunction.somethingWentWrong({ error });
//   }
// };

module.exports = action;