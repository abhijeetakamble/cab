const gql = require('graphql-tag');

const reportTypeDef = gql`
  input IdleCabInput {
    id: Int!
    from: String!
    to: String!
  }

  type IdleCab {
    count: Int
  }

  type Query {
    idleCab(input: IdleCabInput): IdleCab
  }
`;

module.exports = reportTypeDef;
