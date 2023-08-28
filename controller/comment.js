const logger = require("../core/logger");
const commentService = require("../services/comment");
const defaultFunction = require('../core/responser');

const action = {};

action.createComment = async (data) => {
    logger.info("Create Comment", data);
    try {
        const commentData = await commentService.createComment(data);

        return defaultFunction.success({
            response: commentData,
            message: "Comment added successfully!",
            total: 1
          });
    } catch (error) {
        logger.error("Failed while creating comment", error);
        return defaultFunction.somethingWentWrong({ error: error, message: "Failed while creating comment" });
    }
};

action.createReply = async (data) => {
    logger.info("Create reply", data);
    try {
        const replyData = await commentService.createReply(data);

        return defaultFunction.success({
            response: replyData,
            message: replyData?.message || "Reply added successfully!",
            total: 1
        });
    } catch (error) {
        logger.error("Failed while creating reply", error);
        return defaultFunction.somethingWentWrong({ error: error, message: "Failed while creating reply" });
    }
};

action.likeComment = async (data) => {
    logger.data("updating comment", data);
    try {
      let query = {
        _id: data._id
      }
      const commentData = await commentService.likeComment(query, data);
      return defaultFunction.success({
        response: commentData,
        message: "comment liked/unliked successfully!",
        total: 1
      });
    } catch (error) {
      logger.error("Failed while updating comment", error);
      return defaultFunction.somethingWentWrong({ error: error, message: "Failed while updating comment" });
    }
};

module.exports = action;
