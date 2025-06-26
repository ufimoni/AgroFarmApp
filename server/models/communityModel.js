const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'AgroFarm Community'
  },
  description: {
    type: String
  },
  articles: [articleSchema] // 👈 Embedded articles
});

module.exports = mongoose.model('Community', communitySchema);
