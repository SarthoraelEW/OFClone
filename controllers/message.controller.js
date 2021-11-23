const MessageModel = require("../models/message.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

/*************** GET Methods *************/

exports.getMessagesFromConversation = async (req, res) => {
  const { senderId, receiverId } = req.params;

  const sender = await UserModel.findById(senderId);
  senderConversations = sender.conversations;

  let messages = [];
  senderConversations.forEach( conv => {
    if (conv.userId === receiverId) {
      messages = messages.concat(conv.messages);
    }
  });

  MessageModel.find({ _id: { $in: messages }}, (err, docs) => {
    if (!err) res.send(docs);
    else res.status(400).json(err);
  });
};

/*************** Message creation *************/

exports.sendMessage = async (req, res) => {
  let medias = [];
  if (req.files != null) {
    for (var j = 0; j < req.files.length; j++) {
      if (req.files[j] != null) {
        try {
          if (
            req.files[j].detectedMimeType != "image/jpg" &&
            req.files[j].detectedMimeType != "image/png" &&
            req.files[j].detectedMimeType != "image/jpeg"
          )
            throw Error("invalid file");

          if (req.files[j].size > 500000) throw Error("max size");
        } catch (err) {
          const errors = uploadErrors(err);
          return res.status(400).send(errors);
        }
        const filename = req.body.senderId + Date.now() + `(${j + 1})` + ".jpg";

        await pipeline(
          req.files[j].stream,
          fs.createWriteStream(
            `${__dirname}/../client/public/uploads/messages/${filename}`
          )
        );
        medias.push("./uploads/messages/" + filename);
      }
    }
  }
  const newMessage = new MessageModel({
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    message: req.body.message,
    medias: medias,
    isUnlocked: req.body.isUnlocked,
    priceToUnlocked: req.body.priceToUnlocked,
  });

  try {
    const message = await newMessage.save();

    const sender = await UserModel.findById(req.body.senderId);
    const senderConversations = sender.conversations;

    let convExist = false;
    senderConversations.forEach((conv) => {
      if (conv.userId === req.body.receiverId) {
        conv.messages.push(message._id);
        convExist = true;
      }
    });
    if (!convExist) {
      senderConversations.push({
        userId: req.body.receiverId,
        messages: [message._id],
      });
    }

    const receiver = await UserModel.findById(req.body.receiverId);
    const receiverConversations = receiver.conversations;

    convExist = false;
    receiverConversations.forEach((conv) => {
      if (conv.userId === req.body.senderId) {
        conv.messages.push(message._id);
        convExist = true;
      }
    });
    if (!convExist) {
      receiverConversations.push({
        userId: req.body.senderId,
        messages: [message._id],
      });
    }

    UserModel.findByIdAndUpdate(
      req.body.senderId,
      {
        $set: {
          conversations: senderConversations,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (err) return res.status(500).json(err);
      }
    );

    UserModel.findByIdAndUpdate(
      req.body.receiverId,
      {
        $set: {
          conversations: receiverConversations,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(message);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

/*************** Unlock message *************/

exports.unlockMessage = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    MessageModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { isUnlocked: true },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(message);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

/*************** Delete message *************/

exports.deleteMessage = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const message = await MessageModel.findById(req.params.id);

  const sender = await UserModel.findById(message.senderId);
  const senderConversations = sender.conversations;

  const receiver = await UserModel.findById(message.receiverId);
  const receiverConversations = receiver.conversations;

  senderConversations.forEach(conv => {
    if (conv.userId === receiver._id.toString()) {
      conv.messages = conv.messages.filter(messageId => {
        return messageId !== req.params.id;
      })
    } 
  });

  receiverConversations.forEach(conv => {
    if (conv.userId === sender._id.toString()) {
      conv.messages = conv.messages.filter(messageId => {
        return messageId !== req.params.id;
      })
    } 
  });

  try {
    UserModel.findByIdAndUpdate(
      sender._id,
      {
        $set: {conversations: senderConversations}
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (err) return res.status(500).json(err);
      }
    );

    UserModel.findByIdAndUpdate(
      receiver._id,
      {
        $set: {conversations: receiverConversations}
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (err) return res.status(500).json(err);
      }
    );

    MessageModel.findByIdAndDelete(req.params.id).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).send(err);
  }
};
