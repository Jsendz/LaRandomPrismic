import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { PrismicText } from "@prismicio/react";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";

/**
 * Define Next.js 15 PageProps
 */
export type PageProps = {
  params: { uid: string };
};

/**
 * Generate metadata dynamically for pages and events
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const client = createClient();
  try {
    const document = await client.getByUID("page", params.uid).catch(() => null);

    if (!document) {
      return { title: "Page Not Found", description: "This page does not exist." };
    }

    return {
      title: prismic.asText(document.data.title) || "Untitled",
      description: document.data.meta_description || "Default description",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: "Page Not Found", description: "This page does not exist." };
  }
}

/**
 * Dynamic Page Component (Handles Any Page, Including `/events`)
 */
export default async function DynamicPage({ params }: PageProps) {
  const client = createClient();
  try {
    const document = await client.getByUID("page", params.uid).catch(() => null);
    if (!document) return notFound();

    return (
      <article className="container mx-auto py-12">
        {/* Page Title */}
        {document.data.title && (
          <h1 className="text-4xl font-bold text-center mb-6">
            <PrismicText field={document.data.title} />
          </h1>
        )}

        {/* Slice Zone (Dynamically Renders All Slices, Including EventList) */}
        <div className="w-full max-w-6xl mx-auto">
          <SliceZone slices={document.data.slices} components={components} />
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error fetching document:", error);
    return notFound();
  }
}
