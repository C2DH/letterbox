import express, { json, urlencoded } from 'express';

import config from './config';
import { errorFilter } from './error';

export const app = express();

// Use body parser to read sent json payloads
app.use(urlencoded({ extended: true }));
app.use(json());

// Generic filter to handler errors
app.use(errorFilter);

app.listen(config.server.port, () =>
  console.log(`App listening at http://localhost:${config.server.port}`),
);
