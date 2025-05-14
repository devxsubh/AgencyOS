import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import ChatbotConfig from '@/models/ChatbotConfig';

export async function GET() {
  try {
    await connectDB();
    const config = await ChatbotConfig.findOne().sort({ updatedAt: -1 });
    return NextResponse.json({ success: true, systemPrompt: config?.systemPrompt || '' });
  } catch (error) {
    console.error('Error reading system prompt:', error);
    return NextResponse.json({ success: false, error: 'Failed to read system prompt' });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { systemPrompt } = await req.json();
    
    if (!systemPrompt) {
      return NextResponse.json({ success: false, error: 'System prompt is required' });
    }

    // Update existing config or create new one
    const config = await ChatbotConfig.findOneAndUpdate(
      {},
      { 
        systemPrompt,
        updatedAt: new Date()
      },
      { 
        new: true,
        upsert: true
      }
    );

    return NextResponse.json({ success: true, message: 'System prompt updated successfully' });
  } catch (error) {
    console.error('Error updating system prompt:', error);
    return NextResponse.json({ success: false, error: 'Failed to update system prompt' });
  }
}