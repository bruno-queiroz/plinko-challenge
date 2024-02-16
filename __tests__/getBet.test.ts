import request from "supertest";
import makeApp from "../src/app";

const app = makeApp();

describe("Test /bet ending point", () => {
  it("GET to /bet without params should not be successful", async () => {
    const res = await request(app).get("/bet");

    expect(res.status).toBe(400);
  });
});
