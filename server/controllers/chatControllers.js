const Chats = require('../models/chatModel');
const Messages = require('../models/messageModel');

// ✅ CREATE OR REUSE CHAT
exports.CreateNewChats = async (req, res) => {
  try {
    let { members } = req.body;
    if (!members || !Array.isArray(members)) members = [];

    const currentUserId = req.user.userId || req.user._id;

    // Make sure current user is in the chat
    if (!members.includes(currentUserId)) {
      members.push(currentUserId);
    }

    // Sort member IDs to avoid mismatches
    const sortedMembers = [...members.map(String)].sort();

   // console.log("🚀 Sorted Members:", sortedMembers);

    // ✅ Check for existing chat with exact members
    let existingChat = await Chats.findOne({
      members: { $all: sortedMembers },
      $expr: { $eq: [{ $size: "$members" }, sortedMembers.length] }
    });

    if (existingChat) {
      return res.status(200).send({
        message: "Chat already exists",
        success: true,
        data: existingChat
      });
    }

    // ✅ Create new chat
    const chat = new Chats({ members: sortedMembers });
    const savedChat = await chat.save();
    await savedChat.populate('members');

    return res.status(201).send({
      message: "Chat created successfully",
      success: true,
      data: savedChat
    });

  } catch (error) {
    console.error("❌ Error creating chat:", error.message);
    return res.status(400).send({
      message: "Failed to create chat",
      success: false,
      error: error.message
    });
  }
};

// ✅ GET ALL CHATS FOR USER
exports.getAllChats = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;

    const allchat = await Chats.find({ members: { $in: [userId] } })
      .populate({
        path: 'members',
        select: '-password'
      })
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    return res.status(200).send({
      status: 200,
      message: "Chats fetched successfully",
      success: true,
      data: allchat
    });

  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Failed to get chats",
      success: false,
      error: error.message
    });
  }
};

// ✅ CLEAR UNREAD MESSAGE COUNT
exports.ClearChatMessage = async (req, res) => {
  try {
    const { chatId } = req.body;
    const chat = await Chats.findById(chatId);

    if (!chat) {
      return res.send({
        success: false,
        message: "Sorry, chat not found with the given ID"
      });
    }

    const updatedChat = await Chats.findByIdAndUpdate(
      chatId,
      { unReadMessageCount: 0 },
      { new: true }
    ).populate('members').populate('lastMessage');

    await Messages.updateMany(
      { chatId: chatId, read: false },
      { read: true }
    );

    return res.send({
      message: "Unread messages cleared successfully",
      success: true,
      data: updatedChat
    });

  } catch (error) {
    return res.send({
      message: error.message,
      success: false
    });
  }
};

// ✅ GET OR CREATE CHAT BY USER ID (1-to-1 direct access)
exports.getOrCreateChat = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.userId || req.user._id;

  try {
    // ✅ Sorted to ensure match order
    const members = [currentUserId.toString(), userId.toString()].sort();

    let chat = await Chats.findOne({
      members: { $all: members },
      $expr: { $eq: [{ $size: "$members" }, members.length] }
    });

    if (!chat) {
      chat = await Chats.create({ members });
    }

    return res.status(200).send({
      success: true,
      message: "Chat fetched or created successfully",
      data: chat
    });

  } catch (error) {
    console.error("❌ Error in getOrCreateChat:", error);
    return res.status(500).send({
      success: false,
      message: "Error while getting or creating chat",
      error: error.message
    });
  }
};
