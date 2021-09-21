import { MeResolvers } from "../../types/generated/graphql";

export const meResolver: MeResolvers = {
  spots: (_parent, _args, _context) => {
    return _context.database.collection(`users/${_parent.id}/spots`);
  },
};
