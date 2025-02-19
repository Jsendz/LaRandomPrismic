import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isFilled, asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("event", uid).catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("event", uid).catch(() => notFound());

  return {
    title: page.data.meta_description,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      images: isFilled.image(page.data.main)
        ? [asImageSrc(page.data.main)]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("event");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}