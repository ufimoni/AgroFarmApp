//// This is Our Animal Model
const mongoose = require('mongoose');
const animalSchmea = new mongoose.Schema({
    name: {
        type: String,
        requireed: true,
        trim: true
    },
    type:{
        type: String,
        required: true,
        trim: true
    },
    sex: {
    type: String,
    enum: ['Male', 'Female']
  },
  vaccinationRecords: {
    VaccineName: String,
    Type: String,
    date: Date
  },

  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Expert or Manager
    required: true
  },

  breed: {
    type: String,
    required: false
  },

  age: {
    type: String, // e.g., "2 years"
    required: false
  },

  healthStatus: {
    type: String,
    default: 'Unknown'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Animal', animalSchema);


    
