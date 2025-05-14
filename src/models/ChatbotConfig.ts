import mongoose from 'mongoose';

const chatbotConfigSchema = new mongoose.Schema({
  systemPrompt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const ChatbotConfig = mongoose.models.ChatbotConfig || mongoose.model('ChatbotConfig', chatbotConfigSchema);
export default ChatbotConfig;