import ButtonLink from "@/components/ButtonLink";

import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps,PrismicText } from "@prismicio/react";


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const backgroundImage = slice.primary.background;


  return (
    <section
data-slice-type={slice.slice_type}
data-slice-variation={slice.variation}
className="relative w-full h-[90vh] flex items-center justify-center text-center text-white overflow-hidden"
>
{/* Background Image */}
{isFilled.image(slice.primary.background) && (
  <PrismicNextImage
    field={slice.primary.background}
    alt=""
    fill
    className="absolute inset-0 w-full h-full object-cover brightness-75"
    priority // Ensures faster loading
  />
)}

{/* Hero Content */}
<div className="relative z-10 max-w-3xl px-6 flex flex-col md:flex-row">
  <div>
  {isFilled.richText(slice.primary.heading) && (
    <div className="text-4xl md:text-6xl font-bold mb-4">
      <PrismicRichText field={slice.primary.heading} />
    </div>
  )}
  {isFilled.richText(slice.primary.subtitulo) && (
    <div className="text-lg md:text-xl mb-6">
      <PrismicRichText field={slice.primary.subtitulo} />
    </div>
  )}

  {/* Call-to-Action Button */}
  <ButtonLink field={slice.primary.boton_homepage} />
  </div>
 
</div>
</section>




    
  );
};

export default Hero;
