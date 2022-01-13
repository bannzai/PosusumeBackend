import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { User } from "@posusume/graphql/types/generated/graphql";
import { v4 as uuidv4 } from "uuid";

const database = admin.firestore();

module.exports = functions.auth.user().onCreate(async (authUser) => {
  const id = authUser.uid;
  const user: User = {
    id,
    name: uuidv4(),
    resizedProfileImageURLs: {},
  };
  await database.doc(`users/${id}`).set(user, { merge: true });
});
