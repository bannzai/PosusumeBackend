import { ApolloServer, AuthenticationError } from "apollo-server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import admin = require("firebase-admin");
import { resolvers } from "./resolvers/root";
import { setUserIDForMe } from "./types/contextHelper";

admin.initializeApp();

const schema = loadSchemaSync(join(__dirname, "../schemas/schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const server = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers }),
  introspection: process.env["APP_ENVIRONMENT"] === "DEVELOPMENT",
  context: async (expressContext) => ({
    me: await setUserIDForMe(expressContext.req),
    database: admin.firestore(),
  }),
  debug: process.env["APP_ENVIRONMENT"] === "DEVELOPMENT",
});

const port = process.env.PORT || 8081;
server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
