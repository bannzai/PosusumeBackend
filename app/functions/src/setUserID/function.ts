import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { Spot } from "../../../src/types/generated/graphql";

const database = admin.firestore();

module.exports = functions.auth.user().onCreate(async (user) => {
  const id = user.uid;
  await database.doc(`users/${id}`).set({ id }, { merge: true });
});
