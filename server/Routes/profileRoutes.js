const express = require('express');

const router = express.Router();
const adminMiddleware = require('./../middlewares/adminMiddleware');
const roleMiddleware = require('./../middlewares/roleMiddleware');
const authMiddleware = require('./../middlewares/authMiddleware')
const profileControl = require('./../controllers/profileController');

router.route('/create')
      .post( authMiddleware, profileControl.createProfile)

module.exports = router;     