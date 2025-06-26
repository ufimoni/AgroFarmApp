const Task = require('../models/taskModel');
const Crop = require('../models/cropModel');
const Farm = require('../models/farmModel');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { description, assignedTo, farm, crop, dueDate } = req.body;

    const task = await Task.create({
      description,
      assignedTo,
      farm,
      crop,
      dueDate
    });

    // Optional: Add to crop's taskRefs array
    if (crop) {
      await Crop.findByIdAndUpdate(crop, {
        $push: { taskRefs: task._id }
      });
    }

    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all tasks for a specific farm
exports.getTasksByFarm = async (req, res) => {
  try {
    const farmId = req.params.farmId;

    const tasks = await Task.find({ farm: farmId })
      .populate('assignedTo', 'name email')
      .populate('crop', 'name');

    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get tasks assigned to a specific user (farmer)
exports.getMyTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ assignedTo: userId })
      .populate('farm', 'name')
      .populate('crop', 'name');

    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    task.isActive = false;
    await task.save();

    // Optional: remove taskRef from crop.taskRefs if needed
    if (task.crop) {
      await Crop.findByIdAndUpdate(task.crop, {
        $pull: { taskRefs: task._id }
      });
    }

    res.status(200).json({ success: true, message: 'Tasks deleted success' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
