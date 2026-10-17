import { NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    if (typeof topic !== 'string' || !topic.trim() || topic.length > 200) {
      return NextResponse.json({ success: false, error: 'A topic (max 200 characters) is required' }, { status: 400 });
    }

    const content = await generateText('You are a professional blog writer. Generate a blog post with sections.', [
      {
        role: 'user',
        text: `Generate a trending blog post about ${topic}. Start with a Markdown "# Title" heading, then include multiple sections.`,
      },
    ]);

    // Extract the title from the first Markdown heading
    const titleMatch = content.match(/^#\s*(.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : topic;

    // The thumbnail is uploaded by the admin afterwards
    return NextResponse.json({ success: true, blog: { title, content, thumbnail: '' } });
  } catch (error) {
    console.error('Error generating blog:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate blog' }, { status: 500 });
  }
}
