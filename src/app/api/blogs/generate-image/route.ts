import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import cloudinary from '@/utils/cloudinary';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const imageResponse = await openai.images.generate({
      model: 'dall-e-3', // Use better model
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json', // Get image as base64
    });

    const b64Image = imageResponse.data?.[0]?.b64_json;

    if (!b64Image) {
      throw new Error('No image returned from OpenAI.');
    }

    const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${b64Image}`, {
      folder: 'blog-thumbnails',
    });

    return NextResponse.json({ success: true, imageUrl: uploadResponse.secure_url });
  } catch (error: any) {
    console.error('Error generating image:', error?.message || error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to generate image' });
  }
}
