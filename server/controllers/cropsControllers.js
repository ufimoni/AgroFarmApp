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
    const crops = await Crop.find({}, 'name type description image farm createdBy')
      .populate('farm', 'name')
      .populate('createdBy', 'firstname lastname');

    const filteredCrops = crops.map(crop => ({
      _id: crop._id,
      name: crop.name,
      type: crop.type,
      image: crop.image || '',
      description: crop.description,
      farm: crop.farm?.name || 'Unknown Farm',
      createdBy: crop.createdBy
        ? `${crop.createdBy.firstname} ${crop.createdBy.lastname}`
        : 'Unknown Expert'
    }));

    res.status(200).json({
      success: true,
      crops: filteredCrops,
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
    const crop = await Crop.findOne({ _id: req.params.id })
      .populate('createdBy', 'firstname lastname email role image')
      .populate('farm', 'name location');

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found',
      });
    }

    const formattedCrop = {
      _id: crop._id,
      name: crop.name,
      type: crop.type,
      description: crop.description || 'No description provided.',
      image: crop.image || '',
      video: crop.video || '',
      createdBy: crop.createdBy
        ? {
            name: `${crop.createdBy.firstname} ${crop.createdBy.lastname}`,
            email: crop.createdBy.email,
            role: crop.createdBy.role,
            image: crop.createdBy.image || '',
          }
        : {
            name: 'Unknown Expert',
            email: '',
            role: '',
            image: '',
          },
      farm: crop.farm
        ? {
            name: crop.farm.name,
            location: crop.farm.location,
          }
        : {
            name: 'Unknown Farm',
            location: '',
          },
      createdAt: crop.createdAt,
    };

    res.status(200).json({
      success: true,
      crop: formattedCrop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


exports.searchCrops = asyncErrorHandler(async (req, res) => {
  try {
    const { type, name, farm, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = {};

    if (type) {
      query.type = type;
    }

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // case-insensitive partial match
    }

    if (farm) {
      const farmDoc = await Farm.findOne({ name: { $regex: farm, $options: 'i' } });
      if (farmDoc) {
        query.farm = farmDoc._id;
      } else {
        return res.status(404).json({ success: false, message: 'Farm not found' });
      }
    }

    const crops = await Crop.find(query)
      .populate('farm', 'name location')
      .populate('createdBy', 'firstname lastname email role')
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 });

    const formatted = crops.map(crop => ({
      _id: crop._id,
      name: crop.name,
      type: crop.type,
      description: crop.description,
      image: crop.image,
      farm: crop.farm?.name || 'Unknown Farm',
      createdBy: crop.createdBy
        ? `${crop.createdBy.firstname} ${crop.createdBy.lastname}`
        : 'Unknown Expert',
    }));

    res.status(200).json({
      success: true,
      crops: formatted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
