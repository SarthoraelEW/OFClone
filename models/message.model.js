const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
    },
    receiverId: {
      type: String,
    },
    message: {
      type: String,
      maxlength: 1000,
    },
    medias: {
      type: [String],
    },
    isUnlocked: {
      type: Boolean,
      default: true,
    },
    priceToUnlock: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("message", messageSchema);

module.exports = MessageModel;
