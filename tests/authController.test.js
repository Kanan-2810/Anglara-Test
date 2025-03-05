const request = require("supertest");
const app = require("../server");

describe("Auth Controller", () => {
  let token;

  test("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");

    // Uncomment if the backend returns a token
    // expect(res.body).toHaveProperty("token");
    // token = res.body.token;
  });

  test("should reject unauthorized requests", async () => {
    const res = await request(app).get("/api/categories/");

    console.log(res.body); // Debugging output

    expect(res.statusCode).toBe(401);
  });
});
