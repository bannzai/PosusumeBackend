import admin = require("firebase-admin");
admin.initializeApp();

exports.writeSpotImageURLOnResized = require("./functions/writeSpotImageURLOnResized/function");
exports.setUserID = require("./functions/setUserID/function");
exports.detectLabel = require("./functions/detectLabel/function");
