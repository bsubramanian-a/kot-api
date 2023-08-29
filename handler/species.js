const defaultFunction = require('../core/responser');
const { addSpecies, updateSpecies, getSpeciesDetail, listSpecies } = require('../controller/species'); // Import species controller functions
const logger = require('../core/logger');
const coreDB = require('../core/db');

module.exports.init = async (req,res) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters",req.query);
  console.log("req.url",req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname",pathname);
  logger.data("db done");
  try {
    console.log('species handler');
    switch (true) {
      case pathname === '/add-species' && req.method === 'POST':
        return await addSpecies(req.body);
      case pathname === '/update-species' && req.method === 'PUT':
        return await updateSpecies(req.body);
      case pathname === '/get-species-detail' && req.method === 'GET':
        return await getSpeciesDetail(req.query);
      case pathname === '/all-species' && req.method === 'GET':
        return await listSpecies(req.query);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data('Function failed', error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: 'species',
      messageCode: 'S001',
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
