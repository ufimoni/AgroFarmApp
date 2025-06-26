const Farm = require('../models/farmModel');
const asyncErrorHandler = require('./../middlewares/asyncErrorHandler')

// Get all farms (excluding soft deleted)
exports.getAllFarms = asyncErrorHandler(async (req, res) => {
  try {
    const farms = await Farm.find({ isDeleted: false })
      .populate('owner', 'name email')
      .populate('managers', 'name email')
      .populate('farmers', 'name email')
      .populate('crops', 'name type');

    res.status(200).json({ success: true, farms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// Get a single farm by ID (excluding soft deleted)
exports.getFarmById = asyncErrorHandler( async (req, res) => {
  try {
    const farmId = req.params.id;
    const farm = await Farm.findOne({ _id: farmId, isDeleted: false })
      .populate('owner', 'name email')
      .populate('managers', 'name email')
      .populate('farmers', 'name email')
      .populate('crops', 'name type');

    if (!farm) {
      return res.status(404).json({ success: false, message: 'Farm not found' });
    }

    res.status(200).json({ success: true, farm });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}); 

// Create a new farm
exports.createFarm = asyncErrorHandler(async (req, res) => {
  try {
    const { name, location, size, owner, managers, farmers, crops } = req.body;

    const farm = await Farm.create({
      name,
      location,
      size,
      owner,
      managers,
      farmers,
      crops
    });

    res.status(201).json({ success: true, farm });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update a farm by ID
exports.updateFarm = asyncErrorHandler(async (req, res) => {
  try {
    const farmId = req.params.id;
    const updates = req.body;

    const farm = await Farm.findOneAndUpdate(
      { _id: farmId, isDeleted: false },
      updates,
      { new: true }
    );

    if (!farm) {
      return res.status(404).json({ success: false, message: 'Farm not found or deleted' });
    }

    res.status(200).json({ success: true, farm });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Soft delete a farm by ID
exports.DeleteFarm = asyncErrorHandler( async (req, res) => {
  try {
    const farmId = req.params.id;

    const farm = await Farm.findOne({ _id: farmId, isDeleted: false });
    if (!farm) {
      return res.status(404).json({ success: false, message: 'Farm not found or already deleted' });
    }

    farm.isDeleted = true;
    await farm.save();

    res.status(200).json({ success: true, message: 'Farm deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
