import { Me } from "./me";
require("firebase-admin");

export type Context = {
  me: Me;
  database: FirebaseFirestore.Firestore;
};
