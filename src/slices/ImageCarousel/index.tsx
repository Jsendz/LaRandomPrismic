"use client"

import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";

// ✅ Dynamically Import Swiper for Next.js (Fixes SSR Issue)
const SwiperReact = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import("swiper/react").then((mod) => mod.SwiperSlide), { ssr: false });

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Props for `ImageCarousel`.
 */
export type ImageCarouselProps =
  SliceComponentProps<Content.ImageCarouselSlice>;

/**
 * Component for "ImageCarousel" Slices.
 */
const ImageCarousel = ({ slice }: ImageCarouselProps): JSX.Element => {
  console.log("Slice Data:", slice); // ✅ Debugging
  console.log("Slice Items:", slice.items); // ✅ Check if images exist

  if (!slice.items.length) return <p className="text-center text-gray-500">No images available</p>;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
     <div className="w-full max-w-7xl mx-auto py-8 px-4">
      {isFilled.richText(slice.primary.titulo) && (
        <div className="text-center text-3xl font-bold mb-6">
          <PrismicRichText field={slice.primary.titulo} />
        </div>
      )}

      <SwiperReact
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-full"
      >
        {slice.primary.carousel.map((item, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            {isFilled.image(item.image) && (
              <PrismicNextImage
                field={item.image}
                alt=""
                className="rounded-lg object-cover w-full h-64 sm:h-80 md:h-96"
              />
            )}
          </SwiperSlide>
        ))}
      </SwiperReact>
      
    </div>
    </section>
    
  );
};

export default ImageCarousel;
