import BlogDetail from '../../../../components/blog/BlogDetail';
import { Metadata } from 'next';
import { connectDB } from '@/utils/database';
import Blog from '@/models/Blog';
import DataUnavailable from '@/components/global/data-unavailable';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let blog;
  try {
    await connectDB();
    blog = await Blog.findById(id);
  } catch {
    return { title: 'Blog | Wonder Creative Studios' };
  }

  if (!blog) {
    return {
      title: 'Blog Not Found | Wonder Creative Studios',
      description: 'The requested blog post could not be found.'
    };
  }

  const excerpt = blog.content.slice(0, 155) + '...';

  return {
    title: `${blog.title} | Wonder Creative Studios`,
    description: excerpt,
    openGraph: {
      title: blog.title,
      description: excerpt,
      type: 'article',
      url: `https://wondercreativestudios.com/blog/${blog._id}`,
      siteName: 'Wonder Creative Studios',
      images: [
        {
          url: blog.thumbnail,
          width: 1200,
          height: 630,
          alt: blog.title
        }
      ],
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: excerpt,
      images: [blog.thumbnail]
    },
    alternates: {
      canonical: `https://wondercreativestudios.com/blog/${blog._id}`
    }
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const searchParamsData = await searchParams;
  let blog;
  try {
    await connectDB();
    blog = await Blog.findById(id);
  } catch (error) {
    console.error('Error loading blog:', error);
    return <DataUnavailable message="This article is currently not available. Please check back soon." className="min-h-[60vh] pt-40" />;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  // Convert Mongoose document to plain object
  const plainBlog = {
    _id: blog._id.toString(),
    title: blog.title,
    content: blog.content,
    thumbnail: blog.thumbnail,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt?.toISOString()
  };

  return <BlogDetail blog={plainBlog} />;
}
