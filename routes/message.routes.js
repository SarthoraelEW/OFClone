const router = require('express').Router();
const messageController = require('../controllers/message.controller');

const multer = require('multer');
const upload = multer();

// GET Methods
router.get('/get-messages-from-conversation/:senderId/:receiverId', messageController.getMessagesFromConversation);

// Message creation
router.post('/send-message', upload.array('files'), messageController.sendMessage);

// Unlock message
router.patch('/unlock-message/:id', messageController.unlockMessage);

// Delete message
router.delete('/delete-message/:id', messageController.deleteMessage);

module.exports = router;