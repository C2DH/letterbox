export default {
  server: {
    port: process.env.SERVER_PORT || 4000,
    data_folder: process.env.DATA_FOLDER || './data',
    import: {
      headers: [
        'year',
        'company',
        'company_spare',
        'address_spare',
        'address',
        'people',
        'people_abbr',
        'countries',
        'message',
      ],
      column_seperator: ' &&&***&&& ',
      value_separator: ' *_* ',
      // path relative to the data folder
      path: '/',
      file_glob_pattern: '*.txt',
      batchSize: 10,
    },
  },
  elastic: {
    node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200/',
  },
  neo4j: {
    url: process.env.NEO4J_URL || 'bolt://localhost:7687',
    login: process.env.NEO4J_LOGIN || 'neo4j',
    password: process.env.NEO4J_PASSWORD || 'admin',
    options: {
      disableLosslessIntegers: true,
      fetchSize: 10000,
      connectionAcquisitionTimeout: 60000,
    },
  },
  logs: {
    filter: process.env.LOG_FILTERS || '.*',
    console_level: process.env.LOG_CONSOLE_LEVEL || 'debug',
    file_level: process.env.LOG_FILE_LEVEL || 'error',
    file_maxsize: process.env.LOG_FILE_MAXSIZE || '25m',
    file_retention: process.env.LOG_FILE_RETENTION || '7d',
    file_path: process.env.LOG_FILE_PATH || './',
  },
};
