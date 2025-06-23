const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  video:{
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Crop', cropSchema);
