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
  description: {
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
const Crop = mongoose.model('Crop', cropSchema);
module.exports = Crop;
