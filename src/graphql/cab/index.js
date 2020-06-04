const { GraphQLModule } = require('@graphql-modules/core');
const resolver = require('./resolver');
const typeDefs = require('./schema');

const cabModule = new GraphQLModule({
  typeDefs: typeDefs,
  resolvers: resolver,
  context: session => {
    return {
      session
    };
  }
});

module.exports = cabModule;
