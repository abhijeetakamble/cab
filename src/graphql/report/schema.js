const gql = require('graphql-tag');

const reportTypeDef = gql`

  IdleCabInput{
    from:String!
    to:String!
  }

  type Query {
    idleCab(input:IdleCabInput ): Int! 
  }

`;

module.exports = reportTypeDef;
