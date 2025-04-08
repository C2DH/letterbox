import http, { Server } from 'http';
import { getLogger } from '@ouestware/node-logger';
import express, { json, urlencoded } from 'express';

import config from './config';
import { errorFilter } from './error';
import { initGraphql } from './graphql';

async function initServer() {
  const log = getLogger('Server');
  try {
    log.info('Init Express');
    const app = express();
    app.use(urlencoded({ extended: true }));
    app.use(json());

    // Generic filter to handler errors
    app.use(errorFilter);

    // Create a server
    const server: Server = http.createServer(app);

    // Register GraphQL
    await initGraphql(app, server);

    // Start the server
    server.listen(config.server.port, () =>
      log.info(`Server listening at http://localhost:${config.server.port}`),
    );
  } catch (error) {
    log.error('Error while starting the server', error);
  }
}

initServer();
