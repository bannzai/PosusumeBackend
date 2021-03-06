import { MeResolvers, User } from "@posusume/graphql/types/generated/graphql";

export const meResolver: MeResolvers = {
  user: async (_parent, _args, _context) => {
    const { database } = _context;
    const document = await database.doc(`users/${_parent.id}`).get();
    const user = document.data() as User;
    return user;
  },
  spots: async (_parent, _args, _context) => {
    const spotDocumentReferences = await _context.database
      .collection(`users/${_parent.id}/spots`)
      .listDocuments();
    const documents = await Promise.all(
      spotDocumentReferences.map((document) => document.get())
    );
    return documents.map((document) => document.data()!);
  },
};
