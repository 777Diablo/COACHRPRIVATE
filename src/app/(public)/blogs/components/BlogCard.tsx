"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Post } from "../types/blog";

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl =
    post.featuredImage?.node?.mediaItemUrl ?? "/default-image.jpg";
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group relative h-full">
      <Link
        href={`${process.env.NEXT_PUBLIC_WP_ENDPOINT}${post.uri}`}
        target="_blank"
      >
        <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              width={500}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
                Blog
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {formattedDate}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">5 min read</span>
            </div>
            <h3 className="mb-4 line-clamp-2 text-xl font-bold transition-colors  dark:text-gray-100 group-hover:text-primary">
              {post.title}
            </h3>
            <Button
              variant="link"
              className="h-auto p-0 font-semibold transition-colors group-hover:text-primary"
            >
              Read More →
            </Button>
          </div>
        </Card>
      </Link>
    </div>
  );
}