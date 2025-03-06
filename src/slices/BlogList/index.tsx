import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BlogList`.
 */
export type BlogListProps = SliceComponentProps<Content.BlogListSlice>;

/**
 * Component for "BlogList" Slices.
 */
const BlogList = ({ slice }: BlogListProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
       <section className="container mx-auto">
      <div className="text-center my-12 md:my-24">
              
              {isFilled.richText(slice.primary.subtitulo) && (
                <div className="text-xl md:text-6xl font-semibold text-slate-800">
                  <PrismicText field={slice.primary.subtitulo} />
                </div>
              )}
            </div>
      
            {/* Blog Post Grid */}
            <div className="flex flex-col p-4 w-full justify-around  max-w-7xl mx-auto md:my-32 ">
              {slice.primary.list.map((item,index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition md:text-center flex flex-col md:flex-row justify-around md:items-center mb-7">
                  {/* Featured Image */}
                  {isFilled.image(item.imagen) && (
                    <PrismicNextImage
                      field={item.imagen}
                      alt=""
                      className="w-full  h-[200px] object-cover rounded-lg mb-4"
                    />
                  )}
      
                  {/* Title Module */}
                  {isFilled.richText(item.titulo) && (
                    <div className="my-6 w-full pl-5">
                      <PrismicRichText
                        field={item.titulo}
                        components={{
                          heading1: ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>,
                          heading2: ({ children }) => <h3 className="text-xl font-semibold">{children}</h3>,
                          heading3: ({ children }) => <h4 className="text-lg font-medium">{children}</h4>,
                          heading4: ({ children }) => <p className="text-base font-normal">{children}</p>, // Prevents `<h4>` inside `<h4>`
                        }}
                      />
                    </div>
                  )}

{isFilled.richText(item.titulo) && (
                    <div className="my-6 w-full pl-5 text-left">
                      <PrismicRichText
                        field={item.descripcion}
                        components={{
                          heading1: ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>,
                          heading2: ({ children }) => <h3 className="text-xl font-semibold">{children}</h3>,
                          heading3: ({ children }) => <h4 className="text-lg font-medium">{children}</h4>,
                          heading4: ({ children }) => <p className="text-base font-normal">{children}</p>, // Prevents `<h4>` inside `<h4>`
                        }}
                      />
                    </div>
                  )}

                 
      
                  {/* Read More Button */}
                  {isFilled.link(item.link) && (
                    <PrismicNextLink field={item.link} className="w-full text-blue-500 pl-5 font-medium hover:underline text-left md:text-center md:p-5">
                      Llegir
                    </PrismicNextLink>
                  )}
                </div>
              ))}
            </div>
    </section>
    </section>
  );
};

export default BlogList;


