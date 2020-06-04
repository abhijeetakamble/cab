const { UserInputError } = require('apollo-server');
const reportService = require('./service');

const resolver = {
  Query: {
    idleCab: async (_, input, context) => {
      if (id) {
        return cabService.getIdleCabDetails(input, context);
      }
      throw new UserInputError('Invalid Cab Id');
    }
  }
};

module.exports = resolver;
