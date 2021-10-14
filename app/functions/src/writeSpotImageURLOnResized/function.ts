import * as functions from "firebase-functions";
import admin = require("firebase-admin");

export const database = admin.firestore();

module.exports = functions.storage
  .object()
  .onFinalize(async (object, context) => {
    if (
      object.metadata == null ||
      object.metadata["firebaseStorageDownloadTokens"] != null
    ) {
      functions.logger.log(
        "it is skip pattern for object.metadata is null or firebaseStorageDownloadTokens is not found"
      );
      return;
    }
    if (object.name == null) {
      functions.logger.log("it is skip pattern for object.name is null");
      return;
    }
    const filepath = object.name;
    functions.logger.log(JSON.stringify({ filepath }));

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

    const userID = matches[1];
    const spotID = matches[2];
    const resizedImageID = matches[3];
    const resizedImageSize: ResizedImageSizeSuffix = "120x160";
    const token = object.metadata["firebaseStorageDownloadTokens"];
    const resizedImageURLs: string[] = [
      buildStorageURL({
        userID,
        spotID,
        resizedImageID,
        resizedImageSize,
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

type ResizedImageSizeSuffix = "120x160";

function buildStorageURL(args: {
  userID: string;
  spotID: string;
  resizedImageID: string;
  resizedImageSize: ResizedImageSizeSuffix;
  token: string;
}): string {
  const { userID, spotID, resizedImageID, resizedImageSize, token } = args;
  return `https://firebasestorage.googleapis.com/v0/b/${process.env.GCLOUD_PROJECT}.appspot.com/o/users/${userID}/spots/${spotID}/resized/${resizedImageID}_${resizedImageSize}?alt=media&token=${token}`;
}
