# Letter Box

## Development of the client with proxied API

For local development using a remote API server, configure the proxy settings in your local environment:

1. Create or edit `code/client/.env.development.local`
2. Set the following variables:

- `VITE_PROXY_API_TARGET`: Point to your API server
- `VITE_GRAPHQL_SCHEMA_URL`: Point to the `/graphql` endpoint

```bash
cd code/client
npm install
npm run dev-client
```

Defaults value are:

```env
VITE_PROXY_API_TARGET=http://localhost:3000
VITE_GRAPHQL_SCHEMA_URL=http://localhost:4000/graphql
```

This setup allows you to develop the client while connecting to a remote API instance.

## Production with docker

To deploy for production one can use docker in prod mode.

### First step: review .env file

First take a close look at `docker/.env` file which contains all configuration variables.
Here are a selection of the most important variables to review:

**Memory allocation**

```bash
NEO4J_HEAP=4096m
NEO4J_PAGECACHE=2g
ELASTICSEARCH_JVM_OPTS="-Xms4g -Xmx4g"
```

**Network configuration**

```bash
ELASTICSEARCH_PORT=9200
ELASTICSEARCH_URL=http://elasticsearch:${ELASTICSEARCH_PORT}
NEO4J_PORT_BOLT=7687
NEO4J_URL=bolt://neo4j:${NEO4J_PORT_BOLT}
VITE_PDF_URL=http://localhost/pdf/
```

By modifying those variables you can decide to spread the databases services on multiple machines. The PDF repository can also be set-up on a remote machhine. In that case make sure that the web server serving the PDF files allow CROSS Domain requests from the client domain.

**Auth**

```bash
NEO4J_LOGIN=neo4j
NEO4J_PASSWORD=l3tm31n!
```

### Start the services

To start all the services at once on the same machine:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml -p letterbox up
```

To start only neo4j:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml -p letterbox up neo4j
```

To start only elasticsearch:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml -p letterbox up elasticsearch
```

To start server and client:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml -p letterbox up project letterbox
```

### Import data

First copy the CSV files into the docker project data folder
Add the dataset txt files into `docker/project/data/messages/`.
Add tags csv files into `docker/project/data/tags/`.
Tags must be named from entities type and contain tow columns: `name` and `tags`.
`tags` must be separated by a `|` separator.

To import all available data

```bash
cd code/server
npm run dataset:import
npm run init
```

To import only a subset using a regexp pattern on PDF filenames

```bash
cd code/server
npm run dataset:import -- 196.*
npm run init
```

### PDF files

If the PDF files need to be served directly by the docker client nginx, you have to place those files into `docker/nginx/data/pdf` without any subfolders.

## Development

We recommend using docker for local dev environment.

### start docker stack

```bash
cd docker
docker compose -p letterbox up
```

### import data

Add the dataset txt files into `docker/project/data/messages/`.
Add tags csv files into `docker/project/data/tags/`.
Tags must be named from entities type and contain tow columns: `name` and `tags`.
`tags` must be separated by a `|` separator.

```bash
cat docker/project/data/tags/person.csv
name,tags
Joe Itch,lawyer|notary
```

Run import/index script

```bash
cd code/server
npm run dataset:import
```

This script does import in Neo4J and index into Elaticsearch

### create Neo4J indices

```bash
cd code/server
npm run init
```

### URLs

See docker/.env for configuration details.

Web application is served at http://localhost.
The Graphql API is served at http://localhost:4000.
The Apollo web admin is served at http://localhost/graphql.

### Server API types

If you change the GraphQL schema on the server, you need to update the types on client side by running:

```bash
cd code/client
npm run generate
```
