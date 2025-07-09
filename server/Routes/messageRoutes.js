const express = require('express');
const authMiddleware = require('./../middlewares/authMiddleware');
const messageControl = require('./../controllers/messageControllers');

const router = express.Router();

 router.route('/new-message')
        .post(authMiddleware, messageControl.newMessage);
router.route('/get-All-Messages/:chatId')
       .get(authMiddleware, messageControl.getAllMessage);

module.exports = router;