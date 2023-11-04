import { Story } from "../models/story.js";
import deleteImageFile from "../utils/deleteImage.js";

export const addStory = async (req, res, next) => {
  const { title, content } = req.body;

  var wordCount = content.trim().split(/\s+/).length;

  let readtime = Math.floor(wordCount / 200);

  try {
    const newStory = await Story.create({
      title,
      content,
      author: req.user._id,
      image: req.savedStoryImage,
      readtime,
    });

    return res.status(200).json({
      success: true,
      message: "add story successfully ",
      data: newStory,
    });
  } catch (error) {
    deleteImageFile(req);

    return next(error);
  }
};
