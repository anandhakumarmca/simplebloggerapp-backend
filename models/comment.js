import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "story",
    },
    content: {
      type: String,
      required: true,
      minlength: 3,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
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
    star: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;
