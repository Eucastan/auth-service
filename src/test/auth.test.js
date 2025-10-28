import request from "supertest";
import { sequelize } from "../config/database.js";
import app from "../app.js";
import User from "../models/User.js"; // imported only to clear DB during test

// Setup and cleanup
beforeAll(async () => {
  await sequelize.sync({ force: true }); // recreate tables in memory
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth Service Tests", () => {
  const userData = {
    username: "eucas",
    email: "eucas@example.com",
    password: "mypassword",
  };

  test("Should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/user registered/i);
  });

  test("Should not register duplicate email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.statusCode).toBe(403);
  });

  test("Should login existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userData.email,
        password: userData.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
