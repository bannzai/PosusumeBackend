import { expect } from "chai";

describe("#test", () => {
  it("success", () => {
    expect(1).to.be.equal(1);
  });
  it("failure", () => {
    expect(0).to.be.equal(1);
  });
});
