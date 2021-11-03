process.env.FIRESTORE_EMULATOR_HOST = "localhost:8089";

import { expect } from "chai";

import * as admin from "firebase-admin";
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
