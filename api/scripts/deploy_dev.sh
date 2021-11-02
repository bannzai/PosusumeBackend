#!/bin/bash
set -euo pipefail

COMMIT_HASH=$(git rev-parse HEAD)
DOCKER_IMAGE="$DEV_POSUSUME_DOCKER_IMAGE_BASE_PATH:$COMMIT_HASH"
echo "docker build name and push to $DOCKER_IMAGE"

# Avoid error for M1 mac
# https://stackoverflow.com/questions/66127933/cloud-run-failed-to-start-and-then-listen-on-the-port-defined-by-the-port-envi
docker build --platform linux/amd64 -t "$DOCKER_IMAGE" --target runner .
docker push "$DOCKER_IMAGE"
gcloud run deploy $DEV_POSUSUME_SERVICE_NAME \
  --image $DOCKER_IMAGE \
  --port $DEV_POSUSUME_API_PORT \
  --project $DEV_POSUSUME_GCP_PROJECT_ID \
  --region $DEV_POSUSUME_GCP_REGION \
  --set-env-vars APP_FIREBASE_AUTH_TEST_USER_ID=${APP_FIREBASE_AUTH_TEST_USER_ID:-""},APP_ENVIRONMENT=DEVELOPMENT \
  --allow-unauthenticated \
  --quiet
