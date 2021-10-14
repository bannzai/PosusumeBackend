import * as functions from "firebase-functions";
import admin = require("firebase-admin");

export const database = admin.firestore();

module.exports = functions.storage
  .object()
  .onFinalize(async (object, context) => {
    if (object.name == null) {
      functions.logger.log("it is skip pattern for object.name is null");
      return;
    }
    const filepath = object.name;
    functions.logger.log(JSON.stringify({ filepath }));

    const metadata = object.metadata;
    functions.logger.log(JSON.stringify({ metadata }));
    if (metadata == null) {
      functions.logger.log("it is skip pattern for metadata is null");
      return;
    }

    const firebaseStorageDownloadTokens =
      metadata["firebaseStorageDownloadTokens"];
    if (firebaseStorageDownloadTokens == null) {
      functions.logger.log(
        `it is skip pattern for firebaseStorageDownloadTokens is not found ${JSON.stringify(
          { metadata }
        )}`
      );
      return;
    }

    const matches = filepath.match(/users\/(.+)\/spots\/(.+)\/resized\/(.+)/);
    if (matches == null) {
      functions.logger.log(
        `it is skip pattern for not matche for resized spots image URL in ${filepath}`
      );
      return;
    }
    functions.logger.log(JSON.stringify({ matches }));

    if (matches.length !== 4) {
      functions.logger.error(
        `unexpected regex mismatch. count: ${
          matches.length
        } values: ${JSON.stringify({ matches, filepath })}`
      );
      return;
    }

    const bucket = admin.storage().bucket(object.name);
    functions.logger.log(JSON.stringify({ bucket }));

    const userID = matches[1];
    const spotID = matches[2];
    const resizedImageID = matches[3];
    const token = firebaseStorageDownloadTokens;
    const resizedImageURLs: string[] = [
      buildStorageURL({
        userID,
        spotID,
        resizedImageID,
        token,
      }),
    ];
    await database.doc(`users/${userID}/spots/${spotID}`).set(
      {
        resizedImageURLs,
      },
      { merge: true }
    );
  });

function buildStorageURL(args: {
  userID: string;
  spotID: string;
  resizedImageID: string;
  token: string;
}): string {
  const { userID, spotID, resizedImageID, token } = args;
  return `https://firebasestorage.googleapis.com/v0/b/${process.env.GCLOUD_PROJECT}.appspot.com/o/users%2F${userID}%2Fspots%2F${spotID}%2Fresized%2F${resizedImageID}?alt=media&token=${token}`;
}
