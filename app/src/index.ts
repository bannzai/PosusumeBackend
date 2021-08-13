import { ApolloServer, gql } from "apollo-server";

// GraphQLスキーマの定義
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book!]!
  }
`;

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

// リゾルバーの定義
const resolvers = {
  Query: {
    books: () => books,
  },
};

// サーバーの起動
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
