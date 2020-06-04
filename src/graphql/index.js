const { GraphQLModule } = require('@graphql-modules/core');
const cab = require('./cab');
const city = require('./city');

const graphqlModule = new GraphQLModule({
  imports: [cab, city]
});

module.exports = graphqlModule;
