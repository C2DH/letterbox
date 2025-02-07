export default {
  server: {
    port: process.env.SERVER_PORT || 4000,
  },
  elastic: {
    host: process.env.ELASTICSEARCH_URL || 'http://localhost:9200/',
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
