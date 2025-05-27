const express = require('express');
const authMiddleware = require('./../middlewares/authMiddleware');
const userControl = require('./../controllers/userControllers');
const router = express.Router();

router.route('/get-logged-user')
       .get(authMiddleware, userControl.getUserDetails)
router.route('/getAllUsers')       
       .get(authMiddleware, userControl.getAllUsers)
 module.exports = router;      