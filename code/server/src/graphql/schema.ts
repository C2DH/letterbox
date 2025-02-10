import { IResolvers } from '@graphql-tools/utils';
import gql from 'graphql-tag';
import { GraphQLJSONObject } from 'graphql-type-json';

export const typeDefs = gql`
  #
  # Define custom Graphql types
  #
  scalar JSONObject
  scalar JSON

  type Country @node {
    id: ID!
  }

  type Adddress @node {
    id: ID!
  }

  type Person @node {
    id: ID!
  }

  type Event @node {
    id: ID!
    persons: [Person!]! @relationship(type: "PARTICIPATED", direction: OUT)
  }
`;

export const resolvers: IResolvers = {
  JSONObject: GraphQLJSONObject,
  Query: {},
  Mutation: {},
};
