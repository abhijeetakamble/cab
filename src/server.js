const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const graphqlModule = require('./graphql');
const { typeDefs, resolvers } = graphqlModule;
const app = express();
const port = process.env.PORT || 5000;
const path = '/api';
const mysqlInstance = require('./utils/mysql');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req, res }) {
    return { req, res, mysqlInstance };
  },
  playground: {
    settings: {
    'editor.theme': 'light',
    'editor.reuseHeaders': true
    }
  }
});

server.applyMiddleware({ app, path });

app.listen(port, () => {
  console.log(
    `🚀 Graphql Server is listening at http://localhost:${port}`
  );
});

process.on('uncaughtException', err => {
  console.error(err.stack);
  process.exit(1);
});
