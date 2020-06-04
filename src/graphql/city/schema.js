const gql = require('graphql-tag');

const typeDef = gql`
  type City {
    id: ID
  }

  type RegisterCityResponse {
    status: Boolean!
    message: String!
  }

  input RegisterCityPayload {
    id: ID!
  }

  type Query {
    city(input: ID!): City
  }

  type Mutation {
    registerCity(input: RegisterCityPayload): RegisterCityResponse
  }
`;

module.exports = typeDef;
