import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import Portfolio from '@/models/Portfolio';

export async function POST(req: Request) {
  try {
    await connectDB();
    const portfolioData = await req.json();
    
    const portfolio = await Portfolio.create(portfolioData);
    return NextResponse.json({ success: true, portfolio });
  } catch (error) {
    console.error('Error publishing portfolio:', error);
    return NextResponse.json({ success: false, error: 'Failed to publish portfolio' });
  }
}