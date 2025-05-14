import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import Chat from '@/models/Chat';

export async function GET() {
  try {
    await connectDB();
    const chats = await Chat.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, chats });
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch chats' });
  }
}