const defaultFunction = require('../core/responser');
const { addInterest, updateInterest, getInterestDetail, listInterests } = require('../controller/interest');
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
    console.log('interests handler');
    switch (true) {
      case pathname === '/add-interest' && req.method === 'POST':
        return await addInterest(req.body);
      case pathname === '/update-interest' && req.method === 'PUT':
        return await updateInterest(req.body);
      case pathname === '/get-interest-detail' && req.method === 'GET':
        return await getInterestDetail(req.query);
      case pathname === '/all-interests' && req.method === 'GET':
        return await listInterests(req.query);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data('Function failed', error);
    const responseDataObject = {
      error: error,
      event: req,
      handler: 'interests',
      messageCode: 'I001',
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
