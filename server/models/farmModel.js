//// This is Our Farm Model
const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  location: {
    type: String,
    required: true
  },

  size: {
    type: String, // e.g., "10 acres"
    required: false
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  managers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  farmers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  crops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop'
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;
/// This model is farm model