const { UserInputError } = require('apollo-server');
const reportService = require('./service');

const resolver = {
  Query: {
    idleCab: async (_, { input }, context) => {
      const response = await reportService.getIdleCabDetails(input, context);
      return response;
    }
  }
};

module.exports = resolver;
