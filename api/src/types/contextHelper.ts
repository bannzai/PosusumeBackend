import { Context } from "./context";
import admin = require("firebase-admin");
import express = require("express");
import { Me } from "./generated/graphql";

export const setUserIDForMe = async (
  request: express.Request
): Promise<Context["me"]> => {
  const authorization = request.headers.authorization;

  if (process.env["APP_ENVIRONMENT"] === "DEVELOPMENT") {
    if (
      process.env["APP_FIREBASE_AUTH_TEST_USER_ID"] != null &&
      process.env["APP_FIREBASE_AUTH_TEST_USER_ID"].length !== 0
    ) {
      return {
        id: process.env["APP_FIREBASE_AUTH_TEST_USER_ID"],
      };
    }
    if (authorization == null) {
      // Allowed introspectino
      return {} as Me;
    }
  }

  if (authorization == null) {
    throw "Authorization header not found";
  }
  const splited = authorization.split(" ");
  if (splited.length !== 2) {
    throw "Unexpected Authorization header format";
  }
  const bearer = splited[0];
  if (bearer !== "Bearer") {
    throw "Unexpected Authorization header format";
  }

  const token = splited[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const userID = decodedToken.uid;

  return {
    id: userID,
  };
};
