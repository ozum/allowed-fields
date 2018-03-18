import FieldList from "../src/field-list";

const fieldList = new FieldList({
  "": ["id"],
  member: "*",
  manager: ["name", "surname"],
  color: "code",
});

describe("fieldList.has()", () => {
  it("should return true for existing field without relation.", done => {
    expect(fieldList.has("id", "")).toBe(true);
    done();
  });

  it("should return true for * when * is allowed.", done => {
    expect(fieldList.has("*", "member")).toBe(true);
    done();
  });

  it("should return true for existing field contained by *.", done => {
    expect(fieldList.has("name", "member")).toBe(true);
    done();
  });

  it("should return true for existing field with relation.", done => {
    expect(fieldList.has("name", "manager")).toBe(true);
    done();
  });

  it("should return true for existing field included by string.", done => {
    expect(fieldList.has("code", "color")).toBe(true);
    done();
  });

  it("should return false for non-existing field.", done => {
    expect(fieldList.has("xyz", "color")).toBe(false);
    done();
  });

  it("should return false for non-existing relation. (1 parameters)", done => {
    expect(fieldList.has("id", "zoo")).toBe(false);
    done();
  });

  it("should return false for * when * is not allowed.", done => {
    expect(fieldList.has("*", "manager")).toBe(false);
    done();
  });
  it("should return true for * when * is allowed (2 parameters).", done => {
    expect(fieldList.has("*", "member")).toBe(true);
    done();
  });

  it("should return true for existing field contained by * (2 parameters).", done => {
    expect(fieldList.has("name", "member")).toBe(true);
    done();
  });

  it("should return true for existing field with relation. (2 parameters)", done => {
    expect(fieldList.has("name", "manager")).toBe(true);
    done();
  });

  it("should return true for existing field included by string. (2 parameters)", done => {
    expect(fieldList.has("code", "color")).toBe(true);
    done();
  });

  it("should return false for non-existing field. (2 parameters)", done => {
    expect(fieldList.has("xyz", "color")).toBe(false);
    done();
  });

  it("should return true for * when * is not allowed (2 parameters).", done => {
    expect(fieldList.has("*", "manager")).toBe(false);
    done();
  });
});
