const defaultFunction = require('../core/responser');
const logger = require('../core/logger');
const interestService = require('../services/interest');

const action = {};

action.addInterest = async (data) => {
  logger.info('Adding new Interest', data);
  try {
    const interestData = await interestService.addInterest(data);
    return defaultFunction.success({
      response: interestData,
      message: 'Interest added successfully!',
      total: 1,
    });
  } catch (error) {
    logger.error('Failed while adding interest', error);
    return defaultFunction.somethingWentWrong({ error: error, message: 'Failed while adding interest' });
  }
};

// Implement other controller functions (, , ) similarly

action.updateInterest = async (data) => {
  logger.info('Updating interests', data);
  try {
    let query = {
      _id: data._id,
    };
    const interestsData = await interestService.updateInterest(query, data);
    return defaultFunction.success({
      response: null,
      message: 'Interests updated successfully!',
      total: 1,
    });
  } catch (error) {
    logger.error('Failed while updating interests', error);
    return defaultFunction.somethingWentWrong({ error: error, message: 'Failed while updating interests' });
  }
};

action.getInterestDetail = async (query) => {
  try {
    if (!query || !query.interestId) {
      throw 'interestId cannot be null';
    }
    let userQuery = {
      _id: query.interestId,
    };
    const interestDetail = await interestService.getInterestDetail(userQuery);
    return defaultFunction.success({
      response: interestDetail,
      message: interestDetail ? 'Species detail fetched successfully' : 'Species Detail not found',
    });
  } catch (error) {
    logger.error('Failed to get interests details', error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.listInterests = async (query) => {
  try {
    let queryData = {
      // Additional query parameters if needed
    };

    const interestDetail = await interestService.listInterests(queryData);

    return defaultFunction.success({
      response: interestDetail,
      message: 'Interests listed successfully',
      total: interestDetail.length,
    });
  } catch (error) {
    logger.error('Failed while interests species', error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

module.exports = action;
