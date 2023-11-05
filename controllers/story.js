import { Story } from "../models/story.js";

export const addStory = async (req, res) => {
  try {
    // Validate that required fields (e.g., title and content) are present in the request body
    const { title, summary, content, image } = req.body;

    if (!title || !summary || !content) {
      return res.status(400).json({
        error: "Title, Summary and Content are required",
      });
    }

    // Create a new Story instance with the request data
    const newStory = new Story({
      author: req.user._id,
      title,
      summary,
      content,
      image,
    });

    // Save the new story to the database
    await newStory.save();

    return res.status(201).json({
      message: "Story added successfully",
      data: newStory,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllStories = async (req, res) => {
  try {
    // Fetch all stories from your database (assuming you have a "Story" model)
    const stories = await Story.find().populate("user").sort({ createdAt: -1 });

    if (!stories) {
      return res.status(404).json({
        message: "No stories found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All stories retrieved successfully",
      data: stories,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const storyId = req.params.id; // Assuming the story ID is provided as a route parameter

    // Fetch the story by ID from your database (assuming you have a "Story" model)
    const story = await Story.findById(storyId).populate("user");

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Story retrieved successfully",
      data: story,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
