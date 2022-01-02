import admin = require("firebase-admin");
admin.initializeApp();

exports.writeSpotImageURLOnResized = require("./functions/writeSpotImageURLOnResized/function");
exports.setUserID = require("./functions/setUserID/function");
exports.emotionalise = require("./functions/emotionalise/function");
