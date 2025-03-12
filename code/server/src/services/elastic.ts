import type { estypes } from '@elastic/elasticsearch';
import { AggregationResult, Elastic as OWElastic } from '@ouestware/node-elasticsearch';
import { singleton } from 'tsyringe';

import config from '../config';
import { AggregateResults, AggregationFields, SortBy } from '../graphql/generated/types';

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

  formatAggregationResults(field: AggregationFields, result: AggregationResult): AggregateResults {
    const valueSeparatorRE = new RegExp(config.elastic.idValueSeparator, 'g');
    return {
      total: result.total,
      values: result.values
        .map((v) => {
          switch (field) {
            case 'people':
            case 'companies':
            case 'addresses':
            case 'countries':
              if ((v.value.match(valueSeparatorRE) || []).length === 1) {
                const [id, value] = v.value.split(config.elastic.idValueSeparator);
                return {
                  id,
                  label: value,
                  count: v.count,
                };
              } else return undefined;
            default:
              return {
                id: v.value,
                label: v.value + '',
                count: v.count,
              };
          }
        })
        .filter((v): v is { id: string; label: string; count: number } => v !== undefined),
    };
  }
}
