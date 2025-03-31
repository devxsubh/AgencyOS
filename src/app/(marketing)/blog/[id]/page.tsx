"use client";

import { useParams, notFound } from "next/navigation";
import { blogPosts } from "@/constants/blog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function BlogPostPage() {
  const params = useParams(); 
  const post = blogPosts.find((post) => post.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Badge>{post.category}</Badge>
            <time className="text-sm text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/icons/icon.avif" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-muted-foreground">Author</p>
            </div>
          </div>
        </div>

        <div className="aspect-video w-full mb-10">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
