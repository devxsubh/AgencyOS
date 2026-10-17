'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
}

interface Props {
  blog: BlogPost;
}

export default function BlogDetail({ blog }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.thumbnail,
    "datePublished": blog.createdAt,
    "dateModified": blog.createdAt,
    "author": {
      "@type": "Organization",
      "name": "Wonder Creative Studios"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wonder Creative Studios",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wondercreativestudios.com/logo.png"
      }
    },
    "description": blog.content.slice(0, 155) + "..."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <img 
              src={blog.thumbnail} 
              alt={blog.title}
              className="w-full h-[500px] object-cover rounded-xl mb-8"
            />
            <div className="flex items-center gap-4 mb-6">
              <Badge>Technology</Badge>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/icons/icon.avif" />
                  <AvatarFallback>WC</AvatarFallback>
                </Avatar>
                <span className="text-sm">Wonder Creative</span>
              </div>
              <time className="text-sm text-muted-foreground">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {blog.title}
            </h1>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-white" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-6 mb-3 text-white" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-xl font-bold mt-6 mb-3 text-white" {...props} />,
                p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-white" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-6 text-white" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-6 text-white" {...props} />,
                li: ({ node, ...props }) => <li className="mb-2 text-white" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-white" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 text-white" {...props} />
                ),
                pre: ({ node, ...props }) => (
                  <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-x-auto mb-6 text-white" {...props} />
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </>
  );
}