import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    slug: String,
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://images.indianexpress.com/2023/10/leo-tamil-nadu-13102023.jpg",
    },
    readtime: {
      type: Number,
      default: 3,
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "comment",
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("story", storySchema);

export { Story };
