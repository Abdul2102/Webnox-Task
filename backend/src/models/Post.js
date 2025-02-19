const mongoose = require("mongoose");
const { v4 } = require("uuid");

const PostSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    username: {
      type: String,
    },
    title: {
      type: String,
    },
    fileName: {
      type: String,
    },
    filePath: {
      type: String,
    },
    fileType: {
      type: String,
    },
    fileOriginalName: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        username: String,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
