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
      className="relative w-full h-full md:h-screen flex flex-col md:flex-row items-center justify-center px-6 sm:px-12  py-16"
    >
      <div className="w-full md:w-1/2 flex justify-center">
        {isFilled.image(slice.primary.fondo) && (
          <PrismicNextImage
            field={slice.primary.fondo}
            alt=""
            width={600}
            height={500}
            className="w-full h-auto max-w-md md:max-w-full rounded-lg"
          />
        )}
      </div>

      <div className="w-full md:w-1/2 p-6  md:pl-10">
        {isFilled.richText(slice.primary.textotote) && (
          <div className="about  font-semibold text-gray-900">
            <PrismicRichText field={slice.primary.textotote} />
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
