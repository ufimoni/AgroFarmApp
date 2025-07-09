const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const chatControl = require('./../controllers/chatControllers')


const router = express.Router();

router.route('/create-new-chat')
      .post(authMiddleware,chatControl.CreateNewChats);
router.route('/get-all-chats')
       .get(authMiddleware,chatControl.getAllChats);

router.route('/clear-unread-message')
       .post(authMiddleware, chatControl.ClearChatMessage);  
router.route('/get-or-create-chat/:userId')
       .get(authMiddleware, chatControl.getOrCreateChat);     


module.exports = router;