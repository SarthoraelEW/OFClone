const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/error.utils");
const pipeline = promisify(require("stream").pipeline);

exports.uploadProfilPicture = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 5000000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json(errors);
  }

  const fileName = req.body.name + "-profil" + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );

  try {
    UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { profilePicture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.uploadBannery = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 5000000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json(errors);
  }

  const fileName = req.body.name + "-bannery" + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );

  try {
    UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { bannery: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.createPost = async (req, res) => {
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
        const filename = req.body.posterId + Date.now() + `(${j + 1})` + ".jpg";

        await pipeline(
          req.files[j].stream,
          fs.createWriteStream(
            `${__dirname}/../client/public/uploads/posts/${filename}`
          )
        );
        medias.push("./uploads/posts/" + filename);
      }
    }
  }
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    medias: medias,
    isPublic: req.body.isPublic,
    likes: [],
    comments: [],
    userWhoUnlocked: []
  });

  const user = await UserModel.findById(req.body.posterId);
  medias = user.medias.concat(medias);

  try {
    const post = await newPost.save();

    UserModel.findByIdAndUpdate(
      req.body.posterId,
      {
        $addToSet: {
          posts: post._id,
          medias: medias
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(post);
        else return res.status(500).json(err);
      }
    )
  } catch (err) {
    return res.status(500).send(err);
  }
};