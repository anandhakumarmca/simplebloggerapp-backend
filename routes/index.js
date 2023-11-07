import express from "express";
import { authRouter } from "./auth.js";
import { storyRouter } from "./story.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/story", storyRouter);

export const indexRoutes = router;
