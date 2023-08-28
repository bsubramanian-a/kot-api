"use strict";
const responser = require("../core/responser")

module.exports.init = async (event, context, callback) => {
    const responseDataObject = {
        callback: callback,
        event: event,
        handler: "hello",
        messageCode: "001",
      };
    return responser.success(responseDataObject)
};