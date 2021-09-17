import admin = require("firebase-admin");

admin.initializeApp();

export const firestore = admin.firestore();
