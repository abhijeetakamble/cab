const { UserInputError } = require('apollo-server');
const cabService = require('./service');

const resolver = {
  Query: {
    cab: async (_, { input: id }, context) => {
      if (id) {
        return cabService.getCabDetails(id, context);
      }
      throw new UserInputError('Invalid Cab Id');
    }
  },
  Mutation: {
    register: async (_, { input }, context) => {
      const response = await cabService.registerCab(input, context);
      return response;
    },
    assign: async (_, { input }, context) => {
      const response = await cabService.assignCab(input, context);
      return response;
    },
    changeCity: async (_, { input }, context) => {
      const response = await cabService.setCabCity(input, context);
      return response;
    },
    changeState: async (_, { input }, context) => {
      const response = await cabService.setCabState(input, context);
      return response;
    }
  }
};

module.exports = resolver;
