import { MeResolvers } from "@posusume/graphql/types/generated/graphql";

export const meResolver: MeResolvers = {
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
