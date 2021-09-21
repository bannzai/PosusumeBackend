import { Me } from "./me";
import admin = require("firebase-admin");

export type Context = {
  me: Me | null;
  database: admin.firestore;
};

export const setUserIDForMe = async (
  request: express.Request
): Promise<Context["me"]> => {
  if (
    process.env["APP_ENVIRONMENT"] === "DEVELOPMENT" &&
    process.env["APP_FIREBASE_AUTH_TEST_USER_ID"] != null
  ) {
    return {
      userID: process.env["APP_FIREBASE_AUTH_TEST_USER_ID"],
    };
  }

  const authorization = request.headers.authorization;
  if (authorization == null) {
    return null;
  }
  const splited = authorization.split(" ");
  if (splited.length !== 2) {
    return null;
  }
  const bearer = splited[0];
  if (bearer !== "Bearer") {
    return null;
  }

  const token = splited[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const userID = decodedToken.uid;

  return {
    userID: userID,
  };
};
