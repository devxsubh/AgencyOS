import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import Chat from '@/models/Chat';
import { getOpenAI } from '@/lib/openai';
import { cookies } from 'next/headers';
import ChatbotConfig from '@/models/ChatbotConfig';
import { clientIp, rateLimit } from '@/lib/rate-limit';

const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: Request) {
  if (!rateLimit(`chatbot:${clientIp(req)}`, 20, 60 * 1000)) {
    return NextResponse.json({ success: false, error: 'Too many messages. Please slow down.' }, { status: 429 });
  }

  try {
    const { message } = await req.json();
    if (typeof message !== 'string' || !message.trim() || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ success: false, error: 'Invalid message' }, { status: 400 });
    }

    await connectDB();

    // Get or create session ID from cookies
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('chat_session_id')?.value;

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      // Set session cookie that expires in 24 hours
      cookieStore.set('chat_session_id', sessionId, {
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

    const completion = await getOpenAI().chat.completions.create({
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
    return NextResponse.json({ success: false, error: 'Failed to process message' }, { status: 500 });
  }
}
