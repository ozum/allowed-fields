import AllowedFields from "./";

const allowedFields = new AllowedFields({
  whiteList: { "": "color", member: "*", manager: ["name", "surname"] },
  blackList: { member: ["salary", "id"] }
});

const blackOnly = new AllowedFields({
  blackList: { member: ["salary", "id"] }
});

const whiteOnly = new AllowedFields({
  whiteList: { member: "*" }
});

describe("FieldList", () => {
  it("should throw error if invalid config is provided.", done => {
    expect(() => new AllowedFields({ blackList: 3 as any })).toThrow(
      '"blackList" must be an object'
    );
    done();
  });
});

describe("allowedFields.isAllowed()", () => {
  it("should return true for whitelisted field without relation.", done => {
    expect(allowedFields.isAllowed("color")).toBe(false);
    done();
  });

  it("should return true for whitelisted field contained by *.", done => {
    expect(allowedFields.isAllowed("member.name")).toBe(true);
    done();
  });

  it("should return true for whitelisted field with relation.", done => {
    expect(allowedFields.isAllowed("manager.name")).toBe(true);
    done();
  });

  it("should return false for blacklisted field.", done => {
    expect(allowedFields.isAllowed("member.salary")).toBe(false);
    done();
  });

  it("should return false for * if some fields are blacklisted even * is whitelisted.", done => {
    expect(allowedFields.isAllowed("member.*")).toBe(false);
    done();
  });

  it("should return false for * if * is not whitelisted.", done => {
    expect(allowedFields.isAllowed("manager.*")).toBe(false);
    done();
  });

  it("should return false for * without table.", done => {
    expect(allowedFields.isAllowed("*")).toBe(false);
    expect(allowedFields.isAllowed("*", "")).toBe(false);
    done();
  });

  it("should return false for non-blacklisted fields if no whitelist is provided.", done => {
    expect(blackOnly.isAllowed("member.name")).toBe(true);
    done();
  });

  it("should return false for blacklisted fields if no whitelist is provided.", done => {
    expect(blackOnly.isAllowed("member.salary")).toBe(false);
    done();
  });

  it("should return false for * if some fields are blacklisted.", done => {
    expect(blackOnly.isAllowed("member.*")).toBe(false);
    done();
  });

  it("should return true for * if only blacklist is available and relation is not blacklisted.", done => {
    expect(blackOnly.isAllowed("other.*")).toBe(true);
    done();
  });

  it("should return true for whitelisted fields if no blacklist is provided.", done => {
    expect(whiteOnly.isAllowed("member.name")).toBe(true);
    done();
  });

  it("should return false for non-whitelisted fields if no blacklist is provided.", done => {
    expect(whiteOnly.isAllowed("manager.salary")).toBe(false);
    done();
  });
});
