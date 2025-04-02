"use client";

import { useParams, notFound } from "next/navigation";
import { blogPosts } from "@/constants/blog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams(); 
  const post = blogPosts.find((post) => post.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 relative bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          {post.title}
        </h1>

        {/* Author & Date Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-gray-400 text-sm">
          <time className="">{new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</time>
          <span className="hidden md:inline">•</span>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/icons/icon.avif" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-medium text-white">{post.author}</p>
              <p className="text-xs text-gray-500">Author</p>
            </div>
          </div>
        </div>
      </div>


        {/* Header Section */}
        <div className="relative">
          <div className="absolute top-6 left-6 bg-[#C3EA00] text-black px-3 py-1 rounded-md text-sm font-semibold">
            Featured
          </div>
          <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
            <img src={post.imageUrl} alt={post.title} className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mb-6 text-gray-400">
          <a href="https://x.com/wonderstudio8" target="_blank" rel="noopener noreferrer" className="hover:text-[#C3EA00]">
            <Twitter size={24} />
          </a>
          <a href="https://www.instagram.com/wondercreative.studio/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C3EA00]">
            <Instagram size={24} />
          </a>
          <a href="https://www.linkedin.com/company/wonder-creative-studio9/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C3EA00]">
            <Linkedin size={24} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100094373044877" target="_blank" rel="noopener noreferrer" className="hover:text-[#C3EA00]">
            <Facebook size={24} />
          </a>
        </div>

        {/* Post Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-6">
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </article>
  );
}