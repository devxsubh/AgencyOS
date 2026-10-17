import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';
import cloudinary from '@/utils/cloudinary';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    if (typeof topic !== 'string' || !topic.trim() || topic.length > 200) {
      return NextResponse.json({ success: false, error: 'A topic (max 200 characters) is required' }, { status: 400 });
    }

    // Generate blog content using OpenAI
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional blog writer. Generate a blog post with sections.',
        },
        {
          role: 'user',
          content: `Generate a trending blog post about ${topic}. Include a title and multiple sections.`,
        },
      ],
    });

    const blogContent = completion.choices[0].message?.content?.trim();
    if (!blogContent) {
      throw new Error('No blog content generated.');
    }

    // Generate blog thumbnail image using DALL-E 3
    const imageResponse = await getOpenAI().images.generate({
      model: 'dall-e-3',
      prompt: `Create a highly engaging thumbnail image for a blog post about "${topic}".`,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const b64Image = imageResponse.data?.[0]?.b64_json;
    if (!b64Image) {
      throw new Error('No image generated.');
    }

    // Upload the base64 image directly to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${b64Image}`, {
      folder: 'blog-thumbnails',
    });

    // Extract the title from the first Markdown heading
    const titleMatch = blogContent.match(/^#\s*(.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : topic;

    return NextResponse.json({
      success: true,
      blog: {
        title,
        content: blogContent,
        thumbnail: uploadResponse.secure_url,
      },
    });
  } catch (error: any) {
    console.error('Error generating blog:', error?.message || error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to generate blog' });
  }
}
