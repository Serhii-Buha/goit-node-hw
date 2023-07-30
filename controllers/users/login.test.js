/**
 * # Login API Unit Tests

This suite of unit tests validates the behavior of the login functionality of the API.

## Test Cases

### POST /api/auth/users/login

- `should return 200, token, and user object with email and subscription`
  - Description: Validates that the API returns the expected response for a valid login request.
  - Steps:
     1. Send a POST request to `/api/auth/users/login` with valid email and password.
  - Expected Results:
     - The response should have a status code of 200.
     - The response should contain a `token` property.
     - The response should contain a `user` object with the `email` property of type string.
     - The response should contain a `user` object with the `subscription` property of type string.

 */

const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = require("../../app");
const { User } = require("../../models");
const { login } = require("../users");

jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../../models");

const mockUser = {
  _id: "1",
  email: "test@test.com",
  password: "password",
  subscription: "free",
};

beforeEach(() => {
  jwt.sign.mockReturnValue("token");
  bcrypt.compare.mockReturnValue(true);
  User.findOne.mockReturnValue(Promise.resolve(mockUser));
  User.findByIdAndUpdate.mockReturnValue(Promise.resolve());
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("POST /users/login", () => {
  it("should return 200 and the token if the request is valid", async () => {
    const res = await request(app)
      .post("/api/auth/users/login")
      .send({ email: mockUser.email, password: mockUser.password });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", mockUser.email);
    expect(res.body.user).toHaveProperty("subscription", mockUser.subscription);

    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
  }, 10000);

  // it("should have a login function", () => {
  //   expect(typeof login).toBe("function");
  // });

  // it("should return 400 if the request body is invalid", async () => {
  //   const response = await request(app)
  //     .post("/api/auth/users/login")
  //     .send({ email: "test@test.com" }); //

  //   expect(response.statusCode).toBe(400);
  // });

  // it("should return 401 if the email is not found", async () => {
  //   User.findOne.mockResolvedValue(null);

  //   const response = await request(app)
  //     .post("/api/auth/users/login")
  //     .send({ email: "test@test.com", password: "password" });

  //   expect(response.statusCode).toBe(401);
  // });

  // it("should return 401 if the password is incorrect", async () => {
  //   bcrypt.compare.mockReturnValue(false);

  //   const response = await request(app)
  //     .post("/api/auth/users/login")
  //     .send({ email: "test@test.com", password: "wrongpassword" });

  //   expect(response.statusCode).toBe(401);
  // });
});
