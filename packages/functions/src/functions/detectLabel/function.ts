// Reference from https://github.com/firebase/functions-samples/blob/561d73b0357f4b03f4952242ee9513d57708f068/vision-annotate-images/functions/src/index.ts

import * as functions from "firebase-functions";
import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

// This will allow only requests with an auth token to access the Vision
// API, including anonymous ones.
// It is highly recommended to limit access only to signed-in users. This may
// be done by adding the following condition to the if statement:
//    || context.auth.token?.firebase?.sign_in_provider === 'anonymous'
//
// For more fine-grained control, you may add additional failure checks, ie:
//    || context.auth.token?.firebase?.email_verified === false
// Also see: https://firebase.google.com/docs/auth/admin/custom-claims
module.exports = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "emotionalise must be called while authenticated."
    );
  }

  return await client.annotateImage(JSON.parse(JSON.stringify(data)));
});
