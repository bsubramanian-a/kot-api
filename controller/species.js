const defaultFunction = require('../core/responser');
const logger = require('../core/logger');
const speciesService = require('../services/species');

const action = {};

action.addSpecies = async (data) => {
  logger.info('Adding new Species', data);
  try {
    const speciesData = await speciesService.addSpecies(data);
    return defaultFunction.success({
      response: speciesData,
      message: 'Species added successfully!',
      total: 1,
    });
  } catch (error) {
    logger.error('Failed while adding species', error);
    return defaultFunction.somethingWentWrong({ error: error, message: 'Failed while adding species' });
  }
};

action.updateSpecies = async (data) => {
  logger.info('Updating species', data);
  try {
    let query = {
      _id: data._id,
    };
    const speciesData = await speciesService.updateSpecies(query, data);
    return defaultFunction.success({
      response: null,
      message: 'Species updated successfully!',
      total: 1,
    });
  } catch (error) {
    logger.error('Failed while updating species', error);
    return defaultFunction.somethingWentWrong({ error: error, message: 'Failed while updating species' });
  }
};

action.getSpeciesDetail = async (query) => {
  try {
    if (!query || !query.speciesId) {
      throw 'speciesId cannot be null';
    }
    let userQuery = {
      _id: query.speciesId,
    };
    const speciesDetail = await speciesService.getSpeciesDetail(userQuery);
    return defaultFunction.success({
      response: speciesDetail,
      message: speciesDetail ? 'Species detail fetched successfully' : 'Species Detail not found',
    });
  } catch (error) {
    logger.error('Failed to get species details', error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listSpecies = async (query) => {
  try {
    let queryData = {
      // Additional query parameters if needed
    };

    const speciesDetail = await speciesService.listSpecies(queryData);

    return defaultFunction.success({
      response: speciesDetail,
      message: 'Species listed successfully',
      total: speciesDetail.length,
    });
  } catch (error) {
    logger.error('Failed while listing species', error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

module.exports = action;
