const mongoose = require('mongoose');
// create a chat schema
const chatsSchema = new mongoose.Schema({
members: {
type:[
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

]
},
lastMessage: {
    type: mongoose.Schema.Types.ObjectId, ref: "messages",
},
unReadMessageCount:{
    type: Number,
    default: 0
}
}, {timestamps: true})

/// Model the schema and save it to the database.
const Chats = mongoose.model('chats',chatsSchema);
// exports it
module.exports = Chats;