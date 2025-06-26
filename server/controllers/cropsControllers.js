const Crop = require('./../models/cropsModel');
const asyncErrorHandler = require('./../middlewares/asyncErrorHandler');
const Farm = require('./../models/farmModel');
const cloudinary = require('./../cloudinary');



exports.createCrop = asyncErrorHandler(async (req, res) => {
  try {
    const { name, type, description, farm, image, video } = req.body;

    if (!name || !type || !farm) {
      return res.status(400).json({
        success: false,
        message: 'Name, type, and farm are required',
      });
    }

    const existingFarm = await Farm.findOne({ _id: farm, isDeleted: false });
    if (!existingFarm) {
      return res.status(400).json({
        success: false,
        message: 'Farm not found or invalid farm ID',
      });
    }

    const crop = new Crop({
      name,
      type,
      description,
      image: image || '',
      video: video || '',
      farm,
      createdBy: req.user._id,
    });

    await crop.save();

    existingFarm.crops.push(crop._id);
    await existingFarm.save();

    res.status(201).json({
      success: true,
      message: 'Crop created successfully',
      data: crop,
    });
  } catch (error) {
    console.error('Crop creation failed:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message,
    });
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
      crops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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

// Get crops for farmer (crops on farms where user is a farmer)
exports.getCropsForFarmer = asyncErrorHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const crops = await Crop.find()
      .populate({
        path: 'farm',
        match: { farmers: userId }
      })
      .populate('createdBy', 'name');

    // filter out crops where farm didn't match the user
    const filtered = crops.filter(crop => crop.farm !== null);

    res.status(200).json({ success: true, crops: filtered });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

exports.getCropById = asyncErrorHandler(async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, isDeleted: false })
      .populate('createdBy', 'name email role')
      .populate('farm', 'name location');

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found',
      });
    }

    res.status(200).json({
      success: true,
      crop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
