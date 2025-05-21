const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: String,

  assignedTo:
  { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' },
  farm: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Farm' },

  status: 
  { type: String, 
    enum: ['pending', 'in progress', 'completed'], 
    default: 'pending'
    },
  dueDate: Date
});

module.exports = mongoose.model('Task', taskSchema);
