const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");


exports.deletePostFromUser = async (req, res, next) => {
  const post = await PostModel.findById(req.params.id);
  
  try {
    UserModel.findByIdAndUpdate(
      post.posterId,
      {
        $pull: { posts: req.params.id },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (err) return res.status(500).send(err);
      }
    );
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}