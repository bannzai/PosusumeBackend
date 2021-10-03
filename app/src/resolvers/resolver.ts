import { spotResolver } from "../domain/spot/resolver";
import { meResolver } from "../domain/me/resolver";
import { Resolvers, Spot } from "../types/generated/graphql";
import stream = require("stream");
import admin = require("firebase-admin");
import { GraphQLLatitude, GraphQLLongitude } from "graphql-scalars";

export const resolvers: Resolvers = {
  Query: {
    me: (_parent, _args, _context, _info) => {
      return _context.me as any;
    },
  },
  Spot: spotResolver,
  Me: meResolver,
  Mutation: {
    spotAdd: async (_parent, { input }, _context) => {
      const documentReference = _context.database.doc(
        `users/${_context.me.id}/spots`
      );
      const id = documentReference.id;

      const spotDocumentData: Omit<Spot, "author"> = {
        id,
        imageURL: input.imageURL,
        title: input.title,
        deletedDate: null,
        archivedDate: null,
        createdDate: new Date(),
        authorID: _context.me.id,
        geoPoint: new FirebaseFirestore.GeoPoint(
          input.latitude,
          input.longitude
        ),
      };
      const spot = spotDocumentData as Spot;

      await documentReference.set(spot, { merge: true });

      return {
        spot,
      };
    },
  },
  Latitude: GraphQLLatitude,
  Longitude: GraphQLLongitude,
};
