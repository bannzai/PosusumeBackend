import { ApolloServer } from "apollo-server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";

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

// スキーマの定義
const schema = loadSchemaSync(join(__dirname, "../schemas/schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

// リゾルバーの定義
const resolvers = {
  Query: {
    books: () => books,
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

// サーバーの起動
const server = new ApolloServer({ schema: schemaWithResolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
