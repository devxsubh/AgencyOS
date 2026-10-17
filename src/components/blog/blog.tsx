"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
}

export const Blog = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      if (data.success) {
        setPosts(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full px-4">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            Latest articles
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className={`flex flex-col gap-4 hover:opacity-75 cursor-pointer ${
                index === 0 ? "md:col-span-2" : ""
              }`}
              onClick={() => router.push(`/blog/${post._id}`)}
            >
              <div
                className="bg-muted rounded-md aspect-video bg-cover bg-center"
                style={{
                  backgroundImage: `url('${post.thumbnail}')`,
                }}
              />
              <div className="flex flex-row gap-4 items-center">
                <Badge>Technology</Badge>
                <p className="flex flex-row gap-2 text-sm items-center">
                  <span className="text-muted-foreground">By</span>{" "}
                  <Avatar className="h-4 w-6">
                    <AvatarImage src="/icons/icon.avif" />
                    <AvatarFallback>WC</AvatarFallback>
                  </Avatar>
                  <span>Wonder Creative</span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className={`max-w-3xl tracking-tight ${
                  index === 0 ? "text-4xl" : "text-2xl"
                }`}>
                  {post.title}
                </h3>
                <p className="max-w-3xl text-muted-foreground text-base">
                  {post.content.substring(0, 150)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};