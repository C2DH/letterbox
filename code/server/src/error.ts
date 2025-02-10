import * as Boom from '@hapi/boom';
import * as express from 'express';
import { getLogger } from '@ouestware/node-logger';
import { ValidateError } from 'tsoa';

// Logger
const log = getLogger('Error');

// Generic interface for errors
interface Error {
  status?: number;
  fields?: string[];
  message: string;
  name: string;
  stack?: string;
}

/**
 * Inspect an error and compute/get the status code.
 * Default code is 500.
 */
function getErrorStatusCode(error: Error): number {
  if (error instanceof ValidateError) {
    return 422;
  }
  if (Boom.isBoom(error)) {
    return error.output.statusCode;
  }
  return 500;
}

/**
 * Express middleware inspect the error and construct
 * a custom error http response.
 */
export function errorFilter(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): express.Response | void {
  if (err instanceof Error) {
    const code = getErrorStatusCode(err);
    const body = {
      name: err.name,
      code,
      message: err.message || 'An error occurred',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    };
    if (!(400 <= body.code && body.code < 500))
      log.error(`Url ${req.originalUrl} produced http error`, body);
    return res.status(code).json(body);
  }
  next();
}
