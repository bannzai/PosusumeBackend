import { spotResolver } from "../../resolvers/query/spot";
import { meResolver } from "../../resolvers/query/me";
import { Resolvers, User } from "../../types/generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    me: (_parent, _args, _context, _info) => {
      return _context.me as any;
    },
  },
  Spot: spotResolver,
  Me: meResolver,
};
