const express = require('express');

const router = express.Router();
const adminMiddleware = require('./../middlewares/adminMiddleware');
const roleMiddleware = require('./../middlewares/roleMiddleware');
const authMiddleware = require('./../middlewares/authMiddleware')
const profileControl = require('./../controllers/profileController');

router.route('/create')
      .post( authMiddleware, profileControl.createProfile)
router.route('/me')
      .get(authMiddleware, profileControl.getMyProfile)
/*The admin Routes.*/
router.route('/All-profiles')
      .get(authMiddleware, profileControl.getAllProfiles)      
router.route('/Specific-profile/:userId')
       .get(authMiddleware, profileControl.getProfileByUserId)
router.route('/update-profile/:userId')
       .put(authMiddleware, profileControl.updateProfile)
router.route('/upload-profile-Image') 
       .post(authMiddleware, profileControl.uploadProfileImage) 
router.route('/delete-profile/:userId')
       .delete(authMiddleware, profileControl.deleteProfile)       
module.exports = router;     