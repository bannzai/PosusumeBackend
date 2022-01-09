import { ApolloServer } from "apollo-server";
import admin = require("firebase-admin");
import { config } from "../config/config";

admin.initializeApp();

const server = new ApolloServer(config);

const port = process.env.PORT || 8081;
server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
