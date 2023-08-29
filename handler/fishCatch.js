const defaultFunction = require('../core/responser');
const { addFishCatch, updateFishCatch, getFishCatchDetail, listFishCatches, likeFishCatch, deleteFishCatch } = require('../controller/fishCatch');
const logger = require('../core/logger');
const coreDB = require('../core/db');

module.exports.init = async (req) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters",req.query);
  console.log("req.url",req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname",pathname);
  logger.data("db done");
  try {
    switch (true) {
      case pathname === '/add-fish-catch' && req.method === 'POST':
        return await addFishCatch(req.body);
      case pathname === '/update-fish-catch' && req.method === 'PUT':
        return await updateFishCatch(req.body);
      case pathname === '/get-fish-catch-detail' && req.method === 'GET':
        return await getFishCatchDetail(req.query);
      case pathname === '/all-fish-catches' && req.method === 'GET':
        return await listFishCatches(req.query);
      case pathname === '/like' && req.method === "PUT":
        return await likeFishCatch(req.body);
      case pathname === '/delete' && req.method === "DELETE":
        return await deleteFishCatch(req.query);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data('Function failed', error);
    const responseDataObject = {
      error: error,
      event: req,
      handler: 'fishCatch',
      messageCode: 'S001',
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
