import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import Price from '@/models/Price';

export async function GET() {
  try {
    await connectDB();
    const prices = await Price.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, prices });
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch prices' }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const priceData = await req.json();
    const price = await Price.create(priceData);
    return NextResponse.json({ success: true, price });
  } catch (error) {
    console.error('Error creating price:', error);
    return NextResponse.json({ success: false, error: 'Failed to create price' });
  }
}