import { fileURLToPath } from "url";
import path, { dirname } from "path";
import multer from "multer";

// Get the current module's filename
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module's filename
const __dirname = dirname(__filename);

// Configure the storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder for uploaded story images
    cb(null, path.join(__dirname, "../public/storyImages"));
  },
  filename: function (req, file, cb) {
    const extentions = file.mimetype.split("/")[1];
    req.savedStoryImage =
      "image_" +
      new Date().toISOString().replace(/:/g, "-") +
      file.originalname;
    cb(null, req.savedStoryImage);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new CustomError("Please provide a valid image file", 400), false);
  }

  cb(null, true);
};

const imageUpload = multer({ storage, fileFilter });

export default imageUpload;
