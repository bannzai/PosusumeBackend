import { ApolloServer, AuthenticationError } from "apollo-server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { Resolvers } from "./types/generated/graphql";
import { Context } from "./types/context";

import admin = require("firebase-admin");
import express = require("express");

admin.initializeApp();

// サンプルデータの定義
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const schema = loadSchemaSync(join(__dirname, "../schemas/schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = {
  Query: {
    books: (_parent, _args, _context) => {
      return books;
    },
  },
  Mutation: {
    addBook: async (_parent, _args, _context) => {
      await admin
        .firestore()
        .collection(`users/${_context.me!.userID}/books`)
        .doc()
        .set(
          {
            title: "Give me star",
            author: "bannzai",
          },
          { merge: true }
        );
      return {
        title: "Give me star",
        author: "bannzai",
      };
    },
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const setUserIDForMe = async (
  request: express.Request
): Promise<Context["me"]> => {
  if (
    process.env["APP_ENVIRONMENT"] === "DEVELOPMENT" &&
    process.env["APP_FIREBASE_AUTH_TEST_USER_ID"] != null
  ) {
    return {
      userID: process.env["APP_FIREBASE_AUTH_TEST_USER_ID"],
    };
  }

  const authorization = request.headers.authorization;
  if (authorization == null) {
    return null;
  }
  const splited = authorization.split(" ");
  if (splited.length !== 2) {
    return null;
  }
  const bearer = splited[0];
  if (bearer !== "Bearer") {
    return null;
  }

  const token = splited[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const userID = decodedToken.uid;

  return {
    userID: userID,
  };
};

const server = new ApolloServer({
  schema: schemaWithResolvers,
  introspection: true,
  context: async (expressContext) => ({
    me: await setUserIDForMe(expressContext.req),
  }),
  debug: process.env["APP_ENVIRONMENT"] === "DEVELOPMENT",
});

const port = process.env.PORT || 8081;
server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
