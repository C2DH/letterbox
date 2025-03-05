import { Elastic as OWElastic } from '@ouestware/node-elasticsearch';
import { singleton } from 'tsyringe';

import config from '../config';

@singleton()
export class Elastic extends OWElastic {
  constructor() {
    super(config.elastic);
  }
}
