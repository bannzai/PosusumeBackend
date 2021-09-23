import { spotResolver } from "../domain/spot/resolver";
import { meResolver } from "../domain/me/resolver";
import { Resolvers } from "../types/generated/graphql";
import { fileResolver } from "../domain/file/resolver";
import { finished } from "stream/promises";

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
    // Exists naming rules to file upload mutation plugins.
    // e.g) iOS https://github.com/apollographql/apollo-ios/blob/7afcfc3c32950f7f6b6d768212f12412701ec7d6/Sources/UploadAPI/API.swift#L270
    singleUpload: async (_parent, { file }, _context) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const stream = createReadStream();
      const out = require("fs").createWriteStream("local-file-output.txt");
      stream.pipe(out);
      await finished(out);

      return { filename, mimetype, encoding };
    },
  },
};
