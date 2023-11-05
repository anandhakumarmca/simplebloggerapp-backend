import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { addStory, getAllStories, getStoryById } from "../controllers/story.js";

const router = express.Router();

router.post("/addstory", protectRoute, addStory);
router.get("/getAllStories", getAllStories);
router.get("/story/:id", protectRoute, getStoryById);

export const storyRouter = router;
