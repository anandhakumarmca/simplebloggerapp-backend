import path from "path";
import fs from "fs/promises"; // Use fs.promises for promise-based file operations

const deleteImageFile = async (deleteImage) => {
  const rootDir = path.dirname(new URL(import.meta.url).pathname); // Use import.meta.url to get the current module's directory

  const filePath = path.join(rootDir, `/public/storyImages/${deleteImage}`);

  try {
    await fs.unlink(filePath); // Use fs.promises.unlink for asynchronous file deletion
    console.log("File deleted");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

export default deleteImageFile;
