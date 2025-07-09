const Chats = require('./../models/chatModel'); // please require the chatmodel or chatschema

const Message = require('./../models/messageModel'); //// Please always Require the MessageSchema.

exports.newMessage = async (req, res) =>{
    try{
       
       ///1.  Store the message in a message Collection
       const new_message = new Message(req.body);
       /// saved Message in db
       const savedMessage = await new_message.save();

       ////2. Update The last Message in Chat Collection
    //    const current_chat = await Chats.findById(req.body.chatId)
    //    current_chat.lastMessage
     /*Using findOneandUpdate()*/
    const current_chat = await Chats.findOneAndUpdate({
   _id:req.body.chatId
}, // first parameter takes the id from the chat collection which is referencing in RDBMS we call it foreign key
{
    lastMessage: savedMessage._id,
    $inc: {unReadMessageCount: 1}

} // second parameter assignthe last message to the saved message and Increment the unreadMessageCount by 1.
);
// send the response here.
res.status(201).send({
    status: 200,
    message: 'Message Sent Successfully',
    success: true,
    data: savedMessage
})

    }catch(error){
        res.status(400).send({
            status: 400,
            message: "Could not get New Message",
            error: error.message
        })
    }
} 

exports.getAllMessage = async (req, res) => {
    try {
        // Validate chatId
        const chatId = req.params.chatId;
        if (!chatId) {
            return res.status(400).send({
                message: "chatId is required",
                success: false
            });
        }

        // Fetch all messages for the chatId, sorted by createdAt
        const allMessages = await Message.find({ chatId })
                                         .sort({ createdAt: 1 });

        // Send success response with data
        return res.status(200).send({
            message: "Messages fetched successfully",
            success: true,
            data: allMessages
        });

    } catch (error) {
        // Handle errors and send appropriate response
        console.error("Error fetching messages:", error);
        return res.status(500).send({
            status: 500,
            message: "Could not fetch all messages",
            error: error.message
        });
    }
};
