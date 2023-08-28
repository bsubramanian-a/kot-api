const defaultFunction = require('../core/responser');
const { addInterest, updateInterest, getInterestDetail, listInterests } = require('../controller/interest');
const logger = require('../core/logger');
const coreDB = require('../core/db');

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data('db done 1', event.path);
  try {
    console.log('interests handler');
    switch (true) {
      case event.path === '/interests/add-interest' && event.httpMethod === 'POST':
        return await addInterest(JSON.parse(event.body));
      case event.path === '/interests/update-interest' && event.httpMethod === 'PUT':
        return await updateInterest(JSON.parse(event.body));
      case event.path === '/interests/get-interest-detail' && event.httpMethod === 'GET':
        return await getInterestDetail(event.queryStringParameters);
      case event.path === '/interests/all-interests' && event.httpMethod === 'GET':
        return await listInterests(event.queryStringParameters);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data('Function failed', error);
    const responseDataObject = {
      error: error,
      event: event,
      handler: 'interests',
      messageCode: 'I001',
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
