const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: String,
  plantedDate: Date,
  harvestDate: Date,
  healthStatus: String,
  farm: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Farm'
 }
});

module.exports = mongoose.model('Crop', cropSchema);
