/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BlogCard } from "./components/BlogCard";
import { Post } from "./types/blog";
import EmptyState from "./components/EmptyState";

async function getPosts(): Promise<Post[]> {
  const query = `
  {
    posts(first: 5) {
      nodes {
        title
        uri
        date
        id
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
  `;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch posts");
    const { data } = await res.json();
    return data.posts?.nodes as Post[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="min-h-[80vh] bg-muted/50 py-24">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Our Blog</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our latest insights, tips, and updates to help you maximize
            your potential
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        {posts.length > 0 && (
          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
