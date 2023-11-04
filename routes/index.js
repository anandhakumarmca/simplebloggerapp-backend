import express from "express";
import { authRouter } from "./auth.js";
import { storyRouter } from "./story.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return res
    .status(200)
    .json({ message: "Welcome to Simple Blogger App, Anandh" });
});

router.use("/auth", authRouter);
router.use("/story", storyRouter);

export const indexRoutes = router;
