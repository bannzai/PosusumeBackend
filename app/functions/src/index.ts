import admin = require("firebase-admin");
admin.initializeApp();

exports.writeSpotImageURLOnResized = require("./writeSpotImageURLOnResized/function");
exports.setUserID = require("./setUserID/function");
