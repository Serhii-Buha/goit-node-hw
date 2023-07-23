const jwt = require("jsonwebtoken");
const { httpError } = require("../utils");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

exports.authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(authorization);
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmE0MTY4ZjMzYTA2YTgyNDhiMmFmYiIsImlhdCI6MTY4OTkzMDA1OCwiZXhwIjoxNjkwMDEyODU4fQ.oF4kGu4i3KE7DWhL0R_jNlPpVYmEBguIY9zakKqQv9A

    const [bearer, token] = authorization?.split(" ");
    // console.log(authorization?.split(" "));
    //    [
    //   'Bearer',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmE0MTY4ZjMzYTA2YTgyNDhiMmFmYiIsImlhdCI6MTY4OTkzMDA1OCwiZXhwIjoxNjkwMDEyODU4fQ.oF4kGu4i3KE7DWhL0R_jNlPpVYmEBguIY9zakKqQv9A'
    // ]
    // console.log(bearer); // Bearer

    if (bearer !== "Bearer" || !token) next(httpError(401, "Not authorized"));

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token)
      next(httpError(401, "Not authorized"));

    req.user = user;

    next();
  } catch (error) {
    next(httpError(401, "Not authorized"));
  }
};
