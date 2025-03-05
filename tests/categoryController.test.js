const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

let token;
let categoryId;


beforeAll(async () => {
  // Register test user (ensures user exists)
  await request(app).post("/api/auth/register").send({
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
  });

  // Now login to get the token
  const userRes = await request(app).post("/api/auth/login").send({
    email: "testuser@example.com",
    password: "password123",
  });

  token = userRes.body.token;

  if (!token) {
    throw new Error("Failed to obtain token. Check login/register API.");
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Category Controller", () => {
  test("should reject unauthorized category creation", async () => {
    const res = await request(app).post("/api/categories")
      .send({
        name: "Electronics",
      });

    expect(res.statusCode).toBe(401); // Unauthorized
    expect(res.body).toHaveProperty("message", "Access Denied. No token provided.");
  });

  test("should create a category with valid token", async () => {
    const res = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`) // Add token
      .send({ name: "Electronics" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("category");
    expect(res.body.category).toHaveProperty("name", "Electronics");

    categoryId = res.body.category._id; // Save category ID for deletion test
  });

  test("should reject category deletion without token", async () => {
    const res = await request(app)
      .delete(`/api/categories/${categoryId}`)

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Access Denied. No token provided.");
  });

  test("should delete category with valid token", async () => {
    const res = await request(app)
      .delete(`/api/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Category deleted and subcategories reassigned");
  });

  test("should return 404 for deleting a non-existent category", async () => {
    const res = await request(app)
      .delete("/api/categories/67c6b4fc6b54b1d836f1d7bc")
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Category not found");
  });

  test("should return 400 for invalid category creation request", async () => {
    const res = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ invalidField: "Invalid Data" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Name is required");
  });
});
