import bcrypt from "bcrypt";
import CustomError from "./error.js";

export async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new CustomError("Password hashing failed", 500);
  }
}

export const hashSyncPassword = (password) => {
  try {
    const saltRounds = 10; // You can adjust the salt rounds as needed
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Password hashing failed");
  }
};

// Function to compare a provided password with a hashed password
export async function comparePassword(plainPassword, hashedPassword) {
  try {
    const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return passwordMatch;
  } catch (error) {
    throw new CustomError("Password comparison failed", 500);
  }
}
