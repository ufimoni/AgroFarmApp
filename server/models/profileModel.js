const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    Image: {
        type: String,
        default: '' // store our image here
    },
    phone: {
        type: String,
    },
    isActive: {
         type: Boolean,
         default: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    bio: {
        type: String,
        maxlength: 500,
        trim: true
    },
    expertiseAreas: [String],
    farmDetails: {
        farmName: String,
        farmSize: Number,
        cropsGrown: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


/*Now we want to save and display or return to the clients all active users for soft delete*/
ProfileSchema.pre(/^find/, function(next){
this.find({ isActive: {$ne: false}})
next();
})

const Profile = mongoose.model('Profile', ProfileSchema)
module.exports = Profile;