import request from "supertest";
import makeApp from "../src/app";

const app = makeApp();

describe("Test /bet ending point", () => {
  it("GET to /bet without params should not be successful", async () => {
    const res = await request(app).get("/bet");

    expect(res.status).toBe(400);
  });

  it("GET to /bet without risk param should fail", async () => {
    const res = await request(app).get("/bet?bet=3&rows=8")

    expect(res.status).toBe(400)
  })
});
