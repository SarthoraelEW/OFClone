const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

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
          location: req.body.location
        }
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
          website: req.body.website
        }
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
          wishlist: req.body.wishlist
        }
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
          price: req.body.price
        }
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

exports.addPayement = async (req, res) => {};

exports.updatePayement = async (req, res) => {};

exports.addFollowing = async (req, res) => {};

exports.addSubscription = async (req, res) => {};

exports.readNotification = async (req, res) => {};

/************** conversations **************/

exports.createConversation = async (req, res) => {};

exports.deleteConversation = async (req, res) => {};

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