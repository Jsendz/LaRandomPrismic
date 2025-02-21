import { Content, EmptyImageFieldImage, FilledImageFieldImage, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Key } from "react";
import { Navigation, Pagination } from "swiper/modules";

import { SwiperSlide, Swiper } from "swiper/react";

/**
 * Props for `SingleEvent`.
 */
export type SingleEventProps = SliceComponentProps<Content.SingleEventSlice>;

/**
 * Component for "SingleEvent" Slices.
 */
const SingleEvent = ({ slice }: SingleEventProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <article className="container mx-auto py-12">
        <div className="w-full flex flex-col md:flex-row max-w-7xl justify-center mx-auto my-32 px-12">
          <div className="w-full flex justify-center">
          {isFilled.image(slice.primary.imagen_evento) && (
          <PrismicNextImage
            className="es-call-to-action__image rounded-xl w-[350px]"
            field={slice.primary.imagen_evento}
           alt=""
           
          />
        )}
          </div>
          <div className="w-full ">
            <div>
            {isFilled.richText(slice.primary.titulo_evento) && (
      <h2 className="text-balance  text-4xl font-medium md:text-6xl mb-10" >  
      <PrismicText field={slice.primary.titulo_evento} /></h2>
      )}
            </div>
      {isFilled.richText(slice.primary.texto_evento) && (
        <p className="text-xl  text-balance mb-6">
          <PrismicText field={slice.primary.texto_evento} />
        </p>
      )}
      </div>
      </div>

      </article>
      
    </section>
  );
};

export default SingleEvent;








    

      

     
