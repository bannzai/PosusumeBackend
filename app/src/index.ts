import { ApolloServer, AuthenticationError } from "apollo-server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { Resolvers } from "./types/generated/graphql";
import { Context } from "./types/context";

import admin = require("firebase-admin");

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

// スキーマの定義
const schema = loadSchemaSync(join(__dirname, "../schemas/schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

// リゾルバーの定義 (型のサポートを受けれる)
const resolvers: Resolvers = {
  Query: {
    books: (_parent, _args, _context) => {
      // TODO: 詳細な認可処理を行う

      return books;
    },
  },
  Mutation: {
    addBook: (_parent, _args, _context) => {
      return {
        title: "Give me star",
        author: "bannzai",
      };
    },
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const getUser = (token?: string): Context["user"] => {
  if (token === undefined) {
    throw new AuthenticationError(
      "認証されていないユーザーはリソースにアクセスできません"
    );
  }

  // TODO: Tokenからユーザー情報を取り出す処理

  return {
    name: "dummy name",
    email: "dummy@example.com",
    token,
  };
};

// サーバーの起動
const server = new ApolloServer({
  schema: schemaWithResolvers,
  context: ({ req }) =>
    ({
      user: getUser(req.headers.authorization),
    } as Context),
  debug: false, // エラーレスポンスにスタックトレースを含ませない、開発環境ではtrueにした方が分析が捗りそう
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
