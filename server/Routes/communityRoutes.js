const express = require('express');
const router = express.Router()
const authMiddleware = require('./../middlewares/authMiddleware');



router.route('/addarticles')
      .post()
router.route('/')