const { GraphQLModule } = require('@graphql-modules/core');
const cab = require('./cab');
const city = require('./city');
const report = require('./report');

const graphqlModule = new GraphQLModule({
  imports: [cab, city, report]
});

module.exports = graphqlModule;
