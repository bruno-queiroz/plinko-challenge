import request from "supertest";
import makeApp from "../src/app";

import { User } from "../src/db/schema";

import { mocked } from "jest-mock";
import { jest } from "@jest/globals";

jest.mock("../src/db/schema");

const app = makeApp(() => console.log("mock database"));

describe("Test /bet ending point", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET to /bet without params should not be successful", async () => {
    const res = await request(app).get("/bet");

    expect(res.status).toBe(400);
  });

  it("GET to /bet without risk param should fail", async () => {
    const res = await request(app).get("/bet?bet=3&rows=8");

    expect(res.status).toBe(400);
  });

  it("GET to /bet without rows param should fail", async () => {
    const res = await request(app).get("/bet?bet=3&risk=high");

    expect(res.status).toBe(400);
  });

  it("GET to /bet without bet param should fail", async () => {
    const res = await request(app).get("/bet?rows=8&risk=high");

    expect(res.status).toBe(400);
  });

  it("GET to /bet with all params should be successful", async () => {
    const mockedUser = mocked(User).findOne.mockResolvedValue({
      name: "dummy-user",
      nonce: 1,
      serverSeed: "hex",
      clientSeed: "hex",
      save: () => console.log("mock save"),
    });
    const res = await request(app).get("/bet?bet=3&rows=8&risk=high");

    expect(mockedUser.mock.calls).toHaveLength(1);
    expect(res.status).toBe(200);
  });

  it("GET to /bet with less than 8 rows should fail", async () => {
    const res = await request(app).get("/bet?bet=3&rows=7&risk=high");

    expect(res.status).toBe(400);
  });

  it("GET to /bet with more than 16 rows should fail", async () => {
    const res = await request(app).get("/bet?bet=3&rows=17&risk=high");

    expect(res.status).toBe(400);
  });

  it("GET to /bet with bet amount as 0 should fail", async () => {
    const res = await request(app).get("/bet?bet=0&rows=8&risk=high");

    expect(res.status).toBe(400);
  });

  it("GET to /bet with invalid risk option should fail", async () => {
    const res = await request(app).get("/bet?bet=3&rows=8&risk=giant");

    expect(res.status).toBe(400);
  });
});
