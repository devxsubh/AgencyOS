import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import Price from '@/models/Price';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const priceData = await req.json();
    
    const updatedPrice = await Price.findByIdAndUpdate(
      (await params).id,
      priceData,
      { new: true }
    );

    if (!updatedPrice) {
      return NextResponse.json({ success: false, error: 'Price not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, price: updatedPrice });
  } catch (error) {
    console.error('Error updating price:', error);
    return NextResponse.json({ success: false, error: 'Failed to update price' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const deletedPrice = await Price.findByIdAndDelete((await params).id);

    if (!deletedPrice) {
      return NextResponse.json({ success: false, error: 'Price not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting price:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete price' }, { status: 500 });
  }
}