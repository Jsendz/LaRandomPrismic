import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
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

  if (!slice.items.length) return <p className="text-center text-gray-500">No images available</p>;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
     <section className="w-full max-w-7xl mx-auto py-8 px-4">
      {isFilled.richText(slice.primary.titulo) && (
        <div className="text-center text-3xl font-bold mb-6">
          <PrismicRichText field={slice.primary.titulo} />
        </div>
      )}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
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
      </Swiper>
    </section>
    </section>
  );
};

export default ImageCarousel;
