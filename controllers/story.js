import { Story } from "../models/story.js";

export const addStory = async (req, res) => {
  const { title, content } = req.body;

  // Calculate word count
  const wordCount = content.trim().split(/\s+/).length;

  // Calculate read time
  const readtime = Math.ceil(wordCount / 200);

  try {
    // Create a new story
    const newStory = await Story.create({
      title,
      content,
      author: req.user._id, // Assuming you have a user object in the request
      readtime,
    });

    return res.status(200).json({
      success: true,
      message: "Story added successfully",
      data: newStory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
};

export const getAllStories = async (req, res) => {
  try {
    // Fetch all stories from your database (assuming you have a "Story" model)
    const stories = await Story.find();

    if (!stories) {
      return res.status(404).json({
        success: false,
        message: "No stories found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All stories retrieved successfully",
      data: stories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
