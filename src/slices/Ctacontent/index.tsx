import ButtonLink from "@/components/ButtonLink";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Ctacontent`.
 */
export type CtacontentProps = SliceComponentProps<Content.CtacontentSlice>;

/**
 * Component for "Ctacontent" Slices.
 */
const Ctacontent = ({ slice }: CtacontentProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="w-full flex flex-col md:flex-row justify-around items-center my-12 md:my-32 max-w-7xl mx-auto ">
        <div className="w-full p-10">
          {isFilled.richText(slice.primary.titulo) && (
              
              <div className="text-3xl md:text-4xl font-semibold mb-10 text-slate-800  ">
                <PrismicRichText field={slice.primary.titulo} />
              </div>
            )}
            {isFilled.richText(slice.primary.texto) && (
                
                <div className="text-xl md:text-xl  mb-10 text-slate-800 ">
                  <PrismicRichText field={slice.primary.texto} />
                </div>
              )}
              <div>
                <ButtonLink field={slice.primary.boton} />
              </div>
        </div>
        <div className="w-full p-10">
          {isFilled.image(slice.primary.imagen) && (
            <PrismicNextImage
              field={slice.primary.imagen}
              alt=""
              width={600}
              height={500}
              className="w-full h-auto rounded-xl"
              priority // Ensures faster loading
            />
          )}
        </div>

      </div>
      
    </section>
  );
};

export default Ctacontent;
