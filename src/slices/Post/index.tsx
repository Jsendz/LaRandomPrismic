import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { SliceZone } from "@prismicio/react";

/**
 * Props for `Post`.
 */
export type PostProps = SliceComponentProps<Content.PostSlice>;

/**
 * Component for "Post" Slices.
 */
const Post = ({ slice }: PostProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <article className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {isFilled.richText(slice.primary.titulo) && (
            <div className="text-4xl md:text-6xl font-bold mb-4">
              <PrismicRichText field={slice.primary.titulo} />
            </div>
          )}
    <div className=" px-5 py-2 shadow-md shadow-black bg-white rounded-xl w-1/4 text-center ">
    {slice.primary.fecha_blog}
    </div>
    {isFilled.image(slice.primary.imagen) && (
    <PrismicNextImage
     field={slice.primary.imagen}
     alt=""
     className="rounded-lg my-10"
      />
    )}
    
    {isFilled.richText(slice.primary.texto) && (
    <div className="rich-text ">
      <PrismicRichText field={slice.primary.texto} />
    </div>
  )}
  
    </article>

    
    </section>
  );
};

export default Post;
