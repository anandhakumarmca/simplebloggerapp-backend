import jwt from "jsonwebtoken";
import CustomError from "../utils/error.js";

export const protectRoute = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    throw new CustomError("Access denied. Invalid token.", 401);
  }

  const authToken = token.slice(7); // Remove 'Bearer ' prefix

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    throw new CustomError("Access denied. Invalid token.", 401);
  }
};
