const cityService = require('./service');

const resolvers = {
  Query: {
    city: async (_, { input: name }, context) => {
      if (name) {
        return cityService.getCityDetails(name, context);
      }
      throw new UserInputError('Invalid City Name');
    }
  },
  Mutation: {
    registerCity: async (_, { input }, context) => {
      const response = await cityService.registerCity(input, context);
      return response;
    }
  }
};

module.exports = resolvers;
