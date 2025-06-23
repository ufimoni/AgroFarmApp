
// Create a new crop
const Crop = require('../models/cropModel');
const asyncErrorHandler = require('./../middlewares/asyncErrorHandler');
const cloudinary = require('../utils/cloudinary');

// Create a new crop
exports.createCrop = asyncErrorHandler(async (req, res) => {
  try {
    const { name, type, farm } = req.body;
    let imageUrl = '';

    // Handle image upload (expecting req.file or base64 from frontend)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'agrofarm/crops',
        resource_type: 'image'
      });
      imageUrl = result.secure_url;
    }

    const crop = await Crop.create({
      name,
      type,
      image: imageUrl,
      farm,
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// Get all crops (admin/expert)
exports.getAllCrops = asyncErrorHandler(async (req, res) => {
  try {
    const crops = await Crop.find()
      .populate('farm', 'name')
      .populate('createdBy', 'name');

    res.status(200).json({
       success: true,
       crops 
      });
  } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message
       });
  }
});

// Get crops by farm
exports.getCropsByFarm = asyncErrorHandler(async (req, res) => {
  try {
    const farmId = req.params.farmId;

    const crops = await Crop.find({ farm: farmId })
      .populate('createdBy', 'name');

    res.status(200).json({ success: true, crops });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

///// Get Crops for Farmer
exports.getCropsForFarmer = asyncErrorHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const crops = await Crop.find()
      .populate({
        path: 'farm',
        match: { farmers: userId }
      })
      .populate('createdBy', 'name');

    const filtered = crops.filter(crop => crop.farm !== null);

    res.status(200).json({ success: true, crops: filtered });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
