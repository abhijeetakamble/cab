const gql = require('graphql-tag');

const cabTypeDef = gql`
  enum CabState {
    IDLE
    ON_TRIP
  }

  type Cab {
    id: ID
    state: CabState
    city: City
    last_trip_time: String
  }

  type RegisterResponse {
    status: Boolean!
    message: String!
  }

  input RegisterPayload {
    id: ID!
    cityId: Int!
  }

  type AssignResponse {
    status: Boolean!
    message: String!
  }

  input AssignPayload {
    cityId: Int!
  }

  type ChangeCityResponse {
    status: Boolean!
    message: String!
  }

  input ChangeCityPayload {
    id: ID!
    cityId: Int!
  }

  type ChangeStateResponse {
    status: Boolean!
    message: String!
  }

  input ChangeStatePayload {
    id: Int!
    state: CabState!
  }

  type Query {
    cab(input: ID!): Cab
  }

  type Mutation {
    register(input: RegisterPayload): RegisterResponse
    assign(input: AssignPayload): AssignResponse
    changeCity(input: ChangeCityPayload): ChangeCityResponse
    changeState(input: ChangeStatePayload): ChangeStateResponse
  }
`;

module.exports = cabTypeDef;
