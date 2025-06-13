const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   location: {
      address: String,
      city: String,
      state: String,
      region: String,
      country: String,
      coordinates: {
         longitude: Number,
         latitude: Number
      },
   },
   sizeInAcres: {
     type: Number,
     required: true
   },
   owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   },
   manager: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
   },
   crops: [{
    type: String
   }],

  isActive: {
  type: Boolean,
  default: true,
  },

  image: {
   type: String
  },

},
{timestamps: true

});


/*Now we want to save and display or return to the clients all active users for soft delete*/
farmSchema.pre(/^find/, function(next){
this.find({ isActive: {$ne: false}})
next();
})

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;
