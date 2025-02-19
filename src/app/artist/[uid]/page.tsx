// app/events/[uid]/page.tsx
import { Metadata } from "next";
import { createClient } from "@/prismicio"; // Assuming your prismic client is here
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices"; // Assuming your slices components are here
import { PrismicText } from "@prismicio/react";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";

export async function generateMetadata({ params }: { params: { uid: string } }): Promise<Metadata> {
  const client = createClient();
  try {
    const document = await client.getByUID("artist", params.uid).catch(() => null); // Fetch by UID of "event" type

    if (!document) {
      return { title: "Artist Not Found", description: "This artist does not exist." };
    }

    return {
      title: prismic.asText(document.data.nombre) || "Untitled Event", // Adjust title as needed
      description: document.data.meta_description || "Default event description", // Adjust description field
      // ... any other metadata you need for events
    };
  } catch (error) {
    console.error("Error fetching artist metadata:", error);
    return { title: "Artist Not Found", description: "This artist does not exist." };
  }
}

export default async function EventPage({ params }: { params: { uid: string } }) {
  const client = createClient();
  try {
    const document = await client.getByUID("artist", params.uid).catch(() => null); // Fetch by UID of "event" type
    if (!document) return notFound();

    return (
      <article className="container mx-auto py-12">
        

        {/* Slice Zone (For any slices specific to events) */}
        <div className="w-full">
          <SliceZone slices={document.data.slices} components={components} />
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error fetching artist:", error);
    return notFound();
  }
}