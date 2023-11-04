import express from "express";
import { protectRoute } from "../middleware/auth.js";
import imageUpload from "../utils/uploadImage.js";
import { addStory } from "../controllers/story.js";

const router = express.Router();

router.post("/addstory", [protectRoute, imageUpload.single("image")], addStory);

export const storyRouter = router;
