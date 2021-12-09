const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

/*************** GET methods ***************/

exports.getPostsFromCreator = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const user = await UserModel.findById(req.params.id);
  const posts = user.posts;
  console.log(posts);

  PostModel.find({ _id: { $in: posts }}, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(400).json(err);
  });
};

exports.getPostsForHomePage = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const user = await UserModel.findById(req.params.id);
  const creators = [];

  user.subscriptions.forEach(sub => {
    if (sub.isActive) {
      creators.push(sub.creatorId);
    }
  });

  PostModel.find({ posterId: { $in: creators }}, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(400).json(err);
  });
};

exports.getPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  PostModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknow: " + err);
  });
};

/*************** Likes and comments ***************/

exports.likePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.body.likerId },
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

exports.unlikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.body.likerId },
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

exports.commentPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { commenterId, message } = req.body;

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { comments: {
          commenterId: commenterId,
          message: message,
          likes: [],
          date: Date.now()
        }}
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

exports.deleteComment = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { comments: { _id: req.body.commentId }}
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

exports.likeComment = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const post = await PostModel.findById(req.params.id);
  const comments = post.comments;

  comments.forEach(comment => {
    if (comment._id.toString() === req.body.commentId) {
      comment.likes.push(req.body.likerId);
    }
  });

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          comments: comments
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

exports.unlikeComment = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const post = await PostModel.findById(req.params.id);
  const comments = post.comments;

  comments.forEach(comment => {
    if (comment._id.toString() === req.body.commentId) {
      comment.likes = comment.likes.filter(id => {
        return id !== req.body.likerId;
      });
    }
  });

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          comments: comments
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

/*************** Unlock and Tips ***************/

exports.addTip = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { tiperId, amount } = req.body;

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          tips: {
            tiperId: tiperId,
            amount: amount
          }
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

exports.unlockPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          userWhoUnlocked: req.body.userId
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

/*************** Delete post ***************/

exports.deletePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    PostModel.findByIdAndDelete(req.params.id).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).send(err);
  }
};