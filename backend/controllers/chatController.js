import Chat from '../models/ChatModel.js';
import User from '../models/UserModel.js';

// Get all chats for a user
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.find({ participants: userId })
      .populate('participants', 'name email profilePicture userType')
      .populate('messages.sender', 'name profilePicture')
      .sort({ lastMessageTime: -1 });

    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching user chats:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a specific chat
export const getChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId)
      .populate('participants', 'name email profilePicture userType')
      .populate('messages.sender', 'name profilePicture');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Check if user is a participant
    if (!chat.participants.some(p => p._id.toString() === userId)) {
      return res.status(403).json({ message: 'Not authorized to view this chat' });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new chat
export const createChat = async (req, res) => {
  try {
    const { therapistId } = req.body;
    const userId = req.user.id;

    // Check if chat already exists
    const existingChat = await Chat.findOne({
      participants: { $all: [userId, therapistId] }
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    // Verify therapist exists
    const therapist = await User.findById(therapistId);
    if (!therapist || therapist.userType !== 'therapist') {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    const newChat = new Chat({
      participants: [userId, therapistId]
    });

    await newChat.save();
    const populatedChat = await Chat.findById(newChat._id)
      .populate('participants', 'name email profilePicture');

    res.status(201).json(populatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages for a specific chat
export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId)
      .populate('participants', 'name email profilePicture userType')
      .populate('messages.sender', 'name profilePicture');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Check if user is a participant
    if (!chat.participants.some(p => p._id.toString() === userId)) {
      return res.status(403).json({ message: 'Not authorized to view this chat' });
    }

    res.status(200).json(chat.messages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ message: error.message });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Check if user is a participant
    if (!chat.participants.includes(userId)) {
      return res.status(403).json({ message: 'Not authorized to send messages in this chat' });
    }

    const newMessage = {
      sender: userId,
      content,
      timestamp: new Date(),
      read: false
    };

    chat.messages.push(newMessage);
    chat.lastMessage = content;
    chat.lastMessageTime = new Date();
    await chat.save();

    // Populate the message with sender details
    const populatedMessage = {
      ...newMessage,
      sender: await User.findById(userId).select('name profilePicture')
    };

    res.status(200).json({
      chatId,
      message: populatedMessage
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mark messages as read
export const markMessagesAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Check if user is a participant
    if (!chat.participants.includes(userId)) {
      return res.status(403).json({ message: 'Not authorized to mark messages as read' });
    }

    chat.messages.forEach(message => {
      if (message.sender.toString() !== userId.toString()) {
        message.read = true;
      }
    });

    await chat.save();

    res.status(200).json({
      chatId,
      userId
    });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ message: error.message });
  }
}; 