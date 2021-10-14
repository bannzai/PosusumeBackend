import { spotResolver } from "../domain/spot/resolver";
import { meResolver } from "../domain/me/resolver";
import { Resolvers, Spot } from "../types/generated/graphql";
import admin = require("firebase-admin");
import { GraphQLLatitude, GraphQLLongitude } from "graphql-scalars";

export const resolvers: Resolvers = {
  Query: {
    me: (_parent, _args, _context, _info) => {
      return _context.me as any;
    },
    spots: async (_parent, _args, _context, _info) => {
      const spotCollectionGroup = await _context.database
        .collectionGroup(`spots`)
        .where(
          "geoPoint",
          ">=",
          new admin.firestore.GeoPoint(_args.minLatitude, _args.minLongitude)
        )
        .where(
          "geoPoint",
          "<=",
          new admin.firestore.GeoPoint(_args.maxLatitude, _args.maxLongitude)
        )
        .get();
      return spotCollectionGroup.docs.map((doc) => doc.data() as Spot);
    },
  },
  Spot: spotResolver,
  Me: meResolver,
  Mutation: {
    spotAdd: async (_parent, { input }, _context) => {
      const collectionReference = _context.database.collection(
        `users/${_context.me.id}/spots`
      );

      let documentReference: admin.firestore.DocumentReference;
      if (input.id == null) {
        documentReference = collectionReference.doc();
      } else {
        documentReference = collectionReference.doc(input.id);
      }

      const spotDocumentData: Omit<Spot, "author"> = {
        id: documentReference.id,
        imageURL: input.imageURL,
        title: input.title,
        deletedDate: null,
        archivedDate: null,
        createdDate: new Date(),
        authorID: _context.me.id,
        geoPoint: new admin.firestore.GeoPoint(input.latitude, input.longitude),
        resizedSpotImageURLs: [],
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
