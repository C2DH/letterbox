import 'reflect-metadata';

import { container } from 'tsyringe';

import './elastic';
import './neo4j';

export class Services {
  /**
   * Get a service by its class
   */
  static get<T>(controller: { prototype: T }): T {
    return container.resolve<T>(controller as never);
  }
}
