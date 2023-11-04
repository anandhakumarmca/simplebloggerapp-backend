import express from "express";
import {
  activateUser,
  forgotPassword,
  login,
  register,
  resetpassword,
  verifyRandomString,
  getPrivateData,
} from "../controllers/auth.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.get("/activate/:activationToken", activateUser);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.get("/verifyRandomString/:randomString", verifyRandomString);
router.put("/resetpassword/:randomString", resetpassword);
router.get("/private", protectRoute, getPrivateData);

export const authRouter = router;
