/**
 * Tests for User authentication and profile routes
 * Covers registration, login, and authenticated profile access.
 */
import { api, expectResponse } from "./setup.test.js";

describe("🧪 User Routes", () => {
  it("should register a new user", async () => {
    const res = await api.post("/api/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "user",
    });
    expectResponse(res, 201);
  });

  it("should login successfully", async () => {
    const res = await api.post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expectResponse(res, 200);
    // Save token for next tests
    process.env.TEST_TOKEN = res.body.token;
  });

  it("should get user profile", async () => {
    const res = await api.get("/api/users/profile").set("Authorization", `Bearer ${process.env.TEST_TOKEN}`);

    expectResponse(res, 200);
  });
});
