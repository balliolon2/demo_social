import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifytoken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createError(401, "No token provided or token is not a Bearer token"),
    );
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }
    req.user = decoded;
    next();
  });
};
