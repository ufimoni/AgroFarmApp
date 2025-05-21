const express = require('express');
const authMiddleware = require('./../middlewares/authMiddleware');
const authControl = require('../controllers/authControllers');

const router = express.Router();

router.route('/signup')
      .post(authControl.signup)
router.route('/login')
      .post(authControl.login);

router.route('/logout')
      .get(authControl.logout);

module.exports = router;