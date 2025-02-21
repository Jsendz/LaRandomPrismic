import { asText, Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Eventos`.
 */
export type EventosProps = SliceComponentProps<Content.EventosSlice>;

/**
 * Component for "Eventos" Slices.
 */
const Eventos = ({ slice }: EventosProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12 bg-gray-100 w-full"
    >
      
      {/* Blog Title & Subtitle */}
      <div className="text-center my-32">
        
        {isFilled.richText(slice.primary.subtitulo) && (
          <h2 className="text-xl md:text-6xl font-semibold text-slate-800">
            <PrismicText field={slice.primary.subtitulo} />
          </h2>
        )}
      </div>

      {/* Blog Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto my-32">
        {slice.primary.modulo.map((item, index) => (
          <div key={index} className="p-6 bg-gradient-to-r from-orange-300 to-rose-300 rounded-lg shadow-md hover:shadow-lg transition text-center flex flex-col">
            {/* Featured Image */}
            {isFilled.image(item.imagen) && (
              <PrismicNextImage
                field={item.imagen}
                alt=""
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            {/* Title Module */}
            {isFilled.richText(item.titulomodulo) && (
              <div className="my-6 max-w-lg text-left pl-2">
                <PrismicRichText
                  field={item.titulomodulo}
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
            {isFilled.link(item.boton) && (
              <PrismicNextLink field={item.boton} className="text-blue-500 font-medium hover:underline text-left pl-2">
                Descobreix
              </PrismicNextLink>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * Component for "Eventos" Slices.
 */
export default Eventos;
