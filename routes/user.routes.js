const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller')
const multer = require('multer');
const upload = multer();

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// GET Methods
router.get("/get-subscriptions-users/:id", userController.getSubscriptionsUsers);
router.get("/get-users-from-post/:id", userController.getUsersFromPost);
router.get("/get-users-from-conversations/:id", userController.getUsersFromConversations);
router.get("/get-suggestions/:id", userController.getSuggestions);
router.get("/find-users-with-query/:query", userController.findUsersWithQuery);

// verify email
router.get("/verify-email/:id/:token", userController.verifyEmail);

// user info
router.get('/user-info/:id', userController.userInfo);
router.put('/update-bio/:id', userController.updateBio);
router.put('/update-displayname/:id', userController.updateDisplayName);
router.put('/update-location/:id', userController.updateLocation);
router.put('/update-website/:id', userController.updateWebsite);
router.put('/update-wishlist/:id', userController.updateWishlist);
router.put('/update-price/:id', userController.updatePrice);
router.patch('/add-card/:id', userController.addCard);
router.patch('/add-payement/:id', userController.addPayement);
router.patch('/add-following/:id', userController.addFollowing);
router.patch('/add-subscription/:id', userController.addSubscription);
router.patch('/update-subscription/:id', userController.updateSubscription);
router.patch('/read-notification/:id', userController.readNotification);

// delete user
router.delete('/delete-user/:id', userController.deleteUser);

// conversations
router.patch('/create-conversation/:id', userController.createConversation);
router.patch('/delete-conversation/:id', userController.deleteConversation);

// Phone verification
router.patch('/get-verification-code/:id', userController.getVerificationCode);
router.patch('/check-verification-code/:id', userController.checkVerificationCode);

// upload
router.post('/upload-profil', upload.single('file'), uploadController.uploadProfilPicture);
router.post('/upload-bannery', upload.single('file'), uploadController.uploadBannery);

module.exports = router;