import { Story } from "../models/story.js";
export const addStory = async (req, res) => {
  try {
    // Validate that required fields (e.g., title and content) are present in the request body
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "Both title and content are required in the request body",
      });
    }

    // Create a new Blog instance with the request data
    const newStory = new Blog({
      title,
      content,
      // Any other fields you want to include
    });

    // Save the new story to the database
    await newStory.save();

    return res.status(200).json({
      success: true,
      message: "Story added successfully",
      data: newStory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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
