/**
 * Test for Admin routes
 * Verifies that admin can access the all-waste-requests endpoint.
 */
import { api, expectResponse } from "./setup.test.js";

let adminToken;

before(async () => {
  await api.post("/api/users/register").send({
    name: "Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    address: { street: "Main", city: "Colombo", postalCode: "10000" },
  });

  const res = await api.post("/api/users/login").send({
    email: "admin@example.com",
    password: "admin123",
  });

  adminToken = res.body.token;
});

describe("🛠 Admin Routes", () => {
  it("should get all waste requests", async () => {
    const res = await api.get("/api/admin/all-waste-requests").set("Authorization", `Bearer ${adminToken}`);
    expectResponse(res.status).to.equal(200);
  });
});
