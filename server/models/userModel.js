const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
    lastname: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['farmer', 'farm-manager', 'agro-expert', 'owner'],
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  isActive: {
  type: Boolean,
  default: true
  },
  image: {
    type: String // URL or base64 string
  },
  roleProfileType: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'role' // Dynamically references the corresponding profile model
  }
}, { timestamps: true });

/*Now we want to save and display or return to the clients all active users for soft delete*/
userSchema.pre(/^find/, function(next){
this.find({ isActive: {$ne: false}})
next();
})

const Users = mongoose.model('User', userSchema);
module.exports = Users;
