import { IResolvers } from '@graphql-tools/utils';
import gql from 'graphql-tag';

import { Services } from '../services';
import { Dataprep } from '../services/dataprep';

export const typeDefs = gql`
  #
  # Define custom Graphql types
  #
  scalar JSONObject
  scalar JSON

  type Company @node {
    name: ID! @unique
  }

  type Country @node {
    name: ID! @unique
  }

  type Address @node {
    name: ID! @unique
  }

  type Person @node {
    name: ID! @unique
  }

  type Message @node {
    fingerprint: ID! @unique
    date: Date!
    filePath: String!
    pageNumber: Int!

    # saving raw data of the CSV
    raw_year: Int!
    raw_company: String!
    raw_company_spare: String!
    raw_address: String!
    raw_address_spare: String!
    raw_people: [String]
    raw_countries: [String]
    raw_message: String!

    company: [Company!]! @relationship(type: "CONTAINS", direction: OUT)
    address: Address! @relationship(type: "CONTAINS", direction: OUT)
    persons: [Person!]! @relationship(type: "CONTAINS", direction: OUT)
    countries: [Country!]! @relationship(type: "CONTAINS", direction: OUT)
  }

  type ImportReport {
    count: Int!
    errors: [String!]
  }

  type Mutation {
    """
    Create a graph in the database
    """
    import: ImportReport
  }
`;

const dataprep = Services.get(Dataprep);

export const resolvers: IResolvers = {
  Query: {},
  Mutation: {
    import: async () => {
      return await dataprep.doImport();
    },
  },
};
