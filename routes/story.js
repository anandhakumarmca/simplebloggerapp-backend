import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { addStory, deleteStory, editStory, getAllStories, getStoryById } from "../controllers/story.js";

const router = express.Router();

router.post("/addstory", protectRoute, addStory);
router.get("/getAllStories", getAllStories);
router.get("/:id", protectRoute, getStoryById);
router.put("/:id", protectRoute, editStory);
router.delete("/:id",protectRoute, deleteStory);

export const storyRouter = router;
