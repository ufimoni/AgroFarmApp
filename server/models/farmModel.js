const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: String,
  location: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User' },
  crops: [{
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Crop'
     }],
  tasks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task'
 }],
  equipment: [{
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment' }]
});

module.exports = mongoose.model('Farm', farmSchema);
