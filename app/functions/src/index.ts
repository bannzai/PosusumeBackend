import admin = require("firebase-admin");
admin.initializeApp();

exports.writeSpotImageURLOnResized = require("./functions/writeSpotImageURLOnResized/function");
