const logger = require('../core/logger');
const faqModel = require('../models/faq');

const action = {};

action.addFAQ = async (data) => {
  try {
    const faq = new faqModel(data);
    return await faq.save();
  } catch (error) {
    logger.error('Error while adding FAQ', error);
    throw error;
  }
};

action.updateFAQ = async (query, updateData) => {
  try {
    return await faqModel.findOneAndUpdate(query, updateData);
  } catch (error) {
    logger.error('Error while updating FAQ', error);
    throw error;
  }
};

action.getFAQDetail = async (query) => {
  try {
    return await faqModel.findOne(query);
  } catch (error) {
    logger.error('Error while fetching FAQ detail', error);
    throw error;
  }
};

action.listFAQs = async (query) => {
  try {
    return await faqModel.find(query);
  } catch (error) {
    logger.error('Error while fetching FAQ list', error);
    throw error;
  }
};

module.exports = action;
