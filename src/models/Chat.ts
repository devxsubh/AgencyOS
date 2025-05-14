import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false
  },
  sessionId: {
    type: String,
    required: false
  },
  messages: [{
    from: {
      type: String,
      enum: ['user', 'bot'],
      required: true
    },
    text: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  systemPrompt: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

export default Chat;