import { Server } from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { getLogger } from '@ouestware/node-logger';
import { json } from 'body-parser';
import cors from 'cors';
import { Express } from 'express';

import { Services } from '../services';
import { Neo4j } from '../services/neo4j';
import { resolvers, typeDefs } from './schema';

export async function initGraphql(app: Express, httpServer: Server): Promise<void> {
  const neo4j = Services.get(Neo4j);
  const log = getLogger('GraphQl');

  log.info('Init GraphQl server');

  log.debug('Create Neo4j GraphQl schema');
  const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver: neo4j.driver });
  const schema = await neoSchema.getSchema();
  await neoSchema.checkNeo4jCompat();
  await neoSchema.assertIndexesAndConstraints({
    driver: neo4j.driver,
    sessionConfig: { database: neo4j.database },
  });

  log.debug('Create Apollo server');
  const server = new ApolloServer({
    schema,
    logger: log,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault(),
    ],
  });

  // Starting the server
  log.debug('Starting Apollo server');
  await server.start();

  // Add the server to express
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
      }),
    }),
  );
}
