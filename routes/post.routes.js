const router = require('express').Router();
const postController = require('../controllers/post.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const upload = multer();

// GET methods
router.get('/get-posts-from-creator/:id', postController.getPostsFromCreator);
router.get('/get-posts-for-home-page/:id', postController.getPostsForHomePage);
router.get('/get-post/:id', postController.getPost);

// Post creation
router.post('/create-post', upload.array('files'), uploadController.createPost);

// Likes and comments
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/delete-comment/:id', postController.deleteComment);
router.patch('/like-comment/:id', postController.likeComment);
router.patch('/unlike-comment/:id', postController.unlikeComment);

// Unlock and Tips
router.patch('/add-tip/:id', postController.addTip);
router.patch('/unlock-post/:id', postController.unlockPost);

// Delete post
router.delete('/delete-post/:id', postController.deletePost);


module.exports = router;