const logger = require("../core/logger");
const Comment = require("../models/fishCatchComment");

const action = {};

action.createComment = async (data) => {
  try {
    const newComment = new Comment({
      user: data.user,
      content: data.content,
      fishCatch: data.fishCatch
    });

    return await newComment.save();
  } catch (error) {
    logger.error("Error while creating comment", error);
    throw error;
  }
};

action.createReply = async (data) => {
  const parentCommentId = data.commentId;
  const parentComment = await Comment.findById(parentCommentId);

  if (!parentComment) {
    return { message: "Parent comment not found." };
  }

  if (parentComment.depth >= 2) {
    return { message: "Maximum nesting depth reached." };
  }

  const newReply = new Comment({
    user: data.user,
    content: data.content,
    fishCatch: data.fishCatch,
    reply: parentCommentId,
    depth: parentComment.depth + 1
  });

  try {
    return await newReply.save();
  } catch (error) {
    return { message: "Failed to create reply.", error };
  }
};

action.likeComment = async(query, data)=> {
  console.log("like comment", query, data);
  try {
    const comment = await Comment.find(query);

    console.log("comment", comment);

    if (data.doLike) {
      if (!comment[0].likes.includes(data.user)) {
        comment[0].likes.push(data.user);
        comment[0].save();
      }
    } else {
      const index = comment[0].likes.indexOf(data.user);
      if (index > -1) {
        comment[0].likes.splice(index, 1);
        comment[0].save();
      }
    }
    
    return comment;
  } catch (error) {
    logger.error('Error while updating comment', error);
    throw error
  }
}

module.exports = action;
