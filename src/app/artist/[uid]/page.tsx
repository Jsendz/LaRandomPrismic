import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { PrismicText } from "@prismicio/react";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";

/**
 * Explicit Type Definition for Next.js 15 Dynamic Routes
 */
export type PageProps = { params: { uid: string } };

/**
 * Generate metadata dynamically for artist pages
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const client = createClient();
  const document = await client.getByUID("artist", params.uid).catch(() => null);

  if (!document) {
    return { title: "Artist Not Found", description: "This artist does not exist." };
  }

  return {
    title: prismic.asText(document.data.nombre) || "Untitled Artist",
    description: document.data.meta_description || "Learn more about this artist.",
  };
}

/**
 * Ensure Next.js Knows Which Artist Pages Exist at Build Time
 */
export async function generateStaticParams() {
  const client = createClient();
  const artists = await client.getAllByType("artist");

  return artists.map((artist) => ({ uid: artist.uid }));
}

/**
 * Dynamic Artist Page Component
 */
export default async function ArtistPage({ params }: PageProps) {
  const client = createClient();
  const document = await client.getByUID("artist", params.uid).catch(() => null);

  if (!document) return notFound();

  return (
    <article className="container mx-auto py-12">
      {/* Artist Name */}
      {document.data.nombre && (
        <h1 className="text-4xl font-bold text-center mb-6">
          <PrismicText field={document.data.nombre} />
        </h1>
      )}

      {/* Slice Zone (Dynamically Renders Artist Content) */}
      <div className="w-full max-w-6xl mx-auto">
        <SliceZone slices={document.data.slices} components={components} />
      </div>
    </article>
  );
}
