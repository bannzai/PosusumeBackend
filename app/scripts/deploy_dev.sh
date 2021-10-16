#!/bin/bash
set -euo pipefail

COMMIT_HASH=$(git rev-parse HEAD)
DOCKER_IMAGE="$APP_DEVELOPMENT_DOCKER_IMAGE_BASE_PATH:$COMMIT_HASH"
echo "docker build name and push to $DOCKER_IMAGE"

# Avoid error for M1 mac
# https://stackoverflow.com/questions/66127933/cloud-run-failed-to-start-and-then-listen-on-the-port-defined-by-the-port-envi
docker build --platform linux/amd64 -t "$DOCKER_IMAGE" --target runner .
docker push "$DOCKER_IMAGE"
gcloud run deploy $APP_DEV_SERVICE_NAME \
  --image $DOCKER_IMAGE \
  --port $APP_DEV_SERVER_PORT \
  --project $APP_DEV_GCP_PROJECT_ID \
  --region $APP_DEV_GCP_REGION \
  --set-env-vars APP_FIREBASE_AUTH_TEST_USER_ID=${APP_FIREBASE_AUTH_TEST_USER_ID:-""},APP_ENVIRONMENT=DEVELOPMENT \
  --allow-unauthenticated \
  --quiet
