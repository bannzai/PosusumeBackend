import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import admin = require("firebase-admin");
import { resolvers } from "../src/resolvers/resolver";
import { setUserIDForMe } from "@posusume/graphql";
import { ApolloServerExpressConfig } from "apollo-server-express";
import { GraphQLSchema } from "graphql/type/schema";

let schema: GraphQLSchema = (function () {
  return loadSchemaSync(
    join(
      process.env["APP_GRAPHQL_SCHMA_PATH"]!,
      "../../graphql/schemas/schema.graphql"
    ),
    {
      loaders: [new GraphQLFileLoader()],
    }
  );
})();

export const config: ApolloServerExpressConfig = {
  schema: addResolversToSchema({ schema, resolvers }),
  introspection: process.env["APP_ENVIRONMENT"] === "DEVELOPMENT",
  context: async (expressContext) => ({
    me: await setUserIDForMe(expressContext.req),
    database: admin.firestore(),
  }),
  debug: process.env["APP_ENVIRONMENT"] === "DEVELOPMENT",
};
