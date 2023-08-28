const defaultFunction = require('../core/responser');
const { addSpecies, updateSpecies, getSpeciesDetail, listSpecies } = require('../controller/species'); // Import species controller functions
const logger = require('../core/logger');
const coreDB = require('../core/db');

module.exports.init = async (event) => {
  const db = await coreDB.openDBConnection();
  logger.data('db done 1', event.path);
  try {
    console.log('species handler');
    switch (true) {
      case event.path === '/species/add-species' && event.httpMethod === 'POST':
        return await addSpecies(JSON.parse(event.body));
      case event.path === '/species/update-species' && event.httpMethod === 'PUT':
        return await updateSpecies(JSON.parse(event.body));
      case event.path === '/species/get-species-detail' && event.httpMethod === 'GET':
        return await getSpeciesDetail(event.queryStringParameters);
      case event.path === '/species/all-species' && event.httpMethod === 'GET':
        return await listSpecies(event.queryStringParameters);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data('Function failed', error);
    const responseDataObject = {
      error: error,
      event: event,
      handler: 'species',
      messageCode: 'S001',
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
