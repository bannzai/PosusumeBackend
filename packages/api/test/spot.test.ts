process.env.APP_FIREBASE_AUTH_TEST_USER_ID = "test_identifier";
process.env.APP_ENVIRONMENT = "DEVELOPMENT";
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8089";

import { ApolloServer } from "apollo-server";
import { expect } from "chai";

import * as admin from "firebase-admin";
import { config } from "../src/config";
admin.initializeApp();
const database = admin.firestore();

describe("#test", () => {
  it("success", () => {
    expect(1).to.be.equal(1);
  });
  it("success 2", () => {
    expect(1).to.be.equal(1);
  });
});

describe("test with database", () => {
  it("should write document successfully", async () => {
    await database
      .doc("users/test_user_identifier/spots/test_spot_identifier")
      .set({ dummy: true });

    const snapshot = await database
      .doc("users/test_user_identifier/spots/test_spot_identifier")
      .get();
    expect(snapshot.data()!.dummy).to.equal(true);
  });
});

describe("#spotAdd", () => {
  it("successfully add spot", async () => {
    const server = new ApolloServer(config);

    const result = await server.executeOperation({
      query: `
      mutation SpotAdd($spotAddInput: SpotAddInput!) {
        spotAdd(input: $spotAddInput) {
          spot {
             id
             title
             imageURL
             latitude
             longitude
          }
        }
      }
      `,
      variables: {
        spotAddInput: {
          id: "spot_test_identifier",
          title: "test_title",
          imageURL:
            "https://test.posusume.com/user/test_identifier/spots/spots_test_identifier/test.image.jpg",
          latitude: 10,
          longitude: 10,
        },
      },
    });
    expect(result.errors).to.be.undefined;
    expect(result.data?.spot.id).to.be.equal("spot_test_identifier");
    expect(result.data?.spot.title).to.be.equal("test_title");
    expect(result.data?.spot.title).to.be.equal(
      "https://test.posusume.com/user/test_identifier/spots/spots_test_identifier/test.image.jpg"
    );
  });
});
