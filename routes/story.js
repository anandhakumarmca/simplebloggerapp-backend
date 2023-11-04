import express from "express";
import { protectRoute } from "../middleware/auth.js";
import imageUpload from "../utils/uploadImage.js";
import { addStory, getAllStories } from "../controllers/story.js";

const router = express.Router();

router.post("/addstory", protectRoute, addStory);
router.get("/getAllStories", getAllStories);

export const storyRouter = router;
