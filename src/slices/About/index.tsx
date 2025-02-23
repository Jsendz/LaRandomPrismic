import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative h-full flex items-center justify-center text-center text-white"
    >
      <div className="w-full h-full md:h-screen relative -z-50">
      {isFilled.image(slice.primary.fondo) && (
              <PrismicNextImage
                field={slice.primary.fondo}
                alt=""
                fill={true}
                className="object-cover bg-cover"
              />
            )}
      
      <div className="p-8 rounded-lg max-w-3xl absolute right-3 bottom-20">
        
          {isFilled.richText(slice.primary.textotote) && (
            <div className=" about text-balance text-black text-4xl md:text-5xl font-bold">
              <PrismicRichText field={slice.primary.textotote} />
            </div>
          )} 
          
          
          
         
        </div>
      </div>
    </section>
  );
};

export default About;
