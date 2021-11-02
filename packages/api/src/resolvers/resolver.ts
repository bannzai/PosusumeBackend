import { spotResolver } from "../domain/spot/resolver";
import { meResolver } from "../domain/me/resolver";
import { Resolvers, Spot } from "@posusume/shared/types/generated/graphql";
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
    spot: async (_parent, _args, _context, _info) => {
      const { id } = _args;
      console.log(JSON.stringify({ id }));

      const spotCollectionGroupReference = await _context.database
        .collectionGroup(`spots`)
        .where("id", "==", _args.id)
        .get();

      if (spotCollectionGroupReference.docs.length === 1) {
        console.error(
          `unexpected fetched collection reference length is not 1. count: ${spotCollectionGroupReference.docs.length}. for id: ${id}`
        );
      }

      const spotDocumentReference = spotCollectionGroupReference.docs[0];
      const spot = spotDocumentReference.data();
      if (spot == null) {
        console.error(`unexpected spot is null for spotID: ${_args.id}`);
      }
      return spot as Spot;
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
        resizedSpotImageURLs: {},
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
