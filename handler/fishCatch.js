const defaultFunction = require('../core/responser');
const { addFishCatch, updateFishCatch, getFishCatchDetail, listFishCatches, likeFishCatch, deleteFishCatch } = require('../controller/fishCatch');
const logger = require('../core/logger');
const coreDB = require('../core/db');

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data('db done 1', event.path);
  try {
    switch (true) {
      case event.path === '/fishCatch/add-fish-catch' && event.httpMethod === 'POST':
        return await addFishCatch(JSON.parse(event.body));
      case event.path === '/fishCatch/update-fish-catch' && event.httpMethod === 'PUT':
        return await updateFishCatch(JSON.parse(event.body));
      case event.path === '/fishCatch/get-fish-catch-detail' && event.httpMethod === 'GET':
        return await getFishCatchDetail(event.queryStringParameters);
      case event.path === '/fishCatch/all-fish-catches' && event.httpMethod === 'GET':
        return await listFishCatches(event.queryStringParameters);
      case event.path === '/fishCatch/like' && event.httpMethod === "PUT":
        return await likeFishCatch(JSON.parse(event.body));
      case event.path === '/fishCatch/delete' && event.httpMethod === "DELETE":
        return await deleteFishCatch(event.queryStringParameters);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data('Function failed', error);
    const responseDataObject = {
      error: error,
      event: event,
      handler: 'fishCatch',
      messageCode: 'S001',
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
