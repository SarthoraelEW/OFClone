const UserModel = require("../models/user.model");
const twilio = require("twilio");
const ObjectId = require("mongoose").Types.ObjectId;
const { randomCode } = require("../utils/randomCode.utils");
const { isMobilePhone } = require("validator");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

/************** user info **************/

exports.userInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknow: " + err);
  }).select("-password");
};

exports.updateBio = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.updateDisplayName = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          displayName: req.body.displayName,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.addPhoneNumber = async (req, res) => {};

exports.updateLocation = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          location: req.body.location,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.updateWebsite = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          website: req.body.website,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.updateWishlist = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          wishlist: req.body.wishlist,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.updatePrice = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          price: req.body.price,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.addCard = async (req, res) => {};

exports.addPayement = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          payements: {
            date: Date.now(),
            amout: req.body.amount,
            description: req.body.description,
            isSucceeded: req.body.isSucceeded,
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.addFollowing = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          following: req.body.idToFollow,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.addSubscription = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          subscriptions: {
            creatorId: req.body.creatorId,
            isActive: true,
            subTime: 1,
            date: Date.now(),
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.updateSubscription = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const user = await UserModel.findById(req.params.id);
  const subscriptions = user.subscriptions;

  subscriptions.forEach((sub) => {
    if (creatorId === req.body.creatorId) sub.isActive = false;
  });

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          subscriptions: subscriptions,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.readNotification = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const user = await UserModel.findById(req.params.id);
  const notifications = user.notifications;

  notifications.forEach((notif) => {
    if (notif._id === req.body.notificationId) {
      notif.read = true;
    }
  });

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          notifications: notifications,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

/************** conversations **************/

exports.createConversation = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          conversations: {
            userId: req.body.userId,
            messages: [],
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.deleteConversation = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          conversations: {
            userId: req.body.userId,
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

/************** delete user **************/

exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    UserModel.findByIdAndDelete(req.params.id).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).send(err);
  }
};

/************** phone verification **************/

exports.getVerificationCode = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { phoneNumber } = req.body;
  if (!isMobilePhone(phoneNumber))
    return res.status(400).send("Invalid phone number: " + phoneNumber);

  const client = new twilio(accountSid, authToken);
  const verificationCode = randomCode(6);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          phoneNumber: {
            phoneNumber: phoneNumber,
            isVerified: false,
            verificationCode: verificationCode,
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }

  client.messages
    .create({
      body: `Your verification code is: ${verificationCode}`,
      to: phoneNumber,
      from: "+13862843120",
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};

exports.checkVerificationCode = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const user = await UserModel.findById(req.params.id);
  const phoneNumber = user.phoneNumber;

  if (phoneNumber.verificationCode === req.body.verificationCode) {
    phoneNumber.isVerified = true;
    phoneNumber.verificationCode = "";
  } else {
    res.status(400).send("Incorrect code");
  }

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          phoneNumber: phoneNumber
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    )
  } catch (err) {
    return res.status(500).send(err);
  }
};