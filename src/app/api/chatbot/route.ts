import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import Chat from '@/models/Chat';
import OpenAI from 'openai';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import ChatbotConfig from '@/models/ChatbotConfig';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const { message } = await req.json();

    // Get or create session ID from cookies
    const cookieStore = cookies();
    let sessionId = (await cookieStore).get('chat_session_id')?.value;
    
    if (!sessionId) {
      sessionId = uuidv4();
      // Set session cookie that expires in 24 hours
      (await
        // Set session cookie that expires in 24 hours
        cookieStore).set('chat_session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      });
    }

    // Get the system prompt from database
    const config = await ChatbotConfig.findOne().sort({ updatedAt: -1 });
    const systemPrompt = config?.systemPrompt || 'You are a helpful assistant.';

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    const reply = completion.choices[0].message?.content || 'Sorry, I could not generate a response.';

    // Find existing chat for this session or create new one
    let chat = await Chat.findOne({ sessionId });
    
    if (!chat) {
      chat = await Chat.create({
        sessionId,
        messages: []
      });
    }

    // Add new messages to the chat
    chat.messages.push(
      { from: 'user', text: message, timestamp: new Date() },
      { from: 'bot', text: reply, timestamp: new Date() }
    );
    await chat.save();

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error('Error in chatbot API:', error);
    return NextResponse.json({ success: false, error: 'Failed to process message' });
  }
}
