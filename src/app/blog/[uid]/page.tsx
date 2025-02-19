import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";

/**
 * Generate metadata dynamically for each blog post
 */
export async function generateMetadata({ params }: { params: { uid: string } }): Promise<Metadata> {
  const client = createClient();
  const post = await client.getByUID("blog_post", params.uid).catch(() => null);

  if (!post) return { title: "Post Not Found", description: "This blog post does not exist." };

  return {
    title: prismic.asText(post.data.title) || "Untitled Post", // ✅ Extracts text safely
    description: prismic.asText(post.data.excerpt) || "Read our latest blog post.", // ✅ Safe for Rich Text
    openGraph: {
      title: prismic.asText(post.data.title) || undefined,
      images: post.data.featured_image?.url ? [{ url: post.data.featured_image.url }] : [],
    },
  };
}

/**
 * Blog Post Page Component
 */
export default async function BlogPostPage({ params }: { params: { uid: string } }) {
  const client = createClient();
  const post = await client.getByUID("blog_post", params.uid).catch(() => null);

  if (!post) return notFound();

  return (
    <article className="container mx-auto py-12">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-center mb-6">
        <PrismicText field={post.data.title} />
      </h1>

      {/* Featured Image */}
      {post.data.featured_image?.url && (
        <PrismicNextImage
          field={post.data.featured_image}
          alt=""
          className="w-full max-h-[500px] object-cover rounded-lg mb-6"
        />
      )}

      {/* Blog Post Content */}
      <div className="prose prose-lg max-w-3xl mx-auto">
        <SliceZone slices={post.data.slices} components={components} />
      </div>
    </article>
  );
}
