import { getLogger } from '@ouestware/node-logger';
import { JoinOption, generateId } from 'better-auth';
import { CustomAdapter, Where, createAdapterFactory } from 'better-auth/adapters';
import { isArray, isNil, mapValues, pick } from 'lodash';

import config from '~/config';
import { Neo4j } from '~/services/neo4j';

const log = getLogger('AUTH');

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type Neo4jAdapterConfig = typeof config.neo4j;

export const neo4jAdapter = (config: Neo4jAdapterConfig) => {
  const neo4j = new Neo4j(config);

  return createAdapterFactory({
    config: {
      adapterId: 'neo4j-adapter',
      adapterName: 'Neo4j Adapter',
      usePlural: false,
      debugLogs: false,
      supportsJSON: false,
      supportsDates: true,
      supportsBooleans: true,
      supportsNumericIds: false,
      supportsArrays: true,
      supportsUUIDs: false,
      // // We do the join directly in queries, so we need the join parameter in findX functions
      disableTransformJoin: true,
      // // We disable outpout, otherwise mutli queries are done for retrieving join
      disableTransformOutput: true,
      // // When do a join, we don't jkknow if its an array or a single value
      // // So we need a custom transform out put for that
      // customTransformOutput: (props) => {
      //   log.debug('customTransformOutput', omit(props, ['schema']));
      //   return props.data;
      // },
    },
    adapter: ({ schema }) => {
      // For each model, we store its DB name
      const modelToDbMapping = mapValues(schema, (model) => model.modelName);
      // For each db model, we store its model name
      const dbToModelMapping = Object.fromEntries(Object.entries(modelToDbMapping).map(([key, value]) => [value, key]));

      // For each model, we store the mapping  DATA => DB
      const dataToDbFieldnameByModel = mapValues(schema, (model) =>
        Object.fromEntries(
          Object.entries(model.fields).map(([field, fieldDef]) => [field, fieldDef.fieldName || field]),
        ),
      );
      // For each model, we store the mapping  DB => DATA
      const dbToDataFieldnameByModel = mapValues(dataToDbFieldnameByModel, (fieldMapping) =>
        Object.fromEntries(Object.entries(fieldMapping).map(([key, value]) => [value, key])),
      );

      // For each model, we store a full object where all properties are null
      const nullableResultByModel = mapValues(schema, (model) =>
        Object.fromEntries(
          Object.entries(mapValues(model.fields, () => null)).map(([key, value]) => [
            dataToDbFieldnameByModel[model.modelName]?.[key] || key,
            value,
          ]),
        ),
      );

      // Cast a DB record to a model by changing fieldnames
      function castRecordFromDb(
        model: string,
        data: Record<string, unknown>,
        joins?: string[],
      ): Record<string, unknown> {
        return {
          ...nullableResultByModel[model],
          ...Object.fromEntries(
            Object.entries(data as Record<string, unknown>).map(([field, value]) => {
              const key = dbToDataFieldnameByModel[model]?.[field] || field;
              let v = isNil(value) ? null : value;
              if (v && (joins || []).includes(key)) {
                if (isArray(v))
                  v = v.map((e) => castRecordFromDb(key, { ...(nullableResultByModel[key] || {}), ...e }));
                else v = castRecordFromDb(key, { ...(nullableResultByModel[key] || {}), ...v });
              }
              return [key, v];
            }),
          ),
        };
      }
      // Cast a DB record to a model by changing fieldnames
      function castRecordToDb(model: string, data: unknown, forceId = false): unknown {
        if (typeof data === 'object') {
          const result = Object.fromEntries(
            Object.entries(data as Record<string, unknown>).map(([field, value]) => [
              dataToDbFieldnameByModel[model]?.[field] || field,
              isNil(value) ? null : value,
            ]),
          );
          if (forceId && !result.id) {
            result.id = generateId();
          }
          return result;
        }
        return data;
      }

      // Cast a better-auth where clause to a cypher one
      function castToNeo4jWhere(
        _model: string,
        where: Required<Where>[] | undefined,
      ): null | { clause: string; params: Record<string, unknown> } {
        if (!where || where.length === 0) return null;

        const params: Record<string, unknown> = {};
        const clauses: string[] = [];
        let isOr = false;
        let isAnd = false;

        where.forEach((w, index) => {
          const paramName = `filter${index}`;
          params[paramName] = w.value;

          if (w.connector === 'AND') isAnd = true;
          if (w.connector === 'OR') isOr = true;
          const whereFieldDb = w.field;

          switch (w.operator) {
            case 'eq':
              if (w.value) clauses.push(`n.\`${whereFieldDb}\` = $${paramName}`);
              else clauses.push(`n.\`${whereFieldDb}\` IS NULL`);
              break;
            case 'ne':
              if (w.value) clauses.push(`n.\`${whereFieldDb}\` <> $${paramName}`);
              else clauses.push(`NOT n.\`${whereFieldDb}\` IS NULL`);
              break;
            case 'lt':
              clauses.push(`n.\`${whereFieldDb}\` < $${paramName}`);
              break;
            case 'lte':
              clauses.push(`n.\`${whereFieldDb}\` <= $${paramName}`);
              break;
            case 'gt':
              clauses.push(`n.\`${whereFieldDb}\` > $${paramName}`);
              break;
            case 'gte':
              clauses.push(`n.\`${whereFieldDb}\` >= $${paramName}`);
              break;
            case 'in':
              clauses.push(`n.\`${whereFieldDb}\` IN $${paramName}`);
              break;
            case 'not_in':
              clauses.push(`NOT n.\`${whereFieldDb}\` IN $${paramName}`);
              break;
            case 'contains':
              clauses.push(`n.\`${whereFieldDb}\` CONTAINS $${paramName}`);
              break;
            case 'starts_with':
              clauses.push(`n.\`${whereFieldDb}\` STARTS WITH $${paramName}`);
              break;
            case 'ends_with':
              clauses.push(`n.\`${whereFieldDb}\` ENDS WITH $${paramName}`);
              break;
          }
        });

        if (isAnd === isOr) throw new Error("Don't know how to do OR & AND in filters");

        return {
          clause: clauses.join(isAnd ? ' AND ' : ' OR '),
          params,
        };
      }

      // Cast a better-auth order clause to a cypher one
      function castToNeo4jOrderBy(sortBy: { field: string; direction: 'asc' | 'desc' }): string {
        return `n.${sortBy.field} ${sortBy.direction}`;
      }

      function castToNeo4jReturn(model: string, join?: JoinOption) {
        const selects: string[] = [
          '.*',
          ...Object.entries(join || {}).map(([modelName, opts]) => {
            const dbLabel = capitalizeFirst(modelToDbMapping[modelName] || modelName);
            const isArray = Object.values(schema[modelName].fields).some(
              (f) => f.references?.model === model && !f.unique,
            );
            let limit = 100;
            if (typeof opts === 'object') limit = opts.limit || 100;
            return `${modelName}${isArray ? '' : ''} : ${!isArray ? 'head' : ''}([(n)--(m:\`${dbLabel}\`)  | properties(m) ])${isArray ? `[..${limit}]` : ''}`;
          }),
        ];
        return `n {
          ${selects.join(',')}
        }`;
      }

      function getCascade(currentModel: string) {
        const cascade: string[] = [];
        Object.entries(schema).forEach(([model, modelDef]) => {
          if (
            Object.values(modelDef.fields).some(
              (f) => f.references?.onDelete === 'cascade' && f.references?.model === currentModel,
            )
          )
            cascade.push(capitalizeFirst(modelToDbMapping[model] || model));
        });
        return cascade;
      }

      return {
        create: async <T>(inputs: Parameters<CustomAdapter['create']>[0]) => {
          const { data, model, select } = inputs;
          log.debug('create', { data, model, select });
          const modelID = dbToModelMapping[model];
          const modelDef = schema[modelID];
          if (!modelDef) throw new Error(`Model ${model} can't be found`);
          const modelLabel = capitalizeFirst(modelDef.modelName);

          const foreignKeys = modelDef
            ? Object.entries(modelDef.fields)
                .filter(([_, fieldDef]) => fieldDef.references)
                .map(([fieldName, fieldDef], index) => {
                  const refModel = fieldDef.references!.model;
                  const refDbModel = capitalizeFirst(modelToDbMapping[refModel] || refModel);
                  const refField = fieldDef.references!.field;
                  const refDbField = dataToDbFieldnameByModel[refModel]?.[refField] || refField;
                  const dataField = dataToDbFieldnameByModel[modelID]?.[fieldName] || fieldName;
                  return `CALL (n) {
                      MATCH  (source_${index}:\`${refDbModel}\` { \`${refDbField}\`: $data.\`${dataField}\` })
                      MERGE (source_${index})<-[:HAS_${refDbModel.toUpperCase()}]-(n)
                }`;
                })
            : [];

          const record = await neo4j.getFirstResultQuery<T>(
            ` CREATE (n:\`${modelLabel}\`) 
              SET n = $data 
              WITH n ${foreignKeys.join('\n')}
              RETURN ${castToNeo4jReturn(model)} AS result`,
            { data: castRecordToDb(model, data, true) },
          );

          const result = castRecordFromDb(modelID, record ?? {}) as T;
          return select ? (pick(result, select || []) as T) : result;
        },
        update: async <T>({ model, where, update }: Parameters<CustomAdapter['update']>[0]) => {
          log.debug('update', { model, where, update });
          const modelID = dbToModelMapping[model];
          const modelDef = schema[modelID];
          if (!modelDef) throw new Error(`Model ${model} can't be found`);
          const modelLabel = capitalizeFirst(modelDef.modelName);

          const neoWhere = castToNeo4jWhere(model, where);
          const record = await neo4j.getFirstResultQuery<T>(
            `MATCH (n:\`${modelLabel}\`) 
             ${neoWhere ? `WHERE ${neoWhere.clause}` : ''} 
             SET n += $update 
             RETURN ${castToNeo4jReturn(model)} AS result`,
            { update: castRecordToDb(model, update), ...(neoWhere ? neoWhere.params : {}) },
          );

          if (!record) return null;
          return castRecordFromDb(model, record) as T;
        },
        updateMany: async ({ model, where, update }: Parameters<CustomAdapter['updateMany']>[0]) => {
          log.debug('updateMany', { model, where, update });
          const modelID = dbToModelMapping[model];
          const modelDef = schema[modelID];
          if (!modelDef) throw new Error(`Model ${model} can't be found`);
          const modelLabel = capitalizeFirst(modelDef.modelName);

          const neoWhere = castToNeo4jWhere(model, where);
          const count = await neo4j.getFirstResultQuery<number>(
            `MATCH (n:\`${modelLabel}\`) 
             ${neoWhere ? `WHERE ${neoWhere.clause}` : ''} 
             SET n += $update 
             RETURN count(n) as result`,
            { update: castRecordToDb(model, update), ...(neoWhere ? neoWhere.params : {}) },
          );

          return count ?? 0;
        },
        delete: async ({ model, where }: Parameters<CustomAdapter['delete']>[0]) => {
          log.debug('delete', { model, where });
          log.debug('deleteMany', { model, where });
          const modelID = dbToModelMapping[model];
          const modelDef = schema[modelID];
          if (!modelDef) throw new Error(`Model ${model} can't be found`);
          const modelLabel = capitalizeFirst(modelDef.modelName);
          const cascade_ = getCascade(modelID);

          const neoWhere = castToNeo4jWhere(model, where);
          await neo4j.getFirstResultQuery<number>(
            `MATCH (n:\`${modelLabel}\`) ${neoWhere ? `WHERE ${neoWhere.clause}` : ''} 
             ${cascade_.length > 0 ? `OPTIONAL MATCH (n)--(m) WHERE head(labels(m)) IN $cascade_` : ''}
             DETACH DELETE n ${cascade_.length > 0 ? ', m' : ''}
             RETURN count(n) as result`,
            { ...(neoWhere ? neoWhere.params : {}), cascade_ },
          );
        },
        deleteMany: async ({ model, where }: Parameters<CustomAdapter['deleteMany']>[0]) => {
          log.debug('deleteMany', { model, where });
          const modelID = dbToModelMapping[model];
          const modelDef = schema[modelID];
          if (!modelDef) throw new Error(`Model ${model} can't be found`);
          const modelLabel = capitalizeFirst(modelDef.modelName);
          const cascade_ = getCascade(modelID);

          const neoWhere = castToNeo4jWhere(model, where);
          const count = await neo4j.getFirstResultQuery<number>(
            `MATCH (n:\`${modelLabel}\`) ${neoWhere ? `WHERE ${neoWhere.clause}` : ''} 
             ${cascade_.length > 0 ? `OPTIONAL MATCH (n)--(m) WHERE head(labels(m)) IN $cascade_` : ''}
             DETACH DELETE n ${cascade_.length > 0 ? ', m' : ''}
             RETURN count(n) as result`,
            { ...(neoWhere ? neoWhere.params : {}), cascade_ },
          );

          return count ?? 0;
        },
        consumeOne: async <T>({ model, where }: Parameters<NonNullable<CustomAdapter['consumeOne']>>[0]) => {
          log.debug('consumeOne', { model, where });
          const modelID = dbToModelMapping[model];
          const modelDef = schema[modelID];
          if (!modelDef) throw new Error(`Model ${model} can't be found`);
          const modelLabel = capitalizeFirst(modelDef.modelName);

          const neoWhere = castToNeo4jWhere(model, where);
          const record = await neo4j.getFirstResultQuery<T>(
            `MATCH (n:\`${modelLabel}\`) 
             ${neoWhere ? `WHERE ${neoWhere.clause}` : ''} 
             WITH n, ${castToNeo4jReturn(model)} AS result 
             DETACH DELETE n 
             RETURN result`,
            { ...(neoWhere ? neoWhere.params : {}) },
          );

          if (!record) return null;
          return castRecordFromDb(model, record) as T;
        },
        findOne: async <T>({ model, where, select, join }: Parameters<CustomAdapter['findOne']>[0]) => {
          log.debug('findOne', { model, where, select, join });
          const modelID = dbToModelMapping[model];
          const modelDef = schema[modelID];
          if (!modelDef) throw new Error(`Model ${model} can't be found`);
          const modelLabel = capitalizeFirst(modelDef.modelName);

          const neoWhere = castToNeo4jWhere(model, where);
          const record = await neo4j.getFirstResultQuery<T>(
            `MATCH (n:\`${modelLabel}\`) 
             ${neoWhere ? `WHERE ${neoWhere.clause}` : ''} 
             RETURN ${castToNeo4jReturn(model, join)} AS result`,
            { ...(neoWhere ? neoWhere.params : {}) },
          );

          if (!record) return null;
          const result = castRecordFromDb(modelID, record, Object.keys(join || {})) as T;
          return select ? (pick(result, [...(select || []), ...Object.keys(join || [])]) as T) : result;
        },
        findMany: async <T>({
          model,
          where,
          limit,
          select,
          sortBy,
          offset,
          join,
        }: Parameters<CustomAdapter['findMany']>[0]) => {
          log.debug('findMany', { model, where, limit, select, sortBy, offset, join });
          const modelID = dbToModelMapping[model];
          const modelDef = schema[modelID];
          if (!modelDef) throw new Error(`Model ${model} can't be found`);
          const modelLabel = capitalizeFirst(modelDef.modelName);

          const neoWhere = castToNeo4jWhere(model, where);
          const orderBy = sortBy ? `ORDER BY ${castToNeo4jOrderBy(sortBy)}` : '';
          const records = await neo4j.getResultQuery<T>(
            `MATCH (n:\`${modelLabel}\`) 
             ${neoWhere ? `WHERE ${neoWhere.clause}` : ''} 
             RETURN ${castToNeo4jReturn(model, join)} AS result
             ${orderBy}
             SKIP $offset
             LIMIT $limit
             `,
            { ...(neoWhere ? neoWhere.params : {}), offset: offset || 0, limit },
          );

          if (!records) return [];
          const results = records.map((record) => {
            const result = castRecordFromDb(modelID, record as Record<string, unknown>, Object.keys(join || {})) as T;
            return select ? (pick(result, [...(select || []), ...Object.keys(join || [])]) as T) : result;
          });
          return results;
        },
        count: async ({ model, where }: Parameters<CustomAdapter['count']>[0]) => {
          log.debug('count', { model, where });
          const modelID = dbToModelMapping[model];
          const modelDef = schema[modelID];
          if (!modelDef) throw new Error(`Model ${model} can't be found`);
          const modelLabel = capitalizeFirst(modelDef.modelName);

          const neoWhere = castToNeo4jWhere(model, where);
          const count = await neo4j.getFirstResultQuery<number>(
            `MATCH (n:\`${modelLabel}\`) 
             ${neoWhere ? `WHERE ${neoWhere.clause}` : ''} 
             RETURN count(n) as result`,
            { ...(neoWhere ? neoWhere.params : {}) },
          );

          return count ?? 0;
        },
        createSchema: async ({ file, tables }) => {
          log.debug('createSchema', tables);
          const queries: string[] = [];

          Object.entries(tables).forEach(async ([tableName, tableDef]) => {
            Object.entries(tableDef.fields).forEach(async ([fieldName, fieldDef]) => {
              if (fieldDef.unique)
                queries.push(
                  `CREATE CONSTRAINT ${tableName}_${fieldName}_unique IF NOT EXISTS FOR (n:\`${capitalizeFirst(tableName)}\`) REQUIRE n.\`${fieldName} IS UNIQUE`,
                );
            });
          });

          return {
            code: queries.join('\n'),
            path: file ?? './auth-schema.cypher',
          };
        },
      };
    },
  });
};
