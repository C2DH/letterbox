# Makefile for Monorepo Docker Builds

# ----------------------------------------
# Configuration Variables
# ----------------------------------------
# Define the image names
CLIENT_IMAGE_NAME = c2dhunilu/letterbox-client
SERVER_IMAGE_NAME = c2dhunilu/letterbox-server

# Define the Dockerfile paths
CLIENT_DOCKERFILE = Dockerfile.client
SERVER_DOCKERFILE = Dockerfile.server

# ----------------------------------------
# Dynamic Build Arguments (Git/Date)
# ----------------------------------------
# Use shell variables to get the dynamic values
BUILD_DATE := $(shell date -u +'%Y-%m-%dT%H:%M:%SZ')
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
GIT_COMMIT_SHA := $(shell git rev-parse --short HEAD)
GIT_LAST_COMMIT_DATE := $(shell git log -1 --format=%cd --date=format:%Y-%m-%d)

# Tag variable - allows overriding on the command line (e.g., make build-client TAG=v1.0.0)
TAG ?= latest 

# ----------------------------------------
# Targets
# ----------------------------------------
.PHONY: all build-client build-server

# Build both client and server
all: build-client build-server

# Target: Build the Client Image
build-client:
	@echo "=========================================================="
	@echo "Building client image: $(CLIENT_IMAGE_NAME):$(TAG)"
	@echo "=========================================================="
	docker build -f $(CLIENT_DOCKERFILE) -t $(CLIENT_IMAGE_NAME):$(TAG) \
		--build-arg BUILD_DATE=$(BUILD_DATE) \
		--build-arg GIT_TAG=$(TAG) \
		--build-arg GIT_BRANCH=$(GIT_BRANCH) \
		--build-arg GIT_COMMIT_SHA=$(GIT_COMMIT_SHA) \
		--build-arg GIT_LAST_COMMIT_DATE=$(GIT_LAST_COMMIT_DATE) ../../. 
	@echo "Client build successful! Image tagged as $(CLIENT_IMAGE_NAME):$(TAG)"

# Target: Build the Server Image
build-server:
	@echo "=========================================================="
	@echo "Building server image: $(SERVER_IMAGE_NAME):$(TAG)"
	@echo "=========================================================="
	docker build -f $(SERVER_DOCKERFILE) -t $(SERVER_IMAGE_NAME):$(TAG) \
		--build-arg BUILD_DATE=$(BUILD_DATE) \
		--build-arg GIT_TAG=$(TAG) \
		--build-arg GIT_BRANCH=$(GIT_BRANCH) \
		--build-arg GIT_COMMIT_SHA=$(GIT_COMMIT_SHA) \
		--build-arg GIT_LAST_COMMIT_DATE=$(GIT_LAST_COMMIT_DATE) ../../.
	@echo "Server build successful! Image tagged as $(SERVER_IMAGE_NAME):$(TAG)"