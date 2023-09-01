const logger = require("../core/logger");
const postModel = require("../models/post");
const commentModel = require("../models/comment");

const action = {};



/**
 * 
 * @param {*} data 
 * @returns 
 */
action.likePost = async(query, data)=> {
  //console.log(query, data);
  try {
    const post = await postModel.find(query);
    //console.log("found post");
    //console.log(post);
    if (data.doLike) {
      if (!post[0].likes.includes(data.user)) {
        post[0].likes.push(data.user);
        post[0].save();
      }
    } else {
      const index = post[0].likes.indexOf(data.user);
      if (index > -1) {
        post[0].likes.splice(index, 1);
        post[0].save();
      }
    }
    
    return post;
  } catch (error) {
    logger.error('Error while updating post', error);
    throw error
  }
}

/**
 * @param {*} data 
 * @returns 
 */
action.addPost = async data => {
  try {
    const post = new postModel(data);
    return await post.save();
  } catch (error) {
    logger.error('Error while adding post', error);
    throw error
  }
}

/**
 * List posts
 * @param {*} data
 * @returns
 */
// action.listPost = async (query) => {
//   try {
//     return await postModel.find(query).populate("user");
//   } catch (error) {
//     logger.error('Error while listing post', error);
//     throw error
//   }
// }

// const populateReplies = async (commentId) => {
//   console.log("populateReplies", commentId);
//   const comment = await commentModel.findById(commentId).populate("user");
//   console.log("comment+++++++++", comment);
//   if (!comment) {
//     return null;
//   }
  
//   const populatedComment = comment.toObject();
  
//   // Recursively populate replies for this comment
//   populatedComment.replies = await commentModel.find({  })

//   console.log("populatedComment", populatedComment);
  
//   return populatedComment;
// };

// action.listPost = async (query) => {
//   try {
//     const posts = await postModel.find(query).populate("user");
    
//     // Populate comments and their replies for each post
//     const populatedPosts = await Promise.all(posts.map(async (post) => {
//       const populatedPost = post.toObject();
      
//       // Populate comments for the post
//       const comments = await commentModel.find({ post: post._id, depth: 0 }).populate("user");
      
//       // Populate replies for each comment
//       populatedPost.comments = await Promise.all(comments.map(async (comment) => {
//         // Populate replies for the comment
//         const commentWithReplies = await populateReplies(comment._id);
        
//         return commentWithReplies;
//       }));
      
//       return populatedPost;
//     }));
    
//     return populatedPosts;
//   } catch (error) {
//     logger.error('Error while listing post', error);
//     throw error;
//   }
// }

const populateReplies = async (commentId) => {
  let comments = await commentModel.find({ reply: commentId }).populate("user");
  //console.log("comments",comments);

  if (!comments) {
    return null;
  }

  const populatedComments = await Promise.all(
    comments.map(async (reply) => {
      const replies = await populateReplies(reply._id);
      //console.log("reply",reply)
      reply.replies = replies;

      return reply;
    })
  );

  return populatedComments;
};

const listCommentsWithReplies = async (postId) => {
  let comments = await commentModel.find({ post: postId, depth: 0 }).populate("user");

  const commentsWithReplies = await Promise.all(
    comments.map(async (comment) => {
      const replies = await populateReplies(comment._id);
      comment.replies = replies;
      return comment;
    })
  );

  return commentsWithReplies;
};

action.listPost = async (query) => {
  try {
    const posts = await postModel.find(query).populate("user");
    //console.log("test");

    // return {
    //   "success":"success"
    // }

    const populatedPosts = await Promise.all(
      posts.map(async (post) => {
        const populatedPost = post.toObject();
        const commentsWithReplies = await listCommentsWithReplies(post._id);
        populatedPost.comments = commentsWithReplies.map(comment => comment._doc);
        //populatedPost.comments = "rest";
        return populatedPost;
      })
    );

    return populatedPosts;
  } catch (error) {
    logger.error('Error while listing post', error);
    throw error;
  }
}






/**
 * 
 * @param {*} data 
 * @returns 
 */
action.updatePost = async(query, updateData)=> {
  console.log(query, updateData);
  try {
    return await postModel.findOneAndUpdate(query, updateData)
  } catch (error) {
    logger.error('Error while updating post', error);
    throw error
  }
}

action.updatePostById = async (postId, postToUpdate) => {
  try {
    return await postModel.findByIdAndUpdate(postId, postToUpdate, {
      new: true
    });
  } catch (error) {
    logger.error('Error while updating post', error);
    throw error
  }
}



// /**
//  * Get boat id wise detail
//  * @param {*} data
//  * @returns
//  */
// action.getBoatDetail = async (query) => {
//   try {
//     return await boatModel.findOne(query);
//   } catch (error) {
//     logger.error('Error while fetching boat detail', error);
//     throw error
//   }
// }

// /**
//  * Get boat  detail
//  * @param {*} data
//  * @returns
//  */
// action.getAllBoats = async (query) => {
//   try {
//     return await boatModel.find(query);
//   } catch (error) {
//     logger.error('Error while fetching boat detail', error);
//     throw error
//   }
// }



module.exports = action;