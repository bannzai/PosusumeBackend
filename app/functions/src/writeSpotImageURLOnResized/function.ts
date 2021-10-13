import * as functions from "firebase-functions";
import admin = require("firebase-admin");

export const database = admin.firestore();

module.exports = functions.storage
  .object()
  .onFinalize(async (object, context) => {
    const bucket = admin.storage().bucket(object.bucket);
    const filesList = await bucket.makePublic({ includeFiles: true });
    functions.logger.log(JSON.stringify({ filesList }));
  });
