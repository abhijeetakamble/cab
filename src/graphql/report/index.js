const { GraphQLModule } = require('@graphql-modules/core');
const resolver = require('./resolver');
const typeDefs = require('./schema');

const reportModule = new GraphQLModule({
  typeDefs: typeDefs,
  resolvers: resolver,
  context: (session) => {
    return {
      session
    };
  }
});

module.exports = reportModule;
