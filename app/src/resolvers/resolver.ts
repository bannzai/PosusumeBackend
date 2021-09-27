import { spotResolver } from "../domain/spot/resolver";
import { meResolver } from "../domain/me/resolver";
import { Resolvers, Spot } from "../types/generated/graphql";
import stream = require("stream");
import admin = require("firebase-admin");
import { resolvers as scalarResolvers } from "graphql-scalars";

export const resolvers: Resolvers = {
  Query: {
    me: (_parent, _args, _context, _info) => {
      return _context.me as any;
    },
  },
  Spot: spotResolver,
  Me: meResolver,
  Mutation: {
    spotAdd: async (_parent, { input, file }, _context) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const documentReference = _context.database.doc(
        `users/${_context.me.id}/spots`
      );
      const id = documentReference.id;

      const storageFile = admin
        .storage()
        .bucket()
        .file(`users/${_context.me.id}/spots/${id}`);

      const readStream = createReadStream();
      const writeStream = storageFile.createWriteStream({
        contentType: mimetype,
      });
      readStream.pipe(writeStream);
      await stream.promises.finished(writeStream);

      const spotDocumentData: Omit<Spot, "author"> = {
        id,
        imageURL: storageFile.publicUrl(),
        title: input.title,
        deletedDate: null,
        archivedDate: null,
        createdDate: new Date(),
        authorID: _context.me.id,
        geoPoint: new FirebaseFirestore.GeoPoint(
          input.geoPoint.latitude,
          input.geoPoint.longitude
        ),
      };
      const spot = spotDocumentData as Spot;

      await documentReference.set(spot, { merge: true });

      return {
        spot,
        uploadedFile: {
          filename,
          mimetype,
          encoding,
          url: storageFile.publicUrl(),
        },
      };
    },
  },
  Latitude: scalarResolvers.Latitude,
  Longitude: scalarResolvers.Longitude,
};
