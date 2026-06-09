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

By modifying those variables you can decide to spread the databases services on multiple machines. The PDF repository can also be set-up on a remote machine. In that case make sure that the web server serving the PDF files allow CROSS Domain requests from the client domain.

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

## Production on debian (without docker)

To deploy for production one can install all required services without docker directly on the host.

### install and configure Firewall

```bash
apt install ufw
ufw enable
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
```

See [Official documentation](https://wiki.debian.org/Uncomplicated%20Firewall%20%28ufw%29)

### Create a dedicated folder and user account for the app

```bash
# home directory
mkdir /data/letterbox
# app code
mkdir /data/letterbox/app
mkdir /data/letterbox/data
useradd letterbox
# remove the possibility to open a session by removing bash and add home folder as /data/letterbox
vi /etc/passwd
chown letterbox:letterbox /data/letterbox
su letterbox
git clone https://github.com/C2DH/letterbox.git /data/letterbox/app
```

### Install & configure Neo4J

#### install

Follow [official documentation from Neo4J](https://neo4j.com/docs/operations-manual/current/installation/linux/debian/) to install the database on a debian system

Check the neo4j version in the docker file.

Add the apoc plugin : [https://neo4j.com/docs/apoc/current/installation/#apoc](https://neo4j.com/docs/apoc/current/installation/#apoc)

#### configure

To configure, edit `/etc/neo4j/neo4j.conf`. For Letterbox it's important to give enough memory by augmenting

```bash
    server.memory.heap.max_size=4096m
    server.memory.pagecache.size=20g
```

#### restore database

If your need to restore a previous neo4j database data folder, untar the files in `/var/lib/neo4j/data`.
Do that before starting neo4j service.

### Install & configure ElasticSearch

#### install ElasticSearch

[https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-elasticsearch-with-debian-package](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-elasticsearch-with-debian-package)

### configure

in `elasticsearch.yaml`

```yaml
discovery.type=single-node
xpack.security.enabled=false
```

in `jvm.options`

```
-Xms4g -Xmx4g
```

### Server and client apps

#### Install

Install node using nvm as recommended in [official documentation](https://nodejs.org/en/download)

Then install dependencies and build

```bash
cd code
npm install
npm run build
```

#### Configure

Create env variables in the `~/.bash_profile` script:

```bash
#
# Neo4j configuration
#
NEO4J_VERSION=5-community

NEO4J_LOGIN=neo4j
NEO4J_PASSWORD=l3tm31n!

#
# ES configuration
#
ELASTICSEARCH_MAX_PARALLEL_UPDATE=2


#
# Project configuration
#
CLIENT_PORT=5173
SERVER_PORT=4000

#
# Application config
#
ELASTICSEARCH_URL=http://localhost:9200
NEO4J_URL=bolt://localhost:7687
DATA_FOLDER=/data/letterbox/data

#
# Client
#
VITE_PDF_URL=/pdf/
```

#### install and configure pm2

```bash
npm install pm2@latest -g
```

### Install and configure nginx

See [official install documentation](https://nginx.org/en/linux_packages.html#Debian).

For configuration use something like:

```nginx
upstream server {
  server localhost:4000;
}

server {
    listen 80;
    server_name {CUSTOM_DOMAIN};
    root /var/www/html;
    return 301 https://{CUSTOM_DOMAIN}$request_uri;
}

server {
  listen 443 ssl;
  server_name {CUSTOM_DOMAIN};

  # SSL configuration: managed automatically by certbot

  # basic auth
  auth_basic  "Restricted Access";
  auth_basic_user_file /data/letterbox/.htpasswd;


  client_max_body_size 50M;

  location /graphql {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_set_header Cookie $http_cookie;
    proxy_read_timeout 15m;
    proxy_connect_timeout 15m;
    proxy_pass http://server;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }

  location /pdf/ {
    root /data/letterbox/data;
  }

  location / {
    root /data/letterbox/app/client/dist;
    try_files $uri $uri/ /index.html;
  }
}

```

add SSL with certbot : https://certbot.eff.org/instructions?ws=nginx&os=snap

```bash

snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot

certbot --nginx -d {CUSTOM_DOMAIN}
nginx -s reload
```

Create user accounts for basic auth

```bash
htpasswd -c /data/letterbox/.htpasswd user1
```

### Start the app

Start the API

```bash
cd ~
pm2 start app/code/server/build/index.js --name API
pm2 startup systemd
pm2 save
```

Index the Neo4J data into ElasticSearch

```bash
cd ~/code/server
npm run dataset:index
```

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

## Docker Images for C2DH

Docker images for both client and server are built and published to Docker Hub via GitHub Actions, availble as [c2dhunilu/letterbox-client](https://hub.docker.com/r/c2dhunilu/letterbox-client) and [c2dhunilu/letterbox-server](https://hub.docker.com/r/c2dhunilu/letterbox-server).
You can build it locally using Makefile:

```bash
cd docker/c2dhunilu
make build-client
make build-server
```

The actions `.github/workflows/docker-build-publish-client.yml` and `.github/workflows/docker-build-publish-server.yml` contain the workflow to build and publish the images automatically on each push related to `code/client` or `code/server` content to the main branch.
Note that the client docker image, whose code source is located in `code/client`, consists only of static files (HTML, CSS, JS).

the folder `docker/c2dhunilu` contains a `docker-compose.yml` file that allows deployment of an instance of Letterbox. Create a `.env`file with the following:

```bash
ELASTICSEARCH_JVM_OPTS=-Xms512m -Xmx512m
ELASTICSEARCH_MAX_PARALLEL_UPDATE=2
NEO4J_LOGIN=************
NEO4J_PASSWORD=*******
NEO4J_HEAP=512m
NEO4J_PAGECACHE=512m
```

Add the csv data as specified above, then run the import using the script included in the server image:

```bash
docker exec -it c2dhunilu-server-1 /bin/sh
cd bin
node dataset-import.js
```
