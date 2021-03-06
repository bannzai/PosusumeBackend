import { SpotResolvers, User } from "@posusume/graphql/types/generated/graphql";

export const spotResolver: SpotResolvers = {
  author: async (_parent, _args, _context) => {
    const documentRef = await _context.database
      .doc(`users/${_parent.authorID!}`)
      .get();
    const author = documentRef.data();
    return author as User;
  },
};
