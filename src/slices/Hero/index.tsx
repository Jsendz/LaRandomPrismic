import ButtonLink from "@/components/ButtonLink";

import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps,PrismicText } from "@prismicio/react";
import { div } from "framer-motion/client";


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  


  return (
    <section
data-slice-type={slice.slice_type}
data-slice-variation={slice.variation}
className="relative w-full h-full lg:h-screen flex flex-col md:flex-row items-center justify-center text-center text-white overflow-hidden"
>
{/* Background Image */}
<div className="hidden md:block absolute  w-full h-full   clip-path-custom">
<div>
{isFilled.image(slice.primary.background) && (
  <PrismicNextImage
    field={slice.primary.background}
    alt=""
    width={800}
    height={700}
    className="w-full h-full object-contain"
    priority // Ensures faster loading
  />
)}
</div>
</div>

{/* Hero Content */}
<div className="  z-10 w-full h-full flex flex-col items-center md:items-start justify-center md:pl-10 my-12 pb-16 md:my-0 ">
  
  {isFilled.richText(slice.primary.heading) && (
    
    <div className="text-5xl md:text-7xl font-bold mb-10 text-slate-800 ">
      <PrismicRichText field={slice.primary.heading} />
    </div>
  )}
  {isFilled.richText(slice.primary.subtitulo) && (
    
    <div className="text-3xl md:text-5xl font-semibold mb-10 text-slate-800">
      <PrismicRichText field={slice.primary.subtitulo} />
    </div>
  )}
  
  {/* Call-to-Action Button */}
  <ButtonLink field={slice.primary.boton_homepage} />
  
 
</div>

<div className="absolute bottom-0 md:bottom-[40%]  md:right-1/2 md:left-[47%] transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow w-16 h-16 md:w-48 md:h-48 ">
{isFilled.image(slice.primary.spinning) && (
  <PrismicNextImage
    field={slice.primary.spinning}
    alt=""
    width={600}
    height={500}
    className="w-full h-auto rounded-full"
    priority // Ensures faster loading
  />
)}
</div>
</section>




    
  );
};

export default Hero;
