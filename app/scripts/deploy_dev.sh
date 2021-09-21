#!/bin/bash
set -euo pipefail

COMMIT_HASH=$(git rev-parse HEAD)
DOCKER_IMAGE="$APP_DEVELOPMENT_DOCKER_IMAGE_BASE_PATH:$COMMIT_HASH"
echo "docker build name and push to $DOCKER_IMAGE"

docker build -t "$DOCKER_IMAGE" --target runner .
docker push "$DOCKER_IMAGE"
gcloud run deploy $APP_DEV_SERVICE_NAME \
  --image $DOCKER_IMAGE \
  --port $APP_DEV_SERVER_PORT \
  --project $APP_DEV_GCP_PROJECT_ID \
  --region $APP_DEV_GCP_REGION \
  --allow-unauthenticated \
  --quiet
