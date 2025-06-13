const Profile = require('./../models/profileModel');
const asyncErrorHandler = require('./../middlewares/asyncErrorHandler');
const Users = require('./../models/userModel');
const cloudinary = require('./../cloudinary')
const sendResponse = require('./../Utils/sendResponse');
// Helper: Send standardized JSON response


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
  const profile = await Profile.findOne({ 
    user: req.user._id,
    isActive: true

   }).populate('user', '-password');

  if (!profile) {
    return sendResponse(res, false, "Profile not found.", null, 404);
  }

  return sendResponse(res, true, "Fetched profile successfully.", profile);
});

// Get All Profiles
exports.getAllProfiles = asyncErrorHandler(async (req, res) => {
  const profiles = await Profile.find({isActive: true}).populate('user', '-password');

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


exports.uploadProfileImage = asyncErrorHandler(async (req, res) => {
  if (!req.file) {
    return sendResponse(res, false, "No image file provided.", null, 400);
  }

  // Upload to Cloudinary
  const uploadedimage = await cloudinary.uploader.upload(req.file.path, {
    folder: 'profileImages',
    transformation: 
    [{ width: 500, 
      height: 500, 
      crop: 'limit'
     }]
  });

  const updatedProfile = await Profile.findOneAndUpdate(
    { user: req.user._id},
    { $set: { profileImage: uploadedimage.secure_url } },
    { new: true }
  );

  if (!updatedProfile) return sendResponse(res, false, "Failed to update profile picture.", null, 400);
  return sendResponse(res, true, "Profile picture updated successfully.", updatedProfile);
});


exports.deleteProfile = asyncErrorHandler( async ( req, res) =>{
const profile = await Profile.findOne({
  user: req.user._id,

});
if(!profile){
  return sendResponse(res, false,
    "Profile not found",
    null,
    404
  )
}

profile.isActive = false;
const deletedprofile = await profile.save()

console.log("The Deleted Profile: " ,deletedprofile);
return sendResponse(res, true,
  "Profile Successful deleted"
);
})

