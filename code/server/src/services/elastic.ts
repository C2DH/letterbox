import type { estypes } from '@elastic/elasticsearch';
import { Elastic as OWElastic } from '@ouestware/node-elasticsearch';
import { singleton } from 'tsyringe';

import config from '../config';
import { SortBy } from '../graphql/generated/types';

@singleton()
export class Elastic extends OWElastic {
  constructor() {
    super(config.elastic);
  }

  formatSort(sortBy: SortBy[]): estypes.Sort {
    return sortBy.map((sb) => {
      // for years we consider only the minimum one for sort
      if (sb.field === 'years') return { [sb.field]: { order: sb.direction, mode: 'min' } };
      return { [sb.field]: { order: sb.direction } };
    });
  }
}
