const logger = require("../core/logger");

const action = {};
const headers = {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Content-Type": "application/json",
};
const statusCode = {
    catch: 500,
    error: 400,
    Unauthorized: 401,
    Forbidden: 403,
    notFound: 404,
    success: 200,
};


action.failure = (data) => {
    logger.data("Function failed", data);
    try {
        const responseData = {
            body: JSON.stringify({
                error: data.error ? data.error : {},
                message: "Something went wrong",
            }),
            headers: headers,
            statusCode: statusCode.error,
        };
        return responseData;
    } catch (err) {
        logger.error("success error", err);
    }
};

action.handlerNotFound = () => {
    logger.info("START:- notfound function");
    const responseData = {
        body: JSON.stringify({
            data: null,
            message: "Route not found",
        }),
        headers: headers,
        statusCode: statusCode.notFound,
    };
    logger.data("responseData", responseData);
    return responseData;
};

action.unauthorized = (data) => {
    logger.info("START:- unauthorized function");
    try {
        const responseData = {
            body: JSON.stringify({
                message: getMessage("user", "en", "E002"),
            }),
            headers: headers,
            statusCode: statusCode.Unauthorized,
        };
        logger.data("responseData", responseData);
        return responseData;
    } catch (err) {
        logger.error("unauthorized error", err);
    }
};

action.success = ({response, message, total}) => {
    try {
        const responseData = {
            body: JSON.stringify({
                data: response,
                message: message,
                total: total
            }),
            headers: headers,
            statusCode: statusCode.success,
        };
        return responseData;
    } catch (err) {
        logger.error("success error", err);
    }
};

action.somethingWentWrong = ({error, message}) => {
    try {
        const responseData = {
            body: JSON.stringify({
                error: error,
                message: message
            }),
            headers: headers,
            statusCode: statusCode.catch,
        };
        logger.data("responseData", responseData);
        return responseData;
    } catch (err) {
        logger.error("success error", err);
    }
};

module.exports = action;