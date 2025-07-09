const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
     type: mongoose.Schema.Types.ObjectId, ref: "chats"
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    text: {
     type: String,
     required: false
    },
    image: {
    type: String,
    required: false
    },
    read: {
      type: Boolean,
      default: false
    }
},
{ timestamps: true })

const Messages = mongoose.model("messages", messageSchema);

module.exports = Messages;