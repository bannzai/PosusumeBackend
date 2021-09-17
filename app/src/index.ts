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
        .collection(`users/test_identifier/books`)
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
  const token = request.headers.authorization;
  if (token === undefined) {
    return {
      userID: null,
    };
  }

  let userID: string;
  if (process.env["APP_FIREBASE_AUTH_TEST_USER_ID"] != null) {
    userID = process.env["APP_FIREBASE_AUTH_TEST_USER_ID"];
  } else {
    const decodedToken = await admin.auth().verifyIdToken(token);
    userID = decodedToken.uid;
  }

  return {
    userID: userID,
  };
};

const server = new ApolloServer({
  schema: schemaWithResolvers,
  context: async (expressContext) =>
    ({
      me: await setUserIDForMe(expressContext.req),
    } as Context),
  debug: process.env["APP_ENVIRONMENT"] === "DEVELOPMENT",
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
