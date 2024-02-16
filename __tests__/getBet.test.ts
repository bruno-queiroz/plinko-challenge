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

  it("GET to /bet without rows param should fail", async () => {
    const res = await request(app).get("/bet?bet=3&risk=high")

    expect(res.status).toBe(400)
  })

  it("GET to /bet without bet param should fail", async () => {
    const res = await request(app).get("/bet?rows=8&risk=high")

    expect(res.status).toBe(400)
  })

  it("GET to /bet with all params should be successful", async () => {
    const res = await request(app).get("/bet?bet=3&rows=8&risk=high")

    expect(res.status).toBe(200)
  })

  it("GET to /bet with less than 8 rows should fail", async () => {
    const res = await request(app).get("/bet?bet=3&rows=7&risk=high")

    expect(res.status).toBe(400)
  })
});
