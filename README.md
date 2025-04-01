# Letter Box

## Production

## Development

We recommend using docker for local dev environment.

### start docker stack

```bash
cd docker
docker compose -p letterbox up
```

### import data

Add the dataset txt files into `docker/project/data/messages/`.

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
