import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 503 });
  }
}