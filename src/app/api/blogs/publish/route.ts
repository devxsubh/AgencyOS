import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import Blog from '@/models/Blog';

export async function POST(req: Request) {
  try {
    await connectDB();
    const blogData = await req.json();
    
    const blog = await Blog.create(blogData);
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error('Error publishing blog:', error);
    return NextResponse.json({ success: false, error: 'Failed to publish blog' });
  }
}