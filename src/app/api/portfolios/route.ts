import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import Portfolio from '@/models/Portfolio';

export async function GET() {
  try {
    await connectDB();
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, portfolios });
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch portfolios' }, { status: 503 });
  }
}