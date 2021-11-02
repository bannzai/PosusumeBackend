import * as fft from "firebase-functions-test";
import { FeaturesList } from "firebase-functions-test/lib/features";

export function firebaseFunctionsTest(): FeaturesList {
  return fft(
    {
      databaseURL: process.env["APP_FIRESTORE_DATABASE_URL"],
      storageBucket: process.env["APP_STORAGE_BUCKET"],
      projectId: process.env["GCLOUD_PROJECT"],
    },
    `${__dirname}/firebase-service-account.json`
  );
}
