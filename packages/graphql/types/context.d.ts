import { Me } from "./me";
import admin = require("firebase-admin");

export type Context = {
  me: Me;
  database: FirebaseFirestore.Firestore;
};
