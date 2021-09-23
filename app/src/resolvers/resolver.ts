import { spotResolver } from "../domain/spot/resolver";
import { meResolver } from "../domain/me/resolver";
import { Resolvers, Spot } from "../types/generated/graphql";
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
    spotAdd: async (_parent, { input, file }, _context) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const stream = createReadStream();
      // TODO: Upload to cloud storage service
      const out = require("fs").createWriteStream("local-file-output.txt");
      stream.pipe(out);
      await finished(out);

      // TODO
      const spot = {} as Spot;
      return {
        spot,
        uploadedFile: { filename, mimetype, encoding, url: "" },
      };
    },
  },
};
