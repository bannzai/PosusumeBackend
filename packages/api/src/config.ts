import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import admin = require("firebase-admin");
import { resolvers } from "./resolvers/resolver";
import { setUserIDForMe } from "@posusume/graphql";
import { ApolloServerExpressConfig } from "apollo-server-express";

const schema = loadSchemaSync(
  join(__dirname, "../../../packages/graphql/schemas/schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

export const config: ApolloServerExpressConfig = {
  schema: addResolversToSchema({ schema, resolvers }),
  introspection: process.env["APP_ENVIRONMENT"] === "DEVELOPMENT",
  context: async (expressContext) => ({
    me: await setUserIDForMe(expressContext.req),
    database: admin.firestore(),
  }),
  debug: process.env["APP_ENVIRONMENT"] === "DEVELOPMENT",
};
