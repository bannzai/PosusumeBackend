import { FileUpload } from "graphql-upload";

// Original response type of Promise<FileUpload>
// See here:
// https://github.com/jaydenseric/graphql-upload/blob/bdb5f808e0d514c28c0f59c1abd71680aba29bae/public/GraphQLUpload.js#L81
// https://github.com/jaydenseric/graphql-upload/blob/bdb5f808e0d514c28c0f59c1abd71680aba29bae/public/Upload.js#L58
// See also: https://github.com/jaydenseric/graphql-multipart-request-spec

export type Upload = Promise<FileUpload>;

export type GeoPoint = FirebaseFirestore.GeoPoint;
