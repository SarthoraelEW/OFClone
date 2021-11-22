const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
    },
    message: {
      type: String,
      maxlength: 1000,
    },
    medias: {
      type: [String],
    },
    isPublic: {
      type: Boolean,
    },
    likes: {
      type: [String],
    },
    comments: {
      type: [
        {
          message: String,
          likes: [String],
          date: String,
        },
      ],
    },
    tips: {
      type: String,
      default: ""
    },
    priceForUnlock: {
      type: String,
      default: "",
    },
    userWhoUnlocked: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
