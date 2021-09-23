import { spotResolver } from "../domain/spot/resolver";
import { meResolver } from "../domain/me/resolver";
import { Resolvers, User } from "../types/generated/graphql";
import { fileResolver } from "../domain/file/resolver";

export const resolvers: Resolvers = {
  Query: {
    me: (_parent, _args, _context, _info) => {
      return _context.me as any;
    },
  },
  Spot: spotResolver,
  Me: meResolver,
  File: fileResolver,
  Mutation: {
    singleUpload: async (_parent, _args, _context) => {
      return {
        encoding: "",
        filename: "",
        mimetype: "",
      };
    },
  },
};
