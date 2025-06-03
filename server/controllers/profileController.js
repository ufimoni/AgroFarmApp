const Profile = require('./../models/profileModel');
const asyncErrorHandler = require('./../middlewares/asyncErrorHandler');
const Users = require('./../models/userModel');

// Helper: Send standardized JSON response
const sendResponse = (res, success, message, data = null, status = 200) => {
  return res.status(status).json({ success, message, data });
};

// Create Profile
exports.createProfile = asyncErrorHandler(async (req, res) => {
  const { fullName, phone, address, bio, expertiseAreas, farmDetails } = req.body;

  // Check if profile already exists
  const existingProfile = await Profile.findOne({ user: req.user._id });
  if (existingProfile) {
    return sendResponse(res, false, "Profile already exists. Please update it.", null, 400);
  }

  const profile = new Profile({
    user: req.user._id,
    fullName,
    phone,
    address,
    bio,
    expertiseAreas,
    farmDetails
  });

  const newProfile = await profile.save();

  return sendResponse(res, true, "Profile created successfully.", newProfile);
});

// Get My Profile
exports.getMyProfile = asyncErrorHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate('user', '-password');

  if (!profile) {
    return sendResponse(res, false, "Profile not found.", null, 404);
  }

  return sendResponse(res, true, "Fetched profile successfully.", profile);
});

// Get All Profiles
exports.getAllProfiles = asyncErrorHandler(async (req, res) => {
  const profiles = await Profile.find({}).populate('user', '-password');

  if (!profiles || profiles.length === 0) {
    return sendResponse(res, false, "No profiles found.", null, 404);
  }

  return sendResponse(res, true, "Fetched all profiles successfully.", profiles);
});

// Get Profile by User ID
exports.getProfileByUserId = asyncErrorHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.userId }).populate('user', '-password');

  if (!profile) {
    return sendResponse(res, false, "Profile does not exist.", null, 404);
  }

  return sendResponse(res, true, "Fetched profile by user ID successfully.", profile);
});

// Update Profile
exports.updateProfile = asyncErrorHandler(async (req, res) => {
  const updates = req.body;

  const updatedProfile = await Profile.findOneAndUpdate(
    { user: req.user._id },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!updatedProfile) {
    return sendResponse(res, false, "Profile not found or not updated.", null, 404);
  }

  return sendResponse(res, true, "Profile updated successfully.", updatedProfile);
});



exports.uploadProfileImage = asyncErrorHandler( async ( req, res)=>{
try{


    return sendResponse(res, true,
        "Profile Picture Update Successfully",
       
    )
}catch(error){

}
})

exports.deleteProfile = asyncErrorHandler( async ( req, res) =>{
try{

}catch(error){


}



})

