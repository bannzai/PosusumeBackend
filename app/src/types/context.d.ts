import { Me } from "./me";
import admin = require("firebase-admin");

export type Context = {
  me: Me | null;
  database: FirebaseFirestore.Firestore;
};
