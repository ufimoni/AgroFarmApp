const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/authMiddleware')
const adminMiddleware = require('./../middlewares/adminMiddleware');
const farmControl = require('./../controllers/farmControllers')

router.route('/create')
      .post(authMiddleware, farmControl.createFarm)
router.route('/get-all-farms')
      .get(authMiddleware, farmControl.getAllFarms);


module.exports= router;