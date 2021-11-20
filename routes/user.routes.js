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

// user info
router.get('/user-info/:id', userController.userInfo);
router.put('/update-bio/:id', userController.updateBio);
router.put('/update-displayname/:id', userController.updateDisplayName);
router.put('/add-phone-number/:id', userController.addPhoneNumber);
router.put('/update-location/:id', userController.updateLocation);
router.put('/update-website/:id', userController.updateWebsite);
router.put('/update-wishlist/:id', userController.updateWishlist);
router.put('/update-price/:id', userController.updatePrice);
router.patch('/add-card/:id', userController.addCard);
router.patch('/add-payement/:id', userController.addPayement);
router.patch('/update-payement/:id', userController.updatePayement);
router.patch('/add-following/:id', userController.addFollowing);
router.patch('/add-subscription/:id', userController.addSubscription);
router.patch('/read-notification/:id', userController.readNotification);

// conversations
router.patch('/create-conversation/:id', userController.createConversation);
router.patch('/delete-conversation/:id', userController.deleteConversation);

// upload
router.post('/upload', upload.single('file'), uploadController.uploadProfilPicture);
router.post('/upload', upload.single('file'), uploadController.uploadBannery);

module.exports = router;